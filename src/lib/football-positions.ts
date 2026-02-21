/**
 * Football positions with German abbreviations, pitch coordinates, and playing styles.
 */

export interface Position {
  id: string;
  label: string;
  abbr: string;
  zone: "gk" | "defense" | "midfield" | "attack";
  /** Position on pitch as percentage (0-100) from left, top */
  x: number;
  y: number;
  styles: { id: string; label: string }[];
}

export const POSITIONS: Position[] = [
  // Goalkeeper
  {
    id: "TW", label: "Goalkeeper", abbr: "TW", zone: "gk",
    x: 50, y: 92,
    styles: [
      { id: "shot-stopper", label: "Shot Stopper" },
      { id: "sweeper-keeper", label: "Sweeper Keeper" },
      { id: "distributor", label: "Ball-playing GK" },
      { id: "commanding", label: "Commanding Presence" },
    ],
  },

  // Defense
  {
    id: "LV", label: "Left Back", abbr: "LV", zone: "defense",
    x: 15, y: 75,
    styles: [
      { id: "overlapping-fb", label: "Overlapping Fullback" },
      { id: "inverted-fb", label: "Inverted Fullback" },
      { id: "defensive-fb", label: "Defensive Fullback" },
      { id: "wing-back", label: "Wing-back" },
    ],
  },
  {
    id: "IV-L", label: "Center Back", abbr: "IV", zone: "defense",
    x: 38, y: 80,
    styles: [
      { id: "ball-playing-cb", label: "Ball-playing CB" },
      { id: "stopper", label: "Stopper" },
      { id: "sweeper", label: "Sweeper" },
      { id: "aerial-dominant", label: "Aerial Dominant" },
      { id: "leader", label: "Defensive Leader" },
    ],
  },
  {
    id: "IV-R", label: "Center Back", abbr: "IV", zone: "defense",
    x: 62, y: 80,
    styles: [
      { id: "ball-playing-cb", label: "Ball-playing CB" },
      { id: "stopper", label: "Stopper" },
      { id: "sweeper", label: "Sweeper" },
      { id: "aerial-dominant", label: "Aerial Dominant" },
      { id: "leader", label: "Defensive Leader" },
    ],
  },
  {
    id: "RV", label: "Right Back", abbr: "RV", zone: "defense",
    x: 85, y: 75,
    styles: [
      { id: "overlapping-fb", label: "Overlapping Fullback" },
      { id: "inverted-fb", label: "Inverted Fullback" },
      { id: "defensive-fb", label: "Defensive Fullback" },
      { id: "wing-back", label: "Wing-back" },
    ],
  },

  // Midfield
  {
    id: "LM", label: "Left Midfield", abbr: "LM", zone: "midfield",
    x: 12, y: 50,
    styles: [
      { id: "wide-playmaker", label: "Wide Playmaker" },
      { id: "tireless-runner", label: "Tireless Runner" },
      { id: "crossing-specialist", label: "Crossing Specialist" },
      { id: "defensive-winger", label: "Defensive Winger" },
    ],
  },
  {
    id: "ZDM", label: "Defensive Midfield", abbr: "ZDM", zone: "midfield",
    x: 50, y: 60,
    styles: [
      { id: "ball-winner", label: "Ball-winning Midfielder" },
      { id: "deep-playmaker", label: "Deep-lying Playmaker" },
      { id: "holding", label: "Holding Midfielder" },
      { id: "aggressive-tackler", label: "Aggressive Tackler" },
      { id: "box-to-box-def", label: "Box-to-box Defensive" },
      { id: "tactical-anchor", label: "Tactical Anchor" },
      { id: "build-up-dist", label: "Build-up Distributor" },
    ],
  },
  {
    id: "ZM", label: "Central Midfield", abbr: "ZM", zone: "midfield",
    x: 50, y: 48,
    styles: [
      { id: "box-to-box", label: "Box-to-box" },
      { id: "deep-playmaker", label: "Deep-lying Playmaker" },
      { id: "mezzala", label: "Mezzala" },
      { id: "tempo-controller", label: "Tempo Controller" },
      { id: "shuttler", label: "Shuttler" },
    ],
  },
  {
    id: "RM", label: "Right Midfield", abbr: "RM", zone: "midfield",
    x: 88, y: 50,
    styles: [
      { id: "wide-playmaker", label: "Wide Playmaker" },
      { id: "tireless-runner", label: "Tireless Runner" },
      { id: "crossing-specialist", label: "Crossing Specialist" },
      { id: "defensive-winger", label: "Defensive Winger" },
    ],
  },
  {
    id: "ZOM", label: "Attacking Midfield", abbr: "ZOM", zone: "midfield",
    x: 50, y: 36,
    styles: [
      { id: "attacking-playmaker", label: "Attacking Playmaker" },
      { id: "shadow-striker", label: "Shadow Striker" },
      { id: "trequartista", label: "Trequartista" },
      { id: "enganche", label: "Enganche" },
      { id: "creative-hub", label: "Creative Hub" },
    ],
  },

  // Attack
  {
    id: "LF", label: "Left Wing", abbr: "LF", zone: "attack",
    x: 15, y: 25,
    styles: [
      { id: "inverted-winger", label: "Inverted Winger" },
      { id: "touchline-winger", label: "Touchline Winger" },
      { id: "inside-forward", label: "Inside Forward" },
      { id: "direct-dribbler", label: "Direct Dribbler" },
    ],
  },
  {
    id: "LS", label: "Left Striker", abbr: "LS", zone: "attack",
    x: 33, y: 15,
    styles: [
      { id: "pressing-forward", label: "Pressing Forward" },
      { id: "poacher", label: "Poacher" },
      { id: "link-up-forward", label: "Link-up Forward" },
      { id: "target-man", label: "Target Man" },
    ],
  },
  {
    id: "ST", label: "Striker", abbr: "ST", zone: "attack",
    x: 50, y: 10,
    styles: [
      { id: "target-man", label: "Target Man" },
      { id: "pressing-forward", label: "Pressing Forward" },
      { id: "poacher", label: "Poacher" },
      { id: "complete-forward", label: "Complete Forward" },
      { id: "false-nine", label: "False Nine" },
    ],
  },
  {
    id: "MS", label: "Center Forward", abbr: "MS", zone: "attack",
    x: 50, y: 22,
    styles: [
      { id: "false-nine", label: "False Nine" },
      { id: "link-up-forward", label: "Link-up Forward" },
      { id: "deep-forward", label: "Deep-lying Forward" },
      { id: "creative-forward", label: "Creative Forward" },
    ],
  },
  {
    id: "RS", label: "Right Striker", abbr: "RS", zone: "attack",
    x: 67, y: 15,
    styles: [
      { id: "pressing-forward", label: "Pressing Forward" },
      { id: "poacher", label: "Poacher" },
      { id: "link-up-forward", label: "Link-up Forward" },
      { id: "target-man", label: "Target Man" },
    ],
  },
  {
    id: "RF", label: "Right Wing", abbr: "RF", zone: "attack",
    x: 85, y: 25,
    styles: [
      { id: "inverted-winger", label: "Inverted Winger" },
      { id: "touchline-winger", label: "Touchline Winger" },
      { id: "inside-forward", label: "Inside Forward" },
      { id: "direct-dribbler", label: "Direct Dribbler" },
    ],
  },
];

