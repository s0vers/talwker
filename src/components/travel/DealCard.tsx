"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
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
        "group block overflow-hidden rounded-xl bg-white border border-slate-100 transition-all hover:shadow-lg",
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <span className="inline-block bg-primary text-white text-xs font-medium px-2 py-1 rounded mb-2">
            Save {savingsPercent}%
          </span>
          <h3 className="text-white font-semibold line-clamp-2">{deal.title}</h3>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm text-slate-400 line-through">${deal.originalPrice}</span>
            <span className="ml-2 text-lg font-semibold text-slate-900">${deal.finalPrice}</span>
            <span className="text-xs text-slate-500">/person</span>
          </div>
          {deal.spotsLeft && (
            <span className="text-xs text-amber-600 font-medium">
              {deal.spotsLeft} spots left
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
