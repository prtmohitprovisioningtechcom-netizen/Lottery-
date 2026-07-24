"use client";

import { PRIZE_TIERS } from "@/lib/prizes";

interface PrizeCardsProps {
  prizeTickets: Record<number, string[]>;
  highlightTicket?: string;
  highlightPosition?: number;
}

// Force Tailwind to pick up these classes without restarting the dev server
const _safelist = [
  "from-purple-600", "to-violet-600", "hover:from-purple-700", "hover:to-violet-700",
  "from-blue-600", "to-cyan-600", "hover:from-blue-700", "hover:to-cyan-700",
  "from-red-600", "to-rose-700", "hover:from-red-700", "hover:to-rose-800",
];

export default function PrizeCards({
  prizeTickets,
  highlightTicket,
  highlightPosition,
}: PrizeCardsProps) {
  return (
    <div className="mx-auto mt-5 w-full max-w-md space-y-4">
      {PRIZE_TIERS.map((tier) => {
        const tickets = prizeTickets[tier.rank] || [];
        return (
          <div
            key={tier.rank}
            className="rounded-[24px] bg-white p-3 shadow-xl sm:p-4"
          >
            <div
              className={`rounded-2xl bg-gradient-to-r ${tier.headerClass} px-3 py-3 text-center transition-all duration-300 ease-in-out hover:scale-[1.01]`}
            >
              <p className="text-base font-bold text-white shadow-sm drop-shadow sm:text-lg">
                {tier.icon} {tier.label} {tier.amount}
              </p>
            </div>

            <div
              className={`mt-4 grid gap-2 sm:gap-3 ${
                tier.ticketCount === 1
                  ? "grid-cols-1 place-items-center"
                  : tier.ticketCount <= 5
                    ? "grid-cols-2 sm:grid-cols-3"
                    : "grid-cols-2 sm:grid-cols-4"
              }`}
            >
              {tickets.map((ticket, idx) => {
                const isHighlight =
                  highlightTicket &&
                  highlightPosition === tier.rank &&
                  ticket.toUpperCase() === highlightTicket.toUpperCase();

                return (
                  <div
                    key={`${tier.rank}-${idx}-${ticket}`}
                    className={`rounded-full border px-2 py-1.5 text-center text-xs font-semibold tracking-wide sm:text-sm ${
                      isHighlight
                        ? "border-yellow-400 bg-yellow-300 text-black shadow"
                        : "border-gray-200 bg-white text-gray-800"
                    }`}
                  >
                    {ticket}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
