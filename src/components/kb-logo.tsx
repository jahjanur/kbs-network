"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface KBLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

// Icon: 400×400 viewBox → square
const iconSizes = { sm: 40, md: 48, lg: 64 };

// Full logo: 400×150 viewBox → 8:3 ratio
const logoHeights = { sm: 38, md: 46, lg: 58 };
const logoWidths  = { sm: 101, md: 123, lg: 155 };

export function KBLogo({ className, size = "md", showText = true }: KBLogoProps) {
  const iSize  = iconSizes[size];
  const lH     = logoHeights[size];
  const lW     = logoWidths[size];

  if (!showText) {
    return (
      <div className={cn("relative shrink-0", className)}>
        {/* Light mode → dark icon */}
        <Image
          src="/DarkIcon.svg"
          alt="KBs Network"
          width={iSize}
          height={iSize}
          className="block dark:hidden"
          priority
        />
        {/* Dark mode → white icon */}
        <Image
          src="/WhiteIcon.svg"
          alt="KBs Network"
          width={iSize}
          height={iSize}
          className="hidden dark:block"
          priority
        />
      </div>
    );
  }

  return (
    <div className={cn("relative shrink-0", className)}>
      {/* Light mode → dark full logo */}
      <Image
        src="/DarkFullLogo.svg"
        alt="KBs Network"
        width={lW}
        height={lH}
        className="block dark:hidden"
        priority
      />
      {/* Dark mode → white full logo */}
      <Image
        src="/WhiteFullLogo.svg"
        alt="KBs Network"
        width={lW}
        height={lH}
        className="hidden dark:block"
        priority
      />
    </div>
  );
}
