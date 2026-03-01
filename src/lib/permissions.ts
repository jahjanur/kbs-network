// ============================================================
// KB Network — Central Role-Based Permissions & Visibility
// ============================================================

export type Role = "player" | "coach" | "club" | "scout" | "sponsor";
export type ProfileType = "player" | "coach" | "club" | "scout" | "sponsor";

export type Action =
  | "edit_own_profile"
  | "set_status"
  | "create_shortlist"
  | "add_private_notes"
  | "send_contact_request"
  | "post_club_needs"
  | "apply_to_club_needs"
  | "manage_applications"
  | "assign_coach"
  | "generate_invite_link"
  | "contact_sponsors"
  | "send_cooperation_request"
  | "define_budget";

export type DiscoverTab = "Players" | "Coaches" | "Clubs" | "Scouts" | "Sponsors" | "Jobs";

// ────────────────────────────────────────────────────────────
// Which profile types each role can view in Discover
// ────────────────────────────────────────────────────────────

const VIEWABLE_PROFILE_TYPES: Record<Role, ProfileType[]> = {
  player: ["player", "coach", "club"],
  coach: ["player", "club"],
  club: ["player", "coach", "scout", "sponsor"],
  scout: ["player", "coach", "club"],
  sponsor: ["club"],
};

export function getViewableProfileTypes(viewerRole: Role): ProfileType[] {
  return VIEWABLE_PROFILE_TYPES[viewerRole] ?? [];
}

// ────────────────────────────────────────────────────────────
// Which Discover tabs each role sees
// ────────────────────────────────────────────────────────────

const ALLOWED_DISCOVER_TABS: Record<Role, DiscoverTab[]> = {
  player: ["Players", "Coaches", "Clubs", "Jobs"],
  coach: ["Players", "Clubs", "Jobs"],
  club: ["Players", "Coaches", "Scouts", "Sponsors", "Jobs"],
  scout: ["Players", "Coaches", "Clubs"],
  sponsor: ["Clubs"],
};

export function getAllowedDiscoverTabs(viewerRole: Role): DiscoverTab[] {
  return ALLOWED_DISCOVER_TABS[viewerRole] ?? [];
}

// ────────────────────────────────────────────────────────────
// Which actions each role can perform
// ────────────────────────────────────────────────────────────

const ROLE_ACTIONS: Record<Role, Set<Action>> = {
  player: new Set([
    "edit_own_profile",
    "set_status",
    "create_shortlist",
    "add_private_notes",
    "send_contact_request",
    "apply_to_club_needs",
  ]),
  coach: new Set([
    "edit_own_profile",
    "set_status",
    "create_shortlist",
    "add_private_notes",
    "send_contact_request",
  ]),
  club: new Set([
    "edit_own_profile",
    "create_shortlist",
    "add_private_notes",
    "send_contact_request",
    "post_club_needs",
    "manage_applications",
    "assign_coach",
    "generate_invite_link",
    "contact_sponsors",
  ]),
  scout: new Set([
    "edit_own_profile",
    "create_shortlist",
    "add_private_notes",
    "send_contact_request",
  ]),
  sponsor: new Set([
    "edit_own_profile",
    "define_budget",
    "send_cooperation_request",
  ]),
};

export function canPerformAction(viewerRole: Role, action: Action): boolean {
  return ROLE_ACTIONS[viewerRole]?.has(action) ?? false;
}

// ────────────────────────────────────────────────────────────
// Field-level visibility per viewer role × target profile type
// ────────────────────────────────────────────────────────────

// Fields that are ALWAYS visible on a profile type (to any allowed viewer)
const BASE_VISIBLE_FIELDS: Record<ProfileType, string[]> = {
  player: [
    "name", "dateOfBirth", "nationality", "city", "country",
    "positionPrimary", "positionsSecondary", "playingStyles",
    "preferredFoot", "heightCm", "weightKg",
    "currentClub", "leagueLevel", "transferStatus", "availability",
    "bio", "languages", "highlightVideoUrl", "status",
  ],
  coach: [
    "name", "experienceYears", "certifications", "rolesPreferred",
    "coachingStyles", "preferredFormations",
    "currentClub", "leagueLevel", "city", "country",
    "languages", "relocation", "availability", "bio", "status",
  ],
  club: [
    "clubName", "league", "region", "country", "website", "bio",
    "recruitmentFocus", "facilities",
    "currentCoachId", "leagueRecord",
    "recentJoinings", "recentDepartures", "officialSponsors",
  ],
  scout: [
    "name", "affiliation",
    "regionsOfInterest", "leaguesOfInterest", "positionsLookingFor",
    "ageRangeMin", "ageRangeMax",
  ],
  sponsor: [
    "companyName", "industry", "website", "contactName", "country",
    "sponsorshipType", "bio",
  ],
};

