/**
 * Simulated multi-user directory for MVP.
 * Provides mock profiles to populate Discover, profile views, etc.
 */

import type {
  Profile, PlayerProfile, CoachProfile, ClubProfile,
  ScoutProfile, SponsorProfile, ProfileType,
} from "./user-store";
import type { UserStatus } from "./permissions";

export interface DirectoryEntry {
  id: string;
  profile: Profile;
  status?: UserStatus;
  profilePicture?: string;
}

// ────────────────────────────────────────────────────────────
// Mock Players
// ────────────────────────────────────────────────────────────

const MOCK_PLAYERS: DirectoryEntry[] = [
  {
    id: "p1",
    status: "available",
    profile: {
      role: "player", name: "Alex Rivera", dateOfBirth: "2002-05-14",
      nationality: "Austria", city: "Wien", country: "Austria",
      positionPrimary: "ST", positionsSecondary: ["LF", "RF"],
      playingStyles: { ST: ["Target Man", "Poacher"] },
      preferredFoot: "Right", heightCm: 183, weightKg: 78,
      currentClub: "FC North Vienna", leagueLevel: "Regionalliga Ost",
      transferStatus: "Open to offers", availability: "Immediately",
      bio: "Clinical striker with strong aerial presence and quick finishing.", languages: ["German", "English"],
      highlightVideoUrl: "",
    } as PlayerProfile,
  },
  {
    id: "p2",
    status: "looking",
    profile: {
      role: "player", name: "Maria Kowalski", dateOfBirth: "2001-11-02",
      nationality: "Austria", city: "Graz", country: "Austria",
      positionPrimary: "ZOM", positionsSecondary: ["ZM", "RF"],
      playingStyles: { ZOM: ["Playmaker", "Shadow Striker"] },
      preferredFoot: "Left", heightCm: 170, weightKg: 63,
      currentClub: "SV Graz Ladies", leagueLevel: "Frauen Bundesliga",
      transferStatus: "Actively looking", availability: "Next transfer window",
      bio: "Creative midfielder with exceptional vision and passing range.", languages: ["German", "Polish", "English"],
      highlightVideoUrl: "",
    } as PlayerProfile,
  },
  {
    id: "p3",
    status: "under_contract",
    profile: {
      role: "player", name: "David Müller", dateOfBirth: "1999-03-22",
      nationality: "Austria", city: "Salzburg", country: "Austria",
      positionPrimary: "IV", positionsSecondary: ["RV", "ZDM"],
      playingStyles: { IV: ["Ball-Playing CB", "Stopper"] },
      preferredFoot: "Right", heightCm: 191, weightKg: 86,
      currentClub: "SV Salzburg United", leagueLevel: "2. Liga",
      transferStatus: "Under contract", availability: "End of season",
      bio: "Commanding centre-back with leadership qualities.", languages: ["German"],
      highlightVideoUrl: "",
    } as PlayerProfile,
  },
  {
    id: "p4",
    status: "open_to_offers",
    profile: {
      role: "player", name: "Leyla Arslan", dateOfBirth: "2003-08-19",
      nationality: "Austria", city: "Innsbruck", country: "Austria",
      positionPrimary: "LF", positionsSecondary: ["LM", "ST"],
      playingStyles: { LF: ["Inside Forward", "Inverted Winger"] },
      preferredFoot: "Right", heightCm: 168, weightKg: 60,
      currentClub: "FC Tirol Women", leagueLevel: "Frauen Bundesliga",
      transferStatus: "Open to offers", availability: "Immediately",
      bio: "Pacy winger who loves to cut inside and shoot.", languages: ["German", "Turkish", "English"],
      highlightVideoUrl: "",
    } as PlayerProfile,
  },
  {
    id: "p5",
    status: "available",
    profile: {
      role: "player", name: "Jonas Weber", dateOfBirth: "2000-01-30",
      nationality: "Germany", city: "Linz", country: "Austria",
      positionPrimary: "ZDM", positionsSecondary: ["IV", "ZM"],
      playingStyles: { ZDM: ["Anchor Man", "Deep-Lying Playmaker"] },
      preferredFoot: "Right", heightCm: 185, weightKg: 80,
      currentClub: "LASK Amateure", leagueLevel: "Regionalliga Mitte",
      transferStatus: "Available", availability: "Immediately",
      bio: "Defensive midfielder with excellent positional sense.", languages: ["German", "English"],
      highlightVideoUrl: "",
    } as PlayerProfile,
  },
  {
    id: "p6",
    status: "looking",
    profile: {
      role: "player", name: "Sophie Bauer", dateOfBirth: "2004-06-11",
      nationality: "Austria", city: "Klagenfurt", country: "Austria",
      positionPrimary: "TW", positionsSecondary: [],
      playingStyles: { TW: ["Sweeper Keeper", "Shot Stopper"] },
      preferredFoot: "Right", heightCm: 176, weightKg: 68,
      currentClub: "", leagueLevel: "",
      transferStatus: "Free agent", availability: "Immediately",
      bio: "Young goalkeeper with great reflexes and distribution.", languages: ["German", "English"],
      highlightVideoUrl: "",
    } as PlayerProfile,
  },
  {
    id: "p7",
    status: "open_to_offers",
    profile: {
      role: "player", name: "Marco Petrović", dateOfBirth: "1998-09-05",
      nationality: "Serbia", city: "Wien", country: "Austria",
      positionPrimary: "RM", positionsSecondary: ["RF", "ZOM"],
      playingStyles: { RM: ["Traditional Winger", "Wide Playmaker"] },
      preferredFoot: "Left", heightCm: 179, weightKg: 74,
      currentClub: "SC Rapid Amateure", leagueLevel: "Regionalliga Ost",
      transferStatus: "Open to offers", availability: "Next transfer window",
      bio: "Experienced winger with technical skill and crossing ability.", languages: ["German", "Serbian", "English"],
      highlightVideoUrl: "",
    } as PlayerProfile,
  },
  {
    id: "p8",
    status: "available",
    profile: {
      role: "player", name: "Elif Yılmaz", dateOfBirth: "2002-12-03",
      nationality: "Austria", city: "Bregenz", country: "Austria",
      positionPrimary: "LV", positionsSecondary: ["LM"],
      playingStyles: { LV: ["Attacking Full-Back", "Wing-Back"] },
      preferredFoot: "Left", heightCm: 172, weightKg: 65,
      currentClub: "SC Bregenz Damen", leagueLevel: "2. Frauen Liga",
      transferStatus: "Available", availability: "Immediately",
      bio: "Energetic left-back who provides width and overlapping runs.", languages: ["German", "Turkish"],
      highlightVideoUrl: "",
    } as PlayerProfile,
  },
];

