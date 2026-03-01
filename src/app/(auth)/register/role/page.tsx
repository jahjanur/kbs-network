"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Users,
  Trophy,
  Building2,
  Eye,
  Megaphone,
  ArrowRight,
  Check,
} from "lucide-react";
import { setStoredRole } from "@/lib/user-store";
import type { Role } from "@/lib/user-store";

const roles = [
  {
    id: "player" as Role,
    title: "Player",
    desc: "Get discovered by clubs and scouts",
    icon: Users,
    accent: "emerald",
    accentBg: "bg-emerald-500/10",
    accentText: "text-emerald-500 dark:text-emerald-400",
    accentBorder: "border-emerald-500/30",
    accentRing: "ring-emerald-500/20",
  },
  {
    id: "coach" as Role,
    title: "Coach",
    desc: "Find coaching roles and connect with clubs",
    icon: Trophy,
    accent: "blue",
    accentBg: "bg-blue-500/10",
    accentText: "text-blue-500 dark:text-blue-400",
    accentBorder: "border-blue-500/30",
    accentRing: "ring-blue-500/20",
  },
  {
    id: "club" as Role,
    title: "Club / Academy",
    desc: "Recruit talent and manage your team",
    icon: Building2,
    accent: "amber",
    accentBg: "bg-amber-500/10",
    accentText: "text-amber-500 dark:text-amber-400",
    accentBorder: "border-amber-500/30",
    accentRing: "ring-amber-500/20",
  },
  {
    id: "scout" as Role,
    title: "Scout",
    desc: "Discover and shortlist talent",
    icon: Eye,
    accent: "violet",
    accentBg: "bg-violet-500/10",
    accentText: "text-violet-500 dark:text-violet-400",
    accentBorder: "border-violet-500/30",
    accentRing: "ring-violet-500/20",
  },
  {
    id: "sponsor" as Role,
    title: "Sponsor / Brand",
    desc: "Connect with clubs and offer sponsorships",
    icon: Megaphone,
    accent: "rose",
    accentBg: "bg-rose-500/10",
    accentText: "text-rose-500 dark:text-rose-400",
    accentBorder: "border-rose-500/30",
    accentRing: "ring-rose-500/20",
    badge: "New",
  },
];

export default function RoleSelectionPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<Role | null>(null);

  const proceed = () => {
    if (!selected) return;
    setStoredRole(selected);
    router.push(`/onboarding/${selected}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1.5 text-xs text-[var(--foreground-subtle)]">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15 text-[10px] font-bold text-emerald-500">
              <Check className="h-3 w-3" />
            </span>
            Account
          </div>
          <div className="h-px w-4 bg-[var(--surface-border)]" />
          <div className="flex items-center gap-1.5 text-xs font-medium text-[var(--foreground)]">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--gold)]/15 text-[10px] font-bold text-[var(--gold)]">
              2
            </span>
            Role
          </div>
          <div className="h-px w-4 bg-[var(--surface-border)]" />
          <div className="flex items-center gap-1.5 text-xs text-[var(--foreground-subtle)]">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--surface-highlight)] text-[10px] font-medium text-[var(--foreground-subtle)]">
              3
            </span>
            Profile
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] tracking-tight">
          Choose your role
        </h1>
        <p className="mt-2 text-sm text-[var(--foreground-muted)]">
          This personalises your experience. You can change it later.
        </p>
      </div>

      {/* Role cards */}
      <div className="space-y-2.5">
        {roles.map((role, i) => {
          const Icon = role.icon;
          const isSelected = selected === role.id;

          return (
            <motion.button
              key={role.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              onClick={() => setSelected(role.id)}
              className={`group relative w-full flex items-center gap-4 rounded-xl border p-4 text-left transition-all duration-200 ${
                isSelected
                  ? `${role.accentBorder} ring-2 ${role.accentRing} bg-[var(--surface-highlight)]/50`
                  : "border-[var(--surface-border)] hover:border-[var(--foreground-subtle)]/20 hover:bg-[var(--surface-highlight)]/30"
              }`}
            >
              {/* Icon */}
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all duration-200 ${
                  isSelected
                    ? `${role.accentBg} ${role.accentText}`
                    : "bg-[var(--surface-highlight)] text-[var(--foreground-subtle)] group-hover:text-[var(--foreground-muted)]"
                }`}
              >
                <Icon className="h-5 w-5" />
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-[var(--foreground)] text-sm">
                    {role.title}
                  </h3>
                  {"badge" in role && role.badge && (
                    <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-rose-500/10 text-rose-500 dark:text-rose-400 border border-rose-500/20">
                      {role.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-[var(--foreground-muted)] mt-0.5">
                  {role.desc}
                </p>
              </div>

              {/* Check circle */}
              <div
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all duration-200 ${
                  isSelected
                    ? `${role.accentBorder} ${role.accentBg} ${role.accentText}`
                    : "border-[var(--surface-border)]"
                }`}
              >
                {isSelected && <Check className="h-3 w-3" />}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Continue button */}
      <div className="mt-8">
        <Button
          variant="primary"
          size="lg"
          className="w-full rounded-xl"
          disabled={!selected}
          onClick={proceed}
        >
          Continue
          <ArrowRight className="h-4 w-4 ml-1.5" />
        </Button>
      </div>
    </motion.div>
  );
}
