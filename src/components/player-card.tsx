"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";
import ShortlistButton from "./shortlist-button";
import { getStatusConfig } from "@/lib/permissions";

export interface PlayerCardData {
  id: string;
  name: string;
  position: string;
  age: number;
  club?: string;
  region: string;
  rating: number;
  imageUrl?: string | null;
  status?: string;
}

interface PlayerCardProps {
  data: PlayerCardData;
  className?: string;
  index?: number;
}

const positionColors: Record<string, string> = {
  ST: "from-red-500 to-orange-500",
  MS: "from-red-500 to-orange-500",
  CF: "from-red-500 to-orange-500",
  LF: "from-emerald-500 to-teal-500",
  RF: "from-emerald-500 to-teal-500",
  LW: "from-emerald-500 to-teal-500",
  RW: "from-emerald-500 to-teal-500",
  ZOM: "from-amber-500 to-yellow-500",
  CAM: "from-amber-500 to-yellow-500",
  ZM: "from-blue-500 to-cyan-500",
  CM: "from-blue-500 to-cyan-500",
  ZDM: "from-blue-600 to-blue-400",
  CDM: "from-blue-600 to-blue-400",
  LM: "from-teal-500 to-emerald-400",
  RM: "from-teal-500 to-emerald-400",
  LV: "from-sky-500 to-blue-400",
  RV: "from-sky-500 to-blue-400",
  LB: "from-sky-500 to-blue-400",
  RB: "from-sky-500 to-blue-400",
  IV: "from-indigo-500 to-violet-500",
  CB: "from-indigo-500 to-violet-500",
  TW: "from-amber-600 to-yellow-400",
  GK: "from-amber-600 to-yellow-400",
};

export function PlayerCard({ data, className, index = 0 }: PlayerCardProps) {
  const posGradient = positionColors[data.position] || "from-gray-500 to-gray-400";
  const statusCfg = data.status ? getStatusConfig(data.status) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] as const }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
    >
      <Link href={`/dashboard/profile/${data.id}`} className="block">
        <article
          className={cn(
            "group relative overflow-hidden rounded-2xl border border-[var(--surface-border)] transition-all duration-300 gold-hover cursor-pointer",
            "bg-gradient-to-b from-[#0f172a] via-[#111b36] to-[#0a1128]",
            "dark:from-[#0a1128] dark:via-[#0f172a] dark:to-[#05080f]",
            "min-h-[300px] flex flex-col",
            className
          )}
        >
          {/* Top gradient accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--gold)]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Image area */}
          <div className="relative h-40 w-full">
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a2744]/80 to-[#0a1128]" />

            <div className="flex h-full w-full items-center justify-center relative">
              {data.imageUrl ? (
                <img
                  src={data.imageUrl}
                  alt={data.name}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/20 transition-all group-hover:scale-110 group-hover:border-[var(--gold)]/40">
                  <User className="h-10 w-10 text-[var(--gold)]/60" />
                </div>
              )}
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1128] via-transparent to-transparent" />

            {/* Position badge */}
            <div className="absolute bottom-3 left-3">
              <span className={cn(
                "inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-bold text-white shadow-lg bg-gradient-to-r",
                posGradient
              )}>
                {data.position}
              </span>
            </div>

            {/* Shortlist button */}
            <div className="absolute right-3 top-3 z-10">
              <ShortlistButton profileId={data.id} profileType="player" size="sm" />
            </div>

            {/* Rating badge (only if rating > 0) */}
            {data.rating > 0 && (
              <div className="absolute right-3 bottom-3 flex h-10 w-10 items-center justify-center rounded-full border-2 border-[var(--gold)] bg-[#0a1128]/90 shadow-[0_0_16px_rgba(245,166,35,0.25)]">
                <span className="text-sm font-bold bg-gradient-to-b from-[#ffd740] to-[#f5a623] bg-clip-text text-transparent">
                  {data.rating}
                </span>
              </div>
            )}
          </div>

          {/* Info area */}
          <div className="flex flex-1 flex-col justify-between p-4">
            <div>
              <h3 className="font-semibold text-white truncate text-base">{data.name}</h3>
              <div className="mt-1.5 flex items-center gap-2 text-sm text-slate-400">
                {data.age > 0 && <span>{data.age} yrs</span>}
                {data.age > 0 && data.region && <span className="text-slate-600">·</span>}
                {data.region && <span className="truncate">{data.region}</span>}
              </div>
            </div>

            <div className="mt-2 flex items-center justify-between">
              {data.club && (
                <p className="truncate text-xs text-slate-500 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]/60" />
                  {data.club}
                </p>
              )}
              {statusCfg && (
                <span className={`ml-auto inline-flex items-center gap-1 shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium border ${
                  statusCfg.color === "emerald" ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" :
                  statusCfg.color === "amber" ? "bg-amber-500/15 text-amber-400 border-amber-500/30" :
                  statusCfg.color === "blue" ? "bg-blue-500/15 text-blue-400 border-blue-500/30" :
                  statusCfg.color === "violet" ? "bg-violet-500/15 text-violet-400 border-violet-500/30" :
                  "bg-slate-500/15 text-slate-400 border-slate-500/30"
                }`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${
                    statusCfg.color === "emerald" ? "bg-emerald-500" :
                    statusCfg.color === "amber" ? "bg-amber-500" :
                    statusCfg.color === "blue" ? "bg-blue-500" :
                    statusCfg.color === "violet" ? "bg-violet-500" : "bg-slate-500"
                  }`} />
                  {statusCfg.label}
                </span>
              )}
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
