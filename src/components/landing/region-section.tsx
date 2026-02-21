"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { AustriaMap } from "@/components/austria-map";

export function RegionSection() {
    return (
        <section className="relative py-20 sm:py-28">
            <div className="mx-auto max-w-7xl px-4">
                <motion.div
                    className="text-center mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/20 bg-[var(--gold)]/5 px-3 py-1 text-xs font-medium text-[var(--gold)] mb-4">
                        <MapPin className="h-3 w-3" />
                        Region Filter
                    </span>
                    <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
                        Explore by region
                    </h2>
                    <p className="mt-4 text-[var(--foreground-muted)] text-lg max-w-2xl mx-auto">
                        Click a province to discover players and clubs in your area
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 24, scale: 0.98 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
                >
                    <AustriaMap />
                </motion.div>
            </div>
        </section>
    );
}
