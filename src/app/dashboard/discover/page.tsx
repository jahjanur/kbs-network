"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  Clock,
  Users,
  Building2,
  GraduationCap,
  Eye,
  Sparkles,
  MapPin,
  Crosshair,
  RotateCcw,
} from "lucide-react";
import { PlayerCard } from "@/components/player-card";
import CoachCard from "@/components/coach-card";
import ClubCard from "@/components/club-card";
import ScoutCard from "@/components/scout-card";
import SponsorCard from "@/components/sponsor-card";
import { AustriaMap, PROVINCES } from "@/components/austria-map";
import { PitchPositionSelector } from "@/components/pitch-position-selector";
import { Button } from "@/components/ui/button";
import { getStoredRole } from "@/lib/user-store";
import { getAllowedDiscoverTabs } from "@/lib/permissions";
import type { DiscoverTab } from "@/lib/permissions";
import {
  searchProfiles,
  getProfilesByType,
  getAgeFromDOB,
} from "@/lib/mock-directory";
import type { DirectoryEntry } from "@/lib/mock-directory";
import type {
  PlayerProfile,
  CoachProfile,
  ClubProfile,
  ScoutProfile,
  SponsorProfile,
} from "@/lib/user-store";

/* ── Constants ───────────────────────────────────────────── */

const TAB_TO_TYPE: Record<string, string> = {
  Players: "player",
  Coaches: "coach",
  Clubs: "club",
  Scouts: "scout",
  Sponsors: "sponsor",
};

const TAB_META: Record<
  string,
  { icon: typeof Users; count: number; color: string }
> = {
  Players: { icon: Users, count: 8, color: "emerald" },
  Coaches: { icon: GraduationCap, count: 5, color: "blue" },
  Clubs: { icon: Building2, count: 5, color: "amber" },
  Scouts: { icon: Eye, count: 3, color: "violet" },
  Sponsors: { icon: Sparkles, count: 3, color: "rose" },
  Jobs: { icon: Clock, count: 0, color: "gold" },
};

const STATUS_CHIPS = [
  { value: "available", label: "Available", dot: "bg-emerald-500" },
  { value: "looking", label: "Actively Looking", dot: "bg-amber-500" },
  { value: "open_to_offers", label: "Open to Offers", dot: "bg-blue-500" },
  { value: "under_contract", label: "Under Contract", dot: "bg-violet-500" },
];

/* ── Page ────────────────────────────────────────────────── */

