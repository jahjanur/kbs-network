"use client";

import { motion } from "framer-motion";

const partners = [
    { name: "FC Salzburg",         color: "#d4181f", accent: "rgba(212,24,31,0.15)" },
    { name: "Rapid Vienna",        color: "#00a650", accent: "rgba(0,166,80,0.15)" },
    { name: "Sturm Graz",          color: "#2d2d2d", accent: "rgba(45,45,45,0.15)" },
    { name: "LASK",                color: "#1a1a2e", accent: "rgba(26,26,46,0.15)" },
    { name: "Austria Vienna",      color: "#7b2d8b", accent: "rgba(123,45,139,0.15)" },
    { name: "Wolfsberger AC",      color: "#e30613", accent: "rgba(227,6,19,0.15)" },
    { name: "WSG Tirol",           color: "#004f9f", accent: "rgba(0,79,159,0.15)" },
    { name: "Austria Klagenfurt",  color: "#0057a8", accent: "rgba(0,87,168,0.15)" },
    { name: "TSV Hartberg",        color: "#e63022", accent: "rgba(230,48,34,0.15)" },
    { name: "SCR Altach",          color: "#007a3d", accent: "rgba(0,122,61,0.15)" },
    { name: "SC Austria Lustenau", color: "#005bac", accent: "rgba(0,91,172,0.15)" },
    { name: "Blau-Weiss Linz",    color: "#003f8a", accent: "rgba(0,63,138,0.15)" },
];

export function PartnersMarquee() {
    const doubled = [...partners, ...partners];

    return (
        <section className="relative py-14 overflow-hidden">
            {/* Top separator */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/3 bg-gradient-to-r from-transparent via-[var(--surface-border)] to-transparent" />

            <div className="mx-auto max-w-7xl px-4 mb-8 text-center">
                <motion.p
                    className="text-xs font-semibold text-[var(--foreground-subtle)] uppercase tracking-[0.2em]"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    Trusted by top clubs and academies
                </motion.p>
            </div>

            <div className="relative flex overflow-hidden mask-edge-fade">
                <motion.div
                    className="flex gap-6 sm:gap-8 whitespace-nowrap items-center"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        repeat: Infinity,
                        duration: 40,
                        ease: "linear",
                        repeatType: "loop",
                    }}
                >
                    {doubled.map((partner, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-3 px-4 py-2.5 rounded-full border border-[var(--surface-border)] bg-[var(--card-bg)] opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 hover:border-[var(--gold)]/20 shrink-0 group"
                        >
                            <div
                                className="h-7 w-7 rounded-full flex items-center justify-center text-white text-[9px] font-bold shrink-0 ring-2 ring-white/10 transition-shadow group-hover:ring-[var(--gold)]/30"
                                style={{ backgroundColor: partner.color }}
                            >
                                {partner.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                            </div>
                            <span className="text-sm font-medium text-[var(--foreground-muted)] group-hover:text-[var(--foreground)] transition-colors">
                                {partner.name}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Bottom separator */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-2/3 bg-gradient-to-r from-transparent via-[var(--surface-border)] to-transparent" />
        </section>
    );
}
