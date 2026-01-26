"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Search, MapPin, Calendar, Users, ChevronDown, Minus, Plus } from "lucide-react";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { destinations } from "@/lib/data";

interface SearchBarProps {
  variant?: "hero" | "compact";
  className?: string;
  onSearch?: (filters: SearchFilters) => void;
}

export function SearchBar({ variant = "hero", className, onSearch }: SearchBarProps) {
  const router = useRouter();
  const [destination, setDestination] = useState("");
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});
  const [travelers, setTravelers] = useState({ adults: 2, children: 0 });
  const [isDestinationOpen, setIsDestinationOpen] = useState(false);
  const [isTravelersOpen, setIsTravelersOpen] = useState(false);

  const totalTravelers = travelers.adults + travelers.children;

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (destination) params.set("destination", destination);
    if (dateRange.from) params.set("from", dateRange.from.toISOString());
    if (dateRange.to) params.set("to", dateRange.to.toISOString());
    params.set("travelers", totalTravelers.toString());
    
    router.push(`/search?${params.toString()}`);
    onSearch?.({ destination, travelers: totalTravelers });
  };

  if (variant === "compact") {
    return (
      <div className={cn("flex items-center gap-2 bg-background rounded-xl border border-border p-2", className)}>
        <Popover open={isDestinationOpen} onOpenChange={setIsDestinationOpen}>
          <PopoverTrigger asChild>
            <button className="flex items-center gap-2 flex-1 px-3 py-2 text-left hover:bg-secondary rounded-lg transition-colors">
              <MapPin className="h-4 w-4 text-primary" />
              <span className={cn("text-sm", destination ? "text-foreground" : "text-muted-foreground")}>
                {destination || "Where to?"}
              </span>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-2" align="start">
            <div className="space-y-1">
              {destinations.slice(0, 6).map((dest) => (
                <button
                  key={dest.id}
                  onClick={() => { setDestination(dest.name); setIsDestinationOpen(false); }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-secondary transition-colors text-left"
                >
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground">{dest.name}</p>
                    <p className="text-xs text-muted-foreground">{dest.country}</p>
                  </div>
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
        <button onClick={handleSearch} className="btn-primary py-2 px-4">
          <Search className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div className={cn("bg-background/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-3", className)}>
      <div className="grid md:grid-cols-4 gap-2">
        {/* Destination */}
        <Popover open={isDestinationOpen} onOpenChange={setIsDestinationOpen}>
          <PopoverTrigger asChild>
            <button className="flex items-center gap-3 px-4 py-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors text-left group">
              <div className="p-2.5 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-muted-foreground mb-0.5">Destination</p>
                <p className={cn("text-sm font-semibold truncate", destination ? "text-foreground" : "text-muted-foreground")}>
                  {destination || "Where do you want to go?"}
                </p>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-3" align="start">
            <div className="mb-3">
              <input
                type="text"
                placeholder="Search destinations..."
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <p className="text-xs font-medium text-muted-foreground mb-2 px-1">Popular destinations</p>
            <div className="space-y-1 max-h-64 overflow-y-auto">
              {destinations
                .filter((d) => !destination || d.name.toLowerCase().includes(destination.toLowerCase()))
                .slice(0, 8)
                .map((dest) => (
                  <button
                    key={dest.id}
                    onClick={() => { setDestination(dest.name); setIsDestinationOpen(false); }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg hover:bg-secondary transition-colors text-left"
                  >
                    <div className="w-10 h-10 rounded-lg bg-secondary overflow-hidden relative flex-shrink-0">
                      <Image src={dest.image} alt={dest.name} fill className="object-cover" sizes="40px" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{dest.name}</p>
                      <p className="text-xs text-muted-foreground">{dest.country} · From ${dest.priceFrom}</p>
                    </div>
                  </button>
                ))}
            </div>
          </PopoverContent>
        </Popover>

        {/* Date Range */}
        <Popover>
          <PopoverTrigger asChild>
            <button className="flex items-center gap-3 px-4 py-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors text-left group">
              <div className="p-2.5 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-muted-foreground mb-0.5">When</p>
                <p className={cn("text-sm font-semibold truncate", dateRange.from ? "text-foreground" : "text-muted-foreground")}>
                  {dateRange.from ? (
                    dateRange.to ? (
                      `${format(dateRange.from, "MMM d")} - ${format(dateRange.to, "MMM d")}`
                    ) : (
                      format(dateRange.from, "MMM d, yyyy")
                    )
                  ) : (
                    "Select dates"
                  )}
                </p>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent
              mode="range"
              selected={{ from: dateRange.from, to: dateRange.to }}
              onSelect={(range) => setDateRange({ from: range?.from, to: range?.to })}
              numberOfMonths={2}
              disabled={{ before: new Date() }}
              className="rounded-xl"
            />
          </PopoverContent>
        </Popover>

        {/* Travelers */}
        <Popover open={isTravelersOpen} onOpenChange={setIsTravelersOpen}>
          <PopoverTrigger asChild>
            <button className="flex items-center gap-3 px-4 py-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors text-left group">
              <div className="p-2.5 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-muted-foreground mb-0.5">Travelers</p>
                <p className="text-sm font-semibold text-foreground">
                  {totalTravelers} {totalTravelers === 1 ? "traveler" : "travelers"}
                </p>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-72 p-4" align="start">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Adults</p>
                  <p className="text-xs text-muted-foreground">Ages 13+</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setTravelers((t) => ({ ...t, adults: Math.max(1, t.adults - 1) }))}
                    disabled={travelers.adults <= 1}
                    className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-6 text-center font-semibold">{travelers.adults}</span>
                  <button
                    onClick={() => setTravelers((t) => ({ ...t, adults: t.adults + 1 }))}
                    className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Children</p>
                  <p className="text-xs text-muted-foreground">Ages 2-12</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setTravelers((t) => ({ ...t, children: Math.max(0, t.children - 1) }))}
                    disabled={travelers.children <= 0}
                    className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-6 text-center font-semibold">{travelers.children}</span>
                  <button
                    onClick={() => setTravelers((t) => ({ ...t, children: t.children + 1 }))}
                    className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="flex items-center justify-center gap-2 bg-primary text-white rounded-xl py-4 font-semibold hover:bg-primary/90 active:scale-[0.98] transition-all shadow-lg shadow-primary/25"
        >
          <Search className="h-5 w-5" />
          <span>Search</span>
        </button>
      </div>
    </div>
  );
}
