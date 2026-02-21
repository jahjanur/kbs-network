"use client";

import { motion } from "framer-motion";
import { Zap, Shield, MessageSquare, Target, Users, Globe, ArrowRight } from "lucide-react";

const mainFeatures = [
    {
        id: "01",
        title: "AI-Powered Matchmaking",
        description: "Our intelligent algorithm analyzes hundreds of data points to connect players with clubs that perfectly match their playstyle, ambition, and skill level — in seconds.",
        Icon: Zap,
        accentColor: "#f59e0b",
        iconClass: "text-amber-500 dark:text-amber-400",
        iconBg: "rgba(245,159,11,0.12)",
        cardBg: "linear-gradient(135deg, rgba(245,159,11,0.10) 0%, rgba(245,159,11,0.03) 55%, transparent 100%)",
        hoverBg: "linear-gradient(135deg, rgba(245,159,11,0.16) 0%, rgba(245,159,11,0.06) 55%, transparent 100%)",
        badge: "Most Popular",
        badgeClass: "border border-amber-400/30 text-amber-600 dark:text-amber-400 bg-amber-400/10",
        colSpan: "md:col-span-2 md:row-span-2",
        hero: true,
    },
    {
        id: "02",
        title: "Verified Profiles",
        description: "Every profile is authenticated. Clubs and players trust the data they see.",
        Icon: Shield,
        accentColor: "#10b981",
        iconClass: "text-emerald-600 dark:text-emerald-400",
        iconBg: "rgba(16,185,129,0.10)",
        cardBg: "linear-gradient(135deg, rgba(16,185,129,0.08) 0%, rgba(16,185,129,0.02) 55%, transparent 100%)",
        hoverBg: "linear-gradient(135deg, rgba(16,185,129,0.14) 0%, rgba(16,185,129,0.05) 55%, transparent 100%)",
        badge: null,
        badgeClass: "",
        colSpan: "md:col-span-1",
        hero: false,
    },
    {
        id: "03",
        title: "Direct Messaging",
        description: "No intermediaries. Professional, encrypted communication between clubs and players.",
        Icon: MessageSquare,
        accentColor: "#3b82f6",
        iconClass: "text-blue-600 dark:text-blue-400",
        iconBg: "rgba(59,130,246,0.10)",
        cardBg: "linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(59,130,246,0.02) 55%, transparent 100%)",
        hoverBg: "linear-gradient(135deg, rgba(59,130,246,0.14) 0%, rgba(59,130,246,0.05) 55%, transparent 100%)",
        badge: null,
        badgeClass: "",
        colSpan: "md:col-span-1",
        hero: false,
    },
    {
        id: "04",
        title: "Targeted Scouting",
        description: "Filter by position, stats, age, region, and playstyle. Find the exact talent you need with precision tools built for scouts.",
        Icon: Target,
        accentColor: "#8b5cf6",
        iconClass: "text-violet-600 dark:text-violet-400",
        iconBg: "rgba(139,92,246,0.10)",
        cardBg: "linear-gradient(135deg, rgba(139,92,246,0.08) 0%, rgba(139,92,246,0.02) 55%, transparent 100%)",
        hoverBg: "linear-gradient(135deg, rgba(139,92,246,0.14) 0%, rgba(139,92,246,0.05) 55%, transparent 100%)",
        badge: null,
        badgeClass: "",
        colSpan: "md:col-span-2",
        hero: false,
    },
    {
        id: "05",
        title: "Community & Networking",
        description: "Connect with coaches, scouts, clubs, and players across Austria and beyond.",
        Icon: Users,
        accentColor: "#06b6d4",
        iconClass: "text-cyan-600 dark:text-cyan-400",
        iconBg: "rgba(6,182,212,0.10)",
        cardBg: "linear-gradient(135deg, rgba(6,182,212,0.08) 0%, rgba(6,182,212,0.02) 55%, transparent 100%)",
        hoverBg: "linear-gradient(135deg, rgba(6,182,212,0.14) 0%, rgba(6,182,212,0.05) 55%, transparent 100%)",
        badge: null,
        badgeClass: "",
        colSpan: "md:col-span-1",
        hero: false,
    },
];

