"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { setStoredProfile, setOnboardingComplete } from "@/lib/user-store";
import type { PlayerProfile } from "@/lib/user-store";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";

const STEPS = [
  { id: 1, title: "Basic info" },
  { id: 2, title: "Football details" },
  { id: 3, title: "Club & availability" },
  { id: 4, title: "Media & finish" },
];

const POSITIONS = ["ST", "CF", "LW", "RW", "CAM", "CM", "CDM", "LB", "RB", "CB", "GK"];
const FOOT_OPTIONS = ["Right", "Left", "Both"];
const AVAILABILITY_OPTIONS = ["Available now", "From next season", "Open to discussion", "Not available"];

const defaultProfile: PlayerProfile = {
  role: "player",
  name: "",
  age: 0,
  nationality: "",
  city: "",
  country: "",
  positionPrimary: "",
  positionsSecondary: [],
  preferredFoot: "",
  heightCm: 0,
  weightKg: 0,
  currentClub: "",
  leagueLevel: "",
  availability: "",
  languages: [],
  bio: "",
  highlightVideoUrl: "",
};

const stepVariants = {
  enter: { opacity: 0, x: 40 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
};

export default function OnboardingPlayerPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<PlayerProfile>(defaultProfile);
  const [langInput, setLangInput] = useState("");

  function update<K extends keyof PlayerProfile>(key: K, value: PlayerProfile[K]) {
    setProfile((p) => ({ ...p, [key]: value }));
  }

  function addLanguage() {
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

  const progress = ((step - 1) / (STEPS.length - 1)) * 100;

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Player profile</h1>
        <p className="mt-1 text-sm text-[var(--foreground-muted)]">
          Showcase your talent and get discovered by clubs worldwide.
        </p>
      </motion.div>

      {/* Progress bar */}
      <div>
        <div className="flex gap-2">
          {STEPS.map((s) => (
            <div
              key={s.id}
              className="h-1.5 flex-1 rounded-full bg-[var(--surface-border)] overflow-hidden"
            >
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)]"
                initial={{ width: 0 }}
                animate={{ width: step >= s.id ? "100%" : "0%" }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
              />
            </div>
          ))}
        </div>
        <p className="mt-2 text-sm text-[var(--foreground-muted)]">
          Step {step} of {STEPS.length}: {STEPS[step - 1].title}
        </p>
      </div>

      {/* Step content */}
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
            className="glass-card space-y-5 p-6"
          >
            <h2 className="font-semibold text-[var(--foreground)]">Basic information</h2>
            <div>
              <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Full name</label>
              <input type="text" value={profile.name} onChange={(e) => update("name", e.target.value)} className="input-field" placeholder="e.g. Alex Rivera" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Age</label>
                <input type="number" min={14} max={50} value={profile.age || ""} onChange={(e) => update("age", parseInt(e.target.value, 10) || 0)} className="input-field" placeholder="e.g. 22" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Nationality</label>
                <input type="text" value={profile.nationality} onChange={(e) => update("nationality", e.target.value)} className="input-field" placeholder="e.g. German" />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">City</label>
                <input type="text" value={profile.city} onChange={(e) => update("city", e.target.value)} className="input-field" placeholder="e.g. Berlin" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Country</label>
                <input type="text" value={profile.country} onChange={(e) => update("country", e.target.value)} className="input-field" placeholder="e.g. Germany" />
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="button" onClick={() => setStep(2)}>
                Next <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
            className="glass-card space-y-5 p-6"
          >
            <h2 className="font-semibold text-[var(--foreground)]">Football details</h2>
            <div>
              <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-2">Primary position</label>
              <div className="flex flex-wrap gap-2">
                {POSITIONS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => update("positionPrimary", p)}
                    className={`rounded-xl px-3.5 py-1.5 text-sm font-medium transition-all duration-200 ${profile.positionPrimary === p
                      ? "bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)] text-[#0a0e17] shadow-md shadow-[var(--gold-glow)]"
                      : "bg-[var(--surface)] border border-[var(--surface-border)] text-[var(--foreground-muted)] hover:border-[var(--gold)]/30 hover:text-[var(--foreground)]"
                      }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-2">Secondary position (optional)</label>
              <div className="flex flex-wrap gap-2">
                {POSITIONS.filter((p) => p !== profile.positionPrimary).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => update("positionsSecondary", profile.positionsSecondary.includes(p) ? profile.positionsSecondary.filter(s => s !== p) : [...profile.positionsSecondary, p])}
                    className={`rounded-xl px-3.5 py-1.5 text-sm font-medium transition-all duration-200 ${profile.positionsSecondary.includes(p)
                      ? "bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)] text-[#0a0e17] shadow-md shadow-[var(--gold-glow)]"
                      : "bg-[var(--surface)] border border-[var(--surface-border)] text-[var(--foreground-muted)] hover:border-[var(--gold)]/30 hover:text-[var(--foreground)]"
                      }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-2">Preferred foot</label>
                <div className="flex gap-2">
                  {FOOT_OPTIONS.map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => update("preferredFoot", f)}
                      className={`rounded-xl px-4 py-2 text-sm font-medium flex-1 transition-all duration-200 ${profile.preferredFoot === f
                        ? "bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)] text-[#0a0e17] shadow-md shadow-[var(--gold-glow)]"
                        : "bg-[var(--surface)] border border-[var(--surface-border)] text-[var(--foreground-muted)] hover:border-[var(--gold)]/30"
                        }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">League level</label>
                <select value={profile.leagueLevel} onChange={(e) => update("leagueLevel", e.target.value)} className="input-field">
                  <option value="">Select</option>
                  {["Youth", "Amateur", "Semi-pro", "Professional", "Top tier"].map((l) => (<option key={l} value={l}>{l}</option>))}
                </select>
              </div>
            </div>
            <div className="flex justify-between">
              <Button type="button" variant="ghost" onClick={() => setStep(1)}>
                <ArrowLeft className="h-4 w-4 mr-1" /> Back
              </Button>
              <Button type="button" onClick={() => setStep(3)}>
                Next <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
            className="glass-card space-y-5 p-6"
          >
            <h2 className="font-semibold text-[var(--foreground)]">Club & availability</h2>
            <div>
              <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Current club (optional)</label>
              <input type="text" value={profile.currentClub} onChange={(e) => update("currentClub", e.target.value)} className="input-field" placeholder="e.g. FC North" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Availability</label>
              <select
                value={profile.availability}
                onChange={(e) => update("availability", e.target.value)}
                className="input-field"
              >
                <option value="">Select availability</option>
                {AVAILABILITY_OPTIONS.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Languages spoken</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {profile.languages.map((l) => (
                  <span key={l} className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--gold)]/10 border border-[var(--gold)]/20 px-3 py-1 text-sm text-[var(--foreground)]">
                    {l}
                    <button type="button" onClick={() => update("languages", profile.languages.filter((x) => x !== l))} className="text-[var(--foreground-subtle)] hover:text-[var(--accent-rose)] transition-colors">×</button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={langInput}
                  onChange={(e) => setLangInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addLanguage())}
                  className="input-field flex-1"
                  placeholder="Add a language"
                />
                <Button type="button" variant="outline" size="md" onClick={addLanguage}>Add</Button>
              </div>
            </div>
            <div className="flex justify-between">
              <Button type="button" variant="ghost" onClick={() => setStep(2)}>
                <ArrowLeft className="h-4 w-4 mr-1" /> Back
              </Button>
              <Button type="button" onClick={() => setStep(4)}>
                Next <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="step4"
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
            className="glass-card space-y-5 p-6"
          >
            <h2 className="font-semibold text-[var(--foreground)]">Media & finish</h2>
            <div>
              <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Highlight video URL (optional)</label>
              <input type="url" value={profile.highlightVideoUrl} onChange={(e) => update("highlightVideoUrl", e.target.value)} className="input-field" placeholder="https://youtube.com/..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Short bio (optional)</label>
              <textarea
                value={profile.bio}
                onChange={(e) => update("bio", e.target.value)}
                rows={3}
                className="input-field resize-none"
                placeholder="Your football journey, strengths, and ambitions."
              />
            </div>
            <p className="text-sm text-[var(--foreground-subtle)]">
              You can upload photos and documents later from your profile.
            </p>
            <div className="flex justify-between">
              <Button type="button" variant="ghost" onClick={() => setStep(3)}>
                <ArrowLeft className="h-4 w-4 mr-1" /> Back
              </Button>
              <Button type="button" onClick={handleSubmit}>
                Complete profile <Check className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
