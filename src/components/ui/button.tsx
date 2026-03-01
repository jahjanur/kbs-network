"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-offset-[var(--background)] active:scale-[0.97]",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-r from-[#d4a017] to-[#f5c518] text-[#0a0e17] font-semibold shadow-lg shadow-[rgba(212,160,23,0.25)] hover:shadow-xl hover:shadow-[rgba(212,160,23,0.35)] hover:scale-[1.02] dark:from-[#f5a623] dark:to-[#ffd740] dark:shadow-[rgba(245,166,35,0.2)] dark:hover:shadow-[rgba(245,166,35,0.35)] relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700",
        outline:
          "border-2 border-[var(--gold)] text-[var(--gold)] hover:bg-[var(--gold)]/10 hover:scale-[1.02]",
        ghost:
          "text-[var(--foreground-muted)] hover:bg-[var(--gold)]/10 hover:text-[var(--foreground)]",
        dark:
          "bg-[#0b203f] text-white hover:bg-[#122b4d] border border-white/10 shadow-lg dark:bg-[#0b203f] dark:border-white/10 dark:hover:bg-[#122b4d]",
        danger:
          "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 hover:border-red-500/40",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-sm",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 text-lg",
        icon: "h-11 w-11 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({ className, variant, size, asChild, ...props }: ButtonProps) {
  const comp = asChild ? "span" : "button";
  const merged = cn(buttonVariants({ variant, size, className }));
  if (asChild && props.children && React.isValidElement(props.children)) {
    return React.cloneElement(props.children as React.ReactElement<{ className?: string }>, {
      className: cn(merged, (props.children as React.ReactElement<{ className?: string }>).props?.className),
    });
  }
  const Component = comp as "button";
  return <Component className={merged} {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)} />;
}
