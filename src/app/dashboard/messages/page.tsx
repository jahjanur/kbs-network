"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Send, Inbox, MessageCircle, Check, Clock, XCircle } from "lucide-react";
import { getContactRequests, getStoredRole, getUserId } from "@/lib/user-store";
import type { ContactRequest } from "@/lib/user-store";
import { getContactRequestLimit } from "@/lib/permissions";
import type { Role } from "@/lib/permissions";
import { Button } from "@/components/ui/button";

const STATUS_BADGE: Record<ContactRequest["status"], { icon: React.ReactNode; color: string; label: string }> = {
  pending: { icon: <Clock className="h-3 w-3" />, color: "bg-amber-500/10 text-amber-500 border-amber-500/30", label: "Pending" },
  accepted: { icon: <Check className="h-3 w-3" />, color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/30", label: "Accepted" },
  declined: { icon: <XCircle className="h-3 w-3" />, color: "bg-rose-500/10 text-rose-500 border-rose-500/30", label: "Declined" },
};

const PROFILE_TYPE_GRADIENT: Record<string, string> = {
  player: "from-[var(--gold)] to-amber-600",
  coach: "from-blue-500 to-blue-700",
  club: "from-emerald-500 to-emerald-700",
  scout: "from-violet-500 to-violet-700",
  sponsor: "from-rose-500 to-rose-700",
};

export default function DashboardMessagesPage() {
  const [tab, setTab] = useState<"sent" | "received">("sent");
  const [requests, setRequests] = useState<ContactRequest[]>([]);
  const [role, setRole] = useState<Role | null>(null);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const r = getStoredRole() as Role | null;
    setRole(r);
    setUserId(getUserId());
    setRequests(getContactRequests());
  }, []);

  const sentRequests = requests.filter((r) => r.fromUserId === userId);
  const receivedRequests = requests.filter((r) => r.toUserId === userId);
  const limit = role ? getContactRequestLimit(role) : 0;
  const remaining = Math.max(0, limit - sentRequests.length);

  const activeList = tab === "sent" ? sentRequests : receivedRequests;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl font-extrabold tracking-tight text-[var(--foreground)]">Messages</h1>
        <p className="mt-1 text-sm text-[var(--foreground-muted)]">
          Contact requests and conversations
        </p>
      </motion.div>

      {/* Counter badge */}
      <motion.div
        className="mt-4 inline-flex items-center gap-2 rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] px-4 py-2"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.05 }}
      >
        <Send className="h-3.5 w-3.5 text-[var(--gold)]" />
        <span className="text-xs text-[var(--foreground-muted)]">
          {remaining} of {limit} contact requests remaining
        </span>
      </motion.div>

      {/* Tabs */}
      <motion.div
        className="mt-6 mb-6"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="inline-flex rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] p-1">
          <button
            onClick={() => setTab("sent")}
            className={`relative flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
              tab === "sent"
                ? "bg-[var(--gold)]/15 text-[var(--gold)]"
                : "text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
            }`}
          >
            <Send className="h-3.5 w-3.5" />
            Sent ({sentRequests.length})
          </button>
          <button
            onClick={() => setTab("received")}
            className={`relative flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
              tab === "received"
                ? "bg-[var(--gold)]/15 text-[var(--gold)]"
                : "text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
            }`}
          >
            <Inbox className="h-3.5 w-3.5" />
            Received ({receivedRequests.length})
          </button>
        </div>
      </motion.div>

      {/* Request list */}
      <div className="space-y-3">
        {activeList.length === 0 ? (
          <motion.div
            className="glass-card p-12 text-center"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 border border-blue-500/20">
              <MessageCircle className="h-7 w-7 text-blue-400" />
            </div>
            <h3 className="font-semibold text-[var(--foreground)]">
              {tab === "sent" ? "No sent requests" : "No received requests"}
            </h3>
            <p className="mt-1 text-sm text-[var(--foreground-muted)]">
              {tab === "sent"
                ? "Visit a profile to send a contact request."
                : "When someone sends you a contact request, it will appear here."
              }
            </p>
            {tab === "sent" && (
              <Button variant="primary" size="sm" className="mt-4 rounded-full" asChild>
                <Link href="/dashboard/discover">Discover profiles</Link>
              </Button>
            )}
          </motion.div>
        ) : (
          activeList.map((req) => {
            const badge = STATUS_BADGE[req.status];
            const gradient = PROFILE_TYPE_GRADIENT[req.toProfileType] ?? PROFILE_TYPE_GRADIENT.player;

            return (
              <motion.div
                key={req.id}
                className="glass-card p-4"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <Link href={`/dashboard/profile/${req.toUserId}`}>
                    <div className={`h-10 w-10 shrink-0 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                      <span className="text-xs font-bold text-white">
                        {req.toName.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                      </span>
                    </div>
                  </Link>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Link href={`/dashboard/profile/${req.toUserId}`} className="text-sm font-semibold text-[var(--foreground)] hover:text-[var(--gold)] transition-colors">
                        {req.toName}
                      </Link>
                      <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium ${badge.color}`}>
                        {badge.icon} {badge.label}
                      </span>
                      <span className="rounded-full bg-[var(--surface)] border border-[var(--surface-border)] px-2 py-0.5 text-[10px] font-medium text-[var(--foreground-muted)] capitalize">
                        {req.toProfileType}
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm text-[var(--foreground-muted)] leading-relaxed">{req.message}</p>
                    <p className="mt-1.5 text-[10px] text-[var(--foreground-muted)]">
                      {new Date(req.createdAt).toLocaleDateString("de-AT", { day: "2-digit", month: "2-digit", year: "numeric" })}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}
