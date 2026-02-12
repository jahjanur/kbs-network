"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail, ArrowRight, KeyRound } from "lucide-react";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
});

type ForgotData = z.infer<typeof schema>;

export default function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: ForgotData) => {
    console.log("forgot-password", data);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
    >
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--gold)]/10 border border-[var(--gold)]/20">
          <KeyRound className="h-6 w-6 text-[var(--gold)]" />
        </div>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Reset password</h1>
        <p className="mt-1 text-sm text-[var(--foreground-muted)]">
          We&apos;ll send a reset link to your email
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Email</label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--foreground-subtle)]" />
            <input
              type="email"
              placeholder="you@example.com"
              className="input-field pl-10"
              {...register("email")}
            />
          </div>
          {errors.email && <p className="mt-1 text-xs text-[var(--accent-rose)]">{errors.email.message}</p>}
        </div>

        <Button type="submit" variant="primary" size="lg" className="w-full rounded-xl" disabled={isSubmitting}>
          Send reset link
          <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-[var(--foreground-muted)]">
        Remember your password?{" "}
        <Link href="/login" className="font-medium text-[var(--gold)] hover:underline">
          Sign in
        </Link>
      </p>
    </motion.div>
  );
}
