"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
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
          <h1 className="text-xl font-semibold">Article not found</h1>
          <Link href="/blog" className="text-primary text-sm mt-2 inline-block">Back to blog</Link>
        </div>
      </div>
    );
  }

  const related = blogPosts.filter((p) => p.id !== post.id && p.category === post.category).slice(0, 3);

  return (
    <article className="min-h-screen bg-white pt-20">
      {/* Hero */}
      <div className="relative h-[50vh] min-h-[400px]">
        <Image src={post.coverImage} alt={post.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-end">
          <div className="container-travel pb-10">
            <Link href="/blog" className="inline-flex items-center gap-1 text-sm text-white/80 hover:text-white mb-4">
              <ArrowLeft className="h-4 w-4" /> Back
            </Link>
            <span className="inline-block bg-primary text-white text-xs font-medium px-2 py-1 rounded mb-3">{post.category}</span>
            <h1 className="text-2xl md:text-4xl font-semibold text-white max-w-3xl">{post.title}</h1>
            <div className="mt-4 flex items-center gap-4">
              <Image src={post.author.avatar} alt={post.author.name} width={40} height={40} className="rounded-full" />
              <div>
                <p className="text-white font-medium">{post.author.name}</p>
                <div className="flex items-center gap-3 text-sm text-white/70">
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{format(new Date(post.publishedAt), "MMM d, yyyy")}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.readTime} min</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-travel py-12">
        <div className="max-w-2xl mx-auto prose prose-slate">
          <p className="lead text-lg text-slate-600">{post.excerpt}</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <h2>Getting Started</h2>
          <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
          <blockquote>&ldquo;Travel is the only thing you buy that makes you richer.&rdquo;</blockquote>
          <h2>Tips</h2>
          <ul>
            <li>Pack light and smart</li>
            <li>Research local customs</li>
            <li>Learn basic phrases</li>
            <li>Book in advance during peak season</li>
          </ul>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="section-padding bg-slate-50">
          <div className="container-travel">
            <h2 className="section-title mb-6">Related Articles</h2>
            <div className="grid gap-5 md:grid-cols-3">
              {related.map((p) => <BlogCard key={p.id} post={p} />)}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
