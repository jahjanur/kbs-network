import { Header } from "@/components/header";
import { AmbientBg } from "@/components/ambient-bg";
import { DiscoverClient } from "./discover-client";

export default function DiscoverPage() {
  return (
    <div className="relative min-h-screen bg-[var(--background)]">
      <AmbientBg orbs={false} grid gradient />
      <Header />
      <DiscoverClient />
    </div>
  );
}
