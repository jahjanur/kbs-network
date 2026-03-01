"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Globe, Languages, Shield, Repeat2, Clock, Video, Trophy, Users, Briefcase,
  Search, Building2, DollarSign, Star, MapPin, ExternalLink, Calendar,
  TrendingUp, TrendingDown, Award,
} from "lucide-react";
import type {
  Profile, PlayerProfile, CoachProfile, ClubProfile, ScoutProfile, SponsorProfile,
} from "@/lib/user-store";
import type { Role } from "@/lib/permissions";
import { canViewField, getStatusConfig } from "@/lib/permissions";
import { POSITIONS, ZONE_COLORS } from "@/lib/football-positions";
import type { DirectoryEntry } from "@/lib/mock-directory";
import { getProfileById } from "@/lib/mock-directory";

/* ── Helpers ───────────────────────────────────────────────── */

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

/* ── Shared Sub-Components ─────────────────────────────────── */

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

function StatusBadge({ status }: { status?: string }) {
  if (!status) return null;
  const cfg = getStatusConfig(status);
  if (!cfg) return null;
  const colorMap: Record<string, string> = {
    emerald: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    amber: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
    blue: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30",
    violet: "bg-violet-500/15 text-violet-600 dark:text-violet-400 border-violet-500/30",
    slate: "bg-slate-500/15 text-slate-600 dark:text-slate-400 border-slate-500/30",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${colorMap[cfg.color] ?? colorMap.slate}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${cfg.color === "emerald" ? "bg-emerald-500" : cfg.color === "amber" ? "bg-amber-500" : cfg.color === "blue" ? "bg-blue-500" : cfg.color === "violet" ? "bg-violet-500" : "bg-slate-500"}`} />
      {cfg.label}
    </span>
  );
}

/* ── Profile View Props ────────────────────────────────────── */

interface ProfileViewProps {
  entry: DirectoryEntry;
  viewerRole: Role;
}

export default function ProfileView({ entry, viewerRole }: ProfileViewProps) {
  const { profile } = entry;
  const targetType = profile.role;
  const colors = ROLE_GRADIENT[targetType] || ROLE_GRADIENT.player;
  const name = getProfileName(profile);
  const can = (field: string) => canViewField(viewerRole, targetType, field);

  return (
    <motion.div
      className="space-y-4"
      variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } }}
      initial="hidden"
      animate="show"
    >
      {/* Hero Banner + Avatar */}
      <motion.div variants={item} className="glass-card overflow-hidden">
        <div className={`relative h-32 sm:h-36 w-full bg-gradient-to-br ${colors.from} ${colors.to}`}>
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, rgba(255,255,255,0.3) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.2) 0%, transparent 50%)" }} />
        </div>

        <div className="relative px-6 pb-6">
          <div className="-mt-14 mb-4 flex items-end gap-5">
            <div className="shrink-0">
              <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-full border-4 border-[var(--card-bg)] overflow-hidden shadow-xl" style={{ boxShadow: `0 8px 32px ${colors.accent}33` }}>
                <div className={`h-full w-full bg-gradient-to-br ${colors.from} ${colors.to} flex items-center justify-center`}>
                  <span className="text-2xl sm:text-3xl font-bold text-white">{getInitials(name)}</span>
                </div>
              </div>
            </div>
            <div className="min-w-0 flex-1 pb-1">
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--foreground)] truncate">{name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-[var(--foreground-muted)] capitalize">{targetType}</span>
                {(targetType === "player" || targetType === "coach") && (
                  <StatusBadge status={entry.status} />
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Role-specific content */}
      {targetType === "player" && <PlayerSection profile={profile as PlayerProfile} can={can} />}
      {targetType === "coach" && <CoachSection profile={profile as CoachProfile} can={can} />}
      {targetType === "club" && <ClubSection profile={profile as ClubProfile} can={can} viewerRole={viewerRole} />}
      {targetType === "scout" && <ScoutSection profile={profile as ScoutProfile} can={can} />}
      {targetType === "sponsor" && <SponsorSection profile={profile as SponsorProfile} can={can} viewerRole={viewerRole} />}
    </motion.div>
  );
}

/* ── Player Section ────────────────────────────────────────── */

function PlayerSection({ profile, can }: { profile: PlayerProfile; can: (f: string) => boolean }) {
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
      {can("dateOfBirth") && (
        <motion.div variants={item} className="grid grid-cols-4 gap-3">
          <StatCard label="Date of birth" value={formatDOB(profile.dateOfBirth)} sub={profile.dateOfBirth ? `${getAge(profile.dateOfBirth)} yrs` : undefined} />
          {can("heightCm") && <StatCard label="Height" value={profile.heightCm ? `${(profile.heightCm / 100).toFixed(2)} m` : "—"} />}
          {can("weightKg") && <StatCard label="Weight" value={profile.weightKg ? `${profile.weightKg} kg` : "—"} />}
          {can("preferredFoot") && <StatCard label="Foot" value={profile.preferredFoot || "—"} />}
        </motion.div>
      )}

      {can("positionPrimary") && (
        <Section title="Positions">
          <div className="flex flex-wrap items-center gap-2">
            {primaryPos && (
              <span className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold text-white shadow-sm" style={{ backgroundColor: zoneColor(primaryPos.zone) }}>
                {primaryPos.abbr} <span className="opacity-80 font-semibold">{primaryPos.label}</span>
              </span>
            )}
            {secondaryPositions.map((pos) => pos && (
              <span key={pos.id} className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold ${ZONE_COLORS[pos.zone].text} ${ZONE_COLORS[pos.zone].border}`} style={{ backgroundColor: ZONE_COLORS[pos.zone].bg }}>
                {pos.abbr} <span className="opacity-70 font-medium">{pos.label}</span>
              </span>
            ))}
          </div>
        </Section>
      )}

      {can("playingStyles") && allPosIds.length > 0 && Object.keys(profile.playingStyles).length > 0 && (
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

      {can("currentClub") && (
        <Section title="Career">
          <div className="grid sm:grid-cols-2 gap-x-6">
            <div>
              <InfoItem icon={Shield} label="Current club" value={profile.currentClub} />
              <InfoItem icon={Trophy} label="League level" value={profile.leagueLevel} />
              <InfoItem icon={MapPin} label="Location" value={[profile.city, profile.country].filter(Boolean).join(", ") || null} />
            </div>
            <div>
              {can("transferStatus") && <InfoItem icon={Repeat2} label="Transfer status" value={profile.transferStatus} />}
              {can("availability") && <InfoItem icon={Clock} label="Availability" value={profile.availability} />}
            </div>
          </div>
        </Section>
      )}

      {can("nationality") && (
        <Section title="Personal">
          <InfoItem icon={Globe} label="Nationality" value={profile.nationality} />
          {can("languages") && (
            <InfoItem icon={Languages} label="Languages" value={profile.languages.length > 0 ? (
              <div className="flex flex-wrap gap-1.5 mt-0.5">{profile.languages.map((l) => <TagBadge key={l}>{l}</TagBadge>)}</div>
            ) : null} />
          )}
        </Section>
      )}

      {can("bio") && (profile.bio || profile.highlightVideoUrl) && (
        <Section title="About">
          {profile.bio && <p className="text-sm text-[var(--foreground)] leading-relaxed whitespace-pre-line">{profile.bio}</p>}
          {profile.highlightVideoUrl && (
            <div className="mt-4">
              <a href={profile.highlightVideoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-[var(--gold)]/20 bg-[var(--gold)]/5 px-4 py-2.5 text-sm font-medium text-[var(--gold)] hover:bg-[var(--gold)]/10 transition-colors">
                <Video className="h-4 w-4" /> Watch highlight video <ExternalLink className="h-3 w-3 opacity-60" />
              </a>
            </div>
          )}
        </Section>
      )}
    </>
  );
}

/* ── Coach Section ─────────────────────────────────────────── */

function CoachSection({ profile, can }: { profile: CoachProfile; can: (f: string) => boolean }) {
  return (
    <>
      {can("experienceYears") && (
        <motion.div variants={item} className="grid grid-cols-3 gap-3">
          <StatCard label="Experience" value={profile.experienceYears ? `${profile.experienceYears} yrs` : "—"} />
          <StatCard label="League" value={profile.leagueLevel || "—"} />
          <StatCard label="Availability" value={profile.availability || "—"} />
        </motion.div>
      )}

      {can("currentClub") && (
        <Section title="Current position">
          <InfoItem icon={Shield} label="Current club" value={profile.currentClub} />
          <InfoItem icon={MapPin} label="Location" value={[profile.city, profile.country].filter(Boolean).join(", ") || null} />
          {can("relocation") && <InfoItem icon={Globe} label="Open to relocation" value={profile.relocation ? "Yes" : "No"} />}
        </Section>
      )}

      {can("coachingStyles") && profile.coachingStyles?.length > 0 && (
        <Section title="Coaching style">
          <div className="flex flex-wrap gap-2">
            {profile.coachingStyles.map((s) => <TagBadge key={s} gold>{s}</TagBadge>)}
          </div>
        </Section>
      )}

      {can("preferredFormations") && profile.preferredFormations?.length > 0 && (
        <Section title="Preferred formations">
          <div className="flex flex-wrap gap-3">
            {profile.preferredFormations.map((f) => (
              <div key={f} className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] px-5 py-3 text-center">
                <p className="text-lg font-mono font-bold text-[var(--foreground)]">{f}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {can("certifications") && (
        <Section title="Details">
          <InfoItem icon={Star} label="Certifications" value={profile.certifications?.length > 0 ? (
            <div className="flex flex-wrap gap-1.5 mt-0.5">{profile.certifications.map((c) => <TagBadge key={c}>{c}</TagBadge>)}</div>
          ) : null} />
          <InfoItem icon={Users} label="Preferred roles" value={profile.rolesPreferred?.length > 0 ? (
            <div className="flex flex-wrap gap-1.5 mt-0.5">{profile.rolesPreferred.map((r) => <TagBadge key={r}>{r}</TagBadge>)}</div>
          ) : null} />
          {can("languages") && (
            <InfoItem icon={Languages} label="Languages" value={profile.languages.length > 0 ? (
              <div className="flex flex-wrap gap-1.5 mt-0.5">{profile.languages.map((l) => <TagBadge key={l}>{l}</TagBadge>)}</div>
            ) : null} />
          )}
        </Section>
      )}

      {can("bio") && profile.bio && (
        <Section title="About">
          <p className="text-sm text-[var(--foreground)] leading-relaxed whitespace-pre-line">{profile.bio}</p>
        </Section>
      )}
    </>
  );
}

/* ── Club Section ──────────────────────────────────────────── */

function ClubSection({ profile, can, viewerRole }: { profile: ClubProfile; can: (f: string) => boolean; viewerRole: Role }) {
  const currentCoach = profile.currentCoachId ? getProfileById(profile.currentCoachId) : null;

  return (
    <>
      <motion.div variants={item} className="grid grid-cols-3 gap-3">
        <StatCard label="League" value={profile.league || "—"} />
        <StatCard label="Region" value={profile.region || "—"} />
        <StatCard label="Country" value={profile.country || "—"} />
      </motion.div>

      {/* Current Coach */}
      {can("currentCoachId") && currentCoach && (
        <Section title="Current Coach">
          <Link href={`/dashboard/profile/${currentCoach.id}`} className="flex items-center gap-3 rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] p-3 hover:border-[var(--gold)]/40 transition-colors">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
              <span className="text-sm font-bold text-white">{getInitials((currentCoach.profile as CoachProfile).name)}</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--foreground)]">{(currentCoach.profile as CoachProfile).name}</p>
              <p className="text-xs text-[var(--foreground-muted)]">Coach</p>
            </div>
          </Link>
        </Section>
      )}

      {/* League Record */}
      {can("leagueRecord") && profile.leagueRecord && profile.leagueRecord.length > 0 && (
        <Section title="League Record">
          <div className="space-y-2">
            {profile.leagueRecord.map((record, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border border-[var(--surface-border)] bg-[var(--surface)] p-3">
                <div className="flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5 text-[var(--foreground-muted)]" />
                  <span className="text-sm font-medium text-[var(--foreground)]">{record.season}</span>
                  <span className="rounded-full bg-[var(--gold)]/10 px-2 py-0.5 text-[10px] font-semibold text-[var(--gold)] capitalize">{record.type}</span>
                </div>
                <span className="text-sm font-bold text-[var(--foreground)]">#{record.position}</span>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Recent Joinings & Departures */}
      {can("recentJoinings") && (
        <>
          {profile.recentJoinings && profile.recentJoinings.length > 0 && (
            <Section title="Recent Joinings">
              <div className="space-y-2">
                {profile.recentJoinings.map((t, i) => (
                  <div key={i} className="flex items-center gap-3 py-2 border-b border-[var(--surface-border)] last:border-0">
                    <TrendingUp className="h-4 w-4 text-emerald-500 shrink-0" />
                    <div className="flex-1">
                      <span className="text-sm font-medium text-[var(--foreground)]">{t.name}</span>
                      <span className="ml-2 text-xs text-[var(--foreground-muted)]">{t.position}</span>
                    </div>
                    <span className="text-xs text-[var(--foreground-muted)]">{t.date}</span>
                  </div>
                ))}
              </div>
            </Section>
          )}
          {profile.recentDepartures && profile.recentDepartures.length > 0 && (
            <Section title="Recent Departures">
              <div className="space-y-2">
                {profile.recentDepartures.map((t, i) => (
                  <div key={i} className="flex items-center gap-3 py-2 border-b border-[var(--surface-border)] last:border-0">
                    <TrendingDown className="h-4 w-4 text-rose-500 shrink-0" />
                    <div className="flex-1">
                      <span className="text-sm font-medium text-[var(--foreground)]">{t.name}</span>
                      <span className="ml-2 text-xs text-[var(--foreground-muted)]">{t.position}</span>
                    </div>
                    <span className="text-xs text-[var(--foreground-muted)]">{t.date}</span>
                  </div>
                ))}
              </div>
            </Section>
          )}
        </>
      )}

      {/* Official Sponsors */}
      {can("officialSponsors") && profile.officialSponsors && profile.officialSponsors.length > 0 && (
        <Section title="Official Sponsors">
          <div className="space-y-2">
            {profile.officialSponsors.map((s, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg border border-[var(--surface-border)] bg-[var(--surface)] p-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--gold)]/10">
                  <Award className="h-4 w-4 text-[var(--gold)]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--foreground)]">{s.name}</p>
                  <p className="text-xs text-[var(--foreground-muted)]">{s.category}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Connected Scouts — only visible to club role */}
      {can("connectedScoutIds") && profile.connectedScoutIds && profile.connectedScoutIds.length > 0 && (
        <Section title="Connected Scouts">
          <div className="space-y-2">
            {profile.connectedScoutIds.map((scoutId) => {
              const scout = getProfileById(scoutId);
              if (!scout) return null;
              return (
                <Link key={scoutId} href={`/dashboard/profile/${scoutId}`} className="flex items-center gap-3 rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] p-3 hover:border-[var(--gold)]/40 transition-colors">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center">
                    <span className="text-sm font-bold text-white">{getInitials((scout.profile as ScoutProfile).name)}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--foreground)]">{(scout.profile as ScoutProfile).name}</p>
                    <p className="text-xs text-[var(--foreground-muted)]">Scout — {(scout.profile as ScoutProfile).affiliation}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </Section>
      )}

      {/* Standard Details */}
      <Section title="Details">
        {can("website") && (
          <InfoItem icon={Globe} label="Website" value={profile.website ? (
            <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-[var(--gold)] hover:underline inline-flex items-center gap-1">
              {profile.website} <ExternalLink className="h-3 w-3" />
            </a>
          ) : null} />
        )}
        {can("recruitmentFocus") && (
          <InfoItem icon={Search} label="Recruitment focus" value={profile.recruitmentFocus?.length > 0 ? (
            <div className="flex flex-wrap gap-1.5 mt-0.5">{profile.recruitmentFocus.map((r) => <TagBadge key={r} gold>{r}</TagBadge>)}</div>
          ) : null} />
        )}
        {can("facilities") && <InfoItem icon={Building2} label="Facilities" value={profile.facilities} />}
      </Section>

      {can("bio") && profile.bio && (
        <Section title="About">
          <p className="text-sm text-[var(--foreground)] leading-relaxed whitespace-pre-line">{profile.bio}</p>
        </Section>
      )}
    </>
  );
}

/* ── Scout Section ─────────────────────────────────────────── */

function ScoutSection({ profile, can }: { profile: ScoutProfile; can: (f: string) => boolean }) {
  return (
    <>
      <motion.div variants={item} className="grid grid-cols-3 gap-3">
        <StatCard label="Age range" value={`${profile.ageRangeMin}–${profile.ageRangeMax}`} />
        <StatCard label="Affiliation" value={profile.affiliation || "—"} />
        <StatCard label="Regions" value={profile.regionsOfInterest?.length ? `${profile.regionsOfInterest.length}` : "—"} />
      </motion.div>

      <Section title="Scouting criteria">
        {can("regionsOfInterest") && (
          <InfoItem icon={MapPin} label="Regions of interest" value={profile.regionsOfInterest?.length > 0 ? (
            <div className="flex flex-wrap gap-1.5 mt-0.5">{profile.regionsOfInterest.map((r) => <TagBadge key={r}>{r}</TagBadge>)}</div>
          ) : null} />
        )}
        {can("leaguesOfInterest") && (
          <InfoItem icon={Trophy} label="Leagues of interest" value={profile.leaguesOfInterest?.length > 0 ? (
            <div className="flex flex-wrap gap-1.5 mt-0.5">{profile.leaguesOfInterest.map((l) => <TagBadge key={l}>{l}</TagBadge>)}</div>
          ) : null} />
        )}
        {can("positionsLookingFor") && (
          <InfoItem icon={Briefcase} label="Positions looking for" value={profile.positionsLookingFor?.length > 0 ? (
            <div className="flex flex-wrap gap-1.5 mt-0.5">{profile.positionsLookingFor.map((p) => <TagBadge key={p} gold>{p}</TagBadge>)}</div>
          ) : null} />
        )}
      </Section>
    </>
  );
}

/* ── Sponsor Section ───────────────────────────────────────── */

function SponsorSection({ profile, can, viewerRole }: { profile: SponsorProfile; can: (f: string) => boolean; viewerRole: Role }) {
  return (
    <>
      <motion.div variants={item} className="grid grid-cols-3 gap-3">
        <StatCard label="Industry" value={profile.industry || "—"} />
        {can("budget") && <StatCard label="Budget" value={profile.budget || "—"} />}
        <StatCard label="Country" value={profile.country || "—"} />
      </motion.div>

      <Section title="Details">
        {can("contactName") && <InfoItem icon={Users} label="Contact person" value={profile.contactName} />}
        {can("website") && (
          <InfoItem icon={Globe} label="Website" value={profile.website ? (
            <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-[var(--gold)] hover:underline inline-flex items-center gap-1">
              {profile.website} <ExternalLink className="h-3 w-3" />
            </a>
          ) : null} />
        )}
        {can("sponsorshipType") && (
          <InfoItem icon={DollarSign} label="Sponsorship types" value={profile.sponsorshipType?.length > 0 ? (
            <div className="flex flex-wrap gap-1.5 mt-0.5">{profile.sponsorshipType.map((t) => <TagBadge key={t} gold>{t}</TagBadge>)}</div>
          ) : null} />
        )}
      </Section>

      {can("bio") && profile.bio && (
        <Section title="About">
          <p className="text-sm text-[var(--foreground)] leading-relaxed whitespace-pre-line">{profile.bio}</p>
        </Section>
      )}
    </>
  );
}
