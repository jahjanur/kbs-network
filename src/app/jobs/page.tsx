"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Header } from "@/components/header";
import { AmbientBg } from "@/components/ambient-bg";
import { Button } from "@/components/ui/button";
import { Briefcase, ArrowRight } from "lucide-react";
import { isLoggedIn } from "@/lib/user-store";

export default function JobsPage() {
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn()) {
      router.replace("/dashboard/jobs");
    }
  }, [router]);

  return (
    <>
      <Header />
      <main className="relative min-h-screen overflow-hidden">
        <AmbientBg orbs={false} grid gradient />

        <div className="relative z-10 mx-auto max-w-5xl px-4 py-12 sm:py-16 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <h1 className="text-3xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-4xl">
              Job Board
            </h1>
            <p className="mt-2 text-[var(--foreground-muted)]">
              Browse open positions and tryouts. Sign in to apply.
            </p>
          </motion.div>

          <motion.div
            className="glass-card mt-10 p-12 sm:p-16 text-center"
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
            <p className="mt-2 text-[var(--foreground-muted)] max-w-md mx-auto">
              Job listings will appear here. Clubs can post positions and tryouts from their dashboard.
            </p>
            <Button variant="primary" size="lg" className="mt-6 rounded-full px-8" asChild>
              <Link href="/register">
                Sign up to get started
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </main>
    </>
  );
}
