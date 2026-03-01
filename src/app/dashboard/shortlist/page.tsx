"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Filter } from "lucide-react";
import { getShortlist, getStoredRole } from "@/lib/user-store";
import type { ShortlistEntry, ProfileType } from "@/lib/user-store";
import { canPerformAction } from "@/lib/permissions";
import type { Role } from "@/lib/permissions";
import { getProfileById, getProfileDisplayName } from "@/lib/mock-directory";
import ShortlistButton from "@/components/shortlist-button";
import Link from "next/link";

const TYPE_COLORS: Record<ProfileType, { bg: string; text: string; border: string }> = {
  player: { bg: "bg-[var(--gold)]/10", text: "text-[var(--gold)]", border: "border-[var(--gold)]/30" },
  coach: { bg: "bg-blue-500/10", text: "text-blue-500", border: "border-blue-500/30" },
  club: { bg: "bg-emerald-500/10", text: "text-emerald-500", border: "border-emerald-500/30" },
  scout: { bg: "bg-violet-500/10", text: "text-violet-500", border: "border-violet-500/30" },
  sponsor: { bg: "bg-rose-500/10", text: "text-rose-500", border: "border-rose-500/30" },
};

const GRADIENT: Record<ProfileType, string> = {
  player: "from-[var(--gold)] to-amber-600",
  coach: "from-blue-500 to-blue-700",
  club: "from-emerald-500 to-emerald-700",
  scout: "from-violet-500 to-violet-700",
  sponsor: "from-rose-500 to-rose-700",
};

export default function ShortlistPage() {
  const [items, setItems] = useState<ShortlistEntry[]>([]);
  const [filter, setFilter] = useState<ProfileType | "all">("all");
  const [role, setRole] = useState<Role | null>(null);

  useEffect(() => {
    setRole(getStoredRole() as Role | null);
    setItems(getShortlist());
  }, []);

  // Re-read after removal
  function refresh() {
    setItems(getShortlist());
  }

  const filtered = filter === "all" ? items : items.filter((e) => e.profileType === filter);
  const types = [...new Set(items.map((e) => e.profileType))];

  if (role && !canPerformAction(role, "create_shortlist")) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <div className="glass-card p-12 text-center">
          <Heart className="mx-auto h-12 w-12 text-[var(--foreground-muted)] opacity-40" />
          <h2 className="mt-4 text-lg font-semibold text-[var(--foreground)]">Shortlist not available</h2>
          <p className="mt-2 text-sm text-[var(--foreground-muted)]">Your role does not have access to the shortlist feature.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl font-extrabold tracking-tight text-[var(--foreground)]">Shortlist</h1>
        <p className="mt-1 text-sm text-[var(--foreground-muted)]">
          Your private collection of saved profiles — {items.length} saved
        </p>
      </motion.div>

      {/* Type filter */}
      {types.length > 1 && (
        <motion.div
          className="mt-6 flex items-center gap-2 flex-wrap"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
        >
          <Filter className="h-4 w-4 text-[var(--foreground-muted)]" />
          <button
            onClick={() => setFilter("all")}
            className={`rounded-full px-3 py-1 text-xs font-medium border transition-colors ${
              filter === "all"
                ? "bg-[var(--gold)]/15 text-[var(--gold)] border-[var(--gold)]/30"
                : "bg-[var(--surface)] text-[var(--foreground-muted)] border-[var(--surface-border)] hover:border-[var(--gold)]/30"
            }`}
          >
            All ({items.length})
          </button>
          {types.map((type) => {
            const count = items.filter((e) => e.profileType === type).length;
            const colors = TYPE_COLORS[type];
            return (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`rounded-full px-3 py-1 text-xs font-medium border capitalize transition-colors ${
                  filter === type
                    ? `${colors.bg} ${colors.text} ${colors.border}`
                    : "bg-[var(--surface)] text-[var(--foreground-muted)] border-[var(--surface-border)] hover:border-[var(--gold)]/30"
                }`}
              >
                {type}s ({count})
              </button>
            );
          })}
        </motion.div>
      )}

      {/* Shortlist items */}
      <div className="mt-6 space-y-3">
        <AnimatePresence>
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              className="glass-card p-12 text-center"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <Heart className="mx-auto h-12 w-12 text-[var(--foreground-muted)] opacity-40" />
              <h3 className="mt-4 text-lg font-semibold text-[var(--foreground)]">No saved profiles</h3>
              <p className="mt-2 text-sm text-[var(--foreground-muted)]">
                Browse Discover and tap the heart icon to save profiles here.
              </p>
              <Link href="/dashboard/discover" className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[var(--gold)]/10 px-4 py-2.5 text-sm font-medium text-[var(--gold)] hover:bg-[var(--gold)]/20 transition-colors">
                Go to Discover
              </Link>
            </motion.div>
          ) : (
            filtered.map((entry) => {
              const profile = getProfileById(entry.profileId);
              if (!profile) return null;
              const name = getProfileDisplayName(profile.profile);
              const gradient = GRADIENT[entry.profileType];
              const colors = TYPE_COLORS[entry.profileType];

              return (
                <motion.div
                  key={entry.profileId}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link href={`/dashboard/profile/${entry.profileId}`} className="group block">
                    <div className="glass-card flex items-center gap-4 p-4 hover:border-[var(--gold)]/30 transition-colors">
                      {/* Avatar */}
                      <div className={`h-12 w-12 shrink-0 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                        <span className="text-sm font-bold text-white">
                          {name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                        </span>
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-[var(--foreground)] truncate group-hover:text-[var(--gold)] transition-colors">{name}</h3>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium capitalize border ${colors.bg} ${colors.text} ${colors.border}`}>
                            {entry.profileType}
                          </span>
                          <span className="text-[10px] text-[var(--foreground-muted)]">
                            Added {new Date(entry.addedAt).toLocaleDateString("de-AT")}
                          </span>
                        </div>
                      </div>

                      {/* Remove button */}
                      <div onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
                        <ShortlistButton
                          profileId={entry.profileId}
                          profileType={entry.profileType}
                          size="sm"
                        />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
