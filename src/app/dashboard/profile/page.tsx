"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { getStoredRole, getStoredProfile, getProfilePicture, setProfilePicture, getBannerImage, setBannerImage } from "@/lib/user-store";
import type { Profile, PlayerProfile, CoachProfile, ClubProfile, ScoutProfile, SponsorProfile } from "@/lib/user-store";
import { POSITIONS, ZONE_COLORS } from "@/lib/football-positions";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft, Pencil, Camera, ImagePlus, Globe, Languages, Shield, Repeat2, Clock, Video,
  Trophy, Users, Briefcase, Search, Building2, DollarSign,
  Star, CheckCircle2, MapPin, ExternalLink,
} from "lucide-react";

/* ── Helpers ───────────────────────────────────────────────────── */

function getAge(dob: string): number {
  const birth = new Date(dob);
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const m = now.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) age--;
  return age;
}

function formatDOB(dob: string): string {
  if (!dob) return "—";
  const d = new Date(dob);
  return d.toLocaleDateString("de-AT", { day: "2-digit", month: "2-digit", year: "numeric" });
}

function getInitials(name: string): string {
  if (!name) return "?";
  return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
}

function getProfileName(profile: Profile): string {
  if ("name" in profile) return profile.name;
  if ("clubName" in profile) return profile.clubName;
  if ("companyName" in profile) return profile.companyName;
  return "";
}

function resizeImage(file: File, maxSize: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = document.createElement("img");
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let w = img.width;
        let h = img.height;
        if (w > h) { h = (h / w) * maxSize; w = maxSize; }
        else { w = (w / h) * maxSize; h = maxSize; }
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (!ctx) { reject(new Error("No canvas context")); return; }
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL("image/jpeg", 0.85));
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function resizeBanner(file: File, maxW: number, maxH: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = document.createElement("img");
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const scale = Math.min(maxW / img.width, maxH / img.height, 1);
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext("2d");
        if (!ctx) { reject(new Error("No canvas context")); return; }
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.85));
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

const ROLE_GRADIENT: Record<string, { from: string; to: string; accent: string }> = {
  player: { from: "from-[var(--gold)]", to: "to-amber-600", accent: "var(--gold)" },
  coach: { from: "from-blue-500", to: "to-blue-700", accent: "rgb(59,130,246)" },
  club: { from: "from-emerald-500", to: "to-emerald-700", accent: "rgb(16,185,129)" },
  scout: { from: "from-violet-500", to: "to-violet-700", accent: "rgb(139,92,246)" },
  sponsor: { from: "from-rose-500", to: "to-rose-700", accent: "rgb(244,63,94)" },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
};

/* ── Main Page ─────────────────────────────────────────────────── */

