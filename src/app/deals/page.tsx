"use client";

import { motion } from "framer-motion";
import { Flame, Clock, Tag, ArrowRight } from "lucide-react";
import { DealCard } from "@/components/travel/DealCard";
import { TripCard } from "@/components/travel/TripCard";
import { Badge } from "@/components/ui/badge";
import { deals, tripPackages } from "@/lib/data";

export default function DealsPage() {
  const featuredDeal = deals.find((d) => d.featured);
  const otherDeals = deals.filter((d) => d.id !== featuredDeal?.id);
  const discountedTrips = tripPackages.filter((t) => t.price.discount);

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pb-20 pt-32">
        <div className="container-travel">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Badge variant="destructive" className="gap-1">
              <Flame className="h-3 w-3" />
              Hot Deals
            </Badge>
            <h1 className="mt-4 text-4xl font-bold text-white md:text-5xl">
              Exclusive Travel Deals
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400">
              Grab these limited-time offers before they expire. Save big on your
              dream vacations!
            </p>
          </motion.div>

          {/* Featured Deal */}
          {featuredDeal && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-12"
            >
              <DealCard deal={featuredDeal} variant="featured" />
            </motion.div>
          )}
        </div>
      </section>

      {/* Active Deals */}
      <section className="py-20">
        <div className="container-travel">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
                Active Deals
              </h2>
              <p className="mt-2 text-slate-600">
                Limited spots available - book now to secure your discount
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Clock className="h-4 w-4" />
              Updated daily
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {otherDeals.map((deal, index) => (
              <motion.div
                key={deal.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <DealCard deal={deal} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Discounted Trips */}
      <section className="bg-slate-50 py-20">
        <div className="container-travel">
          <div className="flex items-center gap-3">
            <Tag className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              More Savings
            </h2>
          </div>
          <p className="mt-2 text-slate-600">
            Trips with special discounts and offers
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {discountedTrips.map((trip, index) => (
              <motion.div
                key={trip.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <TripCard trip={trip} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20">
        <div className="container-travel">
          <div className="rounded-3xl bg-gradient-to-r from-primary to-amber-500 p-8 md:p-12">
            <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
              <div className="text-center lg:text-left">
                <h3 className="text-2xl font-bold text-white md:text-3xl">
                  Never Miss a Deal
                </h3>
                <p className="mt-2 text-white/80">
                  Subscribe to get exclusive offers delivered to your inbox
                </p>
              </div>
              <div className="flex w-full max-w-md gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 rounded-xl bg-white/20 px-4 py-3 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button className="flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-slate-900 transition-all hover:bg-white/90">
                  Subscribe
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
