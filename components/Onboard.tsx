"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";

const AVATARS = ["🚀", "🦄", "🐯", "🐙", "🦖", "🦊", "🐬", "🦉", "🐢", "🐉"];

export default function Onboard() {
  const setExplorer = useStore((s) => s.setExplorer);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("🚀");

  return (
    <div className="view">
      <div className="center-card">
        <h2>Create your Explorer</h2>
        <p className="cc">Pick a name and a buddy to start your adventure!</p>
        <input
          className="inp"
          maxLength={14}
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
        />
        <div className="ava-row">
          {AVATARS.map((a) => (
            <button
              key={a}
              className={`ava ${a === avatar ? "sel" : ""}`}
              onClick={() => setAvatar(a)}
              aria-label={`Choose ${a}`}
            >
              {a}
            </button>
          ))}
        </div>
        <button className="btn block violet" onClick={() => setExplorer(name, avatar)}>
          Let&apos;s explore! ▸
        </button>
      </div>
    </div>
  );
}