// ────────────────────────────────────────────────────────────
// Mock Coaches
// ────────────────────────────────────────────────────────────

const MOCK_COACHES: DirectoryEntry[] = [
  {
    id: "c1",
    status: "available",
    profile: {
      role: "coach", name: "Thomas Berger",
      experienceYears: 12, certifications: ["UEFA Pro", "DFB A-Lizenz"],
      rolesPreferred: ["Head Coach", "Youth Director"],
      coachingStyles: ["Possession-based", "High press"],
      preferredFormations: ["4-3-3", "3-5-2"],
      currentClub: "", leagueLevel: "2. Liga",
      city: "Wien", country: "Austria",
      languages: ["German", "English", "Italian"],
      relocation: true, availability: "Immediately",
      bio: "Experienced head coach with a track record in youth development and tactical innovation.",
    } as CoachProfile,
  },
  {
    id: "c2",
    status: "under_contract",
    profile: {
      role: "coach", name: "Martina Gruber",
      experienceYears: 8, certifications: ["UEFA A", "ÖFB Youth Diploma"],
      rolesPreferred: ["Youth Head Coach", "Assistant Coach"],
      coachingStyles: ["Development-focused", "Tactical flexibility"],
      preferredFormations: ["4-2-3-1", "4-4-2"],
      currentClub: "FC North Vienna", leagueLevel: "Regionalliga Ost",
      city: "Wien", country: "Austria",
      languages: ["German", "English"],
      relocation: false, availability: "End of season",
      bio: "Passionate youth coach building the next generation of Austrian football talent.",
    } as CoachProfile,
  },
  {
    id: "c3",
    status: "looking",
    profile: {
      role: "coach", name: "Stefan Pichler",
      experienceYears: 15, certifications: ["UEFA Pro", "Sports Psychology Cert"],
      rolesPreferred: ["Head Coach", "Technical Director"],
      coachingStyles: ["Counter-attacking", "Direct play"],
      preferredFormations: ["4-4-2", "4-1-4-1"],
      currentClub: "", leagueLevel: "Bundesliga",
      city: "Graz", country: "Austria",
      languages: ["German", "English", "Croatian"],
      relocation: true, availability: "Immediately",
      bio: "Results-driven coach with Bundesliga experience and international exposure.",
    } as CoachProfile,
  },
  {
    id: "c4",
    status: "open_to_offers",
    profile: {
      role: "coach", name: "Anna Leitner",
      experienceYears: 5, certifications: ["UEFA B", "Goalkeeper Coach License"],
      rolesPreferred: ["Goalkeeper Coach"],
      coachingStyles: ["Individual development", "Modern GK training"],
      preferredFormations: [],
      currentClub: "SV Salzburg United", leagueLevel: "2. Liga",
      city: "Salzburg", country: "Austria",
      languages: ["German", "English"],
      relocation: false, availability: "Next transfer window",
      bio: "Specialized goalkeeper coach helping keepers reach their potential.",
    } as CoachProfile,
  },
  {
    id: "c5",
    status: "available",
    profile: {
      role: "coach", name: "Markus Hofmann",
      experienceYears: 10, certifications: ["UEFA A", "Fitness Coach License"],
      rolesPreferred: ["Fitness Coach", "Assistant Coach"],
      coachingStyles: ["Athletic development", "Periodization"],
      preferredFormations: [],
      currentClub: "LASK Amateure", leagueLevel: "Regionalliga Mitte",
      city: "Linz", country: "Austria",
      languages: ["German"],
      relocation: true, availability: "Immediately",
      bio: "Fitness-focused coach who integrates physical preparation with tactical training.",
    } as CoachProfile,
  },
];

