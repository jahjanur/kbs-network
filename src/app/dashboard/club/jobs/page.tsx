"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ClipboardList, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ClubJobsPage() {
  return (
    <motion.div className="space-y-6" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Job listings</h1>
        <Button variant="primary" size="sm" className="gap-2 rounded-full" asChild>
          <Link href="#"><Plus className="h-4 w-4" /> Post a job</Link>
        </Button>
      </div>
      <div className="glass-card p-12 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--gold)]/10 border border-[var(--gold)]/20">
          <ClipboardList className="h-7 w-7 text-[var(--gold)]" />
        </div>
        <h3 className="font-semibold text-[var(--foreground)]">No job listings yet</h3>
        <p className="mt-1 text-sm text-[var(--foreground-muted)]">Post player or coach vacancies to receive applications.</p>
        <Button variant="primary" size="sm" className="mt-4 rounded-full" asChild>
          <Link href="#">Create your first listing</Link>
        </Button>
      </div>
    </motion.div>
  );
}
