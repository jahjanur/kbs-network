"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ClubApplicantsPage() {
  return (
    <motion.div className="space-y-6" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Applicant pipeline</h1>
        <p className="mt-1 text-sm text-[var(--foreground-muted)]">
          Manage applications for your job listings. Move candidates through: New → Reviewed → Shortlisted → Interview → Offer → Closed.
        </p>
      </div>
      <div className="glass-card p-12 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
          <Users className="h-7 w-7 text-emerald-400" />
        </div>
        <h3 className="font-semibold text-[var(--foreground)]">No applicants yet</h3>
        <p className="mt-1 text-sm text-[var(--foreground-muted)]">When you post a job, applications will appear here in a kanban board.</p>
        <Button variant="primary" size="sm" className="mt-4 rounded-full" asChild>
          <Link href="/dashboard/club/jobs">Post a job</Link>
        </Button>
      </div>
    </motion.div>
  );
}
