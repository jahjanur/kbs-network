"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { KBLogo } from "@/components/kb-logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  ChevronDown,
  Info,
  Newspaper,
  Users,
  Mail,
  Compass,
  Briefcase,
  CreditCard,
  Search,
  MapPin,
  Zap,
  Trophy,
  Building2,
  Globe,
} from "lucide-react";
import {
  isLoggedIn,
  getStoredRole,
  clearStoredUser,
  isOnboardingComplete,
} from "@/lib/user-store";
import type { Role } from "@/lib/user-store";
import { ROLE_ALLOWED_HREFS } from "@/lib/nav-config";

/* ── Nav types ─────────────────────────────────────────────── */

interface NavLink {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  description?: string;
}

interface NavItem {
  label: string;
  href?: string;
  children?: NavLink[];
}

/* ── Guest mega-menu ───────────────────────────────────────── */

const platformLinks: NavLink[] = [
  {
    label: "Discover Talent",
    href: "/discover",
    icon: Search,
    description: "Browse players, coaches & clubs",
  },
  {
    label: "Job Board",
    href: "/jobs",
    icon: Briefcase,
    description: "Open positions & tryouts",
  },
  {
    label: "Pricing",
    href: "/pricing",
    icon: Zap,
    description: "Plans for every role",
  },
];

const companyLinks: NavLink[] = [
  { label: "About", href: "/about", icon: Info, description: "Our story" },
  {
    label: "Blog",
    href: "/blog",
    icon: Newspaper,
    description: "News & insights",
  },
  {
    label: "Careers",
    href: "/careers",
    icon: Users,
    description: "Join the team",
  },
  {
    label: "Contact",
    href: "/contact",
    icon: Mail,
    description: "Get in touch",
  },
];

const authedNav: NavItem[] = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Discover", href: "/dashboard/discover" },
  { label: "Jobs", href: "/dashboard/jobs" },
];

/* ── Mega dropdown ─────────────────────────────────────────── */

