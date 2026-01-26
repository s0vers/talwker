"use client";

import Link from "next/link";
import { Flame, Tag, ArrowRight } from "lucide-react";
import { DealCard } from "@/components/travel/DealCard";
import { TripCard } from "@/components/travel/TripCard";
import { deals, tripPackages } from "@/lib/data";

export default function DealsPage() {
  const discountedTrips = tripPackages.filter((t) => t.price.discount);

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <div className="bg-gradient-to-b from-primary/10 to-background border-b border-border py-12">
        <div className="container-main">
          <div className="flex items-center gap-2 text-primary mb-3">
            <Flame className="h-5 w-5" />
            <span className="text-sm font-semibold uppercase tracking-wider">Limited Time</span>
          </div>
          <h1 className="heading-1">Deals & Special Offers</h1>
          <p className="mt-3 text-muted-foreground max-w-lg">
            Exclusive savings on our most popular trips. Book now before they&apos;re gone!
          </p>
        </div>
      </div>

      {/* Featured Deals */}
      <section className="section-padding">
        <div className="container-main">
          <div className="flex items-center gap-2 mb-6">
            <Tag className="h-5 w-5 text-primary" />
            <h2 className="heading-3">Featured Deals</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {deals.map((deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </div>
        </div>
      </section>

      {/* Discounted Trips */}
      {discountedTrips.length > 0 && (
        <section className="section-padding bg-secondary">
          <div className="container-main">
            <h2 className="heading-3 mb-6">More Savings</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {discountedTrips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section-padding">
        <div className="container-main">
          <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Don&apos;t See What You&apos;re Looking For?
            </h2>
            <p className="mt-3 text-white/90 max-w-lg mx-auto">
              Our travel experts can help you find the perfect deal for your dream destination
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-foreground px-6 py-3 rounded-lg font-semibold mt-6 hover:bg-white/90 transition-colors"
            >
              Talk to an Expert
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
