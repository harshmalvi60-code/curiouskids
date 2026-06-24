"use client";

import { useStore } from "@/lib/store";
import { levelFromSparks } from "@/lib/gamify";

export default function Hud() {
  const { explorerName, avatar, sparks, streak } = useStore((s) => ({
    explorerName: s.explorerName,
    avatar: s.avatar,
    sparks: s.sparks,
    streak: s.streak,
  }));
  const { level, into, need, rank } = levelFromSparks(sparks);
  const pct = Math.round((into / need) * 100);

  return (
    <div className="hud">
      <div className="avatar">{avatar}</div>
      <div className="meta">
        <div className="nm">{explorerName || "Explorer"}</div>
        <div className="rk">{rank}</div>
      </div>
      <div className="xpwrap">
        <div className="xpbar">
          <span style={{ width: `${pct}%` }} />
        </div>
        <div className="xplab">
          Lvl {level} · {into}/{need}⚡
        </div>
      </div>
      <div className="streak">
        <span className="fl">🔥</span>
        {streak.count}
      </div>
    </div>
  );
}
