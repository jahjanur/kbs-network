"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { getStoredProfile, getContactRequests, getUserId } from "@/lib/user-store";
import type { SponsorProfile } from "@/lib/user-store";
import { getContactRequestLimit } from "@/lib/permissions";
import { getProfilesByType, getProfileDisplayName } from "@/lib/mock-directory";
import {
  Building2,
  MessageCircle,
  ShieldCheck,
  ArrowRight,
  Send,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SponsorDashboardPage() {
  const [profile, setProfile] = useState<SponsorProfile | null>(null);
  const [sentCount, setSentCount] = useState(0);
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    const p = getStoredProfile();
    if (p?.role === "sponsor") setProfile(p);
    const uid = getUserId();
    const reqs = getContactRequests();
    const sent = reqs.filter((r) => r.fromUserId === uid).length;
    setSentCount(sent);
    setRemaining(Math.max(0, getContactRequestLimit("sponsor") - sent));
  }, []);

  const name = profile?.companyName || "Sponsor";
  const matchingClubs = getProfilesByType("club").slice(0, 3);

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
  const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } } };

  return (
    <motion.div className="space-y-8" variants={container} initial="hidden" animate="show">
      <motion.div variants={item}>
        <h1 className="text-2xl font-bold text-[var(--foreground)] sm:text-3xl">
          {name} Dashboard
        </h1>
        <p className="mt-1 text-[var(--foreground-muted)]">
          Connect with clubs and manage sponsorship deals.
        </p>
      </motion.div>

      {/* Metrics */}
      <motion.section variants={item} className="grid gap-4 sm:grid-cols-3">
        <div className="glass-card !rounded-xl p-4 flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-500/10 border border-rose-500/20">
            <Send className="h-5 w-5 text-rose-400" />
          </div>
          <div>
            <p className="text-2xl font-bold text-[var(--foreground)]">{sentCount}</p>
            <p className="text-xs text-[var(--foreground-muted)]">Requests Sent</p>
          </div>
        </div>
        <div className="glass-card !rounded-xl p-4 flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20">
            <MessageCircle className="h-5 w-5 text-amber-400" />
          </div>
          <div>
            <p className="text-2xl font-bold text-[var(--foreground)]">{remaining}</p>
            <p className="text-xs text-[var(--foreground-muted)]">Requests Remaining</p>
          </div>
        </div>
        <div className="glass-card !rounded-xl p-4 flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10 border border-violet-500/20">
            <ShieldCheck className="h-5 w-5 text-violet-400" />
          </div>
          <div>
            <p className="text-2xl font-bold text-[var(--foreground)]">Pending</p>
            <p className="text-xs text-[var(--foreground-muted)]">Verification</p>
          </div>
        </div>
      </motion.section>

      {/* Quick actions */}
      <motion.section variants={item} className="glass-card p-6">
        <h2 className="font-semibold text-[var(--foreground)] mb-4">Quick actions</h2>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" size="md" asChild>
            <Link href="/dashboard/profile">Edit company profile</Link>
          </Button>
          <Button variant="outline" size="md" asChild>
            <Link href="/dashboard/messages">View sent requests</Link>
          </Button>
        </div>
      </motion.section>

      {/* Matching Clubs */}
      <motion.section variants={item}>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">Clubs to connect with</h2>
          <Link href="/dashboard/discover" className="text-sm font-medium text-[var(--gold)] hover:underline flex items-center gap-1">
            View all <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <p className="mt-1 text-xs text-[var(--foreground-muted)]">Clubs looking for sponsors</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {matchingClubs.map((entry) => {
            const cp = entry.profile;
            if (cp.role !== "club") return null;
            const name = getProfileDisplayName(cp);
            return (
              <Link key={entry.id} href={`/dashboard/profile/${entry.id}`} className="glass-card group !rounded-xl p-4 hover:border-[var(--gold)]/30 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 shrink-0 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center">
                    <span className="text-sm font-bold text-white">{name.split(" ").map((w) => w[0]).join("").slice(0, 2)}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[var(--foreground)] truncate">{name}</p>
                    <p className="text-xs text-[var(--foreground-muted)]">{cp.league}</p>
                  </div>
                </div>
                <p className="text-xs text-[var(--foreground-muted)]">{cp.region}</p>
              </Link>
            );
          })}
        </div>
      </motion.section>

      {/* Browse clubs CTA */}
      <motion.section variants={item} className="glass-card p-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--gold)]/10 border border-[var(--gold)]/20">
          <Building2 className="h-6 w-6 text-[var(--gold)]" />
        </div>
        <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">Browse All Clubs</h3>
        <p className="text-sm text-[var(--foreground-muted)] mb-4">
          Discover clubs looking for sponsors. Filter by league and region.
        </p>
        <Button variant="outline" size="md" asChild>
          <Link href="/dashboard/discover">
            Explore clubs
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      </motion.section>
    </motion.div>
  );
}
