"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Users, Trophy, Building2, Eye, ChevronRight } from "lucide-react";

const roles = [
    {
        icon: Users,
        title: "Player",
        desc: "Build your profile, showcase your talent, and get discovered by clubs worldwide.",
        gradient: "from-emerald-500/20 to-teal-500/20",
        borderColor: "hover:border-emerald-500/30",
        iconColor: "text-emerald-400",
        href: "/register",
    },
    {
        icon: Trophy,
        title: "Coach",
        desc: "Connect with clubs and players looking for your expertise and leadership.",
        gradient: "from-blue-500/20 to-cyan-500/20",
        borderColor: "hover:border-blue-500/30",
        iconColor: "text-blue-400",
        href: "/register",
    },
    {
        icon: Building2,
        title: "Club",
        desc: "Find talent, post opportunities, and manage your recruitment pipeline.",
        gradient: "from-amber-500/20 to-yellow-500/20",
        borderColor: "hover:border-amber-500/30",
        iconColor: "text-amber-400",
        href: "/register",
    },
    {
        icon: Eye,
        title: "Scout",
        desc: "Discover emerging talent and connect players with the right opportunities.",
        gradient: "from-violet-500/20 to-purple-500/20",
        borderColor: "hover:border-violet-500/30",
        iconColor: "text-violet-400",
        href: "/register",
    },
];

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

export function RolesSection() {
    return (
        <section className="relative py-24 sm:py-32">
            <div className="mx-auto max-w-6xl px-4">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
                        One platform, every role
                    </h2>
                    <p className="mt-4 text-[var(--foreground-muted)] text-lg max-w-2xl mx-auto">
                        Whether you&apos;re a rising star or a seasoned scout — there&apos;s a place for you.
                    </p>
                </motion.div>

                <motion.div
                    className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-80px" }}
                >
                    {roles.map((role) => {
                        const Icon = role.icon;
                        return (
                            <motion.div key={role.title} variants={item} className="h-full">
                                <Link href={role.href} className="block h-full">
                                    <div className="gradient-border-card h-full">
                                        <div
                                            className={`group p-7 flex flex-col h-full bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--surface-border)] rounded-[1.2rem] transition-all duration-[400ms] hover:-translate-y-1.5 hover:shadow-xl bg-gradient-to-br ${role.gradient} ${role.borderColor}`}
                                        >
                                            <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--surface)] ${role.iconColor}`}>
                                                <Icon className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
                                            </div>
                                            <h3 className="text-lg font-semibold text-[var(--foreground)]">{role.title}</h3>
                                            <p className="mt-2 text-sm text-[var(--foreground-muted)] flex-1">{role.desc}</p>
                                            <div className="mt-4 flex items-center text-sm font-medium text-[var(--gold)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                Get started <ChevronRight className="h-4 w-4 ml-1" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
