"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { getStoredRole, getStoredProfile, setStoredProfile } from "@/lib/user-store";
import type { Profile, PlayerProfile, CoachProfile, ClubProfile, ScoutProfile, SponsorProfile } from "@/lib/user-store";
import { POSITIONS, NATIONALITIES, AUSTRIAN_CITIES, LANGUAGES } from "@/lib/football-positions";
import { PitchSelector } from "@/components/pitch-selector";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, X } from "lucide-react";

const FOOT_OPTIONS = ["Left", "Right", "Both"];
const LEAGUE_LEVELS = ["Youth", "Amateur", "Semi-pro", "Professional", "Top tier"];
const TRANSFER_STATUSES = ["Open to offers", "Actively looking", "Under contract", "Free agent", "On loan"];
const COACHING_STYLES = [
  "High Pressing", "Possession Play", "Attacking Football", "Counter Pressing",
  "Short Passing", "Direct Play", "Defensive Solidity", "Wing Play",
  "Tiki-Taka", "Gegenpressing", "Catenaccio", "Total Football",
];
const FORMATIONS = ["4-4-2", "4-3-3", "4-2-3-1", "3-5-2", "3-4-3", "5-3-2", "4-1-4-1", "4-3-2-1", "3-4-2-1", "4-5-1"];

export default function DashboardProfileEditPage() {
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const r = getStoredRole();
    const p = getStoredProfile();
    if (!r || !p) { router.replace("/register/role"); return; }
    setRole(r);
    setProfile(p);
  }, [router]);

  function updateProfile(updates: Partial<Profile>) {
    if (!profile) return;
    setProfile({ ...profile, ...updates } as Profile);
  }

  function handleSave() {
    if (profile) {
      setStoredProfile(profile);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  }

  if (!role || !profile) {
    return <div className="py-12 text-center text-[var(--foreground-muted)]">Loading...</div>;
  }

  return (
    <motion.div
      className="mx-auto max-w-2xl space-y-8"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center gap-4">
        <Link href="/dashboard/profile" className="rounded-xl p-2 text-[var(--foreground-muted)] hover:bg-[var(--gold)]/10 hover:text-[var(--foreground)] transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Edit profile</h1>
          <p className="text-sm text-[var(--foreground-muted)] capitalize">{role} profile</p>
        </div>
      </div>

      {profile.role === "player" && <PlayerEditor profile={profile as PlayerProfile} updateProfile={updateProfile} />}
      {profile.role === "coach" && <CoachEditor profile={profile as CoachProfile} updateProfile={updateProfile} />}
      {profile.role === "club" && <ClubEditor profile={profile as ClubProfile} updateProfile={updateProfile} />}
      {profile.role === "scout" && <ScoutEditor profile={profile as ScoutProfile} updateProfile={updateProfile} />}
      {profile.role === "sponsor" && <SponsorEditor profile={profile as SponsorProfile} updateProfile={updateProfile} />}

      <div className="flex justify-end gap-3">
        <Button variant="ghost" asChild><Link href="/dashboard/profile">Cancel</Link></Button>
        <Button variant="primary" onClick={handleSave} className="gap-1.5">
          {saved ? <><Check className="h-4 w-4" /> Saved!</> : "Save changes"}
        </Button>
      </div>
    </motion.div>
  );
}

/* ── Player Editor ─────────────────────────────────────────────── */

