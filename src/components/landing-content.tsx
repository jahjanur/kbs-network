"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AmbientBg } from "@/components/ambient-bg";
import { AustriaMap } from "@/components/austria-map";
import { Button } from "@/components/ui/button";
import {
  Users,
  Trophy,
  Building2,
  Eye,
  UserPlus,
  Search,
  Handshake,
  Shield,
  Globe,
  Zap,
  Star,
  ArrowRight,
  ChevronRight,
  MapPin,
} from "lucide-react";

const roles = [
  {
    icon: Users,
    title: "Player",
    desc: "Build your profile, showcase your talent, and get discovered by clubs worldwide.",
    gradient: "from-emerald-500/20 to-teal-500/20",
    borderColor: "hover:border-emerald-500/30",
    iconColor: "text-emerald-400",
    href: "/register",
  },
  {
    icon: Trophy,
    title: "Coach",
    desc: "Connect with clubs and players looking for your expertise and leadership.",
    gradient: "from-blue-500/20 to-cyan-500/20",
    borderColor: "hover:border-blue-500/30",
    iconColor: "text-blue-400",
    href: "/register",
  },
  {
    icon: Building2,
    title: "Club",
    desc: "Find talent, post opportunities, and manage your recruitment pipeline.",
    gradient: "from-amber-500/20 to-yellow-500/20",
    borderColor: "hover:border-amber-500/30",
    iconColor: "text-amber-400",
    href: "/register",
  },
  {
    icon: Eye,
    title: "Scout",
    desc: "Discover emerging talent and connect players with the right opportunities.",
    gradient: "from-violet-500/20 to-purple-500/20",
    borderColor: "hover:border-violet-500/30",
    iconColor: "text-violet-400",
    href: "/register",
  },
];

const steps = [
  { icon: UserPlus, title: "Create your profile", desc: "Sign up and set your role — player, coach, club, or scout." },
  { icon: Search, title: "Browse & discover", desc: "Search by position, region, or experience to find your match." },
  { icon: Handshake, title: "Connect & grow", desc: "Chat, apply, and start building your football career." },
];

