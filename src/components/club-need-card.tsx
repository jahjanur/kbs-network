"use client";

import { motion } from "framer-motion";
import { Briefcase, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import type { ClubNeed } from "@/lib/user-store";

const URGENCY_COLORS = {
  low: { bg: "bg-blue-500/10", text: "text-blue-500", border: "border-blue-500/30", label: "Low" },
  medium: { bg: "bg-amber-500/10", text: "text-amber-500", border: "border-amber-500/30", label: "Medium" },
  high: { bg: "bg-rose-500/10", text: "text-rose-500", border: "border-rose-500/30", label: "High" },
};

const STATUS_ICONS = {
  open: <Briefcase className="h-3.5 w-3.5" />,
  filled: <CheckCircle2 className="h-3.5 w-3.5" />,
  closed: <XCircle className="h-3.5 w-3.5" />,
};

interface ClubNeedCardProps {
  need: ClubNeed;
  clubName?: string;
  onStatusChange?: (id: string, status: ClubNeed["status"]) => void;
  onDelete?: (id: string) => void;
  showActions?: boolean;
  showApply?: boolean;
  onApply?: (need: ClubNeed) => void;
}

export default function ClubNeedCard({
  need, clubName, onStatusChange, onDelete, showActions, showApply, onApply,
}: ClubNeedCardProps) {
  const urgency = URGENCY_COLORS[need.urgency];

  return (
    <motion.div
      className="glass-card p-4"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm font-bold text-[var(--foreground)]">{need.positionNeeded}</h3>
            <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium border ${urgency.bg} ${urgency.text} ${urgency.border}`}>
              <AlertTriangle className="h-2.5 w-2.5" />
              {urgency.label}
            </span>
            <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium capitalize border ${
              need.status === "open" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/30" :
              need.status === "filled" ? "bg-blue-500/10 text-blue-500 border-blue-500/30" :
              "bg-slate-500/10 text-slate-500 border-slate-500/30"
            }`}>
              {STATUS_ICONS[need.status]}
              {need.status}
            </span>
          </div>

          {clubName && (
            <p className="text-xs text-[var(--foreground-muted)] mt-1">{clubName}</p>
          )}

          {need.description && (
            <p className="text-sm text-[var(--foreground-muted)] mt-2 leading-relaxed">{need.description}</p>
          )}

          <p className="text-[10px] text-[var(--foreground-muted)] mt-2">
            Posted {new Date(need.createdAt).toLocaleDateString("de-AT")}
          </p>
        </div>
      </div>

      {/* Actions for club owner */}
      {showActions && (
        <div className="mt-3 flex items-center gap-2 flex-wrap border-t border-[var(--surface-border)] pt-3">
          {need.status === "open" && (
            <>
              <button
                type="button"
                onClick={() => onStatusChange?.(need.id, "filled")}
                className="rounded-lg bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-500 hover:bg-emerald-500/20 transition-colors"
              >
                Mark filled
              </button>
              <button
                type="button"
                onClick={() => onStatusChange?.(need.id, "closed")}
                className="rounded-lg bg-slate-500/10 px-2.5 py-1 text-xs font-medium text-slate-500 hover:bg-slate-500/20 transition-colors"
              >
                Close
              </button>
            </>
          )}
          {need.status !== "open" && (
            <button
              type="button"
              onClick={() => onStatusChange?.(need.id, "open")}
              className="rounded-lg bg-[var(--gold)]/10 px-2.5 py-1 text-xs font-medium text-[var(--gold)] hover:bg-[var(--gold)]/20 transition-colors"
            >
              Reopen
            </button>
          )}
          <button
            type="button"
            onClick={() => onDelete?.(need.id)}
            className="rounded-lg bg-rose-500/10 px-2.5 py-1 text-xs font-medium text-rose-500 hover:bg-rose-500/20 transition-colors"
          >
            Delete
          </button>
        </div>
      )}

      {/* Apply button for players/coaches */}
      {showApply && need.status === "open" && (
        <div className="mt-3 border-t border-[var(--surface-border)] pt-3">
          <button
            type="button"
            onClick={() => onApply?.(need)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--gold)]/10 px-3 py-1.5 text-xs font-medium text-[var(--gold)] hover:bg-[var(--gold)]/20 transition-colors"
          >
            <Briefcase className="h-3 w-3" />
            Apply
          </button>
        </div>
      )}
    </motion.div>
  );
}
