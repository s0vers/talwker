"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

interface DealCardProps {
  deal: Deal;
  className?: string;
}

export function DealCard({ deal, className }: DealCardProps) {
  const savingsPercent = Math.round(
    ((deal.originalPrice - deal.finalPrice) / deal.originalPrice) * 100
  );

  return (
    <Link
      href={`/trips/${deal.tripPackage.id}`}
      className={cn(
        "group block overflow-hidden rounded-xl bg-card border border-border transition-all hover:shadow-lg hover:border-primary/20",
        className
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={deal.image}
          alt={deal.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="bg-red-500 text-white text-xs font-semibold px-2.5 py-1 rounded-md flex items-center gap-1">
            <Flame className="h-3 w-3" />
            {savingsPercent}% OFF
          </span>
          {deal.spotsLeft && (
            <span className="bg-amber-500 text-white text-xs font-semibold px-2.5 py-1 rounded-md">
              {deal.spotsLeft} left
            </span>
          )}
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-lg font-semibold text-white line-clamp-2">{deal.title}</h3>
        </div>
      </div>
      <div className="p-4">
        <p className="text-sm text-muted-foreground line-clamp-2">{deal.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <span className="text-sm text-muted-foreground line-through">${deal.originalPrice}</span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-foreground">${deal.finalPrice}</span>
              <span className="text-sm text-muted-foreground">/person</span>
            </div>
          </div>
          <span className="text-sm font-semibold text-primary group-hover:underline">
            View Deal →
          </span>
        </div>
      </div>
    </Link>
  );
}
