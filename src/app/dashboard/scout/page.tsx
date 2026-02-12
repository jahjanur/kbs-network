"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { getStoredProfile } from "@/lib/user-store";
import type { ScoutProfile } from "@/lib/user-store";
import { Button } from "@/components/ui/button";
import { Binoculars, Users, Heart, FileText, ChevronRight } from "lucide-react";

export default function DashboardScoutPage() {
  const [profile, setProfile] = useState<ScoutProfile | null>(null);

  useEffect(() => {
    const p = getStoredProfile();
    if (p && p.role === "scout") setProfile(p);
  }, []);

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
  const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } } };

  return (
    <motion.div className="space-y-8" variants={container} initial="hidden" animate="show">
      <motion.div variants={item}>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Welcome back{profile?.name ? `, ${profile.name.split(" ")[0]}` : ""}</h1>
        <p className="mt-1 text-sm text-[var(--foreground-muted)]">Your scout dashboard</p>
      </motion.div>

      <motion.section variants={item}>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">Shortlist</h2>
          <Link href="/discover" className="text-sm font-medium text-[var(--gold)] hover:underline flex items-center gap-1">
            Discover players <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <p className="mt-1 text-xs text-[var(--foreground-muted)]">Players you&apos;ve saved for reports and tracking</p>
        <div className="glass-card mt-4 p-8 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--surface)] border border-[var(--surface-border)]">
            <Users className="h-6 w-6 text-[var(--foreground-muted)]" />
          </div>
          <p className="text-sm text-[var(--foreground-muted)]">No players in your shortlist yet</p>
          <Button variant="primary" size="sm" className="mt-3 rounded-full" asChild>
            <Link href="/discover">Browse players</Link>
          </Button>
        </div>
      </motion.section>

      <motion.section variants={item}>
        <h2 className="text-lg font-semibold text-[var(--foreground)]">Saved searches</h2>
        <p className="mt-1 text-xs text-[var(--foreground-muted)]">Get alerts when new talent matches your criteria</p>
        <div className="glass-card mt-4 p-8 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--surface)] border border-[var(--surface-border)]">
            <Binoculars className="h-6 w-6 text-[var(--foreground-muted)]" />
          </div>
          <p className="text-sm text-[var(--foreground-muted)]">No saved searches</p>
          <p className="text-xs text-[var(--foreground-subtle)]">Save a search from Discover to get alerts</p>
        </div>
      </motion.section>

      <motion.section variants={item} className="grid gap-4 sm:grid-cols-2">
        <Link href="/dashboard/favorites" className="glass-card group !rounded-xl p-4 flex items-center gap-4 hover:border-[var(--gold)]/30 transition-colors">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-500/10 border border-rose-500/20"><Heart className="h-5 w-5 text-rose-400" /></div>
          <div><p className="font-medium text-[var(--foreground)]">Favorites</p><p className="text-xs text-[var(--foreground-muted)]">Saved players and clubs</p></div>
          <ChevronRight className="h-4 w-4 text-[var(--foreground-subtle)] group-hover:text-[var(--gold)] ml-auto transition-colors" />
        </Link>
        <Link href="/dashboard/profile" className="glass-card group !rounded-xl p-4 flex items-center gap-4 hover:border-[var(--gold)]/30 transition-colors">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10 border border-violet-500/20"><FileText className="h-5 w-5 text-violet-400" /></div>
          <div><p className="font-medium text-[var(--foreground)]">Scout profile</p><p className="text-xs text-[var(--foreground-muted)]">Regions, positions, age range</p></div>
          <ChevronRight className="h-4 w-4 text-[var(--foreground-subtle)] group-hover:text-[var(--gold)] ml-auto transition-colors" />
        </Link>
      </motion.section>
    </motion.div>
  );
}
