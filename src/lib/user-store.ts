/**
 * MVP: Simple localStorage-based "session" for role and profile.
 * Replace with Supabase auth + profiles later.
 */

import type { UserStatus } from "./permissions";

export type Role = "player" | "coach" | "club" | "scout" | "sponsor";
export type ProfileType = Role;

const ROLE_KEY = "kbs_role";
const ONBOARDING_DONE_KEY = "kbs_onboarding_done";
const PROFILE_KEY = "kbs_profile";
const EMAIL_KEY = "kbs_email";
const PASSWORD_KEY = "kbs_password";
const PROFILE_PIC_KEY = "kbs_profile_pic";
const BANNER_PIC_KEY = "kbs_banner_pic";
const USER_ID_KEY = "kbs_user_id";
const SHORTLIST_KEY = "kbs_shortlist";
const PRIVATE_NOTES_KEY = "kbs_private_notes";
const STATUS_KEY = "kbs_status";
const CLUB_NEEDS_KEY = "kbs_club_needs";
const CONTACT_REQUESTS_KEY = "kbs_contact_requests";

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

export interface LeagueRecordEntry {
  season: string;
  position: number;
  type: "current" | "mid-season" | "final";
}

export interface TransferEntry {
  name: string;
  position: string;
  date: string;
}

export interface OfficialSponsor {
  name: string;
  logoUrl?: string;
  category: string;
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
  // Extended fields for visibility system
  currentCoachId?: string;
  leagueRecord?: LeagueRecordEntry[];
  recentJoinings?: TransferEntry[];
  recentDepartures?: TransferEntry[];
  officialSponsors?: OfficialSponsor[];
  connectedScoutIds?: string[];
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
  localStorage.removeItem(USER_ID_KEY);
  localStorage.removeItem(SHORTLIST_KEY);
  localStorage.removeItem(PRIVATE_NOTES_KEY);
  localStorage.removeItem(STATUS_KEY);
  localStorage.removeItem(CLUB_NEEDS_KEY);
  localStorage.removeItem(CONTACT_REQUESTS_KEY);
}

// ────────────────────────────────────────────────────────────
// User ID (stable identifier for current user)
// ────────────────────────────────────────────────────────────

export function getUserId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem(USER_ID_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(USER_ID_KEY, id);
  }
  return id;
}

// ────────────────────────────────────────────────────────────
// Shortlist
// ────────────────────────────────────────────────────────────

export interface ShortlistEntry {
  profileId: string;
  profileType: ProfileType;
  addedAt: string;
}

export function getShortlist(): ShortlistEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(SHORTLIST_KEY);
    return raw ? (JSON.parse(raw) as ShortlistEntry[]) : [];
  } catch {
    return [];
  }
}

export function addToShortlist(profileId: string, profileType: ProfileType): void {
  if (typeof window === "undefined") return;
  const list = getShortlist();
  if (list.some((e) => e.profileId === profileId)) return;
  list.push({ profileId, profileType, addedAt: new Date().toISOString() });
  localStorage.setItem(SHORTLIST_KEY, JSON.stringify(list));
}

export function removeFromShortlist(profileId: string): void {
  if (typeof window === "undefined") return;
  const list = getShortlist().filter((e) => e.profileId !== profileId);
  localStorage.setItem(SHORTLIST_KEY, JSON.stringify(list));
}

export function isInShortlist(profileId: string): boolean {
  return getShortlist().some((e) => e.profileId === profileId);
}

// ────────────────────────────────────────────────────────────
// Private Notes
// ────────────────────────────────────────────────────────────

export interface PrivateNote {
  profileId: string;
  text: string;
  updatedAt: string;
}

export function getPrivateNotes(): Record<string, PrivateNote> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(PRIVATE_NOTES_KEY);
    return raw ? (JSON.parse(raw) as Record<string, PrivateNote>) : {};
  } catch {
    return {};
  }
}

export function getPrivateNote(profileId: string): PrivateNote | null {
  return getPrivateNotes()[profileId] ?? null;
}

export function setPrivateNote(profileId: string, text: string): void {
  if (typeof window === "undefined") return;
  const notes = getPrivateNotes();
  notes[profileId] = { profileId, text, updatedAt: new Date().toISOString() };
  localStorage.setItem(PRIVATE_NOTES_KEY, JSON.stringify(notes));
}

export function deletePrivateNote(profileId: string): void {
  if (typeof window === "undefined") return;
  const notes = getPrivateNotes();
  delete notes[profileId];
  localStorage.setItem(PRIVATE_NOTES_KEY, JSON.stringify(notes));
}

// ────────────────────────────────────────────────────────────
// User Status (player & coach)
// ────────────────────────────────────────────────────────────

export function getUserStatus(): UserStatus | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(STATUS_KEY) as UserStatus | null;
}

export function setUserStatus(status: UserStatus): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STATUS_KEY, status);
}

// ────────────────────────────────────────────────────────────
// Club Needs
// ────────────────────────────────────────────────────────────

export interface ClubNeed {
  id: string;
  positionNeeded: string;
  description: string;
  urgency: "low" | "medium" | "high";
  status: "open" | "filled" | "closed";
  createdAt: string;
}

export function getClubNeeds(): ClubNeed[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CLUB_NEEDS_KEY);
    return raw ? (JSON.parse(raw) as ClubNeed[]) : [];
  } catch {
    return [];
  }
}

export function addClubNeed(need: Omit<ClubNeed, "id" | "createdAt">): void {
  if (typeof window === "undefined") return;
  const list = getClubNeeds();
  list.push({ ...need, id: crypto.randomUUID(), createdAt: new Date().toISOString() });
  localStorage.setItem(CLUB_NEEDS_KEY, JSON.stringify(list));
}

export function updateClubNeed(id: string, updates: Partial<ClubNeed>): void {
  if (typeof window === "undefined") return;
  const list = getClubNeeds().map((n) => (n.id === id ? { ...n, ...updates } : n));
  localStorage.setItem(CLUB_NEEDS_KEY, JSON.stringify(list));
}

export function removeClubNeed(id: string): void {
  if (typeof window === "undefined") return;
  const list = getClubNeeds().filter((n) => n.id !== id);
  localStorage.setItem(CLUB_NEEDS_KEY, JSON.stringify(list));
}

// ────────────────────────────────────────────────────────────
// Contact Requests
// ────────────────────────────────────────────────────────────

export interface ContactRequest {
  id: string;
  fromUserId: string;
  toUserId: string;
  toName: string;
  toProfileType: ProfileType;
  message: string;
  status: "pending" | "accepted" | "declined";
  createdAt: string;
}

export function getContactRequests(): ContactRequest[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CONTACT_REQUESTS_KEY);
    return raw ? (JSON.parse(raw) as ContactRequest[]) : [];
  } catch {
    return [];
  }
}

export function sendContactRequest(
  toUserId: string,
  toName: string,
  toProfileType: ProfileType,
  message: string
): ContactRequest {
  const request: ContactRequest = {
    id: crypto.randomUUID(),
    fromUserId: getUserId(),
    toUserId,
    toName,
    toProfileType,
    message,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  const list = getContactRequests();
  list.push(request);
  if (typeof window !== "undefined") {
    localStorage.setItem(CONTACT_REQUESTS_KEY, JSON.stringify(list));
  }
  return request;
}

export function getContactRequestCount(): number {
  return getContactRequests().filter((r) => r.fromUserId === getUserId()).length;
}

export function hasContactRequestTo(toUserId: string): boolean {
  return getContactRequests().some(
    (r) => r.fromUserId === getUserId() && r.toUserId === toUserId
  );
}
