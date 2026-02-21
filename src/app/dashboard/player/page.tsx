"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { getStoredProfile } from "@/lib/user-store";
import type { PlayerProfile } from "@/lib/user-store";
import { Button } from "@/components/ui/button";
import { User, Briefcase, FileCheck, MessageCircle, Heart, ChevronRight, MapPin, Award } from "lucide-react";

export default function DashboardPlayerPage() {
  const [profile, setProfile] = useState<PlayerProfile | null>(null);

  useEffect(() => {
    const p = getStoredProfile();
    if (p && p.role === "player") setProfile(p);
  }, []);

  const completion = profile
    ? Math.min(
      100,
      [
        profile.name,
        profile.dateOfBirth,
        profile.positionPrimary,
        profile.city || profile.country,
        profile.currentClub || profile.availability,
      ].filter(Boolean).length * 20
    )
    : 0;

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.06 } },
  };
  const item = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } },
  };

  return (
    <motion.div className="space-y-8" variants={container} initial="hidden" animate="show">
      <motion.div variants={item}>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">
          Welcome back{profile?.name ? `, ${profile.name.split(" ")[0]}` : ""}
        </h1>
        <p className="mt-1 text-sm text-[var(--foreground-muted)]">Your player dashboard</p>
      </motion.div>

      {/* Profile Completion */}
      <motion.section variants={item} className="glass-card p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--gold)]/10 border border-[var(--gold)]/20">
              <User className="h-6 w-6 text-[var(--gold)]" />
            </div>
            <div>
              <h2 className="font-semibold text-[var(--foreground)]">Profile completion</h2>
              <p className="text-xs text-[var(--foreground-muted)]">Complete your profile to get discovered</p>
            </div>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)] bg-clip-text text-transparent">{completion}%</span>
        </div>
        <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-[var(--surface-border)]">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)]"
            initial={{ width: 0 }}
            animate={{ width: `${completion}%` }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
          />
        </div>
        <Button variant="outline" size="sm" className="mt-4" asChild>
          <Link href="/dashboard/profile">Edit profile</Link>
        </Button>
      </motion.section>

      {/* Recommendations */}
      <motion.section variants={item}>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">Recommended for you</h2>
          <Link href="/discover" className="text-sm font-medium text-[var(--gold)] hover:underline flex items-center gap-1">
            View all <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <p className="mt-1 text-xs text-[var(--foreground-muted)]">Clubs and opportunities that match your profile</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { name: "FC North Academy", desc: "Looking for ST, LW", icon: Award, match: "92% match" },
            { name: "Open tryout — SV West", desc: "U21 squad · Next Saturday", icon: MapPin, match: "85% match" },
            { name: "United South", desc: "Youth development program", icon: Briefcase, match: "78% match" },
          ].map((rec) => (
            <Link
              key={rec.name}
              href="/discover"
              className="glass-card group !rounded-xl p-4 flex items-center gap-4 hover:border-[var(--gold)]/30 transition-colors"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--gold)]/10 border border-[var(--gold)]/20">
                <rec.icon className="h-5 w-5 text-[var(--gold)]" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-[var(--foreground)] truncate">{rec.name}</p>
                <p className="text-xs text-[var(--foreground-muted)]">{rec.desc}</p>
              </div>
              <span className="text-xs font-medium text-[var(--accent-emerald)] shrink-0">{rec.match}</span>
            </Link>
          ))}
        </div>
      </motion.section>

      {/* Applications */}
      <motion.section variants={item}>
        <h2 className="text-lg font-semibold text-[var(--foreground)]">My applications</h2>
        <p className="mt-1 text-xs text-[var(--foreground-muted)]">Track your applications to clubs and tryouts</p>
        <div className="glass-card mt-4 p-8 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--surface)] border border-[var(--surface-border)]">
            <FileCheck className="h-6 w-6 text-[var(--foreground-muted)]" />
          </div>
          <p className="text-sm text-[var(--foreground-muted)]">No applications yet</p>
          <Button variant="primary" size="sm" className="mt-3 rounded-full" asChild>
            <Link href="/jobs">Browse jobs</Link>
          </Button>
        </div>
      </motion.section>

      {/* Quick links */}
      <motion.section variants={item} className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/dashboard/messages"
          className="glass-card group !rounded-xl p-4 flex items-center gap-4 hover:border-[var(--gold)]/30 transition-colors"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20">
            <MessageCircle className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <p className="font-medium text-[var(--foreground)]">Messages</p>
            <p className="text-xs text-[var(--foreground-muted)]">Chat with clubs</p>
          </div>
          <ChevronRight className="h-4 w-4 text-[var(--foreground-subtle)] group-hover:text-[var(--gold)] ml-auto transition-colors" />
        </Link>
        <Link
          href="/dashboard/favorites"
          className="glass-card group !rounded-xl p-4 flex items-center gap-4 hover:border-[var(--gold)]/30 transition-colors"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-500/10 border border-rose-500/20">
            <Heart className="h-5 w-5 text-rose-400" />
          </div>
          <div>
            <p className="font-medium text-[var(--foreground)]">Favorites</p>
            <p className="text-xs text-[var(--foreground-muted)]">Saved clubs and jobs</p>
          </div>
          <ChevronRight className="h-4 w-4 text-[var(--foreground-subtle)] group-hover:text-[var(--gold)] ml-auto transition-colors" />
        </Link>
      </motion.section>
    </motion.div>
  );
}
