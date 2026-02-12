"use client";

import { cn } from "@/lib/utils";

interface KBLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

const sizes = { sm: 32, md: 40, lg: 52 };

export function KBLogo({ className, size = "md", showText = true }: KBLogoProps) {
  const s = sizes[size];
  return (
    <div className={cn("flex items-center gap-2.5 group", className)}>
      <div className="relative">
        <svg
          width={s}
          height={s}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0 drop-shadow-[0_0_8px_rgba(245,166,35,0.2)] transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(245,166,35,0.35)]"
        >
          {/* Shield bg with gold gradient */}
          <defs>
            <linearGradient id="kb-gold" x1="4" y1="2" x2="44" y2="46" gradientUnits="userSpaceOnUse">
              <stop stopColor="#f5a623" />
              <stop offset="1" stopColor="#d4a017" />
            </linearGradient>
            <linearGradient id="kb-gold-light" x1="4" y1="2" x2="44" y2="46" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ffd740" />
              <stop offset="1" stopColor="#f5a623" />
            </linearGradient>
          </defs>
          <path
            d="M24 2L44 12v24L24 46L4 36V12L24 2z"
            stroke="url(#kb-gold)"
            strokeWidth="2.5"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M24 2v44M4 12l20 10 20-10M4 36l20-10 20 10"
            stroke="url(#kb-gold-light)"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.5"
          />
          <text
            x="24"
            y="28"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="url(#kb-gold)"
            style={{ fontFamily: "system-ui, sans-serif", fontSize: 13, fontWeight: 800, letterSpacing: "0.5px" }}
          >
            KB
          </text>
        </svg>
      </div>
      {showText && (
        <span className="font-semibold tracking-tight text-[var(--foreground)] text-sm sm:text-base">
          Football Network
        </span>
      )}
    </div>
  );
}
