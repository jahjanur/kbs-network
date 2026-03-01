"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Header } from "@/components/header";
import { AmbientBg } from "@/components/ambient-bg";

const cookieTypes = [
  {
    name: "Essential Cookies",
    required: true,
    description:
      "These cookies are necessary for the platform to function. They enable core features like authentication, session management, and security. Without these cookies, the platform cannot operate properly.",
    examples: [
      "Session ID — keeps you logged in",
      "CSRF token — protects against cross-site attacks",
      "Cookie consent preference — remembers your choice",
    ],
  },
  {
    name: "Analytics Cookies",
    required: false,
    description:
      "These cookies help us understand how users interact with the platform. We use this data to improve features, fix issues, and optimize the user experience. All analytics data is anonymized.",
    examples: [
      "Page views and navigation paths",
      "Feature usage frequency",
      "Error and performance monitoring",
    ],
  },
  {
    name: "Preference Cookies",
    required: false,
    description:
      "These cookies remember your settings and preferences to provide a more personalized experience.",
    examples: [
      "Theme preference (light/dark mode)",
      "Language selection",
      "Dashboard layout preferences",
    ],
  },
];

export default function CookiesPage() {
  return (
    <>
      <Header />
      <main className="relative min-h-screen overflow-hidden">
        <AmbientBg orbs grid gradient />

        <div className="relative z-10 mx-auto max-w-3xl px-4 py-20 sm:py-28">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1] as const,
            }}
          >
            <h1 className="text-4xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-5xl">
              Cookie Policy
            </h1>
            <p className="mt-4 text-sm text-[var(--foreground-subtle)]">
              Last updated: March 2026
            </p>
          </motion.div>

          <motion.div
            className="glass-card p-7 sm:p-10"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="space-y-6 mb-10">
              <p className="text-[var(--foreground-muted)] leading-relaxed">
                KBs Network uses cookies to ensure the platform works correctly,
                to improve your experience, and to understand how the platform is
                used. This policy explains what cookies we use and why.
              </p>
              <h2 className="text-lg font-bold text-[var(--foreground)]">
                What Are Cookies?
              </h2>
              <p className="text-sm text-[var(--foreground-muted)] leading-relaxed">
                Cookies are small text files stored on your device when you visit
                a website. They help the site remember your preferences and
                understand how you use it. Cookies can be &quot;session&quot;
                (deleted when you close your browser) or
                &quot;persistent&quot; (remain until they expire or you delete
                them).
              </p>
            </div>

            <div className="space-y-6">
              {cookieTypes.map((type) => (
                <div
                  key={type.name}
                  className="p-5 rounded-xl border border-[var(--surface-border)] bg-[var(--surface-highlight)]/30"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-[var(--foreground)]">
                      {type.name}
                    </h3>
                    <span
                      className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                        type.required
                          ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                          : "bg-[var(--surface-highlight)] text-[var(--foreground-subtle)] border-[var(--surface-border)]"
                      }`}
                    >
                      {type.required ? "Required" : "Optional"}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--foreground-muted)] leading-relaxed mb-3">
                    {type.description}
                  </p>
                  <ul className="space-y-1.5">
                    {type.examples.map((ex) => (
                      <li
                        key={ex}
                        className="text-xs text-[var(--foreground-subtle)] flex items-start gap-2"
                      >
                        <div className="h-1 w-1 rounded-full bg-[var(--foreground-subtle)] mt-1.5 shrink-0" />
                        {ex}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-8 border-t border-[var(--surface-border)] space-y-4">
              <h2 className="text-lg font-bold text-[var(--foreground)]">
                Managing Cookies
              </h2>
              <p className="text-sm text-[var(--foreground-muted)] leading-relaxed">
                You can control cookies through your browser settings. Most
                browsers allow you to block or delete cookies. Note that
                blocking essential cookies may prevent the platform from
                functioning correctly.
              </p>
              <p className="text-sm text-[var(--foreground-muted)] leading-relaxed">
                For more information about how we handle your data, see our{" "}
                <Link
                  href="/privacy"
                  className="text-[var(--gold)] hover:underline"
                >
                  Privacy Policy
                </Link>
                . For questions, contact us at{" "}
                <a
                  href="mailto:privacy@kbs-network.com"
                  className="text-[var(--gold)] hover:underline"
                >
                  privacy@kbs-network.com
                </a>
                .
              </p>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
}
