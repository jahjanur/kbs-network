"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="relative py-32 sm:py-40 overflow-hidden">
      {/* Full-width gradient mesh background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% 50%, var(--gold-glow), transparent 70%)",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20 animate-spotlight"
          style={{
            background:
              "radial-gradient(circle, var(--gold) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--foreground-subtle) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.02em] text-[var(--foreground)]">
            Ready to elevate
            <br />
            <span className="text-gradient-gold">your game?</span>
          </h2>
          <p className="mt-6 text-lg sm:text-xl text-[var(--foreground-muted)] max-w-xl mx-auto leading-relaxed">
            Join thousands of football professionals building their careers on
            Austria&apos;s premier network.
          </p>
          <div className="mt-10">
            <div className="relative inline-block group">
              <div className="absolute inset-0 rounded-full bg-[var(--gold)] opacity-20 blur-xl group-hover:opacity-30 transition-opacity" />
              <Button
                variant="primary"
                size="xl"
                className="relative rounded-full px-14 text-lg shadow-xl shadow-[var(--gold-glow)]"
                asChild
              >
                <Link href="/register">
                  Join now — it&apos;s free
                  <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
