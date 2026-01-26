"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, Shield, Clock, Headphones, Award, MapPin, ChevronRight } from "lucide-react";
import { SearchBar } from "@/components/travel/SearchBar";
import { DestinationCard } from "@/components/travel/DestinationCard";
import { TripCard } from "@/components/travel/TripCard";
import { BlogCard } from "@/components/travel/BlogCard";
import { destinations, tripPackages, blogPosts, categories } from "@/lib/data";

export default function Home() {
  const featuredDestinations = destinations.slice(0, 4);
  const featuredTrips = tripPackages.filter((t) => t.featured).slice(0, 4);
  const featuredPosts = blogPosts.slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1920"
            alt="Beautiful beach destination"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>

        <div className="container-main relative z-10 py-32">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              Discover 100+ destinations worldwide
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Your Next Adventure
              <span className="block text-primary mt-2">Starts Here</span>
            </h1>
            <p className="mt-6 text-lg text-white/80 max-w-xl leading-relaxed">
              Curated travel experiences to the world&apos;s most breathtaking destinations. 
              Expert guides, seamless planning, unforgettable memories.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/search" className="btn-primary px-8 py-3 text-base">
                Explore Trips
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link href="/contact" className="btn bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 px-8 py-3 text-base">
                Get in Touch
              </Link>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-12 max-w-4xl">
            <SearchBar variant="hero" />
          </div>

          {/* Quick Stats */}
          <div className="mt-12 flex flex-wrap gap-8 md:gap-12">
            {[
              { value: "100+", label: "Destinations" },
              { value: "50K+", label: "Happy Travelers" },
              { value: "4.9", label: "Average Rating" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-white/60 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Quick Links */}
      <section className="py-6 border-b border-border bg-background">
        <div className="container-main">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            <span className="text-sm text-muted-foreground flex-shrink-0">Popular:</span>
            {categories.slice(0, 6).map((cat) => (
              <Link
                key={cat.slug}
                href={`/search?category=${cat.slug}`}
                className="flex-shrink-0 px-4 py-2 text-sm font-medium bg-secondary hover:bg-primary hover:text-white rounded-full transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="section-padding bg-background">
        <div className="container-main">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Explore</span>
              <h2 className="heading-2 mt-2">Popular Destinations</h2>
              <p className="mt-3 text-muted-foreground max-w-lg">
                Discover our handpicked destinations loved by travelers around the world
              </p>
            </div>
            <Link href="/search" className="btn-ghost text-primary">
              View all <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredDestinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Trips */}
      <section className="section-padding bg-secondary">
        <div className="container-main">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Curated</span>
              <h2 className="heading-2 mt-2">Featured Experiences</h2>
              <p className="mt-3 text-muted-foreground max-w-lg">
                Expertly crafted itineraries for unforgettable adventures
              </p>
            </div>
            <Link href="/search" className="btn-ghost text-primary">
              Browse all <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredTrips.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-background">
        <div className="container-main">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Why Talkwer</span>
            <h2 className="heading-2 mt-2">Travel With Confidence</h2>
            <p className="mt-3 text-muted-foreground">
              We go above and beyond to ensure your journey is seamless and memorable
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Shield,
                title: "Secure Booking",
                description: "Your payments and data are protected with enterprise-grade security",
              },
              {
                icon: Clock,
                title: "Free Cancellation",
                description: "Plans change. Cancel up to 48 hours before for a full refund",
              },
              {
                icon: Headphones,
                title: "24/7 Support",
                description: "Our travel experts are always available to assist you",
              },
              {
                icon: Award,
                title: "Best Price",
                description: "Find a lower price? We&apos;ll match it and give you 10% off",
              },
            ].map((feature) => (
              <div key={feature.title} className="text-center p-6 rounded-xl bg-secondary hover:shadow-md transition-shadow">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-secondary">
        <div className="container-main">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Testimonials</span>
            <h2 className="heading-2 mt-2">What Travelers Say</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                name: "Sarah Mitchell",
                location: "New York, USA",
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
                rating: 5,
                text: "The Bali trip exceeded all expectations. Every detail was perfectly planned, and our guide was absolutely fantastic. Already planning our next adventure!",
                trip: "Bali Adventure",
              },
              {
                name: "James Chen",
                location: "London, UK",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
                rating: 5,
                text: "Tokyo Discovery was incredible. The perfect balance of traditional culture and modern experiences. The itinerary was thoughtfully crafted.",
                trip: "Tokyo Discovery",
              },
              {
                name: "Maria Santos",
                location: "Sydney, AU",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
                rating: 5,
                text: "Our Maldives honeymoon was pure paradise. The overwater villa, the service, everything was beyond perfect. Worth every penny!",
                trip: "Maldives Escape",
              },
            ].map((testimonial) => (
              <div key={testimonial.name} className="card p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-foreground leading-relaxed">&ldquo;{testimonial.text}&rdquo;</p>
                <div className="mt-6 pt-4 border-t border-border flex items-center gap-3">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={44}
                    height={44}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
                <p className="mt-3 text-sm text-primary font-medium">{testimonial.trip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="section-padding bg-background">
        <div className="container-main">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Journal</span>
              <h2 className="heading-2 mt-2">Travel Tips & Stories</h2>
              <p className="mt-3 text-muted-foreground max-w-lg">
                Inspiration and insights from our travel experts
              </p>
            </div>
            <Link href="/blog" className="btn-ghost text-primary">
              Read all <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {featuredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920"
            alt="Mountain landscape"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
        </div>

        <div className="container-main relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Ready to Start Your Journey?
          </h2>
          <p className="mt-4 text-lg text-white/90 max-w-xl mx-auto">
            Join thousands of travelers who have discovered their dream destinations with Talkwer
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/search" className="btn bg-white text-foreground hover:bg-white/90 px-8 py-3 text-base font-semibold">
              Explore Trips <ArrowRight className="h-5 w-5" />
            </Link>
            <Link href="/contact" className="btn bg-white/10 text-white border border-white/30 hover:bg-white/20 px-8 py-3 text-base font-semibold">
              Talk to Expert
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-12 bg-secondary border-t border-border">
        <div className="container-main">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-semibold text-foreground">Get Exclusive Deals</h3>
              <p className="mt-1 text-muted-foreground">Subscribe for special offers and travel inspiration</p>
            </div>
            <form className="flex gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="input flex-1 md:w-72"
                required
              />
              <button type="submit" className="btn-primary">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
