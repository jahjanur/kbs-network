"use client";

import Link from "next/link";
import { AmbientBg } from "@/components/ambient-bg";
import { KBLogo } from "@/components/kb-logo";
import { ThemeToggle } from "@/components/theme-toggle";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      <AmbientBg orbs grid gradient />

      {/* Header bar */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-4">
        <Link href="/">
          <KBLogo size="sm" showText={false} />
        </Link>
        <ThemeToggle />
      </div>

      {/* Form container */}
      <div className="relative z-10 w-full max-w-md px-4 py-20">
        <div className="glass-card rounded-2xl p-7 sm:p-8 border-[var(--gold)]/10 shadow-xl shadow-black/5 dark:shadow-black/30">
          {children}
        </div>
      </div>
    </div>
  );
}
