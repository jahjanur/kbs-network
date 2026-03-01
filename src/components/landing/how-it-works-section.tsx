"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserPlus, Search, Handshake, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Create your profile",
    subtitle: "Takes less than a minute",
    description:
      "Sign up and choose your role — player, coach, club, or scout. Add your experience, skills, and preferences to build a profile that stands out.",
    details: [
      "Choose from 5 roles tailored to your position in football",
      "Add stats, experience, certifications, and media",
      "Set your visibility and contact preferences",
    ],
    accent: "emerald" as const,
    cta: { label: "Create Account", href: "/register" },
  },
  {
    number: "02",
    icon: Search,
    title: "Browse & discover",
    subtitle: "Smart filters, instant results",
    description:
      "Search by position, region, skill level, or experience. Our intelligent filters surface the most relevant matches so you find exactly what you need.",
    details: [
      "Filter by position, age, region, and playstyle",
      "AI-powered recommendations based on your profile",
      "Save searches and get notified of new matches",
    ],
    accent: "blue" as const,
    cta: { label: "Explore Talent", href: "/discover" },
  },
  {
    number: "03",
    icon: Handshake,
    title: "Connect & grow",
    subtitle: "Direct communication, real results",
    description:
      "Reach out directly, apply to opportunities, and start building your professional football network. No intermediaries, no barriers.",
    details: [
      "Send messages directly to clubs, scouts, or players",
      "Apply to job postings with one click",
      "Build a network that accelerates your career",
    ],
    accent: "gold" as const,
    cta: { label: "Get Started", href: "/register" },
  },
];

const accentConfig = {
  emerald: {
    text: "text-emerald-500 dark:text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/25",
    activeBorder: "border-emerald-500/50",
    ring: "ring-emerald-500/20",
    dot: "bg-emerald-500",
    line: "from-emerald-500/50",
    glow: "shadow-emerald-500/10 dark:shadow-emerald-500/5",
  },
  blue: {
    text: "text-blue-500 dark:text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/25",
    activeBorder: "border-blue-500/50",
    ring: "ring-blue-500/20",
    dot: "bg-blue-500",
    line: "from-blue-500/50",
    glow: "shadow-blue-500/10 dark:shadow-blue-500/5",
  },
  gold: {
    text: "text-[var(--gold)]",
    bg: "bg-[var(--gold)]/10",
    border: "border-[var(--gold)]/25",
    activeBorder: "border-[var(--gold)]/50",
    ring: "ring-[var(--gold)]/20",
    dot: "bg-[var(--gold)]",
    line: "from-[var(--gold)]/50",
    glow: "shadow-[var(--gold-glow)]",
  },
};

