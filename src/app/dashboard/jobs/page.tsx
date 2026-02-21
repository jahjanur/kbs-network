"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Briefcase, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getStoredRole } from "@/lib/user-store";
import type { Role } from "@/lib/user-store";
import { ROLES_WITHOUT_JOBS } from "@/lib/nav-config";

export default function DashboardJobsPage() {
  const router = useRouter();
  const [role, setRole] = useState<Role | null>(null);

  useEffect(() => {
    const r = getStoredRole();
    if (r && ROLES_WITHOUT_JOBS.has(r)) {
      router.replace("/dashboard");
      return;
    }
    setRole(r);
  }, [router]);

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-3xl">
              Job Board
            </h1>
            <p className="mt-1 text-[var(--foreground-muted)]">
              Browse open positions, tryouts, and opportunities
            </p>
          </div>
          {role === "club" && (
            <Button variant="primary" size="md" className="rounded-full" asChild>
              <Link href="/dashboard/club/jobs">
                <Plus className="h-4 w-4 mr-1" />
                Post a job
              </Link>
            </Button>
          )}
        </div>
      </motion.div>

      {/* Search bar */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
      >
        <div className="relative max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--foreground-subtle)]" />
          <input
            type="text"
            placeholder="Search jobs by title, club, region..."
            className="input-field pl-10"
            disabled
          />
        </div>
      </motion.div>

      {/* Empty state */}
      <motion.div
        className="glass-card p-12 sm:p-16 text-center"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--gold)]/10 border border-[var(--gold)]/20">
          <Briefcase className="h-8 w-8 text-[var(--gold)]" />
        </div>
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          No jobs posted yet
        </h2>
        <p className="mt-2 text-sm text-[var(--foreground-muted)] max-w-md mx-auto">
          {role === "club"
            ? "Post your first job listing to start finding players and coaches."
            : "Job listings will appear here when clubs post positions and tryouts."}
        </p>
        {role === "club" && (
          <Button variant="primary" size="lg" className="mt-6 rounded-full px-8" asChild>
            <Link href="/dashboard/club/jobs">
              <Plus className="h-4 w-4 mr-1" />
              Post your first job
            </Link>
          </Button>
        )}
      </motion.div>
    </div>
  );
}
