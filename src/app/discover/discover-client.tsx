"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlayerCard, type PlayerCardData } from "@/components/player-card";
import { Search, SlidersHorizontal, X, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const tabs = ["Players", "Coaches", "Clubs", "Jobs"] as const;

const mockPlayers: PlayerCardData[] = [
  { id: "1", name: "Alex Rivera", position: "ST", age: 22, club: "FC North", region: "Berlin", rating: 84 },
  { id: "2", name: "Marcus Lindberg", position: "CM", age: 24, club: "United South", region: "Munich", rating: 79 },
  { id: "3", name: "Jamie Okonkwo", position: "CB", age: 20, region: "Hamburg", rating: 76 },
  { id: "4", name: "Luca Fischer", position: "LW", age: 21, club: "SV West", region: "Frankfurt", rating: 81 },
  { id: "5", name: "Noah Schmidt", position: "GK", age: 23, club: "FC Central", region: "Stuttgart", rating: 78 },
  { id: "6", name: "Elias Berg", position: "RB", age: 19, region: "Dortmund", rating: 77 },
];

export function DiscoverClient() {
  const [active, setActive] = useState<(typeof tabs)[number]>("Players");
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:py-12">
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
        <div className="inline-flex rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] p-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`relative rounded-lg px-5 py-2 text-sm font-medium transition-all duration-200 ${active === tab
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
            placeholder="Search by name, position, region..."
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
              🚧 Advanced filters coming soon — position, region, age, rating range, and more.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <AnimatePresence mode="wait">
        {active === "Players" ? (
          <motion.div
            key="players"
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {mockPlayers
              .filter((p) =>
                search
                  ? p.name.toLowerCase().includes(search.toLowerCase()) ||
                  p.position.toLowerCase().includes(search.toLowerCase()) ||
                  p.region.toLowerCase().includes(search.toLowerCase())
                  : true
              )
              .map((player, i) => (
                <PlayerCard key={player.id} data={player} index={i} />
              ))}
          </motion.div>
        ) : (
          <motion.div
            key={active}
            className="glass-card p-12 text-center"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--gold)]/10 border border-[var(--gold)]/20">
              {active === "Jobs" ? (
                <Clock className="h-7 w-7 text-[var(--gold)]" />
              ) : (
                <MapPin className="h-7 w-7 text-[var(--gold)]" />
              )}
            </div>
            <h3 className="text-lg font-semibold text-[var(--foreground)]">{active} coming soon</h3>
            <p className="mt-2 text-sm text-[var(--foreground-muted)]">
              We&apos;re working on bringing you the best {active.toLowerCase()} directory.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
