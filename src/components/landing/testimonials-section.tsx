"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
    {
        quote: "Within 2 weeks of joining, I found a club in the 3rd league that matched my ambition perfectly.",
        author: "David K.",
        role: "Midfielder",
        club: "Joined FC Blau-Weiss",
        initials: "DK",
        avatarColor: "bg-emerald-500",
        rating: 5,
    },
    {
        quote: "As a scout, this tool is indispensable. The verification system saves me hours of work every week.",
        author: "Sarah M.",
        role: "Head Scout",
        club: "SV Ried Academy",
        initials: "SM",
        avatarColor: "bg-blue-500",
        rating: 5,
    },
    {
        quote: "We filled our Head Coach vacancy in record time. The quality of applicants was outstanding.",
        author: "Michael T.",
        role: "Sporting Director",
        club: "First Vienna FC",
        initials: "MT",
        avatarColor: "bg-amber-500",
        rating: 5,
    },
];

export function TestimonialsSection() {
    return (
        <section className="relative py-24 sm:py-32 bg-[var(--surface)]/20">
            <div className="mx-auto max-w-7xl px-4">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <span className="text-[var(--gold)] font-medium text-sm tracking-wider uppercase">Testimonials</span>
                    <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
                        Trusted by professionals
                    </h2>
                </motion.div>

                <div className="grid gap-6 md:grid-cols-3">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            className="relative flex flex-col p-10 rounded-3xl bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--surface-border)] hover:border-[var(--gold)]/20 transition-all duration-[400ms] group"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: i * 0.1 }}
                        >
                            {/* Decorative large quote mark */}
                            <div className="absolute top-6 right-8 text-7xl font-serif text-[var(--gold)] opacity-10 select-none leading-none pointer-events-none">
                                &ldquo;
                            </div>

                            {/* Top gradient accent */}
                            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)]/30 to-transparent" />

                            {/* Stars */}
                            <div className="flex gap-1.5 mb-6">
                                {Array.from({ length: t.rating }).map((_, j) => (
                                    <Star key={j} className="h-5 w-5 text-[var(--gold)] fill-[var(--gold)]" />
                                ))}
                            </div>

                            {/* Quote */}
                            <p className="text-lg text-[var(--foreground)] leading-relaxed flex-1 mb-8">
                                &ldquo;{t.quote}&rdquo;
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-3">
                                <div className={`h-10 w-10 rounded-full ${t.avatarColor} flex items-center justify-center text-white text-sm font-bold shrink-0`}>
                                    {t.initials}
                                </div>
                                <div>
                                    <div className="font-semibold text-[var(--foreground)] text-sm">{t.author}</div>
                                    <div className="text-xs text-[var(--foreground-muted)]">
                                        {t.role} &middot; <span className="text-[var(--gold)]">{t.club}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
