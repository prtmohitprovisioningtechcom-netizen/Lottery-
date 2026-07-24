"use client";

import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import type { Winner } from "@/types";
import { getPrizeTier } from "@/lib/prizes";

export default function CertificateCard({ winner }: { winner: Winner }) {
  const certRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const tier = getPrizeTier(Number(winner.position));

  async function downloadCertificate() {
    if (!certRef.current) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(certRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });
      const link = document.createElement("a");
      link.download = `Kerala-Lottery-Certificate-${winner.name.replace(/\s+/g, "-")}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div className="mx-auto mt-5 w-full max-w-md rounded-2xl bg-white p-4 shadow-xl sm:p-5">
      <h2
        className="text-center text-2xl font-extrabold tracking-wide sm:text-3xl"
        style={{
          background:
            "linear-gradient(90deg,#e11d48,#f59e0b,#16a34a,#2563eb,#a855f7)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        🎉 CONGRATULATIONS 🎉
      </h2>
      <p className="text-center text-2xl font-black uppercase tracking-wide text-green-700">
        {winner.name}
      </p>
      <p className="mt-1 text-center text-base text-gray-800">
        {tier
          ? `${tier.label.replace(" Prize", "")} Winner`
          : `${winner.position}th Winner`}
      </p>

      <div className="mt-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 px-4 py-2.5 text-center shadow">
        <p className="text-sm font-bold text-white sm:text-base">
          🎫 Ticket : {winner.ticketNumber}
        </p>
      </div>

      {/* Certificate — name / ticket / date auto-fill from DB */}
      <div
        ref={certRef}
        className="relative mt-4 overflow-hidden rounded-lg bg-[#f8fafc] p-4 min-h-[300px]"
        style={{
          backgroundImage: "url(/certificate.jpeg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative z-10 flex h-full flex-col items-center justify-center pt-24 pb-8 text-center">
          <p className="text-2xl font-extrabold uppercase text-gray-900 drop-shadow-md">
            {winner.name}
          </p>
          <p className="mt-5 max-w-[260px] px-2 text-[8px] leading-relaxed text-gray-700 drop-shadow sm:max-w-xs sm:px-4 sm:text-[9px]">
            In Appreciation for the achievement of{" "}
            <strong>
              {tier?.label || `${winner.position}th Prize`} Winner
            </strong>{" "}
            Place in Kerala Government Lottery at the Winning Level. Thank You
            For Your Participation.
          </p>
          <div className="mt-6 flex justify-center gap-6 text-xs font-bold text-gray-800 drop-shadow -translate-x-4">
            <p className="-translate-x-6 translate-y-2">{winner.date}</p>
            <p className="-translate-x-3 translate-y-2">{winner.ticketNumber}</p>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={downloadCertificate}
        disabled={downloading}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-green-700 py-3.5 text-base font-bold text-white shadow transition hover:bg-green-800 disabled:opacity-60"
      >
        ⬇ {downloading ? "Downloading..." : "Download Certificate"}
      </button>
    </div>
  );
}
