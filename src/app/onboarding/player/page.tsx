"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PitchSelector } from "@/components/pitch-selector";
import { setStoredProfile, setOnboardingComplete } from "@/lib/user-store";
import type { PlayerProfile } from "@/lib/user-store";
import {
  POSITIONS,
  ZONE_COLORS,
  NATIONALITIES,
  AUSTRIAN_CITIES,
  LANGUAGES,
} from "@/lib/football-positions";
import { ArrowRight, ArrowLeft, Check, X } from "lucide-react";

const STEPS = [
  { id: 1, title: "Basic info" },
  { id: 2, title: "Position & style" },
  { id: 3, title: "Club & availability" },
  { id: 4, title: "Media & finish" },
];

const FOOT_OPTIONS = ["Right", "Left", "Both"];
const AVAILABILITY_OPTIONS = ["Available now", "From next season", "Open to discussion", "Not available"];
const TRANSFER_OPTIONS = ["Open to offers", "Actively looking", "Not looking", "Free agent"];
const LEAGUE_LEVELS = ["Youth", "Amateur", "Semi-pro", "Professional", "Top tier"];

const defaultProfile: PlayerProfile = {
  role: "player",
  name: "",
  dateOfBirth: "",
  nationality: "",
  city: "",
  country: "Austria",
  positionPrimary: "",
  positionsSecondary: [],
  playingStyles: {},
  preferredFoot: "",
  heightCm: 0,
  weightKg: 0,
  currentClub: "",
  leagueLevel: "",
  transferStatus: "",
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

  function update<K extends keyof PlayerProfile>(key: K, value: PlayerProfile[K]) {
    setProfile((p) => ({ ...p, [key]: value }));
  }

  function toggleSecondary(posId: string) {
    const next = profile.positionsSecondary.includes(posId)
      ? profile.positionsSecondary.filter((p) => p !== posId)
      : [...profile.positionsSecondary, posId];
    update("positionsSecondary", next);
  }

  function toggleStyle(posId: string, styleId: string) {
    const current = profile.playingStyles[posId] || [];
    const next = current.includes(styleId)
      ? current.filter((s) => s !== styleId)
      : [...current, styleId];
    update("playingStyles", { ...profile.playingStyles, [posId]: next });
  }

  function addLanguage(lang: string) {
    if (lang && !profile.languages.includes(lang)) {
      update("languages", [...profile.languages, lang]);
    }
  }

  function handleSubmit() {
    setStoredProfile(profile);
    setOnboardingComplete();
    router.push("/dashboard");
  }

  // Get the primary position object
  const primaryPos = POSITIONS.find((p) => p.id === profile.positionPrimary);
  // All selected positions for style selection
  const allSelectedPositions = [profile.positionPrimary, ...profile.positionsSecondary]
    .filter(Boolean)
    .map((id) => POSITIONS.find((p) => p.id === id))
    .filter(Boolean);

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Player profile</h1>
        <p className="mt-1 text-sm text-[var(--foreground-muted)]">
          Showcase your talent and get discovered by clubs.
        </p>
      </motion.div>

      {/* Progress bar */}
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
        <p className="mt-2 text-sm text-[var(--foreground-muted)]">
          Step {step} of {STEPS.length}: {STEPS[step - 1].title}
        </p>
      </div>

      {/* Step content */}
      <AnimatePresence mode="wait">
        {/* ─── STEP 1: Basic Info ─── */}
        {step === 1 && (
          <motion.div
            key="step1"
            variants={stepVariants}
            initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
            className="glass-card space-y-5 p-6"
          >
            <h2 className="font-semibold text-[var(--foreground)]">Basic information</h2>

            <div>
              <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Full name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => update("name", e.target.value)}
                className="input-field"
                placeholder="e.g. Alex Rivera"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Date of birth</label>
                <input
                  type="date"
                  value={profile.dateOfBirth}
                  onChange={(e) => update("dateOfBirth", e.target.value)}
                  className="input-field"
                  max={new Date().toISOString().split("T")[0]}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Nationality</label>
                <select
                  value={profile.nationality}
                  onChange={(e) => update("nationality", e.target.value)}
                  className="input-field"
                >
                  <option value="">Select nationality</option>
                  {NATIONALITIES.map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">City</label>
                <select
                  value={profile.city}
                  onChange={(e) => update("city", e.target.value)}
                  className="input-field"
                >
                  <option value="">Select city</option>
                  {AUSTRIAN_CITIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Country</label>
                <input
                  type="text"
                  value={profile.country}
                  className="input-field bg-[var(--surface-highlight)] cursor-not-allowed"
                  readOnly
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Height (cm)</label>
                <input
                  type="number"
                  min={140}
                  max={220}
                  value={profile.heightCm || ""}
                  onChange={(e) => update("heightCm", parseInt(e.target.value, 10) || 0)}
                  className="input-field"
                  placeholder="e.g. 180"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Weight (kg)</label>
                <input
                  type="number"
                  min={40}
                  max={130}
                  value={profile.weightKg || ""}
                  onChange={(e) => update("weightKg", parseInt(e.target.value, 10) || 0)}
                  className="input-field"
                  placeholder="e.g. 75"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="button" onClick={() => setStep(2)}>
                Next <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </motion.div>
        )}

        {/* ─── STEP 2: Position & Style ─── */}
        {step === 2 && (
          <motion.div
            key="step2"
            variants={stepVariants}
            initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
            className="space-y-5"
          >
            {/* Primary position */}
            <div className="glass-card p-6 space-y-4">
              <div>
                <h2 className="font-semibold text-[var(--foreground)]">Primary position</h2>
                <p className="text-sm text-[var(--foreground-muted)] mt-1">Tap your main position on the pitch</p>
              </div>

              <div className="max-w-[320px] mx-auto">
                <PitchSelector
                  selected={profile.positionPrimary ? [profile.positionPrimary] : []}
                  mode="primary"
                  onSelect={(id) => {
                    update("positionPrimary", id);
                    if (id !== profile.positionPrimary) {
                      const newStyles = { ...profile.playingStyles };
                      delete newStyles[profile.positionPrimary];
                      update("playingStyles", newStyles);
                    }
                  }}
                />
              </div>

              {primaryPos && (
                <motion.div
                  className="flex items-center gap-2 justify-center"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold"
                    style={{ backgroundColor: ZONE_COLORS[primaryPos.zone].bg }}
                  >
                    <span className={ZONE_COLORS[primaryPos.zone].text}>{primaryPos.abbr}</span>
                    <span className="text-[var(--foreground)]">{primaryPos.label}</span>
                  </span>
                </motion.div>
              )}
            </div>

            {/* Secondary positions */}
            <div className="glass-card p-6 space-y-4">
              <div>
                <h2 className="font-semibold text-[var(--foreground)]">Secondary positions <span className="text-[var(--foreground-subtle)] font-normal">(optional)</span></h2>
                <p className="text-sm text-[var(--foreground-muted)] mt-1">Tap any additional positions you can play</p>
              </div>

              <div className="max-w-[320px] mx-auto">
                <PitchSelector
                  selected={profile.positionsSecondary}
                  primary={profile.positionPrimary}
                  mode="secondary"
                  onSelect={toggleSecondary}
                />
              </div>

              {profile.positionsSecondary.length > 0 && (
                <div className="flex flex-wrap gap-2 justify-center">
                  {profile.positionsSecondary.map((id) => {
                    const pos = POSITIONS.find((p) => p.id === id);
                    if (!pos) return null;
                    return (
                      <span
                        key={id}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium border border-[var(--surface-border)]"
                        style={{ backgroundColor: ZONE_COLORS[pos.zone].bg }}
                      >
                        <span className={ZONE_COLORS[pos.zone].text}>{pos.abbr}</span>
                        <span className="text-[var(--foreground-muted)]">{pos.label}</span>
                        <button type="button" onClick={() => toggleSecondary(id)} className="ml-0.5 text-[var(--foreground-subtle)] hover:text-[var(--accent-rose)]">
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Playing styles */}
            {allSelectedPositions.length > 0 && (
              <div className="glass-card p-6 space-y-5">
                <div>
                  <h2 className="font-semibold text-[var(--foreground)]">Playing style</h2>
                  <p className="text-sm text-[var(--foreground-muted)] mt-1">
                    How do you play in each position? Select the styles that match you.
                  </p>
                </div>

                {allSelectedPositions.map((pos) => {
                  if (!pos) return null;
                  const selectedStyles = profile.playingStyles[pos.id] || [];
                  return (
                    <div key={pos.id}>
                      <div className="flex items-center gap-2 mb-2.5">
                        <span
                          className="inline-flex items-center justify-center w-7 h-7 rounded-lg text-[10px] font-bold text-white"
                          style={{
                            backgroundColor: pos.zone === "gk" ? "rgba(245,159,11,0.9)"
                              : pos.zone === "defense" ? "rgba(59,130,246,0.9)"
                              : pos.zone === "midfield" ? "rgba(16,185,129,0.9)"
                              : "rgba(244,63,94,0.9)",
                          }}
                        >
                          {pos.abbr}
                        </span>
                        <span className="text-sm font-medium text-[var(--foreground)]">{pos.label}</span>
                        {pos.id === profile.positionPrimary && (
                          <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[var(--gold)]/10 text-[var(--gold)] border border-[var(--gold)]/20">Primary</span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {pos.styles.map((style) => (
                          <button
                            key={style.id}
                            type="button"
                            onClick={() => toggleStyle(pos.id, style.id)}
                            className={`rounded-xl px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                              selectedStyles.includes(style.id)
                                ? "bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)] text-[#0a0e17] shadow-md shadow-[var(--gold-glow)]"
                                : "bg-[var(--surface)] border border-[var(--surface-border)] text-[var(--foreground-muted)] hover:border-[var(--gold)]/30"
                            }`}
                          >
                            {style.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Foot + League */}
            <div className="glass-card p-6 space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-2">Preferred foot</label>
                  <div className="flex gap-2">
                    {FOOT_OPTIONS.map((f) => (
                      <button
                        key={f}
                        type="button"
                        onClick={() => update("preferredFoot", f)}
                        className={`rounded-xl px-4 py-2 text-sm font-medium flex-1 transition-all duration-200 ${
                          profile.preferredFoot === f
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
                    {LEAGUE_LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
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

        {/* ─── STEP 3: Club & Availability ─── */}
        {step === 3 && (
          <motion.div
            key="step3"
            variants={stepVariants}
            initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
            className="glass-card space-y-5 p-6"
          >
            <h2 className="font-semibold text-[var(--foreground)]">Club & availability</h2>

            <div>
              <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Current club (optional)</label>
              <input
                type="text"
                value={profile.currentClub}
                onChange={(e) => update("currentClub", e.target.value)}
                className="input-field"
                placeholder="e.g. FC North or leave empty for Free Agent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-2">Transfer status</label>
              <div className="flex flex-wrap gap-2">
                {TRANSFER_OPTIONS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => update("transferStatus", t)}
                    className={`rounded-xl px-3.5 py-1.5 text-sm font-medium transition-all duration-200 ${
                      profile.transferStatus === t
                        ? "bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)] text-[#0a0e17] shadow-md shadow-[var(--gold-glow)]"
                        : "bg-[var(--surface)] border border-[var(--surface-border)] text-[var(--foreground-muted)] hover:border-[var(--gold)]/30"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Availability</label>
              <select value={profile.availability} onChange={(e) => update("availability", e.target.value)} className="input-field">
                <option value="">Select availability</option>
                {AVAILABILITY_OPTIONS.map((a) => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Languages spoken</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {profile.languages.map((l) => (
                  <span key={l} className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--gold)]/10 border border-[var(--gold)]/20 px-3 py-1 text-sm text-[var(--foreground)]">
                    {l}
                    <button type="button" onClick={() => update("languages", profile.languages.filter((x) => x !== l))} className="text-[var(--foreground-subtle)] hover:text-[var(--accent-rose)] transition-colors">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
              <select
                value=""
                onChange={(e) => { addLanguage(e.target.value); }}
                className="input-field"
              >
                <option value="">Add a language...</option>
                {LANGUAGES.filter((l) => !profile.languages.includes(l)).map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
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

        {/* ─── STEP 4: Media & Finish ─── */}
        {step === 4 && (
          <motion.div
            key="step4"
            variants={stepVariants}
            initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
            className="glass-card space-y-5 p-6"
          >
            <h2 className="font-semibold text-[var(--foreground)]">Media & finish</h2>

            <div>
              <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Highlight video URL (optional)</label>
              <input
                type="url"
                value={profile.highlightVideoUrl}
                onChange={(e) => update("highlightVideoUrl", e.target.value)}
                className="input-field"
                placeholder="https://youtube.com/..."
              />
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
