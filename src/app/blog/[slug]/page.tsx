"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Calendar, Clock, Facebook, Twitter, Linkedin, Link as LinkIcon } from "lucide-react";
import { BlogCard } from "@/components/travel/BlogCard";
import { format } from "date-fns";
import { blogPosts } from "@/lib/data";

export default function BlogPostPage() {
  const params = useParams();
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-foreground">Article not found</h1>
          <Link href="/blog" className="text-primary text-sm mt-2 inline-block hover:underline">
            Back to blog
          </Link>
        </div>
      </div>
    );
  }

  const related = blogPosts.filter((p) => p.id !== post.id && p.category === post.category).slice(0, 3);

  return (
    <article className="min-h-screen bg-background pt-20">
      {/* Hero */}
      <div className="relative h-[50vh] min-h-[400px]">
        <Image src={post.coverImage} alt={post.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="absolute inset-0 flex items-end">
          <div className="container-main pb-10">
            <Link href="/blog" className="inline-flex items-center gap-1 text-sm text-white/80 hover:text-white mb-4">
              <ArrowLeft className="h-4 w-4" /> Back to blog
            </Link>
            <span className="inline-block bg-primary text-white text-xs font-semibold px-3 py-1 rounded mb-3">
              {post.category}
            </span>
            <h1 className="text-2xl md:text-4xl font-bold text-white max-w-3xl">{post.title}</h1>
            <div className="mt-4 flex items-center gap-4">
              <div className="relative w-11 h-11 rounded-full overflow-hidden flex-shrink-0 border-2 border-white/20">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                  sizes="44px"
                />
              </div>
              <div>
                <p className="text-white font-medium">{post.author.name}</p>
                <div className="flex items-center gap-3 text-sm text-white/70">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {format(new Date(post.publishedAt), "MMM d, yyyy")}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {post.readTime} min read
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-main py-12">
        <div className="max-w-3xl mx-auto">
          {/* Share */}
          <div className="flex items-center gap-3 mb-8 pb-8 border-b border-border">
            <span className="text-sm text-muted-foreground">Share:</span>
            {[Facebook, Twitter, Linkedin, LinkIcon].map((Icon, i) => (
              <button
                key={i}
                className="p-2 rounded-lg bg-secondary hover:bg-primary hover:text-white transition-colors"
              >
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </div>

          {/* Article */}
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p className="text-lg text-muted-foreground leading-relaxed">{post.excerpt}</p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris.
            </p>

            <h2>Getting Started</h2>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
            </p>

            <blockquote>
              &ldquo;Travel is the only thing you buy that makes you richer.&rdquo;
            </blockquote>

            <h2>Essential Tips</h2>
            <ul>
              <li>Pack light and smart for your adventure</li>
              <li>Research local customs and traditions</li>
              <li>Learn basic phrases in the local language</li>
              <li>Book accommodations in advance during peak season</li>
            </ul>

            <h2>Final Thoughts</h2>
            <p>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
              consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
            </p>
          </div>

          {/* Tags */}
          <div className="mt-8 pt-8 border-t border-border flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="text-sm bg-secondary px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>

          {/* Author */}
          <div className="mt-8 p-6 rounded-xl bg-secondary">
            <div className="flex items-start gap-4">
              <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 bg-muted">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </div>
              <div>
                <p className="font-semibold text-foreground">{post.author.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{post.author.bio}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-16 bg-secondary border-t border-border">
          <div className="container-main">
            <h2 className="heading-3 mb-6">Related Articles</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {related.map((p) => (
                <BlogCard key={p.id} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