// ────────────────────────────────────────────────────────────
// Mock Clubs
// ────────────────────────────────────────────────────────────

const MOCK_CLUBS: DirectoryEntry[] = [
  {
    id: "cl1",
    profile: {
      role: "club", clubName: "FC North Vienna",
      league: "Regionalliga Ost", region: "Wien", country: "Austria",
      website: "https://fcnorthvienna.at", bio: "Ambitious club in Vienna's north aiming for promotion to the 2. Liga.",
      recruitmentFocus: ["First team", "Youth development"],
      facilities: "Modern training ground with 3 pitches, gym, and video analysis room.",
      currentCoachId: "c2",
      leagueRecord: [
        { season: "2024/25", position: 3, type: "current" },
        { season: "2023/24", position: 5, type: "final" },
      ],
      recentJoinings: [
        { name: "Alex Rivera", position: "ST", date: "2024-07-01" },
        { name: "Kenji Tanaka", position: "ZM", date: "2024-08-15" },
      ],
      recentDepartures: [
        { name: "Lukas Schmidt", position: "LV", date: "2024-06-30" },
      ],
      officialSponsors: [
        { name: "Wiener Stadtwerke", category: "Main Sponsor" },
        { name: "SportDirect", category: "Kit Sponsor" },
      ],
      connectedScoutIds: ["s1"],
    } as ClubProfile,
  },
  {
    id: "cl2",
    profile: {
      role: "club", clubName: "SV Salzburg United",
      league: "2. Liga", region: "Salzburg", country: "Austria",
      website: "https://svsalzburgutd.at", bio: "Salzburg-based club with strong youth academy and community focus.",
      recruitmentFocus: ["Youth development", "Women's team"],
      facilities: "Full-size pitch, indoor hall, and youth academy center.",
      currentCoachId: undefined,
      leagueRecord: [
        { season: "2024/25", position: 8, type: "current" },
        { season: "2023/24", position: 10, type: "final" },
      ],
      recentJoinings: [
        { name: "David Müller", position: "IV", date: "2023-01-15" },
      ],
      recentDepartures: [],
      officialSponsors: [
        { name: "Salzburg Tourismus", category: "Main Sponsor" },
      ],
      connectedScoutIds: ["s2"],
    } as ClubProfile,
  },
  {
    id: "cl3",
    profile: {
      role: "club", clubName: "SC Tirol Innsbruck",
      league: "Regionalliga West", region: "Tirol", country: "Austria",
      website: "https://sctirol.at", bio: "Traditional Tyrolean club building a competitive squad for regional success.",
      recruitmentFocus: ["First team", "Goalkeepers"],
      facilities: "Natural grass pitch, small gym, clubhouse.",
      leagueRecord: [
        { season: "2024/25", position: 2, type: "current" },
      ],
      recentJoinings: [],
      recentDepartures: [],
      officialSponsors: [
        { name: "Tiroler Versicherung", category: "Stadium Sponsor" },
      ],
      connectedScoutIds: [],
    } as ClubProfile,
  },
  {
    id: "cl4",
    profile: {
      role: "club", clubName: "Grazer AK Future",
      league: "Landesliga Steiermark", region: "Steiermark", country: "Austria",
      website: "https://gakfuture.at", bio: "Development club focused on nurturing young talent from the Styria region.",
      recruitmentFocus: ["Youth development", "Coaching staff"],
      facilities: "Two training pitches, video room, physiotherapy suite.",
      leagueRecord: [
        { season: "2024/25", position: 6, type: "current" },
      ],
      recentJoinings: [],
      recentDepartures: [],
      officialSponsors: [],
      connectedScoutIds: ["s3"],
    } as ClubProfile,
  },
  {
    id: "cl5",
    profile: {
      role: "club", clubName: "Union Vöcklabruck",
      league: "Landesliga OÖ", region: "Oberösterreich", country: "Austria",
      website: "", bio: "Community-driven club in Upper Austria with a passion for grassroots football.",
      recruitmentFocus: ["First team", "Women's team", "Youth development"],
      facilities: "Two pitches (natural + artificial), clubhouse with meeting rooms.",
      leagueRecord: [],
      recentJoinings: [],
      recentDepartures: [],
      officialSponsors: [
        { name: "Raiffeisen OÖ", category: "Kit Sponsor" },
      ],
      connectedScoutIds: [],
    } as ClubProfile,
  },
];

