"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  MapPin,
  Clock,
  Users,
  Star,
  Heart,
  Share2,
  Check,
  X,
  Calendar,
  ChevronDown,
  Shield,
  ArrowRight,
  Plane,
  Home,
  Utensils,
} from "lucide-react";
import { GridGallery } from "@/components/travel/ImageGallery";
import { ReviewCard, RatingBreakdown } from "@/components/travel/ReviewCard";
import { TripCard } from "@/components/travel/TripCard";
import { TrustBadges } from "@/components/travel/FeatureSection";
import { MobileBookingCTA } from "@/components/layout/MobileBookingCTA";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Trip not found</h1>
          <Link href="/search" className="mt-4 inline-block text-primary">
            Browse all trips
          </Link>
        </div>
      </div>
    );
  }

  const discount = trip.price.originalPrice
    ? Math.round(
        ((trip.price.originalPrice - trip.price.amount) / trip.price.originalPrice) * 100
      )
    : 0;

  const relatedTrips = tripPackages
    .filter((t) => t.id !== trip.id && t.category === trip.category)
    .slice(0, 3);

  const tripReviews = reviews.filter((r) => r.tripId === trip.id);
  const ratingBreakdown = [
    { stars: 5, count: 38 },
    { stars: 4, count: 12 },
    { stars: 3, count: 4 },
    { stars: 2, count: 1 },
    { stars: 1, count: 0 },
  ];

  return (
    <>
      <div className="min-h-screen bg-white pb-20 pt-24 md:pb-0">
        {/* Breadcrumb */}
        <div className="container-travel py-4">
          <nav className="flex items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <span>/</span>
            <Link href="/search" className="hover:text-primary">
              Trips
            </Link>
            <span>/</span>
            <span className="text-slate-900">{trip.title}</span>
          </nav>
        </div>

        {/* Image Gallery */}
        <div className="container-travel">
          <GridGallery images={trip.images} alt={trip.title} />
        </div>

        {/* Main Content */}
        <div className="container-travel mt-8">
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Left Column - Trip Details */}
            <div className="flex-1">
              {/* Title Section */}
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{trip.category}</Badge>
                    <Badge variant="outline">{trip.difficulty}</Badge>
                    {trip.bestSeller && (
                      <Badge variant="featured">Best Seller</Badge>
                    )}
                  </div>
                  <h1 className="mt-3 text-2xl font-bold text-slate-900 md:text-3xl lg:text-4xl">
                    {trip.title}
                  </h1>
                  <div className="mt-3 flex flex-wrap items-center gap-4 text-slate-600">
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
                      Max {trip.groupSize.max} travelers
                    </span>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                      <span className="font-semibold">{trip.rating}</span>
                    </div>
                    <span className="text-slate-400">
                      ({trip.reviewCount} reviews)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={cn(
                      "rounded-full border p-3 transition-all",
                      isWishlisted
                        ? "border-red-200 bg-red-50 text-red-500"
                        : "border-slate-200 hover:bg-slate-50"
                    )}
                    aria-label="Add to wishlist"
                  >
                    <Heart
                      className={cn("h-5 w-5", isWishlisted && "fill-current")}
                    />
                  </button>
                  <button
                    className="rounded-full border border-slate-200 p-3 transition-all hover:bg-slate-50"
                    aria-label="Share"
                  >
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Tabs Section */}
              <Tabs defaultValue="overview" className="mt-8">
                <TabsList className="w-full justify-start overflow-x-auto">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                  <TabsTrigger value="inclusions">Inclusions</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="mt-6">
                  <div className="prose max-w-none">
                    <h3 className="text-xl font-semibold text-slate-900">
                      About This Trip
                    </h3>
                    <p className="mt-3 text-slate-600">{trip.description}</p>
                  </div>

                  {/* Highlights */}
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold text-slate-900">
                      Trip Highlights
                    </h3>
                    <ul className="mt-4 grid gap-3 md:grid-cols-2">
                      {trip.highlights.map((highlight, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-3"
                        >
                          <div className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                            <Check className="h-3 w-3 text-green-600" />
                          </div>
                          <span className="text-slate-700">{highlight}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Accommodation */}
                  <div className="mt-8 rounded-2xl bg-slate-50 p-6">
                    <div className="flex items-start gap-4">
                      <div className="rounded-xl bg-white p-3">
                        <Home className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900">
                          Accommodation
                        </h4>
                        <p className="mt-1 text-slate-600">
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
                                  : "fill-slate-200 text-slate-200"
                              )}
                            />
                          ))}
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {trip.accommodation.amenities.map((amenity) => (
                            <Badge key={amenity} variant="outline" size="sm">
                              {amenity}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Itinerary Tab */}
                <TabsContent value="itinerary" className="mt-6">
                  <h3 className="text-xl font-semibold text-slate-900">
                    Day-by-Day Itinerary
                  </h3>
                  <Accordion type="single" collapsible className="mt-4">
                    {trip.itinerary.length > 0 ? (
                      trip.itinerary.map((day) => (
                        <AccordionItem key={day.day} value={`day-${day.day}`}>
                          <AccordionTrigger className="hover:no-underline">
                            <div className="flex items-center gap-4 text-left">
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                                {day.day}
                              </div>
                              <div>
                                <p className="font-semibold text-slate-900">
                                  Day {day.day}: {day.title}
                                </p>
                                <div className="mt-1 flex items-center gap-4 text-sm text-slate-500">
                                  {day.meals.breakfast && (
                                    <span className="flex items-center gap-1">
                                      <Utensils className="h-3 w-3" />
                                      Breakfast
                                    </span>
                                  )}
                                  {day.meals.lunch && (
                                    <span className="flex items-center gap-1">
                                      <Utensils className="h-3 w-3" />
                                      Lunch
                                    </span>
                                  )}
                                  {day.meals.dinner && (
                                    <span className="flex items-center gap-1">
                                      <Utensils className="h-3 w-3" />
                                      Dinner
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pl-14">
                            <p className="text-slate-600">{day.description}</p>
                            <div className="mt-4">
                              <p className="font-medium text-slate-900">
                                Activities:
                              </p>
                              <ul className="mt-2 space-y-2">
                                {day.activities.map((activity, index) => (
                                  <li
                                    key={index}
                                    className="flex items-center gap-2 text-slate-600"
                                  >
                                    <Check className="h-4 w-4 text-green-500" />
                                    {activity}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))
                    ) : (
                      <p className="text-slate-500">
                        Detailed itinerary will be provided upon booking.
                      </p>
                    )}
                  </Accordion>
                </TabsContent>

                {/* Inclusions Tab */}
                <TabsContent value="inclusions" className="mt-6">
                  <div className="grid gap-8 md:grid-cols-2">
                    {/* Included */}
                    <div>
                      <h3 className="flex items-center gap-2 text-xl font-semibold text-slate-900">
                        <Check className="h-5 w-5 text-green-500" />
                        What&apos;s Included
                      </h3>
                      <ul className="mt-4 space-y-3">
                        {trip.inclusions.map((item, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-3 text-slate-700"
                          >
                            <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Excluded */}
                    <div>
                      <h3 className="flex items-center gap-2 text-xl font-semibold text-slate-900">
                        <X className="h-5 w-5 text-red-500" />
                        What&apos;s Not Included
                      </h3>
                      <ul className="mt-4 space-y-3">
                        {trip.exclusions.map((item, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-3 text-slate-700"
                          >
                            <X className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </TabsContent>

                {/* Reviews Tab */}
                <TabsContent value="reviews" className="mt-6">
                  <div className="grid gap-8 lg:grid-cols-3">
                    {/* Rating Breakdown */}
                    <div className="lg:col-span-1">
                      <RatingBreakdown
                        ratings={ratingBreakdown}
                        totalReviews={trip.reviewCount}
                        averageRating={trip.rating}
                      />
                    </div>

                    {/* Reviews List */}
                    <div className="space-y-6 lg:col-span-2">
                      {tripReviews.length > 0 ? (
                        tripReviews.map((review) => (
                          <ReviewCard key={review.id} review={review} />
                        ))
                      ) : (
                        <p className="text-slate-500">No reviews yet.</p>
                      )}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Right Column - Booking Card */}
            <div className="hidden lg:block lg:w-96">
              <div className="sticky top-24">
                <div className="rounded-2xl border bg-white p-6 shadow-card">
                  {/* Price */}
                  <div className="border-b pb-4">
                    <div className="flex items-baseline gap-2">
                      {trip.price.originalPrice && (
                        <span className="text-lg text-slate-400 line-through">
                          ${trip.price.originalPrice}
                        </span>
                      )}
                      <span className="text-3xl font-bold text-slate-900">
                        ${trip.price.amount}
                      </span>
                      <span className="text-slate-500">/ person</span>
                    </div>
                    {discount > 0 && (
                      <Badge variant="discount" className="mt-2">
                        Save {discount}%
                      </Badge>
                    )}
                  </div>

                  {/* Date Selection */}
                  <div className="mt-4 space-y-4">
                    <div>
                      <label className="text-sm font-medium text-slate-700">
                        Select Date
                      </label>
                      <div className="mt-2 grid grid-cols-2 gap-2">
                        {trip.departureDates.slice(0, 4).map((date) => (
                          <button
                            key={date}
                            onClick={() => setSelectedDate(date)}
                            className={cn(
                              "rounded-xl border p-3 text-sm font-medium transition-all",
                              selectedDate === date
                                ? "border-primary bg-primary/5 text-primary"
                                : "border-slate-200 hover:border-primary/50"
                            )}
                          >
                            {new Date(date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Travelers */}
                    <div>
                      <label className="text-sm font-medium text-slate-700">
                        Travelers
                      </label>
                      <div className="mt-2 flex items-center justify-between rounded-xl border border-slate-200 p-3">
                        <span className="text-slate-700">
                          {travelers} {travelers === 1 ? "traveler" : "travelers"}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              setTravelers(Math.max(1, travelers - 1))
                            }
                            className="flex h-8 w-8 items-center justify-center rounded-full border text-slate-600 hover:bg-slate-50"
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-medium">
                            {travelers}
                          </span>
                          <button
                            onClick={() =>
                              setTravelers(
                                Math.min(trip.groupSize.max, travelers + 1)
                              )
                            }
                            className="flex h-8 w-8 items-center justify-center rounded-full border text-slate-600 hover:bg-slate-50"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="mt-6 rounded-xl bg-slate-50 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Total</span>
                      <span className="text-2xl font-bold text-slate-900">
                        ${trip.price.amount * travelers}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-slate-500">
                      Includes taxes and fees
                    </p>
                  </div>

                  {/* Book Button */}
                  <Link
                    href={`/booking/${trip.id}`}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary/90"
                  >
                    Book Now
                    <ArrowRight className="h-5 w-5" />
                  </Link>

                  {/* Trust Badges */}
                  <div className="mt-6">
                    <TrustBadges />
                  </div>
                </div>

                {/* Need Help? */}
                <div className="mt-4 rounded-2xl border bg-slate-50 p-6">
                  <h4 className="font-semibold text-slate-900">Need Help?</h4>
                  <p className="mt-1 text-sm text-slate-600">
                    Our travel experts are here to help you plan your perfect trip.
                  </p>
                  <Link
                    href="/contact"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary"
                  >
                    Contact us
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Related Trips */}
          {relatedTrips.length > 0 && (
            <section className="mt-20">
              <h2 className="text-2xl font-bold text-slate-900">
                You Might Also Like
              </h2>
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {relatedTrips.map((relatedTrip) => (
                  <TripCard key={relatedTrip.id} trip={relatedTrip} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Mobile Booking CTA */}
      <MobileBookingCTA
        price={trip.price.amount}
        originalPrice={trip.price.originalPrice}
        onBook={() => {
          window.location.href = `/booking/${trip.id}`;
        }}
      />
    </>
  );
}
