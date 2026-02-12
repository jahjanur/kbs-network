"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Header } from "@/components/header";
import { AmbientBg } from "@/components/ambient-bg";
import { Button } from "@/components/ui/button";
import { Check, Star, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Free",
    desc: "Get started and explore",
    price: "€0",
    period: "forever",
    features: [
      "Profile & visibility",
      "Browse players, coaches, clubs",
      "Apply to jobs (limited)",
      "Basic search",
      "3 new chats per week",
    ],
    cta: "Get started",
    href: "/register",
    variant: "outline" as const,
    popular: false,
  },
  {
    name: "Premium",
    desc: "For players & coaches",
    price: "€9",
    period: "/month",
    features: [
      "Full contact visibility",
      "Unlimited chats",
      "Advanced filters & saved searches",
      "Boosted in recommendations",
      "Priority support",
    ],
    cta: "Upgrade to Premium",
    href: "/register",
    variant: "primary" as const,
    popular: true,
  },
  {
    name: "Club",
    desc: "For clubs & academies",
    price: "€29",
    period: "/month",
    features: [
      "Everything in Premium",
      "Post unlimited jobs",
      "Applicant pipeline & notes",
      "Verified badge",
      "Team accounts (coming soon)",
    ],
    cta: "Contact for Club plan",
    href: "/register",
    variant: "outline" as const,
    popular: false,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function PricingPage() {
  return (
    <>
      <Header />
      <main className="relative min-h-screen overflow-hidden">
        <AmbientBg orbs grid gradient />

        <div className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:py-28">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <h1 className="text-4xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-5xl">
              Pricing
            </h1>
            <p className="mt-4 text-lg text-[var(--foreground-muted)] max-w-xl mx-auto">
              Free to start. Upgrade when you&apos;re ready.
            </p>
          </motion.div>

          <motion.div
            className="grid gap-6 sm:grid-cols-3 items-start"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {plans.map((plan) => (
              <motion.div key={plan.name} variants={item}>
                <div
                  className={`glass-card relative flex flex-col p-7 sm:p-8 h-full ${plan.popular
                      ? "border-[var(--gold)]/30 bg-gradient-to-b from-[var(--gold)]/[0.04] to-transparent animate-border-glow shadow-lg shadow-[var(--gold-glow)]/30"
                      : ""
                    }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#d4a017] to-[#f5c518] dark:from-[#f5a623] dark:to-[#ffd740] px-4 py-1.5 text-xs font-bold text-[#0a0e17] shadow-lg shadow-[var(--gold-glow)]">
                        <Sparkles className="h-3.5 w-3.5" />
                        Popular
                      </span>
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-[var(--foreground)]">{plan.name}</h3>
                    <p className="mt-1 text-sm text-[var(--foreground-muted)]">{plan.desc}</p>
                  </div>

                  <div className="mb-6">
                    <span className="text-4xl font-extrabold text-[var(--foreground)]">{plan.price}</span>
                    <span className="ml-1 text-base text-[var(--foreground-muted)]">{plan.period}</span>
                  </div>

                  <ul className="flex-1 space-y-3 mb-8">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-[var(--foreground-muted)]">
                        <Check className="h-4 w-4 text-[var(--gold)] shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={plan.variant}
                    size="lg"
                    className={`w-full rounded-xl ${plan.popular ? "shadow-lg shadow-[var(--gold-glow)]" : ""}`}
                    asChild
                  >
                    <Link href={plan.href}>{plan.cta}</Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>
    </>
  );
}
