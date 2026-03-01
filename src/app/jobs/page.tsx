"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/header";
import { AmbientBg } from "@/components/ambient-bg";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  ArrowRight,
  MapPin,
  Clock,
  Building2,
  Search,
  X,
  SlidersHorizontal,
  Users,
  Trophy,
  Shield,
  Star,
} from "lucide-react";
import { isLoggedIn } from "@/lib/user-store";

const mockJobs = [
  {
    id: 1,
    title: "Head Coach — U19",
    club: "FC Salzburg Academy",
    location: "Salzburg, Austria",
    type: "Full-time",
    salary: "€45,000 – €60,000",
    posted: "2 days ago",
    applicants: 12,
    urgent: true,
    tags: ["Coaching", "Youth", "Bundesliga"],
    description: "Lead the U19 squad through the Austrian Youth League season. UEFA A License required.",
  },
  {
    id: 2,
    title: "Goalkeeper Coach",
    club: "Rapid Vienna",
    location: "Vienna, Austria",
    type: "Full-time",
    salary: "€35,000 – €45,000",
    posted: "5 days ago",
    applicants: 8,
    urgent: false,
    tags: ["Coaching", "Specialist", "First Team"],
    description: "Specialist goalkeeper training for first team and reserves. Experience at professional level preferred.",
  },
  {
    id: 3,
    title: "Physiotherapist",
    club: "Sturm Graz",
    location: "Graz, Austria",
    type: "Full-time",
    salary: "€30,000 – €40,000",
    posted: "1 week ago",
    applicants: 15,
    urgent: false,
    tags: ["Medical", "Sports Science"],
    description: "Join the medical team. Sports physiotherapy qualification and match-day availability required.",
  },
  {
    id: 4,
    title: "Scout — Central Europe",
    club: "LASK",
    location: "Linz, Austria (Remote)",
    type: "Part-time",
    salary: "€18,000 – €24,000",
    posted: "3 days ago",
    applicants: 6,
    urgent: true,
    tags: ["Scouting", "Remote", "Data"],
    description: "Identify and evaluate talent across Austria, Czech Republic, and Slovakia for the first team pipeline.",
  },
  {
    id: 5,
    title: "Academy Director",
    club: "Austria Vienna",
    location: "Vienna, Austria",
    type: "Full-time",
    salary: "€55,000 – €75,000",
    posted: "1 day ago",
    applicants: 4,
    urgent: true,
    tags: ["Management", "Youth", "Strategy"],
    description: "Oversee all youth development programs, coaching staff, and player pathways from U12 to U19.",
  },
  {
    id: 6,
    title: "Performance Analyst",
    club: "Wolfsberger AC",
    location: "Wolfsberg, Austria",
    type: "Full-time",
    salary: "€28,000 – €35,000",
    posted: "4 days ago",
    applicants: 9,
    urgent: false,
    tags: ["Analytics", "Video", "Data"],
    description: "Match analysis, opposition reports, and performance data visualization for coaching staff.",
  },
  {
    id: 7,
    title: "Tryout — Open Trial Day",
    club: "WSG Tirol",
    location: "Innsbruck, Austria",
    type: "Tryout",
    salary: "Free entry",
    posted: "6 days ago",
    applicants: 42,
    urgent: false,
    tags: ["Players", "Trial", "Open"],
    description: "Open trial for outfield players aged 18-23. Bring boots, shin guards, and CV. March 15, 2026.",
  },
  {
    id: 8,
    title: "Social Media Manager",
    club: "SCR Altach",
    location: "Altach, Austria",
    type: "Part-time",
    salary: "€15,000 – €20,000",
    posted: "2 weeks ago",
    applicants: 21,
    urgent: false,
    tags: ["Marketing", "Content", "Digital"],
    description: "Manage club social channels, match-day content, and fan engagement campaigns.",
  },
];

const typeColors: Record<string, string> = {
  "Full-time": "bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border-emerald-500/20",
  "Part-time": "bg-blue-500/10 text-blue-500 dark:text-blue-400 border-blue-500/20",
  Tryout: "bg-amber-500/10 text-amber-500 dark:text-amber-400 border-amber-500/20",
};

