"use client";

export default function Ticker() {
  const text =
    "🔥 Kerala Lottery Today Live Result 🔥 Kerala Lottery Today Live Result • ";

  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-700 via-fuchsia-600 to-green-600 py-2.5 shadow-lg">
      <div className="flex w-max animate-marquee whitespace-nowrap">
        <span className="px-4 text-base font-bold tracking-wide text-white sm:text-lg">
          {text}
          {text}
        </span>
        <span className="px-4 text-base font-bold tracking-wide text-white sm:text-lg">
          {text}
          {text}
        </span>
      </div>
    </div>
  );
}
