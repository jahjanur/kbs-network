"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { LandingContent } from "@/components/landing-content";
import { isLoggedIn, isOnboardingComplete } from "@/lib/user-store";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn() && isOnboardingComplete()) {
      router.replace("/dashboard");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header />
      <LandingContent />
    </div>
  );
}
