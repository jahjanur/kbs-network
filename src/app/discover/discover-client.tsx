"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { PlayerCard } from "@/components/player-card";
import CoachCard from "@/components/coach-card";
import ClubCard from "@/components/club-card";
import ScoutCard from "@/components/scout-card";
import SponsorCard from "@/components/sponsor-card";
import { Search, SlidersHorizontal, X, Clock, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { isLoggedIn, getStoredRole } from "@/lib/user-store";
import { getAllowedDiscoverTabs } from "@/lib/permissions";
import type { DiscoverTab } from "@/lib/permissions";
import { searchProfiles, getProfilesByType, getAgeFromDOB } from "@/lib/mock-directory";
import type { DirectoryEntry } from "@/lib/mock-directory";
import type { PlayerProfile, CoachProfile, ClubProfile, ScoutProfile, SponsorProfile } from "@/lib/user-store";

const TAB_TO_TYPE: Record<string, string> = {
  Players: "player",
  Coaches: "coach",
  Clubs: "club",
  Scouts: "scout",
  Sponsors: "sponsor",
};

export function DiscoverClient() {
  const [tabs, setTabs] = useState<DiscoverTab[]>(["Players", "Coaches", "Clubs", "Jobs"]);
  const [active, setActive] = useState<DiscoverTab>("Players");
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [authed, setAuthed] = useState(true);

  useEffect(() => {
    const loggedIn = isLoggedIn();
    setAuthed(loggedIn);
    if (loggedIn) {
      const role = getStoredRole();
      if (role) {
        const allowed = getAllowedDiscoverTabs(role);
        setTabs(allowed);
        if (!allowed.includes(active)) {
          setActive(allowed[0] ?? "Players");
        }
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const profileType = TAB_TO_TYPE[active];
  const entries: DirectoryEntry[] = profileType
    ? (search ? searchProfiles(search, profileType as "player" | "coach" | "club" | "scout" | "sponsor") : getProfilesByType(profileType as "player" | "coach" | "club" | "scout" | "sponsor"))
    : [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:py-12">
      {/* Guest signup banner */}
      {!authed && (
        <motion.div
          className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-2xl border border-[var(--gold)]/20 bg-[var(--gold)]/5 p-4 sm:px-6"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center gap-3">
            <Lock className="h-4 w-4 text-[var(--gold)] shrink-0" />
            <p className="text-sm text-[var(--foreground-muted)]">
              Sign up to message players, save favorites, and unlock full profiles.
            </p>
          </div>
          <Button variant="primary" size="sm" className="rounded-full px-5 shrink-0" asChild>
            <Link href="/register">Sign up free</Link>
          </Button>
        </motion.div>
      )}

      {/* Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
      >
        <h1 className="text-3xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-4xl">
          Discover
        </h1>
        <p className="mt-2 text-[var(--foreground-muted)]">
          Find players, coaches, clubs, and opportunities
        </p>
      </motion.div>

      {/* Tabs */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
      >
        <div className="inline-flex rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] p-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`relative rounded-lg px-5 py-2 text-sm font-medium transition-all duration-200 whitespace-nowrap ${active === tab
                  ? "text-[#0a0e17] dark:text-[#0a0e17]"
                  : "text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
                }`}
            >
              {active === tab && (
                <motion.div
                  className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#d4a017] to-[#f5c518] dark:from-[#f5a623] dark:to-[#ffd740]"
                  layoutId="tab-indicator"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  style={{ zIndex: 0 }}
                />
              )}
              <span className="relative z-10">{tab}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Search + Filter */}
      <motion.div
        className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-8"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--foreground-subtle)]" />
          <input
            type="text"
            placeholder={`Search ${active.toLowerCase()}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pl-10"
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
        <Button
          variant={showFilters ? "primary" : "outline"}
          size="md"
          onClick={() => setShowFilters(!showFilters)}
          className="shrink-0"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </Button>
      </motion.div>

      {/* Filter panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            className="glass-card mb-8 p-6"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <p className="text-sm text-[var(--foreground-muted)]">
              Advanced filters coming soon — position, region, age, and more.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <AnimatePresence mode="wait">
        {active === "Jobs" ? (
          <motion.div
            key="jobs"
            className="glass-card p-12 text-center"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--gold)]/10 border border-[var(--gold)]/20">
              <Clock className="h-7 w-7 text-[var(--gold)]" />
            </div>
            <h3 className="text-lg font-semibold text-[var(--foreground)]">Jobs coming soon</h3>
            <p className="mt-2 text-sm text-[var(--foreground-muted)]">
              We&apos;re working on bringing you club needs and job opportunities.
            </p>
          </motion.div>
        ) : entries.length === 0 ? (
          <motion.div
            key="empty"
            className="glass-card p-12 text-center"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-lg font-semibold text-[var(--foreground)]">No results found</h3>
            <p className="mt-2 text-sm text-[var(--foreground-muted)]">
              Try adjusting your search or browse a different category.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key={active}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {entries.map((entry, i) => {
              const p = entry.profile;
              switch (p.role) {
                case "player": {
                  const pp = p as PlayerProfile;
                  return (
                    <PlayerCard
                      key={entry.id}
                      data={{
                        id: entry.id,
                        name: pp.name,
                        position: pp.positionPrimary,
                        age: pp.dateOfBirth ? getAgeFromDOB(pp.dateOfBirth) : 0,
                        club: pp.currentClub,
                        region: pp.city,
                        rating: 0,
                        status: entry.status,
                      }}
                      index={i}
                    />
                  );
                }
                case "coach": {
                  const cp = p as CoachProfile;
                  return (
                    <CoachCard
                      key={entry.id}
                      data={{
                        id: entry.id,
                        name: cp.name,
                        experience: cp.experienceYears,
                        currentClub: cp.currentClub,
                        city: cp.city,
                        certifications: cp.certifications,
                        specialization: cp.rolesPreferred?.[0] ?? "",
                        status: entry.status,
                      }}
                      index={i}
                    />
                  );
                }
                case "club": {
                  const clp = p as ClubProfile;
                  return (
                    <ClubCard
                      key={entry.id}
                      data={{
                        id: entry.id,
                        clubName: clp.clubName,
                        league: clp.league,
                        region: clp.region,
                        recruitmentFocus: clp.recruitmentFocus,
                        leaguePosition: clp.leagueRecord?.[0]?.position,
                      }}
                      index={i}
                    />
                  );
                }
                case "scout": {
                  const sp = p as ScoutProfile;
                  return (
                    <ScoutCard
                      key={entry.id}
                      data={{
                        id: entry.id,
                        name: sp.name,
                        affiliation: sp.affiliation,
                        regions: sp.regionsOfInterest,
                        positionsLooking: sp.positionsLookingFor,
                      }}
                      index={i}
                    />
                  );
                }
                case "sponsor": {
                  const spp = p as SponsorProfile;
                  return (
                    <SponsorCard
                      key={entry.id}
                      data={{
                        id: entry.id,
                        companyName: spp.companyName,
                        industry: spp.industry,
                        sponsorshipTypes: spp.sponsorshipType,
                        country: spp.country,
                      }}
                      index={i}
                    />
                  );
                }
                default:
                  return null;
              }
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
