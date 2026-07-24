"use client";

import { useEffect, useState } from "react";

export default function ScrollBackground() {
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollPct(Math.min(1, Math.max(0, scrollTop / docHeight)));
      } else {
        setScrollPct(0);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    
    // Initial check
    setTimeout(handleScroll, 100);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // Calculate opacities based on scroll percentage (0 to 1)
  let op1 = 1, op2 = 0, op3 = 0;
  
  if (scrollPct < 0.5) {
    op1 = 1 - (scrollPct * 2);
    op2 = scrollPct * 2;
  } else {
    op1 = 0;
    op2 = 1 - ((scrollPct - 0.5) * 2);
    op3 = (scrollPct - 0.5) * 2;
  }

  return (
    <>
      {/* Base Dark Background */}
      <div className="fixed inset-0 -z-50 bg-[#0c0404]" />
      
      {/* Layer 1: Slight Red (Top of page) */}
      <div 
        className="fixed inset-0 -z-40 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-950 via-[#0c0404] to-[#0c0404]"
        style={{ opacity: op1 }}
      />

      {/* Layer 2: Orange (Middle of page) */}
      <div 
        className="fixed inset-0 -z-40 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-950 via-amber-950 to-[#0c0404]"
        style={{ opacity: op2 }}
      />

      {/* Layer 3: Yellowish (Bottom of page) */}
      <div 
        className="fixed inset-0 -z-40 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-yellow-900 via-yellow-950 to-[#0c0404]"
        style={{ opacity: op3 }}
      />
    </>
  );
}
