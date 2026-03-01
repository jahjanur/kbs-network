"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, MapPin, Building2 } from "lucide-react";
import ShortlistButton from "./shortlist-button";

export interface ScoutCardData {
  id: string;
  name: string;
  affiliation: string;
  regions: string[];
  positionsLooking: string[];
}

export default function ScoutCard({ data, index = 0 }: { data: ScoutCardData; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/dashboard/profile/${data.id}`} className="group block">
        <div className="glass-card overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/5 hover:-translate-y-1">
          {/* Header gradient */}
          <div className="relative h-20 bg-gradient-to-br from-violet-500 to-violet-700">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, rgba(255,255,255,0.3) 0%, transparent 60%)" }} />
            <div className="absolute top-3 right-3">
              <ShortlistButton profileId={data.id} profileType="scout" size="sm" />
            </div>
          </div>

          <div className="relative px-4 pb-4">
            <div className="-mt-8 mb-3">
              <div className="h-14 w-14 rounded-full border-3 border-[var(--card-bg)] bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center shadow-lg">
                <Eye className="h-6 w-6 text-white" />
              </div>
            </div>

            <h3 className="text-sm font-bold text-[var(--foreground)] truncate group-hover:text-violet-500 transition-colors">{data.name}</h3>

            <div className="mt-3 space-y-1.5">
              {data.affiliation && (
                <div className="flex items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
                  <Building2 className="h-3 w-3" />
                  <span className="truncate">{data.affiliation}</span>
                </div>
              )}
              {data.regions.length > 0 && (
                <div className="flex items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
                  <MapPin className="h-3 w-3" />
                  <span className="truncate">{data.regions.slice(0, 2).join(", ")}{data.regions.length > 2 ? ` +${data.regions.length - 2}` : ""}</span>
                </div>
              )}
            </div>

            {data.positionsLooking.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1">
                {data.positionsLooking.slice(0, 4).map((p) => (
                  <span key={p} className="rounded-full bg-violet-500/10 border border-violet-500/20 px-2 py-0.5 text-[10px] font-medium text-violet-600 dark:text-violet-400">
                    {p}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
