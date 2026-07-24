import { NextRequest, NextResponse } from "next/server";
import { findWinnerByMobile, buildPrizeTickets } from "@/server/winners";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const mobile = String(body.mobile || "").trim();

    if (!mobile || mobile.replace(/\D/g, "").length < 10) {
      return NextResponse.json(
        { success: false, message: "Enter a valid 10-digit mobile number" },
        { status: 400 }
      );
    }

    const winner = await findWinnerByMobile(mobile);
    if (!winner) {
      return NextResponse.json(
        {
          success: false,
          message: "No result found for this mobile number",
        },
        { status: 404 }
      );
    }

    const prizeTickets = await buildPrizeTickets(
      String(winner.ticketNumber),
      Number(winner.position)
    );

    return NextResponse.json({
      success: true,
      winner: {
        _id: String(winner._id),
        name: winner.name,
        mobile: winner.mobile,
        position: winner.position,
        ticketNumber: winner.ticketNumber,
        date: winner.date,
      },
      prizeTickets,
    });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to check result";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
