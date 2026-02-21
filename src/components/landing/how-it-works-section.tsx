"use client";

import { motion } from "framer-motion";
import { UserPlus, Search, Handshake } from "lucide-react";
import { AmbientBg } from "@/components/ambient-bg";

const steps = [
    { icon: UserPlus, title: "Create your profile", desc: "Sign up and set your role — player, coach, club, or scout." },
    { icon: Search, title: "Browse & discover", desc: "Search by position, region, or experience to find your match." },
    { icon: Handshake, title: "Connect & grow", desc: "Chat, apply, and start building your football career." },
];

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

export function HowItWorksSection() {
    return (
        <section className="relative py-24 sm:py-32 overflow-hidden">
            <AmbientBg orbs={false} grid={false} gradient />

            <div className="relative z-10 mx-auto max-w-4xl px-4">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
                        How it works
                    </h2>
                    <p className="mt-4 text-[var(--foreground-muted)] text-lg">
                        Three simple steps to kickstart your journey
                    </p>
                </motion.div>

                <motion.div
                    className="grid gap-8 sm:grid-cols-3"
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-80px" }}
                >
                    {steps.map((step, i) => {
                        const Icon = step.icon;
                        return (
                            <motion.div key={step.title} variants={item} className="relative text-center">
                                {/* Step number */}
                                <div className="mx-auto mb-5 relative">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--gold)]/15 to-[var(--gold)]/5 border border-[var(--gold)]/20 mx-auto">
                                        <Icon className="h-7 w-7 text-[var(--gold)]" />
                                    </div>
                                    <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-[var(--gold)] text-xs font-bold text-[#0a0e17]">
                                        {i + 1}
                                    </span>
                                </div>
                                <h3 className="text-lg font-semibold text-[var(--foreground)]">{step.title}</h3>
                                <p className="mt-2 text-sm text-[var(--foreground-muted)]">{step.desc}</p>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
