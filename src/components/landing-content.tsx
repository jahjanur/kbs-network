"use client";

import { PartnersMarquee } from "@/components/landing/partners-marquee";
import { HeroSection } from "@/components/landing/hero-section";
import { LiveTicker } from "@/components/landing/live-ticker";
import { StatsSection } from "@/components/landing/stats-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { RolesSection } from "@/components/landing/roles-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { SponsorshipSection } from "@/components/landing/sponsorship-section";
import { TrustSection } from "@/components/landing/trust-section";
import { CTASection } from "@/components/landing/cta-section";
import { Footer } from "@/components/footer";

export function LandingContent() {
  return (
    <main className="relative overflow-hidden w-full">
      <HeroSection />
      <PartnersMarquee />
      <LiveTicker />
      <StatsSection />
      <div className="mx-auto max-w-5xl h-px bg-gradient-to-r from-transparent via-[var(--surface-border)] to-transparent" />
      <FeaturesSection />
      <RolesSection />
      <TestimonialsSection />
      <HowItWorksSection />
      <SponsorshipSection />
      <TrustSection />
      <CTASection />
      <Footer />
    </main>
  );
}