export default function DashboardProfilePage() {
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [banner, setBanner] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const bannerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const r = getStoredRole();
    const p = getStoredProfile();
    if (!r || !p) { router.replace("/register/role"); return; }
    setRole(r);
    setProfile(p);
    setAvatar(getProfilePicture());
    setBanner(getBannerImage());
  }, [router]);

  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { alert("Image must be under 5 MB"); return; }
    const dataUrl = await resizeImage(file, 256);
    setProfilePicture(dataUrl);
    setAvatar(dataUrl);
  }

  async function handleBannerChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) { alert("Image must be under 10 MB"); return; }
    const dataUrl = await resizeBanner(file, 960, 320);
    setBannerImage(dataUrl);
    setBanner(dataUrl);
  }

  if (!role || !profile) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--gold)]/20 border-t-[var(--gold)]" />
      </div>
    );
  }

  const colors = ROLE_GRADIENT[role] || ROLE_GRADIENT.player;
  const name = getProfileName(profile);

  return (
    <motion.div
      className="mx-auto max-w-2xl"
      variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } }}
      initial="hidden"
      animate="show"
    >
      {/* Hidden file inputs */}
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
      <input ref={bannerRef} type="file" accept="image/*" className="hidden" onChange={handleBannerChange} />

      {/* Back + Edit row */}
      <motion.div variants={item} className="flex items-center justify-between mb-6">
        <Link href="/dashboard" className="rounded-xl p-2 text-[var(--foreground-muted)] hover:bg-[var(--gold)]/10 hover:text-[var(--foreground)] transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard/profile/edit" className="gap-1.5">
            <Pencil className="h-3.5 w-3.5" />
            Edit profile
          </Link>
        </Button>
      </motion.div>

      {/* Hero Banner + Avatar */}
      <motion.div variants={item} className="glass-card overflow-hidden">
        {/* Banner */}
        <button
          type="button"
          onClick={() => bannerRef.current?.click()}
          className={`group relative h-32 sm:h-36 w-full bg-gradient-to-br ${colors.from} ${colors.to} cursor-pointer`}
        >
          {banner ? (
            <Image src={banner} alt="Banner" fill className="object-cover" />
          ) : (
            <>
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, rgba(255,255,255,0.3) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.2) 0%, transparent 50%)" }} />
              <svg className="absolute inset-0 w-full h-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
                    <path d="M 24 0 L 0 0 0 24" fill="none" stroke="white" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </>
          )}
          {/* Hover overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-colors duration-200">
            <div className="flex items-center gap-2 rounded-full bg-black/60 px-4 py-2 text-sm font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <ImagePlus className="h-4 w-4" />
              {banner ? "Change banner" : "Add banner image"}
            </div>
          </div>
        </button>

        {/* Avatar + Info */}
        <div className="relative px-6 pb-6">
          {/* Avatar */}
          <div className="-mt-14 mb-4 flex items-end gap-5">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="group relative shrink-0"
            >
              <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-full border-4 border-[var(--card-bg)] overflow-hidden shadow-xl" style={{ boxShadow: `0 8px 32px ${colors.accent}33` }}>
                {avatar ? (
                  <Image src={avatar} alt="Profile" width={112} height={112} className="h-full w-full object-cover" />
                ) : (
                  <div className={`h-full w-full bg-gradient-to-br ${colors.from} ${colors.to} flex items-center justify-center`}>
                    <span className="text-2xl sm:text-3xl font-bold text-white">{getInitials(name)}</span>
                  </div>
                )}
              </div>
              {/* Camera overlay */}
              <div className="absolute inset-0 rounded-full flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-colors duration-200">
                <Camera className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </div>
              {/* Upload hint badge */}
              <div className="absolute -bottom-0.5 -right-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-[var(--card-bg)] border-2 border-[var(--surface-border)] shadow-sm">
                <Camera className="h-3.5 w-3.5 text-[var(--foreground-muted)]" />
              </div>
            </button>

            <div className="min-w-0 flex-1 pb-1">
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--foreground)] truncate">{name}</h2>
              <p className="text-sm text-[var(--foreground-muted)] capitalize">{role}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Role-specific content */}
      <div className="mt-4 space-y-4">
        {profile.role === "player" && <PlayerCard profile={profile as PlayerProfile} />}
        {profile.role === "coach" && <CoachCard profile={profile as CoachProfile} />}
        {profile.role === "club" && <ClubCard profile={profile as ClubProfile} />}
        {profile.role === "scout" && <ScoutCard profile={profile as ScoutProfile} />}
        {profile.role === "sponsor" && <SponsorCard profile={profile as SponsorProfile} />}
      </div>
    </motion.div>
  );
}

/* ── Shared Components ─────────────────────────────────────────── */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.div variants={item} className="glass-card overflow-hidden">
      <div className="px-6 pt-5 pb-1">
        <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--foreground-muted)]">{title}</h3>
      </div>
      <div className="px-6 pb-5 pt-3">{children}</div>
    </motion.div>
  );
}

function StatCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] p-3 text-center">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--foreground-muted)]">{label}</p>
      <p className="mt-0.5 text-base font-bold text-[var(--foreground)]">{value}</p>
      {sub && <p className="text-[10px] text-[var(--foreground-muted)]">{sub}</p>}
    </div>
  );
}

function InfoItem({ icon: Icon, label, value }: { icon: typeof Globe; label: string; value: React.ReactNode }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-[var(--surface-border)] last:border-0">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--gold)]/8 border border-[var(--gold)]/15">
        <Icon className="h-3.5 w-3.5 text-[var(--gold)]" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--foreground-muted)]">{label}</p>
        <div className="text-sm font-medium text-[var(--foreground)] mt-0.5">{value}</div>
      </div>
    </div>
  );
}

