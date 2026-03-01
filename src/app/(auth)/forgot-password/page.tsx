"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
});

type ForgotData = z.infer<typeof schema>;

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const [sentEmail, setSentEmail] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: ForgotData) => {
    setSentEmail(data.email);
    setSent(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <AnimatePresence mode="wait">
        {!sent ? (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            {/* Back link */}
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors mb-8"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to sign in
            </Link>

            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] tracking-tight">
                Reset your password
              </h1>
              <p className="mt-2 text-sm text-[var(--foreground-muted)]">
                Enter your email and we&apos;ll send you a link to reset your password.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--foreground-subtle)]" />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="input-field pl-10"
                    autoComplete="email"
                    {...register("email")}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1.5 text-xs text-red-500">{errors.email.message}</p>
                )}
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full rounded-xl"
                disabled={isSubmitting}
              >
                Send reset link
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            {/* Success icon */}
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <CheckCircle2 className="h-7 w-7 text-emerald-500" />
            </div>

            <h2 className="text-2xl font-bold text-[var(--foreground)] tracking-tight">
              Check your inbox
            </h2>
            <p className="mt-3 text-sm text-[var(--foreground-muted)] max-w-sm mx-auto leading-relaxed">
              We&apos;ve sent a password reset link to{" "}
              <span className="font-semibold text-[var(--foreground)]">{sentEmail}</span>.
              It may take a minute to arrive.
            </p>

            <div className="mt-8 space-y-3">
              <Button
                variant="primary"
                size="lg"
                className="w-full rounded-xl"
                onClick={() => setSent(false)}
              >
                Send again
              </Button>
              <Link
                href="/login"
                className="block text-sm font-medium text-[var(--gold)] hover:text-[var(--gold-light)] transition-colors"
              >
                Back to sign in
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
