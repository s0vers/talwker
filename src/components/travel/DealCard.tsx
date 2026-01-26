"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, Tag, Flame, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface DealCardProps {
  deal: Deal;
  variant?: "default" | "featured" | "compact";
  className?: string;
}

export function DealCard({ deal, variant = "default", className }: DealCardProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(deal.validUntil).getTime() - new Date().getTime();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [deal.validUntil]);

  const savingsAmount = deal.originalPrice - deal.finalPrice;
  const savingsPercent = Math.round((savingsAmount / deal.originalPrice) * 100);

  if (variant === "featured") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Link
          href={`/deals/${deal.id}`}
          className={cn(
            "group relative block overflow-hidden rounded-3xl",
            className
          )}
        >
          <div className="relative aspect-[21/9] overflow-hidden">
            <Image
              src={deal.image}
              alt={deal.title}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-105"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          </div>

          <div className="absolute inset-0 flex items-center p-8 md:p-12">
            <div className="max-w-xl">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="destructive" className="gap-1">
                  <Flame className="h-3 w-3" />
                  Hot Deal
                </Badge>
                {deal.limited && deal.spotsLeft && (
                  <Badge variant="warning">
                    Only {deal.spotsLeft} spots left!
                  </Badge>
                )}
              </div>

              <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">
                {deal.title}
              </h2>
              <p className="mt-2 text-lg text-white/80">{deal.description}</p>

              <div className="mt-6 flex flex-wrap items-center gap-6">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg text-white/60 line-through">
                      ${deal.originalPrice}
                    </span>
                    <span className="text-4xl font-bold text-white">
                      ${deal.finalPrice}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-emerald-400">
                    Save ${savingsAmount} ({savingsPercent}% off)
                  </p>
                </div>

                {/* Countdown */}
                <div className="flex gap-3">
                  {[
                    { label: "Days", value: timeLeft.days },
                    { label: "Hours", value: timeLeft.hours },
                    { label: "Min", value: timeLeft.minutes },
                    { label: "Sec", value: timeLeft.seconds },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-lg bg-white/10 px-3 py-2 text-center backdrop-blur-sm"
                    >
                      <div className="text-2xl font-bold text-white">
                        {item.value.toString().padStart(2, "0")}
                      </div>
                      <div className="text-xs text-white/60">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <button className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-slate-900 transition-all hover:bg-primary hover:text-white">
                Grab This Deal
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  if (variant === "compact") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
      >
        <Link
          href={`/deals/${deal.id}`}
          className={cn(
            "group flex items-center gap-4 rounded-xl bg-gradient-to-r from-primary/5 to-amber-500/5 p-4 transition-all hover:from-primary/10 hover:to-amber-500/10",
            className
          )}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Tag className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-slate-900">{deal.title}</h4>
            <p className="text-sm text-slate-600">
              Save up to {savingsPercent}%
            </p>
          </div>
          <ArrowRight className="h-5 w-5 text-slate-400 transition-transform group-hover:translate-x-1" />
        </Link>
      </motion.div>
    );
  }

  // Default variant
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Link
        href={`/deals/${deal.id}`}
        className={cn(
          "group block overflow-hidden rounded-2xl bg-white shadow-card transition-all duration-300 hover:-translate-y-2 hover:shadow-card-hover",
          className
        )}
      >
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={deal.image}
            alt={deal.title}
            fill
            className="object-cover transition-all duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            <Badge variant="destructive" className="gap-1">
              <Flame className="h-3 w-3" />
              {savingsPercent}% OFF
            </Badge>
            {deal.limited && deal.spotsLeft && (
              <Badge variant="warning">{deal.spotsLeft} left</Badge>
            )}
          </div>

          {/* Countdown timer */}
          <div className="absolute bottom-3 left-3 right-3">
            <div className="flex items-center gap-2 rounded-xl bg-black/40 px-3 py-2 backdrop-blur-sm">
              <Clock className="h-4 w-4 text-white" />
              <span className="text-sm font-medium text-white">
                {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m left
              </span>
            </div>
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-slate-900 group-hover:text-primary transition-colors line-clamp-2">
            {deal.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-slate-600">
            {deal.description}
          </p>

          <div className="mt-4 flex items-center justify-between">
            <div>
              <span className="text-sm text-slate-400 line-through">
                ${deal.originalPrice}
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold text-primary">
                  ${deal.finalPrice}
                </span>
                <span className="text-xs text-slate-500">/ person</span>
              </div>
            </div>
            <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition-all group-hover:bg-primary group-hover:text-white">
              View Deal
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
