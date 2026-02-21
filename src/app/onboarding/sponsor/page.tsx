"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { setStoredProfile, setOnboardingComplete } from "@/lib/user-store";
import type { SponsorProfile } from "@/lib/user-store";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";

const STEPS = [
  { id: 1, title: "Company info" },
  { id: 2, title: "Sponsorship details" },
  { id: 3, title: "About your brand" },
  { id: 4, title: "Finish" },
];

const SPONSORSHIP_TYPES = [
  "Kit Sponsor",
  "Stadium Naming",
  "Training Wear",
  "Academy Partner",
  "Match Day Sponsor",
  "Digital & Media",
  "Community Partner",
  "Equipment Supplier",
];

const defaultProfile: SponsorProfile = {
  role: "sponsor",
  companyName: "",
  industry: "",
  website: "",
  contactName: "",
  country: "",
  budget: "",
  sponsorshipType: [],
  bio: "",
};

const stepVariants = {
  enter: { opacity: 0, x: 40 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
};

export default function OnboardingSponsorPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<SponsorProfile>(defaultProfile);

  function update<K extends keyof SponsorProfile>(key: K, value: SponsorProfile[K]) {
    setProfile((p) => ({ ...p, [key]: value }));
  }

  function handleSubmit() {
    setStoredProfile(profile);
    setOnboardingComplete();
    router.push("/dashboard");
  }

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Sponsor profile</h1>
        <p className="mt-1 text-sm text-[var(--foreground-muted)]">Set up your brand so clubs can discover your sponsorship offers.</p>
      </motion.div>

      <div>
        <div className="flex gap-2">
          {STEPS.map((s) => (
            <div key={s.id} className="h-1.5 flex-1 rounded-full bg-[var(--surface-border)] overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)]"
                initial={{ width: 0 }}
                animate={{ width: step >= s.id ? "100%" : "0%" }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
              />
            </div>
          ))}
        </div>
        <p className="mt-2 text-sm text-[var(--foreground-muted)]">Step {step} of {STEPS.length}: {STEPS[step - 1].title}</p>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="step1" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }} className="glass-card space-y-5 p-6">
            <h2 className="font-semibold text-[var(--foreground)]">Company information</h2>
            <div>
              <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Company / Brand name</label>
              <input type="text" value={profile.companyName} onChange={(e) => update("companyName", e.target.value)} className="input-field" placeholder="e.g. Nike, Adidas, Red Bull" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Industry</label>
              <input type="text" value={profile.industry} onChange={(e) => update("industry", e.target.value)} className="input-field" placeholder="e.g. Sportswear, Energy drinks, Finance" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Contact person</label>
                <input type="text" value={profile.contactName} onChange={(e) => update("contactName", e.target.value)} className="input-field" placeholder="Full name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Country</label>
                <input type="text" value={profile.country} onChange={(e) => update("country", e.target.value)} className="input-field" placeholder="e.g. Austria" />
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="button" onClick={() => setStep(2)}>Next <ArrowRight className="h-4 w-4 ml-1" /></Button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="step2" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }} className="glass-card space-y-5 p-6">
            <h2 className="font-semibold text-[var(--foreground)]">Sponsorship details</h2>
            <p className="text-sm text-[var(--foreground-muted)]">What types of sponsorship are you interested in?</p>
            <div className="flex flex-wrap gap-2">
              {SPONSORSHIP_TYPES.map((t) => (
                <button key={t} type="button" onClick={() => update("sponsorshipType", profile.sponsorshipType.includes(t) ? profile.sponsorshipType.filter((x) => x !== t) : [...profile.sponsorshipType, t])}
                  className={`rounded-xl px-3.5 py-1.5 text-sm font-medium transition-all duration-200 ${profile.sponsorshipType.includes(t)
                    ? "bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)] text-[#0a0e17] shadow-md shadow-[var(--gold-glow)]"
                    : "bg-[var(--surface)] border border-[var(--surface-border)] text-[var(--foreground-muted)] hover:border-[var(--gold)]/30"
                  }`}
                >{t}</button>
              ))}
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Budget range (optional)</label>
              <input type="text" value={profile.budget} onChange={(e) => update("budget", e.target.value)} className="input-field" placeholder="e.g. €100K - €500K per season" />
            </div>
            <div className="flex justify-between">
              <Button type="button" variant="ghost" onClick={() => setStep(1)}><ArrowLeft className="h-4 w-4 mr-1" /> Back</Button>
              <Button type="button" onClick={() => setStep(3)}>Next <ArrowRight className="h-4 w-4 ml-1" /></Button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="step3" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }} className="glass-card space-y-5 p-6">
            <h2 className="font-semibold text-[var(--foreground)]">About your brand</h2>
            <div>
              <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Website (optional)</label>
              <input type="url" value={profile.website} onChange={(e) => update("website", e.target.value)} className="input-field" placeholder="https://..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">About your company</label>
              <textarea value={profile.bio} onChange={(e) => update("bio", e.target.value)} rows={4} className="input-field resize-none" placeholder="Tell clubs about your brand, values, and what kind of partnerships you're looking for." />
            </div>
            <div className="flex justify-between">
              <Button type="button" variant="ghost" onClick={() => setStep(2)}><ArrowLeft className="h-4 w-4 mr-1" /> Back</Button>
              <Button type="button" onClick={() => setStep(4)}>Next <ArrowRight className="h-4 w-4 ml-1" /></Button>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div key="step4" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }} className="glass-card space-y-5 p-6">
            <h2 className="font-semibold text-[var(--foreground)]">Review & finish</h2>
            <p className="text-sm text-[var(--foreground-subtle)]">You can post sponsorship deals and browse clubs from your dashboard.</p>
            <div className="flex justify-between">
              <Button type="button" variant="ghost" onClick={() => setStep(3)}><ArrowLeft className="h-4 w-4 mr-1" /> Back</Button>
              <Button type="button" onClick={handleSubmit}>Complete profile <Check className="h-4 w-4 ml-1" /></Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
