export const RANKS = [
  "Stardust Cadet",
  "Junior Explorer",
  "Sky Voyager",
  "Deep Diver",
  "Master Adventurer",
  "Universe Legend",
] as const;

export const rankForLevel = (lvl: number) =>
  RANKS[Math.min(RANKS.length - 1, Math.floor((lvl - 1) / 3))];
