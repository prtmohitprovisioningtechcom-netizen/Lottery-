import { NextRequest, NextResponse } from "next/server";
import { loginAdmin, ensureDefaultAdmin } from "@/server/winners";
import { signToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    await ensureDefaultAdmin();
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password required" },
        { status: 400 }
      );
    }

    const admin = await loginAdmin(email, password);
    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }

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
    const message = err instanceof Error ? err.message : "Login failed";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