export default function JobsPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<string | null>(null);

  useEffect(() => {
    if (isLoggedIn()) {
      router.replace("/dashboard/jobs");
    }
  }, [router]);

  const filtered = mockJobs.filter((job) => {
    const matchesSearch =
      !search ||
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.club.toLowerCase().includes(search.toLowerCase()) ||
      job.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchesType = !filterType || job.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <>
      <Header />
      <main className="relative min-h-screen overflow-hidden">
        <AmbientBg orbs={false} grid gradient />

        <div className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:py-28">
          {/* Header */}
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-5xl">
              Job Board
            </h1>
            <p className="mt-3 text-lg text-[var(--foreground-muted)] max-w-xl">
              Open positions, coaching roles, and tryouts from clubs across
              Austria.
            </p>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-4 mt-6">
              {[
                { icon: Briefcase, label: `${mockJobs.length} open roles`, color: "text-emerald-500 dark:text-emerald-400" },
                { icon: Building2, label: `${new Set(mockJobs.map((j) => j.club)).size} clubs hiring`, color: "text-blue-500 dark:text-blue-400" },
                { icon: Trophy, label: "3 urgent", color: "text-amber-500 dark:text-amber-400" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="flex items-center gap-2 text-sm text-[var(--foreground-muted)]"
                >
                  <s.icon className={`h-4 w-4 ${s.color}`} />
                  {s.label}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Search + filters */}
          <motion.div
            className="flex flex-col gap-3 sm:flex-row sm:items-center mb-6"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--foreground-subtle)]" />
              <input
                type="text"
                placeholder="Search jobs, clubs, or skills..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-[var(--surface-border)] bg-[var(--card-bg)]/50 backdrop-blur-sm pl-10 pr-9 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--foreground-subtle)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/30"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--foreground-subtle)] hover:text-[var(--foreground)]"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="flex gap-2">
              {["Full-time", "Part-time", "Tryout"].map((t) => (
                <button
                  key={t}
                  onClick={() => setFilterType(filterType === t ? null : t)}
                  className={`rounded-lg px-3.5 py-2 text-xs font-medium border transition-all duration-200 ${
                    filterType === t
                      ? "border-[var(--gold)]/40 bg-[var(--gold)]/10 text-[var(--gold)]"
                      : "border-[var(--surface-border)] text-[var(--foreground-muted)] hover:border-[var(--foreground-subtle)]/30"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Job listings */}
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((job, i) => (
                <motion.div
                  key={job.id}
                  layout
                  className="group relative rounded-2xl border border-[var(--surface-border)] bg-[var(--card-bg)]/50 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/15"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{
                    duration: 0.4,
                    delay: i * 0.04,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 p-5 sm:p-6">
                    {/* Left: club icon placeholder */}
                    <div className="shrink-0 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--surface-highlight)] border border-[var(--surface-border)]">
                      <Building2 className="h-5 w-5 text-[var(--foreground-subtle)]" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="text-base font-bold text-[var(--foreground)] truncate">
                          {job.title}
                        </h3>
                        {job.urgent && (
                          <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-red-500/10 text-red-500 dark:text-red-400 border border-red-500/20">
                            Urgent
                          </span>
                        )}
                      </div>

                      <p className="text-sm text-[var(--foreground-muted)] mb-3 line-clamp-1">
                        {job.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-[var(--foreground-subtle)]">
                        <span className="flex items-center gap-1">
                          <Building2 className="h-3 w-3" />
                          {job.club}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {job.posted}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {job.applicants} applicants
                        </span>
                      </div>
                    </div>

                    {/* Right side */}
                    <div className="shrink-0 flex flex-col items-end gap-2 sm:text-right">
                      <span
                        className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${typeColors[job.type] || ""}`}
                      >
                        {job.type}
                      </span>
                      <span className="text-sm font-semibold text-[var(--foreground)]">
                        {job.salary}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="rounded-lg text-[var(--gold)] opacity-0 group-hover:opacity-100 transition-opacity"
                        asChild
                      >
                        <Link href="/register">
                          Apply <ArrowRight className="h-3.5 w-3.5 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="px-5 sm:px-6 pb-4 flex flex-wrap gap-1.5">
                    {job.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[var(--surface-highlight)] text-[var(--foreground-subtle)] border border-[var(--surface-border)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {filtered.length === 0 && (
              <div className="rounded-2xl border border-[var(--surface-border)] bg-[var(--card-bg)]/50 p-12 text-center">
                <h3 className="text-lg font-semibold text-[var(--foreground)]">
                  No matching jobs
                </h3>
                <p className="mt-2 text-sm text-[var(--foreground-muted)]">
                  Try adjusting your search or filters.
                </p>
              </div>
            )}
          </div>

          {/* CTA */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-[var(--foreground-muted)] text-sm mb-4">
              Sign up to apply, save jobs, and get alerts for new openings.
            </p>
            <Button
              variant="primary"
              size="lg"
              className="rounded-full px-8"
              asChild
            >
              <Link href="/register">
                Create free account
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </main>
    </>
  );
}
