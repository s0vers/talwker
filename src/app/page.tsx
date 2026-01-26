"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, Shield, Clock, Headphones, Award } from "lucide-react";
import { SearchBar } from "@/components/travel/SearchBar";
import { DestinationCard } from "@/components/travel/DestinationCard";
import { TripCard } from "@/components/travel/TripCard";
import { BlogCard } from "@/components/travel/BlogCard";
import { destinations, tripPackages, blogPosts } from "@/lib/data";

export default function Home() {
  const featuredDestinations = destinations.slice(0, 4);
  const featuredTrips = tripPackages.filter((t) => t.featured).slice(0, 4);
  const featuredPosts = blogPosts.slice(0, 3);

  return (
    <>
      {/* Hero Section - Clean and Simple */}
      <section className="relative min-h-[85vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1920"
            alt="Beautiful beach destination"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="container-travel relative z-10 py-32">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Discover Your Next Adventure
            </h1>
            <p className="mt-4 text-lg text-white/80 max-w-lg">
              Curated travel experiences to the world&apos;s most beautiful destinations. 
              Start your journey today.
            </p>
          </div>

          <div className="mt-8 max-w-3xl">
            <SearchBar variant="hero" />
          </div>
        </div>
      </section>

      {/* Destinations Section */}
      <section className="section-padding">
        <div className="container-travel">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="section-title">Popular Destinations</h2>
              <p className="mt-2 section-subtitle">
                Explore our most loved destinations
              </p>
            </div>
            <Link
              href="/search"
              className="hidden md:flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredDestinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Trips */}
      <section className="section-padding bg-slate-50">
        <div className="container-travel">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="section-title">Featured Trips</h2>
              <p className="mt-2 section-subtitle">
                Handpicked experiences for every traveler
              </p>
            </div>
            <Link
              href="/search"
              className="hidden md:flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              Browse all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredTrips.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us - Simple Grid */}
      <section className="section-padding">
        <div className="container-travel">
          <div className="text-center mb-12">
            <h2 className="section-title">Why Travel With Us</h2>
            <p className="mt-2 section-subtitle">
              Your journey is our priority
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Shield,
                title: "Secure Booking",
                description: "Your payments are protected with bank-level security",
              },
              {
                icon: Clock,
                title: "Free Cancellation",
                description: "Change of plans? Cancel up to 48 hours before",
              },
              {
                icon: Headphones,
                title: "24/7 Support",
                description: "Our team is always here to help you",
              },
              {
                icon: Award,
                title: "Best Price",
                description: "Find a lower price and we will match it",
              },
            ].map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-slate-900">{feature.title}</h3>
                <p className="mt-1 text-sm text-slate-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Clean */}
      <section className="section-padding bg-slate-50">
        <div className="container-travel">
          <div className="text-center mb-12">
            <h2 className="section-title">What Travelers Say</h2>
            <p className="mt-2 section-subtitle">
              Real stories from real travelers
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                name: "Sarah M.",
                location: "New York",
                text: "The Bali trip was perfectly organized. Every detail was taken care of. Highly recommend!",
                rating: 5,
              },
              {
                name: "James L.",
                location: "London",
                text: "Our Tokyo tour was incredible. The guide was knowledgeable and the itinerary was perfect.",
                rating: 5,
              },
              {
                name: "Maria G.",
                location: "Sydney",
                text: "The Maldives honeymoon package was worth every penny. Pure paradise!",
                rating: 5,
              },
            ].map((testimonial) => (
              <div
                key={testimonial.name}
                className="bg-white rounded-xl p-6 border border-slate-100"
              >
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-600">&ldquo;{testimonial.text}&rdquo;</p>
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <p className="font-medium text-slate-900">{testimonial.name}</p>
                  <p className="text-sm text-slate-500">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="section-padding">
        <div className="container-travel">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="section-title">Travel Journal</h2>
              <p className="mt-2 section-subtitle">
                Tips and inspiration for your next trip
              </p>
            </div>
            <Link
              href="/blog"
              className="hidden md:flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              Read all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {featuredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Simple */}
      <section className="section-padding bg-slate-900">
        <div className="container-travel text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-white">
            Ready to Start Your Journey?
          </h2>
          <p className="mt-3 text-slate-400 max-w-lg mx-auto">
            Join thousands of travelers who have discovered their dream destinations with us.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/search"
              className="inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Explore Trips
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/20 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
