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
        "group block overflow-hidden rounded-xl bg-card border border-border transition-all hover:shadow-lg hover:border-primary/20",
        className
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={destination.image}
          alt={destination.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex items-center gap-1.5 text-white/90 text-sm">
            <MapPin className="h-3.5 w-3.5" />
            <span>{destination.country}</span>
          </div>
          <h3 className="mt-1 text-lg font-semibold text-white">{destination.name}</h3>
        </div>
      </div>
      <div className="p-4">
        <p className="text-sm text-muted-foreground line-clamp-2">{destination.shortDescription}</p>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-sm">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="font-medium text-foreground">{destination.rating}</span>
            <span className="text-muted-foreground">({destination.reviewCount})</span>
          </div>
          <span className="text-sm font-semibold text-primary">
            From ${destination.priceFrom}
          </span>
        </div>
      </div>
    </Link>
  );
}
