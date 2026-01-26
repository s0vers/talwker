"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface DestinationCardProps {
  destination: Destination;
  className?: string;
}

export function DestinationCard({ destination, className }: DestinationCardProps) {
  return (
    <Link
      href={`/search?destination=${destination.id}`}
      className={cn(
        "group block overflow-hidden rounded-xl bg-white border border-slate-100 transition-all hover:shadow-lg",
        className
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={destination.image}
          alt={destination.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center gap-1 text-xs text-slate-500">
          <MapPin className="h-3 w-3" />
          <span>{destination.country}</span>
        </div>
        <h3 className="mt-1 font-semibold text-slate-900">{destination.name}</h3>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span className="font-medium">{destination.rating}</span>
            <span className="text-slate-400">({destination.reviewCount})</span>
          </div>
          <span className="text-sm font-semibold text-primary">
            From ${destination.priceFrom}
          </span>
        </div>
      </div>
    </Link>
  );
}
