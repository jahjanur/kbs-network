"use client";

import { cn } from "@/lib/utils";

interface AmbientBgProps {
  className?: string;
  orbs?: boolean;
  grid?: boolean;
  gradient?: boolean;
}

export function AmbientBg({ className, orbs = true, grid = true, gradient = true }: AmbientBgProps) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden
    >
      {gradient && (
        <>
          <div
            className="absolute inset-0 opacity-60 dark:opacity-40"
            style={{
              background: `
                radial-gradient(ellipse 80% 50% at 50% -20%, rgba(245, 166, 35, 0.12), transparent 60%),
                radial-gradient(ellipse 60% 40% at 85% 50%, rgba(59, 130, 246, 0.06), transparent 50%),
                radial-gradient(ellipse 50% 30% at 15% 80%, rgba(139, 92, 246, 0.05), transparent 50%)
              `,
            }}
          />
          {/* Top accent line */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/3 opacity-40"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(245, 166, 35, 0.4), transparent)",
            }}
          />
        </>
      )}

      {orbs && (
        <>
          {/* Gold orb — left */}
          <div
            className="absolute -left-[15%] top-[5%] h-[500px] w-[500px] rounded-full opacity-15 dark:opacity-10"
            style={{
              background: "radial-gradient(circle, rgba(245, 166, 35, 0.3) 0%, transparent 65%)",
              animation: "float 22s ease-in-out infinite",
            }}
          />
          {/* Blue orb — right */}
          <div
            className="absolute -right-[10%] top-[35%] h-[400px] w-[400px] rounded-full opacity-10 dark:opacity-[0.06]"
            style={{
              background: "radial-gradient(circle, rgba(59, 130, 246, 0.25) 0%, transparent 65%)",
              animation: "float-slow 28s ease-in-out infinite",
              animationDelay: "-5s",
            }}
          />
          {/* Subtle violet orb — bottom */}
          <div
            className="absolute bottom-[10%] left-[25%] h-[350px] w-[350px] rounded-full opacity-8 dark:opacity-[0.05]"
            style={{
              background: "radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 65%)",
              animation: "float 26s ease-in-out infinite",
              animationDelay: "-10s",
            }}
          />
          {/* Small gold accent — center */}
          <div
            className="absolute top-[60%] right-[30%] h-[200px] w-[200px] rounded-full opacity-10 dark:opacity-[0.06]"
            style={{
              background: "radial-gradient(circle, rgba(245, 166, 35, 0.25) 0%, transparent 60%)",
              animation: "float-slow 20s ease-in-out infinite",
              animationDelay: "-8s",
            }}
          />
        </>
      )}

      {grid && (
        <div
          className="absolute inset-0 opacity-[0.025] dark:opacity-[0.035]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(148, 163, 184, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(148, 163, 184, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: "72px 72px",
          }}
        />
      )}

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />
    </div>
  );
}
