"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { WORLDS, worldById } from "./content";
import { XP } from "./gamify";

type Streak = { count: number; last: string };

export type RewardPayload = {
  emoji: string;
  title: string;
  sub: string;
  gain?: string;
  badge?: string;
  levelUp?: number;
};

type State = {
  hydrated: boolean;
  unlocked: boolean; // paid?
  explorerName: string;
  avatar: string;
  sparks: number;
  completed: Record<string, true>;
  badges: string[];
  streak: Streak;
  reward: RewardPayload | null;
};

type Actions = {
  setHydrated: () => void;
  setExplorer: (name: string, avatar: string) => void;
  unlock: () => void;
  touchStreak: () => void;
  addBadge: (id: string) => boolean;
  award: (sparks: number, partial?: Partial<RewardPayload> & { badge?: string }) => void;
  completeLesson: (worldId: string, index: number) => void;
  completeQuiz: (worldId: string) => void;
  completeChallenge: (worldId: string) => void;
  closeReward: () => void;
  reset: () => void;
};

const today = () => new Date().toDateString();

const fresh = (): State => ({
  hydrated: false,
  unlocked: true, // demo build ships unlocked; flip to false when wiring Razorpay gate
  explorerName: "",
  avatar: "🚀",
  sparks: 0,
  completed: {},
  badges: [],
  streak: { count: 0, last: "" },
  reward: null,
});

// give a world its full-clear badge if every mission is done
function maybeWorldBadge(worldId: string, completed: Record<string, true>): string | null {
  const w = worldById(worldId);
  if (!w) return null;
  const keys = [
    ...w.lessons.map((_, i) => `${worldId}-l${i}`),
    `${worldId}-quiz`,
    `${worldId}-ch`,
  ];
  return keys.every((k) => completed[k]) ? worldId : null;
}

export const useStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      ...fresh(),

      setHydrated: () => set({ hydrated: true }),

      setExplorer: (name, avatar) =>
        set({ explorerName: name.trim() || "Explorer", avatar }),

      unlock: () => set({ unlocked: true }),

      touchStreak: () => {
        const s = get().streak;
        const t = today();
        if (s.last === t) return;
        const yest = new Date(Date.now() - 864e5).toDateString();
        const count = s.last === yest ? s.count + 1 : 1;
        set({ streak: { count, last: t } });
        if (count >= 3) get().addBadge("streak3");
      },

      addBadge: (id) => {
        if (get().badges.includes(id)) return false;
        set({ badges: [...get().badges, id] });
        return true;
      },

      award: (sparks, partial = {}) => {
        const before = get().sparks;
        const beforeLevel = levelOf(before);
        const next = before + sparks;
        set({ sparks: next });

        const add = get().addBadge;
        if (get().badges.length === 0) add("first");
        if (next >= 100) add("sparks100");
        if (partial.badge) add(partial.badge);

        const afterLevel = levelOf(next);
        const levelledUp = afterLevel > beforeLevel;

        set({
          reward: {
            emoji: levelledUp ? "🎉" : partial.emoji || "🌟",
            title: levelledUp ? `Level ${afterLevel}!` : partial.title || "Discovery complete!",
            sub: levelledUp ? "You levelled up — keep exploring!" : partial.sub || "You earned Sparks!",
            gain: `+${sparks} Sparks ⚡`,
            badge: partial.badge,
            levelUp: levelledUp ? afterLevel : undefined,
          },
        });
      },

      completeLesson: (worldId, index) => {
        const key = `${worldId}-l${index}`;
        if (get().completed[key]) return;
        set({ completed: { ...get().completed, [key]: true } });
        get().touchStreak();
        const wb = maybeWorldBadge(worldId, get().completed);
        get().award(XP.lesson, {
          emoji: "📖",
          title: "Discovery unlocked!",
          sub: "You learned something new!",
          badge: wb || undefined,
        });
      },

      completeQuiz: (worldId) => {
        const key = `${worldId}-quiz`;
        if (get().completed[key]) return;
        set({ completed: { ...get().completed, [key]: true } });
        get().addBadge("quiz");
        get().touchStreak();
        const wb = maybeWorldBadge(worldId, get().completed);
        get().award(XP.quizComplete, {
          emoji: "🧠",
          title: "Quiz complete!",
          sub: "You're a Quiz Whiz!",
          badge: wb || "quiz",
        });
      },

      completeChallenge: (worldId) => {
        const key = `${worldId}-ch`;
        const w = worldById(worldId);
        if (get().completed[key]) {
          set({
            reward: {
              emoji: "🎯",
              title: w?.challenge.title || "Challenge",
              sub: w?.challenge.prompt || "",
              gain: "Already earned ✓",
            },
          });
          return;
        }
        set({ completed: { ...get().completed, [key]: true } });
        get().touchStreak();
        const wb = maybeWorldBadge(worldId, get().completed);
        get().award(XP.challenge, {
          emoji: "🎯",
          title: "Challenge accepted!",
          sub: w?.challenge.prompt || "",
          badge: wb || undefined,
        });
      },

      closeReward: () => set({ reward: null }),

      reset: () => set({ ...fresh(), hydrated: true }),
    }),
    {
      name: "cku-progress",
      partialize: (s) => ({
        unlocked: s.unlocked,
        explorerName: s.explorerName,
        avatar: s.avatar,
        sparks: s.sparks,
        completed: s.completed,
        badges: s.badges,
        streak: s.streak,
      }),
      onRehydrateStorage: () => (state) => state?.setHydrated(),
    }
  )
);

// local helper (kept out of render path)
import { levelFromSparks } from "./gamify";
const levelOf = (sparks: number) => levelFromSparks(sparks).level;

// progress helpers for any world
export function worldProgress(worldId: string, completed: Record<string, true>) {
  const w = worldById(worldId);
  if (!w) return { done: 0, total: 0, pct: 0 };
  const keys = [
    ...w.lessons.map((_, i) => `${worldId}-l${i}`),
    `${worldId}-quiz`,
    `${worldId}-ch`,
  ];
  const done = keys.filter((k) => completed[k]).length;
  const total = keys.length;
  return { done, total, pct: Math.round((done / total) * 100) };
}

export function worldsExplored(completed: Record<string, true>) {
  return WORLDS.filter((w) => {
    const keys = [
      ...w.lessons.map((_, i) => `${w.id}-l${i}`),
      `${w.id}-quiz`,
      `${w.id}-ch`,
    ];
    return keys.some((k) => completed[k]);
  });
}
