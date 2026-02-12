"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getStoredRole } from "@/lib/user-store";

export default function DashboardHomePage() {
  const router = useRouter();

  useEffect(() => {
    const role = getStoredRole();
    if (role) router.replace(`/dashboard/${role}`);
    else router.replace("/register/role");
  }, [router]);

  return (
    <div className="flex items-center justify-center py-12">
      <p className="text-[var(--foreground-muted)]">Loading dashboard...</p>
    </div>
  );
}
