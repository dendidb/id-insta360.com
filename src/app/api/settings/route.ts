import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";

const prisma = new PrismaClient();

// GET /api/settings - Get all settings
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
    const settingKey = searchParams.get("key") || "";

    if (settingKey) {
      // Get specific setting
      const setting = await prisma.setting.findUnique({
        where: { settingKey }
      });

      if (!setting) {
        return NextResponse.json(
          { error: "Setting not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(setting);
    } else {
      // Get all settings
      const settings = await prisma.setting.findMany({
        orderBy: { settingKey: "asc" }
      });

      return NextResponse.json(settings);
    }

  } catch (error) {
    console.error("Get settings error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/settings - Create or update setting (admin only)
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
    const { settingKey, settingValue, settingType, description } = body;

    if (!settingKey) {
      return NextResponse.json(
        { error: "Setting key is required" },
        { status: 400 }
      );
    }

    // Check if setting exists
    const existingSetting = await prisma.setting.findUnique({
      where: { settingKey }
    });

    let setting;
    if (existingSetting) {
      // Update existing setting
      setting = await prisma.setting.update({
        where: { settingKey },
        data: {
          settingValue,
          settingType,
          description
        }
      });
    } else {
      // Create new setting
      setting = await prisma.setting.create({
        data: {
          settingKey,
          settingValue,
          settingType: settingType || "STRING",
          description
        }
      });
    }

    return NextResponse.json(
      { 
        message: existingSetting ? "Setting updated successfully" : "Setting created successfully",
        setting
      },
      { status: existingSetting ? 200 : 201 }
    );

  } catch (error) {
    console.error("Create/update setting error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 