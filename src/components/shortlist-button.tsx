"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { isInShortlist, addToShortlist, removeFromShortlist } from "@/lib/user-store";
import type { ProfileType } from "@/lib/user-store";

interface ShortlistButtonProps {
  profileId: string;
  profileType: ProfileType;
  size?: "sm" | "md";
  className?: string;
}

export default function ShortlistButton({ profileId, profileType, size = "md", className = "" }: ShortlistButtonProps) {
  const [saved, setSaved] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setSaved(isInShortlist(profileId));
  }, [profileId]);

  function toggle(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (saved) {
      removeFromShortlist(profileId);
      setSaved(false);
    } else {
      addToShortlist(profileId, profileType);
      setSaved(true);
      setAnimate(true);
      setTimeout(() => setAnimate(false), 400);
    }
  }

  const iconSize = size === "sm" ? "h-4 w-4" : "h-5 w-5";
  const btnSize = size === "sm"
    ? "h-8 w-8"
    : "h-10 w-10";

  return (
    <button
      type="button"
      onClick={toggle}
      className={`relative inline-flex items-center justify-center rounded-full border transition-all duration-200 ${
        saved
          ? "border-rose-500/40 bg-rose-500/10 text-rose-500 hover:bg-rose-500/20"
          : "border-[var(--surface-border)] bg-[var(--surface)] text-[var(--foreground-muted)] hover:text-rose-500 hover:border-rose-500/30 hover:bg-rose-500/5"
      } ${btnSize} ${className}`}
      aria-label={saved ? "Remove from shortlist" : "Add to shortlist"}
    >
      <motion.div
        animate={animate ? { scale: [1, 1.3, 1] } : {}}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <Heart className={`${iconSize} ${saved ? "fill-current" : ""}`} />
      </motion.div>
    </button>
  );
}
