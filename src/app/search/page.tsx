"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Grid,
  List,
  SlidersHorizontal,
  ChevronDown,
  MapPin,
  X,
} from "lucide-react";
import { TripCard } from "@/components/travel/TripCard";
import { FilterPanel, MobileFilterSheet } from "@/components/travel/FilterPanel";
import { SearchBar } from "@/components/travel/SearchBar";
import { Badge } from "@/components/ui/badge";
import { SkeletonTripCard } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { tripPackages, destinations } from "@/lib/data";

const sortOptions = [
  { value: "recommended", label: "Recommended" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "duration", label: "Duration" },
  { value: "popularity", label: "Most Popular" },
];

export default function SearchPage() {
  const [filters, setFilters] = useState<SearchFilters>({});
  const [sortBy, setSortBy] = useState<SortOption>("recommended");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Filter and sort trips
  const filteredTrips = useMemo(() => {
    let result = [...tripPackages];

    // Filter by destination
    if (filters.destination) {
      const searchTerm = filters.destination.toLowerCase();
      result = result.filter(
        (trip) =>
          trip.destination.name.toLowerCase().includes(searchTerm) ||
          trip.destination.country.toLowerCase().includes(searchTerm) ||
          trip.title.toLowerCase().includes(searchTerm)
      );
    }

    // Filter by price range
    if (filters.priceMin !== undefined) {
      result = result.filter((trip) => trip.price.amount >= filters.priceMin!);
    }
    if (filters.priceMax !== undefined) {
      result = result.filter((trip) => trip.price.amount <= filters.priceMax!);
    }

    // Filter by categories
    if (filters.categories && filters.categories.length > 0) {
      result = result.filter((trip) =>
        filters.categories!.includes(trip.category)
      );
    }

    // Filter by difficulty
    if (filters.difficulty && filters.difficulty.length > 0) {
      result = result.filter((trip) =>
        filters.difficulty!.includes(trip.difficulty)
      );
    }

    // Filter by duration
    if (filters.duration) {
      result = result.filter(
        (trip) =>
          trip.duration.days >= filters.duration!.min &&
          trip.duration.days <= filters.duration!.max
      );
    }

    // Filter by rating
    if (filters.rating) {
      result = result.filter((trip) => trip.rating >= filters.rating!);
    }

    // Sort results
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price.amount - b.price.amount);
        break;
      case "price-high":
        result.sort((a, b) => b.price.amount - a.price.amount);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "duration":
        result.sort((a, b) => a.duration.days - b.duration.days);
        break;
      case "popularity":
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        // Recommended - featured first, then by rating
        result.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return b.rating - a.rating;
        });
    }

    return result;
  }, [filters, sortBy]);

  const handleSearch = (searchFilters: SearchFilters) => {
    setFilters((prev) => ({ ...prev, ...searchFilters }));
  };

  const handleClearFilter = (key: keyof SearchFilters) => {
    setFilters((prev) => {
      const newFilters = { ...prev };
      delete newFilters[key];
      return newFilters;
    });
  };

  const activeFilterCount =
    (filters.categories?.length || 0) +
    (filters.difficulty?.length || 0) +
    (filters.duration ? 1 : 0) +
    (filters.rating ? 1 : 0) +
    (filters.priceMin || filters.priceMax ? 1 : 0);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pb-32 pt-28">
        <div className="container-travel">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              Discover Your Perfect Trip
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400">
              Browse hundreds of curated travel experiences across the globe
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-8"
          >
            <SearchBar variant="inline" onSearch={handleSearch} />
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-travel -mt-20">
        <div className="flex gap-8">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden w-72 flex-shrink-0 lg:block">
            <FilterPanel
              filters={filters}
              onFilterChange={setFilters}
              className="sticky top-24"
            />
          </aside>

          {/* Results Area */}
          <main className="flex-1">
            {/* Results Header */}
            <div className="mb-6 flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-card sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <p className="text-slate-600">
                  <span className="font-semibold text-slate-900">
                    {filteredTrips.length}
                  </span>{" "}
                  trips found
                </p>

                {/* Mobile filter button */}
                <button
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium lg:hidden"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                  {activeFilterCount > 0 && (
                    <Badge variant="default" size="sm">
                      {activeFilterCount}
                    </Badge>
                  )}
                </button>
              </div>

              <div className="flex items-center gap-3">
                {/* Sort */}
                <Select
                  value={sortBy}
                  onValueChange={(value) => setSortBy(value as SortOption)}
                >
                  <SelectTrigger className="w-[180px] border-slate-200">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* View mode toggle */}
                <div className="hidden rounded-xl border bg-white p-1 md:flex">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={cn(
                      "rounded-lg p-2 transition-colors",
                      viewMode === "grid"
                        ? "bg-primary text-white"
                        : "text-slate-400 hover:text-slate-600"
                    )}
                    aria-label="Grid view"
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={cn(
                      "rounded-lg p-2 transition-colors",
                      viewMode === "list"
                        ? "bg-primary text-white"
                        : "text-slate-400 hover:text-slate-600"
                    )}
                    aria-label="List view"
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filters */}
            {activeFilterCount > 0 && (
              <div className="mb-6 flex flex-wrap items-center gap-2">
                <span className="text-sm text-slate-500">Active filters:</span>
                {filters.categories?.map((cat) => (
                  <button
                    key={cat}
                    onClick={() =>
                      setFilters((prev) => ({
                        ...prev,
                        categories: prev.categories?.filter((c) => c !== cat),
                      }))
                    }
                    className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
                  >
                    {cat}
                    <X className="h-3 w-3" />
                  </button>
                ))}
                {filters.difficulty?.map((diff) => (
                  <button
                    key={diff}
                    onClick={() =>
                      setFilters((prev) => ({
                        ...prev,
                        difficulty: prev.difficulty?.filter((d) => d !== diff),
                      }))
                    }
                    className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
                  >
                    {diff}
                    <X className="h-3 w-3" />
                  </button>
                ))}
                {(filters.priceMin || filters.priceMax) && (
                  <button
                    onClick={() => handleClearFilter("priceMin")}
                    className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
                  >
                    ${filters.priceMin || 0} - ${filters.priceMax || "10000+"}
                    <X className="h-3 w-3" />
                  </button>
                )}
                {filters.rating && (
                  <button
                    onClick={() => handleClearFilter("rating")}
                    className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
                  >
                    {filters.rating}+ stars
                    <X className="h-3 w-3" />
                  </button>
                )}
                <button
                  onClick={() => setFilters({})}
                  className="text-sm font-medium text-slate-500 hover:text-slate-700"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Results Grid/List */}
            {isLoading ? (
              <div
                className={cn(
                  "grid gap-6",
                  viewMode === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                    : "grid-cols-1"
                )}
              >
                {[...Array(6)].map((_, i) => (
                  <SkeletonTripCard key={i} />
                ))}
              </div>
            ) : filteredTrips.length > 0 ? (
              <div
                className={cn(
                  "grid gap-6",
                  viewMode === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                    : "grid-cols-1"
                )}
              >
                {filteredTrips.map((trip) => (
                  <TripCard
                    key={trip.id}
                    trip={trip}
                    variant={viewMode === "list" ? "horizontal" : "default"}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl bg-white p-12 text-center shadow-card">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                  <MapPin className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900">
                  No trips found
                </h3>
                <p className="mt-2 text-slate-600">
                  Try adjusting your filters or search criteria to find more options.
                </p>
                <button
                  onClick={() => setFilters({})}
                  className="mt-6 rounded-full bg-primary px-6 py-2.5 font-semibold text-white transition-all hover:bg-primary/90"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* Pagination (simplified) */}
            {filteredTrips.length > 0 && (
              <div className="mt-12 flex justify-center">
                <div className="flex items-center gap-2">
                  <button className="rounded-lg border bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">
                    Previous
                  </button>
                  {[1, 2, 3].map((page) => (
                    <button
                      key={page}
                      className={cn(
                        "rounded-lg px-4 py-2 text-sm font-medium",
                        page === 1
                          ? "bg-primary text-white"
                          : "bg-white text-slate-600 hover:bg-slate-50"
                      )}
                    >
                      {page}
                    </button>
                  ))}
                  <span className="text-slate-400">...</span>
                  <button className="rounded-lg border bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">
                    Next
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Sheet */}
      <MobileFilterSheet
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        filters={filters}
        onFilterChange={setFilters}
      />
    </div>
  );
}
