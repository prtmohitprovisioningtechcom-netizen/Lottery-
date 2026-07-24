import { NextRequest, NextResponse } from "next/server";
import { registerAdmin } from "@/server/winners";
import { signToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: "Name, email and password required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    const admin = await registerAdmin({ name, email, password });
    const token = await signToken({
      id: String(admin._id),
      email: admin.email,
      name: admin.name,
    });

    return NextResponse.json({
      success: true,
      token,
      admin: { id: String(admin._id), name: admin.name, email: admin.email },
    });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Registration failed";
    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}