function TagBadge({ children, gold }: { children: React.ReactNode; gold?: boolean }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium border transition-colors ${
      gold
        ? "bg-[var(--gold)]/12 border-[var(--gold)]/30 text-[var(--gold)]"
        : "bg-[var(--surface)] border-[var(--surface-border)] text-[var(--foreground)]"
    }`}>
      {children}
    </span>
  );
}

/* ── Player Card ───────────────────────────────────────────────── */

function PlayerCard({ profile }: { profile: PlayerProfile }) {
  const primaryPos = POSITIONS.find((p) => p.id === profile.positionPrimary);
  const secondaryPositions = profile.positionsSecondary.map((id) => POSITIONS.find((p) => p.id === id)).filter(Boolean);
  const allPosIds = [profile.positionPrimary, ...profile.positionsSecondary].filter(Boolean);

  function zoneColor(zone: string) {
    if (zone === "gk") return "rgba(245,159,11,0.9)";
    if (zone === "defense") return "rgba(59,130,246,0.9)";
    if (zone === "midfield") return "rgba(16,185,129,0.9)";
    return "rgba(244,63,94,0.9)";
  }

  return (
    <>
      {/* Quick Stats */}
      <motion.div variants={item} className="grid grid-cols-4 gap-3">
        <StatCard label="Date of birth" value={formatDOB(profile.dateOfBirth)} sub={profile.dateOfBirth ? `${getAge(profile.dateOfBirth)} yrs` : undefined} />
        <StatCard label="Height" value={profile.heightCm ? `${(profile.heightCm / 100).toFixed(2)} m` : "—"} />
        <StatCard label="Weight" value={profile.weightKg ? `${profile.weightKg} kg` : "—"} />
        <StatCard label="Foot" value={profile.preferredFoot || "—"} />
      </motion.div>

      {/* Positions */}
      <Section title="Positions">
        <div className="flex flex-wrap items-center gap-2">
          {primaryPos && (
            <span className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold text-white shadow-sm" style={{ backgroundColor: zoneColor(primaryPos.zone) }}>
              {primaryPos.abbr}
              <span className="opacity-80 font-semibold">{primaryPos.label}</span>
            </span>
          )}
          {secondaryPositions.map((pos) => pos && (
            <span key={pos.id} className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold ${ZONE_COLORS[pos.zone].text} ${ZONE_COLORS[pos.zone].border}`} style={{ backgroundColor: ZONE_COLORS[pos.zone].bg }}>
              {pos.abbr}
              <span className="opacity-70 font-medium">{pos.label}</span>
            </span>
          ))}
          {!primaryPos && secondaryPositions.length === 0 && <p className="text-sm text-[var(--foreground-muted)]">No positions selected</p>}
        </div>
      </Section>

      {/* Playing Styles */}
      {allPosIds.length > 0 && Object.keys(profile.playingStyles).length > 0 && (
        <Section title="Playing style">
          <div className="space-y-3">
            {allPosIds.map((posId) => {
              const pos = POSITIONS.find((p) => p.id === posId);
              const styleIds = profile.playingStyles[posId] || [];
              if (!pos || styleIds.length === 0) return null;
              const styleLabels = styleIds.map((sid) => pos.styles.find((s) => s.id === sid)?.label).filter(Boolean);
              return (
                <div key={posId} className="flex items-start gap-2.5">
                  <span className="shrink-0 mt-0.5 rounded-md px-2 py-0.5 text-[10px] font-bold text-white" style={{ backgroundColor: zoneColor(pos.zone) }}>
                    {pos.abbr}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {styleLabels.map((label) => <TagBadge key={label} gold>{label}</TagBadge>)}
                  </div>
                </div>
              );
            })}
          </div>
        </Section>
      )}

      {/* Career & Club */}
      <Section title="Career">
        <div className="grid sm:grid-cols-2 gap-x-6">
          <div>
            <InfoItem icon={Shield} label="Current club" value={profile.currentClub} />
            <InfoItem icon={Trophy} label="League level" value={profile.leagueLevel} />
            <InfoItem icon={MapPin} label="Location" value={[profile.city, profile.country].filter(Boolean).join(", ") || null} />
          </div>
          <div>
            <InfoItem icon={Repeat2} label="Transfer status" value={profile.transferStatus} />
            <InfoItem icon={Clock} label="Availability" value={profile.availability} />
          </div>
        </div>
      </Section>

      {/* Nationality & Languages */}
      <Section title="Personal">
        <InfoItem icon={Globe} label="Nationality" value={profile.nationality} />
        <InfoItem icon={Languages} label="Languages" value={profile.languages.length > 0 ? (
          <div className="flex flex-wrap gap-1.5 mt-0.5">{profile.languages.map((l) => <TagBadge key={l}>{l}</TagBadge>)}</div>
        ) : null} />
      </Section>

      {/* Bio & Media */}
      {(profile.bio || profile.highlightVideoUrl) && (
        <Section title="About">
          {profile.bio && <p className="text-sm text-[var(--foreground)] leading-relaxed whitespace-pre-line">{profile.bio}</p>}
          {profile.highlightVideoUrl && (
            <div className="mt-4">
              <a href={profile.highlightVideoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-[var(--gold)]/20 bg-[var(--gold)]/5 px-4 py-2.5 text-sm font-medium text-[var(--gold)] hover:bg-[var(--gold)]/10 transition-colors">
                <Video className="h-4 w-4" />
                Watch highlight video
                <ExternalLink className="h-3 w-3 opacity-60" />
              </a>
            </div>
          )}
        </Section>
      )}
    </>
  );
}

