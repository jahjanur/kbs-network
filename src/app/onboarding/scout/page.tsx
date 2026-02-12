"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { setStoredProfile, setOnboardingComplete } from "@/lib/user-store";
import type { ScoutProfile } from "@/lib/user-store";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";

const STEPS = [
  { id: 1, title: "Basic info" },
  { id: 2, title: "Regions & leagues" },
  { id: 3, title: "What you're looking for" },
  { id: 4, title: "Finish" },
];

const POSITIONS = ["ST", "CF", "LW", "RW", "CAM", "CM", "CDM", "LB", "RB", "CB", "GK"];

const defaultProfile: ScoutProfile = {
  role: "scout",
  name: "",
  affiliation: "",
  regionsOfInterest: [],
  leaguesOfInterest: [],
  positionsLookingFor: [],
  ageRangeMin: 16,
  ageRangeMax: 23,
  notes: "",
};

const stepVariants = {
  enter: { opacity: 0, x: 40 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
};

export default function OnboardingScoutPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<ScoutProfile>(defaultProfile);
  const [regionInput, setRegionInput] = useState("");
  const [leagueInput, setLeagueInput] = useState("");

  function update<K extends keyof ScoutProfile>(key: K, value: ScoutProfile[K]) {
    setProfile((p) => ({ ...p, [key]: value }));
  }

  function addRegion() {
    const t = regionInput.trim();
    if (t && !profile.regionsOfInterest.includes(t)) {
      update("regionsOfInterest", [...profile.regionsOfInterest, t]);
      setRegionInput("");
    }
  }

  function addLeague() {
    const t = leagueInput.trim();
    if (t && !profile.leaguesOfInterest.includes(t)) {
      update("leaguesOfInterest", [...profile.leaguesOfInterest, t]);
      setLeagueInput("");
    }
  }

  function handleSubmit() {
    setStoredProfile(profile);
    setOnboardingComplete();
    router.push("/dashboard");
  }

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Scout profile</h1>
        <p className="mt-1 text-sm text-[var(--foreground-muted)]">Set up your scout profile to discover and track talent.</p>
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
            <h2 className="font-semibold text-[var(--foreground)]">Basic information</h2>
            <div>
              <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Full name</label>
              <input type="text" value={profile.name} onChange={(e) => update("name", e.target.value)} className="input-field" placeholder="e.g. David Müller" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Affiliation (club, agency, or independent)</label>
              <input type="text" value={profile.affiliation} onChange={(e) => update("affiliation", e.target.value)} className="input-field" placeholder="e.g. FC Example Scouting Dept." />
            </div>
            <div className="flex justify-end">
              <Button type="button" onClick={() => setStep(2)}>Next <ArrowRight className="h-4 w-4 ml-1" /></Button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="step2" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }} className="glass-card space-y-5 p-6">
            <h2 className="font-semibold text-[var(--foreground)]">Regions & leagues of interest</h2>
            <div>
              <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Regions you cover or follow</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {profile.regionsOfInterest.map((r) => (
                  <span key={r} className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--gold)]/10 border border-[var(--gold)]/20 px-3 py-1 text-sm text-[var(--foreground)]">
                    {r}
                    <button type="button" onClick={() => update("regionsOfInterest", profile.regionsOfInterest.filter((x) => x !== r))} className="text-[var(--foreground-subtle)] hover:text-[var(--accent-rose)] transition-colors">×</button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input type="text" value={regionInput} onChange={(e) => setRegionInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addRegion())} className="input-field flex-1" placeholder="e.g. Bavaria" />
                <Button type="button" variant="outline" size="md" onClick={addRegion}>Add</Button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Leagues you follow</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {profile.leaguesOfInterest.map((l) => (
                  <span key={l} className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--gold)]/10 border border-[var(--gold)]/20 px-3 py-1 text-sm text-[var(--foreground)]">
                    {l}
                    <button type="button" onClick={() => update("leaguesOfInterest", profile.leaguesOfInterest.filter((x) => x !== l))} className="text-[var(--foreground-subtle)] hover:text-[var(--accent-rose)] transition-colors">×</button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input type="text" value={leagueInput} onChange={(e) => setLeagueInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addLeague())} className="input-field flex-1" placeholder="e.g. Regionalliga" />
                <Button type="button" variant="outline" size="md" onClick={addLeague}>Add</Button>
              </div>
            </div>
            <div className="flex justify-between">
              <Button type="button" variant="ghost" onClick={() => setStep(1)}><ArrowLeft className="h-4 w-4 mr-1" /> Back</Button>
              <Button type="button" onClick={() => setStep(3)}>Next <ArrowRight className="h-4 w-4 ml-1" /></Button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="step3" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }} className="glass-card space-y-5 p-6">
            <h2 className="font-semibold text-[var(--foreground)]">What you&apos;re looking for</h2>
            <div>
              <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-2">Positions you scout</label>
              <div className="flex flex-wrap gap-2">
                {POSITIONS.map((p) => (
                  <button key={p} type="button" onClick={() => update("positionsLookingFor", profile.positionsLookingFor.includes(p) ? profile.positionsLookingFor.filter((x) => x !== p) : [...profile.positionsLookingFor, p])}
                    className={`rounded-xl px-3.5 py-1.5 text-sm font-medium transition-all duration-200 ${profile.positionsLookingFor.includes(p)
                        ? "bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)] text-[#0a0e17] shadow-md shadow-[var(--gold-glow)]"
                        : "bg-[var(--surface)] border border-[var(--surface-border)] text-[var(--foreground-muted)] hover:border-[var(--gold)]/30"
                      }`}
                  >{p}</button>
                ))}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Age range (min)</label>
                <input type="number" min={14} max={35} value={profile.ageRangeMin} onChange={(e) => update("ageRangeMin", parseInt(e.target.value, 10) || 16)} className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Age range (max)</label>
                <input type="number" min={14} max={35} value={profile.ageRangeMax} onChange={(e) => update("ageRangeMax", parseInt(e.target.value, 10) || 23)} className="input-field" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Notes (optional)</label>
              <textarea value={profile.notes} onChange={(e) => update("notes", e.target.value)} rows={2} className="input-field resize-none" placeholder="Specific criteria, report format preferences..." />
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
            <p className="text-sm text-[var(--foreground-subtle)]">You can build shortlists and save players from your dashboard.</p>
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