// ────────────────────────────────────────────────────────────
// Mock Scouts
// ────────────────────────────────────────────────────────────

const MOCK_SCOUTS: DirectoryEntry[] = [
  {
    id: "s1",
    profile: {
      role: "scout", name: "Jürgen Reiter",
      affiliation: "FC North Vienna",
      regionsOfInterest: ["Wien", "Niederösterreich", "Burgenland"],
      leaguesOfInterest: ["Regionalliga Ost", "Wiener Stadtliga"],
      positionsLookingFor: ["ST", "ZOM", "LF", "RF"],
      ageRangeMin: 16, ageRangeMax: 23,
      notes: "Focusing on offensive talent for the youth-to-first-team pipeline.",
    } as ScoutProfile,
  },
  {
    id: "s2",
    profile: {
      role: "scout", name: "Elisabeth Moser",
      affiliation: "SV Salzburg United",
      regionsOfInterest: ["Salzburg", "Oberösterreich", "Tirol"],
      leaguesOfInterest: ["2. Liga", "Regionalliga West", "Regionalliga Mitte"],
      positionsLookingFor: ["IV", "ZDM", "TW"],
      ageRangeMin: 18, ageRangeMax: 28,
      notes: "Looking for defensive reinforcements and a backup goalkeeper.",
    } as ScoutProfile,
  },
  {
    id: "s3",
    profile: {
      role: "scout", name: "Florian Eder",
      affiliation: "Independent",
      regionsOfInterest: ["Steiermark", "Kärnten"],
      leaguesOfInterest: ["Landesliga Steiermark", "Kärntner Liga"],
      positionsLookingFor: ["LV", "RV", "LM", "RM", "ST"],
      ageRangeMin: 15, ageRangeMax: 21,
      notes: "Independent talent scout specializing in southern Austrian youth football.",
    } as ScoutProfile,
  },
];

