"use client";

import { motion } from "framer-motion";
import {
  Zap,
  ShieldCheck,
  MessageCircle,
  Search,
  Network,
  Globe,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

/* ── Feature data ──────────────────────────────────────────── */

const features = [
  {
    title: "AI-Powered Matchmaking",
    description:
      "Our intelligent algorithm analyzes hundreds of data points to connect players with clubs that perfectly match their playstyle, ambition, and skill level — in seconds.",
    Icon: Zap,
    badge: "Most Popular",
    accent: "amber",
  },
  {
    title: "Verified Profiles",
    description:
      "Every profile is authenticated and reviewed. Clubs and players trust the data they see — no fake accounts, no misleading stats.",
    Icon: ShieldCheck,
    badge: null,
    accent: "emerald",
  },
  {
    title: "Direct Messaging",
    description:
      "No intermediaries. Professional, encrypted one-to-one communication between clubs, scouts, and players.",
    Icon: MessageCircle,
    badge: null,
    accent: "blue",
  },
  {
    title: "Targeted Scouting",
    description:
      "Filter by position, stats, age, region, and playstyle. Find the exact talent you need with precision tools built for scouts.",
    Icon: Search,
    badge: null,
    accent: "violet",
  },
  {
    title: "Community & Networking",
    description:
      "Connect with coaches, scouts, clubs, and players across Austria and beyond. Build your football career network.",
    Icon: Network,
    badge: null,
    accent: "cyan",
  },
];

const accentMap: Record<
  string,
  { text: string; bg: string; border: string; glow: string }
> = {
  amber: {
    text: "text-amber-500 dark:text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    glow: "group-hover:shadow-amber-500/10 dark:group-hover:shadow-amber-500/5",
  },
  emerald: {
    text: "text-emerald-500 dark:text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    glow: "group-hover:shadow-emerald-500/10 dark:group-hover:shadow-emerald-500/5",
  },
  blue: {
    text: "text-blue-500 dark:text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    glow: "group-hover:shadow-blue-500/10 dark:group-hover:shadow-blue-500/5",
  },
  violet: {
    text: "text-violet-500 dark:text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    glow: "group-hover:shadow-violet-500/10 dark:group-hover:shadow-violet-500/5",
  },
  cyan: {
    text: "text-cyan-500 dark:text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    glow: "group-hover:shadow-cyan-500/10 dark:group-hover:shadow-cyan-500/5",
  },
};

/* ── Component ─────────────────────────────────────────────── */

export function FeaturesSection() {
  return (
    <section className="relative py-28 sm:py-36 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 text-[var(--gold)] font-semibold text-xs tracking-[0.2em] uppercase mb-4">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-[var(--gold)]" />
            Features
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-[var(--gold)]" />
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-4xl lg:text-5xl">
            Built for the{" "}
            <span className="text-gradient-gold">modern game</span>
          </h2>
          <p className="mt-4 text-[var(--foreground-muted)] text-lg max-w-xl mx-auto leading-relaxed">
            Everything you need to succeed in one premium platform.
          </p>
        </motion.div>

        {/* Feature list — stacked horizontal cards */}
        <div className="space-y-4">
          {features.map((f, i) => {
            const { Icon } = f;
            const colors = accentMap[f.accent];
            return (
              <motion.div
                key={f.title}
                className={`group relative rounded-2xl border border-[var(--surface-border)] bg-[var(--card-bg)]/50 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:-translate-y-0.5 hover:shadow-2xl ${colors.glow}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="flex flex-col sm:flex-row items-start gap-5 sm:gap-7 p-6 sm:p-8 lg:p-10">
                  {/* Icon */}
                  <div
                    className={`shrink-0 flex h-14 w-14 items-center justify-center rounded-2xl ${colors.bg} border ${colors.border} transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon className={`h-6 w-6 ${colors.text}`} />
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="text-lg sm:text-xl font-bold text-[var(--foreground)] tracking-tight">
                        {f.title}
                      </h3>
                      {f.badge && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
                          <Sparkles className="h-2.5 w-2.5" />
                          {f.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-sm sm:text-[15px] text-[var(--foreground-muted)] leading-relaxed max-w-2xl">
                      {f.description}
                    </p>
                  </div>

                  {/* Arrow — appears on hover */}
                  <div className="shrink-0 hidden sm:flex items-center justify-center h-10 w-10 rounded-full border border-[var(--surface-border)] opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:border-[var(--foreground-subtle)]/30">
                    <ArrowUpRight className="h-4 w-4 text-[var(--foreground-subtle)] group-hover:text-[var(--foreground)] transition-colors" />
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* Global Opportunities — dashed border, "coming soon" feel */}
          <motion.div
            className="group relative rounded-2xl border border-dashed border-[var(--surface-border)] bg-[var(--card-bg)]/30 overflow-hidden transition-all duration-500 hover:border-rose-500/30 hover:border-solid"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex flex-col sm:flex-row items-start gap-5 sm:gap-7 p-6 sm:p-8 lg:p-10">
              <div className="shrink-0 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-500/10 border border-rose-500/20 transition-transform duration-300 group-hover:scale-110">
                <Globe className="h-6 w-6 text-rose-500 dark:text-rose-400" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h3 className="text-lg sm:text-xl font-bold text-[var(--foreground)] tracking-tight">
                    Global Opportunities
                  </h3>
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full border border-rose-400/30 text-rose-500 dark:text-rose-400 bg-rose-400/10">
                    Coming Soon
                  </span>
                </div>
                <p className="text-sm sm:text-[15px] text-[var(--foreground-muted)] leading-relaxed max-w-2xl">
                  Your talent has no borders. Access clubs, academies, and
                  leagues from all over the world — through a single platform
                  built for the next generation of football.
                </p>
              </div>

              <div className="shrink-0 hidden sm:flex items-center justify-center h-10 w-10 rounded-full border border-[var(--surface-border)] opacity-0 group-hover:opacity-100 transition-all duration-300">
                <ArrowUpRight className="h-4 w-4 text-[var(--foreground-subtle)]" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
