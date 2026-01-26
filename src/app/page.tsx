"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Star, Shield, Clock, Headphones, Award, ChevronRight, Play, Sparkles } from "lucide-react";
import { SearchBar } from "@/components/travel/SearchBar";
import { DestinationCard } from "@/components/travel/DestinationCard";
import { TripCard } from "@/components/travel/TripCard";
import { BlogCard } from "@/components/travel/BlogCard";
import { destinations, tripPackages, blogPosts, categories } from "@/lib/data";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

function AnimatedSection({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.section>
  );
}

export default function Home() {
  const featuredDestinations = destinations.slice(0, 4);
  const featuredTrips = tripPackages.filter((t) => t.featured).slice(0, 4);
  const featuredPosts = blogPosts.slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image with Parallax Effect */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1920"
            alt="Beautiful beach destination"
            fill
            className="object-cover scale-105"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70" />
          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
        </div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-1/4 right-[10%] w-72 h-72 bg-primary/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 left-[5%] w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        <div className="container-main relative z-10 py-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white text-sm font-medium px-5 py-2.5 rounded-full mb-8 border border-white/10"
            >
              <Sparkles className="h-4 w-4 text-primary" />
              Discover 100+ handpicked destinations
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight">
              Travel Beyond
              <span className="block bg-gradient-to-r from-primary via-orange-400 to-amber-400 bg-clip-text text-transparent mt-2">
                Ordinary
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-6 text-xl text-white/80 max-w-xl leading-relaxed"
            >
              Curated experiences to the world&apos;s most extraordinary places. 
              Expert-crafted itineraries. Unforgettable memories.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Link
                href="/search"
                className="group inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all hover:shadow-xl hover:shadow-primary/25 active:scale-[0.98]"
              >
                Start Exploring
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="group inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-6 py-4 rounded-xl font-medium transition-all border border-white/10">
                <span className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <Play className="h-4 w-4 ml-0.5" />
                </span>
                Watch Our Story
              </button>
            </motion.div>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-16 max-w-4xl"
          >
            <SearchBar variant="hero" />
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-16 flex flex-wrap items-center gap-8 md:gap-12"
          >
            {[
              { value: "50K+", label: "Happy Travelers" },
              { value: "100+", label: "Destinations" },
              { value: "4.9★", label: "Average Rating" },
              { value: "24/7", label: "Support" },
            ].map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-3">
                <span className="text-3xl md:text-4xl font-bold text-white">{stat.value}</span>
                <span className="text-sm text-white/60">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
            <motion.div
              className="w-1.5 h-1.5 bg-white rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-background border-b border-border sticky top-16 z-30 backdrop-blur-md bg-background/95">
        <div className="container-main">
          <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
            <span className="text-sm text-muted-foreground font-medium flex-shrink-0">Explore:</span>
            {categories.slice(0, 8).map((cat) => (
              <Link
                key={cat.slug}
                href={`/search?category=${cat.slug}`}
                className="flex-shrink-0 px-5 py-2.5 text-sm font-medium bg-secondary hover:bg-primary hover:text-white rounded-full transition-all hover:shadow-md"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <AnimatedSection className="py-20 bg-background">
        <div className="container-main">
          <motion.div variants={fadeInUp} className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-sm font-semibold text-primary uppercase tracking-widest">Explore</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3">Popular Destinations</h2>
              <p className="mt-4 text-muted-foreground max-w-lg text-lg">
                Handpicked destinations loved by travelers worldwide
              </p>
            </div>
            <Link href="/search" className="group inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
              View all destinations <ChevronRight className="h-5 w-5" />
            </Link>
          </motion.div>

          <motion.div variants={staggerContainer} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredDestinations.map((destination, i) => (
              <motion.div key={destination.id} variants={fadeInUp}>
                <DestinationCard destination={destination} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Featured Trips */}
      <AnimatedSection className="py-20 bg-secondary">
        <div className="container-main">
          <motion.div variants={fadeInUp} className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-sm font-semibold text-primary uppercase tracking-widest">Curated</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3">Featured Experiences</h2>
              <p className="mt-4 text-muted-foreground max-w-lg text-lg">
                Expertly crafted itineraries for unforgettable adventures
              </p>
            </div>
            <Link href="/search" className="group inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
              Browse all trips <ChevronRight className="h-5 w-5" />
            </Link>
          </motion.div>

          <motion.div variants={staggerContainer} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredTrips.map((trip) => (
              <motion.div key={trip.id} variants={fadeInUp}>
                <TripCard trip={trip} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Why Choose Us */}
      <AnimatedSection className="py-20 bg-background">
        <div className="container-main">
          <motion.div variants={fadeInUp} className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-semibold text-primary uppercase tracking-widest">Why Talkwer</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3">Travel With Confidence</h2>
            <p className="mt-4 text-muted-foreground text-lg">
              We go above and beyond to ensure your journey is seamless
            </p>
          </motion.div>

          <motion.div variants={staggerContainer} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Shield, title: "Secure Booking", description: "Your payments are protected with bank-grade encryption" },
              { icon: Clock, title: "Free Cancellation", description: "Change of plans? Cancel up to 48 hours before for free" },
              { icon: Headphones, title: "24/7 Support", description: "Our travel experts are always just a call away" },
              { icon: Award, title: "Best Price", description: "Found it cheaper? We'll match it plus give you 10% off" },
            ].map((feature) => (
              <motion.div
                key={feature.title}
                variants={fadeInUp}
                className="group relative p-8 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-2 text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Testimonials */}
      <AnimatedSection className="py-20 bg-secondary overflow-hidden">
        <div className="container-main">
          <motion.div variants={fadeInUp} className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-semibold text-primary uppercase tracking-widest">Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3">Loved by Travelers</h2>
          </motion.div>

          <motion.div variants={staggerContainer} className="grid gap-6 md:grid-cols-3">
            {[
              {
                name: "Sarah Mitchell",
                location: "New York, USA",
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
                rating: 5,
                text: "The Bali trip exceeded all expectations. Every detail was perfectly planned. Already planning our next adventure with Talkwer!",
                trip: "Bali Adventure",
              },
              {
                name: "James Chen",
                location: "London, UK",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
                rating: 5,
                text: "Tokyo Discovery was incredible. The perfect balance of tradition and modernity. The itinerary was thoughtfully crafted.",
                trip: "Tokyo Discovery",
              },
              {
                name: "Maria Santos",
                location: "Sydney, AU",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
                rating: 5,
                text: "Our Maldives honeymoon was pure paradise. The overwater villa, the service - everything was beyond perfect!",
                trip: "Maldives Escape",
              },
            ].map((testimonial) => (
              <motion.div
                key={testimonial.name}
                variants={fadeInUp}
                className="relative p-8 rounded-2xl bg-card border border-border"
              >
                <div className="flex gap-1 mb-5">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-foreground text-lg leading-relaxed">&ldquo;{testimonial.text}&rdquo;</p>
                <div className="mt-8 flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-secondary">
                    <Image src={testimonial.avatar} alt={testimonial.name} fill className="object-cover" sizes="48px" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-sm text-primary font-medium">{testimonial.trip}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Blog Section */}
      <AnimatedSection className="py-20 bg-background">
        <div className="container-main">
          <motion.div variants={fadeInUp} className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-sm font-semibold text-primary uppercase tracking-widest">Journal</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3">Travel Stories & Tips</h2>
              <p className="mt-4 text-muted-foreground max-w-lg text-lg">
                Inspiration and insights from our travel experts
              </p>
            </div>
            <Link href="/blog" className="group inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
              Read all articles <ChevronRight className="h-5 w-5" />
            </Link>
          </motion.div>

          <motion.div variants={staggerContainer} className="grid gap-6 md:grid-cols-3">
            {featuredPosts.map((post) => (
              <motion.div key={post.id} variants={fadeInUp}>
                <BlogCard post={post} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920"
            alt="Mountain landscape"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-slate-900/95" />
        </div>

        <div className="container-main relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-white"
            >
              Ready to Start Your Journey?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-6 text-xl text-white/80"
            >
              Join thousands of travelers who have discovered their dream destinations with us
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/search"
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all hover:shadow-xl hover:shadow-primary/25"
              >
                Explore All Trips <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all border border-white/20"
              >
                Talk to an Expert
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-secondary border-t border-border">
        <div className="container-main">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-foreground">Get Exclusive Deals</h3>
            <p className="mt-3 text-muted-foreground">
              Subscribe for special offers and travel inspiration delivered to your inbox
            </p>
            <form className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-4 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                required
              />
              <button type="submit" className="btn-primary px-8 py-4 text-base">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
