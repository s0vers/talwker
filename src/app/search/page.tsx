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
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-slate-900 pt-24 pb-8">
        <div className="container-travel">
          <h1 className="text-2xl font-semibold text-white">Find Your Trip</h1>
          <div className="mt-4 max-w-2xl">
            <SearchBar
              variant="compact"
              onSearch={(f) => setFilters({ ...filters, ...f })}
            />
          </div>
        </div>
      </div>

      <div className="container-travel py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <FilterPanel
              filters={filters}
              onFilterChange={setFilters}
              className="sticky top-24"
            />
          </aside>

          {/* Main */}
          <main className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-600">
                  {filteredTrips.length} trips found
                </span>
                <button
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="lg:hidden flex items-center gap-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 px-3 py-1.5 rounded-lg"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                  {activeFilterCount > 0 && (
                    <span className="bg-primary text-white text-xs px-1.5 rounded">
                      {activeFilterCount}
                    </span>
                  )}
                </button>
              </div>

              <div className="flex items-center gap-2">
                <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                  <SelectTrigger className="w-40 h-9 text-sm">
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

                <div className="hidden sm:flex border border-slate-200 rounded-lg p-0.5 bg-white">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={cn(
                      "p-1.5 rounded",
                      viewMode === "grid" ? "bg-slate-100" : ""
                    )}
                  >
                    <Grid className="h-4 w-4 text-slate-600" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={cn(
                      "p-1.5 rounded",
                      viewMode === "list" ? "bg-slate-100" : ""
                    )}
                  >
                    <List className="h-4 w-4 text-slate-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filters */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {filters.categories?.map((cat) => (
                  <button
                    key={cat}
                    onClick={() =>
                      setFilters({
                        ...filters,
                        categories: filters.categories?.filter((c) => c !== cat),
                      })
                    }
                    className="flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-1 rounded"
                  >
                    {cat} <X className="h-3 w-3" />
                  </button>
                ))}
                {(filters.priceMin || filters.priceMax) && (
                  <button
                    onClick={() => setFilters({ ...filters, priceMin: undefined, priceMax: undefined })}
                    className="flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-1 rounded"
                  >
                    ${filters.priceMin || 0} - ${filters.priceMax || "∞"} <X className="h-3 w-3" />
                  </button>
                )}
              </div>
            )}

            {/* Results */}
            {filteredTrips.length > 0 ? (
              <div
                className={cn(
                  "grid gap-5",
                  viewMode === "grid" ? "sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
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
              <div className="text-center py-16">
                <p className="text-slate-500">No trips match your criteria.</p>
                <button
                  onClick={() => setFilters({})}
                  className="mt-2 text-primary text-sm font-medium"
                >
                  Clear filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      <MobileFilterSheet
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        filters={filters}
        onFilterChange={setFilters}
      />
    </div>
  );
}
