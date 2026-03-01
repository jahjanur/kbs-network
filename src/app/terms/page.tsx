"use client";

import { motion } from "framer-motion";
import { Header } from "@/components/header";
import { AmbientBg } from "@/components/ambient-bg";

const sections = [
  {
    title: "1. Acceptance of Terms",
    content:
      "By accessing or using KBs Network, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the platform.",
  },
  {
    title: "2. Description of Service",
    content:
      "KBs Network is a professional networking platform for the football industry. We connect players, coaches, clubs, scouts, and other football professionals. The platform includes profile creation, job listings, search and discovery, messaging, and related features.",
  },
  {
    title: "3. User Accounts",
    content:
      "You must provide accurate and complete information when creating an account. You are responsible for maintaining the security of your account credentials. You must be at least 16 years old to create an account. One person may only maintain one account.",
  },
  {
    title: "4. Acceptable Use",
    content:
      "You agree to use KBs Network only for lawful purposes related to football networking and career development. You may not use the platform to harass, spam, or mislead other users. You may not scrape, crawl, or use automated means to access the platform without our permission. You may not impersonate others or create fraudulent profiles.",
  },
  {
    title: "5. Content & Profiles",
    content:
      "You retain ownership of content you post on KBs Network. By posting content, you grant us a license to display and distribute it within the platform. You are responsible for ensuring your content is accurate and does not violate any laws or third-party rights. We reserve the right to remove content that violates these terms.",
  },
  {
    title: "6. Premium Subscriptions",
    content:
      "Paid plans are billed monthly or annually as selected. You can cancel your subscription at any time; access continues until the end of the billing period. Refunds are provided in accordance with applicable consumer protection laws. We may change pricing with 30 days notice.",
  },
  {
    title: "7. Intellectual Property",
    content:
      "The KBs Network platform, including its design, features, and branding, is owned by KBs Football Network. You may not copy, modify, or distribute any part of the platform without our written permission.",
  },
  {
    title: "8. Limitation of Liability",
    content:
      "KBs Network is provided 'as is' without warranties of any kind. We are not liable for any indirect, incidental, or consequential damages arising from your use of the platform. Our total liability is limited to the amount you paid for the service in the 12 months preceding the claim.",
  },
  {
    title: "9. Termination",
    content:
      "We may suspend or terminate your account if you violate these terms. You may delete your account at any time through your profile settings. Upon termination, your right to use the platform ceases immediately.",
  },
  {
    title: "10. Governing Law",
    content:
      "These terms are governed by the laws of Austria. Any disputes shall be resolved in the courts of Vienna, Austria, subject to applicable EU consumer protection regulations.",
  },
  {
    title: "11. Changes to Terms",
    content:
      "We may update these terms from time to time. We will notify you of significant changes via email or platform notification. Continued use of the platform after changes constitutes acceptance.",
  },
  {
    title: "12. Contact",
    content:
      "For questions about these terms, contact us at legal@kbs-network.com. KBs Football Network, Vienna, Austria.",
  },
];

export default function TermsPage() {
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
              Terms of Service
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
            <div className="space-y-8">
              {sections.map((section) => (
                <div key={section.title}>
                  <h2 className="text-lg font-bold text-[var(--foreground)] mb-2">
                    {section.title}
                  </h2>
                  <p className="text-sm text-[var(--foreground-muted)] leading-relaxed">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
}
