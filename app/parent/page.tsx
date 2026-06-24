"use client";

import { useRouter } from "next/navigation";
import Hud from "@/components/Hud";
import Hydrated from "@/components/Hydrated";
import { useStore, worldsExplored } from "@/lib/store";

function shortName(title: string) {
  return title
    .replace(" Explorer", "")
    .replace(" Kingdom", "")
    .replace(" Mysteries", "")
    .replace(" Age", "");
}

function Parent() {
  const router = useRouter();
  const { explorerName, sparks, badges, streak, completed } = useStore((s) => ({
    explorerName: s.explorerName,
    sparks: s.sparks,
    badges: s.badges,
    streak: s.streak,
    completed: s.completed,
  }));
  const reset = useStore((s) => s.reset);

  const explored = worldsExplored(completed);
  const learned = explored.length
    ? explored.map((w) => shortName(w.title)).join(", ")
    : "just getting started";

  return (
    <div className="view parent">
      <button className="back" onClick={() => router.push("/universe")}>
        ‹ Galaxy Map
      </button>
      <div className="map-head">
        <h2>👪 Parent Corner</h2>
        <p>A quick look at {explorerName || "your explorer"}&apos;s journey</p>
      </div>

      <div className="statrow" style={{ marginTop: 14 }}>
        <div className="stat">
          <b>{sparks}</b>
          <span>SPARKS</span>
        </div>
        <div className="stat">
          <b>{badges.length}</b>
          <span>BADGES</span>
        </div>
        <div className="stat">
          <b>{explored.length}/6</b>
          <span>WORLDS</span>
        </div>
      </div>

      <div className="row">
        <b>What they&apos;re learning</b>
        <p>
          {explorerName || "Your explorer"} has been exploring{" "}
          <strong style={{ color: "#fff" }}>{learned}</strong> — discovering how the world works
          through interactive missions, stories and quizzes.
        </p>
      </div>
      <div className="row">
        <b>Discovery streak</b>
        <p>
          {streak.count > 0
            ? `🔥 ${streak.count}-day streak going strong! Coming back daily builds a curious habit.`
            : "No streak yet — a few minutes a day builds the habit."}
        </p>
      </div>
      <div className="row">
        <b>Safe &amp; ad-free</b>
        <p>
          This is a closed universe. No ads, no chats, no links out — nothing pulls your child away.
          Pay once, yours forever.
        </p>
      </div>

      <button
        className="btn ghost block"
        onClick={() => {
          if (confirm("Reset all progress? This cannot be undone.")) {
            reset();
            router.push("/");
          }
        }}
      >
        ↺ Reset progress
      </button>
    </div>
  );
}

export default function ParentPage() {
  return (
    <Hydrated>
      <Hud />
      <Parent />
    </Hydrated>
  );
}
