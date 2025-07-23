import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";

const prisma = new PrismaClient();

// GET /api/products - Get all products with filtering and pagination
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const search = searchParams.get("search") || "";
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") || "desc";

    const skip = (page - 1) * limit;

    // Build where clause
    const where: Record<string, unknown> = {};
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } }
      ];
    }

    // Build order by clause
    const orderBy: Record<string, unknown> = {};
    orderBy[sortBy] = sortOrder;

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        select: {
          id: true,
          name: true,
          slug: true,
          description: true,
          price: true,
          createdAt: true,
          updatedAt: true
        },
        skip,
        take: limit,
        orderBy
      }),
      prisma.product.count({ where })
    ]);

    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error("Get products error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/products - Create new product (admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      name,
      slug,
      description,
      price
    } = body;

    if (!name || !slug || !price) {
      return NextResponse.json(
        { error: "Name, slug, and price are required" },
        { status: 400 }
      );
    }

    // Check if product with slug already exists
    const existingProduct = await prisma.product.findUnique({
      where: { slug }
    });

    if (existingProduct) {
      return NextResponse.json(
        { error: "Product with this slug already exists" },
        { status: 409 }
      );
    }

    // Create product
    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        price: parseFloat(price)
      },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        price: true,
        createdAt: true
      }
    });

    return NextResponse.json(
      { 
        message: "Product created successfully",
        product
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Create product error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 