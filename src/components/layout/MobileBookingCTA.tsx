"use client";

import { useState, useEffect } from "react";
import { Calendar, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface MobileBookingCTAProps {
  price: number;
  originalPrice?: number;
  currency?: string;
  onBook?: () => void;
}

export function MobileBookingCTA({
  price,
  originalPrice,
  currency = "$",
  onBook,
}: MobileBookingCTAProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling down 400px
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-40 md:hidden"
        >
          <div className="border-t bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
            {/* Expanded content */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden border-b"
                >
                  <div className="space-y-3 p-4">
                    <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                      <Calendar className="h-5 w-5 text-primary" />
                      <div className="flex-1">
                        <p className="text-xs text-slate-500">Select Date</p>
                        <p className="font-medium">Choose your travel date</p>
                      </div>
                    </div>
                    <p className="text-center text-sm text-slate-500">
                      Free cancellation up to 48 hours before
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main CTA bar */}
            <div className="flex items-center justify-between p-4">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-1 text-slate-500"
              >
                <ChevronUp
                  className={cn(
                    "h-5 w-5 transition-transform",
                    isExpanded && "rotate-180"
                  )}
                />
              </button>

              <div className="flex-1 px-4">
                <div className="flex items-baseline gap-2">
                  {originalPrice && (
                    <span className="text-sm text-slate-400 line-through">
                      {currency}
                      {originalPrice}
                    </span>
                  )}
                  <span className="text-2xl font-bold text-slate-900">
                    {currency}
                    {price}
                  </span>
                  <span className="text-sm text-slate-500">/ person</span>
                </div>
                {discount > 0 && (
                  <span className="text-sm font-medium text-green-600">
                    Save {discount}%
                  </span>
                )}
              </div>

              <button
                onClick={onBook}
                className="rounded-xl bg-primary px-6 py-3 font-semibold text-white shadow-lg shadow-primary/30 transition-all active:scale-95"
              >
                Book Now
              </button>
            </div>

            {/* Safe area padding for iOS */}
            <div className="h-safe-area-inset-bottom bg-white" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Scroll to top button
export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-24 right-4 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg transition-all hover:bg-slate-50 md:bottom-8"
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-6 w-6 text-slate-700" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
