"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Header } from "@/components/header";
import { AmbientBg } from "@/components/ambient-bg";
import { Calendar, ArrowRight, Clock } from "lucide-react";

const posts = [
  {
    title: "How Digital Scouting Is Changing Austrian Football",
    excerpt:
      "The traditional scouting model is evolving. Learn how clubs across Austria are leveraging digital platforms to discover talent faster.",
    date: "Feb 2026",
    readTime: "5 min read",
    category: "Industry",
    slug: "#",
  },
  {
    title: "5 Tips to Build a Standout Player Profile",
    excerpt:
      "Your profile is your digital CV. Here's how to make it shine and attract the attention of scouts and clubs.",
    date: "Jan 2026",
    readTime: "4 min read",
    category: "Tips",
    slug: "#",
  },
  {
    title: "KBs Network Partners with Austrian Bundesliga Clubs",
    excerpt:
      "We're thrilled to announce official partnerships with top-tier clubs to bring more opportunities to our network.",
    date: "Dec 2025",
    readTime: "3 min read",
    category: "News",
    slug: "#",
  },
  {
    title: "The Rise of Academy Football in Austria",
    excerpt:
      "Austrian academies are producing world-class talent. We explore the systems behind the success.",
    date: "Nov 2025",
    readTime: "6 min read",
    category: "Feature",
    slug: "#",
  },
  {
    title: "Why Coaches Need a Professional Online Presence",
    excerpt:
      "In a competitive market, coaches who build their digital brand have a significant edge. Here's why.",
    date: "Oct 2025",
    readTime: "4 min read",
    category: "Tips",
    slug: "#",
  },
  {
    title: "Platform Update: New Search Filters & Saved Searches",
    excerpt:
      "We've rolled out powerful new ways to find exactly the talent or opportunity you're looking for.",
    date: "Sep 2025",
    readTime: "2 min read",
    category: "Product",
    slug: "#",
  },
];

const categoryColors: Record<string, string> = {
  Industry: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Tips: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  News: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Feature: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  Product: "bg-teal-500/10 text-teal-400 border-teal-500/20",
};

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="relative min-h-screen overflow-hidden">
        <AmbientBg orbs grid gradient />

        <div className="relative z-10 mx-auto max-w-5xl px-4 py-20 sm:py-28">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1] as const,
            }}
          >
            <h1 className="text-4xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-5xl">
              Blog
            </h1>
            <p className="mt-4 text-lg text-[var(--foreground-muted)] max-w-xl mx-auto">
              Insights, tips, and stories from the football network.
            </p>
          </motion.div>

          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {posts.map((post) => (
              <motion.article key={post.title} variants={item}>
                <Link href={post.slug} className="block h-full">
                  <div className="glass-card p-6 h-full flex flex-col transition-all duration-300 hover:border-[var(--gold)]/25 hover:-translate-y-1">
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${categoryColors[post.category] || ""}`}
                      >
                        {post.category}
                      </span>
                    </div>
                    <h2 className="text-lg font-bold text-[var(--foreground)] mb-2 leading-snug">
                      {post.title}
                    </h2>
                    <p className="text-sm text-[var(--foreground-muted)] leading-relaxed flex-1">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-4 mt-5 pt-4 border-t border-[var(--surface-border)]">
                      <span className="flex items-center gap-1.5 text-xs text-[var(--foreground-subtle)]">
                        <Calendar className="h-3 w-3" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-[var(--foreground-subtle)]">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </span>
                      <ArrowRight className="h-3.5 w-3.5 text-[var(--gold)] ml-auto" />
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </main>
    </>
  );
}
