"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Star, Calendar, Users, Clock, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { motion } from "framer-motion";

interface TripCardProps {
  trip: TripPackage;
  variant?: "default" | "horizontal" | "featured";
  className?: string;
}

export function TripCard({ trip, variant = "default", className }: TripCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const discountPercentage = trip.price.originalPrice
    ? Math.round(
        ((trip.price.originalPrice - trip.price.amount) / trip.price.originalPrice) *
          100
      )
    : 0;

  if (variant === "horizontal") {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Link
          href={`/trips/${trip.id}`}
          className={cn(
            "group flex flex-col md:flex-row overflow-hidden rounded-2xl bg-white shadow-card transition-all duration-300 hover:shadow-card-hover",
            className
          )}
        >
          <div className="relative aspect-video md:aspect-auto md:w-80 flex-shrink-0 overflow-hidden">
            <Image
              src={trip.coverImage}
              alt={trip.title}
              fill
              className={cn(
                "object-cover transition-all duration-500 group-hover:scale-105",
                isImageLoaded ? "opacity-100" : "opacity-0"
              )}
              onLoad={() => setIsImageLoaded(true)}
              sizes="(max-width: 768px) 100vw, 320px"
            />
            {!isImageLoaded && (
              <div className="absolute inset-0 animate-pulse bg-slate-200" />
            )}
            
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsWishlisted(!isWishlisted);
              }}
              className="absolute right-3 top-3 z-10 rounded-full bg-white/90 p-2 shadow-lg transition-all hover:bg-white hover:scale-110"
            >
              <Heart
                className={cn(
                  "h-4 w-4 transition-colors",
                  isWishlisted ? "fill-red-500 text-red-500" : "text-slate-600"
                )}
              />
            </button>

            <div className="absolute left-3 top-3 flex flex-wrap gap-2">
              {trip.bestSeller && (
                <Badge variant="featured">Best Seller</Badge>
              )}
              {discountPercentage > 0 && (
                <Badge variant="discount">{discountPercentage}% OFF</Badge>
              )}
            </div>
          </div>

          <div className="flex flex-1 flex-col p-5">
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">{trip.category}</Badge>
              <Badge variant="outline">{trip.difficulty}</Badge>
            </div>

            <h3 className="mt-3 text-xl font-semibold text-slate-900 group-hover:text-primary transition-colors line-clamp-2">
              {trip.title}
            </h3>

            <div className="mt-2 flex items-center gap-1 text-sm text-slate-500">
              <MapPin className="h-4 w-4" />
              <span>{trip.destination.name}, {trip.destination.country}</span>
            </div>

            <p className="mt-2 line-clamp-2 text-sm text-slate-600 flex-1">
              {trip.shortDescription}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-600">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{trip.duration.days} Days</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>Max {trip.groupSize.max}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="font-medium">{trip.rating}</span>
                <span className="text-slate-400">({trip.reviewCount})</span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t pt-4">
              <div>
                {trip.price.originalPrice && (
                  <span className="text-sm text-slate-400 line-through">
                    ${trip.price.originalPrice}
                  </span>
                )}
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-primary">
                    ${trip.price.amount}
                  </span>
                  <span className="text-sm text-slate-500">/ person</span>
                </div>
              </div>
              <button className="btn-primary">View Details</button>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  if (variant === "featured") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Link
          href={`/trips/${trip.id}`}
          className={cn(
            "group relative block overflow-hidden rounded-3xl",
            className
          )}
        >
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image
              src={trip.coverImage}
              alt={trip.title}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              setIsWishlisted(!isWishlisted);
            }}
            className="absolute right-4 top-4 z-10 rounded-full bg-white/20 p-2.5 backdrop-blur-sm transition-all hover:bg-white/40"
          >
            <Heart
              className={cn(
                "h-5 w-5 transition-colors",
                isWishlisted ? "fill-red-500 text-red-500" : "text-white"
              )}
            />
          </button>

          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            {trip.bestSeller && <Badge variant="featured">Best Seller</Badge>}
            {discountPercentage > 0 && (
              <Badge variant="discount">{discountPercentage}% OFF</Badge>
            )}
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6">
            <Badge variant="glass" className="mb-3">{trip.category}</Badge>
            <h3 className="text-2xl font-bold text-white line-clamp-2">
              {trip.title}
            </h3>

            <div className="mt-2 flex items-center gap-1 text-sm text-white/80">
              <MapPin className="h-4 w-4" />
              <span>{trip.destination.name}</span>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-white/80">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{trip.duration.days}D / {trip.duration.nights}N</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="text-white font-medium">{trip.rating}</span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div>
                {trip.price.originalPrice && (
                  <span className="text-sm text-white/60 line-through">
                    ${trip.price.originalPrice}
                  </span>
                )}
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-white">
                    ${trip.price.amount}
                  </span>
                  <span className="text-sm text-white/60">/ person</span>
                </div>
              </div>
              <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition-all group-hover:bg-primary">
                Explore
              </span>
            </div>
          </div>
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
        href={`/trips/${trip.id}`}
        className={cn(
          "group block overflow-hidden rounded-2xl bg-white shadow-card transition-all duration-300 hover:-translate-y-2 hover:shadow-card-hover",
          className
        )}
      >
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={trip.coverImage}
            alt={trip.title}
            fill
            className={cn(
              "object-cover transition-all duration-500 group-hover:scale-110",
              isImageLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setIsImageLoaded(true)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {!isImageLoaded && (
            <div className="absolute inset-0 animate-pulse bg-slate-200" />
          )}

          <button
            onClick={(e) => {
              e.preventDefault();
              setIsWishlisted(!isWishlisted);
            }}
            className="absolute right-3 top-3 z-10 rounded-full bg-white/90 p-2 shadow-lg transition-all hover:bg-white hover:scale-110"
          >
            <Heart
              className={cn(
                "h-4 w-4 transition-colors",
                isWishlisted ? "fill-red-500 text-red-500" : "text-slate-600"
              )}
            />
          </button>

          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            {trip.bestSeller && <Badge variant="featured">Best Seller</Badge>}
            {discountPercentage > 0 && (
              <Badge variant="discount">{discountPercentage}% OFF</Badge>
            )}
          </div>

          <div className="absolute bottom-3 left-3 right-3 flex justify-between">
            <Badge variant="glass">{trip.category}</Badge>
            <Badge variant="glass">
              <Clock className="mr-1 h-3 w-3" />
              {trip.duration.days}D / {trip.duration.nights}N
            </Badge>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center gap-1 text-sm text-slate-500">
            <MapPin className="h-4 w-4" />
            <span>{trip.destination.name}, {trip.destination.country}</span>
          </div>

          <h3 className="mt-2 text-lg font-semibold text-slate-900 group-hover:text-primary transition-colors line-clamp-2">
            {trip.title}
          </h3>

          <div className="mt-3 flex items-center gap-4 text-sm text-slate-600">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="font-medium">{trip.rating}</span>
              <span className="text-slate-400">({trip.reviewCount})</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>Max {trip.groupSize.max}</span>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between border-t pt-4">
            <div>
              {trip.price.originalPrice && (
                <span className="text-sm text-slate-400 line-through">
                  ${trip.price.originalPrice}
                </span>
              )}
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold text-primary">
                  ${trip.price.amount}
                </span>
                <span className="text-xs text-slate-500">/ person</span>
              </div>
            </div>
            <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition-all group-hover:bg-primary group-hover:text-white">
              Book Now
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