export const ZONE_COLORS: Record<Position["zone"], { bg: string; text: string; border: string }> = {
  gk: { bg: "rgba(245,159,11,0.15)", text: "text-amber-500 dark:text-amber-400", border: "border-amber-500/30" },
  defense: { bg: "rgba(59,130,246,0.15)", text: "text-blue-500 dark:text-blue-400", border: "border-blue-500/30" },
  midfield: { bg: "rgba(16,185,129,0.15)", text: "text-emerald-500 dark:text-emerald-400", border: "border-emerald-500/30" },
  attack: { bg: "rgba(244,63,94,0.15)", text: "text-rose-500 dark:text-rose-400", border: "border-rose-500/30" },
};

export const NATIONALITIES = [
  "Austrian", "German", "Swiss", "Turkish", "Serbian", "Croatian", "Bosnian",
  "Hungarian", "Slovak", "Czech", "Polish", "Romanian", "Bulgarian",
  "Slovenian", "Albanian", "Kosovar", "Montenegrin", "North Macedonian",
  "Italian", "French", "Spanish", "Portuguese", "Dutch", "Belgian",
  "English", "Scottish", "Irish", "Swedish", "Norwegian", "Danish", "Finnish",
  "Greek", "Ukrainian", "Russian", "Brazilian", "Argentine", "Colombian",
  "Nigerian", "Ghanaian", "Cameroonian", "Ivorian", "Senegalese",
  "Japanese", "South Korean", "American", "Canadian", "Australian",
  "Other",
];

export const AUSTRIAN_CITIES = [
  "Wien", "Graz", "Linz", "Salzburg", "Innsbruck", "Klagenfurt",
  "Villach", "Wels", "St. Pölten", "Dornbirn", "Wiener Neustadt",
  "Steyr", "Feldkirch", "Bregenz", "Leonding", "Klosterneuburg",
  "Baden", "Wolfsberg", "Leoben", "Krems an der Donau", "Traun",
  "Amstetten", "Lustenau", "Kapfenberg", "Mödling", "Hallein",
  "Kufstein", "Braunau am Inn", "Schwechat", "Ternitz", "Traiskirchen",
  "Perchtoldsdorf", "Telfs", "Bludenz", "Spittal an der Drau",
  "Saalfelden", "Ansfelden", "Stockerau", "Ried im Innkreis",
  "Hohenems", "Lienz", "Wörgl", "Tulln", "Neunkirchen",
  "Zwettl", "Hartberg", "Eisenstadt", "Oberwart", "Deutschlandsberg",
];

export const LANGUAGES = [
  "German", "English", "Turkish", "Serbian", "Croatian", "Bosnian",
  "Hungarian", "Polish", "Romanian", "Albanian", "Arabic",
  "French", "Spanish", "Portuguese", "Italian", "Russian",
  "Dutch", "Greek", "Czech", "Slovak", "Slovenian",
  "Japanese", "Chinese", "Korean",
];
