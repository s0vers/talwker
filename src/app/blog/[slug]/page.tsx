"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Link as LinkIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BlogCard } from "@/components/travel/BlogCard";
import { format } from "date-fns";
import { blogPosts } from "@/lib/data";

export default function BlogPostPage() {
  const params = useParams();
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Article not found</h1>
          <Link href="/blog" className="mt-4 inline-block text-primary">
            Back to blog
          </Link>
        </div>
      </div>
    );
  }

  const relatedPosts = blogPosts
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  return (
    <article className="min-h-screen bg-white pb-20">
      {/* Hero */}
      <div className="relative h-[60vh] min-h-[500px]">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

        <div className="absolute inset-0 flex items-end">
          <div className="container-travel pb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Link
                href="/blog"
                className="mb-6 inline-flex items-center gap-2 text-white/80 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to blog
              </Link>
              <Badge variant="glass" className="mb-4">
                {post.category}
              </Badge>
              <h1 className="max-w-4xl text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                {post.title}
              </h1>
              <div className="mt-6 flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-3">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-medium text-white">{post.author.name}</p>
                    <div className="flex items-center gap-4 text-sm text-white/60">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {format(new Date(post.publishedAt), "MMM d, yyyy")}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime} min read
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-travel py-12">
        <div className="mx-auto max-w-3xl">
          {/* Share buttons */}
          <div className="mb-8 flex items-center gap-4">
            <span className="text-sm font-medium text-slate-600">Share:</span>
            <div className="flex gap-2">
              {[Facebook, Twitter, Linkedin, LinkIcon].map((Icon, index) => (
                <button
                  key={index}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-all hover:bg-primary hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Article content - placeholder */}
          <div className="prose prose-lg max-w-none prose-headings:font-bold prose-a:text-primary">
            <p className="lead text-xl text-slate-600">{post.excerpt}</p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
              ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat.
            </p>

            <h2>Getting Started</h2>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.
            </p>

            <blockquote>
              &ldquo;Travel is the only thing you buy that makes you richer.&rdquo;
            </blockquote>

            <h2>What to Expect</h2>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo.
            </p>

            <ul>
              <li>Pack light and smart for your adventure</li>
              <li>Research local customs and traditions</li>
              <li>Learn a few phrases in the local language</li>
              <li>Book accommodations in advance during peak season</li>
            </ul>

            <h2>Final Thoughts</h2>
            <p>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
              aut fugit, sed quia consequuntur magni dolores eos qui ratione
              voluptatem sequi nesciunt.
            </p>
          </div>

          {/* Tags */}
          <div className="mt-8 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Author Bio */}
          <div className="mt-12 rounded-2xl bg-slate-50 p-6">
            <div className="flex items-start gap-4">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={64}
                height={64}
                className="rounded-full"
              />
              <div>
                <p className="font-semibold text-slate-900">{post.author.name}</p>
                <p className="mt-1 text-slate-600">{post.author.bio}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-slate-50 py-16">
          <div className="container-travel">
            <h2 className="text-2xl font-bold text-slate-900">Related Articles</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
