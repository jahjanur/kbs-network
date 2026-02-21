"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { UserPlus, Mail, Lock, ArrowRight, Check, Shield, Users, Zap } from "lucide-react";
import { setStoredCredentials, isLoggedIn, isOnboardingComplete } from "@/lib/user-store";

const schema = z
  .object({
    email: z.string().email("Enter a valid email"),
    password: z.string().min(6, "At least 6 characters"),
    confirm: z.string().min(1, "Please confirm your password"),
  })
  .refine((d) => d.password === d.confirm, { message: "Passwords don't match", path: ["confirm"] });

type RegisterData = z.infer<typeof schema>;

const perks = [
  { icon: Zap, text: "AI-powered matchmaking" },
  { icon: Shield, text: "Verified profiles" },
  { icon: Users, text: "5,000+ active members" },
];

export default function RegisterPage() {
  const router = useRouter();
  const [passwordStrength, setPasswordStrength] = useState(0);
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

  const strengthColors = ["bg-[var(--foreground-subtle)]/30", "bg-red-400", "bg-amber-400", "bg-emerald-400", "bg-emerald-500"];
  const strengthLabels = ["", "Weak", "Fair", "Good", "Strong"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
    >
      {/* Header */}
      <div className="mb-6 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--gold)] to-[var(--gold-light)] shadow-lg shadow-[var(--gold)]/20">
          <UserPlus className="h-7 w-7 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Join KBs Network</h1>
        <p className="mt-1.5 text-sm text-[var(--foreground-muted)]">
          The football networking platform trusted by thousands
        </p>
      </div>

      {/* Perks */}
      <div className="flex items-center justify-center gap-4 mb-6">
        {perks.map((perk) => (
          <div key={perk.text} className="flex items-center gap-1.5 text-[11px] text-[var(--foreground-muted)]">
            <perk.icon className="h-3 w-3 text-[var(--gold)]" />
            <span className="hidden sm:inline">{perk.text}</span>
          </div>
        ))}
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

        <div>
          <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Password</label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--foreground-subtle)]" />
            <input
              type="password"
              placeholder="Min. 6 characters"
              className="input-field pl-10"
              {...register("password")}
            />
          </div>
          {errors.password && <p className="mt-1 text-xs text-[var(--accent-rose)]">{errors.password.message}</p>}

          {/* Password strength */}
          {password.length > 0 && (
            <div className="mt-2 flex items-center gap-2">
              <div className="flex gap-1 flex-1">
                {[1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                      passwordStrength >= level ? strengthColors[passwordStrength] : "bg-[var(--surface-border)]"
                    }`}
                  />
                ))}
              </div>
              <span className="text-[10px] font-medium text-[var(--foreground-subtle)]">
                {strengthLabels[passwordStrength]}
              </span>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Confirm password</label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--foreground-subtle)]" />
            <input
              type="password"
              placeholder="Re-enter your password"
              className="input-field pl-10"
              {...register("confirm")}
            />
          </div>
          {errors.confirm && <p className="mt-1 text-xs text-[var(--accent-rose)]">{errors.confirm.message}</p>}
        </div>

        <Button type="submit" variant="primary" size="lg" className="w-full rounded-xl mt-2" disabled={isSubmitting}>
          Create account
          <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </form>

      {/* Trust note */}
      <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-[var(--foreground-subtle)]">
        <Check className="h-3 w-3 text-emerald-400" />
        Free to join. No credit card required.
      </div>

      <p className="mt-5 text-center text-sm text-[var(--foreground-muted)]">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-[var(--gold)] hover:underline">
          Sign in
        </Link>
      </p>
    </motion.div>
  );
}