function PlayerEditor({ profile, updateProfile }: { profile: PlayerProfile; updateProfile: (u: Partial<PlayerProfile>) => void }) {
  const allPositions = [profile.positionPrimary, ...profile.positionsSecondary].filter(Boolean);

  function toggleStyle(posId: string, styleId: string) {
    const current = profile.playingStyles[posId] || [];
    const next = current.includes(styleId) ? current.filter((s) => s !== styleId) : [...current, styleId];
    updateProfile({ playingStyles: { ...profile.playingStyles, [posId]: next } });
  }

  function addLanguage(lang: string) {
    if (!profile.languages.includes(lang)) {
      updateProfile({ languages: [...profile.languages, lang] });
    }
  }

  function removeLanguage(lang: string) {
    updateProfile({ languages: profile.languages.filter((l) => l !== lang) });
  }

  return (
    <>
      <div className="glass-card space-y-6 p-6">
        <h2 className="font-semibold text-[var(--foreground)]">Basic info</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Name</label>
            <input type="text" value={profile.name} onChange={(e) => updateProfile({ name: e.target.value })} className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Date of birth</label>
            <input type="date" value={profile.dateOfBirth} onChange={(e) => updateProfile({ dateOfBirth: e.target.value })} className="input-field" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Nationality</label>
          <select value={profile.nationality} onChange={(e) => updateProfile({ nationality: e.target.value })} className="input-field">
            <option value="">Select nationality</option>
            {NATIONALITIES.map((n) => (<option key={n} value={n}>{n}</option>))}
          </select>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">City</label>
            <select value={profile.city} onChange={(e) => updateProfile({ city: e.target.value })} className="input-field">
              <option value="">Select city</option>
              {AUSTRIAN_CITIES.map((c) => (<option key={c} value={c}>{c}</option>))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Country</label>
            <input type="text" value={profile.country} readOnly className="input-field opacity-60 cursor-not-allowed" />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Height (cm)</label>
            <input type="number" min={140} max={220} value={profile.heightCm || ""} onChange={(e) => updateProfile({ heightCm: parseInt(e.target.value, 10) || 0 })} className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Weight (kg)</label>
            <input type="number" min={40} max={130} value={profile.weightKg || ""} onChange={(e) => updateProfile({ weightKg: parseInt(e.target.value, 10) || 0 })} className="input-field" />
          </div>
        </div>
      </div>

      <div className="glass-card space-y-6 p-6">
        <h2 className="font-semibold text-[var(--foreground)]">Position & playing style</h2>
        <div>
          <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-3">Primary position</label>
          <div className="mx-auto max-w-xs">
            <PitchSelector
              selected={profile.positionPrimary ? [profile.positionPrimary] : []}
              onSelect={(id) => updateProfile({ positionPrimary: id })}
              mode="primary"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-3">Secondary positions</label>
          <div className="mx-auto max-w-xs">
            <PitchSelector
              selected={profile.positionsSecondary}
              primary={profile.positionPrimary}
              onSelect={(id) => {
                const next = profile.positionsSecondary.includes(id)
                  ? profile.positionsSecondary.filter((p) => p !== id)
                  : [...profile.positionsSecondary, id];
                updateProfile({ positionsSecondary: next });
              }}
              mode="secondary"
            />
          </div>
        </div>
        {allPositions.length > 0 && (
          <div className="space-y-4">
            <label className="block text-sm font-medium text-[var(--foreground-muted)]">Playing styles</label>
            {allPositions.map((posId) => {
              const pos = POSITIONS.find((p) => p.id === posId);
              if (!pos) return null;
              const selected = profile.playingStyles[posId] || [];
              return (
                <div key={posId} className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] p-4">
                  <p className="text-xs font-semibold text-[var(--foreground-muted)] mb-2">{pos.abbr} — {pos.label}</p>
                  <div className="flex flex-wrap gap-2">
                    {pos.styles.map((s) => (
                      <button key={s.id} type="button" onClick={() => toggleStyle(posId, s.id)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                          selected.includes(s.id)
                            ? "bg-[var(--gold)]/15 border-[var(--gold)]/40 text-[var(--gold)]"
                            : "border-[var(--surface-border)] text-[var(--foreground-muted)] hover:border-[var(--foreground-muted)]"
                        }`}
                      >{s.label}</button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Preferred foot</label>
            <select value={profile.preferredFoot} onChange={(e) => updateProfile({ preferredFoot: e.target.value })} className="input-field">
              {FOOT_OPTIONS.map((f) => (<option key={f} value={f}>{f}</option>))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">League level</label>
            <select value={profile.leagueLevel} onChange={(e) => updateProfile({ leagueLevel: e.target.value })} className="input-field">
              <option value="">Select</option>
              {LEAGUE_LEVELS.map((l) => (<option key={l} value={l}>{l}</option>))}
            </select>
          </div>
        </div>
      </div>

      <div className="glass-card space-y-6 p-6">
        <h2 className="font-semibold text-[var(--foreground)]">Career & availability</h2>
        <div>
          <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Current club</label>
          <input type="text" value={profile.currentClub} onChange={(e) => updateProfile({ currentClub: e.target.value })} className="input-field" />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-2">Transfer status</label>
          <div className="flex flex-wrap gap-2">
            {TRANSFER_STATUSES.map((s) => (
              <button key={s} type="button" onClick={() => updateProfile({ transferStatus: s })}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                  profile.transferStatus === s
                    ? "bg-[var(--gold)]/15 border-[var(--gold)]/40 text-[var(--gold)]"
                    : "border-[var(--surface-border)] text-[var(--foreground-muted)] hover:border-[var(--foreground-muted)]"
                }`}
              >{s}</button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Availability</label>
          <select value={profile.availability} onChange={(e) => updateProfile({ availability: e.target.value })} className="input-field">
            <option value="">Select</option>
            <option value="Immediately">Immediately</option>
            <option value="Next transfer window">Next transfer window</option>
            <option value="End of season">End of season</option>
            <option value="Not available">Not available</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-2">Languages</label>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {profile.languages.map((lang) => (
              <span key={lang} className="flex items-center gap-1 rounded-full bg-[var(--surface)] border border-[var(--surface-border)] px-2.5 py-1 text-xs text-[var(--foreground)]">
                {lang}
                <button type="button" onClick={() => removeLanguage(lang)} className="text-[var(--foreground-muted)] hover:text-[var(--foreground)]"><X className="h-3 w-3" /></button>
              </span>
            ))}
          </div>
          <select value="" onChange={(e) => { if (e.target.value) addLanguage(e.target.value); }} className="input-field">
            <option value="">Add language...</option>
            {LANGUAGES.filter((l) => !profile.languages.includes(l)).map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="glass-card space-y-6 p-6">
        <h2 className="font-semibold text-[var(--foreground)]">Media & bio</h2>
        <div>
          <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Highlight video URL</label>
          <input type="url" value={profile.highlightVideoUrl} onChange={(e) => updateProfile({ highlightVideoUrl: e.target.value })} className="input-field" placeholder="https://youtube.com/..." />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Bio</label>
          <textarea value={profile.bio} onChange={(e) => updateProfile({ bio: e.target.value })} rows={4} className="input-field resize-none" placeholder="Tell clubs about yourself..." />
        </div>
      </div>
    </>
  );
}

/* ── Coach Editor ──────────────────────────────────────────────── */

function CoachEditor({ profile, updateProfile }: { profile: CoachProfile; updateProfile: (u: Partial<CoachProfile>) => void }) {
  function toggleStyle(style: string) {
    const current = profile.coachingStyles || [];
    const next = current.includes(style) ? current.filter((s) => s !== style) : [...current, style];
    updateProfile({ coachingStyles: next });
  }

  function toggleFormation(f: string) {
    const current = profile.preferredFormations || [];
    const next = current.includes(f) ? current.filter((x) => x !== f) : [...current, f];
    updateProfile({ preferredFormations: next });
  }

  function addLanguage(lang: string) {
    if (!profile.languages.includes(lang)) {
      updateProfile({ languages: [...profile.languages, lang] });
    }
  }

  function removeLanguage(lang: string) {
    updateProfile({ languages: profile.languages.filter((l) => l !== lang) });
  }

  return (
    <>
      <div className="glass-card space-y-6 p-6">
        <h2 className="font-semibold text-[var(--foreground)]">Basic info</h2>
        <div>
          <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Name</label>
          <input type="text" value={profile.name} onChange={(e) => updateProfile({ name: e.target.value })} className="input-field" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">City</label>
            <select value={profile.city} onChange={(e) => updateProfile({ city: e.target.value })} className="input-field">
              <option value="">Select city</option>
              {AUSTRIAN_CITIES.map((c) => (<option key={c} value={c}>{c}</option>))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Country</label>
            <input type="text" value={profile.country} readOnly className="input-field opacity-60 cursor-not-allowed" />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Current club</label>
            <input type="text" value={profile.currentClub || ""} onChange={(e) => updateProfile({ currentClub: e.target.value })} className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">League level</label>
            <select value={profile.leagueLevel || ""} onChange={(e) => updateProfile({ leagueLevel: e.target.value })} className="input-field">
              <option value="">Select</option>
              {["Youth", "Amateur", "Semi-pro", "Professional", "Top tier"].map((l) => (<option key={l} value={l}>{l}</option>))}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Years of experience</label>
          <input type="number" min={0} max={50} value={profile.experienceYears || ""} onChange={(e) => updateProfile({ experienceYears: parseInt(e.target.value, 10) || 0 })} className="input-field" />
        </div>
      </div>

      <div className="glass-card space-y-6 p-6">
        <h2 className="font-semibold text-[var(--foreground)]">Coaching style</h2>
        <div>
          <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-2">Playing style</label>
          <div className="flex flex-wrap gap-2">
            {COACHING_STYLES.map((s) => (
              <button key={s} type="button" onClick={() => toggleStyle(s)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                  (profile.coachingStyles || []).includes(s)
                    ? "bg-[var(--gold)]/15 border-[var(--gold)]/40 text-[var(--gold)]"
                    : "border-[var(--surface-border)] text-[var(--foreground-muted)] hover:border-[var(--foreground-muted)]"
                }`}
              >{s}</button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-2">Preferred formations</label>
          <div className="flex flex-wrap gap-2">
            {FORMATIONS.map((f) => (
              <button key={f} type="button" onClick={() => toggleFormation(f)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                  (profile.preferredFormations || []).includes(f)
                    ? "bg-[var(--gold)]/15 border-[var(--gold)]/40 text-[var(--gold)]"
                    : "border-[var(--surface-border)] text-[var(--foreground-muted)] hover:border-[var(--foreground-muted)]"
                }`}
              >{f}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="glass-card space-y-6 p-6">
        <h2 className="font-semibold text-[var(--foreground)]">Details</h2>
        <div>
          <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-2">Languages</label>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {profile.languages.map((lang) => (
              <span key={lang} className="flex items-center gap-1 rounded-full bg-[var(--surface)] border border-[var(--surface-border)] px-2.5 py-1 text-xs text-[var(--foreground)]">
                {lang}
                <button type="button" onClick={() => removeLanguage(lang)} className="text-[var(--foreground-muted)] hover:text-[var(--foreground)]"><X className="h-3 w-3" /></button>
              </span>
            ))}
          </div>
          <select value="" onChange={(e) => { if (e.target.value) addLanguage(e.target.value); }} className="input-field">
            <option value="">Add language...</option>
            {LANGUAGES.filter((l) => !profile.languages.includes(l)).map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Availability</label>
          <select value={profile.availability} onChange={(e) => updateProfile({ availability: e.target.value })} className="input-field">
            <option value="">Select</option>
            <option value="Immediately">Immediately</option>
            <option value="Next transfer window">Next transfer window</option>
            <option value="End of season">End of season</option>
            <option value="Not available">Not available</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Bio</label>
          <textarea value={profile.bio} onChange={(e) => updateProfile({ bio: e.target.value })} rows={3} className="input-field resize-none" />
        </div>
      </div>
    </>
  );
}

/* ── Club Editor ───────────────────────────────────────────────── */

function ClubEditor({ profile, updateProfile }: { profile: ClubProfile; updateProfile: (u: Partial<ClubProfile>) => void }) {
  return (
    <div className="glass-card space-y-6 p-6">
      <h2 className="font-semibold text-[var(--foreground)]">Club profile</h2>
      <div>
        <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Club name</label>
        <input type="text" value={profile.clubName} onChange={(e) => updateProfile({ clubName: e.target.value })} className="input-field" />
      </div>
      <div>
        <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">League</label>
        <input type="text" value={profile.league} onChange={(e) => updateProfile({ league: e.target.value })} className="input-field" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Region</label>
          <input type="text" value={profile.region} onChange={(e) => updateProfile({ region: e.target.value })} className="input-field" />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Country</label>
          <input type="text" value={profile.country} onChange={(e) => updateProfile({ country: e.target.value })} className="input-field" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Website</label>
        <input type="url" value={profile.website} onChange={(e) => updateProfile({ website: e.target.value })} className="input-field" />
      </div>
      <div>
        <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">About the club</label>
        <textarea value={profile.bio} onChange={(e) => updateProfile({ bio: e.target.value })} rows={4} className="input-field resize-none" />
      </div>
    </div>
  );
}

/* ── Scout Editor ──────────────────────────────────────────────── */

function ScoutEditor({ profile, updateProfile }: { profile: ScoutProfile; updateProfile: (u: Partial<ScoutProfile>) => void }) {
  return (
    <div className="glass-card space-y-6 p-6">
      <h2 className="font-semibold text-[var(--foreground)]">Scout profile</h2>
      <div>
        <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Name</label>
        <input type="text" value={profile.name} onChange={(e) => updateProfile({ name: e.target.value })} className="input-field" />
      </div>
      <div>
        <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Affiliation</label>
        <input type="text" value={profile.affiliation} onChange={(e) => updateProfile({ affiliation: e.target.value })} className="input-field" />
      </div>
      <div>
        <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Age range (min – max)</label>
        <div className="flex gap-2 items-center">
          <input type="number" min={14} max={35} value={profile.ageRangeMin} onChange={(e) => updateProfile({ ageRangeMin: parseInt(e.target.value, 10) || 16 })} className="input-field w-24" />
          <span className="text-[var(--foreground-muted)]">–</span>
          <input type="number" min={14} max={35} value={profile.ageRangeMax} onChange={(e) => updateProfile({ ageRangeMax: parseInt(e.target.value, 10) || 23 })} className="input-field w-24" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Notes</label>
        <textarea value={profile.notes} onChange={(e) => updateProfile({ notes: e.target.value })} rows={2} className="input-field resize-none" />
      </div>
    </div>
  );
}

/* ── Sponsor Editor ────────────────────────────────────────────── */

function SponsorEditor({ profile, updateProfile }: { profile: SponsorProfile; updateProfile: (u: Partial<SponsorProfile>) => void }) {
  return (
    <div className="glass-card space-y-6 p-6">
      <h2 className="font-semibold text-[var(--foreground)]">Sponsor profile</h2>
      <div>
        <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Company name</label>
        <input type="text" value={profile.companyName} onChange={(e) => updateProfile({ companyName: e.target.value })} className="input-field" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Industry</label>
          <input type="text" value={profile.industry} onChange={(e) => updateProfile({ industry: e.target.value })} className="input-field" />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Country</label>
          <input type="text" value={profile.country} onChange={(e) => updateProfile({ country: e.target.value })} className="input-field" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Contact person</label>
        <input type="text" value={profile.contactName} onChange={(e) => updateProfile({ contactName: e.target.value })} className="input-field" />
      </div>
      <div>
        <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Website</label>
        <input type="url" value={profile.website} onChange={(e) => updateProfile({ website: e.target.value })} className="input-field" />
      </div>
      <div>
        <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Budget range</label>
        <input type="text" value={profile.budget} onChange={(e) => updateProfile({ budget: e.target.value })} className="input-field" placeholder="e.g. €100K - €500K" />
      </div>
      <div>
        <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">About your company</label>
        <textarea value={profile.bio} onChange={(e) => updateProfile({ bio: e.target.value })} rows={4} className="input-field resize-none" />
      </div>
    </div>
  );
}
