"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, ArrowRight } from "lucide-react";
import { BlogCard } from "@/components/travel/BlogCard";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { blogPosts } from "@/lib/data";

const categories = [
  "All",
  "Destinations",
  "Travel Tips",
  "Budget Travel",
  "Food & Drink",
  "Adventure",
  "Culture",
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const featuredPost = blogPosts.find((p) => p.featured);
  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pb-12 pt-32">
        <div className="container-travel">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-white md:text-5xl">
              Travel Journal
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400">
              Tips, guides, and stories to inspire your next adventure
            </p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-8 max-w-xl"
          >
            <Input
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="h-5 w-5" />}
              className="border-0 bg-white/10 text-white placeholder:text-white/60 focus-visible:ring-white"
            />
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="border-b bg-white py-4 sticky top-20 z-30">
        <div className="container-travel">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "flex-shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all",
                  selectedCategory === category
                    ? "bg-primary text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && selectedCategory === "All" && !searchQuery && (
        <section className="py-12">
          <div className="container-travel">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <BlogCard post={featuredPost} variant="featured" />
            </motion.div>
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section className="py-12">
        <div className="container-travel">
          {filteredPosts.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <BlogCard post={post} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-slate-500">No articles found matching your criteria.</p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="mt-4 text-primary hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}

          {/* Load More */}
          {filteredPosts.length > 0 && (
            <div className="mt-12 text-center">
              <button className="inline-flex items-center gap-2 rounded-full border-2 border-primary px-8 py-3 font-semibold text-primary transition-all hover:bg-primary hover:text-white">
                Load More Articles
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-slate-50 py-20">
        <div className="container-travel">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Get Travel Inspiration
            </h2>
            <p className="mt-3 text-slate-600">
              Join our newsletter and receive weekly travel tips, destination guides,
              and exclusive offers.
            </p>
            <div className="mt-6 flex gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1"
              />
              <button className="rounded-xl bg-primary px-6 py-3 font-semibold text-white transition-all hover:bg-primary/90">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
