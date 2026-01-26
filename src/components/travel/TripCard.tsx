"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, Clock, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface TripCardProps {
  trip: TripPackage;
  variant?: "default" | "horizontal";
  className?: string;
}

export function TripCard({ trip, variant = "default", className }: TripCardProps) {
  const discount = trip.price.originalPrice
    ? Math.round(((trip.price.originalPrice - trip.price.amount) / trip.price.originalPrice) * 100)
    : 0;

  if (variant === "horizontal") {
    return (
      <Link
        href={`/trips/${trip.id}`}
        className={cn(
          "group flex flex-col sm:flex-row overflow-hidden rounded-xl bg-card border border-border transition-all hover:shadow-lg hover:border-primary/20",
          className
        )}
      >
        <div className="relative aspect-video sm:aspect-square sm:w-48 flex-shrink-0 overflow-hidden">
          <Image
            src={trip.coverImage}
            alt={trip.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="200px"
          />
          {discount > 0 && (
            <span className="absolute top-3 left-3 bg-primary text-white text-xs font-semibold px-2.5 py-1 rounded-md">
              {discount}% OFF
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col p-4">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium text-primary">{trip.category}</span>
            <span className="text-muted-foreground">·</span>
            <span className="text-muted-foreground flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {trip.destination.name}
            </span>
          </div>
          <h3 className="mt-2 font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {trip.title}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{trip.shortDescription}</p>
          <div className="mt-auto pt-4 flex items-center justify-between">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {trip.duration.days}D
              </span>
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                {trip.rating}
              </span>
            </div>
            <div className="text-right">
              {trip.price.originalPrice && (
                <span className="text-sm text-muted-foreground line-through mr-2">${trip.price.originalPrice}</span>
              )}
              <span className="font-semibold text-foreground">${trip.price.amount}</span>
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
        "group block overflow-hidden rounded-xl bg-card border border-border transition-all hover:shadow-lg hover:border-primary/20",
        className
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={trip.coverImage}
          alt={trip.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        {discount > 0 && (
          <span className="absolute top-3 left-3 bg-primary text-white text-xs font-semibold px-2.5 py-1 rounded-md">
            {discount}% OFF
          </span>
        )}
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <span className="bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-md">
            {trip.category}
          </span>
          <span className="bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-md flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {trip.duration.days}D
          </span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          <span>{trip.destination.name}, {trip.destination.country}</span>
        </div>
        <h3 className="mt-2 font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {trip.title}
        </h3>
        <div className="mt-3 flex items-center gap-2 text-sm">
          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
          <span className="font-medium text-foreground">{trip.rating}</span>
          <span className="text-muted-foreground">({trip.reviewCount} reviews)</span>
        </div>
        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
          <div>
            {trip.price.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">${trip.price.originalPrice}</span>
            )}
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-foreground">${trip.price.amount}</span>
              <span className="text-sm text-muted-foreground">/person</span>
            </div>
          </div>
          <span className="text-sm font-semibold text-primary group-hover:underline">
            View Details →
          </span>
        </div>
      </div>
    </Link>
  );
}
