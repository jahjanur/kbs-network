"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { KBLogo } from "@/components/kb-logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const nav = [
  { label: "Discover", href: "/discover" },
  { label: "Jobs", href: "/jobs" },
  { label: "Pricing", href: "/pricing" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <motion.header
      className="sticky top-0 z-50 glass border-b border-[var(--surface-border)]"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
    >
      {/* Gold accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)]/20 to-transparent" />

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center transition-opacity hover:opacity-90">
          <KBLogo size="sm" showText={true} />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item, i) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i, duration: 0.3 }}
            >
              <Link
                href={item.href}
                className="rounded-xl px-4 py-2 text-sm font-medium text-[var(--foreground-muted)] transition-all duration-200 hover:bg-[var(--gold)]/8 hover:text-[var(--foreground)]"
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <Button variant="ghost" size="sm" asChild>
            <Link href="/login">Log in</Link>
          </Button>
          <Button variant="primary" size="sm" className="rounded-full px-6" asChild>
            <Link href="/register">Get started</Link>
          </Button>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <motion.button
            type="button"
            className="rounded-xl p-2.5 text-[var(--foreground-muted)] hover:bg-[var(--gold)]/10 hover:text-[var(--foreground)]"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {open ? (
                <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <X className="h-6 w-6" />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Menu className="h-6 w-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="glass border-t border-[var(--surface-border)] px-4 py-5 md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <div className="flex flex-col gap-1">
              {nav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <Link
                    href={item.href}
                    className="block rounded-xl px-4 py-3 text-[var(--foreground-muted)] transition-colors hover:bg-[var(--gold)]/10 hover:text-[var(--foreground)] font-medium"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-3 flex flex-col gap-2 border-t border-[var(--surface-border)] pt-4">
                <Button variant="ghost" size="md" className="w-full" asChild>
                  <Link href="/login">Log in</Link>
                </Button>
                <Button variant="primary" size="md" className="w-full rounded-full" asChild>
                  <Link href="/register">Get started</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
