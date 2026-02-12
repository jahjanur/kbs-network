"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Users, Trophy, Building2, Eye, ChevronRight } from "lucide-react";

const roles = [
  {
    id: "player",
    title: "Player",
    desc: "I'm looking to get discovered and find opportunities",
    icon: Users,
    gradient: "from-emerald-500/20 to-teal-500/20",
    borderColor: "hover:border-emerald-500/30",
    iconColor: "text-emerald-400",
  },
  {
    id: "coach",
    title: "Coach",
    desc: "I want to connect with clubs and find coaching roles",
    icon: Trophy,
    gradient: "from-blue-500/20 to-cyan-500/20",
    borderColor: "hover:border-blue-500/30",
    iconColor: "text-blue-400",
  },
  {
    id: "club",
    title: "Club",
    desc: "I want to recruit players and coaches for my club",
    icon: Building2,
    gradient: "from-amber-500/20 to-yellow-500/20",
    borderColor: "hover:border-amber-500/30",
    iconColor: "text-amber-400",
  },
  {
    id: "scout",
    title: "Scout",
    desc: "I'm looking to discover and recommend talent",
    icon: Eye,
    gradient: "from-violet-500/20 to-purple-500/20",
    borderColor: "hover:border-violet-500/30",
    iconColor: "text-violet-400",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function RoleSelectionPage() {
  const router = useRouter();

  const select = (roleId: string) => {
    localStorage.setItem("kbs-role", roleId);
    router.push(`/onboarding/${roleId}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
    >
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Choose your role</h1>
        <p className="mt-1 text-sm text-[var(--foreground-muted)]">
          This helps us personalise your experience
        </p>
      </div>

      <motion.div
        className="grid gap-3"
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
              className={`glass-card group !rounded-xl p-4 flex items-center gap-4 text-left bg-gradient-to-r ${role.gradient} ${role.borderColor} !transform-none`}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--surface)] border border-[var(--surface-border)] ${role.iconColor}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-[var(--foreground)]">{role.title}</h3>
                <p className="text-xs text-[var(--foreground-muted)] truncate">{role.desc}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-[var(--foreground-subtle)] group-hover:text-[var(--gold)] transition-colors shrink-0" />
            </motion.button>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
