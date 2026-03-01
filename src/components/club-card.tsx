"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Trophy, MapPin, Users } from "lucide-react";
import ShortlistButton from "./shortlist-button";

export interface ClubCardData {
  id: string;
  clubName: string;
  league: string;
  region: string;
  recruitmentFocus: string[];
  leaguePosition?: number;
}

export default function ClubCard({ data, index = 0 }: { data: ClubCardData; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/dashboard/profile/${data.id}`} className="group block">
        <div className="glass-card overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/5 hover:-translate-y-1">
          {/* Header gradient */}
          <div className="relative h-20 bg-gradient-to-br from-emerald-500 to-emerald-700">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, rgba(255,255,255,0.3) 0%, transparent 60%)" }} />
            <div className="absolute top-3 right-3">
              <ShortlistButton profileId={data.id} profileType="club" size="sm" />
            </div>
            {data.leaguePosition && (
              <div className="absolute bottom-3 left-4 rounded-full bg-white/20 backdrop-blur-sm px-2 py-0.5 text-[10px] font-bold text-white">
                #{data.leaguePosition}
              </div>
            )}
          </div>

          <div className="relative px-4 pb-4">
            {/* Avatar */}
            <div className="-mt-8 mb-3">
              <div className="h-14 w-14 rounded-full border-3 border-[var(--card-bg)] bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-lg">
                <span className="text-lg font-bold text-white">
                  {data.clubName.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                </span>
              </div>
            </div>

            <h3 className="text-sm font-bold text-[var(--foreground)] truncate group-hover:text-emerald-500 transition-colors">{data.clubName}</h3>

            <div className="mt-3 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
                <Trophy className="h-3 w-3" />
                <span className="truncate">{data.league}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
                <MapPin className="h-3 w-3" />
                <span>{data.region}</span>
              </div>
            </div>

            {/* Recruitment Focus Tags */}
            {data.recruitmentFocus.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1">
                {data.recruitmentFocus.slice(0, 3).map((r) => (
                  <span key={r} className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                    {r}
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
