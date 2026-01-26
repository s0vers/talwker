"use client";

import { useState } from "react";
import { Search, MapPin, Calendar, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  variant?: "hero" | "compact";
  className?: string;
  onSearch?: (filters: SearchFilters) => void;
}

export function SearchBar({ variant = "hero", className, onSearch }: SearchBarProps) {
  const [destination, setDestination] = useState("");

  const handleSearch = () => {
    onSearch?.({ destination });
  };

  if (variant === "compact") {
    return (
      <div className={cn("flex items-center gap-2 bg-background rounded-lg border border-border p-1.5", className)}>
        <div className="flex items-center gap-2 flex-1 px-3">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search destinations..."
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="flex-1 text-sm bg-transparent outline-none placeholder:text-muted-foreground text-foreground"
          />
        </div>
        <button
          onClick={handleSearch}
          className="btn-primary py-2"
        >
          Search
        </button>
      </div>
    );
  }

  return (
    <div className={cn("bg-background rounded-2xl shadow-xl border border-border p-2", className)}>
      <div className="grid md:grid-cols-4 gap-2">
        {/* Destination */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-secondary transition-colors cursor-pointer">
          <div className="p-2 rounded-lg bg-primary/10">
            <MapPin className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <label className="block text-xs font-medium text-muted-foreground">Destination</label>
            <input
              type="text"
              placeholder="Where to?"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full text-sm font-medium bg-transparent outline-none placeholder:text-muted-foreground text-foreground"
            />
          </div>
        </div>

        {/* Dates */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-secondary transition-colors cursor-pointer border-l border-border">
          <div className="p-2 rounded-lg bg-primary/10">
            <Calendar className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <label className="block text-xs font-medium text-muted-foreground">Dates</label>
            <input
              type="text"
              placeholder="Add dates"
              className="w-full text-sm font-medium bg-transparent outline-none placeholder:text-muted-foreground text-foreground"
            />
          </div>
        </div>

        {/* Travelers */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-secondary transition-colors cursor-pointer border-l border-border">
          <div className="p-2 rounded-lg bg-primary/10">
            <Users className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <label className="block text-xs font-medium text-muted-foreground">Travelers</label>
            <input
              type="text"
              placeholder="2 adults"
              className="w-full text-sm font-medium bg-transparent outline-none placeholder:text-muted-foreground text-foreground"
            />
          </div>
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="flex items-center justify-center gap-2 bg-primary text-white rounded-xl py-4 font-semibold hover:bg-primary/90 transition-colors"
        >
          <Search className="h-5 w-5" />
          <span>Search</span>
        </button>
      </div>
    </div>
  );
}
