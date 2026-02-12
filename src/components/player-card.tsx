"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";

export interface PlayerCardData {
  id: string;
  name: string;
  position: string;
  age: number;
  club?: string;
  region: string;
  rating: number;
  imageUrl?: string | null;
}

interface PlayerCardProps {
  data: PlayerCardData;
  className?: string;
  index?: number;
}

const positionColors: Record<string, string> = {
  ST: "from-red-500 to-orange-500",
  CF: "from-red-500 to-orange-500",
  LW: "from-emerald-500 to-teal-500",
  RW: "from-emerald-500 to-teal-500",
  CAM: "from-amber-500 to-yellow-500",
  CM: "from-blue-500 to-cyan-500",
  CDM: "from-blue-600 to-blue-400",
  LB: "from-sky-500 to-blue-400",
  RB: "from-sky-500 to-blue-400",
  CB: "from-indigo-500 to-violet-500",
  GK: "from-amber-600 to-yellow-400",
};

export function PlayerCard({ data, className, index = 0 }: PlayerCardProps) {
  const posGradient = positionColors[data.position] || "from-gray-500 to-gray-400";

  return (
    <motion.article
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-[var(--surface-border)] transition-all duration-300 gold-hover cursor-pointer",
        "bg-gradient-to-b from-[#0f172a] via-[#111b36] to-[#0a1128]",
        "dark:from-[#0a1128] dark:via-[#0f172a] dark:to-[#05080f]",
        "min-h-[300px] flex flex-col",
        className
      )}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] as const }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
    >
      {/* Top gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--gold)]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Image area */}
      <div className="relative h-40 w-full">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a2744]/80 to-[#0a1128]" />

        {/* Avatar / placeholder */}
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

        {/* Overlay gradient */}
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

        {/* Rating badge */}
        <motion.div
          className="absolute right-3 top-3 flex h-12 w-12 items-center justify-center rounded-full border-2 border-[var(--gold)] bg-[#0a1128]/90 shadow-[0_0_16px_rgba(245,166,35,0.25)]"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <span className="text-lg font-bold text-gradient-gold bg-gradient-to-b from-[#ffd740] to-[#f5a623] bg-clip-text text-transparent">
            {data.rating}
          </span>
        </motion.div>
      </div>

      {/* Info area */}
      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <h3 className="font-semibold text-white truncate text-base">{data.name}</h3>
          <div className="mt-1.5 flex items-center gap-2 text-sm text-slate-400">
            <span>{data.age} yrs</span>
            <span className="text-slate-600">•</span>
            <span className="truncate">{data.region}</span>
          </div>
        </div>
        {data.club && (
          <p className="mt-2 truncate text-xs text-slate-500 flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]/60" />
            {data.club}
          </p>
        )}
      </div>
    </motion.article>
  );
}
