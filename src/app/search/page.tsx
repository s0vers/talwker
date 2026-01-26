"use client";

import { useState, useMemo } from "react";
import { Grid, List, SlidersHorizontal, X } from "lucide-react";
import { TripCard } from "@/components/travel/TripCard";
import { FilterPanel, MobileFilterSheet } from "@/components/travel/FilterPanel";
import { SearchBar } from "@/components/travel/SearchBar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { tripPackages } from "@/lib/data";

const sortOptions = [
  { value: "recommended", label: "Recommended" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
];

export default function SearchPage() {
  const [filters, setFilters] = useState<SearchFilters>({});
  const [sortBy, setSortBy] = useState<SortOption>("recommended");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const filteredTrips = useMemo(() => {
    let result = [...tripPackages];

    if (filters.destination) {
      const search = filters.destination.toLowerCase();
      result = result.filter(
        (t) =>
          t.destination.name.toLowerCase().includes(search) ||
          t.destination.country.toLowerCase().includes(search) ||
          t.title.toLowerCase().includes(search)
      );
    }

    if (filters.priceMin) {
      result = result.filter((t) => t.price.amount >= filters.priceMin!);
    }
    if (filters.priceMax) {
      result = result.filter((t) => t.price.amount <= filters.priceMax!);
    }

    if (filters.categories?.length) {
      result = result.filter((t) => filters.categories!.includes(t.category));
    }

    if (filters.difficulty?.length) {
      result = result.filter((t) => filters.difficulty!.includes(t.difficulty));
    }

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
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [filters, sortBy]);

  const activeFilterCount =
    (filters.categories?.length || 0) +
    (filters.difficulty?.length || 0) +
    (filters.priceMin || filters.priceMax ? 1 : 0);

  return (
    <div className="min-h-screen bg-secondary">
      {/* Header */}
      <div className="bg-gradient-to-b from-background to-secondary pt-24 pb-8 border-b border-border">
        <div className="container-main">
          <h1 className="heading-2">Find Your Perfect Trip</h1>
          <p className="mt-2 text-muted-foreground">Browse hundreds of curated experiences</p>
          <div className="mt-6 max-w-2xl">
            <SearchBar variant="compact" onSearch={(f) => setFilters({ ...filters, ...f })} />
          </div>
        </div>
      </div>

      <div className="container-main py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <FilterPanel
              filters={filters}
              onFilterChange={setFilters}
              className="sticky top-24"
            />
          </aside>

          {/* Main */}
          <main className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 p-4 bg-card rounded-xl border border-border">
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">{filteredTrips.length}</span> trips found
                </span>
                <button
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="lg:hidden flex items-center gap-2 text-sm font-medium bg-secondary px-3 py-1.5 rounded-lg"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                  {activeFilterCount > 0 && (
                    <span className="bg-primary text-white text-xs px-1.5 py-0.5 rounded">
                      {activeFilterCount}
                    </span>
                  )}
                </button>
              </div>

              <div className="flex items-center gap-2">
                <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                  <SelectTrigger className="w-44 h-9 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="hidden sm:flex border border-border rounded-lg p-1 bg-background">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={cn("p-1.5 rounded", viewMode === "grid" ? "bg-secondary" : "")}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={cn("p-1.5 rounded", viewMode === "list" ? "bg-secondary" : "")}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filters */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {filters.categories?.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilters({ ...filters, categories: filters.categories?.filter((c) => c !== cat) })}
                    className="flex items-center gap-1 text-sm bg-primary/10 text-primary px-3 py-1 rounded-full"
                  >
                    {cat} <X className="h-3 w-3" />
                  </button>
                ))}
                {(filters.priceMin || filters.priceMax) && (
                  <button
                    onClick={() => setFilters({ ...filters, priceMin: undefined, priceMax: undefined })}
                    className="flex items-center gap-1 text-sm bg-primary/10 text-primary px-3 py-1 rounded-full"
                  >
                    ${filters.priceMin || 0} - ${filters.priceMax || "∞"} <X className="h-3 w-3" />
                  </button>
                )}
                <button
                  onClick={() => setFilters({})}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Results */}
            {filteredTrips.length > 0 ? (
              <div className={cn("grid gap-6", viewMode === "grid" ? "sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1")}>
                {filteredTrips.map((trip) => (
                  <TripCard key={trip.id} trip={trip} variant={viewMode === "list" ? "horizontal" : "default"} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-card rounded-xl border border-border">
                <p className="text-muted-foreground">No trips match your criteria.</p>
                <button onClick={() => setFilters({})} className="mt-2 text-primary text-sm font-medium hover:underline">
                  Clear filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      <MobileFilterSheet isOpen={isMobileFilterOpen} onClose={() => setIsMobileFilterOpen(false)} filters={filters} onFilterChange={setFilters} />
    </div>
  );
}
