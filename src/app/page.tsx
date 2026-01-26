"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play, Star, ChevronRight } from "lucide-react";
import { SearchBar } from "@/components/travel/SearchBar";
import { DestinationCard } from "@/components/travel/DestinationCard";
import { TripCard } from "@/components/travel/TripCard";
import { DealCard } from "@/components/travel/DealCard";
import { BlogCard } from "@/components/travel/BlogCard";
import { CategoriesGrid } from "@/components/travel/CategoryCard";
import { FeatureSection } from "@/components/travel/FeatureSection";
import { Badge } from "@/components/ui/badge";
import { destinations, tripPackages, deals, blogPosts, categories } from "@/lib/data";

export default function Home() {
  const featuredDestinations = destinations.filter((d) => d.featured).slice(0, 4);
  const featuredTrips = tripPackages.filter((t) => t.featured).slice(0, 4);
  const featuredDeals = deals.filter((d) => d.featured).slice(0, 2);
  const featuredPosts = blogPosts.filter((p) => p.featured).slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1920"
            alt="Beautiful tropical beach destination"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>

        {/* Hero Content */}
        <div className="relative flex min-h-screen flex-col items-center justify-center px-4 pt-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <Badge variant="glass" className="mb-6 text-sm">
              Discover 100+ Destinations Worldwide
            </Badge>
            <h1 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Explore the World,{" "}
              <span className="text-gradient">Create Memories</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80 md:text-xl">
              Embark on unforgettable journeys to the world&apos;s most breathtaking
              destinations. Curated experiences designed for the modern traveler.
            </p>
          </motion.div>

          {/* Search Bar */}
          <div className="mt-10 w-full max-w-5xl px-4">
            <SearchBar variant="hero" />
          </div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16"
          >
            {[
              { value: "100+", label: "Destinations" },
              { value: "50K+", label: "Happy Travelers" },
              { value: "4.9", label: "Average Rating" },
              { value: "24/7", label: "Support" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-white md:text-4xl">
                  {stat.value}
                </div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="flex flex-col items-center gap-2 text-white/60"
            >
              <span className="text-sm">Scroll to explore</span>
              <ChevronRight className="h-5 w-5 rotate-90" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-20">
        <div className="container-travel">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-sm font-semibold uppercase tracking-wider text-primary"
              >
                Top Destinations
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl"
              >
                Explore Popular Destinations
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="mt-3 max-w-xl text-slate-600"
              >
                From tropical beaches to ancient cities, discover our most sought-after
                travel destinations handpicked by our travel experts.
              </motion.p>
            </div>
            <Link
              href="/search"
              className="group flex items-center gap-2 font-semibold text-primary hover:underline"
            >
              View all destinations
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredDestinations.map((destination, index) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
                variant={index === 0 ? "featured" : "default"}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-slate-50 py-20">
        <div className="container-travel">
          <div className="text-center">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-sm font-semibold uppercase tracking-wider text-primary"
            >
              Trip Types
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl"
            >
              Find Your Perfect Adventure
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mx-auto mt-3 max-w-xl text-slate-600"
            >
              Whether you seek adventure, relaxation, or cultural immersion, we have the
              perfect trip waiting for you.
            </motion.p>
          </div>

          <div className="mt-12">
            <CategoriesGrid categories={categories.slice(0, 6)} variant="icon" />
          </div>
        </div>
      </section>

      {/* Featured Trips */}
      <section className="py-20">
        <div className="container-travel">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-sm font-semibold uppercase tracking-wider text-primary"
              >
                Curated Experiences
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl"
              >
                Popular Tour Packages
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="mt-3 max-w-xl text-slate-600"
              >
                Expertly crafted itineraries that combine the best experiences, accommodations,
                and local insights.
              </motion.p>
            </div>
            <Link
              href="/search"
              className="group flex items-center gap-2 font-semibold text-primary hover:underline"
            >
              Browse all trips
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {featuredTrips.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        </div>
      </section>

      {/* Deals Banner */}
      <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 py-20">
        <div className="container-travel">
          <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
            <div className="max-w-xl text-center lg:text-left">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-sm font-semibold uppercase tracking-wider text-primary"
              >
                Limited Time Offers
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-2 text-3xl font-bold text-white md:text-4xl"
              >
                Hot Deals & Special Offers
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="mt-3 text-slate-400"
              >
                Don&apos;t miss out on incredible savings for your next adventure. Book now
                before these exclusive deals expire!
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Link
                  href="/deals"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 font-semibold text-white transition-all hover:bg-primary/90"
                >
                  View All Deals
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </div>

            <div className="w-full max-w-2xl">
              {featuredDeals[0] && (
                <DealCard deal={featuredDeals[0]} variant="featured" />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <FeatureSection variant="cards" />

      {/* Testimonial / Social Proof */}
      <section className="bg-slate-50 py-20">
        <div className="container-travel">
          <div className="text-center">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-sm font-semibold uppercase tracking-wider text-primary"
            >
              Testimonials
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl"
            >
              What Our Travelers Say
            </motion.h2>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              {
                name: "Sarah M.",
                location: "New York, USA",
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
                rating: 5,
                text: "Our Bali trip was absolutely magical! Everything was perfectly organized, from the airport pickup to the stunning resort. Can't wait to book our next adventure!",
                trip: "Bali Adventure",
              },
              {
                name: "James L.",
                location: "London, UK",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
                rating: 5,
                text: "The Tokyo Discovery tour exceeded all expectations. Our guide was incredibly knowledgeable, and the itinerary struck the perfect balance between culture and fun.",
                trip: "Tokyo Discovery",
              },
              {
                name: "Maria G.",
                location: "Sydney, Australia",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
                rating: 5,
                text: "The honeymoon package in the Maldives was worth every penny. The overwater villa, the service, the sunsets - everything was pure perfection.",
                trip: "Maldives Luxury Escape",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-2xl bg-white p-6 shadow-card"
              >
                <div className="flex items-center gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="mt-4 text-slate-600">&ldquo;{testimonial.text}&rdquo;</p>
                <div className="mt-6 flex items-center gap-4 border-t pt-4">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-slate-900">{testimonial.name}</p>
                    <p className="text-sm text-slate-500">{testimonial.location}</p>
                  </div>
                </div>
                <p className="mt-3 text-sm text-primary">{testimonial.trip}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20">
        <div className="container-travel">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-sm font-semibold uppercase tracking-wider text-primary"
              >
                Travel Journal
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl"
              >
                Travel Tips & Inspiration
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="mt-3 max-w-xl text-slate-600"
              >
                Discover expert travel tips, destination guides, and inspiring stories
                from our community of travelers.
              </motion.p>
            </div>
            <Link
              href="/blog"
              className="group flex items-center gap-2 font-semibold text-primary hover:underline"
            >
              Read all articles
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {featuredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920"
            alt="Mountain landscape"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-amber-500/90" />
        </div>

        <div className="container-travel relative">
          <div className="mx-auto max-w-3xl text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-white md:text-5xl"
            >
              Ready for Your Next Adventure?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-4 text-lg text-white/90"
            >
              Join thousands of travelers who have discovered their dream destinations
              with us. Your next unforgettable journey starts here.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Link
                href="/search"
                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-slate-900 shadow-xl transition-all hover:bg-slate-100"
              >
                Explore Trips
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
              >
                Contact Us
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <FeatureSection variant="stats" />
    </>
  );
}