const trustItems = [
  { icon: Shield, label: "Verified profiles" },
  { icon: Globe, label: "50+ countries" },
  { icon: Zap, label: "Real-time matching" },
  { icon: Star, label: "5,000+ users" },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

export function LandingContent() {
  return (
    <main className="relative overflow-hidden">
      {/* ─── Hero ─── */}
      <section className="relative min-h-[90vh] flex items-center justify-center">
        <AmbientBg orbs grid gradient />

        <div className="relative z-10 mx-auto max-w-5xl px-4 py-24 text-center sm:py-32">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/20 bg-[var(--gold)]/5 px-4 py-1.5 text-sm font-medium text-[var(--gold)] mb-8">
              <Zap className="h-3.5 w-3.5" />
              The network built for football
            </span>
          </motion.div>

          <motion.h1
            className="mt-6 text-5xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-6xl md:text-7xl lg:text-[5rem] leading-[1.1]"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}
          >
            Where{" "}
            <span className="text-gradient-gold">Players</span>,{" "}
            <span className="text-gradient-gold">Coaches</span> &{" "}
            <span className="text-gradient-gold">Clubs</span>{" "}
            Connect
          </motion.h1>

          <motion.p
            className="mx-auto mt-6 max-w-2xl text-lg text-[var(--foreground-muted)] sm:text-xl leading-relaxed"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            Get discovered, get matched, get hired — with a premium experience inspired by the best in sport.
          </motion.p>

          <motion.div
            className="mt-10 flex items-center justify-center gap-4 flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button variant="primary" size="xl" className="rounded-full px-10 shadow-lg shadow-[var(--gold-glow)]" asChild>
              <Link href="/register">
                Get started free
                <ArrowRight className="h-5 w-5 ml-1" />
              </Link>
            </Button>
            <Button variant="outline" size="xl" className="rounded-full px-10" asChild>
              <Link href="/discover">Browse talent</Link>
            </Button>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            className="mt-16 flex justify-center gap-8 sm:gap-16 flex-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            {[
              { value: "5,000+", label: "Players" },
              { value: "200+", label: "Clubs" },
              { value: "50+", label: "Countries" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-bold text-[var(--gold)] sm:text-3xl">{s.value}</div>
                <div className="text-sm text-[var(--foreground-muted)] mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Region Map ─── */}
      <section className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/20 bg-[var(--gold)]/5 px-3 py-1 text-xs font-medium text-[var(--gold)] mb-4">
              <MapPin className="h-3 w-3" />
              Region Filter
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
              Explore by region
            </h2>
            <p className="mt-4 text-[var(--foreground-muted)] text-lg max-w-2xl mx-auto">
              Click a province to discover players and clubs in your area
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <AustriaMap />
          </motion.div>
        </div>
      </section>

      {/* ─── Roles ─── */}
      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
              One platform, every role
            </h2>
            <p className="mt-4 text-[var(--foreground-muted)] text-lg max-w-2xl mx-auto">
              Whether you&apos;re a rising star or a seasoned scout — there&apos;s a place for you.
            </p>
          </motion.div>

          <motion.div
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            {roles.map((role) => {
              const Icon = role.icon;
              return (
                <motion.div key={role.title} variants={item}>
                  <Link href={role.href}>
                    <div
                      className={`glass-card group p-6 flex flex-col h-full bg-gradient-to-br ${role.gradient} ${role.borderColor}`}
                    >
                      <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--surface)] ${role.iconColor}`}>
                        <Icon className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
                      </div>
                      <h3 className="text-lg font-semibold text-[var(--foreground)]">{role.title}</h3>
                      <p className="mt-2 text-sm text-[var(--foreground-muted)] flex-1">{role.desc}</p>
                      <div className="mt-4 flex items-center text-sm font-medium text-[var(--gold)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Get started <ChevronRight className="h-4 w-4 ml-1" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        <AmbientBg orbs={false} grid={false} gradient />

        <div className="relative z-10 mx-auto max-w-4xl px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
              How it works
            </h2>
            <p className="mt-4 text-[var(--foreground-muted)] text-lg">
              Three simple steps to kickstart your journey
            </p>
          </motion.div>

          <motion.div
            className="grid gap-8 sm:grid-cols-3"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div key={step.title} variants={item} className="relative text-center">
                  {/* Step number */}
                  <div className="mx-auto mb-5 relative">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--gold)]/15 to-[var(--gold)]/5 border border-[var(--gold)]/20 mx-auto">
                      <Icon className="h-7 w-7 text-[var(--gold)]" />
                    </div>
                    <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-[var(--gold)] text-xs font-bold text-[#0a0e17]">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--foreground)]">{step.title}</h3>
                  <p className="mt-2 text-sm text-[var(--foreground-muted)]">{step.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ─── Trust ─── */}
      <section className="relative py-16">
        <div className="mx-auto max-w-4xl px-4">
          <motion.div
            className="glass-card rounded-2xl p-8 sm:p-10 flex flex-wrap items-center justify-center gap-8 sm:gap-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            {trustItems.map((t) => {
              const Icon = t.icon;
              return (
                <div key={t.label} className="flex items-center gap-3 text-sm text-[var(--foreground-muted)]">
                  <Icon className="h-5 w-5 text-[var(--gold)]" />
                  <span className="font-medium">{t.label}</span>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <motion.div
            className="relative glass-card rounded-3xl p-10 sm:p-16 overflow-hidden"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            {/* Accent glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--gold)]/5 via-transparent to-[var(--gold)]/5 rounded-3xl" />
            <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-[var(--gold)]/5 blur-3xl" />

            <div className="relative z-10">
              <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
                Ready to elevate your game?
              </h2>
              <p className="mt-4 text-[var(--foreground-muted)] text-lg max-w-xl mx-auto">
                Join thousands of football professionals building their careers on KB&apos;s Football Network.
              </p>
              <div className="mt-8">
                <Button variant="primary" size="xl" className="rounded-full px-12 shadow-lg shadow-[var(--gold-glow)]" asChild>
                  <Link href="/register">
                    Join now — it&apos;s free
                    <ArrowRight className="h-5 w-5 ml-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-[var(--surface-border)] py-10">
        <div className="mx-auto max-w-6xl px-4 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-sm text-[var(--foreground-subtle)]">
            © {new Date().getFullYear()} KB&apos;s Football Network. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-[var(--foreground-subtle)]">
            <Link href="/pricing" className="hover:text-[var(--foreground)] transition-colors">Pricing</Link>
            <Link href="/discover" className="hover:text-[var(--foreground)] transition-colors">Discover</Link>
            <Link href="/jobs" className="hover:text-[var(--foreground)] transition-colors">Jobs</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
