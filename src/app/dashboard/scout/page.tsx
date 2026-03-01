"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { getStoredProfile, getShortlist, getPrivateNotes } from "@/lib/user-store";
import type { ScoutProfile, ShortlistEntry } from "@/lib/user-store";
import { getProfileById, getProfileDisplayName, getProfilesByType } from "@/lib/mock-directory";
import { Button } from "@/components/ui/button";
import { Binoculars, Users, Heart, FileText, ChevronRight, MapPin } from "lucide-react";

export default function DashboardScoutPage() {
  const [profile, setProfile] = useState<ScoutProfile | null>(null);
  const [shortlist, setShortlist] = useState<ShortlistEntry[]>([]);
  const [notesCount, setNotesCount] = useState(0);

  useEffect(() => {
    const p = getStoredProfile();
    if (p && p.role === "scout") setProfile(p);
    setShortlist(getShortlist());
    setNotesCount(Object.keys(getPrivateNotes()).length);
  }, []);

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
  const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } } };

  // Match mock players by criteria
  const matchingPlayers = profile ? getProfilesByType("player").filter((entry) => {
    const pp = entry.profile;
    if (pp.role !== "player") return false;
    if (profile.positionsLookingFor?.length > 0) {
      return profile.positionsLookingFor.includes(pp.positionPrimary);
    }
    return true;
  }).slice(0, 4) : [];

  return (
    <motion.div className="space-y-8" variants={container} initial="hidden" animate="show">
      <motion.div variants={item}>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Welcome back{profile?.name ? `, ${profile.name.split(" ")[0]}` : ""}</h1>
        <p className="mt-1 text-sm text-[var(--foreground-muted)]">Your scout dashboard</p>
      </motion.div>

      {/* Stats row */}
      <motion.section variants={item} className="grid gap-4 sm:grid-cols-3">
        <div className="glass-card !rounded-xl p-4 flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-500/10 border border-rose-500/20">
            <Heart className="h-5 w-5 text-rose-400" />
          </div>
          <div>
            <p className="text-2xl font-bold text-[var(--foreground)]">{shortlist.length}</p>
            <p className="text-xs text-[var(--foreground-muted)]">Shortlisted</p>
          </div>
        </div>
        <div className="glass-card !rounded-xl p-4 flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10 border border-violet-500/20">
            <FileText className="h-5 w-5 text-violet-400" />
          </div>
          <div>
            <p className="text-2xl font-bold text-[var(--foreground)]">{notesCount}</p>
            <p className="text-xs text-[var(--foreground-muted)]">Private Notes</p>
          </div>
        </div>
        <div className="glass-card !rounded-xl p-4 flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20">
            <MapPin className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <p className="text-2xl font-bold text-[var(--foreground)]">{profile?.regionsOfInterest?.length ?? 0}</p>
            <p className="text-xs text-[var(--foreground-muted)]">Regions Tracked</p>
          </div>
        </div>
      </motion.section>

      {/* Shortlist */}
      <motion.section variants={item}>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">Shortlist</h2>
          <Link href="/dashboard/shortlist" className="text-sm font-medium text-[var(--gold)] hover:underline flex items-center gap-1">
            View all <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        {shortlist.length > 0 ? (
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {shortlist.slice(0, 4).map((entry) => {
              const p = getProfileById(entry.profileId);
              if (!p) return null;
              const name = getProfileDisplayName(p.profile);
              return (
                <Link key={entry.profileId} href={`/dashboard/profile/${entry.profileId}`} className="glass-card group !rounded-xl p-3 flex items-center gap-3 hover:border-[var(--gold)]/30 transition-colors">
                  <div className="h-9 w-9 shrink-0 rounded-full bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center">
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
        ) : (
          <div className="glass-card mt-4 p-8 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--surface)] border border-[var(--surface-border)]">
              <Users className="h-6 w-6 text-[var(--foreground-muted)]" />
            </div>
            <p className="text-sm text-[var(--foreground-muted)]">No players in your shortlist yet</p>
            <Button variant="primary" size="sm" className="mt-3 rounded-full" asChild>
              <Link href="/dashboard/discover">Browse players</Link>
            </Button>
          </div>
        )}
      </motion.section>

      {/* Matching Players */}
      {matchingPlayers.length > 0 && (
        <motion.section variants={item}>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">Matching your criteria</h2>
            <Link href="/dashboard/discover" className="text-sm font-medium text-[var(--gold)] hover:underline flex items-center gap-1">
              Discover more <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <p className="mt-1 text-xs text-[var(--foreground-muted)]">Players matching your position and region criteria</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {matchingPlayers.map((entry) => {
              const pp = entry.profile;
              if (pp.role !== "player") return null;
              return (
                <Link key={entry.id} href={`/dashboard/profile/${entry.id}`} className="glass-card group !rounded-xl p-3 flex items-center gap-4 hover:border-[var(--gold)]/30 transition-colors">
                  <div className="h-10 w-10 shrink-0 rounded-full bg-gradient-to-br from-[var(--gold)] to-amber-600 flex items-center justify-center">
                    <span className="text-sm font-bold text-white">{pp.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-[var(--foreground)] truncate">{pp.name}</p>
                    <p className="text-xs text-[var(--foreground-muted)]">{pp.positionPrimary} · {pp.city}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </motion.section>
      )}

      <motion.section variants={item} className="grid gap-4 sm:grid-cols-2">
        <Link href="/dashboard/shortlist" className="glass-card group !rounded-xl p-4 flex items-center gap-4 hover:border-[var(--gold)]/30 transition-colors">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-500/10 border border-rose-500/20"><Heart className="h-5 w-5 text-rose-400" /></div>
          <div><p className="font-medium text-[var(--foreground)]">Shortlist</p><p className="text-xs text-[var(--foreground-muted)]">{shortlist.length} saved profiles</p></div>
          <ChevronRight className="h-4 w-4 text-[var(--foreground-subtle)] group-hover:text-[var(--gold)] ml-auto transition-colors" />
        </Link>
        <Link href="/dashboard/profile" className="glass-card group !rounded-xl p-4 flex items-center gap-4 hover:border-[var(--gold)]/30 transition-colors">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10 border border-violet-500/20"><Binoculars className="h-5 w-5 text-violet-400" /></div>
          <div><p className="font-medium text-[var(--foreground)]">Scout profile</p><p className="text-xs text-[var(--foreground-muted)]">Regions, positions, age range</p></div>
          <ChevronRight className="h-4 w-4 text-[var(--foreground-subtle)] group-hover:text-[var(--gold)] ml-auto transition-colors" />
        </Link>
      </motion.section>
    </motion.div>
  );
}
