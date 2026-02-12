"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getStoredRole, isOnboardingComplete } from "@/lib/user-store";

export default function OnboardingPage() {
  const router = useRouter();

  useEffect(() => {
    const role = getStoredRole();
    const done = isOnboardingComplete();
    if (done) {
      router.replace("/dashboard");
      return;
    }
    if (role) {
      router.replace(`/onboarding/${role}`);
      return;
    }
    router.replace("/register/role");
  }, [router]);

  return (
    <div className="flex items-center justify-center py-12">
      <p className="text-[var(--foreground-muted)]">Redirecting...</p>
    </div>
  );
}
