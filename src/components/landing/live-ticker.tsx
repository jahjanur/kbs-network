"use client";

import { motion } from "framer-motion";
import { UserPlus, Briefcase, Trophy, Star, Activity } from "lucide-react";

const activities = [
    { icon: UserPlus,  text: "Alex M. joined as Player (Midfielder)",  time: "2m ago",  color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { icon: Briefcase, text: "FC Vienna posted a Head Coach job",       time: "5m ago",  color: "text-blue-400",    bg: "bg-blue-500/10" },
    { icon: Trophy,    text: "Rapid Youth updated match results",       time: "12m ago", color: "text-amber-400",   bg: "bg-amber-500/10" },
    { icon: Star,      text: "Scout Sarah saved 3 player profiles",     time: "15m ago", color: "text-purple-400",  bg: "bg-purple-500/10" },
    { icon: UserPlus,  text: "Marco R. joined as Goalkeeper",           time: "18m ago", color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { icon: Briefcase, text: "SV Ried is looking for a Physio",         time: "22m ago", color: "text-blue-400",    bg: "bg-blue-500/10" },
    { icon: UserPlus,  text: "Lukas P. joined as Coach",               time: "25m ago", color: "text-blue-400",    bg: "bg-blue-500/10" },
    { icon: Trophy,    text: "Academy U18 posted tournament stats",     time: "28m ago", color: "text-amber-400",   bg: "bg-amber-500/10" },
];

const doubled = [...activities, ...activities];

export function LiveTicker() {
    return (
        <div className="w-full overflow-hidden py-3.5 relative">
            {/* Subtle top/bottom lines */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--surface-border)] to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--surface-border)] to-transparent" />

            <div className="relative flex max-w-[100vw] overflow-hidden items-center">
                {/* LIVE badge — premium pill with glow */}
                <div className="absolute left-4 z-20 flex items-center gap-2 shrink-0">
                    <div className="relative flex items-center gap-1.5 bg-gradient-to-r from-red-600 to-red-500 text-white text-[10px] font-bold uppercase tracking-[0.15em] pl-2.5 pr-3 py-1 rounded-full shadow-lg shadow-red-500/25">
                        {/* Animated ping ring */}
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-60" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                        </span>
                        Live
                    </div>
                    <Activity className="h-3.5 w-3.5 text-[var(--foreground-subtle)] animate-pulse" />
                </div>

                {/* Gradient masks */}
                <div className="absolute left-0 top-0 bottom-0 z-10 w-28 bg-gradient-to-r from-[var(--background)] via-[var(--background)]/80 to-transparent" />
                <div className="absolute right-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-l from-[var(--background)] via-[var(--background)]/80 to-transparent" />

                <motion.div
                    className="flex gap-10 whitespace-nowrap pl-28"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        repeat: Infinity,
                        duration: 55,
                        ease: "linear",
                        repeatType: "loop",
                    }}
                >
                    {doubled.map((activity, i) => {
                        const Icon = activity.icon;
                        return (
                            <div key={i} className="flex items-center gap-2.5 text-sm shrink-0">
                                <div className={`p-1.5 rounded-lg ${activity.bg}`}>
                                    <Icon className={`w-3.5 h-3.5 ${activity.color}`} />
                                </div>
                                <span className="text-[var(--foreground)] font-medium text-[13px]">{activity.text}</span>
                                <span className="text-[var(--foreground-subtle)] text-xs font-mono">{activity.time}</span>
                            </div>
                        );
                    })}
                </motion.div>
            </div>
        </div>
    );
}
