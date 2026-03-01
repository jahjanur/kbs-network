"use client";

import { motion } from "framer-motion";
import { Header } from "@/components/header";
import { AmbientBg } from "@/components/ambient-bg";

const sections = [
  {
    title: "1. Information We Collect",
    content: [
      "Account information: When you register, we collect your name, email address, role (player, coach, club, scout), and profile details you choose to provide.",
      "Profile data: Information you add to your profile such as experience, skills, location, and media uploads.",
      "Usage data: We collect information about how you interact with the platform, including pages visited, features used, and search queries.",
      "Device information: Browser type, operating system, IP address, and device identifiers for security and analytics purposes.",
    ],
  },
  {
    title: "2. How We Use Your Information",
    content: [
      "To provide and maintain the KBs Network platform and its features.",
      "To personalize your experience, including search results and recommendations.",
      "To communicate with you about your account, updates, and opportunities.",
      "To improve our platform through analytics and user feedback.",
      "To ensure the security and integrity of our platform.",
    ],
  },
  {
    title: "3. Information Sharing",
    content: [
      "Your public profile information is visible to other registered users based on your visibility settings.",
      "We do not sell your personal information to third parties.",
      "We may share anonymized, aggregated data for analytics and research purposes.",
      "We may disclose information when required by law or to protect our rights and safety.",
    ],
  },
  {
    title: "4. Data Security",
    content: [
      "We implement industry-standard security measures to protect your data, including encryption in transit and at rest.",
      "Access to personal data is restricted to authorized personnel only.",
      "We regularly review and update our security practices.",
    ],
  },
  {
    title: "5. Your Rights",
    content: [
      "Access: You can request a copy of your personal data at any time.",
      "Correction: You can update or correct your information through your profile settings.",
      "Deletion: You can request deletion of your account and associated data.",
      "Portability: You can request your data in a machine-readable format.",
      "These rights are in accordance with the EU General Data Protection Regulation (GDPR).",
    ],
  },
  {
    title: "6. Cookies",
    content: [
      "We use essential cookies to keep you logged in and maintain your session.",
      "Analytics cookies help us understand platform usage (you can opt out).",
      "For more details, see our Cookie Policy.",
    ],
  },
  {
    title: "7. Contact",
    content: [
      "For privacy-related inquiries, contact us at privacy@kbs-network.com.",
      "KBs Football Network, Vienna, Austria.",
    ],
  },
];

export default function PrivacyPage() {
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
              Privacy Policy
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
            <p className="text-[var(--foreground-muted)] leading-relaxed mb-8">
              At KBs Network, we take your privacy seriously. This policy
              explains how we collect, use, and protect your personal
              information when you use our platform.
            </p>

            <div className="space-y-8">
              {sections.map((section) => (
                <div key={section.title}>
                  <h2 className="text-lg font-bold text-[var(--foreground)] mb-3">
                    {section.title}
                  </h2>
                  <ul className="space-y-2">
                    {section.content.map((item, i) => (
                      <li
                        key={i}
                        className="text-sm text-[var(--foreground-muted)] leading-relaxed pl-4 border-l-2 border-[var(--surface-border)]"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
}
