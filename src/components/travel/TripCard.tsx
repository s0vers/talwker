"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, Clock, MapPin, Users, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface TripCardProps {
  trip: TripPackage;
  variant?: "default" | "horizontal";
  className?: string;
}

export function TripCard({ trip, variant = "default", className }: TripCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  const discount = trip.price.originalPrice
    ? Math.round(((trip.price.originalPrice - trip.price.amount) / trip.price.originalPrice) * 100)
    : 0;

  if (variant === "horizontal") {
    return (
      <Link
        href={`/trips/${trip.id}`}
        className={cn(
          "group flex flex-col sm:flex-row overflow-hidden rounded-2xl bg-card border border-border transition-all duration-300 hover:shadow-xl hover:border-primary/20 hover:-translate-y-1",
          className
        )}
      >
        <div className="relative aspect-video sm:aspect-square sm:w-56 flex-shrink-0 overflow-hidden">
          <Image
            src={trip.coverImage}
            alt={trip.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="224px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          {discount > 0 && (
            <span className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-rose-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg">
              {discount}% OFF
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold text-primary">{trip.category}</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground" />
            <span className="text-muted-foreground flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {trip.destination.name}
            </span>
          </div>
          <h3 className="mt-2 font-bold text-lg text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {trip.title}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{trip.shortDescription}</p>
          <div className="mt-auto pt-4 flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {trip.duration.days}D/{trip.duration.nights}N
              </span>
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                {trip.rating}
              </span>
            </div>
            <div className="text-right">
              {trip.price.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">${trip.price.originalPrice}</span>
              )}
              <span className="ml-2 text-xl font-bold text-foreground">${trip.price.amount}</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/trips/${trip.id}`}
      className={cn(
        "group block overflow-hidden rounded-2xl bg-card border border-border transition-all duration-300 hover:shadow-xl hover:border-primary/20 hover:-translate-y-1",
        className
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={trip.coverImage}
          alt={trip.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Wishlist Button */}
        <button
          onClick={(e) => { e.preventDefault(); setIsWishlisted(!isWishlisted); }}
          className={cn(
            "absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all",
            isWishlisted 
              ? "bg-red-500 text-white" 
              : "bg-white/90 text-slate-600 hover:bg-white hover:text-red-500"
          )}
        >
          <Heart className={cn("h-4 w-4", isWishlisted && "fill-current")} />
        </button>

        {discount > 0 && (
          <span className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-rose-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg">
            {discount}% OFF
          </span>
        )}
        
        {/* Bottom Tags */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <span className="bg-white/95 backdrop-blur-sm text-slate-800 text-xs font-semibold px-3 py-1.5 rounded-lg shadow">
            {trip.category}
          </span>
          <span className="bg-white/95 backdrop-blur-sm text-slate-800 text-xs font-semibold px-3 py-1.5 rounded-lg shadow flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {trip.duration.days}D
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          <span>{trip.destination.name}, {trip.destination.country}</span>
        </div>
        
        <h3 className="mt-2 font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {trip.title}
        </h3>
        
        <div className="mt-3 flex items-center gap-2">
          <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded-md">
            <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
            <span className="text-sm font-semibold text-amber-700 dark:text-amber-400">{trip.rating}</span>
          </div>
          <span className="text-sm text-muted-foreground">({trip.reviewCount} reviews)</span>
        </div>
        
        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
          <div>
            {trip.price.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">${trip.price.originalPrice}</span>
            )}
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-foreground">${trip.price.amount}</span>
              <span className="text-sm text-muted-foreground">/person</span>
            </div>
          </div>
          <span className="text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
            View Details →
          </span>
        </div>
      </div>
    </Link>
  );
}
