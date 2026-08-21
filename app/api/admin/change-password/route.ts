import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { changeAdminPassword } from "@/server/winners";

async function requireAdmin(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) return null;
  return verifyToken(auth.slice(7));
}

export async function POST(req: NextRequest) {
  try {
    const admin = await requireAdmin(req);
    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { oldPassword, newPassword } = body;

    if (!oldPassword || !newPassword) {
      return NextResponse.json(
        { success: false, message: "Old and new passwords are required" },
        { status: 400 }
      );
    }

    await changeAdminPassword(admin.id, oldPassword, newPassword);

    return NextResponse.json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to change password";
    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}
