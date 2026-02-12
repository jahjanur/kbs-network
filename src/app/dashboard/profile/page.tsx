"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { getStoredRole, getStoredProfile, setStoredProfile } from "@/lib/user-store";
import type { Profile, PlayerProfile, CoachProfile, ClubProfile, ScoutProfile } from "@/lib/user-store";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check } from "lucide-react";

const POSITIONS = ["ST", "CF", "LW", "RW", "CAM", "CM", "CDM", "LB", "RB", "CB", "GK"];
const FOOT_OPTIONS = ["Left", "Right", "Both"];
const LEAGUE_LEVELS = ["Youth", "Amateur", "Semi-pro", "Professional", "Top tier"];

export default function DashboardProfilePage() {
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
        <Link href="/dashboard" className="rounded-xl p-2 text-[var(--foreground-muted)] hover:bg-[var(--gold)]/10 hover:text-[var(--foreground)] transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Edit profile</h1>
          <p className="text-sm text-[var(--foreground-muted)] capitalize">{role} profile</p>
        </div>
      </div>

      {profile.role === "player" && (
        <div className="glass-card space-y-6 p-6">
          <h2 className="font-semibold text-[var(--foreground)]">Basic info</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Name</label>
              <input type="text" value={(profile as PlayerProfile).name} onChange={(e) => updateProfile({ name: e.target.value })} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Age</label>
              <input type="number" min={14} max={45} value={(profile as PlayerProfile).age} onChange={(e) => updateProfile({ age: parseInt(e.target.value, 10) || 18 })} className="input-field" />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">City</label>
              <input type="text" value={(profile as PlayerProfile).city} onChange={(e) => updateProfile({ city: e.target.value })} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Country</label>
              <input type="text" value={(profile as PlayerProfile).country} onChange={(e) => updateProfile({ country: e.target.value })} className="input-field" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Primary position</label>
            <select value={(profile as PlayerProfile).positionPrimary} onChange={(e) => updateProfile({ positionPrimary: e.target.value })} className="input-field">
              <option value="">Select</option>
              {POSITIONS.map((p) => (<option key={p} value={p}>{p}</option>))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Preferred foot</label>
            <select value={(profile as PlayerProfile).preferredFoot} onChange={(e) => updateProfile({ preferredFoot: e.target.value })} className="input-field">
              {FOOT_OPTIONS.map((f) => (<option key={f} value={f}>{f}</option>))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Current club</label>
            <input type="text" value={(profile as PlayerProfile).currentClub} onChange={(e) => updateProfile({ currentClub: e.target.value })} className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">League level</label>
            <select value={(profile as PlayerProfile).leagueLevel} onChange={(e) => updateProfile({ leagueLevel: e.target.value })} className="input-field">
              <option value="">Select</option>
              {LEAGUE_LEVELS.map((l) => (<option key={l} value={l}>{l}</option>))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Bio</label>
            <textarea value={(profile as PlayerProfile).bio} onChange={(e) => updateProfile({ bio: e.target.value })} rows={3} className="input-field resize-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Highlight video URL</label>
            <input type="url" value={(profile as PlayerProfile).highlightVideoUrl} onChange={(e) => updateProfile({ highlightVideoUrl: e.target.value })} className="input-field" />
          </div>
        </div>
      )}

      {profile.role === "coach" && (
        <div className="glass-card space-y-6 p-6">
          <h2 className="font-semibold text-[var(--foreground)]">Coach profile</h2>
          <div>
            <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Name</label>
            <input type="text" value={(profile as CoachProfile).name} onChange={(e) => updateProfile({ name: e.target.value })} className="input-field" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">City</label>
              <input type="text" value={(profile as CoachProfile).city} onChange={(e) => updateProfile({ city: e.target.value })} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Country</label>
              <input type="text" value={(profile as CoachProfile).country} onChange={(e) => updateProfile({ country: e.target.value })} className="input-field" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Years of experience</label>
            <input type="number" min={0} max={50} value={(profile as CoachProfile).experienceYears || ""} onChange={(e) => updateProfile({ experienceYears: parseInt(e.target.value, 10) || 0 })} className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Bio</label>
            <textarea value={(profile as CoachProfile).bio} onChange={(e) => updateProfile({ bio: e.target.value })} rows={3} className="input-field resize-none" />
          </div>
        </div>
      )}

      {profile.role === "club" && (
        <div className="glass-card space-y-6 p-6">
          <h2 className="font-semibold text-[var(--foreground)]">Club profile</h2>
          <div>
            <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Club name</label>
            <input type="text" value={(profile as ClubProfile).clubName} onChange={(e) => updateProfile({ clubName: e.target.value })} className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">League</label>
            <input type="text" value={(profile as ClubProfile).league} onChange={(e) => updateProfile({ league: e.target.value })} className="input-field" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Region</label>
              <input type="text" value={(profile as ClubProfile).region} onChange={(e) => updateProfile({ region: e.target.value })} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Country</label>
              <input type="text" value={(profile as ClubProfile).country} onChange={(e) => updateProfile({ country: e.target.value })} className="input-field" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Website</label>
            <input type="url" value={(profile as ClubProfile).website} onChange={(e) => updateProfile({ website: e.target.value })} className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">About the club</label>
            <textarea value={(profile as ClubProfile).bio} onChange={(e) => updateProfile({ bio: e.target.value })} rows={4} className="input-field resize-none" />
          </div>
        </div>
      )}

      {profile.role === "scout" && (
        <div className="glass-card space-y-6 p-6">
          <h2 className="font-semibold text-[var(--foreground)]">Scout profile</h2>
          <div>
            <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Name</label>
            <input type="text" value={(profile as ScoutProfile).name} onChange={(e) => updateProfile({ name: e.target.value })} className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Affiliation</label>
            <input type="text" value={(profile as ScoutProfile).affiliation} onChange={(e) => updateProfile({ affiliation: e.target.value })} className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Age range (min – max)</label>
            <div className="flex gap-2 items-center">
              <input type="number" min={14} max={35} value={(profile as ScoutProfile).ageRangeMin} onChange={(e) => updateProfile({ ageRangeMin: parseInt(e.target.value, 10) || 16 })} className="input-field w-24" />
              <span className="text-[var(--foreground-muted)]">–</span>
              <input type="number" min={14} max={35} value={(profile as ScoutProfile).ageRangeMax} onChange={(e) => updateProfile({ ageRangeMax: parseInt(e.target.value, 10) || 23 })} className="input-field w-24" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1.5">Notes</label>
            <textarea value={(profile as ScoutProfile).notes} onChange={(e) => updateProfile({ notes: e.target.value })} rows={2} className="input-field resize-none" />
          </div>
        </div>
      )}

      <div className="flex justify-end gap-3">
        <Button variant="ghost" asChild><Link href="/dashboard">Cancel</Link></Button>
        <Button variant="primary" onClick={handleSave} className="gap-1.5">
          {saved ? <><Check className="h-4 w-4" /> Saved!</> : "Save changes"}
        </Button>
      </div>
    </motion.div>
  );
}
