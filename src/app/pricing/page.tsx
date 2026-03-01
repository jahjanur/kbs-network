"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/header";
import { AmbientBg } from "@/components/ambient-bg";
import { Button } from "@/components/ui/button";
import {
  Check,
  X,
  Sparkles,
  ArrowRight,
  Shield,
  CreditCard,
  Users,
  Zap,
  ChevronDown,
  HelpCircle,
  Building2,
  Star,
  MessageCircle,
  Search,
  Briefcase,
  Eye,
  BadgeCheck,
  Crown,
} from "lucide-react";

/* ── Plan data ─────────────────────────────────────────────────────── */

const plans = [
  {
    key: "free",
    name: "Free",
    desc: "Get started and explore the network",
    monthly: 0,
    annual: 0,
    features: [
      "Public profile & visibility",
      "Browse players, coaches, clubs",
      "Apply to jobs (3/month)",
      "Basic search & filters",
      "3 new conversations per week",
      "Community feed access",
    ],
    cta: "Get started free",
    href: "/register",
    variant: "outline" as const,
    popular: false,
    icon: Zap,
  },
  {
    key: "premium",
    name: "Premium",
    desc: "For serious players & coaches",
    monthly: 9,
    annual: 7,
    features: [
      "Full contact & social visibility",
      "Unlimited conversations",
      "Advanced filters & saved searches",
      "Boosted in recommendations",
      "Priority in job applications",
      "Profile analytics & views",
      "Priority support",
      "Early access to new features",
    ],
    cta: "Upgrade to Premium",
    href: "/register",
    variant: "primary" as const,
    popular: true,
    icon: Crown,
  },
  {
    key: "club",
    name: "Club",
    desc: "For clubs, academies & agencies",
    monthly: 29,
    annual: 24,
    features: [
      "Everything in Premium",
      "Post unlimited jobs & tryouts",
      "Applicant pipeline & notes",
      "Verified club badge",
      "Team accounts (up to 5 seats)",
      "Bulk messaging",
      "Advanced analytics dashboard",
      "Dedicated account manager",
    ],
    cta: "Start Club plan",
    href: "/register",
    variant: "outline" as const,
    popular: false,
    icon: Building2,
  },
];

/* ── Feature comparison ────────────────────────────────────────────── */

type FeatureVal = boolean | string;

const comparisonCategories = [
  {
    category: "Profile & Visibility",
    features: [
      { name: "Public profile", free: true, premium: true, club: true },
      { name: "Full contact info visible", free: false, premium: true, club: true },
      { name: "Profile analytics", free: false, premium: true, club: true },
      { name: "Verified badge", free: false, premium: false, club: true },
      { name: "Boosted in recommendations", free: false, premium: true, club: true },
    ],
  },
  {
    category: "Search & Discovery",
    features: [
      { name: "Basic search", free: true, premium: true, club: true },
      { name: "Advanced filters", free: false, premium: true, club: true },
      { name: "Saved searches", free: false, premium: true, club: true },
      { name: "Player/coach shortlists", free: "Up to 10", premium: "Unlimited", club: "Unlimited" },
    ],
  },
  {
    category: "Messaging",
    features: [
      { name: "New conversations", free: "3/week", premium: "Unlimited", club: "Unlimited" },
      { name: "Bulk messaging", free: false, premium: false, club: true },
      { name: "Priority support", free: false, premium: true, club: true },
    ],
  },
  {
    category: "Jobs & Recruitment",
    features: [
      { name: "Apply to jobs", free: "3/month", premium: "Unlimited", club: "Unlimited" },
      { name: "Post jobs & tryouts", free: false, premium: false, club: "Unlimited" },
      { name: "Applicant pipeline", free: false, premium: false, club: true },
      { name: "Priority applications", free: false, premium: true, club: true },
    ],
  },
  {
    category: "Team & Admin",
    features: [
      { name: "Team seats", free: "1", premium: "1", club: "Up to 5" },
      { name: "Analytics dashboard", free: false, premium: "Basic", club: "Advanced" },
      { name: "Account manager", free: false, premium: false, club: true },
    ],
  },
];

/* ── FAQ ───────────────────────────────────────────────────────────── */

const faqs = [
  {
    q: "Can I switch plans at any time?",
    a: "Yes! You can upgrade or downgrade anytime. When upgrading, you get immediate access to new features. When downgrading, your current plan stays active until the end of the billing period.",
  },
  {
    q: "Is there a free trial for Premium?",
    a: "We offer a 14-day free trial for Premium. No credit card required — just sign up and start exploring all premium features instantly.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit/debit cards (Visa, Mastercard, Amex), PayPal, and SEPA direct debit for European customers. All payments are processed securely via Stripe.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Absolutely. There are no long-term contracts. Cancel anytime from your account settings and you won't be charged again. Your access continues until the end of the current billing period.",
  },
  {
    q: "Do you offer discounts for youth academies?",
    a: "Yes! We offer special pricing for grassroots clubs and youth academies. Contact us at clubs@kbs-network.com and we'll work out a plan that fits your budget.",
  },
  {
    q: "What happens to my data if I downgrade?",
    a: "Your data is always yours. If you downgrade, your profile and history remain intact. Some premium features (like saved searches beyond the limit) will be paused but not deleted.",
  },
];

