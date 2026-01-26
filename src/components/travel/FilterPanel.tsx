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
    const updated = checked
      ? [...current, category]
      : current.filter((c) => c !== category);
    onFilterChange({ ...filters, categories: updated });
  };

  const handleDifficultyChange = (difficulty: string, checked: boolean) => {
    const current = filters.difficulty || [];
    const updated = checked
      ? [...current, difficulty]
      : current.filter((d) => d !== difficulty);
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
    <div className={cn("bg-white rounded-xl border border-slate-100 p-5", className)}>
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-slate-500" />
          <span className="font-medium text-slate-900">Filters</span>
        </div>
        <button
          onClick={() => onFilterChange({})}
          className="text-sm text-slate-500 hover:text-primary"
        >
          Clear all
        </button>
      </div>

      {/* Categories */}
      <div className="py-4 border-b border-slate-100">
        <h4 className="text-sm font-medium text-slate-900 mb-3">Category</h4>
        <div className="space-y-2.5">
          {categories.map((category) => (
            <label key={category} className="flex items-center gap-2.5 cursor-pointer">
              <Checkbox
                checked={filters.categories?.includes(category)}
                onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
              />
              <span className="text-sm text-slate-600">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="py-4 border-b border-slate-100">
        <h4 className="text-sm font-medium text-slate-900 mb-3">Price Range</h4>
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <button
              key={range.label}
              onClick={() => handlePriceChange(range.min, range.max)}
              className={cn(
                "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                filters.priceMin === range.min && filters.priceMax === range.max
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-slate-600 hover:bg-slate-50"
              )}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Difficulty */}
      <div className="py-4">
        <h4 className="text-sm font-medium text-slate-900 mb-3">Difficulty</h4>
        <div className="space-y-2.5">
          {difficulties.map((difficulty) => (
            <label key={difficulty} className="flex items-center gap-2.5 cursor-pointer">
              <Checkbox
                checked={filters.difficulty?.includes(difficulty)}
                onCheckedChange={(checked) => handleDifficultyChange(difficulty, checked as boolean)}
              />
              <span className="text-sm text-slate-600">{difficulty}</span>
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

export function MobileFilterSheet({
  isOpen,
  onClose,
  filters,
  onFilterChange,
}: MobileFilterSheetProps) {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/50" onClick={onClose} />
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl max-h-[85vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-slate-100 p-4 flex items-center justify-between">
          <h2 className="font-semibold">Filters</h2>
          <button onClick={onClose} className="p-1">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-4">
          <FilterPanel filters={filters} onFilterChange={onFilterChange} className="border-0 p-0" />
        </div>
        <div className="sticky bottom-0 bg-white border-t border-slate-100 p-4">
          <button onClick={onClose} className="w-full bg-primary text-white py-3 rounded-lg font-medium">
            Show Results
          </button>
        </div>
      </div>
    </>
  );
}
