"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LogIn, Mail, Lock, ArrowRight, AlertCircle } from "lucide-react";
import {
  validateCredentials,
  isLoggedIn,
  isOnboardingComplete,
  getStoredRole,
} from "@/lib/user-store";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "At least 6 characters"),
});

type LoginData = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const [authError, setAuthError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    if (isLoggedIn() && isOnboardingComplete()) {
      router.replace("/dashboard");
    }
  }, [router]);

  const onSubmit = (data: LoginData) => {
    setAuthError(null);

    if (!validateCredentials(data.email, data.password)) {
      setAuthError("Invalid email or password");
      return;
    }

    // Credentials valid — route based on onboarding state
    const role = getStoredRole();
    if (!role) {
      router.push("/register/role");
      return;
    }

    if (!isOnboardingComplete()) {
      router.push(`/onboarding/${role}`);
      return;
    }

    router.push("/dashboard");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
    >
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--gold)]/10 border border-[var(--gold)]/20">
          <LogIn className="h-6 w-6 text-[var(--gold)]" />
        </div>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Welcome back</h1>
        <p className="mt-1 text-sm text-[var(--foreground-muted)]">Sign in to your account</p>
      </div>

      {/* Auth error */}
      <AnimatePresence>
        {authError && (
          <motion.div
            className="mb-4 flex items-center gap-2 rounded-xl border border-[var(--accent-rose)]/20 bg-[var(--accent-rose)]/10 px-4 py-3 text-sm text-[var(--accent-rose)]"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <AlertCircle className="h-4 w-4 shrink-0" />
            {authError}
          </motion.div>
        )}
      </AnimatePresence>

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

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-sm font-medium text-[var(--foreground-muted)]">Password</label>
            <Link href="/forgot-password" className="text-xs text-[var(--gold)] hover:underline">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--foreground-subtle)]" />
            <input
              type="password"
              placeholder="••••••••"
              className="input-field pl-10"
              {...register("password")}
            />
          </div>
          {errors.password && <p className="mt-1 text-xs text-[var(--accent-rose)]">{errors.password.message}</p>}
        </div>

        <Button type="submit" variant="primary" size="lg" className="w-full rounded-xl mt-2" disabled={isSubmitting}>
          Sign in
          <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-[var(--foreground-muted)]">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-medium text-[var(--gold)] hover:underline">
          Sign up
        </Link>
      </p>
    </motion.div>
  );
}
