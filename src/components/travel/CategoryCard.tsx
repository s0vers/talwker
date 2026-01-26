"use client";

import Link from "next/link";
import {
  Palmtree,
  Mountain,
  Building2,
  Waves,
  TreeDeciduous,
  Heart,
  Users,
  Compass,
  Ship,
  Camera,
  Tent,
  Plane,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface CategoryCardProps {
  category: {
    name: string;
    slug: string;
    count?: number;
    color?: string;
  };
  variant?: "default" | "icon" | "featured";
  className?: string;
}

const categoryIcons: Record<string, React.ElementType> = {
  Beach: Palmtree,
  Adventure: Mountain,
  "City Break": Building2,
  Cruise: Ship,
  Wildlife: TreeDeciduous,
  Romantic: Heart,
  Family: Users,
  Cultural: Camera,
  Safari: Compass,
  Hiking: Tent,
  Luxury: Plane,
  default: Waves,
};

const categoryColors: Record<string, string> = {
  Beach: "from-cyan-500 to-blue-500",
  Adventure: "from-orange-500 to-red-500",
  "City Break": "from-violet-500 to-purple-500",
  Cruise: "from-blue-500 to-indigo-500",
  Wildlife: "from-green-500 to-emerald-500",
  Romantic: "from-pink-500 to-rose-500",
  Family: "from-amber-500 to-orange-500",
  Cultural: "from-teal-500 to-cyan-500",
  Safari: "from-yellow-500 to-amber-500",
  Hiking: "from-lime-500 to-green-500",
  Luxury: "from-slate-700 to-slate-900",
  default: "from-gray-500 to-gray-700",
};

export function CategoryCard({
  category,
  variant = "default",
  className,
}: CategoryCardProps) {
  const Icon = categoryIcons[category.name] || categoryIcons.default;
  const gradient = category.color || categoryColors[category.name] || categoryColors.default;

  if (variant === "icon") {
    return (
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Link
          href={`/search?category=${category.slug}`}
          className={cn(
            "group flex flex-col items-center gap-3 rounded-2xl bg-white p-6 shadow-card transition-all hover:shadow-card-hover",
            className
          )}
        >
          <div
            className={cn(
              "flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br text-white transition-transform group-hover:scale-110",
              gradient
            )}
          >
            <Icon className="h-8 w-8" />
          </div>
          <div className="text-center">
            <h3 className="font-semibold text-slate-900">{category.name}</h3>
            {category.count !== undefined && (
              <p className="text-sm text-slate-500">{category.count} trips</p>
            )}
          </div>
        </Link>
      </motion.div>
    );
  }

  if (variant === "featured") {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Link
          href={`/search?category=${category.slug}`}
          className={cn(
            "group relative block overflow-hidden rounded-3xl",
            className
          )}
        >
          <div
            className={cn(
              "flex aspect-[4/3] flex-col items-center justify-center gap-4 bg-gradient-to-br p-8 text-white transition-all",
              gradient
            )}
          >
            <Icon className="h-16 w-16 transition-transform group-hover:scale-110" />
            <div className="text-center">
              <h3 className="text-2xl font-bold">{category.name}</h3>
              {category.count !== undefined && (
                <p className="mt-1 text-white/80">{category.count} trips available</p>
              )}
            </div>
            <span className="absolute bottom-6 rounded-full bg-white/20 px-6 py-2 text-sm font-semibold backdrop-blur-sm transition-all group-hover:bg-white group-hover:text-slate-900">
              Explore
            </span>
          </div>
        </Link>
      </motion.div>
    );
  }

  // Default variant
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Link
        href={`/search?category=${category.slug}`}
        className={cn(
          "group flex items-center gap-4 rounded-2xl bg-white p-4 shadow-card transition-all hover:shadow-card-hover",
          className
        )}
      >
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white",
            gradient
          )}
        >
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-slate-900 group-hover:text-primary transition-colors">
            {category.name}
          </h3>
          {category.count !== undefined && (
            <p className="text-sm text-slate-500">{category.count} trips</p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}

// Categories Grid Component
interface CategoriesGridProps {
  categories: {
    name: string;
    slug: string;
    count?: number;
  }[];
  variant?: "default" | "icon" | "featured";
  className?: string;
}

export function CategoriesGrid({
  categories,
  variant = "icon",
  className,
}: CategoriesGridProps) {
  return (
    <div
      className={cn(
        "grid gap-4",
        variant === "icon"
          ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
          : variant === "featured"
          ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
        className
      )}
    >
      {categories.map((category, index) => (
        <motion.div
          key={category.slug}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
        >
          <CategoryCard category={category} variant={variant} />
        </motion.div>
      ))}
    </div>
  );
}
