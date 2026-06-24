import Link from "next/link";
import { WORLDS } from "@/lib/content";

export default function Landing() {
  return (
    <div className="view">
      <div className="hero">
        <div className="badge-top">✦</div>
        <h1>
          Turn screen time into <span className="g">discovery time.</span>
        </h1>
        <p className="sub">
          Six magical worlds where your child explores space, animals, oceans, dinosaurs and more —
          through interactive adventures, not boring lessons.
        </p>
        <div className="trust">
          <span className="pill">🔒 Safe &amp; ad-free</span>
          <span className="pill">📶 Works offline</span>
          <span className="pill">💸 ₹499 once</span>
        </div>
        <Link className="btn" href="/universe">
          ▸ Start Exploring
        </Link>
        <div className="preview">
          <div className="pgrid">
            {WORLDS.map((w) => (
              <div className="mini" key={w.id} title={w.title}>
                {w.emoji}
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="section">
        <h2>How it works</h2>
        <p className="lead">A universe your kid wants to be in.</p>
        <div className="steps">
          <div className="step">
            <div className="no">1</div>
            <div>
              <b>Pick a world</b>
              <p>Space? Dinosaurs? The deep ocean? Your explorer chooses where to go.</p>
            </div>
          </div>
          <div className="step">
            <div className="no">2</div>
            <div>
              <b>Go on missions</b>
              <p>Interactive lessons, fun facts and &quot;whoa, I didn&apos;t know that!&quot; moments.</p>
            </div>
          </div>
          <div className="step">
            <div className="no">3</div>
            <div>
              <b>Earn &amp; climb</b>
              <p>Sparks, badges, streaks and ranks — learning that feels like winning.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>The 6 Worlds</h2>
        <div className="worlds" style={{ marginTop: 14 }}>
          {WORLDS.map((w) => (
            <Link className="world" key={w.id} href="/universe" style={{ background: w.grad }}>
              <div className="planet">{w.emoji}</div>
              <div>
                <h3>{w.title}</h3>
                <small>{w.blurb}</small>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Why parents love it</h2>
        <div className="why">
          <div className="cell"><b>🔒 Walled-garden safe</b>No ads, no chats, no links out. One safe universe.</div>
          <div className="cell"><b>📈 See real progress</b>Worlds explored, badges earned, streaks kept.</div>
          <div className="cell"><b>📶 Works offline</b>Perfect for flights, cars and patchy networks.</div>
          <div className="cell"><b>💸 Pay once, own forever</b>₹499, no sneaky subscription. Ever.</div>
        </div>
      </section>

      <section className="section">
        <div className="price">
          <div className="big">₹499</div>
          <div className="small">Once. That&apos;s it. Less than one pizza, a lifetime of curiosity.</div>
          <Link className="btn block" href="/universe">
            ▸ Unlock the Universe
          </Link>
        </div>
      </section>

      <div className="foot">Curious Kids Universe · A Yuvaan Technologies product</div>
    </div>
  );
}
