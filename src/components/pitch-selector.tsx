"use client";

import { motion } from "framer-motion";
import { POSITIONS, ZONE_COLORS, type Position } from "@/lib/football-positions";

interface PitchSelectorProps {
  selected: string[];
  primary?: string;
  onSelect: (positionId: string) => void;
  mode: "primary" | "secondary";
}

export function PitchSelector({ selected, primary, onSelect, mode }: PitchSelectorProps) {
  const filteredPositions = mode === "secondary"
    ? POSITIONS.filter((p) => p.id !== primary)
    : POSITIONS;

  return (
    <div className="relative w-full" style={{ paddingBottom: "140%" }}>
      {/* Pitch background */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden border border-[var(--surface-border)]">
        {/* Grass gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, rgba(16,185,129,0.08) 0%, rgba(16,185,129,0.04) 50%, rgba(16,185,129,0.08) 100%)",
            backgroundColor: "var(--card-bg)",
          }}
        />

        {/* Pitch markings */}
        <svg
          viewBox="0 0 200 280"
          className="absolute inset-0 w-full h-full"
          style={{ opacity: 0.15 }}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Outer border */}
          <rect x="10" y="10" width="180" height="260" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--foreground)]" />

          {/* Center line */}
          <line x1="10" y1="140" x2="190" y2="140" stroke="currentColor" strokeWidth="1" className="text-[var(--foreground)]" />

          {/* Center circle */}
          <circle cx="100" cy="140" r="28" fill="none" stroke="currentColor" strokeWidth="1" className="text-[var(--foreground)]" />
          <circle cx="100" cy="140" r="2" fill="currentColor" className="text-[var(--foreground)]" />

          {/* Top penalty box */}
          <rect x="40" y="10" width="120" height="50" fill="none" stroke="currentColor" strokeWidth="1" className="text-[var(--foreground)]" />
          <rect x="65" y="10" width="70" height="20" fill="none" stroke="currentColor" strokeWidth="1" className="text-[var(--foreground)]" />
          <circle cx="100" cy="45" r="2" fill="currentColor" className="text-[var(--foreground)]" />
          {/* Penalty arc */}
          <path d="M 65 60 Q 100 78 135 60" fill="none" stroke="currentColor" strokeWidth="1" className="text-[var(--foreground)]" />

          {/* Bottom penalty box */}
          <rect x="40" y="220" width="120" height="50" fill="none" stroke="currentColor" strokeWidth="1" className="text-[var(--foreground)]" />
          <rect x="65" y="250" width="70" height="20" fill="none" stroke="currentColor" strokeWidth="1" className="text-[var(--foreground)]" />
          <circle cx="100" cy="235" r="2" fill="currentColor" className="text-[var(--foreground)]" />
          {/* Penalty arc */}
          <path d="M 65 220 Q 100 202 135 220" fill="none" stroke="currentColor" strokeWidth="1" className="text-[var(--foreground)]" />

          {/* Corner arcs */}
          <path d="M 10 15 Q 15 10 20 10" fill="none" stroke="currentColor" strokeWidth="1" className="text-[var(--foreground)]" />
          <path d="M 180 10 Q 185 10 190 15" fill="none" stroke="currentColor" strokeWidth="1" className="text-[var(--foreground)]" />
          <path d="M 10 265 Q 15 270 20 270" fill="none" stroke="currentColor" strokeWidth="1" className="text-[var(--foreground)]" />
          <path d="M 180 270 Q 185 270 190 265" fill="none" stroke="currentColor" strokeWidth="1" className="text-[var(--foreground)]" />
        </svg>

        {/* Position markers */}
        {filteredPositions.map((pos) => {
          const isSelected = selected.includes(pos.id);
          const isPrimary = pos.id === primary;
          const zone = ZONE_COLORS[pos.zone];

          return (
            <motion.button
              key={pos.id}
              type="button"
              className="absolute flex flex-col items-center gap-0.5 -translate-x-1/2 -translate-y-1/2 z-10 group"
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              onClick={() => onSelect(pos.id)}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Dot */}
              <div
                className={`relative flex items-center justify-center rounded-full transition-all duration-200 ${
                  isSelected || isPrimary
                    ? "w-9 h-9 sm:w-10 sm:h-10 shadow-lg"
                    : "w-7 h-7 sm:w-8 sm:h-8 opacity-70 group-hover:opacity-100"
                }`}
                style={{
                  backgroundColor: isSelected || isPrimary
                    ? pos.zone === "gk" ? "rgba(245,159,11,0.9)"
                      : pos.zone === "defense" ? "rgba(59,130,246,0.9)"
                      : pos.zone === "midfield" ? "rgba(16,185,129,0.9)"
                      : "rgba(244,63,94,0.9)"
                    : "var(--surface-highlight)",
                  border: isSelected || isPrimary
                    ? "2px solid rgba(255,255,255,0.3)"
                    : "1px solid var(--surface-border)",
                }}
              >
                <span
                  className={`text-[10px] sm:text-xs font-bold leading-none ${
                    isSelected || isPrimary ? "text-white" : "text-[var(--foreground-muted)]"
                  }`}
                >
                  {pos.abbr}
                </span>

                {/* Primary badge */}
                {isPrimary && mode === "secondary" && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[var(--gold)] border border-white flex items-center justify-center">
                    <span className="text-[6px] font-bold text-white">1</span>
                  </div>
                )}
              </div>

              {/* Label on hover */}
              <div className="absolute -bottom-5 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <span className="text-[9px] sm:text-[10px] font-medium text-[var(--foreground-muted)] bg-[var(--card-bg)] px-1.5 py-0.5 rounded border border-[var(--surface-border)]">
                  {pos.label}
                </span>
              </div>
            </motion.button>
          );
        })}

        {/* Zone labels */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[4%] text-[9px] font-semibold uppercase tracking-widest text-rose-400/40">Attack</div>
        <div className="absolute left-1/2 -translate-x-1/2 top-[40%] text-[9px] font-semibold uppercase tracking-widest text-emerald-400/40">Midfield</div>
        <div className="absolute left-1/2 -translate-x-1/2 top-[72%] text-[9px] font-semibold uppercase tracking-widest text-blue-400/40">Defense</div>
        <div className="absolute left-1/2 -translate-x-1/2 top-[88%] text-[9px] font-semibold uppercase tracking-widest text-amber-400/40">GK</div>
      </div>
    </div>
  );
}
