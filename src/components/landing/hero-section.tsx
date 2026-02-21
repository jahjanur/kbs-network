"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Users, Building2, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AustriaMap } from "@/components/austria-map";

const stats = [
    { icon: Users, value: "5,000+", label: "Active Players" },
    { icon: Building2, value: "120+", label: "Registered Clubs" },
    { icon: Map, value: "9", label: "Provinces" },
];

const ease = [0.22, 1, 0.36, 1] as const;

/* Floating KBs icon positions */
const bgIcons = [
    { x: "6%", y: "12%", size: 48, delay: 0, duration: 22 },
    { x: "90%", y: "8%", size: 36, delay: -4, duration: 26 },
    { x: "12%", y: "55%", size: 32, delay: -8, duration: 20 },
    { x: "94%", y: "42%", size: 40, delay: -2, duration: 24 },
    { x: "3%", y: "82%", size: 36, delay: -6, duration: 28 },
    { x: "85%", y: "78%", size: 44, delay: -10, duration: 22 },
    { x: "30%", y: "5%", size: 28, delay: -3, duration: 25 },
    { x: "72%", y: "88%", size: 32, delay: -7, duration: 23 },
    { x: "50%", y: "92%", size: 24, delay: -5, duration: 27 },
    { x: "60%", y: "6%", size: 30, delay: -9, duration: 21 },
];

export function HeroSection() {
    return (
        <section className="relative min-h-screen overflow-hidden">
            {/* ── Background layers ── */}
            <div className="absolute inset-0 bg-[var(--background)]" />

            {/* Dark gradient mesh */}
            <div
                className="absolute inset-0 dark:opacity-100 opacity-60"
                style={{
                    background: `
                        radial-gradient(ellipse 90% 60% at 50% -5%, rgba(11,32,63,0.45), transparent 70%),
                        radial-gradient(ellipse 50% 50% at 85% 30%, rgba(245,166,35,0.05), transparent 55%),
                        radial-gradient(ellipse 50% 40% at 10% 70%, rgba(11,30,60,0.3), transparent 55%)
                    `,
                }}
            />

            {/* Subtle grid */}
            <div
                className="absolute inset-0 opacity-[0.02] dark:opacity-[0.035]"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(148,163,184,0.4) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(148,163,184,0.4) 1px, transparent 1px)
                    `,
                    backgroundSize: "64px 64px",
                }}
            />

            {/* Floating KBs icon background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
                {bgIcons.map(({ x, y, size, delay, duration }, i) => (
                    <div
                        key={i}
                        className="absolute opacity-[0.035] dark:opacity-[0.05]"
                        style={{
                            left: x,
                            top: y,
                            animation: `float ${duration}s ease-in-out infinite`,
                            animationDelay: `${delay}s`,
                        }}
                    >
                        {/* Light mode → dark icon */}
                        <Image
                            src="/DarkIcon.svg"
                            alt=""
                            width={size}
                            height={size}
                            className="block dark:hidden"
                        />
                        {/* Dark mode → white icon */}
                        <Image
                            src="/WhiteIcon.svg"
                            alt=""
                            width={size}
                            height={size}
                            className="hidden dark:block"
                        />
                    </div>
                ))}
            </div>

            {/* Top gold accent line */}
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-1/2 opacity-30"
                style={{
                    background: "linear-gradient(90deg, transparent, var(--gold), transparent)",
                }}
            />

            {/* ── Content ── */}
            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 pt-28 sm:pt-32 lg:pt-36 pb-20">
                    {/* ── Left: Text ── */}
                    <div className="flex-1 text-center lg:text-left max-w-2xl lg:max-w-none">
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease }}
                        >
                            <span className="inline-flex items-center gap-2.5 rounded-full border border-[var(--gold)]/20 bg-[var(--gold)]/5 px-4 py-1.5 text-sm font-medium text-[var(--gold)] backdrop-blur-md">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--gold)] opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--gold)]" />
                                </span>
                                Austria&apos;s Football Network
                            </span>
                        </motion.div>

                        {/* Headline */}
                        <motion.h1
                            className="mt-8 text-4xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.05]"
                            initial={{ opacity: 0, y: 28 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.08, ease }}
                        >
                            Where{" "}
                            <span className="text-gradient-gold">Players</span>,
                            <br className="hidden sm:block" />
                            {" "}
                            <span className="text-gradient-gold">Coaches</span> &{" "}
                            <span className="text-gradient-gold">Clubs</span>{" "}
                            Connect
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            className="mt-6 max-w-xl text-lg text-[var(--foreground-muted)] sm:text-xl leading-relaxed lg:mx-0 mx-auto"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.18 }}
                        >
                            Get discovered, get matched, get hired — the premium
                            platform built for Austrian football.
                        </motion.p>

                        {/* CTA buttons */}
                        <motion.div
                            className="mt-10 flex items-center gap-4 flex-wrap justify-center lg:justify-start"
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <Button
                                variant="primary"
                                size="xl"
                                className="rounded-full px-10 shadow-lg shadow-[var(--gold-glow)]"
                                asChild
                            >
                                <Link href="/register">
                                    Get started free
                                    <ArrowRight className="h-5 w-5 ml-1" />
                                </Link>
                            </Button>
                            <Button
                                variant="outline"
                                size="xl"
                                className="rounded-full px-10"
                                asChild
                            >
                                <Link href="/discover">Browse talent</Link>
                            </Button>
                        </motion.div>

                        {/* Stats row */}
                        <motion.div
                            className="mt-12 flex items-center gap-8 sm:gap-12 justify-center lg:justify-start"
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.45 }}
                        >
                            {stats.map((stat, i) => (
                                <div
                                    key={stat.label}
                                    className="flex flex-col items-center lg:items-start gap-1"
                                >
                                    <div className="flex items-center gap-2">
                                        <stat.icon className="h-4 w-4 text-[var(--gold)] opacity-70" />
                                        <span className="text-2xl sm:text-3xl font-bold text-[var(--foreground)]">
                                            {stat.value}
                                        </span>
                                    </div>
                                    <span className="text-xs sm:text-sm text-[var(--foreground-muted)]">
                                        {stat.label}
                                    </span>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* ── Right: Map ── */}
                    <motion.div
                        className="flex-1 w-full lg:w-auto min-w-0"
                        initial={{ opacity: 0, x: 40, scale: 0.97 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ duration: 0.9, delay: 0.3, ease }}
                    >
                        <div className="relative">
                            {/* Radial glow behind map */}
                            <div
                                className="absolute inset-0 -z-10 blur-[100px] opacity-15 dark:opacity-20"
                                style={{
                                    background:
                                        "radial-gradient(ellipse 70% 60% at 50% 50%, var(--gold), transparent 70%)",
                                }}
                            />
                            <AustriaMap />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[var(--background)] to-transparent z-10 pointer-events-none" />
        </section>
    );
}
