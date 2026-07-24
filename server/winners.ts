import { connectDB } from "@/lib/db";
import { Winner } from "@/models/Winner";
import { Admin } from "@/models/Admin";
import {
  generateFillerTickets,
  getPrizeTier,
  PRIZE_TIERS,
} from "@/lib/prizes";
import bcrypt from "bcryptjs";
import type { Winner as WinnerType } from "@/types";

type WinnerDoc = WinnerType & { _id: unknown };

export async function findWinnerByMobile(
  mobile: string
): Promise<WinnerDoc | null> {
  await connectDB();
  const cleaned = mobile.replace(/\D/g, "");
  const doc = await Winner.findOne({
    $or: [{ mobile: cleaned }, { mobile }, { mobile: mobile.trim() }],
  }).lean();
  return (doc as unknown as WinnerDoc) || null;
}

export async function createWinner(data: {
  name: string;
  mobile: string;
  position: number;
  ticketNumber: string;
  date: string;
}) {
  await connectDB();
  return Winner.create({
    ...data,
    mobile: data.mobile.replace(/\D/g, ""),
    ticketNumber: data.ticketNumber.toUpperCase().trim(),
    name: data.name.trim().toUpperCase(),
  });
}

export async function listWinners(): Promise<WinnerDoc[]> {
  await connectDB();
  const docs = await Winner.find().sort({ createdAt: -1 }).lean();
  return docs as unknown as WinnerDoc[];
}

export async function deleteWinner(id: string) {
  await connectDB();
  return Winner.findByIdAndDelete(id);
}

export async function buildPrizeTickets(
  highlightTicket?: string,
  highlightPosition?: number
) {
  await connectDB();
  const winners = (await Winner.find().lean()) as unknown as WinnerDoc[];

  const byPosition: Record<number, string[]> = {};

  for (const tier of PRIZE_TIERS) {
    const rawRegistered = winners
      .filter((w) => Number(w.position) === tier.rank)
      .map((w) => String(w.ticketNumber).toUpperCase());
    
    // Remove duplicates from registered
    const registered = Array.from(new Set(rawRegistered));

    const tickets = generateFillerTickets(tier.rank, tier.ticketCount);

    // Remove registered tickets from the generated filler list to avoid duplicates
    const availableFiller = tickets.filter(t => !registered.includes(t));

    const frontTickets = [...registered];
    const upperHighlight = highlightTicket?.toUpperCase();

    // Ensure the highlight ticket is included at the front if it belongs to this tier
    if (upperHighlight && highlightPosition === tier.rank && !frontTickets.includes(upperHighlight)) {
      frontTickets.unshift(upperHighlight);
      // also remove it from filler if it happens to be there
      const idx = availableFiller.indexOf(upperHighlight);
      if (idx !== -1) availableFiller.splice(idx, 1);
    }

    const finalTickets = [];
    const totalSlots = Math.max(tier.ticketCount, frontTickets.length);
    
    for (let i = 0; i < totalSlots; i++) {
      if (i < frontTickets.length) {
        finalTickets.push(frontTickets[i]);
      } else {
        const nextFiller = availableFiller.shift();
        finalTickets.push(nextFiller || `KL${tier.rank}999${i}`);
      }
    }

    byPosition[tier.rank] = finalTickets;
  }

  return byPosition;
}

export async function registerAdmin(data: {
  name: string;
  email: string;
  password: string;
}) {
  await connectDB();
  const exists = await Admin.findOne({ email: data.email.toLowerCase() });
  if (exists) {
    throw new Error("Admin already registered with this email");
  }
  const hashed = await bcrypt.hash(data.password, 10);
  return Admin.create({
    name: data.name.trim(),
    email: data.email.toLowerCase().trim(),
    password: hashed,
  });
}

export async function loginAdmin(email: string, password: string) {
  await connectDB();
  const admin = await Admin.findOne({ email: email.toLowerCase().trim() });
  if (!admin) return null;
  const ok = await bcrypt.compare(password, admin.password);
  if (!ok) return null;
  return admin;
}

export async function ensureDefaultAdmin() {
  await connectDB();
  const email = process.env.ADMIN_DEFAULT_EMAIL || "admin@keralalottery.com";
  const password = process.env.ADMIN_DEFAULT_PASSWORD || "admin123";
  const existing = await Admin.findOne({ email });
  if (!existing) {
    const hashed = await bcrypt.hash(password, 10);
    await Admin.create({
      name: "Admin",
      email,
      password: hashed,
    });
  }
}

export { getPrizeTier };
