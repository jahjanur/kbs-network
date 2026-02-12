/**
 * MVP: Simple localStorage-based "session" for role and profile.
 * Replace with Supabase auth + profiles later.
 */

export type Role = "player" | "coach" | "club" | "scout";

const ROLE_KEY = "kbs_role";
const ONBOARDING_DONE_KEY = "kbs_onboarding_done";
const PROFILE_KEY = "kbs_profile";

export interface PlayerProfile {
  role: "player";
  name: string;
  age: number;
  nationality: string;
  city: string;
  country: string;
  positionPrimary: string;
  positionsSecondary: string[];
  preferredFoot: string;
  heightCm: number;
  weightKg: number;
  currentClub: string;
  leagueLevel: string;
  availability: string;
  bio: string;
  languages: string[];
  highlightVideoUrl: string;
}

export interface CoachProfile {
  role: "coach";
  name: string;
  experienceYears: number;
  certifications: string[];
  rolesPreferred: string[];
  city: string;
  country: string;
  languages: string[];
  relocation: boolean;
  availability: string;
  bio: string;
}

export interface ClubProfile {
  role: "club";
  clubName: string;
  league: string;
  region: string;
  country: string;
  website: string;
  bio: string;
  recruitmentFocus: string[];
  facilities: string;
}

export interface ScoutProfile {
  role: "scout";
  name: string;
  affiliation: string;
  regionsOfInterest: string[];
  leaguesOfInterest: string[];
  positionsLookingFor: string[];
  ageRangeMin: number;
  ageRangeMax: number;
  notes: string;
}

export type Profile = PlayerProfile | CoachProfile | ClubProfile | ScoutProfile;

export function getStoredRole(): Role | null {
  if (typeof window === "undefined") return null;
  const r = localStorage.getItem(ROLE_KEY);
  if (r === "player" || r === "coach" || r === "club" || r === "scout") return r;
  return null;
}

export function setStoredRole(role: Role): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(ROLE_KEY, role);
}

export function isOnboardingComplete(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(ONBOARDING_DONE_KEY) === "true";
}

export function setOnboardingComplete(): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(ONBOARDING_DONE_KEY, "true");
}

export function getStoredProfile(): Profile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Profile;
  } catch {
    return null;
  }
}

export function setStoredProfile(profile: Profile): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export function isLoggedIn(): boolean {
  return getStoredRole() !== null;
}

export function clearStoredUser(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ROLE_KEY);
  localStorage.removeItem(ONBOARDING_DONE_KEY);
  localStorage.removeItem(PROFILE_KEY);
}
