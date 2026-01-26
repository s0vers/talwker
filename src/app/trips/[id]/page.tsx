"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MapPin, Clock, Users, Star, Check, X, ArrowRight, Heart, Share2, Calendar, Utensils, ChevronDown } from "lucide-react";
import { ImageGallery } from "@/components/travel/ImageGallery";
import { ReviewCard, RatingBreakdown } from "@/components/travel/ReviewCard";
import { TripCard } from "@/components/travel/TripCard";
import { TrustBadges } from "@/components/travel/FeatureSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { tripPackages, reviews } from "@/lib/data";

export default function TripDetailPage() {
  const params = useParams();
  const router = useRouter();
  const trip = tripPackages.find((t) => t.id === params.id);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [travelers, setTravelers] = useState(2);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [expandedDay, setExpandedDay] = useState<number | null>(1);

  if (!trip) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Trip not found</h1>
          <Link href="/search" className="text-primary mt-4 inline-block hover:underline">
            ← Browse all trips
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
  const total = trip.price.amount * travelers;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Gallery */}
      <div className="pt-20">
        <div className="container-main py-6">
          <ImageGallery images={trip.images} alt={trip.title} />
        </div>
      </div>

      <div className="container-main pb-20">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap items-start justify-between gap-4"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <span className="bg-primary/10 text-primary font-semibold px-3 py-1 rounded-full">
                    {trip.category}
                  </span>
                  <span className="text-muted-foreground">{trip.difficulty}</span>
                  {trip.bestSeller && (
                    <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 font-semibold px-3 py-1 rounded-full">
                      ⭐ Best Seller
                    </span>
                  )}
                </div>
                <h1 className="mt-4 text-3xl md:text-4xl font-bold text-foreground">{trip.title}</h1>
                <div className="mt-4 flex flex-wrap items-center gap-4 text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-primary" />
                    {trip.destination.name}, {trip.destination.country}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-primary" />
                    {trip.duration.days} Days / {trip.duration.nights} Nights
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users className="h-4 w-4 text-primary" />
                    Max {trip.groupSize.max} people
                  </span>
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-900/20 px-3 py-1.5 rounded-lg">
                    <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
                    <span className="font-bold text-amber-700 dark:text-amber-400">{trip.rating}</span>
                  </div>
                  <span className="text-muted-foreground">({trip.reviewCount} reviews)</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={cn(
                    "p-3 rounded-xl border-2 transition-all",
                    isWishlisted 
                      ? "border-red-200 bg-red-50 dark:bg-red-900/20 text-red-500" 
                      : "border-border hover:border-primary/50 hover:bg-secondary"
                  )}
                >
                  <Heart className={cn("h-5 w-5", isWishlisted && "fill-current")} />
                </button>
                <button className="p-3 rounded-xl border-2 border-border hover:border-primary/50 hover:bg-secondary transition-all">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </motion.div>

            {/* Tabs */}
            <Tabs defaultValue="itinerary" className="mt-10">
              <TabsList className="w-full justify-start border-b border-border rounded-none bg-transparent p-0 h-auto">
                {["itinerary", "overview", "included", "reviews"].map((tab) => (
                  <TabsTrigger
                    key={tab}
                    value={tab}
                    className="px-6 py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent capitalize font-semibold"
                  >
                    {tab}
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Itinerary Tab - Now Primary */}
              <TabsContent value="itinerary" className="mt-8">
                <div className="space-y-4">
                  {trip.itinerary.map((day) => (
                    <motion.div
                      key={day.day}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: day.day * 0.05 }}
                      className="border border-border rounded-2xl overflow-hidden bg-card"
                    >
                      <button
                        onClick={() => setExpandedDay(expandedDay === day.day ? null : day.day)}
                        className="w-full flex items-center gap-4 p-5 text-left hover:bg-secondary/50 transition-colors"
                      >
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/70 text-white text-lg font-bold flex items-center justify-center flex-shrink-0">
                          {day.day}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-foreground text-lg">{day.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{day.description}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          {day.meals.breakfast && <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded">B</span>}
                          {day.meals.lunch && <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2 py-1 rounded">L</span>}
                          {day.meals.dinner && <span className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 px-2 py-1 rounded">D</span>}
                          <ChevronDown className={cn("h-5 w-5 text-muted-foreground transition-transform", expandedDay === day.day && "rotate-180")} />
                        </div>
                      </button>
                      
                      {expandedDay === day.day && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="px-5 pb-5 border-t border-border"
                        >
                          <div className="pt-5">
                            <p className="text-muted-foreground">{day.description}</p>
                            
                            <div className="mt-5">
                              <h4 className="font-semibold text-foreground mb-3">Activities</h4>
                              <ul className="grid gap-2">
                                {day.activities.map((activity, i) => (
                                  <li key={i} className="flex items-center gap-3 text-muted-foreground">
                                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                      <Check className="h-3.5 w-3.5 text-primary" />
                                    </div>
                                    {activity}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div className="mt-5 pt-5 border-t border-border">
                              <div className="flex items-center gap-2 text-sm">
                                <Utensils className="h-4 w-4 text-muted-foreground" />
                                <span className="text-muted-foreground">Meals included:</span>
                                {day.meals.breakfast && <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded text-xs font-medium">Breakfast</span>}
                                {day.meals.lunch && <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2 py-0.5 rounded text-xs font-medium">Lunch</span>}
                                {day.meals.dinner && <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 px-2 py-0.5 rounded text-xs font-medium">Dinner</span>}
                                {!day.meals.breakfast && !day.meals.lunch && !day.meals.dinner && <span className="text-muted-foreground">None</span>}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              {/* Overview Tab */}
              <TabsContent value="overview" className="mt-8">
                <p className="text-lg text-muted-foreground leading-relaxed">{trip.description}</p>

                <h3 className="mt-10 text-xl font-bold text-foreground">Highlights</h3>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {trip.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-0.5 w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                        <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                      <span className="text-foreground">{highlight}</span>
                    </li>
                  ))}
                </ul>

                {/* Accommodation */}
                <div className="mt-10 p-6 rounded-2xl bg-secondary border border-border">
                  <h4 className="font-bold text-foreground text-lg">Accommodation</h4>
                  <p className="mt-2 text-muted-foreground">
                    {trip.accommodation.name} • {trip.accommodation.type}
                  </p>
                  <div className="mt-3 flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-4 w-4",
                          i < trip.accommodation.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"
                        )}
                      />
                    ))}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {trip.accommodation.amenities.map((amenity) => (
                      <span key={amenity} className="text-sm bg-background px-3 py-1.5 rounded-lg border border-border">
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Included Tab */}
              <TabsContent value="included" className="mt-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="p-6 rounded-2xl bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800">
                    <h3 className="font-bold text-foreground text-lg flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                        <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      What&apos;s Included
                    </h3>
                    <ul className="mt-5 space-y-3">
                      {trip.inclusions.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-muted-foreground">
                          <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-6 rounded-2xl bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800">
                    <h3 className="font-bold text-foreground text-lg flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                        <X className="h-5 w-5 text-red-600 dark:text-red-400" />
                      </div>
                      Not Included
                    </h3>
                    <ul className="mt-5 space-y-3">
                      {trip.exclusions.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-muted-foreground">
                          <X className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>

              {/* Reviews Tab */}
              <TabsContent value="reviews" className="mt-8">
                <div className="grid lg:grid-cols-3 gap-8">
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
                      <div className="text-center py-12 bg-card rounded-2xl border border-border">
                        <p className="text-muted-foreground">No reviews yet for this trip.</p>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:w-96 flex-shrink-0">
            <div className="sticky top-24 bg-card border border-border rounded-2xl overflow-hidden shadow-xl">
              {/* Price Header */}
              <div className="p-6 bg-gradient-to-r from-primary to-primary/80 text-white">
                {trip.price.originalPrice && (
                  <span className="text-white/70 line-through text-lg">${trip.price.originalPrice}</span>
                )}
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold">${trip.price.amount}</span>
                  <span className="text-white/80">/ person</span>
                </div>
                {discount > 0 && (
                  <span className="inline-block mt-2 text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">
                    🎉 Save {discount}%
                  </span>
                )}
              </div>

              <div className="p-6 space-y-5">
                {/* Date Selection */}
                <div>
                  <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    Select Date
                  </label>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {trip.departureDates.slice(0, 4).map((date) => (
                      <button
                        key={date}
                        onClick={() => setSelectedDate(date)}
                        className={cn(
                          "text-sm py-3 px-4 rounded-xl border-2 transition-all font-medium",
                          selectedDate === date
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border hover:border-primary/50 text-foreground"
                        )}
                      >
                        {new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Travelers */}
                <div>
                  <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    Travelers
                  </label>
                  <div className="mt-3 flex items-center justify-between bg-secondary rounded-xl p-3">
                    <button
                      onClick={() => setTravelers(Math.max(1, travelers - 1))}
                      className="w-10 h-10 rounded-lg border border-border bg-background text-foreground hover:bg-primary hover:text-white hover:border-primary transition-all font-semibold"
                    >
                      -
                    </button>
                    <span className="text-lg font-bold text-foreground">{travelers} {travelers === 1 ? "person" : "people"}</span>
                    <button
                      onClick={() => setTravelers(Math.min(trip.groupSize.max, travelers + 1))}
                      className="w-10 h-10 rounded-lg border border-border bg-background text-foreground hover:bg-primary hover:text-white hover:border-primary transition-all font-semibold"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Total */}
                <div className="pt-5 border-t border-border">
                  <div className="flex items-center justify-between text-lg">
                    <span className="text-muted-foreground">Total</span>
                    <span className="text-3xl font-bold text-foreground">${total}</span>
                  </div>
                </div>

                <Link
                  href={`/booking/${trip.id}`}
                  className="w-full flex items-center justify-center gap-2 bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 active:scale-[0.98]"
                >
                  Book Now <ArrowRight className="h-5 w-5" />
                </Link>

                <TrustBadges />
              </div>
            </div>
          </div>
        </div>

        {/* Related Trips */}
        {relatedTrips.length > 0 && (
          <section className="mt-20 pt-16 border-t border-border">
            <h2 className="text-2xl font-bold text-foreground mb-8">You Might Also Like</h2>
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
