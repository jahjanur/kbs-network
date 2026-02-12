"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardFavoritesPage() {
  return (
    <motion.div className="space-y-6" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <h1 className="text-2xl font-bold text-[var(--foreground)]">Favorites</h1>
      <div className="glass-card p-12 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-500/10 border border-rose-500/20">
          <Heart className="h-7 w-7 text-rose-400" />
        </div>
        <h3 className="font-semibold text-[var(--foreground)]">No saved items yet</h3>
        <p className="mt-1 text-sm text-[var(--foreground-muted)]">Save players, coaches, clubs, or jobs from Discover or the job board.</p>
        <Button variant="primary" size="sm" className="mt-4 rounded-full" asChild>
          <Link href="/discover">Discover</Link>
        </Button>
      </div>
    </motion.div>
  );
}
