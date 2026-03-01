"use client";

import { motion } from "framer-motion";
import { Shield } from "lucide-react";

const partners = [
  { name: "FC Salzburg", abbr: "RBS", color: "#d4181f" },
  { name: "Rapid Vienna", abbr: "SCR", color: "#00a650" },
  { name: "Sturm Graz", abbr: "STU", color: "#2d2d2d" },
  { name: "LASK", abbr: "LSK", color: "#1a1a2e" },
  { name: "Austria Vienna", abbr: "FAK", color: "#7b2d8b" },
  { name: "Wolfsberger AC", abbr: "WAC", color: "#e30613" },
  { name: "WSG Tirol", abbr: "WSG", color: "#004f9f" },
  { name: "Austria Klagenfurt", abbr: "AKA", color: "#0057a8" },
  { name: "TSV Hartberg", abbr: "TSV", color: "#e63022" },
  { name: "SCR Altach", abbr: "ALT", color: "#007a3d" },
  { name: "SC Austria Lustenau", abbr: "LUS", color: "#005bac" },
  { name: "Blau-Weiss Linz", abbr: "BWL", color: "#003f8a" },
];

export function PartnersMarquee() {
  const doubled = [...partners, ...partners];

  return (
    <section className="relative py-12 sm:py-14 overflow-hidden">
      {/* Section header */}
      <div className="mx-auto max-w-7xl px-4 mb-8">
        <motion.div
          className="flex items-center justify-center gap-3"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="h-px flex-1 max-w-24 bg-gradient-to-r from-transparent to-[var(--surface-border)]" />
          <div className="flex items-center gap-2">
            <Shield className="h-3.5 w-3.5 text-[var(--gold)]" />
            <span className="text-[11px] font-semibold text-[var(--foreground-subtle)] uppercase tracking-[0.2em]">
              Trusted by top clubs & academies
            </span>
          </div>
          <div className="h-px flex-1 max-w-24 bg-gradient-to-l from-transparent to-[var(--surface-border)]" />
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="relative flex overflow-hidden mask-edge-fade">
        <motion.div
          className="flex gap-3 sm:gap-4 whitespace-nowrap items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            duration: 45,
            ease: "linear",
            repeatType: "loop",
          }}
        >
          {doubled.map((partner, i) => (
            <div
              key={i}
              className="flex items-center gap-3 pl-3 pr-4 py-2 rounded-xl border border-[var(--surface-border)] bg-[var(--card-bg)]/50 backdrop-blur-sm shrink-0 transition-all duration-300 hover:border-[var(--gold)]/25 hover:bg-[var(--card-bg)]/80 group"
            >
              {/* Club badge placeholder */}
              <div
                className="h-8 w-8 rounded-lg flex items-center justify-center text-[10px] font-black text-white shrink-0 shadow-sm"
                style={{ backgroundColor: partner.color }}
              >
                {partner.abbr}
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-semibold text-[var(--foreground)] leading-tight group-hover:text-[var(--gold)] transition-colors">
                  {partner.name}
                </span>
                <span className="text-[10px] text-[var(--foreground-subtle)] leading-tight">
                  Austrian Bundesliga
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
