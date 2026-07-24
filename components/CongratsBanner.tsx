"use client";

import { positionLabel } from "@/lib/prizes";
import type { Winner } from "@/types";

export default function CongratsBanner({ winner }: { winner: Winner }) {
  return (
    <div className="mx-auto mt-5 w-full max-w-md rounded-2xl bg-white px-4 py-6 text-center shadow-xl">
      <h2
        className="text-2xl font-extrabold tracking-wide sm:text-3xl"
        style={{
          background:
            "linear-gradient(90deg,#e11d48,#f59e0b,#16a34a,#2563eb,#a855f7)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        🎉 CONGRATULATIONS 🎉
      </h2>
      <p className="mt-4 text-2xl font-black uppercase tracking-wide text-green-700 sm:text-3xl">
        {winner.name}
      </p>
      <p className="mt-1 text-base text-gray-800 sm:text-lg">
        {positionLabel(Number(winner.position))}
      </p>
    </div>
  );
}
