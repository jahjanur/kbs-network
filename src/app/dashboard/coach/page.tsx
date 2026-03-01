"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { getStoredProfile, getShortlist, getUserStatus } from "@/lib/user-store";
import type { CoachProfile, ShortlistEntry } from "@/lib/user-store";
import { getStatusConfig } from "@/lib/permissions";
import { getProfileById, getProfileDisplayName } from "@/lib/mock-directory";
import { Button } from "@/components/ui/button";
import { User, Briefcase, FileCheck, MessageCircle, Heart, ChevronRight } from "lucide-react";

export default function DashboardCoachPage() {
  const [profile, setProfile] = useState<CoachProfile | null>(null);
  const [shortlist, setShortlist] = useState<ShortlistEntry[]>([]);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    const p = getStoredProfile();
    if (p && p.role === "coach") setProfile(p);
    setShortlist(getShortlist());
    setStatus(getUserStatus());
  }, []);

  const completion = profile
    ? Math.min(100, [profile.name, profile.experienceYears, profile.city, profile.country, profile.availability || profile.rolesPreferred?.length].filter(Boolean).length * 20)
    : 0;

  const statusCfg = status ? getStatusConfig(status) : null;
  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
  const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } } };

  return (
    <motion.div className="space-y-8" variants={container} initial="hidden" animate="show">
      <motion.div variants={item}>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Welcome back{profile?.name ? `, ${profile.name.split(" ")[0]}` : ""}</h1>
          {statusCfg && (
            <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${
              statusCfg.color === "emerald" ? "bg-emerald-500/15 text-emerald-500 border-emerald-500/30" :
              statusCfg.color === "amber" ? "bg-amber-500/15 text-amber-500 border-amber-500/30" :
              statusCfg.color === "blue" ? "bg-blue-500/15 text-blue-500 border-blue-500/30" :
              statusCfg.color === "violet" ? "bg-violet-500/15 text-violet-500 border-violet-500/30" :
              "bg-slate-500/15 text-slate-500 border-slate-500/30"
            }`}>
              <span className={`h-1.5 w-1.5 rounded-full ${statusCfg.color === "emerald" ? "bg-emerald-500" : statusCfg.color === "amber" ? "bg-amber-500" : statusCfg.color === "blue" ? "bg-blue-500" : statusCfg.color === "violet" ? "bg-violet-500" : "bg-slate-500"}`} />
              {statusCfg.label}
            </span>
          )}
        </div>
        <p className="mt-1 text-sm text-[var(--foreground-muted)]">Your coach dashboard</p>
      </motion.div>

      <motion.section variants={item} className="glass-card p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--gold)]/10 border border-[var(--gold)]/20">
              <User className="h-6 w-6 text-[var(--gold)]" />
            </div>
            <div>
              <h2 className="font-semibold text-[var(--foreground)]">Profile completion</h2>
              <p className="text-xs text-[var(--foreground-muted)]">Stand out to clubs</p>
            </div>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)] bg-clip-text text-transparent">{completion}%</span>
        </div>
        <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-[var(--surface-border)]">
          <motion.div className="h-full rounded-full bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)]" initial={{ width: 0 }} animate={{ width: `${completion}%` }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }} />
        </div>
        <Button variant="outline" size="sm" className="mt-4" asChild><Link href="/dashboard/profile">Edit profile</Link></Button>
      </motion.section>

      {/* Shortlist Preview */}
      {shortlist.length > 0 && (
        <motion.section variants={item}>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">My Shortlist</h2>
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
                  <div className="h-9 w-9 shrink-0 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
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

      <motion.section variants={item}>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">Coaching opportunities</h2>
          <Link href="/dashboard/discover" className="text-sm font-medium text-[var(--gold)] hover:underline flex items-center gap-1">View all <ChevronRight className="h-4 w-4" /></Link>
        </div>
        <p className="mt-1 text-xs text-[var(--foreground-muted)]">Clubs looking for coaching roles</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { id: "cl1", name: "FC North Vienna", role: "Youth development" },
            { id: "cl2", name: "SV Salzburg United", role: "Goalkeeper coach needed" },
            { id: "cl4", name: "Grazer AK Future", role: "Coaching staff openings" },
          ].map((rec) => (
            <Link key={rec.id} href={`/dashboard/profile/${rec.id}`} className="glass-card group !rounded-xl p-4 flex items-center gap-4 hover:border-[var(--gold)]/30 transition-colors">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--gold)]/10 border border-[var(--gold)]/20">
                <Briefcase className="h-5 w-5 text-[var(--gold)]" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-[var(--foreground)] truncate">{rec.name}</p>
                <p className="text-xs text-[var(--foreground-muted)]">{rec.role}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-[var(--foreground-subtle)] group-hover:text-[var(--gold)] shrink-0 transition-colors" />
            </Link>
          ))}
        </div>
      </motion.section>

      <motion.section variants={item}>
        <h2 className="text-lg font-semibold text-[var(--foreground)]">My applications</h2>
        <div className="glass-card mt-4 p-8 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--surface)] border border-[var(--surface-border)]">
            <FileCheck className="h-6 w-6 text-[var(--foreground-muted)]" />
          </div>
          <p className="text-sm text-[var(--foreground-muted)]">No applications yet</p>
          <Button variant="primary" size="sm" className="mt-3 rounded-full" asChild><Link href="/dashboard/discover">Find opportunities</Link></Button>
        </div>
      </motion.section>

      <motion.section variants={item} className="grid gap-4 sm:grid-cols-2">
        <Link href="/dashboard/messages" className="glass-card group !rounded-xl p-4 flex items-center gap-4 hover:border-[var(--gold)]/30 transition-colors">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20"><MessageCircle className="h-5 w-5 text-blue-400" /></div>
          <div><p className="font-medium text-[var(--foreground)]">Messages</p><p className="text-xs text-[var(--foreground-muted)]">Contact requests</p></div>
          <ChevronRight className="h-4 w-4 text-[var(--foreground-subtle)] group-hover:text-[var(--gold)] ml-auto transition-colors" />
        </Link>
        <Link href="/dashboard/shortlist" className="glass-card group !rounded-xl p-4 flex items-center gap-4 hover:border-[var(--gold)]/30 transition-colors">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-500/10 border border-rose-500/20"><Heart className="h-5 w-5 text-rose-400" /></div>
          <div><p className="font-medium text-[var(--foreground)]">Shortlist</p><p className="text-xs text-[var(--foreground-muted)]">{shortlist.length} saved profiles</p></div>
          <ChevronRight className="h-4 w-4 text-[var(--foreground-subtle)] group-hover:text-[var(--gold)] ml-auto transition-colors" />
        </Link>
      </motion.section>
    </motion.div>
  );
}
