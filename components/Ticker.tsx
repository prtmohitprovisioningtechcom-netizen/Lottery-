"use client";

export default function Ticker() {
  const text =
    "🔥 Kerala Lottery Today Result 🔥 Kerala Lottery Today Result • ";

  return (
    <div className="relative mt-3 overflow-hidden rounded-md bg-gradient-to-r from-purple-700 via-fuchsia-600 to-green-600 py-2 shadow">
      <div className="flex w-max animate-marquee whitespace-nowrap">
        <span className="px-4 text-sm font-bold tracking-wide text-white sm:text-base">
          {text}
          {text}
        </span>
        <span className="px-4 text-sm font-bold tracking-wide text-white sm:text-base">
          {text}
          {text}
        </span>
      </div>
    </div>
  );
}