export function HowItWorksSection() {
  const [active, setActive] = useState(0);

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
            How it works
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-[var(--gold)]" />
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-4xl lg:text-5xl">
            Three steps to{" "}
            <span className="text-gradient-gold">get started</span>
          </h2>
          <p className="mt-4 text-[var(--foreground-muted)] text-lg max-w-lg mx-auto leading-relaxed">
            From sign-up to your first connection — it only takes minutes.
          </p>
        </motion.div>

        {/* Interactive steps */}
        <motion.div
          className="grid lg:grid-cols-[280px_1fr] gap-6 lg:gap-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
        >
          {/* Left — Step selector tabs */}
          <div className="flex lg:flex-col gap-2">
            {steps.map((step, i) => {
              const isActive = active === i;
              const colors = accentConfig[step.accent];
              const Icon = step.icon;

              return (
                <button
                  key={step.number}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`group relative flex-1 lg:flex-none flex items-center gap-4 rounded-xl px-4 py-4 lg:py-5 text-left transition-all duration-300 border ${
                    isActive
                      ? `${colors.activeBorder} bg-[var(--card-bg)]/80 shadow-lg ${colors.glow}`
                      : "border-transparent hover:border-[var(--surface-border)] hover:bg-[var(--card-bg)]/40"
                  }`}
                >
                  {/* Active indicator line (left side on desktop) */}
                  {isActive && (
                    <motion.div
                      className={`hidden lg:block absolute left-0 top-3 bottom-3 w-[3px] rounded-full bg-gradient-to-b ${colors.line} to-transparent`}
                      layoutId="step-indicator"
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}

                  {/* Icon */}
                  <div
                    className={`shrink-0 flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-300 ${
                      isActive
                        ? `${colors.bg} ${colors.border} border`
                        : "bg-[var(--surface-highlight)]"
                    }`}
                  >
                    <Icon
                      className={`h-5 w-5 transition-colors duration-300 ${
                        isActive
                          ? colors.text
                          : "text-[var(--foreground-subtle)]"
                      }`}
                    />
                  </div>

                  {/* Label */}
                  <div className="hidden sm:block min-w-0">
                    <div
                      className={`text-[11px] font-semibold uppercase tracking-wider mb-0.5 transition-colors duration-300 ${
                        isActive
                          ? colors.text
                          : "text-[var(--foreground-subtle)]"
                      }`}
                    >
                      Step {step.number}
                    </div>
                    <div
                      className={`text-sm font-bold truncate transition-colors duration-300 ${
                        isActive
                          ? "text-[var(--foreground)]"
                          : "text-[var(--foreground-muted)]"
                      }`}
                    >
                      {step.title}
                    </div>
                  </div>

                  {/* Bottom active indicator (mobile) */}
                  {isActive && (
                    <motion.div
                      className={`lg:hidden absolute bottom-0 left-3 right-3 h-[3px] rounded-full bg-gradient-to-r ${colors.line} to-transparent`}
                      layoutId="step-indicator-mobile"
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right — Active step content */}
          <div className="relative min-h-[320px] sm:min-h-[280px]">
            <AnimatePresence mode="wait">
              {steps.map((step, i) => {
                if (i !== active) return null;
                const colors = accentConfig[step.accent];

                return (
                  <motion.div
                    key={step.number}
                    className={`rounded-2xl border ${colors.border} bg-[var(--card-bg)]/50 backdrop-blur-sm overflow-hidden h-full`}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{
                      duration: 0.3,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <div className="p-7 sm:p-10 h-full flex flex-col">
                      {/* Top row */}
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <span
                            className={`text-[11px] font-bold uppercase tracking-widest ${colors.text}`}
                          >
                            Step {step.number}
                          </span>
                          <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--foreground)] tracking-tight mt-1">
                            {step.title}
                          </h3>
                          <p
                            className={`text-sm mt-1 ${colors.text} font-medium`}
                          >
                            {step.subtitle}
                          </p>
                        </div>

                        {/* Large faded number */}
                        <span className="text-7xl sm:text-8xl font-black tracking-tighter text-[var(--foreground)]/[0.04] leading-none select-none hidden sm:block">
                          {step.number}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed mb-6 max-w-lg">
                        {step.description}
                      </p>

                      {/* Detail bullets */}
                      <ul className="space-y-3 mb-8 flex-1">
                        {step.details.map((detail, j) => (
                          <motion.li
                            key={j}
                            className="flex items-start gap-3 text-sm text-[var(--foreground-muted)]"
                            initial={{ opacity: 0, x: 8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.15 + j * 0.08 }}
                          >
                            <div
                              className={`mt-1.5 h-1.5 w-1.5 rounded-full shrink-0 ${colors.dot}`}
                            />
                            {detail}
                          </motion.li>
                        ))}
                      </ul>

                      {/* CTA */}
                      <div className="flex items-center gap-4">
                        <Button
                          variant="primary"
                          size="sm"
                          className="rounded-full px-6"
                          asChild
                        >
                          <Link href={step.cta.href}>
                            {step.cta.label}
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Link>
                        </Button>

                        {/* Step dots */}
                        <div className="flex gap-1.5 ml-auto">
                          {steps.map((_, j) => (
                            <button
                              key={j}
                              type="button"
                              onClick={() => setActive(j)}
                              className={`h-2 rounded-full transition-all duration-300 ${
                                j === active
                                  ? `w-6 ${colors.dot}`
                                  : "w-2 bg-[var(--surface-border)] hover:bg-[var(--foreground-subtle)]"
                              }`}
                              aria-label={`Go to step ${j + 1}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
