"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail, Lock, ArrowRight, AlertCircle, Eye, EyeOff } from "lucide-react";
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
  const [showPassword, setShowPassword] = useState(false);
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
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] tracking-tight">
          Welcome back
        </h1>
        <p className="mt-2 text-sm text-[var(--foreground-muted)]">
          Sign in to continue to your dashboard
        </p>
      </div>

      {/* Auth error */}
      <AnimatePresence>
        {authError && (
          <motion.div
            className="mb-5 flex items-center gap-2.5 rounded-xl bg-red-500/8 border border-red-500/15 px-4 py-3 text-sm text-red-600 dark:text-red-400"
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

        {/* Password */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-[var(--foreground)]">
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-xs font-medium text-[var(--gold)] hover:text-[var(--gold-light)] transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--foreground-subtle)]" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="input-field pl-10 pr-10"
              autoComplete="current-password"
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--foreground-subtle)] hover:text-[var(--foreground-muted)] transition-colors"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1.5 text-xs text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full rounded-xl"
          disabled={isSubmitting}
        >
          Sign in
          <ArrowRight className="h-4 w-4 ml-1.5" />
        </Button>
      </form>

      {/* Divider */}
      <div className="relative my-7">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[var(--surface-border)]" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-[var(--background)] px-3 text-[var(--foreground-subtle)]">or</span>
        </div>
      </div>

      {/* Social login (mock) */}
      <div className="space-y-3">
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2.5 rounded-xl border border-[var(--surface-border)] bg-[var(--background)] px-4 py-2.5 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--surface-highlight)] transition-colors"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
              opacity="0.7"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              opacity="0.8"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              opacity="0.6"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              opacity="0.9"
            />
          </svg>
          Continue with Google
        </button>
      </div>

      {/* Sign up link */}
      <p className="mt-8 text-center text-sm text-[var(--foreground-muted)]">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-semibold text-[var(--gold)] hover:text-[var(--gold-light)] transition-colors"
        >
          Sign up
        </Link>
      </p>
    </motion.div>
  );
}
