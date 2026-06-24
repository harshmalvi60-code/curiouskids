"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useStore } from "@/lib/store";
import { World } from "@/lib/content";

type Screen =
  | { t: "list" }
  | { t: "lesson"; i: number; card: number }
  | { t: "quiz"; q: number; answered: boolean; picked: number | null };

const slide = {
  initial: { opacity: 0, x: 24 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -24 },
};

export default function WorldView({ world }: { world: World }) {
  const completed = useStore((s) => s.completed);
  const completeLesson = useStore((s) => s.completeLesson);
  const completeQuiz = useStore((s) => s.completeQuiz);
  const completeChallenge = useStore((s) => s.completeChallenge);

  const [screen, setScreen] = useState<Screen>({ t: "list" });
  const factIdx = useState(() => Math.floor(Math.random() * world.facts.length))[0];

  // ---------- mission list ----------
  if (screen.t === "list") {
    const items = [
      ...world.lessons.map((l, i) => ({
        key: `${world.id}-l${i}`,
        ic: "📖",
        title: l.title,
        sub: `${l.cards.length} discovery cards`,
        xp: 20,
        onClick: () => setScreen({ t: "lesson", i, card: 0 }),
      })),
      {
        key: `${world.id}-quiz`,
        ic: "🧠",
        title: "World Quiz",
        sub: `${world.quiz.length} questions · earn a badge`,
        xp: 30,
        onClick: () => setScreen({ t: "quiz", q: 0, answered: false, picked: null }),
      },
      {
        key: `${world.id}-ch`,
        ic: "🎯",
        title: world.challenge.title,
        sub: "A real-world mission",
        xp: 50,
        onClick: () => completeChallenge(world.id),
      },
    ];

    return (
      <motion.div className="view" {...slide}>
        <Link className="back" href="/universe">
          ‹ Galaxy Map
        </Link>
        <div className="wv-hero" style={{ background: world.grad }}>
          <div className="planet">{world.emoji}</div>
          <h2>{world.title}</h2>
          <p>{world.blurb}</p>
        </div>
        <div className="mlist">
          {items.map((it) => (
            <div className="mcard" key={it.key} onClick={it.onClick} role="button" tabIndex={0}>
              <div className="ic" style={{ background: `${world.accent}33` }}>
                {it.ic}
              </div>
              <div className="tx">
                <b>{it.title}</b>
                <span>{it.sub}</span>
              </div>
              {completed[it.key] ? <div className="chk">✓</div> : <div className="xp">+{it.xp}⚡</div>}
            </div>
          ))}
          <div className="mcard" style={{ cursor: "default" }}>
            <div className="ic" style={{ background: `${world.accent}33` }}>
              💡
            </div>
            <div className="tx">
              <b>Did You Know?</b>
              <span>{world.facts[factIdx]}</span>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // ---------- lesson deck ----------
  if (screen.t === "lesson") {
    const lesson = world.lessons[screen.i];
    const card = lesson.cards[screen.card];
    const last = screen.card === lesson.cards.length - 1;
    return (
      <div className="view lesson">
        <button className="back" onClick={() => setScreen({ t: "list" })}>
          ‹ {world.title}
        </button>
        <AnimatePresence mode="wait">
          <motion.div className="lcard" key={screen.card} {...slide} transition={{ duration: 0.25 }}>
            <div className="emoji">{card.e}</div>
            <h3>{card.h}</h3>
            <div className="body">{card.p}</div>
            {card.wow && <div className="wow">{card.wow}</div>}
          </motion.div>
        </AnimatePresence>
        <div className="dots">
          {lesson.cards.map((_, k) => (
            <i key={k} className={k === screen.card ? "on" : ""} />
          ))}
        </div>
        <button
          className={`btn block ${last ? "" : "violet"}`}
          onClick={() => {
            if (last) {
              completeLesson(world.id, screen.i);
              setScreen({ t: "list" });
            } else {
              setScreen({ t: "lesson", i: screen.i, card: screen.card + 1 });
            }
          }}
        >
          {last ? "Finish & earn Sparks ⚡" : "Next ▸"}
        </button>
      </div>
    );
  }

  // ---------- quiz ----------
  const q = world.quiz[screen.q];
  const lastQ = screen.q === world.quiz.length - 1;

  function pick(k: number) {
    if (screen.t !== "quiz" || screen.answered) return;
    setScreen({ ...screen, answered: true, picked: k });
  }
  function next() {
    if (screen.t !== "quiz") return;
    if (lastQ) {
      completeQuiz(world.id);
      setScreen({ t: "list" });
    } else {
      setScreen({ t: "quiz", q: screen.q + 1, answered: false, picked: null });
    }
  }

  return (
    <div className="view quiz">
      <button className="back" onClick={() => setScreen({ t: "list" })}>
        ‹ {world.title}
      </button>
      <div className="qprog">
        Question {screen.q + 1} of {world.quiz.length}
      </div>
      <AnimatePresence mode="wait">
        <motion.div className="qcard" key={screen.q} {...slide} transition={{ duration: 0.25 }}>
          <h3>{q.q}</h3>
          <div>
            {q.opts.map((o, k) => {
              let cls = "opt";
              if (screen.answered) {
                if (k === q.a) cls += " right";
                else if (k === screen.picked) cls += " wrong";
              }
              return (
                <button key={k} className={cls} disabled={screen.answered} onClick={() => pick(k)}>
                  {o}
                </button>
              );
            })}
          </div>
          {screen.answered && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="explain">
                {screen.picked === q.a ? "✅ Correct! " : "💡 "}
                {q.why}
              </div>
              <button className="btn block violet" style={{ marginTop: 12 }} onClick={next}>
                {lastQ ? "Finish quiz ▸" : "Next question ▸"}
              </button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
