"use client";

import Image from "next/image";
import { useState } from "react";

export default function Banner() {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="w-full overflow-hidden rounded-xl shadow-lg">
      {!imgError ? (
        <Image
          src="/banner.jpeg"
          alt="Kerala Lottery"
          width={900}
          height={320}
          className="h-auto w-full object-cover"
          priority
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="relative flex min-h-[160px] w-full flex-col items-center justify-center bg-gradient-to-r from-emerald-700 via-green-600 to-emerald-800 px-4 py-8 text-center text-white sm:min-h-[220px]">
          <h1 className="relative mt-1 font-display text-3xl font-bold tracking-wide sm:text-4xl">
            Kerala Lottery
          </h1>
          <p className="relative mt-3 text-lg font-bold text-yellow-300">
            ₹25 CRORE • ₹1 LAKH
          </p>
        </div>
      )}
    </div>
  );
}
