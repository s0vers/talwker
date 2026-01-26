"use client";

import { useState } from "react";
import { MapPin, Calendar, Users, Search } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  variant?: "hero" | "sticky" | "inline";
  className?: string;
  onSearch?: (filters: SearchFilters) => void;
}

export function SearchBar({ variant = "hero", className, onSearch }: SearchBarProps) {
  const [destination, setDestination] = useState("");
  const [dates, setDates] = useState("");
  const [travelers, setTravelers] = useState("2");

  const handleSearch = () => {
    onSearch?.({
      destination,
      travelers: parseInt(travelers),
    });
  };

  if (variant === "sticky") {
    return (
      <div className={cn("bg-white shadow-lg", className)}>
        <div className="container-travel">
          <div className="flex items-center gap-4 py-3">
            <div className="flex flex-1 items-center gap-2 rounded-xl bg-slate-100 px-4 py-2">
              <MapPin className="h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Where to?"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
              />
            </div>
            <div className="hidden md:flex flex-1 items-center gap-2 rounded-xl bg-slate-100 px-4 py-2">
              <Calendar className="h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="When?"
                value={dates}
                onChange={(e) => setDates(e.target.value)}
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
              />
            </div>
            <div className="hidden md:flex flex-1 items-center gap-2 rounded-xl bg-slate-100 px-4 py-2">
              <Users className="h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Travelers"
                value={travelers}
                onChange={(e) => setTravelers(e.target.value)}
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
              />
            </div>
            <button
              onClick={handleSearch}
              className="rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary/90"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <div
        className={cn(
          "flex flex-col md:flex-row items-stretch gap-3 rounded-2xl bg-white p-3 shadow-xl",
          className
        )}
      >
        <div className="flex flex-1 items-center gap-3 rounded-xl bg-slate-50 px-4 py-3">
          <MapPin className="h-5 w-5 text-primary" />
          <div className="flex-1">
            <label className="text-xs font-medium text-slate-500">
              Destination
            </label>
            <input
              type="text"
              placeholder="Where do you want to go?"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="flex flex-1 items-center gap-3 rounded-xl bg-slate-50 px-4 py-3">
          <Calendar className="h-5 w-5 text-primary" />
          <div className="flex-1">
            <label className="text-xs font-medium text-slate-500">Dates</label>
            <input
              type="text"
              placeholder="Add dates"
              value={dates}
              onChange={(e) => setDates(e.target.value)}
              className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="flex flex-1 items-center gap-3 rounded-xl bg-slate-50 px-4 py-3">
          <Users className="h-5 w-5 text-primary" />
          <div className="flex-1">
            <label className="text-xs font-medium text-slate-500">Travelers</label>
            <input
              type="text"
              placeholder="Add guests"
              value={travelers}
              onChange={(e) => setTravelers(e.target.value)}
              className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-slate-400"
            />
          </div>
        </div>

        <button
          onClick={handleSearch}
          className="flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3 font-semibold text-white transition-all hover:bg-primary/90"
        >
          <Search className="h-5 w-5" />
          <span className="hidden md:inline">Search</span>
        </button>
      </div>
    );
  }

  // Hero variant
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className={cn(
        "w-full max-w-5xl rounded-3xl bg-white/95 p-4 shadow-2xl backdrop-blur-sm md:p-6",
        className
      )}
    >
      <div className="grid gap-4 md:grid-cols-4">
        {/* Destination */}
        <div className="relative rounded-2xl bg-slate-50 p-4 transition-all focus-within:ring-2 focus-within:ring-primary">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-primary/10 p-2.5">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Where to?
              </label>
              <input
                type="text"
                placeholder="Search destinations"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-transparent text-base font-medium outline-none placeholder:text-slate-400"
              />
            </div>
          </div>
        </div>

        {/* Dates */}
        <div className="relative rounded-2xl bg-slate-50 p-4 transition-all focus-within:ring-2 focus-within:ring-primary">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-primary/10 p-2.5">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                When?
              </label>
              <input
                type="text"
                placeholder="Select dates"
                value={dates}
                onChange={(e) => setDates(e.target.value)}
                className="w-full bg-transparent text-base font-medium outline-none placeholder:text-slate-400"
              />
            </div>
          </div>
        </div>

        {/* Travelers */}
        <div className="relative rounded-2xl bg-slate-50 p-4 transition-all focus-within:ring-2 focus-within:ring-primary">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-primary/10 p-2.5">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Travelers
              </label>
              <input
                type="text"
                placeholder="2 adults"
                value={travelers}
                onChange={(e) => setTravelers(e.target.value)}
                className="w-full bg-transparent text-base font-medium outline-none placeholder:text-slate-400"
              />
            </div>
          </div>
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="group flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 p-4 font-semibold text-white shadow-lg shadow-orange-500/30 transition-all hover:shadow-xl hover:shadow-orange-500/40"
        >
          <Search className="h-5 w-5 transition-transform group-hover:scale-110" />
          <span className="text-lg">Search</span>
        </button>
      </div>

      {/* Quick suggestions */}
      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4">
        <span className="text-sm text-slate-500">Popular:</span>
        {["Bali", "Paris", "Tokyo", "Maldives", "Swiss Alps"].map((place) => (
          <button
            key={place}
            onClick={() => setDestination(place)}
            className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700 transition-all hover:bg-primary hover:text-white"
          >
            {place}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
