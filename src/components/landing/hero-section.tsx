"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Users,
  Building2,
  Map,
  ChevronDown,
  Activity,
  TrendingUp,
  Eye,
  Zap,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AustriaMap } from "@/components/austria-map";

const stats = [
  { icon: Users, value: "5,000+", label: "Active Players" },
  { icon: Building2, value: "120+", label: "Registered Clubs" },
  { icon: Map, value: "9", label: "Provinces" },
];

const ease = [0.22, 1, 0.36, 1] as const;

const liveMetrics = [
  { icon: Activity, label: "Scouts Online", value: "23", color: "text-emerald-400", dotColor: "bg-emerald-400" },
  { icon: TrendingUp, label: "Matches Today", value: "148", color: "text-[var(--gold)]", dotColor: "bg-[var(--gold)]" },
  { icon: Eye, label: "Profile Views", value: "2.4k", color: "text-[var(--accent-blue)]", dotColor: "bg-[var(--accent-blue)]" },
];

const activityFeed = [
  { name: "Lukas M.", action: "joined as Player", time: "2m ago", icon: Zap },
  { name: "FC Rapid", action: "scouting in Wien", time: "5m ago", icon: Eye },
  { name: "Sarah K.", action: "rated 4.9 ★", time: "8m ago", icon: Star },
];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const mapY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const mapScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col overflow-hidden"
    >
      {/* ── Background ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: bgOpacity }}
      >
        <div className="absolute inset-0 bg-[var(--background)]" />

        {/* Aurora bands */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute top-[10%] left-[-20%] w-[140%] h-[300px] opacity-60 dark:opacity-40"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, var(--hero-beam-1) 20%, var(--hero-mesh-1) 50%, var(--hero-beam-1) 80%, transparent 100%)",
              filter: "blur(60px)",
              animation: "aurora-drift 15s ease-in-out infinite",
            }}
          />
          <div
            className="absolute top-[30%] left-[-15%] w-[130%] h-[250px] opacity-70 dark:opacity-45"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, var(--hero-beam-2) 30%, var(--hero-mesh-2) 55%, var(--hero-beam-2) 75%, transparent 100%)",
              filter: "blur(70px)",
              animation: "aurora-drift 18s ease-in-out infinite",
              animationDelay: "-5s",
            }}
          />
          <div
            className="absolute top-[55%] left-[-10%] w-[120%] h-[200px] opacity-50 dark:opacity-35"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, var(--hero-beam-3) 25%, var(--hero-mesh-3) 50%, var(--hero-beam-3) 70%, transparent 100%)",
              filter: "blur(80px)",
              animation: "aurora-drift 22s ease-in-out infinite",
              animationDelay: "-11s",
            }}
          />
        </div>

        {/* Radiant beams */}
        <div
          className="absolute top-[35%] left-[30%] w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 opacity-[0.07] dark:opacity-[0.12]"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, var(--gold) 8deg, transparent 16deg, transparent 45deg, var(--accent-blue) 52deg, transparent 60deg, transparent 90deg, var(--gold) 96deg, transparent 104deg, transparent 135deg, var(--accent-violet) 140deg, transparent 148deg, transparent 180deg, var(--gold) 186deg, transparent 194deg, transparent 225deg, var(--accent-blue) 230deg, transparent 238deg, transparent 270deg, var(--gold) 276deg, transparent 284deg, transparent 315deg, var(--accent-violet) 320deg, transparent 328deg, transparent 360deg)",
            filter: "blur(1px)",
            maskImage:
              "radial-gradient(ellipse 50% 50% at 50% 50%, black 0%, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 50% 50% at 50% 50%, black 0%, transparent 70%)",
          }}
        />

        {/* Central orb glow */}
        <div
          className="absolute top-[35%] left-[30%] w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full animate-spotlight"
          style={{
            background:
              "radial-gradient(circle, var(--gold-glow) 0%, transparent 60%)",
            filter: "blur(40px)",
          }}
        />

        {/* Ambient gradient blobs */}
        <div
          className="absolute -top-[15%] -left-[5%] w-[55vw] h-[55vw] rounded-full opacity-25 dark:opacity-15 animate-gradient-mesh"
          style={{
            background:
              "radial-gradient(circle, var(--hero-mesh-1) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute -top-[10%] -right-[10%] w-[45vw] h-[45vw] rounded-full opacity-35 dark:opacity-20 animate-gradient-mesh"
          style={{
            background:
              "radial-gradient(circle, var(--hero-mesh-2) 0%, transparent 70%)",
            filter: "blur(100px)",
            animationDelay: "-7s",
          }}
        />
        <div
          className="absolute -bottom-[10%] left-[30%] w-[40vw] h-[40vw] rounded-full opacity-20 dark:opacity-15 animate-gradient-mesh"
          style={{
            background:
              "radial-gradient(circle, var(--hero-mesh-3) 0%, transparent 70%)",
            filter: "blur(90px)",
            animationDelay: "-13s",
          }}
        />

        {/* Noise grain */}
        <div
          className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: "128px 128px",
          }}
        />
      </motion.div>

      {/* Top gold accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-20"
        style={{
          background:
            "linear-gradient(90deg, transparent 10%, var(--gold) 50%, transparent 90%)",
        }}
      />

      {/* ── Content ── */}
      <motion.div
        className="relative z-10 flex-1 flex items-center mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 lg:pt-36 pb-24"
        style={{ y: contentY }}
      >
        <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-12 xl:gap-20 w-full">
          {/* ── Left: Text ── */}
          <div className="flex-1 text-center lg:text-left max-w-2xl lg:max-w-none space-y-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.6, ease }}
            >
              <span className="inline-flex items-center gap-2.5 rounded-full border border-[var(--gold)]/20 bg-[var(--gold)]/[0.06] px-5 py-2 text-[13px] font-medium text-[var(--gold)] backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--gold)] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--gold)]" />
                </span>
                Austria&apos;s #1 Football Network
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="text-[2.75rem] sm:text-6xl lg:text-[4.25rem] xl:text-[5.5rem] font-extrabold tracking-[-0.035em] text-[var(--foreground)] !leading-[0.92]"
              initial={{ opacity: 0, y: 32, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.1, ease }}
            >
              Where{" "}
              <span className="text-gradient-gold">Talent</span>
              <br />
              Meets{" "}
              <span className="text-gradient-gold">Opportunity</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="max-w-lg text-[1.05rem] sm:text-lg text-[var(--foreground-muted)] leading-relaxed mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, delay: 0.2, ease }}
            >
              Get discovered, get matched, get hired — the premium platform
              connecting players, coaches, and clubs across Austria.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              className="flex items-center gap-4 flex-wrap justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease }}
            >
              <div className="relative group">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)] opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-500" />
                <Button
                  variant="primary"
                  size="xl"
                  className="relative rounded-full px-10 shadow-lg shadow-[var(--gold-glow)] group"
                  asChild
                >
                  <Link href="/register">
                    Get started free
                    <ArrowRight className="h-5 w-5 ml-1 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
              <Button
                variant="outline"
                size="xl"
                className="rounded-full px-10"
                asChild
              >
                <Link href="/discover">Browse talent</Link>
              </Button>
            </motion.div>

            {/* Social proof avatars + stats */}
            <motion.div
              className="flex items-center gap-5 justify-center lg:justify-start pt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease }}
            >
              {/* Stacked avatars */}
              <div className="flex -space-x-2.5">
                {[
                  "bg-gradient-to-br from-[var(--gold)] to-[var(--gold-light)]",
                  "bg-gradient-to-br from-[var(--accent-blue)] to-[var(--accent-violet)]",
                  "bg-gradient-to-br from-[var(--accent-emerald)] to-[var(--accent-blue)]",
                  "bg-gradient-to-br from-[var(--accent-rose)] to-[var(--gold)]",
                ].map((bg, i) => (
                  <div
                    key={i}
                    className={`h-8 w-8 rounded-full ${bg} ring-2 ring-[var(--background)] flex items-center justify-center text-[10px] font-bold text-white`}
                  >
                    {["LM", "SK", "TR", "JB"][i]}
                  </div>
                ))}
                <div className="h-8 w-8 rounded-full bg-[var(--surface-highlight)] ring-2 ring-[var(--background)] flex items-center justify-center text-[10px] font-semibold text-[var(--foreground-muted)]">
                  +5k
                </div>
              </div>

              {/* Divider */}
              <div className="h-8 w-px bg-[var(--surface-border)]" />

              {/* Stats pills */}
              <div className="flex items-center gap-4">
                {stats.map((stat, i) => (
                  <div key={stat.label} className="flex items-center gap-2">
                    {i > 0 && (
                      <div className="h-4 w-px bg-[var(--surface-border)]" />
                    )}
                    <stat.icon className="h-3.5 w-3.5 text-[var(--gold)]" />
                    <div className="text-left">
                      <span className="text-sm font-bold text-[var(--foreground)] tracking-tight">
                        {stat.value}
                      </span>
                      <span className="hidden sm:inline text-[10px] text-[var(--foreground-muted)] ml-1">
                        {stat.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── Right: Map dashboard card ── */}
          <motion.div
            className="flex-1 w-full lg:w-auto min-w-0"
            initial={{ opacity: 0, x: 50, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease }}
            style={{ y: mapY, scale: mapScale }}
          >
            {/* Main glass card */}
            <div className="relative rounded-2xl border border-[var(--surface-border)] bg-[var(--card-bg)]/40 backdrop-blur-xl overflow-hidden shadow-2xl shadow-black/5 dark:shadow-black/30">
              {/* Gold accent top edge */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, var(--gold) 30%, var(--gold-light) 50%, var(--gold) 70%, transparent 100%)",
                  opacity: 0.4,
                }}
              />

              {/* Scan line animation */}
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.06]"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 0%, var(--gold) 50%, transparent 100%)",
                  backgroundSize: "100% 200px",
                  animation: "hero-scan 6s linear infinite",
                }}
              />

              {/* Header bar */}
              <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-[var(--surface-border)]/50">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-[var(--accent-rose)]/60" />
                    <div className="h-2.5 w-2.5 rounded-full bg-[var(--gold)]/60" />
                    <div className="h-2.5 w-2.5 rounded-full bg-[var(--accent-emerald)]/60" />
                  </div>
                  <div className="h-4 w-px bg-[var(--surface-border)]" />
                  <div className="flex items-center gap-1.5">
                    <Map className="h-3 w-3 text-[var(--gold)]" />
                    <span className="text-[11px] font-medium text-[var(--foreground-muted)]">
                      Network Overview
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-2.5 py-1">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-400">
                    LIVE
                  </span>
                </div>
              </div>

              {/* Live metrics row */}
              <div className="grid grid-cols-3 border-b border-[var(--surface-border)]/50">
                {liveMetrics.map((metric, i) => (
                  <motion.div
                    key={metric.label}
                    className={`flex flex-col items-center gap-1 py-3 px-2 ${i < 2 ? "border-r border-[var(--surface-border)]/50" : ""}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 + i * 0.1, ease }}
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${metric.dotColor} opacity-75`} />
                        <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${metric.dotColor}`} />
                      </span>
                      <span className={`text-lg font-bold ${metric.color}`}>
                        {metric.value}
                      </span>
                    </div>
                    <span className="text-[10px] text-[var(--foreground-subtle)] font-medium">
                      {metric.label}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Map area */}
              <div className="p-4 sm:p-5">
                <AustriaMap />
              </div>

              {/* Stats bar */}
              <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-t border-[var(--surface-border)]/50 bg-[var(--surface-highlight)]/30">
                <div className="flex items-center gap-1.5">
                  <Users className="h-3 w-3 text-[var(--gold)]" />
                  <span className="text-[11px] text-[var(--foreground-muted)]">
                    <span className="font-semibold text-[var(--foreground)]">5,240</span> players
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Building2 className="h-3 w-3 text-[var(--gold)]" />
                  <span className="text-[11px] text-[var(--foreground-muted)]">
                    <span className="font-semibold text-[var(--foreground)]">127</span> clubs
                  </span>
                </div>
                <div className="hidden sm:flex items-center gap-1.5">
                  <Activity className="h-3 w-3 text-emerald-400" />
                  <span className="text-[11px] text-[var(--foreground-muted)]">
                    <span className="font-semibold text-emerald-400">98%</span> uptime
                  </span>
                </div>
              </div>

              {/* Live activity feed */}
              <div className="px-4 sm:px-5 py-3 border-t border-[var(--surface-border)]/50 space-y-2">
                <span className="text-[10px] font-semibold text-[var(--foreground-subtle)] uppercase tracking-wider">
                  Recent Activity
                </span>
                {activityFeed.map((item, i) => (
                  <motion.div
                    key={item.name}
                    className="flex items-center gap-2.5"
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 1 + i * 0.2, ease }}
                  >
                    <div className="flex h-5 w-5 items-center justify-center rounded-md bg-[var(--gold)]/[0.08]">
                      <item.icon className="h-2.5 w-2.5 text-[var(--gold)]" />
                    </div>
                    <span className="text-[11px] text-[var(--foreground-muted)] flex-1">
                      <span className="font-semibold text-[var(--foreground)]">
                        {item.name}
                      </span>{" "}
                      {item.action}
                    </span>
                    <span className="text-[10px] text-[var(--foreground-subtle)]">
                      {item.time}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <span className="text-[10px] font-medium text-[var(--foreground-subtle)] tracking-[0.2em] uppercase">
          Scroll
        </span>
        <ChevronDown className="h-4 w-4 text-[var(--foreground-subtle)] animate-scroll-indicator" />
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--background)] to-transparent z-10 pointer-events-none" />
    </section>
  );
}
