"use client";

import Link from "next/link";
import { KBLogo } from "@/components/kb-logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Shield, Users, Globe, Trophy } from "lucide-react";

const stats = [
  { icon: Users, value: "5,000+", label: "Active members" },
  { icon: Globe, value: "50+", label: "Countries" },
  { icon: Trophy, value: "200+", label: "Clubs" },
];

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* ── Left branding panel (hidden on mobile) ─────────── */}
      <div className="hidden lg:flex lg:w-[480px] xl:w-[520px] shrink-0 flex-col justify-between relative overflow-hidden bg-[#0a0e17]">
        {/* Background gradients */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              background: `
                radial-gradient(ellipse 80% 60% at 30% 10%, rgba(245, 166, 35, 0.12), transparent 55%),
                radial-gradient(ellipse 60% 50% at 80% 80%, rgba(11, 32, 63, 0.3), transparent 50%)
              `,
            }}
          />
          {/* Dot grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          {/* Gold accent line at top */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(245, 166, 35, 0.4), transparent)",
            }}
          />
        </div>

        {/* Top: logo */}
        <div className="relative z-10 p-8">
          <Link href="/">
            <KBLogo size="md" />
          </Link>
        </div>

        {/* Center: tagline */}
        <div className="relative z-10 flex-1 flex flex-col justify-center px-8 pb-8">
          <h2 className="text-3xl xl:text-4xl font-extrabold text-white tracking-tight leading-[1.15]">
            Where football
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f5a623] to-[#ffd740]">
              talent meets
            </span>
            <br />
            opportunity.
          </h2>
          <p className="mt-4 text-sm text-white/50 max-w-xs leading-relaxed">
            Join the network connecting players, coaches, clubs, scouts, and sponsors across the football world.
          </p>

          {/* Stats */}
          <div className="flex gap-6 mt-10">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="flex items-center gap-1.5 mb-1">
                  <s.icon className="h-3.5 w-3.5 text-[#f5a623]" />
                  <span className="text-lg font-bold text-white">{s.value}</span>
                </div>
                <span className="text-[11px] text-white/40">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom: testimonial */}
        <div className="relative z-10 p-8 border-t border-white/[0.06]">
          <blockquote className="text-sm text-white/60 italic leading-relaxed">
            &ldquo;KBs Network helped me find a coaching role in Austria within two weeks. The platform is incredible.&rdquo;
          </blockquote>
          <div className="flex items-center gap-3 mt-4">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#f5a623] to-[#ffd740] flex items-center justify-center text-xs font-bold text-[#0a0e17]">
              MK
            </div>
            <div>
              <p className="text-xs font-semibold text-white/80">Marco K.</p>
              <p className="text-[11px] text-white/40">Youth Coach, Salzburg</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right form panel ───────────────────────────────── */}
      <div className="flex-1 flex flex-col min-h-screen bg-[var(--background)]">
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 sm:px-8 py-5">
          <Link href="/" className="lg:hidden">
            <KBLogo size="sm" showText={false} />
          </Link>
          {/* Spacer for lg */}
          <div className="hidden lg:block" />
          <ThemeToggle />
        </div>

        {/* Form area */}
        <div className="flex-1 flex items-center justify-center px-5 sm:px-8 pb-12">
          <div className="w-full max-w-[420px]">{children}</div>
        </div>

        {/* Bottom */}
        <div className="px-5 sm:px-8 pb-6 flex items-center justify-center gap-1.5 text-[11px] text-[var(--foreground-subtle)]">
          <Shield className="h-3 w-3" />
          <span>Your data is encrypted and secure</span>
        </div>
      </div>
    </div>
  );
}