export default function DashboardDiscoverPage() {
  const [tabs, setTabs] = useState<DiscoverTab[]>([
    "Players",
    "Coaches",
    "Clubs",
    "Jobs",
  ]);
  const [active, setActive] = useState<DiscoverTab>("Players");
  const [search, setSearch] = useState("");

  // Filters
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [selectedProvinceName, setSelectedProvinceName] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  // Visual filter panel state
  const [filterView, setFilterView] = useState<"map" | "pitch" | null>(null);

  useEffect(() => {
    const role = getStoredRole();
    if (role) {
      const allowed = getAllowedDiscoverTabs(role);
      setTabs(allowed);
      if (!allowed.includes(active)) {
        setActive(allowed[0] ?? "Players");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const profileType = TAB_TO_TYPE[active];

  const entries: DirectoryEntry[] = useMemo(() => {
    if (!profileType) return [];

    const type = profileType as
      | "player"
      | "coach"
      | "club"
      | "scout"
      | "sponsor";
    let results = search ? searchProfiles(search, type) : getProfilesByType(type);

    // City filter (more specific) takes priority over province
    if (selectedCity) {
      const q = selectedCity.toLowerCase();
      results = results.filter((entry) => {
        const p = entry.profile;
        if ("city" in p)
          return (p as { city: string }).city.toLowerCase().includes(q);
        if ("region" in p)
          return (p as { region: string }).region.toLowerCase().includes(q);
        return false;
      });
    } else if (selectedProvinceName) {
      // Province filter (broader)
      const q = selectedProvinceName.toLowerCase();
      results = results.filter((entry) => {
        const p = entry.profile;
        if ("city" in p)
          return (p as { city: string }).city.toLowerCase().includes(q);
        if ("region" in p)
          return (p as { region: string }).region.toLowerCase().includes(q);
        return true;
      });
    }

    // Position filter (players only)
    if (selectedPosition && profileType === "player") {
      results = results.filter((entry) => {
        const p = entry.profile as PlayerProfile;
        return (
          p.positionPrimary === selectedPosition ||
          p.positionsSecondary?.includes(selectedPosition)
        );
      });
    }

    // Status filter
    if (selectedStatus) {
      results = results.filter((entry) => entry.status === selectedStatus);
    }

    return results;
  }, [profileType, search, selectedProvinceName, selectedCity, selectedPosition, selectedStatus]);

  const activeFilterCount = [
    selectedProvinceName,
    selectedCity,
    selectedPosition,
    selectedStatus,
  ].filter(Boolean).length;

  function clearAllFilters() {
    setSelectedProvince(null);
    setSelectedProvinceName(null);
    setSelectedCity(null);
    setSelectedPosition(null);
    setSelectedStatus(null);
  }

  function handleProvinceSelect(id: string, name: string) {
    if (selectedProvince === id) {
      setSelectedProvince(null);
      setSelectedProvinceName(null);
      setSelectedCity(null);
    } else {
      setSelectedProvince(id);
      setSelectedProvinceName(name);
      setSelectedCity(null);
    }
  }

  function handleCitySelect(city: string) {
    setSelectedCity(city || null);
  }

  const showPositionFilter = active === "Players";
  const showStatusFilter = active === "Players" || active === "Coaches";

  return (
    <div className="space-y-6 pb-8">
      {/* ── Header ────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              <span className="text-gradient-gold">Discover</span>
            </h1>
            <p className="mt-1.5 text-sm text-[var(--foreground-muted)] sm:text-base">
              Find and connect with football professionals across Austria
            </p>
          </div>

          {/* Quick stats pills */}
          <div className="flex items-center gap-2">
            {[
              { icon: Users, label: "Players", count: "8" },
              { icon: Building2, label: "Clubs", count: "5" },
              { icon: GraduationCap, label: "Coaches", count: "5" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-1.5 rounded-lg border border-[var(--surface-border)] bg-[var(--surface)] px-2.5 py-1.5"
              >
                <stat.icon className="h-3.5 w-3.5 text-[var(--gold)]" />
                <span className="text-xs font-semibold text-[var(--foreground)]">
                  {stat.count}
                </span>
                <span className="hidden text-xs text-[var(--foreground-muted)] sm:inline">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Search + filter toggles ────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="space-y-3"
      >
        {/* Search bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-[var(--foreground-subtle)]" />
          <input
            type="text"
            placeholder={`Search ${active.toLowerCase()} by name, position, city...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pl-11 h-12 text-sm"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-[var(--foreground-subtle)] hover:bg-[var(--surface)] hover:text-[var(--foreground)] transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Filter toggle buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <FilterToggle
            icon={<MapPin className="h-3.5 w-3.5" />}
            label="Region"
            active={filterView === "map"}
            badge={selectedCity ?? selectedProvinceName}
            onClick={() =>
              setFilterView((v) => (v === "map" ? null : "map"))
            }
          />
          {showPositionFilter && (
            <FilterToggle
              icon={<Crosshair className="h-3.5 w-3.5" />}
              label="Position"
              active={filterView === "pitch"}
              badge={selectedPosition}
              onClick={() =>
                setFilterView((v) => (v === "pitch" ? null : "pitch"))
              }
            />
          )}

          {/* Status chips */}
          {showStatusFilter && (
            <>
              <div className="h-5 w-px bg-[var(--surface-border)] mx-1 hidden sm:block" />
              {STATUS_CHIPS.map((s) => (
                <button
                  key={s.value}
                  onClick={() =>
                    setSelectedStatus(
                      selectedStatus === s.value ? null : s.value
                    )
                  }
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 border ${
                    selectedStatus === s.value
                      ? "border-[var(--gold)]/40 bg-[var(--gold)]/10 text-[var(--gold)]"
                      : "border-[var(--surface-border)] bg-[var(--surface)] text-[var(--foreground-muted)] hover:border-[var(--gold)]/20 hover:text-[var(--foreground)]"
                  }`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
                  {s.label}
                </button>
              ))}
            </>
          )}

          {/* Clear all */}
          {activeFilterCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium text-[var(--accent-rose)] hover:bg-[var(--accent-rose)]/10 transition-colors"
            >
              <RotateCcw className="h-3 w-3" />
              Clear ({activeFilterCount})
            </button>
          )}
        </div>
      </motion.div>

      {/* ── Visual filter panels (Map / Pitch) ─────────────── */}
      <AnimatePresence mode="wait">
        {filterView === "map" && (
          <motion.div
            key="map-filter"
            className="glass-card overflow-hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="p-5 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-semibold text-[var(--foreground)] flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[var(--gold)]" />
                    Filter by Province
                  </h3>
                  <p className="text-xs text-[var(--foreground-muted)] mt-0.5">
                    Click a province to filter results — click again to deselect
                  </p>
                </div>
                {selectedProvinceName && (
                  <span className="rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/20 px-3 py-1 text-xs font-semibold text-[var(--gold)]">
                    {selectedCity ? `${selectedProvinceName} › ${selectedCity}` : selectedProvinceName}
                  </span>
                )}
              </div>
              <div className="max-w-2xl mx-auto">
                <AustriaMap
                  onSelect={handleProvinceSelect}
                  onCitySelect={handleCitySelect}
                  selectedId={selectedProvince}
                  selectedCity={selectedCity}
                />
              </div>
            </div>
          </motion.div>
        )}

        {filterView === "pitch" && showPositionFilter && (
          <motion.div
            key="pitch-filter"
            className="glass-card overflow-hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="p-5 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-semibold text-[var(--foreground)] flex items-center gap-2">
                    <Crosshair className="h-4 w-4 text-[var(--gold)]" />
                    Filter by Position
                  </h3>
                  <p className="text-xs text-[var(--foreground-muted)] mt-0.5">
                    Tap a position on the pitch to filter players
                  </p>
                </div>
                {selectedPosition && (
                  <span className="rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/20 px-3 py-1 text-xs font-semibold text-[var(--gold)]">
                    {selectedPosition}
                  </span>
                )}
              </div>
              <div className="py-2 pb-10">
                <PitchPositionSelector
                  selected={selectedPosition}
                  onSelect={setSelectedPosition}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Category tabs ─────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {tabs.map((tab) => {
            const meta = TAB_META[tab] ?? TAB_META.Players;
            const Icon = meta.icon;
            const isActive = active === tab;

            return (
              <button
                key={tab}
                onClick={() => {
                  setActive(tab);
                  setSelectedPosition(null);
                  setSelectedStatus(null);
                  if (tab !== "Players") setFilterView((v) => v === "pitch" ? null : v);
                }}
                className={`relative flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? "text-[#0a0e17] dark:text-[#0a0e17]"
                    : "text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface)]"
                }`}
              >
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#d4a017] to-[#f5c518] dark:from-[#f5a623] dark:to-[#ffd740]"
                    layoutId="discover-tab"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    style={{ zIndex: 0 }}
                  />
                )}
                <Icon className="relative z-10 h-4 w-4" />
                <span className="relative z-10">{tab}</span>
                {meta.count > 0 && (
                  <span
                    className={`relative z-10 rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                      isActive
                        ? "bg-[#0a0e17]/15 text-[#0a0e17]"
                        : "bg-[var(--surface)] text-[var(--foreground-muted)]"
                    }`}
                  >
                    {meta.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* ── Active filters summary ─────────────────────────── */}
      {activeFilterCount > 0 && (
        <motion.div
          className="flex flex-wrap items-center gap-2"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <span className="text-xs text-[var(--foreground-subtle)]">
            Active filters:
          </span>
          {selectedProvinceName && (
            <FilterChip
              label={selectedCity ? `${selectedProvinceName} › ${selectedCity}` : selectedProvinceName}
              onRemove={() => {
                setSelectedProvince(null);
                setSelectedProvinceName(null);
                setSelectedCity(null);
              }}
            />
          )}
          {selectedPosition && (
            <FilterChip
              label={`Position: ${selectedPosition}`}
              onRemove={() => setSelectedPosition(null)}
            />
          )}
          {selectedStatus && (
            <FilterChip
              label={STATUS_CHIPS.find((s) => s.value === selectedStatus)?.label ?? selectedStatus}
              onRemove={() => setSelectedStatus(null)}
            />
          )}
        </motion.div>
      )}

      {/* ── Results header ────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-[var(--foreground-muted)]">
          {active === "Jobs" ? (
            "Job board"
          ) : (
            <>
              <span className="font-semibold text-[var(--foreground)]">
                {entries.length}
              </span>{" "}
              {entries.length === 1
                ? active.slice(0, -1).toLowerCase()
                : active.toLowerCase()}{" "}
              found
              {(search || activeFilterCount > 0) && (
                <span className="text-[var(--foreground-subtle)]">
                  {" "}
                  with current filters
                </span>
              )}
            </>
          )}
        </p>
      </div>

      {/* ── Content grid ──────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {active === "Jobs" ? (
          <motion.div
            key="jobs"
            className="glass-card p-12 sm:p-16 text-center"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--gold)]/10 border border-[var(--gold)]/20">
              <Clock className="h-8 w-8 text-[var(--gold)]" />
            </div>
            <h3 className="text-xl font-bold text-[var(--foreground)]">
              Job board coming soon
            </h3>
            <p className="mt-2 max-w-md mx-auto text-sm text-[var(--foreground-muted)]">
              Club needs and job opportunities will appear here. Stay tuned for
              updates.
            </p>
          </motion.div>
        ) : entries.length === 0 ? (
          <motion.div
            key="empty"
            className="glass-card p-12 sm:p-16 text-center"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--surface)] border border-[var(--surface-border)]">
              <Search className="h-8 w-8 text-[var(--foreground-subtle)]" />
            </div>
            <h3 className="text-xl font-bold text-[var(--foreground)]">
              No results found
            </h3>
            <p className="mt-2 max-w-md mx-auto text-sm text-[var(--foreground-muted)]">
              Try adjusting your search or filters to find what you&apos;re
              looking for.
            </p>
            {(search || activeFilterCount > 0) && (
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() => {
                  setSearch("");
                  clearAllFilters();
                }}
              >
                <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
                Clear all filters
              </Button>
            )}
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
                        age: pp.dateOfBirth
                          ? getAgeFromDOB(pp.dateOfBirth)
                          : 0,
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

/* ── Sub-components ───────────────────────────────────────── */

function FilterToggle({
  icon,
  label,
  active,
  badge,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  badge?: string | null;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-medium transition-all duration-200 border ${
        active
          ? "border-[var(--gold)]/40 bg-[var(--gold)]/10 text-[var(--gold)] shadow-[0_0_12px_var(--gold-glow)]"
          : badge
            ? "border-[var(--gold)]/25 bg-[var(--gold)]/5 text-[var(--gold)]"
            : "border-[var(--surface-border)] bg-[var(--surface)] text-[var(--foreground-muted)] hover:border-[var(--gold)]/20 hover:text-[var(--foreground)]"
      }`}
    >
      {icon}
      {label}
      {badge && (
        <span className="rounded-md bg-[var(--gold)]/15 px-1.5 py-0.5 text-[10px] font-bold">
          {badge}
        </span>
      )}
    </button>
  );
}

function FilterChip({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-[var(--gold)]/20 bg-[var(--gold)]/5 px-2.5 py-1 text-xs font-medium text-[var(--gold)]">
      {label}
      <button
        onClick={onRemove}
        className="ml-0.5 rounded-full p-0.5 hover:bg-[var(--gold)]/15 transition-colors"
      >
        <X className="h-3 w-3" />
      </button>
    </span>
  );
}
