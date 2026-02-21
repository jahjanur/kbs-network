"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Users, Trophy, Building2, Eye, Megaphone, ChevronRight, Sparkles } from "lucide-react";
import { setStoredRole } from "@/lib/user-store";
import type { Role } from "@/lib/user-store";

const roles = [
  {
    id: "player" as Role,
    title: "Player",
    desc: "Get discovered by clubs and find your next opportunity",
    icon: Users,
    accentColor: "#10b981",
    gradient: "from-emerald-500/15 to-teal-500/10",
    borderHover: "hover:border-emerald-500/30",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-500 dark:text-emerald-400",
  },
  {
    id: "coach" as Role,
    title: "Coach",
    desc: "Connect with clubs and find coaching roles",
    icon: Trophy,
    accentColor: "#3b82f6",
    gradient: "from-blue-500/15 to-cyan-500/10",
    borderHover: "hover:border-blue-500/30",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-500 dark:text-blue-400",
  },
  {
    id: "club" as Role,
    title: "Club",
    desc: "Recruit players, coaches, and manage your team",
    icon: Building2,
    accentColor: "#f59e0b",
    gradient: "from-amber-500/15 to-yellow-500/10",
    borderHover: "hover:border-amber-500/30",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-500 dark:text-amber-400",
  },
  {
    id: "scout" as Role,
    title: "Scout",
    desc: "Discover talent and build your shortlists",
    icon: Eye,
    accentColor: "#8b5cf6",
    gradient: "from-violet-500/15 to-purple-500/10",
    borderHover: "hover:border-violet-500/30",
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-500 dark:text-violet-400",
  },
  {
    id: "sponsor" as Role,
    title: "Sponsor / Brand",
    desc: "Offer sponsorship deals and connect with clubs",
    icon: Megaphone,
    accentColor: "#f43f5e",
    gradient: "from-rose-500/15 to-pink-500/10",
    borderHover: "hover:border-rose-500/30",
    iconBg: "bg-rose-500/10",
    iconColor: "text-rose-500 dark:text-rose-400",
    badge: "New",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function RoleSelectionPage() {
  const router = useRouter();

  const select = (roleId: Role) => {
    setStoredRole(roleId);
    router.push(`/onboarding/${roleId}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
    >
      <div className="mb-6 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--gold)] to-[var(--gold-light)] shadow-lg shadow-[var(--gold)]/20">
          <Sparkles className="h-7 w-7 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Choose your role</h1>
        <p className="mt-1.5 text-sm text-[var(--foreground-muted)]">
          This personalises your experience on the platform
        </p>
      </div>

      <motion.div
        className="grid gap-2.5"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {roles.map((role) => {
          const Icon = role.icon;
          return (
            <motion.button
              key={role.id}
              variants={item}
              onClick={() => select(role.id)}
              className={`group relative rounded-xl border border-[var(--surface-border)] p-4 flex items-center gap-4 text-left bg-gradient-to-r ${role.gradient} ${role.borderHover} transition-all duration-200 overflow-hidden`}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              {/* Hover accent */}
              <div
                className="absolute top-0 left-0 w-1 h-full rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{ backgroundColor: role.accentColor }}
              />

              <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${role.iconBg} ${role.iconColor} transition-transform duration-200 group-hover:scale-105`}>
                <Icon className="h-5 w-5" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-[var(--foreground)]">{role.title}</h3>
                  {"badge" in role && role.badge && (
                    <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-rose-500/10 text-rose-500 dark:text-rose-400 border border-rose-500/20">
                      {role.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-[var(--foreground-muted)] mt-0.5">{role.desc}</p>
              </div>

              <ChevronRight className="h-4 w-4 text-[var(--foreground-subtle)] group-hover:text-[var(--foreground)] group-hover:translate-x-0.5 transition-all shrink-0" />
            </motion.button>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
