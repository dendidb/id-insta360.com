import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";

const prisma = new PrismaClient();

// GET /api/forum/posts - Get all forum posts
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const search = searchParams.get("search") || "";
    const userId = searchParams.get("userId") || "";
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") || "desc";

    const skip = (page - 1) * limit;

    // Build where clause
    const where: Record<string, unknown> = {};
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { content: { contains: search, mode: "insensitive" } }
      ];
    }

    if (userId) {
      where.userId = parseInt(userId);
    }

    // Build order by clause
    const orderBy: Record<string, unknown> = {};
    orderBy[sortBy] = sortOrder;

    const [posts, total] = await Promise.all([
      prisma.forumPost.findMany({
        where,
        select: {
          id: true,
          title: true,
          content: true,
          createdAt: true,
          updatedAt: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          },
          _count: {
            select: {
              comments: true
            }
          }
        },
        skip,
        take: limit,
        orderBy
      }),
      prisma.forumPost.count({ where })
    ]);

    return NextResponse.json({
      posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error("Get forum posts error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/forum/posts - Create new forum post
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
    const { title, content } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    // Create forum post
    const post = await prisma.forumPost.create({
      data: {
        title,
        content,
        userId: session.user.id
      },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        user: {
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
        message: "Forum post created successfully",
        post
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Create forum post error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 