"use client";

import { DealCard } from "@/components/travel/DealCard";
import { TripCard } from "@/components/travel/TripCard";
import { deals, tripPackages } from "@/lib/data";

export default function DealsPage() {
  const discountedTrips = tripPackages.filter((t) => t.price.discount);

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Header */}
      <div className="bg-slate-900 py-12">
        <div className="container-travel">
          <h1 className="text-2xl md:text-3xl font-semibold text-white">Deals & Offers</h1>
          <p className="mt-2 text-slate-400">Limited-time savings on amazing trips</p>
        </div>
      </div>

      {/* Deals */}
      <section className="section-padding">
        <div className="container-travel">
          <h2 className="section-title mb-6">Featured Deals</h2>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {deals.map((deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </div>
        </div>
      </section>

      {/* Discounted Trips */}
      {discountedTrips.length > 0 && (
        <section className="section-padding bg-slate-50">
          <div className="container-travel">
            <h2 className="section-title mb-6">More Savings</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {discountedTrips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
