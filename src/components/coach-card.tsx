"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Award, MapPin, Briefcase } from "lucide-react";
import ShortlistButton from "./shortlist-button";
import { getStatusConfig } from "@/lib/permissions";

export interface CoachCardData {
  id: string;
  name: string;
  experience: number;
  currentClub: string;
  city: string;
  certifications: string[];
  specialization: string;
  status?: string;
}

export default function CoachCard({ data, index = 0 }: { data: CoachCardData; index?: number }) {
  const statusCfg = data.status ? getStatusConfig(data.status) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/dashboard/profile/${data.id}`} className="group block">
        <div className="glass-card overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-1">
          {/* Header gradient */}
          <div className="relative h-20 bg-gradient-to-br from-blue-500 to-blue-700">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, rgba(255,255,255,0.3) 0%, transparent 60%)" }} />
            <div className="absolute top-3 right-3">
              <ShortlistButton profileId={data.id} profileType="coach" size="sm" />
            </div>
          </div>

          <div className="relative px-4 pb-4">
            {/* Avatar */}
            <div className="-mt-8 mb-3">
              <div className="h-14 w-14 rounded-full border-3 border-[var(--card-bg)] bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg">
                <span className="text-lg font-bold text-white">
                  {data.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                </span>
              </div>
            </div>

            <h3 className="text-sm font-bold text-[var(--foreground)] truncate group-hover:text-blue-500 transition-colors">{data.name}</h3>

            <div className="mt-1.5 flex items-center gap-2 flex-wrap">
              {statusCfg && (
                <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium border ${
                  statusCfg.color === "emerald" ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30" :
                  statusCfg.color === "amber" ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30" :
                  statusCfg.color === "blue" ? "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30" :
                  statusCfg.color === "violet" ? "bg-violet-500/15 text-violet-600 dark:text-violet-400 border-violet-500/30" :
                  "bg-slate-500/15 text-slate-600 dark:text-slate-400 border-slate-500/30"
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

            <div className="mt-3 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
                <Award className="h-3 w-3" />
                <span>{data.experience} yrs experience</span>
              </div>
              {data.specialization && (
                <div className="flex items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
                  <Briefcase className="h-3 w-3" />
                  <span className="truncate">{data.specialization}</span>
                </div>
              )}
              {(data.city || data.currentClub) && (
                <div className="flex items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
                  <MapPin className="h-3 w-3" />
                  <span className="truncate">{[data.currentClub, data.city].filter(Boolean).join(" · ")}</span>
                </div>
              )}
            </div>

            {/* Certifications */}
            {data.certifications.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1">
                {data.certifications.slice(0, 2).map((c) => (
                  <span key={c} className="rounded-full bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 text-[10px] font-medium text-blue-500">
                    {c}
                  </span>
                ))}
                {data.certifications.length > 2 && (
                  <span className="rounded-full bg-[var(--surface)] border border-[var(--surface-border)] px-2 py-0.5 text-[10px] font-medium text-[var(--foreground-muted)]">
                    +{data.certifications.length - 2}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
