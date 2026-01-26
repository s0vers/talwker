"use client";

import Link from "next/link";
import {
  Palmtree,
  Mountain,
  Building2,
  TreeDeciduous,
  Heart,
  Users,
  Ship,
  Camera,
} from "lucide-react";
import { cn } from "@/lib/utils";

const categoryIcons: Record<string, React.ElementType> = {
  Beach: Palmtree,
  Adventure: Mountain,
  "City Break": Building2,
  Cruise: Ship,
  Wildlife: TreeDeciduous,
  Romantic: Heart,
  Family: Users,
  Cultural: Camera,
  default: Mountain,
};

interface CategoryCardProps {
  category: {
    name: string;
    slug: string;
    count?: number;
  };
  className?: string;
}

export function CategoryCard({ category, className }: CategoryCardProps) {
  const Icon = categoryIcons[category.name] || categoryIcons.default;

  return (
    <Link
      href={`/search?category=${category.slug}`}
      className={cn(
        "flex flex-col items-center gap-2 p-4 rounded-xl bg-white border border-slate-100 hover:border-primary/30 hover:shadow-sm transition-all",
        className
      )}
    >
      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <span className="text-sm font-medium text-slate-900">{category.name}</span>
      {category.count !== undefined && (
        <span className="text-xs text-slate-500">{category.count} trips</span>
      )}
    </Link>
  );
}

interface CategoriesGridProps {
  categories: { name: string; slug: string; count?: number }[];
  className?: string;
}

export function CategoriesGrid({ categories, className }: CategoriesGridProps) {
  return (
    <div className={cn("grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3", className)}>
      {categories.map((category) => (
        <CategoryCard key={category.slug} category={category} />
      ))}
    </div>
  );
}
