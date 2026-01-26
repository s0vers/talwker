"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { BlogCard } from "@/components/travel/BlogCard";
import { cn } from "@/lib/utils";
import { blogPosts } from "@/lib/data";

const categories = ["All", "Destinations", "Travel Tips", "Budget Travel", "Food & Drink"];

export default function BlogPage() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = blogPosts.filter((post) => {
    const matchCategory = category === "All" || post.category === category;
    const matchSearch = post.title.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <div className="bg-gradient-to-b from-secondary to-background border-b border-border py-12">
        <div className="container-main">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Journal</span>
          <h1 className="heading-1 mt-2">Travel Stories & Tips</h1>
          <p className="mt-3 text-muted-foreground max-w-lg">
            Inspiration, guides, and insights from our travel experts
          </p>

          {/* Search */}
          <div className="mt-6 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input pl-10"
            />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="border-b border-border sticky top-16 bg-background z-10">
        <div className="container-main py-3 overflow-x-auto">
          <div className="flex gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors",
                  category === cat
                    ? "bg-primary text-white"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Posts */}
      <section className="section-padding">
        <div className="container-main">
          {filtered.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-card rounded-xl border border-border">
              <p className="text-muted-foreground">No articles found.</p>
              <button
                onClick={() => { setCategory("All"); setSearch(""); }}
                className="mt-2 text-primary text-sm font-medium hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-12 bg-secondary border-t border-border">
        <div className="container-main text-center">
          <h2 className="heading-3">Get Travel Inspiration</h2>
          <p className="mt-2 text-muted-foreground">Subscribe for weekly tips and destination guides</p>
          <form className="mt-6 flex gap-3 max-w-md mx-auto">
            <input type="email" placeholder="Enter your email" className="input flex-1" required />
            <button type="submit" className="btn-primary">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
}
