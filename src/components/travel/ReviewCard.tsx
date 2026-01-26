"use client";

import Image from "next/image";
import { Star, ThumbsUp, BadgeCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";

interface ReviewCardProps {
  review: Review;
  className?: string;
}

export function ReviewCard({ review, className }: ReviewCardProps) {
  const [isHelpful, setIsHelpful] = useState(false);
  const [helpfulCount, setHelpfulCount] = useState(review.helpful);

  const handleHelpful = () => {
    if (!isHelpful) {
      setHelpfulCount((prev) => prev + 1);
      setIsHelpful(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={cn(
        "rounded-2xl bg-white p-6 shadow-card",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="relative h-12 w-12 overflow-hidden rounded-full">
            {review.userAvatar ? (
              <Image
                src={review.userAvatar}
                alt={review.userName}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-primary/10 text-lg font-semibold text-primary">
                {review.userName.charAt(0)}
              </div>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-slate-900">{review.userName}</h4>
              {review.verified && (
                <BadgeCheck className="h-4 w-4 fill-blue-500 text-white" />
              )}
            </div>
            <p className="text-sm text-slate-500">{review.date}</p>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={cn(
                "h-4 w-4",
                i < review.rating
                  ? "fill-amber-400 text-amber-400"
                  : "fill-slate-200 text-slate-200"
              )}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="mt-4">
        <h5 className="font-semibold text-slate-900">{review.title}</h5>
        <p className="mt-2 text-slate-600">{review.content}</p>
      </div>

      {/* Images */}
      {review.images && review.images.length > 0 && (
        <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
          {review.images.map((image, index) => (
            <div
              key={index}
              className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg"
            >
              <Image
                src={image}
                alt={`Review image ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {/* Response */}
      {review.response && (
        <div className="mt-4 rounded-xl bg-slate-50 p-4">
          <p className="text-sm font-semibold text-slate-900">
            Response from Talkwer
          </p>
          <p className="mt-1 text-sm text-slate-600">{review.response.content}</p>
          <p className="mt-2 text-xs text-slate-400">{review.response.date}</p>
        </div>
      )}

      {/* Helpful */}
      <div className="mt-4 flex items-center gap-4 border-t pt-4">
        <button
          onClick={handleHelpful}
          className={cn(
            "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all",
            isHelpful
              ? "bg-primary/10 text-primary"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          )}
        >
          <ThumbsUp className="h-4 w-4" />
          <span>Helpful ({helpfulCount})</span>
        </button>
      </div>
    </motion.div>
  );
}

interface RatingBreakdownProps {
  ratings: { stars: number; count: number }[];
  totalReviews: number;
  averageRating: number;
  className?: string;
}

export function RatingBreakdown({
  ratings,
  totalReviews,
  averageRating,
  className,
}: RatingBreakdownProps) {
  return (
    <div className={cn("rounded-2xl bg-white p-6 shadow-card", className)}>
      <div className="flex items-center gap-6">
        <div className="text-center">
          <div className="text-5xl font-bold text-slate-900">{averageRating}</div>
          <div className="mt-1 flex items-center justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-4 w-4",
                  i < Math.round(averageRating)
                    ? "fill-amber-400 text-amber-400"
                    : "fill-slate-200 text-slate-200"
                )}
              />
            ))}
          </div>
          <p className="mt-1 text-sm text-slate-500">
            {totalReviews} reviews
          </p>
        </div>

        <div className="flex-1 space-y-2">
          {ratings
            .sort((a, b) => b.stars - a.stars)
            .map(({ stars, count }) => (
              <div key={stars} className="flex items-center gap-3">
                <span className="w-3 text-sm font-medium text-slate-600">
                  {stars}
                </span>
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <div className="flex-1 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-2 rounded-full bg-amber-400 transition-all"
                    style={{
                      width: `${totalReviews > 0 ? (count / totalReviews) * 100 : 0}%`,
                    }}
                  />
                </div>
                <span className="w-10 text-right text-sm text-slate-500">
                  {count}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
