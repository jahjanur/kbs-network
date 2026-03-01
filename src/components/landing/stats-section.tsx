"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 5000, suffix: "+", label: "Active Players" },
  { value: 200, suffix: "+", label: "Verified Clubs" },
  { value: 50, suffix: "+", label: "Countries" },
  { value: 1200, suffix: "+", label: "Matches Made" },
];

function useCountUp(target: number, duration = 2000, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let current = 0;
    const step = target / (duration / 16);
    const id = setInterval(() => {
      current += step;
      if (current >= target) {
        setCount(target);
        clearInterval(id);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);
    return () => clearInterval(id);
  }, [active, target, duration]);
  return count;
}

function Stat({
  value,
  suffix,
  label,
  index,
  inView,
}: {
  value: number;
  suffix: string;
  label: string;
  index: number;
  inView: boolean;
}) {
  const count = useCountUp(value, 2000, inView);

  return (
    <motion.div
      className="flex flex-col items-center text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <span className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-[var(--foreground)] tabular-nums leading-none">
        {count.toLocaleString()}
        <span className="text-[var(--gold)]">{suffix}</span>
      </span>
      <span className="mt-2 text-sm sm:text-base text-[var(--foreground-muted)] font-medium">
        {label}
      </span>
    </motion.div>
  );
}

export function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <div className="rounded-3xl border border-[var(--surface-border)] bg-[var(--card-bg)]/40 backdrop-blur-sm px-6 py-14 sm:px-12 sm:py-20">
          {/* Gold top accent */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 h-[1px] w-1/3 pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--gold), transparent)",
              opacity: 0.3,
            }}
          />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 lg:gap-8">
            {stats.map((s, i) => (
              <div key={s.label} className="relative">
                <Stat {...s} index={i} inView={inView} />
                {/* Vertical divider (desktop only, not on last) */}
                {i < stats.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 -right-4 h-16 w-px bg-gradient-to-b from-transparent via-[var(--surface-border)] to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
