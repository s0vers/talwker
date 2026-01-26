"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, TrendingUp } from "lucide-react";
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
        "group relative block overflow-hidden rounded-2xl aspect-[3/4] transition-all duration-300 hover:shadow-2xl hover:-translate-y-1",
        className
      )}
    >
      <Image
        src={destination.image}
        alt={destination.name}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      
      {/* Trending Badge */}
      {destination.trending && (
        <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-white/95 backdrop-blur-sm text-slate-800 text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
          <TrendingUp className="h-3 w-3 text-green-500" />
          Trending
        </div>
      )}
      
      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 p-5">
        <div className="flex items-center gap-1.5 text-white/80 text-sm mb-2">
          <MapPin className="h-3.5 w-3.5" />
          <span>{destination.country}</span>
        </div>
        
        <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">
          {destination.name}
        </h3>
        
        <p className="mt-2 text-white/70 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {destination.shortDescription}
        </p>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-md">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <span className="text-sm font-semibold text-white">{destination.rating}</span>
            </div>
            <span className="text-sm text-white/60">({destination.reviewCount})</span>
          </div>
          <div className="text-right">
            <span className="text-sm text-white/60">From</span>
            <span className="block text-xl font-bold text-white">${destination.priceFrom}</span>
          </div>
        </div>
      </div>
      
      {/* Hover Border Effect */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/50 rounded-2xl transition-colors" />
    </Link>
  );
}
