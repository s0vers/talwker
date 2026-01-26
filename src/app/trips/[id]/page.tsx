"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { MapPin, Clock, Users, Star, Check, X, ArrowRight } from "lucide-react";
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

  if (!trip) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-semibold">Trip not found</h1>
          <Link href="/search" className="text-primary text-sm mt-2 inline-block">
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
    <div className="min-h-screen bg-white pt-20 pb-24">
      {/* Breadcrumb */}
      <div className="container-travel py-4">
        <nav className="text-sm text-slate-500">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/search" className="hover:text-primary">Trips</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-900">{trip.title}</span>
        </nav>
      </div>

      {/* Gallery */}
      <div className="container-travel">
        <ImageGallery images={trip.images} alt={trip.title} />
      </div>

      <div className="container-travel mt-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-primary font-medium">{trip.category}</span>
                <span className="text-slate-300">·</span>
                <span className="text-slate-500">{trip.difficulty}</span>
              </div>
              <h1 className="mt-2 text-2xl md:text-3xl font-semibold text-slate-900">
                {trip.title}
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-slate-600">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {trip.destination.name}, {trip.destination.country}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {trip.duration.days} Days
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  Max {trip.groupSize.max}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  {trip.rating} ({trip.reviewCount})
                </span>
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
                <p className="text-slate-600 leading-relaxed">{trip.description}</p>

                <h3 className="mt-8 font-semibold text-slate-900">Highlights</h3>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {trip.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </TabsContent>

              <TabsContent value="itinerary" className="mt-6">
                {trip.itinerary.length > 0 ? (
                  <div className="space-y-4">
                    {trip.itinerary.map((day) => (
                      <div key={day.day} className="border border-slate-100 rounded-xl p-4">
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-medium flex items-center justify-center">
                            {day.day}
                          </span>
                          <h4 className="font-medium text-slate-900">{day.title}</h4>
                        </div>
                        <p className="mt-2 text-sm text-slate-600 pl-11">{day.description}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-500 text-sm">Detailed itinerary provided upon booking.</p>
                )}
              </TabsContent>

              <TabsContent value="included" className="mt-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      Included
                    </h3>
                    <ul className="mt-3 space-y-2">
                      {trip.inclusions.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                          <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                      <X className="h-4 w-4 text-red-500" />
                      Not Included
                    </h3>
                    <ul className="mt-3 space-y-2">
                      {trip.exclusions.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
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
                      <p className="text-slate-500 text-sm">No reviews yet.</p>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="sticky top-24 bg-white border border-slate-100 rounded-xl p-5">
              <div className="pb-4 border-b border-slate-100">
                {trip.price.originalPrice && (
                  <span className="text-sm text-slate-400 line-through">${trip.price.originalPrice}</span>
                )}
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-semibold text-slate-900">${trip.price.amount}</span>
                  <span className="text-slate-500 text-sm">/ person</span>
                </div>
                {discount > 0 && (
                  <span className="inline-block mt-1 text-xs font-medium text-white bg-primary px-2 py-0.5 rounded">
                    {discount}% OFF
                  </span>
                )}
              </div>

              {/* Date Selection */}
              <div className="py-4 border-b border-slate-100">
                <label className="text-sm font-medium text-slate-700">Select Date</label>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {trip.departureDates.slice(0, 4).map((date) => (
                    <button
                      key={date}
                      onClick={() => setSelectedDate(date)}
                      className={cn(
                        "text-sm py-2 px-3 rounded-lg border transition-colors",
                        selectedDate === date
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-slate-200 hover:border-slate-300"
                      )}
                    >
                      {new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </button>
                  ))}
                </div>
              </div>

              {/* Travelers */}
              <div className="py-4 border-b border-slate-100">
                <label className="text-sm font-medium text-slate-700">Travelers</label>
                <div className="mt-2 flex items-center justify-between">
                  <button
                    onClick={() => setTravelers(Math.max(1, travelers - 1))}
                    className="w-8 h-8 rounded border border-slate-200 text-slate-600"
                  >
                    -
                  </button>
                  <span className="font-medium">{travelers}</span>
                  <button
                    onClick={() => setTravelers(Math.min(trip.groupSize.max, travelers + 1))}
                    className="w-8 h-8 rounded border border-slate-200 text-slate-600"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Total */}
              <div className="py-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Total</span>
                  <span className="text-xl font-semibold">${trip.price.amount * travelers}</span>
                </div>
              </div>

              <Link
                href={`/booking/${trip.id}`}
                className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
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
          <section className="mt-16">
            <h2 className="text-xl font-semibold text-slate-900 mb-6">You Might Also Like</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
