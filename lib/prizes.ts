import { PrizeTier } from "@/types";

export const PRIZE_TIERS: PrizeTier[] = [
  {
    rank: 1,
    label: "1st Prize",
    amount: "₹25 Crore",
    icon: "🥇",
    ticketCount: 1,
    headerClass: "from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700",
  },
  {
    rank: 2,
    label: "2nd Prize",
    amount: "₹10 Crore",
    icon: "🥈",
    ticketCount: 1,
    headerClass: "from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700",
  },
  {
    rank: 3,
    label: "3rd Prize",
    amount: "₹1 Crore",
    icon: "🥉",
    ticketCount: 5,
    headerClass: "from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700",
  },
  {
    rank: 4,
    label: "4th Prize",
    amount: "₹25 Lakh",
    icon: "🏅",
    ticketCount: 8,
    headerClass: "from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700",
  },
  {
    rank: 5,
    label: "5th Prize",
    amount: "₹8 Lakh",
    icon: "🏆",
    ticketCount: 12,
    headerClass: "from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700",
  },
  {
    rank: 6,
    label: "6th Prize",
    amount: "₹1 Lakh",
    icon: "💎",
    ticketCount: 12,
    headerClass: "from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700",
  },
  {
    rank: 7,
    label: "7th Prize",
    amount: "₹50 Thousand",
    icon: "⭐",
    ticketCount: 12,
    headerClass: "from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700",
  },
  {
    rank: 8,
    label: "8th Prize",
    amount: "₹10 Thousand",
    icon: "💰",
    ticketCount: 12,
    headerClass: "from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700",
  },
  {
    rank: 9,
    label: "9th Prize",
    amount: "₹5 Thousand",
    icon: "🎉",
    ticketCount: 12,
    headerClass: "from-red-600 to-rose-700 hover:from-red-700 hover:to-rose-800",
  },
  {
    rank: 10,
    label: "10th Prize",
    amount: "₹2 Thousand",
    icon: "🎁",
    ticketCount: 12,
    headerClass: "from-red-600 to-rose-700 hover:from-red-700 hover:to-rose-800",
  },
  {
    rank: 11,
    label: "11th Prize",
    amount: "₹1 Thousand",
    icon: "⭐",
    ticketCount: 12,
    headerClass: "from-red-600 to-rose-700 hover:from-red-700 hover:to-rose-800",
  },
  {
    rank: 12,
    label: "12th Prize",
    amount: "₹500",
    icon: "🔥",
    ticketCount: 12,
    headerClass: "from-red-600 to-rose-700 hover:from-red-700 hover:to-rose-800",
  },
  {
    rank: 13,
    label: "13th Prize",
    amount: "₹100",
    icon: "🎫",
    ticketCount: 12,
    headerClass: "from-red-600 to-rose-700 hover:from-red-700 hover:to-rose-800",
  },
];

export function getPrizeTier(rank: number): PrizeTier | undefined {
  return PRIZE_TIERS.find((t) => t.rank === rank);
}

export function positionLabel(rank: number): string {
  const tier = getPrizeTier(rank);
  if (!tier) return `${rank}th Winner`;
  return `${tier.label.replace(" Prize", "")} Winner`;
}

/** Generate display tickets like KL120001 for prize grids */
export function generateFillerTickets(
  rank: number,
  count: number,
  highlightTicket?: string
): string[] {
  const tickets: string[] = [];
  const base = rank * 10000;

  for (let i = 1; i <= count; i++) {
    const num = String(base + i).padStart(6, "0");
    tickets.push(`KL${num}`);
  }

  if (highlightTicket && count > 0) {
    const idx = Math.min(4, count - 1);
    tickets[idx] = highlightTicket.toUpperCase();
  }

  return tickets;
}
