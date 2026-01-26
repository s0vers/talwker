"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { MapPin, Clock, Users, Star, Check, X, ArrowRight, Heart, Share2 } from "lucide-react";
import { ImageGallery } from "@/components/travel/ImageGallery";
import { ReviewCard, RatingBreakdown } from "@/components/travel/ReviewCard";
import { TripCard } from "@/components/travel/TripCard";
import { TrustBadges } from "@/components/travel/FeatureSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { tripPackages, reviews } from "@/lib/data";

export default function TripDetailPage() {
  const params = useParams();
  const trip = tripPackages.find((t) => t.id === params.id);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [travelers, setTravelers] = useState(2);
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!trip) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-foreground">Trip not found</h1>
          <Link href="/search" className="text-primary text-sm mt-2 inline-block hover:underline">
            Browse trips
          </Link>
        </div>
      </div>
    );
  }

  const discount = trip.price.originalPrice
    ? Math.round(((trip.price.originalPrice - trip.price.amount) / trip.price.originalPrice) * 100)
    : 0;

  const relatedTrips = tripPackages.filter((t) => t.id !== trip.id && t.category === trip.category).slice(0, 3);
  const tripReviews = reviews.filter((r) => r.tripId === trip.id);

  return (
    <div className="min-h-screen bg-background pt-20 pb-24">
      {/* Breadcrumb */}
      <div className="container-main py-4">
        <nav className="text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/search" className="hover:text-primary">Trips</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{trip.title}</span>
        </nav>
      </div>

      {/* Gallery */}
      <div className="container-main">
        <ImageGallery images={trip.images} alt={trip.title} />
      </div>

      <div className="container-main mt-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium text-primary">{trip.category}</span>
                  <span className="text-muted-foreground">·</span>
                  <span className="text-muted-foreground">{trip.difficulty}</span>
                  {trip.bestSeller && (
                    <>
                      <span className="text-muted-foreground">·</span>
                      <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs font-medium px-2 py-0.5 rounded">
                        Best Seller
                      </span>
                    </>
                  )}
                </div>
                <h1 className="mt-2 text-2xl md:text-3xl font-bold text-foreground">{trip.title}</h1>
                <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {trip.destination.name}, {trip.destination.country}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {trip.duration.days} Days / {trip.duration.nights} Nights
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    Max {trip.groupSize.max}
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                  <span className="font-semibold text-foreground">{trip.rating}</span>
                  <span className="text-muted-foreground">({trip.reviewCount} reviews)</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={cn(
                    "p-2.5 rounded-lg border transition-colors",
                    isWishlisted ? "border-red-200 bg-red-50 dark:bg-red-900/20 text-red-500" : "border-border hover:bg-secondary"
                  )}
                >
                  <Heart className={cn("h-5 w-5", isWishlisted && "fill-current")} />
                </button>
                <button className="p-2.5 rounded-lg border border-border hover:bg-secondary transition-colors">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="overview" className="mt-8">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                <TabsTrigger value="included">Included</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <p className="text-muted-foreground leading-relaxed">{trip.description}</p>

                <h3 className="mt-8 text-lg font-semibold text-foreground">Highlights</h3>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {trip.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <div className="mt-0.5 p-1 rounded-full bg-green-100 dark:bg-green-900/30">
                        <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                      </div>
                      {highlight}
                    </li>
                  ))}
                </ul>

                {/* Accommodation */}
                <div className="mt-8 p-5 rounded-xl bg-secondary border border-border">
                  <h4 className="font-semibold text-foreground">Accommodation</h4>
                  <p className="mt-1 text-muted-foreground">
                    {trip.accommodation.name} ({trip.accommodation.type})
                  </p>
                  <div className="mt-2 flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-4 w-4",
                          i < trip.accommodation.rating
                            ? "fill-amber-400 text-amber-400"
                            : "text-muted-foreground/30"
                        )}
                      />
                    ))}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {trip.accommodation.amenities.map((amenity) => (
                      <span key={amenity} className="text-xs bg-background px-2 py-1 rounded border border-border">
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="itinerary" className="mt-6">
                {trip.itinerary.length > 0 ? (
                  <div className="space-y-4">
                    {trip.itinerary.map((day) => (
                      <div key={day.day} className="border border-border rounded-xl p-5 bg-card">
                        <div className="flex items-center gap-3">
                          <span className="w-10 h-10 rounded-full bg-primary/10 text-primary text-sm font-semibold flex items-center justify-center">
                            {day.day}
                          </span>
                          <div>
                            <h4 className="font-semibold text-foreground">{day.title}</h4>
                            <p className="text-sm text-muted-foreground">{day.description}</p>
                          </div>
                        </div>
                        <div className="mt-4 pl-13">
                          <p className="text-sm font-medium text-foreground">Activities:</p>
                          <ul className="mt-2 space-y-1.5">
                            {day.activities.map((activity, i) => (
                              <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Check className="h-4 w-4 text-green-500" />
                                {activity}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">Detailed itinerary provided upon booking.</p>
                )}
              </TabsContent>

              <TabsContent value="included" className="mt-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-semibold text-foreground flex items-center gap-2">
                      <div className="p-1 rounded-full bg-green-100 dark:bg-green-900/30">
                        <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                      Included
                    </h3>
                    <ul className="mt-4 space-y-2.5">
                      {trip.inclusions.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground flex items-center gap-2">
                      <div className="p-1 rounded-full bg-red-100 dark:bg-red-900/30">
                        <X className="h-4 w-4 text-red-600 dark:text-red-400" />
                      </div>
                      Not Included
                    </h3>
                    <ul className="mt-4 space-y-2.5">
                      {trip.exclusions.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <X className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <div className="grid lg:grid-cols-3 gap-6">
                  <RatingBreakdown
                    ratings={[
                      { stars: 5, count: 38 },
                      { stars: 4, count: 12 },
                      { stars: 3, count: 4 },
                      { stars: 2, count: 1 },
                      { stars: 1, count: 0 },
                    ]}
                    totalReviews={trip.reviewCount}
                    averageRating={trip.rating}
                  />
                  <div className="lg:col-span-2 space-y-4">
                    {tripReviews.length > 0 ? (
                      tripReviews.map((review) => <ReviewCard key={review.id} review={review} />)
                    ) : (
                      <p className="text-muted-foreground">No reviews yet.</p>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="sticky top-24 bg-card border border-border rounded-xl p-5">
              <div className="pb-4 border-b border-border">
                {trip.price.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">${trip.price.originalPrice}</span>
                )}
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-foreground">${trip.price.amount}</span>
                  <span className="text-muted-foreground">/ person</span>
                </div>
                {discount > 0 && (
                  <span className="inline-block mt-2 text-xs font-semibold text-white bg-primary px-2.5 py-1 rounded">
                    Save {discount}%
                  </span>
                )}
              </div>

              {/* Date Selection */}
              <div className="py-4 border-b border-border">
                <label className="text-sm font-medium text-foreground">Select Date</label>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {trip.departureDates.slice(0, 4).map((date) => (
                    <button
                      key={date}
                      onClick={() => setSelectedDate(date)}
                      className={cn(
                        "text-sm py-2 px-3 rounded-lg border transition-colors",
                        selectedDate === date
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      {new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </button>
                  ))}
                </div>
              </div>

              {/* Travelers */}
              <div className="py-4 border-b border-border">
                <label className="text-sm font-medium text-foreground">Travelers</label>
                <div className="mt-2 flex items-center justify-between">
                  <button
                    onClick={() => setTravelers(Math.max(1, travelers - 1))}
                    className="w-10 h-10 rounded-lg border border-border text-foreground hover:bg-secondary"
                  >
                    -
                  </button>
                  <span className="font-semibold text-foreground">{travelers}</span>
                  <button
                    onClick={() => setTravelers(Math.min(trip.groupSize.max, travelers + 1))}
                    className="w-10 h-10 rounded-lg border border-border text-foreground hover:bg-secondary"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Total */}
              <div className="py-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total</span>
                  <span className="text-2xl font-bold text-foreground">${trip.price.amount * travelers}</span>
                </div>
              </div>

              <Link
                href={`/booking/${trip.id}`}
                className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Book Now <ArrowRight className="h-4 w-4" />
              </Link>

              <div className="mt-4">
                <TrustBadges />
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        {relatedTrips.length > 0 && (
          <section className="mt-16 pt-16 border-t border-border">
            <h2 className="heading-3 mb-6">You Might Also Like</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedTrips.map((t) => (
                <TripCard key={t.id} trip={t} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
