"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { KBLogo } from "@/components/kb-logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Menu, X, LogOut, LayoutDashboard } from "lucide-react";
import { isLoggedIn, getStoredRole, clearStoredUser, isOnboardingComplete } from "@/lib/user-store";
import type { Role } from "@/lib/user-store";
import { ROLE_ALLOWED_HREFS } from "@/lib/nav-config";

const guestNav = [
  { label: "Discover", href: "/discover" },
  { label: "Jobs", href: "/jobs" },
  { label: "Pricing", href: "/pricing" },
];

const authedNav = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Discover", href: "/dashboard/discover" },
  { label: "Jobs", href: "/dashboard/jobs" },
];

export function Header() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState<Role | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const authenticated = isLoggedIn();
    setLoggedIn(authenticated);
    if (authenticated) {
      setRole(getStoredRole());
    }
  }, []);

  const handleLogout = () => {
    clearStoredUser();
    setLoggedIn(false);
    setRole(null);
    setOpen(false);
    router.push("/");
  };

  const baseNav = loggedIn && mounted ? authedNav : guestNav;
  const nav = role && loggedIn && mounted
    ? baseNav.filter((item) => ROLE_ALLOWED_HREFS[role].has(item.href))
    : baseNav;

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
          <KBLogo size="md" showText={true} />
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

        {/* Right side actions */}
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />

          {mounted && loggedIn ? (
            <>
              {role && (
                <span className="rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/20 px-2.5 py-0.5 text-xs font-semibold capitalize text-[var(--gold)]">
                  {role}
                </span>
              )}
              {isOnboardingComplete() && (
                <Button variant="primary" size="sm" className="rounded-full px-5" asChild>
                  <Link href="/dashboard">
                    <LayoutDashboard className="h-4 w-4 mr-1" />
                    Dashboard
                  </Link>
                </Button>
              )}
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg p-2 text-[var(--foreground-muted)] hover:bg-[var(--accent-rose)]/10 hover:text-[var(--accent-rose)] transition-colors"
                aria-label="Log out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">Log in</Link>
              </Button>
              <Button variant="primary" size="sm" className="rounded-full px-6" asChild>
                <Link href="/register">Get started</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile toggle */}
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

      {/* Mobile menu */}
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
                {mounted && loggedIn ? (
                  <>
                    {role && (
                      <div className="flex items-center gap-2 px-4 py-2">
                        <span className="rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/20 px-2.5 py-0.5 text-xs font-semibold capitalize text-[var(--gold)]">
                          {role}
                        </span>
                      </div>
                    )}
                    <Button
                      variant="ghost"
                      size="md"
                      className="w-full text-[var(--accent-rose)]"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Log out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" size="md" className="w-full" asChild>
                      <Link href="/login" onClick={() => setOpen(false)}>Log in</Link>
                    </Button>
                    <Button variant="primary" size="md" className="w-full rounded-full" asChild>
                      <Link href="/register" onClick={() => setOpen(false)}>Get started</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
