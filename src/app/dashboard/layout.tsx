"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { KBLogo } from "@/components/kb-logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { getStoredRole, isOnboardingComplete } from "@/lib/user-store";
import type { Role } from "@/lib/user-store";
import {
  LayoutDashboard,
  Compass,
  Briefcase,
  MessageCircle,
  Heart,
  User,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav: { href: string; label: string; icon: typeof Compass }[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/discover", label: "Discover", icon: Compass },
  { href: "/jobs", label: "Jobs", icon: Briefcase },
  { href: "/dashboard/messages", label: "Messages", icon: MessageCircle },
  { href: "/dashboard/favorites", label: "Favorites", icon: Heart },
  { href: "/dashboard/profile", label: "Profile", icon: User },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [role, setRole] = useState<Role | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const r = getStoredRole();
    const done = isOnboardingComplete();
    if (!r || !done) {
      router.replace("/register/role");
      return;
    }
    setRole(r);
    setReady(true);
  }, [router]);

  function handleLogout() {
    if (typeof window === "undefined") return;
    localStorage.removeItem("kbs_role");
    localStorage.removeItem("kbs_onboarding_done");
    localStorage.removeItem("kbs_profile");
    router.replace("/");
  }

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--background)]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--gold)]/20 border-t-[var(--gold)]" />
          <p className="text-sm text-[var(--foreground-muted)]">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Top accent line */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent opacity-60" />

      <motion.header
        className="sticky top-0 z-50 glass border-b border-[var(--surface-border)]"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
      >
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link href="/dashboard" className="flex items-center">
            <KBLogo size="sm" showText={true} />
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                  pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))
                    ? "bg-[var(--gold)]/10 text-[var(--gold)]"
                    : "text-[var(--foreground-muted)] hover:bg-[var(--gold)]/5 hover:text-[var(--foreground)]"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <span className="hidden rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/20 px-2.5 py-0.5 text-xs font-semibold capitalize text-[var(--gold)] sm:inline">
              {role}
            </span>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg p-2 text-[var(--foreground-muted)] hover:bg-[var(--accent-rose)]/10 hover:text-[var(--accent-rose)] transition-colors"
              aria-label="Log out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
        {/* Mobile nav */}
        <div className="flex gap-1 overflow-x-auto px-4 pb-2 md:hidden">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors",
                pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))
                  ? "bg-[var(--gold)]/10 text-[var(--gold)]"
                  : "text-[var(--foreground-muted)]"
              )}
            >
              <item.icon className="h-3.5 w-3.5" />
              {item.label}
            </Link>
          ))}
        </div>
      </motion.header>
      <motion.main
        className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {children}
      </motion.main>
    </div>
  );
}