/* ── Components ────────────────────────────────────────────────────── */

function CellValue({ value }: { value: FeatureVal }) {
  if (value === true) return <Check className="h-4 w-4 text-emerald-500" />;
  if (value === false) return <X className="h-4 w-4 text-[var(--foreground-subtle)]/40" />;
  return <span className="text-sm font-medium text-[var(--foreground)]">{value}</span>;
}

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      className="border-b border-[var(--surface-border)] last:border-0"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-5 text-left group"
      >
        <span className="text-sm sm:text-base font-semibold text-[var(--foreground)] pr-4 group-hover:text-[var(--gold)] transition-colors">
          {q}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
        >
          <ChevronDown className="h-4 w-4 text-[var(--foreground-subtle)]" />
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-[var(--foreground-muted)] leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── Page ──────────────────────────────────────────────────────────── */

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);

  return (
    <>
      <Header />
      <main className="relative min-h-screen overflow-hidden">
        <AmbientBg orbs={false} grid gradient />

        <div className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:py-28">
          {/* ── Header ───────────────────────────────────── */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="text-4xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-5xl">
              Simple, transparent pricing
            </h1>
            <p className="mt-4 text-lg text-[var(--foreground-muted)] max-w-xl mx-auto">
              Free to start. Upgrade when you&apos;re ready to unlock the full network.
            </p>

            {/* Billing toggle */}
            <div className="flex items-center justify-center gap-3 mt-8">
              <span
                className={`text-sm font-medium transition-colors ${!annual ? "text-[var(--foreground)]" : "text-[var(--foreground-subtle)]"}`}
              >
                Monthly
              </span>
              <button
                onClick={() => setAnnual(!annual)}
                className={`relative h-7 w-12 rounded-full border transition-all duration-300 ${
                  annual
                    ? "bg-[var(--gold)]/20 border-[var(--gold)]/40"
                    : "bg-[var(--surface-highlight)] border-[var(--surface-border)]"
                }`}
              >
                <motion.div
                  className={`absolute top-0.5 h-5.5 w-5.5 rounded-full shadow-sm ${
                    annual ? "bg-[var(--gold)]" : "bg-[var(--foreground-subtle)]"
                  }`}
                  animate={{ left: annual ? 22 : 2 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </button>
              <span
                className={`text-sm font-medium transition-colors ${annual ? "text-[var(--foreground)]" : "text-[var(--foreground-subtle)]"}`}
              >
                Annual
              </span>
              {annual && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20"
                >
                  Save 20%
                </motion.span>
              )}
            </div>
          </motion.div>

          {/* ── Plan cards ───────────────────────────────── */}
          <div className="grid gap-6 sm:grid-cols-3 items-start mb-24">
            {plans.map((plan, i) => {
              const price = annual ? plan.annual : plan.monthly;
              const Icon = plan.icon;

              return (
                <motion.div
                  key={plan.key}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div
                    className={`glass-card relative flex flex-col p-7 sm:p-8 h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/15 ${
                      plan.popular
                        ? "border-[var(--gold)]/30 bg-gradient-to-b from-[var(--gold)]/[0.04] to-transparent shadow-lg shadow-[var(--gold-glow)]/30"
                        : ""
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#d4a017] to-[#f5c518] dark:from-[#f5a623] dark:to-[#ffd740] px-4 py-1.5 text-xs font-bold text-[#0a0e17] shadow-lg shadow-[var(--gold-glow)]">
                          <Sparkles className="h-3.5 w-3.5" />
                          Most Popular
                        </span>
                      </div>
                    )}

                    {/* Icon + name */}
                    <div className="mb-6">
                      <div className="flex items-center gap-3 mb-2">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-xl border ${
                            plan.popular
                              ? "bg-[var(--gold)]/10 border-[var(--gold)]/20"
                              : "bg-[var(--surface-highlight)] border-[var(--surface-border)]"
                          }`}
                        >
                          <Icon
                            className={`h-5 w-5 ${plan.popular ? "text-[var(--gold)]" : "text-[var(--foreground-subtle)]"}`}
                          />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-[var(--foreground)]">{plan.name}</h3>
                        </div>
                      </div>
                      <p className="text-sm text-[var(--foreground-muted)]">{plan.desc}</p>
                    </div>

                    {/* Price */}
                    <div className="mb-6">
                      <div className="flex items-baseline gap-1">
                        <AnimatePresence mode="wait">
                          <motion.span
                            key={`${plan.key}-${annual}`}
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.2 }}
                            className="text-4xl font-extrabold text-[var(--foreground)]"
                          >
                            €{price}
                          </motion.span>
                        </AnimatePresence>
                        <span className="text-base text-[var(--foreground-muted)]">
                          {price === 0 ? "forever" : annual ? "/mo, billed yearly" : "/month"}
                        </span>
                      </div>
                      {annual && price > 0 && (
                        <p className="mt-1 text-xs text-[var(--foreground-subtle)]">
                          €{price * 12}/year — saves €{(plan.monthly - plan.annual) * 12}/year
                        </p>
                      )}
                    </div>

                    {/* Features */}
                    <ul className="flex-1 space-y-3 mb-8">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-3 text-sm text-[var(--foreground-muted)]">
                          <Check
                            className={`h-4 w-4 shrink-0 mt-0.5 ${plan.popular ? "text-[var(--gold)]" : "text-emerald-500"}`}
                          />
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
                      <Link href={plan.href}>
                        {plan.cta}
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* ── Trust badges ─────────────────────────────── */}
          <motion.div
            className="flex flex-wrap justify-center gap-6 mb-24"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {[
              { icon: Shield, label: "SSL Encrypted" },
              { icon: CreditCard, label: "Secure Payments via Stripe" },
              { icon: Users, label: "5,000+ Active Users" },
              { icon: Star, label: "4.8/5 User Rating" },
            ].map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-2 rounded-full bg-[var(--card-bg)]/50 backdrop-blur-sm border border-[var(--surface-border)] px-4 py-2 text-xs text-[var(--foreground-muted)]"
              >
                <badge.icon className="h-3.5 w-3.5 text-[var(--gold)]" />
                {badge.label}
              </div>
            ))}
          </motion.div>

          {/* ── Feature comparison ────────────────────────── */}
          <motion.div
            className="mb-24"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-[var(--foreground)] sm:text-4xl">
                Compare plans in detail
              </h2>
              <p className="mt-3 text-[var(--foreground-muted)]">
                Everything you need to find the right fit.
              </p>
            </div>

            <div className="glass-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  {/* Header */}
                  <thead>
                    <tr className="border-b border-[var(--surface-border)]">
                      <th className="text-left py-4 px-6 text-sm font-medium text-[var(--foreground-subtle)]">
                        Feature
                      </th>
                      {["Free", "Premium", "Club"].map((name) => (
                        <th key={name} className="py-4 px-6 text-center">
                          <span
                            className={`text-sm font-bold ${name === "Premium" ? "text-[var(--gold)]" : "text-[var(--foreground)]"}`}
                          >
                            {name}
                          </span>
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {comparisonCategories.map((cat) => (
                      <>
                        <tr key={cat.category}>
                          <td
                            colSpan={4}
                            className="pt-6 pb-2 px-6 text-xs font-bold uppercase tracking-wider text-[var(--foreground-subtle)]"
                          >
                            {cat.category}
                          </td>
                        </tr>
                        {cat.features.map((feat) => (
                          <tr
                            key={feat.name}
                            className="border-b border-[var(--surface-border)]/50 last:border-0 hover:bg-[var(--surface-highlight)]/50 transition-colors"
                          >
                            <td className="py-3.5 px-6 text-sm text-[var(--foreground-muted)]">
                              {feat.name}
                            </td>
                            <td className="py-3.5 px-6 text-center">
                              <div className="flex justify-center">
                                <CellValue value={feat.free} />
                              </div>
                            </td>
                            <td className="py-3.5 px-6 text-center">
                              <div className="flex justify-center">
                                <CellValue value={feat.premium} />
                              </div>
                            </td>
                            <td className="py-3.5 px-6 text-center">
                              <div className="flex justify-center">
                                <CellValue value={feat.club} />
                              </div>
                            </td>
                          </tr>
                        ))}
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>

          {/* ── FAQ ──────────────────────────────────────── */}
          <motion.div
            className="mb-24 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 rounded-full bg-[var(--card-bg)]/50 border border-[var(--surface-border)] px-4 py-1.5 text-xs font-medium text-[var(--foreground-muted)] mb-4">
                <HelpCircle className="h-3.5 w-3.5 text-[var(--gold)]" />
                Got questions?
              </div>
              <h2 className="text-3xl font-bold text-[var(--foreground)] sm:text-4xl">
                Frequently asked questions
              </h2>
            </div>

            <div className="glass-card p-6 sm:p-8">
              {faqs.map((faq, i) => (
                <FAQItem key={faq.q} {...faq} index={i} />
              ))}
            </div>
          </motion.div>

          {/* ── Bottom CTA ───────────────────────────────── */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-[var(--foreground-muted)] text-sm mb-2">
              Still not sure? Try Premium free for 14 days.
            </p>
            <p className="text-[var(--foreground-subtle)] text-xs mb-6">
              No credit card required. Cancel anytime.
            </p>
            <Button variant="primary" size="lg" className="rounded-full px-8" asChild>
              <Link href="/register">
                Start free trial
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </main>
    </>
  );
}
