"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, Clock, Users } from "lucide-react";
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
          "group flex flex-col sm:flex-row overflow-hidden rounded-xl bg-white border border-slate-100 transition-all hover:shadow-lg",
          className
        )}
      >
        <div className="relative aspect-video sm:aspect-square sm:w-56 flex-shrink-0 overflow-hidden">
          <Image
            src={trip.coverImage}
            alt={trip.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="224px"
          />
          {discount > 0 && (
            <span className="absolute top-3 left-3 bg-primary text-white text-xs font-medium px-2 py-1 rounded">
              {discount}% OFF
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col p-4">
          <span className="text-xs font-medium text-primary">{trip.category}</span>
          <h3 className="mt-1 font-semibold text-slate-900 line-clamp-2 group-hover:text-primary transition-colors">
            {trip.title}
          </h3>
          <p className="mt-1 text-sm text-slate-500 line-clamp-2">{trip.shortDescription}</p>
          <div className="mt-auto pt-3 flex items-center justify-between">
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {trip.duration.days}D
              </span>
              <span className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                {trip.rating}
              </span>
            </div>
            <div className="text-right">
              {trip.price.originalPrice && (
                <span className="text-xs text-slate-400 line-through">${trip.price.originalPrice}</span>
              )}
              <span className="ml-1 font-semibold text-slate-900">${trip.price.amount}</span>
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
        "group block overflow-hidden rounded-xl bg-white border border-slate-100 transition-all hover:shadow-lg",
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
          <span className="absolute top-3 left-3 bg-primary text-white text-xs font-medium px-2 py-1 rounded">
            {discount}% OFF
          </span>
        )}
      </div>
      <div className="p-4">
        <span className="text-xs font-medium text-primary">{trip.category}</span>
        <h3 className="mt-1 font-semibold text-slate-900 line-clamp-2 group-hover:text-primary transition-colors">
          {trip.title}
        </h3>
        <div className="mt-3 flex items-center gap-3 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {trip.duration.days} Days
          </span>
          <span className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            {trip.rating}
          </span>
        </div>
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            {trip.price.originalPrice && (
              <span className="text-xs text-slate-400 line-through">${trip.price.originalPrice}</span>
            )}
            <span className="ml-1 text-lg font-semibold text-slate-900">${trip.price.amount}</span>
            <span className="text-xs text-slate-500">/person</span>
          </div>
          <span className="text-sm font-medium text-primary">View Trip →</span>
        </div>
      </div>
    </Link>
  );
}
