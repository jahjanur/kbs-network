"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { AmbientBg } from "@/components/ambient-bg";
import { DiscoverClient } from "./discover-client";
import { isLoggedIn } from "@/lib/user-store";

export default function DiscoverPage() {
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn()) {
      router.replace("/dashboard/discover");
    }
  }, [router]);

  return (
    <div className="relative min-h-screen bg-[var(--background)]">
      <AmbientBg orbs={false} grid gradient />
      <Header />
      <DiscoverClient />
    </div>
  );
}