/* ── Coach Card ────────────────────────────────────────────────── */

function CoachCard({ profile }: { profile: CoachProfile }) {
  const coachingStyles = profile.coachingStyles || [];
  const formations = profile.preferredFormations || [];

  return (
    <>
      {/* Quick Stats */}
      <motion.div variants={item} className="grid grid-cols-3 gap-3">
        <StatCard label="Experience" value={profile.experienceYears ? `${profile.experienceYears} yrs` : "—"} />
        <StatCard label="League" value={profile.leagueLevel || "—"} />
        <StatCard label="Availability" value={profile.availability || "—"} />
      </motion.div>

      {/* Club & Location */}
      <Section title="Current position">
        <InfoItem icon={Shield} label="Current club" value={profile.currentClub} />
        <InfoItem icon={MapPin} label="Location" value={[profile.city, profile.country].filter(Boolean).join(", ") || null} />
        <InfoItem icon={Globe} label="Open to relocation" value={profile.relocation ? "Yes" : "No"} />
      </Section>

      {/* Coaching Styles */}
      {coachingStyles.length > 0 && (
        <Section title="Coaching style">
          <div className="flex flex-wrap gap-2">
            {coachingStyles.map((s) => <TagBadge key={s} gold>{s}</TagBadge>)}
          </div>
        </Section>
      )}

      {/* Formations */}
      {formations.length > 0 && (
        <Section title="Preferred formations">
          <div className="flex flex-wrap gap-3">
            {formations.map((f) => (
              <div key={f} className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] px-5 py-3 text-center">
                <p className="text-lg font-mono font-bold text-[var(--foreground)]">{f}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Details */}
      <Section title="Details">
        <InfoItem icon={Star} label="Certifications" value={profile.certifications?.length > 0 ? (
          <div className="flex flex-wrap gap-1.5 mt-0.5">{profile.certifications.map((c) => <TagBadge key={c}>{c}</TagBadge>)}</div>
        ) : null} />
        <InfoItem icon={Users} label="Preferred roles" value={profile.rolesPreferred?.length > 0 ? (
          <div className="flex flex-wrap gap-1.5 mt-0.5">{profile.rolesPreferred.map((r) => <TagBadge key={r}>{r}</TagBadge>)}</div>
        ) : null} />
        <InfoItem icon={Languages} label="Languages" value={profile.languages.length > 0 ? (
          <div className="flex flex-wrap gap-1.5 mt-0.5">{profile.languages.map((l) => <TagBadge key={l}>{l}</TagBadge>)}</div>
        ) : null} />
      </Section>

      {profile.bio && (
        <Section title="About">
          <p className="text-sm text-[var(--foreground)] leading-relaxed whitespace-pre-line">{profile.bio}</p>
        </Section>
      )}
    </>
  );
}

/* ── Club Card ─────────────────────────────────────────────────── */

function ClubCard({ profile }: { profile: ClubProfile }) {
  return (
    <>
      <motion.div variants={item} className="grid grid-cols-3 gap-3">
        <StatCard label="League" value={profile.league || "—"} />
        <StatCard label="Region" value={profile.region || "—"} />
        <StatCard label="Country" value={profile.country || "—"} />
      </motion.div>

      <Section title="Details">
        <InfoItem icon={Globe} label="Website" value={profile.website ? (
          <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-[var(--gold)] hover:underline inline-flex items-center gap-1">
            {profile.website} <ExternalLink className="h-3 w-3" />
          </a>
        ) : null} />
        <InfoItem icon={Search} label="Recruitment focus" value={profile.recruitmentFocus?.length > 0 ? (
          <div className="flex flex-wrap gap-1.5 mt-0.5">{profile.recruitmentFocus.map((r) => <TagBadge key={r} gold>{r}</TagBadge>)}</div>
        ) : null} />
        <InfoItem icon={Building2} label="Facilities" value={profile.facilities} />
      </Section>

      {profile.bio && (
        <Section title="About">
          <p className="text-sm text-[var(--foreground)] leading-relaxed whitespace-pre-line">{profile.bio}</p>
        </Section>
      )}
    </>
  );
}

/* ── Scout Card ────────────────────────────────────────────────── */

function ScoutCard({ profile }: { profile: ScoutProfile }) {
  return (
    <>
      <motion.div variants={item} className="grid grid-cols-3 gap-3">
        <StatCard label="Age range" value={`${profile.ageRangeMin}–${profile.ageRangeMax}`} />
        <StatCard label="Affiliation" value={profile.affiliation || "—"} />
        <StatCard label="Regions" value={profile.regionsOfInterest?.length ? `${profile.regionsOfInterest.length}` : "—"} />
      </motion.div>

      <Section title="Scouting criteria">
        <InfoItem icon={MapPin} label="Regions of interest" value={profile.regionsOfInterest?.length > 0 ? (
          <div className="flex flex-wrap gap-1.5 mt-0.5">{profile.regionsOfInterest.map((r) => <TagBadge key={r}>{r}</TagBadge>)}</div>
        ) : null} />
        <InfoItem icon={Trophy} label="Leagues of interest" value={profile.leaguesOfInterest?.length > 0 ? (
          <div className="flex flex-wrap gap-1.5 mt-0.5">{profile.leaguesOfInterest.map((l) => <TagBadge key={l}>{l}</TagBadge>)}</div>
        ) : null} />
        <InfoItem icon={Briefcase} label="Positions looking for" value={profile.positionsLookingFor?.length > 0 ? (
          <div className="flex flex-wrap gap-1.5 mt-0.5">{profile.positionsLookingFor.map((p) => <TagBadge key={p} gold>{p}</TagBadge>)}</div>
        ) : null} />
      </Section>

      {profile.notes && (
        <Section title="Notes">
          <p className="text-sm text-[var(--foreground)] leading-relaxed whitespace-pre-line">{profile.notes}</p>
        </Section>
      )}
    </>
  );
}

/* ── Sponsor Card ──────────────────────────────────────────────── */

function SponsorCard({ profile }: { profile: SponsorProfile }) {
  return (
    <>
      <motion.div variants={item} className="grid grid-cols-3 gap-3">
        <StatCard label="Industry" value={profile.industry || "—"} />
        <StatCard label="Budget" value={profile.budget || "—"} />
        <StatCard label="Country" value={profile.country || "—"} />
      </motion.div>

      <Section title="Details">
        <InfoItem icon={Users} label="Contact person" value={profile.contactName} />
        <InfoItem icon={Globe} label="Website" value={profile.website ? (
          <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-[var(--gold)] hover:underline inline-flex items-center gap-1">
            {profile.website} <ExternalLink className="h-3 w-3" />
          </a>
        ) : null} />
        <InfoItem icon={DollarSign} label="Sponsorship types" value={profile.sponsorshipType?.length > 0 ? (
          <div className="flex flex-wrap gap-1.5 mt-0.5">{profile.sponsorshipType.map((t) => <TagBadge key={t} gold>{t}</TagBadge>)}</div>
        ) : null} />
      </Section>

      {profile.bio && (
        <Section title="About">
          <p className="text-sm text-[var(--foreground)] leading-relaxed whitespace-pre-line">{profile.bio}</p>
        </Section>
      )}
    </>
  );
}
