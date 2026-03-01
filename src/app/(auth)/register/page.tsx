"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail, Lock, ArrowRight, Check, Eye, EyeOff } from "lucide-react";
import { setStoredCredentials, isLoggedIn, isOnboardingComplete } from "@/lib/user-store";

const schema = z
  .object({
    email: z.string().email("Enter a valid email"),
    password: z.string().min(6, "At least 6 characters"),
    confirm: z.string().min(1, "Please confirm your password"),
  })
  .refine((d) => d.password === d.confirm, { message: "Passwords don't match", path: ["confirm"] });

type RegisterData = z.infer<typeof schema>;

export default function RegisterPage() {
  const router = useRouter();
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterData>({ resolver: zodResolver(schema) });

  const password = watch("password", "");

  useEffect(() => {
    if (isLoggedIn() && isOnboardingComplete()) {
      router.replace("/dashboard");
    }
  }, [router]);

  useEffect(() => {
    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 10) score++;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    setPasswordStrength(Math.min(score, 4));
  }, [password]);

  const onSubmit = (data: RegisterData) => {
    setStoredCredentials(data.email, data.password);
    router.push("/register/role");
  };

  const strengthColors = [
    "bg-[var(--surface-border)]",
    "bg-red-400",
    "bg-amber-400",
    "bg-emerald-400",
    "bg-emerald-500",
  ];
  const strengthLabels = ["", "Weak", "Fair", "Good", "Strong"];
  const strengthLabelColors = [
    "",
    "text-red-400",
    "text-amber-400",
    "text-emerald-400",
    "text-emerald-500",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] tracking-tight">
          Create your account
        </h1>
        <p className="mt-2 text-sm text-[var(--foreground-muted)]">
          Join thousands of football professionals on KBs Network
        </p>
      </div>

      {/* Social signup (mock) */}
      <button
        type="button"
        className="w-full flex items-center justify-center gap-2.5 rounded-xl border border-[var(--surface-border)] bg-[var(--background)] px-4 py-2.5 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--surface-highlight)] transition-colors mb-6"
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
        Sign up with Google
      </button>

      {/* Divider */}
      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[var(--surface-border)]" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-[var(--background)] px-3 text-[var(--foreground-subtle)]">
            or sign up with email
          </span>
        </div>
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

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--foreground-subtle)]" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Min. 6 characters"
              className="input-field pl-10 pr-10"
              autoComplete="new-password"
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

          {/* Password strength */}
          {password.length > 0 && (
            <div className="mt-2.5 flex items-center gap-2.5">
              <div className="flex gap-1 flex-1">
                {[1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                      passwordStrength >= level
                        ? strengthColors[passwordStrength]
                        : "bg-[var(--surface-border)]"
                    }`}
                  />
                ))}
              </div>
              <span
                className={`text-[11px] font-medium ${strengthLabelColors[passwordStrength] || "text-[var(--foreground-subtle)]"}`}
              >
                {strengthLabels[passwordStrength]}
              </span>
            </div>
          )}
        </div>

        {/* Confirm password */}
        <div>
          <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
            Confirm password
          </label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--foreground-subtle)]" />
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Re-enter your password"
              className="input-field pl-10 pr-10"
              autoComplete="new-password"
              {...register("confirm")}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--foreground-subtle)] hover:text-[var(--foreground-muted)] transition-colors"
              tabIndex={-1}
            >
              {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.confirm && (
            <p className="mt-1.5 text-xs text-red-500">{errors.confirm.message}</p>
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
          Create account
          <ArrowRight className="h-4 w-4 ml-1.5" />
        </Button>
      </form>

      {/* Trust note */}
      <div className="mt-5 flex items-center justify-center gap-1.5 text-[11px] text-[var(--foreground-subtle)]">
        <Check className="h-3 w-3 text-emerald-500" />
        Free to join — no credit card required
      </div>

      {/* Terms */}
      <p className="mt-4 text-center text-[11px] text-[var(--foreground-subtle)] leading-relaxed">
        By creating an account you agree to our{" "}
        <Link href="/terms" className="underline hover:text-[var(--foreground-muted)]">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="underline hover:text-[var(--foreground-muted)]">
          Privacy Policy
        </Link>
      </p>

      {/* Sign in link */}
      <p className="mt-6 text-center text-sm text-[var(--foreground-muted)]">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-[var(--gold)] hover:text-[var(--gold-light)] transition-colors"
        >
          Sign in
        </Link>
      </p>
    </motion.div>
  );
}
