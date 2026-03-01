"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { getStoredProfile, getClubNeeds, getShortlist, getContactRequests, getUserId } from "@/lib/user-store";
import type { ClubProfile, ShortlistEntry, ClubNeed } from "@/lib/user-store";
import { getProfileById, getProfileDisplayName } from "@/lib/mock-directory";
import { Button } from "@/components/ui/button";
import { ClipboardList, Users, MessageCircle, Shield, ChevronRight, Plus, Heart } from "lucide-react";

export default function DashboardClubPage() {
  const [profile, setProfile] = useState<ClubProfile | null>(null);
  const [needs, setNeeds] = useState<ClubNeed[]>([]);
  const [shortlist, setShortlist] = useState<ShortlistEntry[]>([]);
  const [receivedCount, setReceivedCount] = useState(0);

  useEffect(() => {
    const p = getStoredProfile();
    if (p && p.role === "club") setProfile(p);
    setNeeds(getClubNeeds());
    setShortlist(getShortlist());
    const reqs = getContactRequests();
    const uid = getUserId();
    setReceivedCount(reqs.filter((r) => r.toUserId === uid).length);
  }, []);

  const openNeeds = needs.filter((n) => n.status === "open").length;
  const sentRequests = getContactRequests().filter((r) => r.fromUserId === getUserId()).length;

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
  const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } } };

  const metrics = [
    { label: "Open Needs", value: String(openNeeds), icon: ClipboardList, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
    { label: "Applicants", value: String(receivedCount), icon: Users, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
    { label: "Sent Requests", value: String(sentRequests), icon: MessageCircle, color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
    { label: "Shortlisted", value: String(shortlist.length), icon: Heart, color: "text-rose-400", bg: "bg-rose-500/10 border-rose-500/20" },
  ];

  return (
    <motion.div className="space-y-8" variants={container} initial="hidden" animate="show">
      <motion.div variants={item}>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">
          {profile?.clubName || "Club"} Dashboard
        </h1>
        <p className="mt-1 text-sm text-[var(--foreground-muted)]">Manage your club, needs, and talent pipeline</p>
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
          <Link href="/dashboard/club/needs"><Plus className="h-5 w-5" /> Post a need</Link>
        </Button>
        <Button variant="outline" size="lg" className="rounded-xl gap-2 justify-center" asChild>
          <Link href="/dashboard/profile">Edit club profile</Link>
        </Button>
      </motion.section>

      {/* Shortlist Preview */}
      {shortlist.length > 0 && (
        <motion.section variants={item}>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">Shortlisted Talent</h2>
            <Link href="/dashboard/shortlist" className="text-sm font-medium text-[var(--gold)] hover:underline flex items-center gap-1">
              View all ({shortlist.length}) <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {shortlist.slice(0, 3).map((entry) => {
              const p = getProfileById(entry.profileId);
              if (!p) return null;
              const name = getProfileDisplayName(p.profile);
              return (
                <Link key={entry.profileId} href={`/dashboard/profile/${entry.profileId}`} className="glass-card group !rounded-xl p-3 flex items-center gap-3 hover:border-[var(--gold)]/30 transition-colors">
                  <div className="h-9 w-9 shrink-0 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center">
                    <span className="text-xs font-bold text-white">{name.split(" ").map((w) => w[0]).join("").slice(0, 2)}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-[var(--foreground)] truncate">{name}</p>
                    <p className="text-[10px] text-[var(--foreground-muted)] capitalize">{entry.profileType}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </motion.section>
      )}

      {/* Talent recommendations */}
      <motion.section variants={item}>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">Discover talent</h2>
          <Link href="/dashboard/discover" className="text-sm font-medium text-[var(--gold)] hover:underline flex items-center gap-1">
            Browse all <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="glass-card mt-4 p-6 text-center">
          <p className="text-sm text-[var(--foreground-muted)]">Find players, coaches, scouts, and sponsors in Discover.</p>
          <Button variant="primary" size="sm" className="mt-3 rounded-full" asChild>
            <Link href="/dashboard/discover">Discover talent</Link>
          </Button>
        </div>
      </motion.section>
    </motion.div>
  );
}
