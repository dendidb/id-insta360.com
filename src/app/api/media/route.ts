import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";

const prisma = new PrismaClient();

// GET /api/media - Get all media files
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const search = searchParams.get("search") || "";
    const mimeType = searchParams.get("mimeType") || "";
    const isPublic = searchParams.get("isPublic") || "";

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};
    
    if (search) {
      where.OR = [
        { filename: { contains: search, mode: "insensitive" } },
        { originalName: { contains: search, mode: "insensitive" } },
        { altText: { contains: search, mode: "insensitive" } }
      ];
    }

    if (mimeType) {
      where.mimeType = mimeType;
    }

    if (isPublic === "true") {
      where.isPublic = true;
    } else if (isPublic === "false") {
      where.isPublic = false;
    }

    const [media, total] = await Promise.all([
      prisma.media.findMany({
        where,
        select: {
          id: true,
          filename: true,
          originalName: true,
          filePath: true,
          fileSize: true,
          mimeType: true,
          altText: true,
          caption: true,
          isPublic: true,
          createdAt: true,
          updatedAt: true,
          uploadedByUser: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        },
        skip,
        take: limit,
        orderBy: { createdAt: "desc" }
      }),
      prisma.media.count({ where })
    ]);

    return NextResponse.json({
      media,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error("Get media error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/media - Upload new media file
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      filename,
      originalName,
      filePath,
      fileSize,
      mimeType,
      altText,
      caption,
      isPublic
    } = body;

    if (!filename || !originalName || !filePath || !fileSize || !mimeType) {
      return NextResponse.json(
        { error: "Filename, original name, file path, file size, and MIME type are required" },
        { status: 400 }
      );
    }

    // Create media record
    const media = await prisma.media.create({
      data: {
        filename,
        originalName,
        filePath,
        fileSize: parseInt(fileSize),
        mimeType,
        altText,
        caption,
        isPublic: isPublic !== false,
        uploadedBy: session.user.id
      },
      select: {
        id: true,
        filename: true,
        originalName: true,
        filePath: true,
        fileSize: true,
        mimeType: true,
        altText: true,
        caption: true,
        isPublic: true,
        createdAt: true,
        uploadedByUser: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    return NextResponse.json(
      { 
        message: "Media uploaded successfully",
        media
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Upload media error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 