"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Header } from "@/components/header";
import { AmbientBg } from "@/components/ambient-bg";
import { Button } from "@/components/ui/button";
import { Target, Users, Globe, Shield, ArrowRight } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Mission-Driven",
    description:
      "We believe every talent deserves to be discovered, regardless of geography or connections.",
  },
  {
    icon: Users,
    title: "Community First",
    description:
      "Built by football people, for football people. We understand the industry from the inside.",
  },
  {
    icon: Globe,
    title: "Austrian Roots, Global Reach",
    description:
      "Starting with Austria's vibrant football ecosystem and expanding across Europe.",
  },
  {
    icon: Shield,
    title: "Trust & Transparency",
    description:
      "Verified profiles, honest data, and a platform where reputation is earned.",
  },
];

const milestones = [
  { year: "2024", event: "KBs Network founded in Vienna" },
  { year: "2024", event: "First 500 players onboarded" },
  { year: "2025", event: "Partnerships with Austrian Bundesliga clubs" },
  { year: "2025", event: "Launch of club & academy dashboards" },
  { year: "2026", event: "5,000+ active members across Austria" },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="relative min-h-screen overflow-hidden">
        <AmbientBg orbs grid gradient />

        <div className="relative z-10 mx-auto max-w-5xl px-4 py-20 sm:py-28">
          {/* Hero */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1] as const,
            }}
          >
            <h1 className="text-4xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-5xl lg:text-6xl">
              About KBs Network
            </h1>
            <p className="mt-5 text-lg text-[var(--foreground-muted)] max-w-2xl mx-auto leading-relaxed">
              We&apos;re building the professional network that football
              deserves — connecting players, coaches, clubs, and scouts across
              Austria and beyond.
            </p>
          </motion.div>

          {/* Story */}
          <motion.section
            className="mb-20"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="glass-card p-8 sm:p-10">
              <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">
                Our Story
              </h2>
              <div className="space-y-4 text-[var(--foreground-muted)] leading-relaxed">
                <p>
                  Football is the world&apos;s game, yet the industry behind it
                  remains fragmented. Talented players go unnoticed, clubs
                  struggle to find the right staff, and scouts rely on outdated
                  networks. We set out to change that.
                </p>
                <p>
                  KBs Network was born in Vienna with a simple idea: create a
                  modern, digital-first platform that brings the entire football
                  ecosystem together. From grassroots academies to professional
                  clubs, from aspiring players to experienced coaches — everyone
                  deserves a place to connect, grow, and succeed.
                </p>
                <p>
                  Today, we serve thousands of football professionals across
                  Austria, with partnerships spanning the Austrian Bundesliga and
                  regional leagues. And we&apos;re just getting started.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Values */}
          <motion.section
            className="mb-20"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.h2
              variants={item}
              className="text-2xl font-bold text-[var(--foreground)] text-center mb-10"
            >
              What We Stand For
            </motion.h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {values.map((v) => (
                <motion.div key={v.title} variants={item}>
                  <div className="glass-card p-7 h-full">
                    <div className="h-10 w-10 rounded-xl bg-[var(--gold)]/10 flex items-center justify-center mb-4">
                      <v.icon className="h-5 w-5 text-[var(--gold)]" />
                    </div>
                    <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">
                      {v.title}
                    </h3>
                    <p className="text-sm text-[var(--foreground-muted)] leading-relaxed">
                      {v.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Timeline */}
          <motion.section
            className="mb-20"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-[var(--foreground)] text-center mb-10">
              Our Journey
            </h2>
            <div className="glass-card p-8 sm:p-10">
              <div className="space-y-6">
                {milestones.map((m, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="shrink-0 w-14 text-sm font-bold text-[var(--gold)]">
                      {m.year}
                    </div>
                    <div className="flex-1 pb-6 border-b border-[var(--surface-border)] last:border-0 last:pb-0">
                      <p className="text-[var(--foreground)]">{m.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* CTA */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">
              Join the Network
            </h2>
            <p className="text-[var(--foreground-muted)] mb-8 max-w-md mx-auto">
              Whether you&apos;re a player, coach, club, or scout — your next
              opportunity starts here.
            </p>
            <Button variant="primary" size="lg" className="rounded-xl" asChild>
              <Link href="/register">
                Get Started <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </main>
    </>
  );
}
