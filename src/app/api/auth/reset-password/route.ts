import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import crypto from "crypto";

const prisma = new PrismaClient();

// POST /api/auth/reset-password - Request password reset
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, action, token, newPassword } = body;

    if (action === "request") {
      // Request password reset
      if (!email) {
        return NextResponse.json(
          { error: "Email is required" },
          { status: 400 }
        );
      }

      const user = await prisma.user.findUnique({
        where: { email: email.toLowerCase() }
      });

      if (!user) {
        // Don't reveal if user exists or not
        return NextResponse.json(
          { message: "If the email exists, a reset link has been sent" },
          { status: 200 }
        );
      }

      // Generate reset token
      const resetToken = crypto.randomBytes(32).toString("hex");
      const resetExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

      // Store reset token in database (simplified for current schema)
      // TODO: Add password reset fields to schema
      console.log("Reset token for user", user.id, ":", resetToken);

      // TODO: Send email with reset link
      // For now, just return the token (in production, send via email)
      console.log("Password reset token:", resetToken);

      return NextResponse.json({
        message: "If the email exists, a reset link has been sent"
      });

    } else if (action === "reset") {
      // Reset password (simplified for current schema)
      if (!email || !newPassword) {
        return NextResponse.json(
          { error: "Email and new password are required" },
          { status: 400 }
        );
      }

      const user = await prisma.user.findUnique({
        where: { email: email.toLowerCase() }
      });

      if (!user) {
        return NextResponse.json(
          { error: "User not found" },
          { status: 404 }
        );
      }

      // Hash new password
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

      // Update password
      await prisma.user.update({
        where: { id: user.id },
        data: {
          password: hashedPassword
        }
      });

      return NextResponse.json({
        message: "Password reset successfully"
      });

    } else {
      return NextResponse.json(
        { error: "Invalid action. Use 'request' or 'reset'" },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error("Password reset error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 