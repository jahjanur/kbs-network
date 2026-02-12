import { Header } from "@/components/header";
import { LandingContent } from "@/components/landing-content";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header />
      <LandingContent />
    </div>
  );
}
