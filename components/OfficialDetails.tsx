"use client";

import type { Winner } from "@/types";

export default function OfficialDetails({ winner }: { winner: Winner }) {
  return (
    <div className="mx-auto mt-5 mb-10 w-full max-w-md rounded-2xl bg-white p-5 shadow-xl">
      <h3 className="mb-4 text-center text-lg font-bold text-red-800">
        📋 Official Lottery Details
      </h3>

      <div className="space-y-3">
        <DetailBlock
          bg="bg-amber-50"
          labelColor="text-amber-800"
          icon="✏️"
          label="Lottery Name"
          value="VISHU BUMPER LOTTERY 2026"
        />
        <DetailBlock
          bg="bg-sky-50"
          labelColor="text-sky-700"
          icon="📅"
          label="Draw Date"
          value={winner.date}
        />
        <DetailBlock
          bg="bg-green-50"
          labelColor="text-green-800"
          icon="📍"
          label="Draw Venue"
          value="AT GORKY BHAVAN THIRUVANANTHAPURAM"
        />
        <DetailBlock
          bg="bg-indigo-50"
          labelColor="text-indigo-800"
          icon="🏆"
          label="Prize Information"
          value="Verify winning numbers with the official Kerala Government Gazette before claiming any prize."
          small
        />
        <DetailBlock
          bg="bg-rose-50"
          labelColor="text-rose-800"
          icon="⏰"
          label="Claim Time"
          value="Winning tickets must be surrendered within 90 days."
          small
        />
      </div>

      <div className="mt-6 border-t border-gray-100 pt-4 text-center">
        <p className="text-sm text-gray-500">👤</p>
        <p className="font-bold text-gray-900">Sd/- RAJKAPOOR</p>
        <p className="mt-1 text-xs leading-relaxed text-gray-600">
          Joint Director / Directorate Of State Lotteries / Thiruvananthapuram
        </p>
      </div>
    </div>
  );
}

function DetailBlock({
  bg,
  labelColor,
  icon,
  label,
  value,
  small,
}: {
  bg: string;
  labelColor: string;
  icon: string;
  label: string;
  value: string;
  small?: boolean;
}) {
  return (
    <div className={`rounded-xl ${bg} px-4 py-3`}>
      <p className={`text-sm font-semibold ${labelColor}`}>
        {icon} {label}
      </p>
      <p
        className={`mt-1 font-bold text-gray-900 ${
          small ? "text-xs font-medium leading-relaxed" : "text-sm uppercase"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
