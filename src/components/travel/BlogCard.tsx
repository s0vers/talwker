"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { format } from "date-fns";

interface BlogCardProps {
  post: BlogPost;
  variant?: "default" | "featured" | "horizontal";
  className?: string;
}

export function BlogCard({ post, variant = "default", className }: BlogCardProps) {
  const formattedDate = format(new Date(post.publishedAt), "MMM d, yyyy");

  if (variant === "featured") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Link
          href={`/blog/${post.slug}`}
          className={cn(
            "group relative block overflow-hidden rounded-3xl",
            className
          )}
        >
          <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-105"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <Badge variant="glass" className="mb-4">
              {post.category}
            </Badge>
            <h2 className="text-2xl font-bold text-white md:text-4xl lg:text-5xl line-clamp-2">
              {post.title}
            </h2>
            <p className="mt-3 max-w-2xl text-white/80 line-clamp-2 md:text-lg">
              {post.excerpt}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-full">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium text-white">{post.author.name}</p>
                  <div className="flex items-center gap-3 text-sm text-white/60">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formattedDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime} min read
                    </span>
                  </div>
                </div>
              </div>

              <span className="hidden md:flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 font-semibold text-white backdrop-blur-sm transition-all group-hover:bg-white group-hover:text-slate-900">
                Read Article
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  if (variant === "horizontal") {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <Link
          href={`/blog/${post.slug}`}
          className={cn(
            "group flex flex-col md:flex-row gap-5 rounded-2xl bg-white p-4 shadow-card transition-all hover:shadow-card-hover",
            className
          )}
        >
          <div className="relative aspect-video md:aspect-square md:w-48 flex-shrink-0 overflow-hidden rounded-xl">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-all duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 200px"
            />
          </div>

          <div className="flex flex-1 flex-col justify-center">
            <Badge variant="outline" className="w-fit">
              {post.category}
            </Badge>
            <h3 className="mt-2 text-lg font-semibold text-slate-900 group-hover:text-primary transition-colors line-clamp-2">
              {post.title}
            </h3>
            <p className="mt-2 text-sm text-slate-600 line-clamp-2">
              {post.excerpt}
            </p>

            <div className="mt-4 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="relative h-8 w-8 overflow-hidden rounded-full">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-sm font-medium text-slate-700">
                  {post.author.name}
                </span>
              </div>
              <span className="text-sm text-slate-500">{formattedDate}</span>
              <span className="text-sm text-slate-500">
                {post.readTime} min
              </span>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  // Default variant
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Link
        href={`/blog/${post.slug}`}
        className={cn(
          "group block overflow-hidden rounded-2xl bg-white shadow-card transition-all duration-300 hover:-translate-y-2 hover:shadow-card-hover",
          className
        )}
      >
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover transition-all duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute left-3 top-3">
            <Badge variant="glass">{post.category}</Badge>
          </div>
        </div>

        <div className="p-5">
          <h3 className="text-lg font-semibold text-slate-900 group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="mt-2 text-sm text-slate-600 line-clamp-2">
            {post.excerpt}
          </p>

          <div className="mt-4 flex items-center justify-between border-t pt-4">
            <div className="flex items-center gap-3">
              <div className="relative h-8 w-8 overflow-hidden rounded-full">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-700">
                  {post.author.name}
                </p>
                <p className="text-xs text-slate-500">{formattedDate}</p>
              </div>
            </div>
            <span className="flex items-center gap-1 text-sm text-slate-500">
              <Clock className="h-4 w-4" />
              {post.readTime} min
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
