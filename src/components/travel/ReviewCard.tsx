"use client";

import Image from "next/image";
import { Star, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReviewCardProps {
  review: Review;
  className?: string;
}

export function ReviewCard({ review, className }: ReviewCardProps) {
  return (
    <div className={cn("bg-white rounded-xl border border-slate-100 p-5", className)}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 rounded-full overflow-hidden bg-slate-100">
            {review.userAvatar ? (
              <Image src={review.userAvatar} alt={review.userName} fill className="object-cover" />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-sm font-medium text-slate-600">
                {review.userName.charAt(0)}
              </div>
            )}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-medium text-slate-900">{review.userName}</span>
              {review.verified && <CheckCircle className="h-3.5 w-3.5 text-blue-500" />}
            </div>
            <span className="text-xs text-slate-500">{review.date}</span>
          </div>
        </div>
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={cn(
                "h-4 w-4",
                i < review.rating ? "fill-amber-400 text-amber-400" : "text-slate-200"
              )}
            />
          ))}
        </div>
      </div>

      <div className="mt-3">
        <h4 className="font-medium text-slate-900">{review.title}</h4>
        <p className="mt-1 text-sm text-slate-600">{review.content}</p>
      </div>

      {review.images && review.images.length > 0 && (
        <div className="mt-3 flex gap-2">
          {review.images.slice(0, 4).map((image, index) => (
            <div key={index} className="relative h-16 w-16 rounded-lg overflow-hidden">
              <Image src={image} alt="" fill className="object-cover" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

interface RatingBreakdownProps {
  ratings: { stars: number; count: number }[];
  totalReviews: number;
  averageRating: number;
  className?: string;
}

export function RatingBreakdown({ ratings, totalReviews, averageRating, className }: RatingBreakdownProps) {
  return (
    <div className={cn("bg-white rounded-xl border border-slate-100 p-5", className)}>
      <div className="flex items-center gap-4">
        <div className="text-center">
          <div className="text-4xl font-bold text-slate-900">{averageRating}</div>
          <div className="flex gap-0.5 justify-center mt-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-3.5 w-3.5",
                  i < Math.round(averageRating) ? "fill-amber-400 text-amber-400" : "text-slate-200"
                )}
              />
            ))}
          </div>
          <p className="text-xs text-slate-500 mt-1">{totalReviews} reviews</p>
        </div>
        <div className="flex-1 space-y-1.5">
          {ratings.sort((a, b) => b.stars - a.stars).map(({ stars, count }) => (
            <div key={stars} className="flex items-center gap-2">
              <span className="text-xs text-slate-500 w-3">{stars}</span>
              <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-400 rounded-full"
                  style={{ width: `${totalReviews > 0 ? (count / totalReviews) * 100 : 0}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
