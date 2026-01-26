"use client";

import Image from "next/image";
import { Star, ThumbsUp } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface ReviewCardProps {
  review: Review;
  className?: string;
}

export function ReviewCard({ review, className }: ReviewCardProps) {
  return (
    <div className={cn("bg-card rounded-xl border border-border p-5", className)}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-secondary flex-shrink-0">
            {review.userAvatar ? (
              <Image 
                src={review.userAvatar} 
                alt={review.userName} 
                fill 
                className="object-cover" 
                sizes="40px"
              />
            ) : (
              <span className="w-full h-full flex items-center justify-center text-lg font-semibold text-muted-foreground">
                {review.userName[0]}
              </span>
            )}
          </div>
          <div>
            <p className="font-medium text-foreground">{review.userName}</p>
            <p className="text-xs text-muted-foreground">
              {format(new Date(review.date), "MMM d, yyyy")}
            </p>
          </div>
        </div>
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={cn(
                "h-4 w-4",
                i < review.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"
              )}
            />
          ))}
        </div>
      </div>

      <div className="mt-4">
        <h4 className="font-medium text-foreground">{review.title}</h4>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{review.content}</p>
      </div>

      {review.images && review.images.length > 0 && (
        <div className="mt-4 flex gap-2">
          {review.images.map((img, i) => (
            <div key={i} className="relative w-16 h-16 rounded-lg overflow-hidden bg-secondary">
              <Image src={img} alt="" fill className="object-cover" sizes="64px" />
            </div>
          ))}
        </div>
      )}

      {review.helpful !== undefined && (
        <div className="mt-4 pt-4 border-t border-border">
          <button className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors">
            <ThumbsUp className="h-3.5 w-3.5" />
            Helpful ({review.helpful})
          </button>
        </div>
      )}
    </div>
  );
}

// Rating Breakdown
interface RatingBreakdownProps {
  ratings: { stars: number; count: number }[];
  totalReviews: number;
  averageRating: number;
  className?: string;
}

export function RatingBreakdown({ ratings, totalReviews, averageRating, className }: RatingBreakdownProps) {
  const maxCount = Math.max(...ratings.map((r) => r.count));

  return (
    <div className={cn("bg-card rounded-xl border border-border p-5", className)}>
      <div className="text-center mb-4">
        <div className="text-4xl font-bold text-foreground">{averageRating}</div>
        <div className="flex justify-center gap-1 mt-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={cn(
                "h-5 w-5",
                i < Math.round(averageRating) ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"
              )}
            />
          ))}
        </div>
        <p className="text-sm text-muted-foreground mt-1">Based on {totalReviews} reviews</p>
      </div>

      <div className="space-y-2">
        {ratings.map((rating) => (
          <div key={rating.stars} className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground w-3">{rating.stars}</span>
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-400 rounded-full transition-all"
                style={{ width: `${maxCount ? (rating.count / maxCount) * 100 : 0}%` }}
              />
            </div>
            <span className="text-xs text-muted-foreground w-8 text-right">{rating.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
