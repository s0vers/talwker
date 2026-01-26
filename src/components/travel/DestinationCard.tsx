"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, MapPin, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { motion } from "framer-motion";

interface DestinationCardProps {
  destination: Destination;
  variant?: "default" | "featured" | "compact";
  className?: string;
}

export function DestinationCard({
  destination,
  variant = "default",
  className,
}: DestinationCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  if (variant === "featured") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Link
          href={`/destinations/${destination.id}`}
          className={cn(
            "group relative block overflow-hidden rounded-3xl",
            className
          )}
        >
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src={destination.image}
              alt={destination.name}
              fill
              className={cn(
                "object-cover transition-all duration-700 group-hover:scale-110",
                isImageLoaded ? "opacity-100" : "opacity-0"
              )}
              onLoad={() => setIsImageLoaded(true)}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {!isImageLoaded && (
              <div className="absolute inset-0 animate-pulse bg-slate-200" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
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

          {destination.featured && (
            <Badge variant="featured" className="absolute left-4 top-4">
              Featured
            </Badge>
          )}

          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex items-center gap-2 text-sm text-white/80">
              <MapPin className="h-4 w-4" />
              <span>{destination.country}</span>
            </div>
            <h3 className="mt-2 text-2xl font-bold text-white">
              {destination.name}
            </h3>
            <p className="mt-2 line-clamp-2 text-sm text-white/80">
              {destination.shortDescription}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="font-semibold text-white">
                  {destination.rating}
                </span>
                <span className="text-sm text-white/60">
                  ({destination.reviewCount})
                </span>
              </div>
              <div className="text-white">
                <span className="text-sm text-white/60">From </span>
                <span className="text-lg font-bold">
                  ${destination.priceFrom}
                </span>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  if (variant === "compact") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
      >
        <Link
          href={`/destinations/${destination.id}`}
          className={cn(
            "group flex items-center gap-4 rounded-2xl bg-white p-3 shadow-card transition-all hover:shadow-card-hover",
            className
          )}
        >
          <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl">
            <Image
              src={destination.image}
              alt={destination.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              sizes="80px"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <MapPin className="h-3 w-3" />
              <span>{destination.country}</span>
            </div>
            <h4 className="font-semibold text-slate-900">{destination.name}</h4>
            <div className="mt-1 flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                <span className="text-sm font-medium">{destination.rating}</span>
              </div>
              <span className="text-sm font-semibold text-primary">
                ${destination.priceFrom}
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
        href={`/destinations/${destination.id}`}
        className={cn(
          "group block overflow-hidden rounded-2xl bg-white shadow-card transition-all duration-300 hover:-translate-y-2 hover:shadow-card-hover",
          className
        )}
      >
        <div className="relative aspect-card overflow-hidden">
          <Image
            src={destination.image}
            alt={destination.name}
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

          {destination.trending && (
            <Badge variant="trending" className="absolute left-3 top-3">
              Trending
            </Badge>
          )}
        </div>

        <div className="p-4">
          <div className="flex items-center gap-1 text-sm text-slate-500">
            <MapPin className="h-4 w-4" />
            <span>{destination.country}</span>
          </div>
          <h3 className="mt-1 text-lg font-semibold text-slate-900 group-hover:text-primary transition-colors">
            {destination.name}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-slate-600">
            {destination.shortDescription}
          </p>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="font-semibold">{destination.rating}</span>
              <span className="text-sm text-slate-400">
                ({destination.reviewCount})
              </span>
            </div>
            <div>
              <span className="text-sm text-slate-500">From </span>
              <span className="text-lg font-bold text-primary">
                ${destination.priceFrom}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
