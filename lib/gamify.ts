import { rankForLevel } from "./ranks";

// Gentle level curve: level n needs (100 * n) sparks within that level.
export type LevelInfo = { level: number; into: number; need: number; rank: string };

export function levelFromSparks(sparks: number): LevelInfo {
  let level = 1;
  let need = 100;
  let total = sparks;
  while (total >= need) {
    total -= need;
    level += 1;
    need = 100 * level;
  }
  return { level, into: total, need, rank: rankForLevel(level) };
}

export const XP = {
  lesson: 20,
  story: 15,
  quizCorrect: 10,
  quizComplete: 30,
  challenge: 50,
  dailyOpen: 5,
} as const;
