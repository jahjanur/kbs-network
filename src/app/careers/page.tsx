"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Header } from "@/components/header";
import { AmbientBg } from "@/components/ambient-bg";
import { Button } from "@/components/ui/button";
import { MapPin, Briefcase, ArrowRight, Zap } from "lucide-react";

const openings = [
  {
    title: "Full-Stack Developer",
    team: "Engineering",
    location: "Vienna / Remote",
    type: "Full-time",
    description:
      "Build the platform that connects the football world. Work with Next.js, TypeScript, and modern web tech.",
  },
  {
    title: "Product Designer",
    team: "Design",
    location: "Vienna / Remote",
    type: "Full-time",
    description:
      "Shape the user experience for thousands of football professionals. From research to polished UI.",
  },
  {
    title: "Football Industry Partnerships",
    team: "Business Development",
    location: "Vienna",
    type: "Full-time",
    description:
      "Build relationships with clubs, academies, and federations across Austria and Europe.",
  },
  {
    title: "Community Manager",
    team: "Marketing",
    location: "Remote",
    type: "Part-time",
    description:
      "Grow and engage our community of players, coaches, and scouts. Content, social media, and events.",
  },
];

const perks = [
  "Flexible remote work",
  "Football match tickets",
  "Learning budget",
  "Team retreats",
  "Competitive salary",
  "Equity options",
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function CareersPage() {
  return (
    <>
      <Header />
      <main className="relative min-h-screen overflow-hidden">
        <AmbientBg orbs grid gradient />

        <div className="relative z-10 mx-auto max-w-5xl px-4 py-20 sm:py-28">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1] as const,
            }}
          >
            <h1 className="text-4xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-5xl">
              Join Our Team
            </h1>
            <p className="mt-4 text-lg text-[var(--foreground-muted)] max-w-xl mx-auto">
              Help us build the future of football networking. We&apos;re a
              small, passionate team with big ambitions.
            </p>
          </motion.div>

          {/* Perks */}
          <motion.div
            className="glass-card p-7 sm:p-8 mb-12"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex items-center gap-2 mb-5">
              <Zap className="h-5 w-5 text-[var(--gold)]" />
              <h2 className="text-lg font-bold text-[var(--foreground)]">
                Why KBs Network?
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {perks.map((perk) => (
                <div
                  key={perk}
                  className="flex items-center gap-2 text-sm text-[var(--foreground-muted)]"
                >
                  <div className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
                  {perk}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Openings */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-4"
          >
            <motion.h2
              variants={item}
              className="text-2xl font-bold text-[var(--foreground)] mb-6"
            >
              Open Positions
            </motion.h2>
            {openings.map((role) => (
              <motion.div key={role.title} variants={item}>
                <div className="glass-card p-6 sm:p-7 transition-all duration-300 hover:border-[var(--gold)]/25 hover:-translate-y-0.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-[var(--foreground)] mb-1">
                        {role.title}
                      </h3>
                      <p className="text-sm text-[var(--foreground-muted)] mb-3">
                        {role.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--foreground-subtle)]">
                        <span className="flex items-center gap-1">
                          <Briefcase className="h-3 w-3" />
                          {role.team}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {role.location}
                        </span>
                        <span className="rounded-full bg-[var(--surface-highlight)] px-2.5 py-0.5 font-medium">
                          {role.type}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="shrink-0 rounded-lg"
                      asChild
                    >
                      <Link href="/contact">
                        Apply <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[var(--foreground-muted)] text-sm">
              Don&apos;t see a role that fits? Send us a message at{" "}
              <a
                href="mailto:careers@kbs-network.com"
                className="text-[var(--gold)] hover:underline"
              >
                careers@kbs-network.com
              </a>
            </p>
          </motion.div>
        </div>
      </main>
    </>
  );
}
