"use client";

import { useEffect, useState } from "react";

type Star = { left: number; top: number; size: number; delay: number };

export default function Starfield() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const next: Star[] = Array.from({ length: 70 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 2 + Math.random() * 2,
      delay: Math.random() * 3.5,
    }));
    setStars(next);
  }, []);

  return (
    <div className="stars" aria-hidden>
      {stars.map((s, i) => (
        <i
          key={i}
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
      {stars.length > 0 && <div className="shoot" />}
    </div>
  );
}
