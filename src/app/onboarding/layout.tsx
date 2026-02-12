"use client";

import Link from "next/link";
import { AmbientBg } from "@/components/ambient-bg";
import { KBLogo } from "@/components/kb-logo";
import { ThemeToggle } from "@/components/theme-toggle";

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <AmbientBg orbs={false} grid gradient />

      <header className="sticky top-0 z-50 glass border-b border-[var(--surface-border)]">
        <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4">
          <Link href="/">
            <KBLogo size="sm" showText={false} />
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-2xl px-4 py-10 sm:py-14">
        {children}
      </main>
    </div>
  );
}