function MegaMenu({ index }: { index: number }) {
  const [open, setOpen] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout>>(undefined);
  const pathname = usePathname();

  const allLinks = [...platformLinks, ...companyLinks];
  const isActive = allLinks.some((l) => pathname === l.href);

  function enter() {
    clearTimeout(timeout.current);
    setOpen(true);
  }
  function leave() {
    timeout.current = setTimeout(() => setOpen(false), 200);
  }

  return (
    <motion.div
      className="relative"
      onMouseEnter={enter}
      onMouseLeave={leave}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * index, duration: 0.3 }}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[13px] font-medium transition-all duration-200 ${
          isActive || open
            ? "text-[var(--foreground)]"
            : "text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
        }`}
      >
        Menu
        <ChevronDown
          className={`h-3 w-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute top-full right-0 pt-3"
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="w-[420px] rounded-2xl border border-[var(--surface-border)] bg-[var(--card-bg)]/95 shadow-2xl shadow-black/15 backdrop-blur-xl overflow-hidden">
              <div className="grid grid-cols-2">
                {/* Platform column */}
                <div className="p-3 border-r border-[var(--surface-border)]">
                  <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--foreground-subtle)]">
                    Platform
                  </div>
                  {platformLinks.map((link) => {
                    const Icon = link.icon;
                    const active = pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className={`flex items-start gap-3 rounded-xl px-3 py-2.5 transition-all duration-150 ${
                          active
                            ? "bg-[var(--gold)]/10"
                            : "hover:bg-[var(--surface-highlight)]"
                        }`}
                      >
                        {Icon && (
                          <div
                            className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                              active
                                ? "bg-[var(--gold)]/15 text-[var(--gold)]"
                                : "bg-[var(--surface-highlight)] text-[var(--foreground-subtle)]"
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                          </div>
                        )}
                        <div>
                          <div
                            className={`text-[13px] font-semibold leading-tight ${
                              active
                                ? "text-[var(--foreground)]"
                                : "text-[var(--foreground-muted)]"
                            }`}
                          >
                            {link.label}
                          </div>
                          {link.description && (
                            <div className="mt-0.5 text-[11px] text-[var(--foreground-subtle)] leading-tight">
                              {link.description}
                            </div>
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </div>

                {/* Company column */}
                <div className="p-3">
                  <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--foreground-subtle)]">
                    Company
                  </div>
                  {companyLinks.map((link) => {
                    const Icon = link.icon;
                    const active = pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className={`flex items-start gap-3 rounded-xl px-3 py-2.5 transition-all duration-150 ${
                          active
                            ? "bg-[var(--gold)]/10"
                            : "hover:bg-[var(--surface-highlight)]"
                        }`}
                      >
                        {Icon && (
                          <div
                            className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                              active
                                ? "bg-[var(--gold)]/15 text-[var(--gold)]"
                                : "bg-[var(--surface-highlight)] text-[var(--foreground-subtle)]"
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                          </div>
                        )}
                        <div>
                          <div
                            className={`text-[13px] font-semibold leading-tight ${
                              active
                                ? "text-[var(--foreground)]"
                                : "text-[var(--foreground-muted)]"
                            }`}
                          >
                            {link.label}
                          </div>
                          {link.description && (
                            <div className="mt-0.5 text-[11px] text-[var(--foreground-subtle)] leading-tight">
                              {link.description}
                            </div>
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Bottom bar */}
              <div className="border-t border-[var(--surface-border)] bg-[var(--surface-highlight)]/30 px-5 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-[12px] text-[var(--foreground-subtle)]">
                  <Globe className="h-3.5 w-3.5" />
                  <span>5,000+ football professionals</span>
                </div>
                <Link
                  href="/register"
                  onClick={() => setOpen(false)}
                  className="text-[12px] font-semibold text-[var(--gold)] hover:underline"
                >
                  Join free →
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── Header ────────────────────────────────────────────────── */

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState<Role | null>(null);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
  });

  useEffect(() => {
    setMounted(true);
    const authenticated = isLoggedIn();
    setLoggedIn(authenticated);
    if (authenticated) {
      setRole(getStoredRole());
    }
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    clearStoredUser();
    setLoggedIn(false);
    setRole(null);
    setOpen(false);
    router.push("/");
  };

  const isAuthed = loggedIn && mounted;

  const filteredAuthedNav =
    role && isAuthed
      ? authedNav.filter(
          (item) => !item.href || ROLE_ALLOWED_HREFS[role].has(item.href)
        )
      : authedNav;

  const mobileLinks: NavLink[] = isAuthed
    ? authedNav
        .filter((i) => i.href)
        .map((i) => ({
          label: i.label,
          href: i.href!,
          icon:
            i.label === "Dashboard"
              ? LayoutDashboard
              : i.label === "Discover"
                ? Compass
                : Briefcase,
        }))
    : [
        { label: "Discover Talent", href: "/discover", icon: Search },
        { label: "Job Board", href: "/jobs", icon: Briefcase },
        { label: "Pricing", href: "/pricing", icon: CreditCard },
        { label: "About", href: "/about", icon: Info },
        { label: "Blog", href: "/blog", icon: Newspaper },
        { label: "Careers", href: "/careers", icon: Users },
        { label: "Contact", href: "/contact", icon: Mail },
      ];

  const filteredMobileLinks =
    role && isAuthed
      ? mobileLinks.filter((l) => ROLE_ALLOWED_HREFS[role].has(l.href))
      : mobileLinks;

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-[var(--surface-border)] bg-[var(--background)]/80 backdrop-blur-xl supports-[backdrop-filter]:bg-[var(--background)]/60"
          : "border-b border-transparent bg-transparent"
      }`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
    >
      {scrolled && (
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)]/15 to-transparent" />
      )}

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center transition-opacity hover:opacity-90"
        >
          <KBLogo size="md" showText={true} />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-0.5 md:flex">
          {isAuthed ? (
            /* Authenticated: simple links */
            filteredAuthedNav.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i, duration: 0.3 }}
              >
                <Link
                  href={item.href!}
                  className={`relative rounded-lg px-3.5 py-2 text-[13px] font-medium transition-all duration-200 ${
                    pathname === item.href
                      ? "text-[var(--foreground)]"
                      : "text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
                  }`}
                >
                  {item.label}
                  {pathname === item.href && (
                    <motion.div
                      className="absolute -bottom-[1px] left-3 right-3 h-[2px] rounded-full bg-[var(--gold)]"
                      layoutId="nav-indicator"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              </motion.div>
            ))
          ) : (
            /* Guest: quick links + mega menu */
            <>
              {[
                { label: "Discover", href: "/discover", icon: Search },
                { label: "Jobs", href: "/jobs", icon: Briefcase },
                { label: "Pricing", href: "/pricing", icon: Zap },
              ].map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.3 }}
                >
                  <Link
                    href={item.href}
                    className={`relative flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[13px] font-medium transition-all duration-200 ${
                      pathname === item.href
                        ? "text-[var(--foreground)]"
                        : "text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
                    }`}
                  >
                    <item.icon className="h-3.5 w-3.5" />
                    {item.label}
                    {pathname === item.href && (
                      <motion.div
                        className="absolute -bottom-[1px] left-3 right-3 h-[2px] rounded-full bg-[var(--gold)]"
                        layoutId="nav-indicator"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
              <MegaMenu index={3} />
            </>
          )}
        </nav>

        {/* Right side */}
        <div className="hidden items-center gap-2.5 md:flex">
          <ThemeToggle />

          {mounted && loggedIn ? (
            <>
              {role && (
                <span className="rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/20 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--gold)]">
                  {role}
                </span>
              )}
              {isOnboardingComplete() && (
                <Button
                  variant="primary"
                  size="sm"
                  className="rounded-full px-5"
                  asChild
                >
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
              <Button
                variant="primary"
                size="sm"
                className="rounded-full px-5"
                asChild
              >
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
            className="rounded-xl p-2.5 text-[var(--foreground-muted)] hover:bg-[var(--surface-highlight)] hover:text-[var(--foreground)]"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {open ? (
                <motion.div
                  key="x"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X className="h-5 w-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu className="h-5 w-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 top-16 bg-black/40 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            <motion.div
              className="absolute top-full left-0 right-0 border-b border-[var(--surface-border)] bg-[var(--background)]/95 backdrop-blur-xl md:hidden"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{
                duration: 0.2,
                ease: [0.22, 1, 0.36, 1] as const,
              }}
            >
              <div className="mx-auto max-w-7xl px-4 py-4">
                <div className="space-y-0.5">
                  {filteredMobileLinks.map((item, i) => {
                    const Icon = item.icon;
                    const active = pathname === item.href;
                    return (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.03 * i }}
                      >
                        <Link
                          href={item.href}
                          className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-colors ${
                            active
                              ? "bg-[var(--gold)]/10 text-[var(--foreground)]"
                              : "text-[var(--foreground-muted)] hover:bg-[var(--surface-highlight)] hover:text-[var(--foreground)]"
                          }`}
                        >
                          {Icon && (
                            <Icon
                              className={`h-4 w-4 ${active ? "text-[var(--gold)]" : ""}`}
                            />
                          )}
                          <span className="text-sm font-medium">
                            {item.label}
                          </span>
                          {active && (
                            <div className="ml-auto h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
                          )}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="mt-4 flex flex-col gap-2 border-t border-[var(--surface-border)] pt-4">
                  {mounted && loggedIn ? (
                    <>
                      {role && (
                        <div className="flex items-center gap-2 px-4 py-2">
                          <span className="rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/20 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--gold)]">
                            {role}
                          </span>
                        </div>
                      )}
                      <Button
                        variant="ghost"
                        size="md"
                        className="w-full justify-start text-[var(--accent-rose)]"
                        onClick={handleLogout}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Log out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="ghost"
                        size="md"
                        className="w-full"
                        asChild
                      >
                        <Link href="/login">Log in</Link>
                      </Button>
                      <Button
                        variant="primary"
                        size="md"
                        className="w-full rounded-full"
                        asChild
                      >
                        <Link href="/register">Get started</Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
