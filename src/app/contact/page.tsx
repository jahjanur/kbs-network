"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/header";
import { AmbientBg } from "@/components/ambient-bg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@kbs-network.com",
    href: "mailto:hello@kbs-network.com",
  },
  {
    icon: MapPin,
    label: "Office",
    value: "Vienna, Austria",
    href: null,
  },
  {
    icon: Clock,
    label: "Response time",
    value: "Within 24 hours",
    href: null,
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

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
              Get in Touch
            </h1>
            <p className="mt-4 text-lg text-[var(--foreground-muted)] max-w-xl mx-auto">
              Have a question, partnership inquiry, or feedback? We&apos;d love
              to hear from you.
            </p>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-5">
            {/* Contact Info */}
            <motion.div
              className="lg:col-span-2 space-y-4"
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {contactInfo.map((c) => (
                <div key={c.label} className="glass-card p-5">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-xl bg-[var(--gold)]/10 flex items-center justify-center shrink-0">
                      <c.icon className="h-5 w-5 text-[var(--gold)]" />
                    </div>
                    <div>
                      <p className="text-sm text-[var(--foreground-muted)]">
                        {c.label}
                      </p>
                      {c.href ? (
                        <a
                          href={c.href}
                          className="text-[var(--foreground)] font-medium hover:text-[var(--gold)] transition-colors"
                        >
                          {c.value}
                        </a>
                      ) : (
                        <p className="text-[var(--foreground)] font-medium">
                          {c.value}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Contact Form */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="glass-card p-7 sm:p-8">
                {submitted ? (
                  <div className="text-center py-12">
                    <CheckCircle2 className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-[var(--foreground-muted)]">
                      We&apos;ll get back to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
                          Name
                        </label>
                        <Input
                          required
                          placeholder="Your name"
                          className="bg-[var(--background)] border-[var(--surface-border)]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
                          Email
                        </label>
                        <Input
                          type="email"
                          required
                          placeholder="you@example.com"
                          className="bg-[var(--background)] border-[var(--surface-border)]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
                        Subject
                      </label>
                      <Input
                        required
                        placeholder="How can we help?"
                        className="bg-[var(--background)] border-[var(--surface-border)]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
                        Message
                      </label>
                      <textarea
                        required
                        rows={5}
                        placeholder="Tell us more..."
                        className="w-full rounded-lg bg-[var(--background)] border border-[var(--surface-border)] px-3 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--foreground-subtle)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/30 resize-none"
                      />
                    </div>
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full rounded-xl"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </>
  );
}
