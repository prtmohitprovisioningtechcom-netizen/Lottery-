import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import {
  createWinner,
  listWinners,
  deleteWinner,
} from "@/server/winners";

async function requireAdmin(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) return null;
  return verifyToken(auth.slice(7));
}

export async function GET(req: NextRequest) {
  const admin = await requireAdmin(req);
  if (!admin) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const winners = await listWinners();
  return NextResponse.json({ success: true, winners });
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
    const { name, mobile, position, ticketNumber, date } = body;

    if (!name || !mobile || !position || !ticketNumber || !date) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    const pos = Number(position);
    if (pos < 1 || pos > 13) {
      return NextResponse.json(
        { success: false, message: "Position must be 1 to 13" },
        { status: 400 }
      );
    }

    const winner = await createWinner({
      name,
      mobile,
      position: pos,
      ticketNumber,
      date,
    });

    return NextResponse.json({
      success: true,
      winner,
      message: "Winner registered successfully",
    });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to register winner";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const admin = await requireAdmin(req);
  if (!admin) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json(
      { success: false, message: "Winner id required" },
      { status: 400 }
    );
  }

  await deleteWinner(id);
  return NextResponse.json({ success: true, message: "Deleted" });
}
