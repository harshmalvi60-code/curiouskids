"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useStore } from "@/lib/store";
import { BADGES } from "@/lib/badges";

const TIPS = [
  "Great exploring! 🚀",
  "Did you know? You just got smarter! ✨",
  "Tap a world to start an adventure!",
  "Keep your streak alive every day! 🔥",
  "You're a real explorer now! 🌟",
  "Curiosity is your superpower! ⚡",
];

const COLORS = ["#FFC93C", "#FF6B9D", "#34E1B6", "#8B6CFF", "#ffffff"];

export default function Chrome() {
  const pathname = usePathname();
  const hydrated = useStore((s) => s.hydrated);
  const reward = useStore((s) => s.reward);
  const closeReward = useStore((s) => s.closeReward);
  const touchStreak = useStore((s) => s.touchStreak);
  const explorerName = useStore((s) => s.explorerName);

  const [bubble, setBubble] = useState<string | null>(null);

  // daily streak touch once hydrated + onboarded
  useEffect(() => {
    if (hydrated && explorerName) touchStreak();
  }, [hydrated, explorerName, touchStreak]);

  // register service worker for offline-first
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  }, []);

  const onLanding = pathname === "/" || pathname === "/checkout";
  const showSpark = hydrated && !onLanding && !!explorerName;

  function say(msg: string) {
    setBubble(msg);
    window.clearTimeout((say as any)._t);
    (say as any)._t = window.setTimeout(() => setBubble(null), 3200);
  }

  const confetti = useMemo(() => {
    if (!reward) return [];
    return Array.from({ length: 70 }, (_, i) => ({
      left: Math.random() * 100,
      color: COLORS[i % COLORS.length],
      dur: 1.6 + Math.random() * 1.6,
      delay: Math.random() * 0.4,
      rot: Math.random() * 360,
    }));
  }, [reward]);

  return (
    <>
      {showSpark && (
        <>
          <button className="spark" aria-label="Spark says hi" onClick={() => say(TIPS[Math.floor(Math.random() * TIPS.length)])}>
            ✦
          </button>
          <AnimatePresence>
            {bubble && (
              <motion.div
                className="spark-bubble"
                initial={{ opacity: 0, scale: 0.6, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.6 }}
              >
                {bubble}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      <AnimatePresence>
        {reward && (
          <motion.div
            className="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeReward}
          >
            <div className="confetti" aria-hidden>
              {confetti.map((c, i) => (
                <i
                  key={i}
                  style={{
                    left: `${c.left}%`,
                    background: c.color,
                    animationDuration: `${c.dur}s`,
                    animationDelay: `${c.delay}s`,
                    transform: `rotate(${c.rot}deg)`,
                  }}
                />
              ))}
            </div>
            <motion.div
              className="reward"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="big-e">{reward.emoji}</div>
              <h2>{reward.title}</h2>
              <p>{reward.sub}</p>
              {reward.gain && <div className="gain">{reward.gain}</div>}
              {reward.badge && BADGES[reward.badge] && (
                <div className="pill" style={{ margin: "0 auto 14px" }}>
                  {BADGES[reward.badge].e} New badge: {BADGES[reward.badge].name}
                </div>
              )}
              <button className="btn block violet" onClick={closeReward}>
                Keep exploring ▸
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
