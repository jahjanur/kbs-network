/**
 * MVP: Simple localStorage-based "session" for role and profile.
 * Replace with Supabase auth + profiles later.
 */

export type Role = "player" | "coach" | "club" | "scout" | "sponsor";

const ROLE_KEY = "kbs_role";
const ONBOARDING_DONE_KEY = "kbs_onboarding_done";
const PROFILE_KEY = "kbs_profile";
const EMAIL_KEY = "kbs_email";
const PASSWORD_KEY = "kbs_password";
const PROFILE_PIC_KEY = "kbs_profile_pic";
const BANNER_PIC_KEY = "kbs_banner_pic";

export interface PlayerProfile {
  role: "player";
  name: string;
  dateOfBirth: string;
  nationality: string;
  city: string;
  country: string;
  positionPrimary: string;
  positionsSecondary: string[];
  playingStyles: Record<string, string[]>;
  preferredFoot: string;
  heightCm: number;
  weightKg: number;
  currentClub: string;
  leagueLevel: string;
  transferStatus: string;
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
  coachingStyles: string[];
  preferredFormations: string[];
  currentClub: string;
  leagueLevel: string;
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

export interface SponsorProfile {
  role: "sponsor";
  companyName: string;
  industry: string;
  website: string;
  contactName: string;
  country: string;
  budget: string;
  sponsorshipType: string[];
  bio: string;
}

export type Profile = PlayerProfile | CoachProfile | ClubProfile | ScoutProfile | SponsorProfile;

export function getStoredRole(): Role | null {
  if (typeof window === "undefined") return null;
  const r = localStorage.getItem(ROLE_KEY);
  if (r === "player" || r === "coach" || r === "club" || r === "scout" || r === "sponsor") return r;
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

export function setStoredCredentials(email: string, password: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(EMAIL_KEY, email);
  localStorage.setItem(PASSWORD_KEY, btoa(password));
}

export function getStoredEmail(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(EMAIL_KEY);
}

export function validateCredentials(email: string, password: string): boolean {
  if (typeof window === "undefined") return false;
  const storedEmail = localStorage.getItem(EMAIL_KEY);
  const storedPassword = localStorage.getItem(PASSWORD_KEY);
  if (!storedEmail || !storedPassword) return false;
  return storedEmail === email && storedPassword === btoa(password);
}

export function isLoggedIn(): boolean {
  return getStoredEmail() !== null;
}

export function getProfilePicture(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(PROFILE_PIC_KEY);
}

export function setProfilePicture(dataUrl: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(PROFILE_PIC_KEY, dataUrl);
}

export function getBannerImage(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(BANNER_PIC_KEY);
}

export function setBannerImage(dataUrl: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(BANNER_PIC_KEY, dataUrl);
}

export function clearStoredUser(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ROLE_KEY);
  localStorage.removeItem(ONBOARDING_DONE_KEY);
  localStorage.removeItem(PROFILE_KEY);
  localStorage.removeItem(EMAIL_KEY);
  localStorage.removeItem(PASSWORD_KEY);
  localStorage.removeItem(PROFILE_PIC_KEY);
  localStorage.removeItem(BANNER_PIC_KEY);
}
