"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, X, SlidersHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

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
  "Budget",
  "Cruise",
  "Safari",
  "Hiking",
  "City Break",
];

const difficulties = ["Easy", "Moderate", "Challenging", "Difficult"];

const durations = [
  { label: "1-3 Days", min: 1, max: 3 },
  { label: "4-7 Days", min: 4, max: 7 },
  { label: "8-14 Days", min: 8, max: 14 },
  { label: "15+ Days", min: 15, max: 30 },
];

export function FilterPanel({
  filters,
  onFilterChange,
  className,
}: FilterPanelProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "price",
    "categories",
    "duration",
    "difficulty",
  ]);
  const [priceRange, setPriceRange] = useState([
    filters.priceMin || 0,
    filters.priceMax || 10000,
  ]);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const handleCategoryChange = (category: TripCategory, checked: boolean) => {
    const currentCategories = filters.categories || [];
    const newCategories = checked
      ? [...currentCategories, category]
      : currentCategories.filter((c) => c !== category);
    onFilterChange({ ...filters, categories: newCategories });
  };

  const handleDifficultyChange = (difficulty: string, checked: boolean) => {
    const currentDifficulties = filters.difficulty || [];
    const newDifficulties = checked
      ? [...currentDifficulties, difficulty]
      : currentDifficulties.filter((d) => d !== difficulty);
    onFilterChange({ ...filters, difficulty: newDifficulties });
  };

  const handleDurationChange = (duration: { min: number; max: number }) => {
    onFilterChange({ ...filters, duration });
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
    onFilterChange({ ...filters, priceMin: value[0], priceMax: value[1] });
  };

  const handleRatingChange = (rating: number) => {
    onFilterChange({ ...filters, rating });
  };

  const clearAllFilters = () => {
    setPriceRange([0, 10000]);
    onFilterChange({});
  };

  const activeFilterCount =
    (filters.categories?.length || 0) +
    (filters.difficulty?.length || 0) +
    (filters.duration ? 1 : 0) +
    (filters.rating ? 1 : 0) +
    (filters.priceMin || filters.priceMax ? 1 : 0);

  return (
    <div className={cn("rounded-2xl bg-white p-6 shadow-card", className)}>
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-5 w-5 text-slate-600" />
          <h3 className="text-lg font-semibold text-slate-900">Filters</h3>
          {activeFilterCount > 0 && (
            <Badge variant="secondary">{activeFilterCount}</Badge>
          )}
        </div>
        {activeFilterCount > 0 && (
          <button
            onClick={clearAllFilters}
            className="text-sm font-medium text-primary hover:underline"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Price Range */}
      <div className="border-b py-4">
        <button
          onClick={() => toggleSection("price")}
          className="flex w-full items-center justify-between"
        >
          <h4 className="font-semibold text-slate-900">Price Range</h4>
          {expandedSections.includes("price") ? (
            <ChevronUp className="h-5 w-5 text-slate-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-slate-400" />
          )}
        </button>
        <AnimatePresence>
          {expandedSections.includes("price") && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="mt-4 space-y-4">
                <Slider
                  value={priceRange}
                  onValueChange={handlePriceChange}
                  min={0}
                  max={10000}
                  step={100}
                  className="w-full"
                />
                <div className="flex items-center justify-between text-sm">
                  <span className="rounded-lg bg-slate-100 px-3 py-1 font-medium">
                    ${priceRange[0]}
                  </span>
                  <span className="text-slate-400">to</span>
                  <span className="rounded-lg bg-slate-100 px-3 py-1 font-medium">
                    ${priceRange[1]}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Categories */}
      <div className="border-b py-4">
        <button
          onClick={() => toggleSection("categories")}
          className="flex w-full items-center justify-between"
        >
          <h4 className="font-semibold text-slate-900">Categories</h4>
          {expandedSections.includes("categories") ? (
            <ChevronUp className="h-5 w-5 text-slate-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-slate-400" />
          )}
        </button>
        <AnimatePresence>
          {expandedSections.includes("categories") && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="mt-4 space-y-3">
                {categories.map((category) => (
                  <label
                    key={category}
                    className="flex cursor-pointer items-center gap-3"
                  >
                    <Checkbox
                      checked={filters.categories?.includes(category)}
                      onCheckedChange={(checked) =>
                        handleCategoryChange(category, checked as boolean)
                      }
                    />
                    <span className="text-sm text-slate-700">{category}</span>
                  </label>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Duration */}
      <div className="border-b py-4">
        <button
          onClick={() => toggleSection("duration")}
          className="flex w-full items-center justify-between"
        >
          <h4 className="font-semibold text-slate-900">Duration</h4>
          {expandedSections.includes("duration") ? (
            <ChevronUp className="h-5 w-5 text-slate-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-slate-400" />
          )}
        </button>
        <AnimatePresence>
          {expandedSections.includes("duration") && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="mt-4 flex flex-wrap gap-2">
                {durations.map((duration) => {
                  const isActive =
                    filters.duration?.min === duration.min &&
                    filters.duration?.max === duration.max;
                  return (
                    <button
                      key={duration.label}
                      onClick={() =>
                        handleDurationChange(
                          isActive ? { min: 0, max: 100 } : duration
                        )
                      }
                      className={cn(
                        "rounded-full px-4 py-2 text-sm font-medium transition-all",
                        isActive
                          ? "bg-primary text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      )}
                    >
                      {duration.label}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Difficulty */}
      <div className="border-b py-4">
        <button
          onClick={() => toggleSection("difficulty")}
          className="flex w-full items-center justify-between"
        >
          <h4 className="font-semibold text-slate-900">Difficulty</h4>
          {expandedSections.includes("difficulty") ? (
            <ChevronUp className="h-5 w-5 text-slate-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-slate-400" />
          )}
        </button>
        <AnimatePresence>
          {expandedSections.includes("difficulty") && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="mt-4 space-y-3">
                {difficulties.map((difficulty) => (
                  <label
                    key={difficulty}
                    className="flex cursor-pointer items-center gap-3"
                  >
                    <Checkbox
                      checked={filters.difficulty?.includes(difficulty)}
                      onCheckedChange={(checked) =>
                        handleDifficultyChange(difficulty, checked as boolean)
                      }
                    />
                    <span className="text-sm text-slate-700">{difficulty}</span>
                  </label>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Rating */}
      <div className="py-4">
        <button
          onClick={() => toggleSection("rating")}
          className="flex w-full items-center justify-between"
        >
          <h4 className="font-semibold text-slate-900">Rating</h4>
          {expandedSections.includes("rating") ? (
            <ChevronUp className="h-5 w-5 text-slate-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-slate-400" />
          )}
        </button>
        <AnimatePresence>
          {expandedSections.includes("rating") && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="mt-4 flex flex-wrap gap-2">
                {[5, 4, 3, 2].map((rating) => (
                  <button
                    key={rating}
                    onClick={() =>
                      handleRatingChange(filters.rating === rating ? 0 : rating)
                    }
                    className={cn(
                      "flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-all",
                      filters.rating === rating
                        ? "bg-primary text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    )}
                  >
                    {rating}+ ★
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed bottom-0 right-0 top-0 z-50 w-full max-w-sm overflow-y-auto bg-white"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white p-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button
                onClick={onClose}
                className="rounded-full p-2 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4">
              <FilterPanel
                filters={filters}
                onFilterChange={onFilterChange}
                className="shadow-none"
              />
            </div>
            <div className="sticky bottom-0 border-t bg-white p-4">
              <button
                onClick={onClose}
                className="btn-primary w-full"
              >
                Show Results
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
