"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { setStoredProfile, setOnboardingComplete } from "@/lib/user-store";
import type { CoachProfile } from "@/lib/user-store";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";

const STEPS = [
  { id: 1, title: "Basic info" },
  { id: 2, title: "Experience & certifications" },
  { id: 3, title: "Preferences & availability" },
  { id: 4, title: "Finish" },
];

const ROLES_PREFERRED = ["Head coach", "Assistant coach", "Youth coach", "Goalkeeper coach", "Fitness coach"];
const AVAILABILITY_OPTIONS = ["Available now", "From next season", "Open to discussion", "Not available"];

const defaultProfile: CoachProfile = {
  role: "coach",
  name: "",
  experienceYears: 0,
  certifications: [],
  rolesPreferred: [],
  coachingStyles: [],
  preferredFormations: [],
  currentClub: "",
  leagueLevel: "",
  city: "",
  country: "Austria",
  languages: [],
  relocation: false,
  availability: "",
  bio: "",
};

const stepVariants = {
  enter: { opacity: 0, x: 40 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
};

export default function OnboardingCoachPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<CoachProfile>(defaultProfile);
  const [certInput, setCertInput] = useState("");
  const [langInput, setLangInput] = useState("");

  function update<K extends keyof CoachProfile>(key: K, value: CoachProfile[K]) {
    setProfile((p) => ({ ...p, [key]: value }));
  }

  function addCert() {
    const t = certInput.trim();
    if (t && !profile.certifications.includes(t)) {
      update("certifications", [...profile.certifications, t]);
      setCertInput("");
    }
  }

  function addLang() {
    const t = langInput.trim();
    if (t && !profile.languages.includes(t)) {
      update("languages", [...profile.languages, t]);
      setLangInput("");
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
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Coach profile</h1>
        <p className="mt-1 text-sm text-[var(--foreground-muted)]">Tell clubs about your experience and what you&apos;re looking for.</p>
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
              <input type="text" value={profile.name} onChange={(e) => update("name", e.target.value)} className="input-field" placeholder="e.g. Michael Schmidt" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">City</label>
                <input type="text" value={profile.city} onChange={(e) => update("city", e.target.value)} className="input-field" placeholder="e.g. Munich" />
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
            <h2 className="font-semibold text-[var(--foreground)]">Experience & certifications</h2>
            <div>
              <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Years of coaching experience</label>
              <input type="number" min={0} max={50} value={profile.experienceYears || ""} onChange={(e) => update("experienceYears", parseInt(e.target.value, 10) || 0)} className="input-field" placeholder="e.g. 10" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Certifications / licenses</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {profile.certifications.map((c) => (
                  <span key={c} className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--gold)]/10 border border-[var(--gold)]/20 px-3 py-1 text-sm text-[var(--foreground)]">
                    {c}
                    <button type="button" onClick={() => update("certifications", profile.certifications.filter((x) => x !== c))} className="text-[var(--foreground-subtle)] hover:text-[var(--accent-rose)] transition-colors">×</button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input type="text" value={certInput} onChange={(e) => setCertInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addCert())} className="input-field flex-1" placeholder="e.g. UEFA A" />
                <Button type="button" variant="outline" size="md" onClick={addCert}>Add</Button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-2">Preferred roles</label>
              <div className="flex flex-wrap gap-2">
                {ROLES_PREFERRED.map((r) => (
                  <button key={r} type="button" onClick={() => update("rolesPreferred", profile.rolesPreferred.includes(r) ? profile.rolesPreferred.filter((x) => x !== r) : [...profile.rolesPreferred, r])}
                    className={`rounded-xl px-3.5 py-1.5 text-sm font-medium transition-all duration-200 ${profile.rolesPreferred.includes(r)
                        ? "bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)] text-[#0a0e17] shadow-md shadow-[var(--gold-glow)]"
                        : "bg-[var(--surface)] border border-[var(--surface-border)] text-[var(--foreground-muted)] hover:border-[var(--gold)]/30"
                      }`}
                  >{r}</button>
                ))}
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
            <h2 className="font-semibold text-[var(--foreground)]">Preferences & availability</h2>
            <div>
              <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Availability</label>
              <select value={profile.availability} onChange={(e) => update("availability", e.target.value)} className="input-field">
                <option value="">Select</option>
                {AVAILABILITY_OPTIONS.map((a) => (<option key={a} value={a}>{a}</option>))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Languages</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {profile.languages.map((l) => (
                  <span key={l} className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--gold)]/10 border border-[var(--gold)]/20 px-3 py-1 text-sm text-[var(--foreground)]">
                    {l}
                    <button type="button" onClick={() => update("languages", profile.languages.filter((x) => x !== l))} className="text-[var(--foreground-subtle)] hover:text-[var(--accent-rose)] transition-colors">×</button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input type="text" value={langInput} onChange={(e) => setLangInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addLang())} className="input-field flex-1" placeholder="Add language" />
                <Button type="button" variant="outline" size="md" onClick={addLang}>Add</Button>
              </div>
            </div>
            <label className="flex items-center gap-2.5 text-sm text-[var(--foreground)]">
              <input type="checkbox" checked={profile.relocation} onChange={(e) => update("relocation", e.target.checked)} className="h-4 w-4 rounded border-[var(--surface-border)] text-[var(--gold)] focus:ring-[var(--gold)] accent-[var(--gold)]" />
              Open to relocation
            </label>
            <div>
              <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Short bio (optional)</label>
              <textarea value={profile.bio} onChange={(e) => update("bio", e.target.value)} rows={3} className="input-field resize-none" placeholder="Your coaching philosophy and what you bring to a club." />
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
            <p className="text-sm text-[var(--foreground-subtle)]">You can add references and documents later from your profile.</p>
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
