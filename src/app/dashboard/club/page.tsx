"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { getStoredProfile } from "@/lib/user-store";
import type { ClubProfile } from "@/lib/user-store";
import { Button } from "@/components/ui/button";
import { ClipboardList, Users, MessageCircle, Shield, ChevronRight, Plus } from "lucide-react";

export default function DashboardClubPage() {
  const [profile, setProfile] = useState<ClubProfile | null>(null);

  useEffect(() => {
    const p = getStoredProfile();
    if (p && p.role === "club") setProfile(p);
  }, []);

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
  const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } } };

  const metrics = [
    { label: "Active listings", value: "0", icon: ClipboardList, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
    { label: "Applicants", value: "0", icon: Users, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
    { label: "Messages", value: "0", icon: MessageCircle, color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
    { label: "Verification", value: "Pending", icon: Shield, color: "text-violet-400", bg: "bg-violet-500/10 border-violet-500/20" },
  ];

  return (
    <motion.div className="space-y-8" variants={container} initial="hidden" animate="show">
      <motion.div variants={item}>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">
          {profile?.clubName || "Club"} Dashboard
        </h1>
        <p className="mt-1 text-sm text-[var(--foreground-muted)]">Manage your club, jobs, and talent pipeline</p>
      </motion.div>

      {/* Metrics grid */}
      <motion.section variants={item} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m) => (
          <div key={m.label} className="glass-card !rounded-xl p-4 flex items-center gap-4">
            <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${m.bg} border`}>
              <m.icon className={`h-5 w-5 ${m.color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[var(--foreground)]">{m.value}</p>
              <p className="text-xs text-[var(--foreground-muted)]">{m.label}</p>
            </div>
          </div>
        ))}
      </motion.section>

      {/* Quick actions */}
      <motion.section variants={item} className="grid gap-4 sm:grid-cols-2">
        <Button variant="primary" size="lg" className="rounded-xl gap-2 justify-center" asChild>
          <Link href="/dashboard/club/jobs"><Plus className="h-5 w-5" /> Post a job</Link>
        </Button>
        <Button variant="outline" size="lg" className="rounded-xl gap-2 justify-center" asChild>
          <Link href="/dashboard/profile">Edit club profile</Link>
        </Button>
      </motion.section>

      {/* Talent recommendations */}
      <motion.section variants={item}>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">Recommended talent</h2>
          <Link href="/discover" className="text-sm font-medium text-[var(--gold)] hover:underline flex items-center gap-1">
            Browse all <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="glass-card mt-4 p-8 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--surface)] border border-[var(--surface-border)]">
            <Users className="h-6 w-6 text-[var(--foreground-muted)]" />
          </div>
          <p className="text-sm text-[var(--foreground-muted)]">Complete your profile to get talent recommendations</p>
          <Button variant="primary" size="sm" className="mt-3 rounded-full" asChild>
            <Link href="/discover">Discover talent</Link>
          </Button>
        </div>
      </motion.section>
    </motion.div>
  );
}
