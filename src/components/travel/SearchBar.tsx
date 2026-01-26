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
      <div className={cn("flex items-center gap-2 bg-white rounded-lg border border-slate-200 p-1.5", className)}>
        <div className="flex items-center gap-2 flex-1 px-3">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Where to?"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="flex-1 text-sm outline-none placeholder:text-slate-400"
          />
        </div>
        <button
          onClick={handleSearch}
          className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          Search
        </button>
      </div>
    );
  }

  return (
    <div className={cn("bg-white rounded-2xl shadow-xl p-2", className)}>
      <div className="grid md:grid-cols-4 gap-2">
        {/* Destination */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 transition-colors">
          <MapPin className="h-5 w-5 text-slate-400" />
          <div className="flex-1 min-w-0">
            <label className="block text-xs font-medium text-slate-500">Destination</label>
            <input
              type="text"
              placeholder="Where to?"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full text-sm font-medium outline-none placeholder:text-slate-400 bg-transparent"
            />
          </div>
        </div>

        {/* Dates */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 transition-colors border-l border-slate-100">
          <Calendar className="h-5 w-5 text-slate-400" />
          <div className="flex-1 min-w-0">
            <label className="block text-xs font-medium text-slate-500">Dates</label>
            <input
              type="text"
              placeholder="Add dates"
              className="w-full text-sm font-medium outline-none placeholder:text-slate-400 bg-transparent"
            />
          </div>
        </div>

        {/* Travelers */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 transition-colors border-l border-slate-100">
          <Users className="h-5 w-5 text-slate-400" />
          <div className="flex-1 min-w-0">
            <label className="block text-xs font-medium text-slate-500">Travelers</label>
            <input
              type="text"
              placeholder="2 adults"
              className="w-full text-sm font-medium outline-none placeholder:text-slate-400 bg-transparent"
            />
          </div>
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="flex items-center justify-center gap-2 bg-primary text-white rounded-xl py-3 font-medium hover:bg-primary/90 transition-colors"
        >
          <Search className="h-5 w-5" />
          <span>Search</span>
        </button>
      </div>
    </div>
  );
}
