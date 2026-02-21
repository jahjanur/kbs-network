"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Building2, Globe, Handshake } from "lucide-react";

const stats = [
    { value: 5000,  suffix: "+", label: "Active Players",  icon: Users,      color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { value: 200,   suffix: "+", label: "Verified Clubs",   icon: Building2,  color: "text-blue-400",    bg: "bg-blue-500/10" },
    { value: 50,    suffix: "+", label: "Countries",         icon: Globe,      color: "text-purple-400",  bg: "bg-purple-500/10" },
    { value: 1200,  suffix: "+", label: "Matches Made",     icon: Handshake,  color: "text-[var(--gold)]", bg: "bg-[var(--gold)]/10" },
];

function useCountUp(target: number, duration = 1600, active = false) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!active) return;
        let current = 0;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, 16);
        return () => clearInterval(timer);
    }, [active, target, duration]);

    return count;
}

function StatCard({ value, suffix, label, icon: Icon, color, bg, index }: {
    value: number; suffix: string; label: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string; bg: string; index: number;
}) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });
    const count = useCountUp(value, 1600, inView);

    return (
        <motion.div
            ref={ref}
            className="relative flex-1 min-w-[160px] glass-card !rounded-2xl px-6 py-7 text-center group"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            {/* Icon */}
            <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${bg} mb-4`}>
                <Icon className={`w-5 h-5 ${color}`} />
            </div>

            {/* Number */}
            <div className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] mb-1.5 tabular-nums tracking-tight">
                {count.toLocaleString()}{suffix}
            </div>

            {/* Label */}
            <div className="text-sm text-[var(--foreground-muted)] font-medium">
                {label}
            </div>

            {/* Subtle gold top accent on hover */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-0 group-hover:w-1/2 bg-gradient-to-r from-transparent via-[var(--gold)]/40 to-transparent transition-all duration-500" />
        </motion.div>
    );
}

export function StatsSection() {
    return (
        <section className="relative py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-4">
                <motion.div
                    className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.3 }}
                >
                    {stats.map((s, i) => (
                        <StatCard key={s.label} {...s} index={i} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