// Extra fields only visible to specific viewer roles
const EXTRA_VISIBLE_FIELDS: Record<Role, Record<ProfileType, string[]>> = {
  player: {
    player: [], coach: [], club: [], scout: [], sponsor: [],
  },
  coach: {
    player: ["leagueHistory"],
    coach: [],
    club: ["leagueRecord", "clubActivity"],
    scout: [],
    sponsor: [],
  },
  club: {
    player: ["leagueHistory"],
    coach: ["leagueHistory"],
    club: [],
    scout: ["notes"],
    sponsor: ["budget", "contactName"],
  },
  scout: {
    player: [], coach: [],
    club: ["clubActivity"],
    scout: [],
    sponsor: [],
  },
  sponsor: {
    player: [],
    coach: [],
    club: ["leagueRecord", "clubActivity"],
    scout: [],
    sponsor: [],
  },
};

// Fields restricted from certain viewer roles
const RESTRICTED_FIELDS: Record<Role, Record<ProfileType, string[]>> = {
  player: {
    player: [], coach: [], scout: [], sponsor: [],
    club: ["connectedScoutIds"],
  },
  coach: {
    player: [], coach: [], scout: [], sponsor: [],
    club: ["connectedScoutIds"],
  },
  club: {
    player: [], coach: [], scout: [], sponsor: [],
    club: [],
  },
  scout: {
    player: [], coach: [], scout: [], sponsor: [],
    club: ["connectedScoutIds"],
  },
  sponsor: {
    player: [], coach: [], scout: [], sponsor: [],
    club: ["connectedScoutIds"],
  },
};

export function getVisibleFields(viewerRole: Role, targetProfileType: ProfileType): string[] {
  // If this role can't view this profile type at all, return empty
  if (!VIEWABLE_PROFILE_TYPES[viewerRole]?.includes(targetProfileType)) {
    return [];
  }

  const base = BASE_VISIBLE_FIELDS[targetProfileType] ?? [];
  const extra = EXTRA_VISIBLE_FIELDS[viewerRole]?.[targetProfileType] ?? [];
  const restricted = new Set(RESTRICTED_FIELDS[viewerRole]?.[targetProfileType] ?? []);

  const all = [...new Set([...base, ...extra])];
  return all.filter((f) => !restricted.has(f));
}

export function canViewField(
  viewerRole: Role,
  targetProfileType: ProfileType,
  fieldName: string
): boolean {
  return getVisibleFields(viewerRole, targetProfileType).includes(fieldName);
}

// ────────────────────────────────────────────────────────────
// Can a role view a given profile type at all?
// ────────────────────────────────────────────────────────────

export function canViewProfileType(viewerRole: Role, targetType: ProfileType): boolean {
  return VIEWABLE_PROFILE_TYPES[viewerRole]?.includes(targetType) ?? false;
}

// ────────────────────────────────────────────────────────────
// Contact request limits per role
// ────────────────────────────────────────────────────────────

const CONTACT_REQUEST_LIMITS: Record<Role, number> = {
  player: 5,
  coach: 5,
  club: 20,
  scout: 10,
  sponsor: 10,
};

export function getContactRequestLimit(role: Role): number {
  return CONTACT_REQUEST_LIMITS[role] ?? 0;
}

// ────────────────────────────────────────────────────────────
// Status options (player & coach only)
// ────────────────────────────────────────────────────────────

export const USER_STATUS_OPTIONS = [
  { value: "available", label: "Available", color: "emerald" },
  { value: "looking", label: "Actively Looking", color: "amber" },
  { value: "open_to_offers", label: "Open to Offers", color: "blue" },
  { value: "under_contract", label: "Under Contract", color: "violet" },
  { value: "not_available", label: "Not Available", color: "slate" },
] as const;

export type UserStatus = (typeof USER_STATUS_OPTIONS)[number]["value"];

export function getStatusConfig(status: string) {
  return USER_STATUS_OPTIONS.find((s) => s.value === status) ?? null;
}
