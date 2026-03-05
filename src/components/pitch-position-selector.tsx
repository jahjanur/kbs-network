"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ── Position map on a football pitch ─────────────────────── */

interface PitchPosition {
  id: string;
  label: string;
  /** Percentage-based coordinates on the pitch */
  x: number;
  y: number;
  zone: "attack" | "midfield" | "defense" | "goalkeeper";
}

const POSITIONS: PitchPosition[] = [
  // Attack
  { id: "ST", label: "ST", x: 50, y: 10, zone: "attack" },
  { id: "LW", label: "LW", x: 18, y: 16, zone: "attack" },
  { id: "RW", label: "RW", x: 82, y: 16, zone: "attack" },
  // Attacking mid
  { id: "CAM", label: "CAM", x: 50, y: 28, zone: "midfield" },
  { id: "LM", label: "LM", x: 14, y: 42, zone: "midfield" },
  { id: "RM", label: "RM", x: 86, y: 42, zone: "midfield" },
  // Central mid
  { id: "CM", label: "CM", x: 50, y: 44, zone: "midfield" },
  { id: "CDM", label: "CDM", x: 50, y: 58, zone: "midfield" },
  // Defense
  { id: "LB", label: "LB", x: 16, y: 72, zone: "defense" },
  { id: "CB", label: "CB", x: 50, y: 74, zone: "defense" },
  { id: "RB", label: "RB", x: 84, y: 72, zone: "defense" },
  // Goalkeeper
  { id: "GK", label: "GK", x: 50, y: 91, zone: "goalkeeper" },
];

const ZONE_COLORS: Record<string, string> = {
  attack: "from-red-500 to-orange-500",
  midfield: "from-blue-500 to-cyan-500",
  defense: "from-indigo-500 to-violet-500",
  goalkeeper: "from-amber-500 to-yellow-500",
};

interface PitchPositionSelectorProps {
  selected: string | null;
  onSelect: (position: string | null) => void;
}

export function PitchPositionSelector({ selected, onSelect }: PitchPositionSelectorProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="relative w-full aspect-[68/105] max-w-[280px] mx-auto">
      {/* Pitch SVG */}
      <svg
        viewBox="0 0 680 1050"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Pitch background */}
        <rect
          x="0" y="0" width="680" height="1050" rx="16"
          fill="var(--surface)"
          stroke="var(--surface-border)"
          strokeWidth="2"
        />

        {/* Field lines */}
        <g stroke="var(--foreground-subtle)" strokeWidth="1.5" fill="none" opacity="0.25">
          {/* Outline */}
          <rect x="40" y="40" width="600" height="970" rx="4" />
          {/* Center line */}
          <line x1="40" y1="525" x2="640" y2="525" />
          {/* Center circle */}
          <circle cx="340" cy="525" r="91.5" />
          {/* Center dot */}
          <circle cx="340" cy="525" r="4" fill="var(--foreground-subtle)" />
          {/* Top penalty area */}
          <rect x="148" y="40" width="384" height="165" />
          {/* Top goal area */}
          <rect x="224" y="40" width="232" height="55" />
          {/* Top penalty arc */}
          <path d="M 258 205 A 91.5 91.5 0 0 0 422 205" />
          {/* Top penalty dot */}
          <circle cx="340" cy="160" r="4" fill="var(--foreground-subtle)" />
          {/* Bottom penalty area */}
          <rect x="148" y="845" width="384" height="165" />
          {/* Bottom goal area */}
          <rect x="224" y="955" width="232" height="55" />
          {/* Bottom penalty arc */}
          <path d="M 258 845 A 91.5 91.5 0 0 1 422 845" />
          {/* Bottom penalty dot */}
          <circle cx="340" cy="890" r="4" fill="var(--foreground-subtle)" />
          {/* Corner arcs */}
          <path d="M 40 52 A 12 12 0 0 0 52 40" />
          <path d="M 628 40 A 12 12 0 0 0 640 52" />
          <path d="M 40 998 A 12 12 0 0 1 52 1010" />
          <path d="M 628 1010 A 12 12 0 0 1 640 998" />
        </g>

        {/* Zone indicators — subtle background fills */}
        <rect x="40" y="40" width="600" height="240" rx="0" fill="rgba(239, 68, 68, 0.03)" />
        <rect x="40" y="280" width="600" height="300" rx="0" fill="rgba(59, 130, 246, 0.03)" />
        <rect x="40" y="580" width="600" height="280" rx="0" fill="rgba(99, 102, 241, 0.03)" />
        <rect x="40" y="860" width="600" height="150" rx="0" fill="rgba(245, 158, 11, 0.03)" />
      </svg>

      {/* Position dots — absolutely positioned over the SVG */}
      {POSITIONS.map((pos) => {
        const isSelected = selected === pos.id;
        const isHovered = hovered === pos.id;
        const isActive = isSelected || isHovered;
        const gradient = ZONE_COLORS[pos.zone];

        return (
          <motion.button
            key={pos.id}
            type="button"
            className="absolute -translate-x-1/2 -translate-y-1/2 group"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            onClick={() => onSelect(isSelected ? null : pos.id)}
            onMouseEnter={() => setHovered(pos.id)}
            onMouseLeave={() => setHovered(null)}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
          >
            <div
              className={`relative flex items-center justify-center rounded-full transition-all duration-200 ${
                isSelected
                  ? "h-9 w-9 sm:h-10 sm:w-10"
                  : "h-7 w-7 sm:h-8 sm:w-8"
              }`}
            >
              {/* Glow ring */}
              {isActive && (
                <motion.div
                  className={`absolute inset-0 rounded-full bg-gradient-to-br ${gradient} opacity-30`}
                  layoutId={undefined}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1.5, opacity: isSelected ? 0.4 : 0.25 }}
                  transition={{ duration: 0.2 }}
                />
              )}

              {/* Main dot */}
              <div
                className={`relative z-10 flex items-center justify-center rounded-full border text-[9px] sm:text-[10px] font-bold transition-all duration-200 ${
                  isSelected
                    ? `h-9 w-9 sm:h-10 sm:w-10 bg-gradient-to-br ${gradient} text-white border-white/30 shadow-lg`
                    : isHovered
                      ? `h-7 w-7 sm:h-8 sm:w-8 bg-gradient-to-br ${gradient} text-white border-white/20`
                      : "h-7 w-7 sm:h-8 sm:w-8 bg-[var(--surface)] text-[var(--foreground-muted)] border-[var(--surface-border)] hover:border-[var(--gold)]/40"
                }`}
              >
                {pos.label}
              </div>
            </div>
          </motion.button>
        );
      })}

      {/* Legend */}
      <div className="absolute -bottom-8 left-0 right-0 flex items-center justify-center gap-3 text-[9px] text-[var(--foreground-subtle)]">
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-red-500" />ATK
        </span>
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />MID
        </span>
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />DEF
        </span>
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />GK
        </span>
      </div>
    </div>
  );
}
