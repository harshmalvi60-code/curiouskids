"use client";

import Link from "next/link";
import Hud from "@/components/Hud";
import Hydrated from "@/components/Hydrated";
import { useStore, worldsExplored } from "@/lib/store";
import { levelFromSparks } from "@/lib/gamify";
import { BADGES, BADGE_IDS } from "@/lib/badges";

function Profile() {
  const { explorerName, avatar, sparks, badges, streak, completed } = useStore((s) => ({
    explorerName: s.explorerName,
    avatar: s.avatar,
    sparks: s.sparks,
    badges: s.badges,
    streak: s.streak,
    completed: s.completed,
  }));
  const { level, rank } = levelFromSparks(sparks);
  const explored = worldsExplored(completed).length;

  return (
    <div className="view">
      <button className="back" onClick={() => history.back()}>
        ‹ Back
      </button>
      <div className="prof-top">
        <div className="av">{avatar}</div>
        <h2>{explorerName || "Explorer"}</h2>
        <div className="rk">{rank}</div>
      </div>

      <div className="statrow">
        <div className="stat">
          <b>{sparks}</b>
          <span>SPARKS ⚡</span>
        </div>
        <div className="stat">
          <b>{level}</b>
          <span>LEVEL</span>
        </div>
        <div className="stat">
          <b>{streak.count}🔥</b>
          <span>STREAK</span>
        </div>
      </div>

      <div className="stat" style={{ marginBottom: 8 }}>
        <b>{explored}/6</b>
        <span>WORLDS EXPLORED</span>
      </div>

      <div className="shelf-h">🏅 Badge Shelf</div>
      <div className="badges">
        {BADGE_IDS.map((id) => {
          const got = badges.includes(id);
          const b = BADGES[id];
          return (
            <div key={id} className={`bdg ${got ? "unlocked" : "locked"}`}>
              <div className="be">{got ? b.e : "🔒"}</div>
              <small>{b.name}</small>
            </div>
          );
        })}
      </div>

      <Link className="btn ghost block" href="/universe" style={{ marginTop: 18 }}>
        ‹ Back to Galaxy Map
      </Link>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <Hydrated>
      <Hud />
      <Profile />
    </Hydrated>
  );
}
