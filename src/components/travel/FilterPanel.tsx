"use client";

import { useState } from "react";
import { X, SlidersHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface FilterPanelProps {
  filters: SearchFilters;
  onFilterChange: (filters: SearchFilters) => void;
  className?: string;
}

const categories: TripCategory[] = [
  "Adventure",
  "Beach",
  "Cultural",
  "Wildlife",
  "Romantic",
  "Family",
  "Luxury",
];

const difficulties = ["Easy", "Moderate", "Challenging"];

const priceRanges = [
  { label: "Under $1,000", min: 0, max: 1000 },
  { label: "$1,000 - $2,000", min: 1000, max: 2000 },
  { label: "$2,000 - $3,000", min: 2000, max: 3000 },
  { label: "Over $3,000", min: 3000, max: 100000 },
];

export function FilterPanel({ filters, onFilterChange, className }: FilterPanelProps) {
  const handleCategoryChange = (category: TripCategory, checked: boolean) => {
    const current = filters.categories || [];
    const updated = checked ? [...current, category] : current.filter((c) => c !== category);
    onFilterChange({ ...filters, categories: updated });
  };

  const handleDifficultyChange = (difficulty: string, checked: boolean) => {
    const current = filters.difficulty || [];
    const updated = checked ? [...current, difficulty] : current.filter((d) => d !== difficulty);
    onFilterChange({ ...filters, difficulty: updated });
  };

  const handlePriceChange = (min: number, max: number) => {
    if (filters.priceMin === min && filters.priceMax === max) {
      onFilterChange({ ...filters, priceMin: undefined, priceMax: undefined });
    } else {
      onFilterChange({ ...filters, priceMin: min, priceMax: max });
    }
  };

  return (
    <div className={cn("bg-card rounded-xl border border-border p-5", className)}>
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
          <span className="font-semibold text-foreground">Filters</span>
        </div>
        <button onClick={() => onFilterChange({})} className="text-sm text-primary hover:underline">
          Clear all
        </button>
      </div>

      {/* Categories */}
      <div className="py-4 border-b border-border">
        <h4 className="text-sm font-semibold text-foreground mb-3">Category</h4>
        <div className="space-y-2.5">
          {categories.map((category) => (
            <label key={category} className="flex items-center gap-2.5 cursor-pointer group">
              <Checkbox
                checked={filters.categories?.includes(category)}
                onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
              />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                {category}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="py-4 border-b border-border">
        <h4 className="text-sm font-semibold text-foreground mb-3">Price Range</h4>
        <div className="space-y-1.5">
          {priceRanges.map((range) => (
            <button
              key={range.label}
              onClick={() => handlePriceChange(range.min, range.max)}
              className={cn(
                "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                filters.priceMin === range.min && filters.priceMax === range.max
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Difficulty */}
      <div className="py-4">
        <h4 className="text-sm font-semibold text-foreground mb-3">Difficulty</h4>
        <div className="space-y-2.5">
          {difficulties.map((difficulty) => (
            <label key={difficulty} className="flex items-center gap-2.5 cursor-pointer group">
              <Checkbox
                checked={filters.difficulty?.includes(difficulty)}
                onCheckedChange={(checked) => handleDifficultyChange(difficulty, checked as boolean)}
              />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                {difficulty}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

// Mobile Filter Sheet
interface MobileFilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  filters: SearchFilters;
  onFilterChange: (filters: SearchFilters) => void;
}

export function MobileFilterSheet({ isOpen, onClose, filters, onFilterChange }: MobileFilterSheetProps) {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/50" onClick={onClose} />
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background rounded-t-2xl max-h-[85vh] overflow-y-auto">
        <div className="sticky top-0 bg-background border-b border-border p-4 flex items-center justify-between">
          <h2 className="font-semibold text-foreground">Filters</h2>
          <button onClick={onClose} className="p-1 hover:bg-secondary rounded-lg">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-4">
          <FilterPanel filters={filters} onFilterChange={onFilterChange} className="border-0 p-0 bg-transparent" />
        </div>
        <div className="sticky bottom-0 bg-background border-t border-border p-4">
          <button onClick={onClose} className="w-full btn-primary py-3">
            Show Results
          </button>
        </div>
      </div>
    </>
  );
}