// ────────────────────────────────────────────────────────────
// Mock Sponsors
// ────────────────────────────────────────────────────────────

const MOCK_SPONSORS: DirectoryEntry[] = [
  {
    id: "sp1",
    profile: {
      role: "sponsor", companyName: "SportDirect Austria",
      industry: "Sports Retail", website: "https://sportdirect.at",
      contactName: "Helmut Wagner", country: "Austria",
      budget: "€50K–€150K", sponsorshipType: ["Kit", "Equipment", "Training Wear"],
      bio: "Leading Austrian sports retailer supporting grassroots and semi-professional football.",
    } as SponsorProfile,
  },
  {
    id: "sp2",
    profile: {
      role: "sponsor", companyName: "Alpen Energy GmbH",
      industry: "Energy / Utilities", website: "https://alpenenergy.at",
      contactName: "Claudia Steiner", country: "Austria",
      budget: "€100K–€500K", sponsorshipType: ["Stadium", "Match Day", "Community"],
      bio: "Regional energy provider investing in community sport and sustainability.",
    } as SponsorProfile,
  },
  {
    id: "sp3",
    profile: {
      role: "sponsor", companyName: "DigitalWerk",
      industry: "Technology", website: "https://digitalwerk.io",
      contactName: "Philipp Novak", country: "Austria",
      budget: "€20K–€80K", sponsorshipType: ["Digital", "Academy"],
      bio: "Tech company supporting digital transformation and e-sports initiatives in Austrian football.",
    } as SponsorProfile,
  },
];

// ────────────────────────────────────────────────────────────
// Directory access functions
// ────────────────────────────────────────────────────────────

const ALL_ENTRIES: DirectoryEntry[] = [
  ...MOCK_PLAYERS,
  ...MOCK_COACHES,
  ...MOCK_CLUBS,
  ...MOCK_SCOUTS,
  ...MOCK_SPONSORS,
];

export function getAllProfiles(): DirectoryEntry[] {
  return ALL_ENTRIES;
}

export function getProfilesByType(type: ProfileType): DirectoryEntry[] {
  return ALL_ENTRIES.filter((e) => e.profile.role === type);
}

export function getProfileById(id: string): DirectoryEntry | null {
  return ALL_ENTRIES.find((e) => e.id === id) ?? null;
}

export function searchProfiles(query: string, type?: ProfileType): DirectoryEntry[] {
  const q = query.toLowerCase();
  let results = type ? getProfilesByType(type) : ALL_ENTRIES;

  if (!q) return results;

  results = results.filter((entry) => {
    const p = entry.profile;
    switch (p.role) {
      case "player":
        return (
          p.name.toLowerCase().includes(q) ||
          p.positionPrimary.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q) ||
          p.currentClub.toLowerCase().includes(q) ||
          p.nationality.toLowerCase().includes(q)
        );
      case "coach":
        return (
          p.name.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q) ||
          p.currentClub.toLowerCase().includes(q) ||
          p.certifications.some((c) => c.toLowerCase().includes(q))
        );
      case "club":
        return (
          p.clubName.toLowerCase().includes(q) ||
          p.league.toLowerCase().includes(q) ||
          p.region.toLowerCase().includes(q)
        );
      case "scout":
        return (
          p.name.toLowerCase().includes(q) ||
          p.affiliation.toLowerCase().includes(q) ||
          p.regionsOfInterest.some((r) => r.toLowerCase().includes(q))
        );
      case "sponsor":
        return (
          p.companyName.toLowerCase().includes(q) ||
          p.industry.toLowerCase().includes(q) ||
          p.sponsorshipType.some((t) => t.toLowerCase().includes(q))
        );
      default:
        return false;
    }
  });

  return results;
}

/** Helper to get a display name from any profile */
export function getProfileDisplayName(profile: Profile): string {
  switch (profile.role) {
    case "player": return profile.name;
    case "coach": return profile.name;
    case "club": return profile.clubName;
    case "scout": return profile.name;
    case "sponsor": return profile.companyName;
  }
}

/** Helper to get age from date of birth */
export function getAgeFromDOB(dob: string): number {
  const birth = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}
