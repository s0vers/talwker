"use client";

import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

export function MobileBookingCTA() {
  // Removed - kept simple without sticky mobile CTA
  return null;
}

export function ScrollToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-30 w-10 h-10 bg-white border border-slate-200 rounded-full shadow-lg flex items-center justify-center hover:bg-slate-50"
      aria-label="Scroll to top"
    >
      <ChevronUp className="h-5 w-5 text-slate-600" />
    </button>
  );
}
