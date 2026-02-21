"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { getStoredProfile } from "@/lib/user-store";
import type { SponsorProfile } from "@/lib/user-store";
import {
  Megaphone,
  Building2,
  MessageCircle,
  ShieldCheck,
  ArrowRight,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SponsorDashboardPage() {
  const [profile, setProfile] = useState<SponsorProfile | null>(null);

  useEffect(() => {
    const p = getStoredProfile();
    if (p?.role === "sponsor") setProfile(p);
  }, []);

  const name = profile?.companyName || "Sponsor";

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl font-bold text-[var(--foreground)] sm:text-3xl">
          {name} Dashboard
        </h1>
        <p className="mt-1 text-[var(--foreground-muted)]">
          Manage your sponsorship deals and connect with clubs.
        </p>
      </motion.div>

      {/* Metrics */}
      <motion.div
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.08 }}
      >
        {[
          { label: "Active Deals", value: "0", icon: Megaphone, color: "text-rose-400", bg: "bg-rose-500/10" },
          { label: "Club Applications", value: "0", icon: Building2, color: "text-emerald-400", bg: "bg-emerald-500/10" },
          { label: "Messages", value: "0", icon: MessageCircle, color: "text-amber-400", bg: "bg-amber-500/10" },
          { label: "Verification", value: "Pending", icon: ShieldCheck, color: "text-violet-400", bg: "bg-violet-500/10" },
        ].map((m) => (
          <div key={m.label} className="glass-card p-5">
            <div className={`inline-flex items-center justify-center w-9 h-9 rounded-xl ${m.bg} mb-3`}>
              <m.icon className={`w-4 h-4 ${m.color}`} />
            </div>
            <div className="text-2xl font-bold text-[var(--foreground)]">{m.value}</div>
            <div className="text-sm text-[var(--foreground-muted)]">{m.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Quick actions */}
      <motion.div
        className="glass-card p-6"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.16 }}
      >
        <h2 className="font-semibold text-[var(--foreground)] mb-4">Quick actions</h2>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary" size="md">
            <Plus className="h-4 w-4 mr-2" />
            Post a Sponsorship Deal
          </Button>
          <Button variant="outline" size="md" asChild>
            <Link href="/dashboard/profile">
              Edit company profile
            </Link>
          </Button>
        </div>
      </motion.div>

      {/* Browse clubs */}
      <motion.div
        className="glass-card p-8 text-center"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.24 }}
      >
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--gold)]/10 border border-[var(--gold)]/20">
          <Building2 className="h-6 w-6 text-[var(--gold)]" />
        </div>
        <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">Browse Clubs</h3>
        <p className="text-sm text-[var(--foreground-muted)] mb-4">
          Discover clubs looking for sponsors. Filter by league, region, and fan reach.
        </p>
        <Button variant="outline" size="md" asChild>
          <Link href="/discover">
            Explore clubs
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      </motion.div>
    </div>
  );
}
