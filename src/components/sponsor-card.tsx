"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Building2, Globe } from "lucide-react";
import ShortlistButton from "./shortlist-button";

export interface SponsorCardData {
  id: string;
  companyName: string;
  industry: string;
  sponsorshipTypes: string[];
  country: string;
}

export default function SponsorCard({ data, index = 0 }: { data: SponsorCardData; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/dashboard/profile/${data.id}`} className="group block">
        <div className="glass-card overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-rose-500/5 hover:-translate-y-1">
          {/* Header gradient */}
          <div className="relative h-20 bg-gradient-to-br from-rose-500 to-rose-700">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, rgba(255,255,255,0.3) 0%, transparent 60%)" }} />
            <div className="absolute top-3 right-3">
              <ShortlistButton profileId={data.id} profileType="sponsor" size="sm" />
            </div>
          </div>

          <div className="relative px-4 pb-4">
            <div className="-mt-8 mb-3">
              <div className="h-14 w-14 rounded-full border-3 border-[var(--card-bg)] bg-gradient-to-br from-rose-500 to-rose-700 flex items-center justify-center shadow-lg">
                <span className="text-lg font-bold text-white">
                  {data.companyName.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                </span>
              </div>
            </div>

            <h3 className="text-sm font-bold text-[var(--foreground)] truncate group-hover:text-rose-500 transition-colors">{data.companyName}</h3>

            <div className="mt-3 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
                <Building2 className="h-3 w-3" />
                <span className="truncate">{data.industry}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
                <Globe className="h-3 w-3" />
                <span>{data.country}</span>
              </div>
            </div>

            {data.sponsorshipTypes.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1">
                {data.sponsorshipTypes.slice(0, 3).map((t) => (
                  <span key={t} className="rounded-full bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 text-[10px] font-medium text-rose-600 dark:text-rose-400">
                    {t}
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