export function FeaturesSection() {
    return (
        <section className="relative py-24 sm:py-32 overflow-hidden">
            {/* Background glow */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: "radial-gradient(ellipse 70% 50% at 50% 60%, rgba(245,166,35,0.05), transparent 70%)",
                }}
            />

            <div className="mx-auto max-w-7xl px-4">
                {/* Header */}
                <motion.div
                    className="text-center mb-14"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="inline-flex items-center gap-2 text-[var(--gold)] font-semibold text-xs tracking-[0.2em] uppercase mb-4">
                        <span className="h-px w-8 bg-gradient-to-r from-transparent to-[var(--gold)]" />
                        Why choose us
                        <span className="h-px w-8 bg-gradient-to-l from-transparent to-[var(--gold)]" />
                    </span>
                    <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl lg:text-5xl">
                        Built for the{" "}
                        <span className="text-gradient-gold">modern game</span>
                    </h2>
                    <p className="mt-4 text-[var(--foreground-muted)] text-lg max-w-xl mx-auto leading-relaxed">
                        Everything you need to succeed in one premium platform.
                    </p>
                </motion.div>

                {/* Main bento grid */}
                <div className="grid gap-3 md:grid-cols-3 md:grid-rows-[280px_280px_auto] auto-rows-[220px]">
                    {mainFeatures.map((f, i) => {
                        const { Icon } = f;
                        return (
                            <motion.div
                                key={f.id}
                                className={`group relative rounded-2xl overflow-hidden border border-[var(--surface-border)] cursor-default ${f.colSpan}`}
                                style={{
                                    background: f.cardBg,
                                    backgroundColor: "var(--card-bg)",
                                    backgroundBlendMode: "normal",
                                }}
                                initial={{ opacity: 0, y: 28 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: i * 0.07 }}
                            >
                                {/* Colored top border */}
                                <div
                                    className="absolute top-0 left-0 right-0 h-[2px]"
                                    style={{ background: `linear-gradient(90deg, ${f.accentColor}80, ${f.accentColor}, ${f.accentColor}80)` }}
                                />

                                {/* Hover background boost */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                                    style={{ background: f.hoverBg }}
                                />

                                {/* Large faint ID number */}
                                <div
                                    className="absolute -top-2 right-4 font-black text-[88px] leading-none select-none pointer-events-none"
                                    style={{ color: f.accentColor, opacity: 0.07 }}
                                >
                                    {f.id}
                                </div>

                                {/* Border accent on hover */}
                                <div
                                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                                    style={{ boxShadow: `inset 0 0 0 1px ${f.accentColor}40` }}
                                />

                                <div className={`relative z-10 flex flex-col h-full ${f.hero ? "p-8 sm:p-10" : "p-7"}`}>
                                    {/* Icon + badge */}
                                    <div className="flex items-start justify-between mb-auto">
                                        <div
                                            className="inline-flex items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg"
                                            style={{
                                                backgroundColor: f.iconBg,
                                                width: f.hero ? 60 : 48,
                                                height: f.hero ? 60 : 48,
                                                boxShadow: `0 0 0 1px ${f.accentColor}25`,
                                            }}
                                        >
                                            <Icon
                                                className={f.iconClass}
                                                style={{ width: f.hero ? 28 : 22, height: f.hero ? 28 : 22 }}
                                            />
                                        </div>

                                        {f.badge && (
                                            <span className={`text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full ${f.badgeClass}`}>
                                                {f.badge}
                                            </span>
                                        )}
                                    </div>

                                    {/* Text */}
                                    <div className="mt-6">
                                        <h3
                                            className={`font-bold text-[var(--foreground)] leading-snug mb-3 ${f.hero ? "text-2xl sm:text-3xl" : "text-base"}`}
                                        >
                                            {f.title}
                                        </h3>
                                        <p
                                            className={`text-[var(--foreground-muted)] leading-relaxed group-hover:text-[var(--foreground)] transition-colors duration-300 ${f.hero ? "text-base max-w-md" : "text-sm"}`}
                                        >
                                            {f.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Global Opportunities — full-width horizontal banner */}
                <motion.div
                    className="group relative mt-3 rounded-2xl overflow-hidden border border-[var(--surface-border)] cursor-default"
                    style={{
                        background: "linear-gradient(135deg, rgba(244,63,94,0.08) 0%, rgba(244,63,94,0.02) 50%, transparent 100%)",
                        backgroundColor: "var(--card-bg)",
                    }}
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: 0.42 }}
                >
                    {/* Top border */}
                    <div className="absolute top-0 left-0 right-0 h-[2px]"
                        style={{ background: "linear-gradient(90deg, #f43f5e80, #f43f5e, #f43f5e80)" }}
                    />

                    {/* Hover boost */}
                    <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                        style={{ background: "linear-gradient(135deg, rgba(244,63,94,0.13) 0%, rgba(244,63,94,0.05) 50%, transparent 100%)" }}
                    />

                    {/* Faint "06" */}
                    <div
                        className="absolute -top-2 right-6 font-black text-[88px] leading-none select-none pointer-events-none"
                        style={{ color: "#f43f5e", opacity: 0.06 }}
                    >
                        06
                    </div>

                    <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-6 p-7 sm:p-8">
                        {/* Icon */}
                        <div
                            className="shrink-0 inline-flex items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-105"
                            style={{
                                backgroundColor: "rgba(244,63,94,0.10)",
                                width: 56,
                                height: 56,
                                boxShadow: "0 0 0 1px rgba(244,63,94,0.25)",
                            }}
                        >
                            <Globe className="text-rose-600 dark:text-rose-400" style={{ width: 26, height: 26 }} />
                        </div>

                        {/* Text */}
                        <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-3 mb-2">
                                <h3 className="text-xl font-bold text-[var(--foreground)]">
                                    Global Opportunities
                                </h3>
                                <span className="text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full border border-rose-400/30 text-rose-600 dark:text-rose-400 bg-rose-400/10">
                                    Coming Soon
                                </span>
                            </div>
                            <p className="text-sm text-[var(--foreground-muted)] leading-relaxed group-hover:text-[var(--foreground)] transition-colors duration-300 max-w-2xl">
                                Your talent has no borders. Access clubs, academies and leagues from all over the world — through a single platform built for the next generation of football.
                            </p>
                        </div>

                        {/* Arrow hint */}
                        <div
                            className="shrink-0 hidden sm:flex items-center justify-center w-10 h-10 rounded-full border border-[var(--surface-border)] group-hover:border-rose-400/40 transition-colors duration-300"
                        >
                            <ArrowRight className="w-4 h-4 text-[var(--foreground-subtle)] group-hover:text-rose-500 dark:group-hover:text-rose-400 transition-colors duration-300" />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
