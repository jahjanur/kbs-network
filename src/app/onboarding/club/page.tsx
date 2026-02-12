"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { setStoredProfile, setOnboardingComplete } from "@/lib/user-store";
import type { ClubProfile } from "@/lib/user-store";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";

const STEPS = [
  { id: 1, title: "Club info" },
  { id: 2, title: "About & facilities" },
  { id: 3, title: "Recruitment focus" },
  { id: 4, title: "Finish" },
];

const RECRUITMENT_OPTIONS = ["First team", "Youth academy", "Women's team", "Goalkeepers", "Coaching staff", "Scouts"];

const defaultProfile: ClubProfile = {
  role: "club",
  clubName: "",
  league: "",
  region: "",
  country: "",
  website: "",
  bio: "",
  recruitmentFocus: [],
  facilities: "",
};

const stepVariants = {
  enter: { opacity: 0, x: 40 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
};

export default function OnboardingClubPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<ClubProfile>(defaultProfile);

  function update<K extends keyof ClubProfile>(key: K, value: ClubProfile[K]) {
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
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Club profile</h1>
        <p className="mt-1 text-sm text-[var(--foreground-muted)]">Set up your club so players and coaches can find you.</p>
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
            <h2 className="font-semibold text-[var(--foreground)]">Club information</h2>
            <div>
              <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Club name</label>
              <input type="text" value={profile.clubName} onChange={(e) => update("clubName", e.target.value)} className="input-field" placeholder="e.g. FC Example United" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">League</label>
              <input type="text" value={profile.league} onChange={(e) => update("league", e.target.value)} className="input-field" placeholder="e.g. Regionalliga West" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Region</label>
                <input type="text" value={profile.region} onChange={(e) => update("region", e.target.value)} className="input-field" placeholder="e.g. North Rhine-Westphalia" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Country</label>
                <input type="text" value={profile.country} onChange={(e) => update("country", e.target.value)} className="input-field" placeholder="e.g. Germany" />
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="button" onClick={() => setStep(2)}>Next <ArrowRight className="h-4 w-4 ml-1" /></Button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="step2" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }} className="glass-card space-y-5 p-6">
            <h2 className="font-semibold text-[var(--foreground)]">About & facilities</h2>
            <div>
              <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Website (optional)</label>
              <input type="url" value={profile.website} onChange={(e) => update("website", e.target.value)} className="input-field" placeholder="https://..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">About the club</label>
              <textarea value={profile.bio} onChange={(e) => update("bio", e.target.value)} rows={4} className="input-field resize-none" placeholder="History, values, and what makes your club unique." />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Facilities (optional)</label>
              <textarea value={profile.facilities} onChange={(e) => update("facilities", e.target.value)} rows={2} className="input-field resize-none" placeholder="Training ground, stadium, academy setup..." />
            </div>
            <div className="flex justify-between">
              <Button type="button" variant="ghost" onClick={() => setStep(1)}><ArrowLeft className="h-4 w-4 mr-1" /> Back</Button>
              <Button type="button" onClick={() => setStep(3)}>Next <ArrowRight className="h-4 w-4 ml-1" /></Button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="step3" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }} className="glass-card space-y-5 p-6">
            <h2 className="font-semibold text-[var(--foreground)]">Recruitment focus</h2>
            <p className="text-sm text-[var(--foreground-muted)]">What are you mainly looking for? (You can change this later.)</p>
            <div className="flex flex-wrap gap-2">
              {RECRUITMENT_OPTIONS.map((r) => (
                <button key={r} type="button" onClick={() => update("recruitmentFocus", profile.recruitmentFocus.includes(r) ? profile.recruitmentFocus.filter((x) => x !== r) : [...profile.recruitmentFocus, r])}
                  className={`rounded-xl px-3.5 py-1.5 text-sm font-medium transition-all duration-200 ${profile.recruitmentFocus.includes(r)
                      ? "bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)] text-[#0a0e17] shadow-md shadow-[var(--gold-glow)]"
                      : "bg-[var(--surface)] border border-[var(--surface-border)] text-[var(--foreground-muted)] hover:border-[var(--gold)]/30"
                    }`}
                >{r}</button>
              ))}
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
            <p className="text-sm text-[var(--foreground-subtle)]">You can request a verified badge and post jobs from your dashboard.</p>
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
