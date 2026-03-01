"use client";

import { motion } from "framer-motion";
import { UserPlus, Briefcase, Trophy, Star, Activity } from "lucide-react";

const activities = [
  {
    icon: UserPlus,
    text: "Alex M. joined as Player",
    detail: "Midfielder",
    time: "2m",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    ring: "ring-emerald-500/20",
  },
  {
    icon: Briefcase,
    text: "FC Vienna posted",
    detail: "Head Coach",
    time: "5m",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    ring: "ring-blue-500/20",
  },
  {
    icon: Trophy,
    text: "Rapid Youth updated",
    detail: "Match results",
    time: "12m",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    ring: "ring-amber-500/20",
  },
  {
    icon: Star,
    text: "Scout Sarah saved",
    detail: "3 profiles",
    time: "15m",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    ring: "ring-purple-500/20",
  },
  {
    icon: UserPlus,
    text: "Marco R. joined as",
    detail: "Goalkeeper",
    time: "18m",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    ring: "ring-emerald-500/20",
  },
  {
    icon: Briefcase,
    text: "SV Ried is looking for",
    detail: "Physio",
    time: "22m",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    ring: "ring-blue-500/20",
  },
  {
    icon: UserPlus,
    text: "Lukas P. joined as",
    detail: "Coach",
    time: "25m",
    color: "text-teal-400",
    bg: "bg-teal-500/10",
    ring: "ring-teal-500/20",
  },
  {
    icon: Trophy,
    text: "Academy U18 posted",
    detail: "Tournament stats",
    time: "28m",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    ring: "ring-amber-500/20",
  },
];

const doubled = [...activities, ...activities];

export function LiveTicker() {
  return (
    <div className="w-full overflow-hidden py-3 relative bg-[var(--surface-highlight)]/30">
      {/* Borders */}
      <div className="absolute top-0 left-0 right-0 h-px bg-[var(--surface-border)]" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[var(--surface-border)]" />

      <div className="relative flex max-w-[100vw] overflow-hidden items-center">
        {/* LIVE badge */}
        <div className="absolute left-3 sm:left-4 z-20 shrink-0">
          <div className="flex items-center gap-1.5 bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-bold uppercase tracking-[0.12em] pl-2 pr-2.5 py-1 rounded-full">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-400" />
            </span>
            Live
          </div>
        </div>

        {/* Edge fades */}
        <div className="absolute left-0 top-0 bottom-0 z-10 w-24 sm:w-28 bg-gradient-to-r from-[var(--background)] to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 z-10 w-20 sm:w-24 bg-gradient-to-l from-[var(--background)] to-transparent" />

        <motion.div
          className="flex gap-5 sm:gap-6 whitespace-nowrap pl-24 sm:pl-28"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            duration: 60,
            ease: "linear",
            repeatType: "loop",
          }}
        >
          {doubled.map((activity, i) => {
            const Icon = activity.icon;
            return (
              <div
                key={i}
                className="flex items-center gap-2 shrink-0"
              >
                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-md ${activity.bg} ring-1 ${activity.ring}`}
                >
                  <Icon className={`h-3 w-3 ${activity.color}`} />
                </div>
                <span className="text-[12px] sm:text-[13px] text-[var(--foreground-muted)]">
                  {activity.text}{" "}
                  <span className="font-semibold text-[var(--foreground)]">
                    {activity.detail}
                  </span>
                </span>
                <span className="text-[10px] text-[var(--foreground-subtle)] tabular-nums">
                  {activity.time}
                </span>
                {/* Dot separator */}
                <div className="h-1 w-1 rounded-full bg-[var(--surface-border)] ml-1" />
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
