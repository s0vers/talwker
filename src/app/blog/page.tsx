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
    <div className="min-h-screen bg-white pt-20">
      {/* Header */}
      <div className="bg-slate-900 py-12">
        <div className="container-travel">
          <h1 className="text-2xl md:text-3xl font-semibold text-white">Travel Journal</h1>
          <p className="mt-2 text-slate-400">Tips and inspiration for your next adventure</p>

          <div className="mt-6 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/10 text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-1 focus:ring-white/30"
            />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="border-b border-slate-100 sticky top-16 bg-white z-10">
        <div className="container-travel py-3 overflow-x-auto">
          <div className="flex gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                  category === cat ? "bg-primary text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
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
        <div className="container-travel">
          {filtered.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-slate-500">No articles found.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
