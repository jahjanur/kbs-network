"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Megaphone,
  HandCoins,
  MessageSquare,
  ShieldCheck,
  ArrowRight,
  Building2,
  TrendingUp,
} from "lucide-react";

const mockDeals = [
  {
    brand: "SportTech Pro",
    initials: "SP",
    color: "#3b82f6",
    type: "Kit Sponsor",
    budget: "€250K - €500K",
    duration: "2 seasons",
    status: "3 clubs interested",
  },
  {
    brand: "EnergyDrink Co.",
    initials: "EC",
    color: "#10b981",
    type: "Stadium Naming",
    budget: "€1M - €2M",
    duration: "5 years",
    status: "7 clubs interested",
  },
  {
    brand: "FitGear Athletics",
    initials: "FG",
    color: "#f59e0b",
    type: "Training Wear",
    budget: "€100K - €200K",
    duration: "1 season",
    status: "12 clubs interested",
  },
];

const benefits = [
  {
    icon: HandCoins,
    title: "Post Sponsorship Deals",
    desc: "Brands set budgets, duration, and terms. Clubs browse and apply directly.",
  },
  {
    icon: Building2,
    title: "Club Applications",
    desc: "Clubs apply with their profile, stats, and fan reach. Compare offers side by side.",
  },
  {
    icon: MessageSquare,
    title: "Direct Negotiation",
    desc: "Communicate directly through the platform. No middlemen, no hidden fees.",
  },
  {
    icon: ShieldCheck,
    title: "Verified Partners",
    desc: "Both brands and clubs are verified. Every deal starts with trust.",
  },
];

export function SponsorshipSection() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 60%, rgba(244,63,94,0.04), transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 text-rose-500 dark:text-rose-400 font-semibold text-xs tracking-[0.2em] uppercase mb-4">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-rose-400" />
            Sponsorship Marketplace
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-rose-400" />
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl lg:text-5xl">
            Connect{" "}
            <span className="bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
              brands
            </span>{" "}
            with{" "}
            <span className="text-gradient-gold">clubs</span>
          </h2>
          <p className="mt-4 text-[var(--foreground-muted)] text-lg max-w-2xl mx-auto leading-relaxed">
            The first platform where brands can post sponsorship offers and football clubs can apply
            directly. No agents, no delays — just real deals.
          </p>
        </motion.div>

        {/* Two-column layout: benefits left, preview right */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left: benefits */}
          <motion.div
            className="space-y-5"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-bold text-[var(--foreground)] mb-6">
              How it works
            </h3>

            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div
                  key={b.title}
                  className="group flex items-start gap-4"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <div className="shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-rose-500/10 group-hover:bg-rose-500/15 transition-colors">
                    <Icon className="h-5 w-5 text-rose-500 dark:text-rose-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--foreground)] text-sm mb-1">
                      {b.title}
                    </h4>
                    <p className="text-sm text-[var(--foreground-muted)] leading-relaxed">
                      {b.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}

            <div className="pt-4">
              <Button
                variant="primary"
                size="lg"
                className="rounded-full px-8"
                asChild
              >
                <Link href="/register">
                  Become a Sponsor
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Right: mock deal cards preview */}
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-[var(--foreground-muted)] uppercase tracking-wider">
                Live Deals
              </h3>
              <div className="flex items-center gap-1.5 text-xs text-emerald-500">
                <TrendingUp className="h-3.5 w-3.5" />
                <span className="font-medium">12 active offers</span>
              </div>
            </div>

            {mockDeals.map((deal, i) => (
              <motion.div
                key={deal.brand}
                className="group glass-card !rounded-xl p-4 flex items-center gap-4 !transform-none"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
              >
                {/* Brand avatar */}
                <div
                  className="shrink-0 h-11 w-11 rounded-xl flex items-center justify-center text-white text-xs font-bold ring-2 ring-white/10"
                  style={{ backgroundColor: deal.color }}
                >
                  {deal.initials}
                </div>

                {/* Deal info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h4 className="font-semibold text-sm text-[var(--foreground)] truncate">
                      {deal.brand}
                    </h4>
                    <span className="shrink-0 text-[10px] font-medium px-2 py-0.5 rounded-md bg-[var(--surface-highlight)] text-[var(--foreground-muted)]">
                      {deal.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[var(--foreground-muted)]">
                    <span className="font-semibold text-[var(--gold)]">{deal.budget}</span>
                    <span className="text-[var(--foreground-subtle)]">{deal.duration}</span>
                  </div>
                </div>

                {/* Status */}
                <div className="shrink-0 text-right">
                  <span className="text-[11px] font-medium text-emerald-500 dark:text-emerald-400">
                    {deal.status}
                  </span>
                </div>
              </motion.div>
            ))}

            {/* CTA for clubs */}
            <div className="mt-4 rounded-xl border border-dashed border-[var(--gold)]/20 bg-[var(--gold)]/5 p-4 text-center">
              <p className="text-sm text-[var(--foreground-muted)] mb-2">
                Are you a club? Browse sponsorship offers and apply.
              </p>
              <Button variant="outline" size="sm" className="rounded-full" asChild>
                <Link href="/register">
                  <Building2 className="h-3.5 w-3.5 mr-1.5" />
                  Join as Club
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
