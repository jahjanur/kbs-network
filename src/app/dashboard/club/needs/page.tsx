"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getStoredRole, getClubNeeds, addClubNeed, updateClubNeed, removeClubNeed,
} from "@/lib/user-store";
import type { ClubNeed } from "@/lib/user-store";
import { POSITIONS } from "@/lib/football-positions";
import ClubNeedCard from "@/components/club-need-card";

const URGENCY_OPTIONS: ClubNeed["urgency"][] = ["low", "medium", "high"];

export default function ClubNeedsPage() {
  const router = useRouter();
  const [needs, setNeeds] = useState<ClubNeed[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [position, setPosition] = useState("");
  const [description, setDescription] = useState("");
  const [urgency, setUrgency] = useState<ClubNeed["urgency"]>("medium");

  useEffect(() => {
    const role = getStoredRole();
    if (role !== "club") { router.replace("/dashboard"); return; }
    setNeeds(getClubNeeds());
  }, [router]);

  function handleAdd() {
    if (!position) return;
    addClubNeed({ positionNeeded: position, description, urgency, status: "open" });
    setNeeds(getClubNeeds());
    setPosition("");
    setDescription("");
    setUrgency("medium");
    setShowForm(false);
  }

  function handleStatusChange(id: string, status: ClubNeed["status"]) {
    updateClubNeed(id, { status });
    setNeeds(getClubNeeds());
  }

  function handleDelete(id: string) {
    removeClubNeed(id);
    setNeeds(getClubNeeds());
  }

  const openCount = needs.filter((n) => n.status === "open").length;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <motion.div
        className="flex items-center justify-between mb-6"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-[var(--foreground)]">Club Needs</h1>
          <p className="mt-1 text-sm text-[var(--foreground-muted)]">
            {openCount} open {openCount === 1 ? "position" : "positions"} · {needs.length} total
          </p>
        </div>
        <Button variant="primary" size="sm" onClick={() => setShowForm(!showForm)}>
          {showForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {showForm ? "Cancel" : "Post a need"}
        </Button>
      </motion.div>

      {/* Add form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            className="glass-card p-6 mb-6"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-sm font-bold text-[var(--foreground)] mb-4">New Position Need</h3>

            <div className="space-y-4">
              {/* Position select */}
              <div>
                <label className="text-xs font-semibold text-[var(--foreground-muted)] uppercase tracking-wider">Position needed</label>
                <select
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] px-4 py-2.5 text-sm text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/30"
                >
                  <option value="">Select position...</option>
                  {POSITIONS.map((pos) => (
                    <option key={pos.id} value={`${pos.abbr} — ${pos.label}`}>
                      {pos.abbr} — {pos.label}
                    </option>
                  ))}
                  <option value="Head Coach">Head Coach</option>
                  <option value="Assistant Coach">Assistant Coach</option>
                  <option value="Youth Coach">Youth Coach</option>
                  <option value="Goalkeeper Coach">Goalkeeper Coach</option>
                  <option value="Fitness Coach">Fitness Coach</option>
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="text-xs font-semibold text-[var(--foreground-muted)] uppercase tracking-wider">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe what you're looking for..."
                  rows={3}
                  className="mt-1 w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] px-4 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--foreground-muted)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/30 resize-none"
                />
              </div>

              {/* Urgency */}
              <div>
                <label className="text-xs font-semibold text-[var(--foreground-muted)] uppercase tracking-wider">Urgency</label>
                <div className="mt-2 flex gap-2">
                  {URGENCY_OPTIONS.map((u) => (
                    <button
                      key={u}
                      type="button"
                      onClick={() => setUrgency(u)}
                      className={`rounded-lg px-4 py-2 text-xs font-medium capitalize border transition-all ${
                        urgency === u
                          ? u === "low" ? "bg-blue-500/15 text-blue-500 border-blue-500/40" :
                            u === "medium" ? "bg-amber-500/15 text-amber-500 border-amber-500/40" :
                            "bg-rose-500/15 text-rose-500 border-rose-500/40"
                          : "bg-[var(--surface)] text-[var(--foreground-muted)] border-[var(--surface-border)]"
                      }`}
                    >
                      {u}
                    </button>
                  ))}
                </div>
              </div>

              <Button variant="primary" onClick={handleAdd} disabled={!position}>
                Post need
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Needs list */}
      <div className="space-y-3">
        {needs.length === 0 ? (
          <motion.div
            className="glass-card p-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h3 className="text-lg font-semibold text-[var(--foreground)]">No needs posted yet</h3>
            <p className="mt-2 text-sm text-[var(--foreground-muted)]">
              Post your first position need to start receiving applications from players and coaches.
            </p>
          </motion.div>
        ) : (
          needs.map((need) => (
            <ClubNeedCard
              key={need.id}
              need={need}
              showActions
              onStatusChange={handleStatusChange}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}
