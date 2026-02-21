"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
    return (
        <section className="relative py-24 sm:py-32">
            <div className="mx-auto max-w-4xl px-4 text-center">
                <motion.div
                    className="relative glass-card rounded-3xl p-10 sm:p-16 overflow-hidden"
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Accent glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--gold)]/5 via-transparent to-[var(--gold)]/5 rounded-3xl" />
                    <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-[var(--gold)]/5 blur-3xl" />

                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
                            Ready to elevate your game?
                        </h2>
                        <p className="mt-4 text-[var(--foreground-muted)] text-lg max-w-xl mx-auto">
                            Join thousands of football professionals building their careers on KB&apos;s Football Network.
                        </p>
                        <div className="mt-8">
                            <Button variant="primary" size="xl" className="rounded-full px-12 shadow-lg shadow-[var(--gold-glow)]" asChild>
                                <Link href="/register">
                                    Join now — it&apos;s free
                                    <ArrowRight className="h-5 w-5 ml-1" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
