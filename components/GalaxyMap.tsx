"use client";

import Link from "next/link";
import { useStore, worldProgress } from "@/lib/store";
import { WORLDS } from "@/lib/content";

const CIRC = 2 * Math.PI * 16; // r=16

export default function GalaxyMap() {
  const completed = useStore((s) => s.completed);
  const explorerName = useStore((s) => s.explorerName);

  return (
    <div className="view">
      <div className="map-head">
        <h2>🌌 Galaxy Map</h2>
        <p>Choose a world to explore, {explorerName}!</p>
      </div>

      <div className="worlds">
        {WORLDS.map((w) => {
          const { done, total, pct } = worldProgress(w.id, completed);
          return (
            <Link className="world" key={w.id} href={`/universe/world/${w.id}`} style={{ background: w.grad }}>
              {pct >= 100 ? (
                <div className="done-chip">✓ Done</div>
              ) : (
                <div className="ring">
                  <svg width="40" height="40">
                    <circle cx="20" cy="20" r="16" fill="none" stroke="rgba(255,255,255,.2)" strokeWidth="4" />
                    <circle
                      cx="20"
                      cy="20"
                      r="16"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeDasharray={CIRC}
                      strokeDashoffset={CIRC - (CIRC * pct) / 100}
                    />
                  </svg>
                  <div className="pct">{pct}%</div>
                </div>
              )}
              <div className="planet">{w.emoji}</div>
              <div>
                <h3>{w.title}</h3>
                <small>
                  {done}/{total} missions
                </small>
              </div>
            </Link>
          );
        })}
      </div>

      <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
        <Link className="btn ghost block" href="/profile">
          🏆 My Profile
        </Link>
        <Link className="btn ghost block" href="/parent">
          👪 Parent Corner
        </Link>
      </div>
    </div>
  );
}
