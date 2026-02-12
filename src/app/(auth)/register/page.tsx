"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { UserPlus, Mail, Lock, ArrowRight } from "lucide-react";

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
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: RegisterData) => {
    console.log("register", data);
    router.push("/register/role");
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
          <UserPlus className="h-6 w-6 text-[var(--gold)]" />
        </div>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Create your account</h1>
        <p className="mt-1 text-sm text-[var(--foreground-muted)]">Join the football network</p>
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
              placeholder="••••••••"
              className="input-field pl-10"
              {...register("password")}
            />
          </div>
          {errors.password && <p className="mt-1 text-xs text-[var(--accent-rose)]">{errors.password.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Confirm password</label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--foreground-subtle)]" />
            <input
              type="password"
              placeholder="••••••••"
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

      <p className="mt-6 text-center text-sm text-[var(--foreground-muted)]">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-[var(--gold)] hover:underline">
          Sign in
        </Link>
      </p>
    </motion.div>
  );
}
