export type Badge = { e: string; name: string };

export const BADGES: Record<string, Badge> = {
  first:     { e: "🌟", name: "First Discovery" },
  space:     { e: "🪐", name: "Galaxy Conqueror" },
  animals:   { e: "🦁", name: "Beast Master" },
  ocean:     { e: "🌊", name: "Deep Diver" },
  dinosaurs: { e: "🦕", name: "Dino Hunter" },
  body:      { e: "🫀", name: "Body Genius" },
  nature:    { e: "🌿", name: "Earth Guardian" },
  quiz:      { e: "🧠", name: "Quiz Whiz" },
  streak3:   { e: "🔥", name: "3-Day Spark" },
  sparks100: { e: "⚡", name: "100 Sparks" },
};

export const BADGE_IDS = Object.keys(BADGES);
