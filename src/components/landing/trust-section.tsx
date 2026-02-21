"use client";

import { motion } from "framer-motion";
import { Shield, Globe, Zap, Star } from "lucide-react";

const trustItems = [
    { icon: Shield, label: "Verified profiles" },
    { icon: Globe, label: "50+ countries" },
    { icon: Zap, label: "Real-time matching" },
    { icon: Star, label: "5,000+ users" },
];

export function TrustSection() {
    return (
        <section className="relative py-16 bg-[var(--surface-highlight)]/10 border-y border-[var(--surface-border)]">
            <div className="mx-auto max-w-4xl px-4">
                <motion.div
                    className="flex flex-wrap items-center justify-center gap-8 sm:gap-14"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5 }}
                >
                    {trustItems.map((t) => {
                        const Icon = t.icon;
                        return (
                            <div key={t.label} className="flex items-center gap-3 text-sm text-[var(--foreground-muted)]">
                                <Icon className="h-5 w-5 text-[var(--gold)]" />
                                <span className="font-medium">{t.label}</span>
                            </div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
