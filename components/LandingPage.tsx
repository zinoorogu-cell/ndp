"use client";

import { UserRole } from "@/lib/data";
import { FILMS, formatNaira } from "@/lib/data";
import { Badge } from "@/components/ui";
import LiveTicker from "@/components/LiveTicker";

interface LandingPageProps {
  onEnter: (role: UserRole) => void;
}

const STATS = [
  { v: "₦97M+", l: "Box Office Tracked" },
  { v: "26", l: "Active Cinemas" },
  { v: "3", l: "Films in Distribution" },
  { v: "174K+", l: "Tickets Sold" },
];

const STEPS = [
  {
    n: "01",
    t: "Submit Your Film",
    d: "Upload your film, poster, trailer and distribution details through our secure portal.",
  },
  {
    n: "02",
    t: "Admin Review",
    d: "Our distribution team reviews your film and assigns it to the optimal cinema network.",
  },
  {
    n: "03",
    t: "Cinemas Confirm",
    d: "Partner cinemas across Nigeria receive requests and confirm showtimes and screens.",
  },
  {
    n: "04",
    t: "Go Live & Track",
    d: "Your film launches with real-time box office tracking, revenue dashboards and analytics.",
  },
];

export default function LandingPage({ onEnter }: LandingPageProps) {
  return (
    <div
      style={{
        background: "#020408",
        color: "#e2e8f0",
        minHeight: "100vh",
      }}
    >
      {/* NAV */}
      <nav
        className="sticky top-0 z-50 backdrop-blur-md"
        style={{ borderBottom: "1px solid #0f172a", background: "#02040899" }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #E63946, #F4A261)" }}
            >
              <span className="text-white text-sm font-bold">N</span>
            </div>
            <span className="font-syne font-bold text-lg">
              NILE{" "}
              <span style={{ color: "#E63946" }}>DISTRIBUTION</span>
            </span>
          </div>
          <div
            className="hidden md:flex items-center gap-6 text-sm"
            style={{ color: "#64748b" }}
          >
            {["How It Works", "For Producers", "For Cinemas", "Network"].map(
              (l) => (
                <a
                  key={l}
                  href="#"
                  className="hover:text-white transition-colors"
                >
                  {l}
                </a>
              )
            )}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onEnter("producer")}
              className="text-sm px-4 py-2 rounded-lg transition-all hover:text-white"
              style={{ color: "#94a3b8", border: "1px solid #1e293b" }}
            >
              Sign In
            </button>
            <button
              onClick={() => onEnter("producer")}
              className="text-sm px-4 py-2 rounded-lg font-medium text-white transition-all hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, #E63946, #c0313d)",
              }}
            >
              Submit Film →
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <div className="relative overflow-hidden grid-bg">
        <div className="hero-glow" />
        <div className="max-w-6xl mx-auto px-6 py-24 relative z-10">
          <div className="mb-6">
            <LiveTicker />
          </div>
          <h1
            className="font-syne font-bold leading-none"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", maxWidth: "800px" }}
          >
            The Operating System
            <br />
            <span className="grad-text">for Film Distribution</span>
            <br />
            in Africa
          </h1>
          <p
            className="mt-6 text-lg max-w-xl"
            style={{ color: "#64748b" }}
          >
            Distribute your film across cinemas in Nigeria from one dashboard.
            Track box office performance, manage releases, and reach audiences
            nationwide.
          </p>
          <div className="flex flex-wrap gap-4 mt-10">
            <button
              onClick={() => onEnter("producer")}
              className="px-6 py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #E63946, #c0313d)",
                boxShadow: "0 0 30px #E6394644",
              }}
            >
              Submit Your Film →
            </button>
            <button
              onClick={() => onEnter("admin")}
              className="px-6 py-3 rounded-xl font-semibold transition-all hover:border-white/30"
              style={{ border: "1px solid #1e293b", color: "#94a3b8" }}
            >
              Request Demo
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
            {STATS.map((s) => (
              <div
                key={s.l}
                className="rounded-xl p-4"
                style={{ background: "#0a0f1a", border: "1px solid #1e293b" }}
              >
                <div className="text-2xl font-bold mb-1 font-syne">{s.v}</div>
                <div className="text-xs" style={{ color: "#475569" }}>
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FEATURED FILMS */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="mb-8">
          <div
            className="text-xs font-medium mb-2"
            style={{ color: "#E63946", letterSpacing: "0.1em" }}
          >
            NOW IN DISTRIBUTION
          </div>
          <h2 className="font-syne font-bold text-3xl">Featured Films</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {FILMS.map((film) => (
            <div
              key={film.id}
              className="rounded-2xl overflow-hidden card-hover"
              style={{
                background: "#0a0f1a",
                border: `1px solid ${film.color}33`,
              }}
            >
              <div
                className="h-48 flex items-center justify-center relative"
                style={{
                  background: `linear-gradient(135deg, ${film.color}11, ${film.color}33)`,
                }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{ background: film.color }}
                />
                <div className="text-center px-4">
                  <div className="text-5xl mb-2">
                    {film.genre === "Thriller"
                      ? "🎯"
                      : film.genre === "Drama"
                      ? "🌙"
                      : "⚡"}
                  </div>
                  <div
                    className="font-syne font-bold text-xl"
                    style={{ color: film.accentColor }}
                  >
                    {film.title}
                  </div>
                  <div className="mt-1">
                    <Badge color={film.color}>{film.genre}</Badge>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <p
                  className="text-sm mb-4 leading-relaxed"
                  style={{ color: "#64748b" }}
                >
                  {film.synopsis.slice(0, 100)}...
                </p>
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <div className="font-bold">
                      {formatNaira(film.totalRevenue)}
                    </div>
                    <div className="text-xs" style={{ color: "#475569" }}>
                      Box Office
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{film.cinemaCount} cinemas</div>
                    <div className="text-xs" style={{ color: "#475569" }}>
                      Nationwide
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="py-20" style={{ background: "#040810" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <div
              className="text-xs font-medium mb-3"
              style={{ color: "#2A9D8F", letterSpacing: "0.1em" }}
            >
              PROCESS
            </div>
            <h2 className="font-syne font-bold text-3xl">How It Works</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {STEPS.map((s, i) => (
              <div key={s.n} className="relative">
                {i < STEPS.length - 1 && (
                  <div
                    className="hidden md:block absolute top-6 left-full w-full h-px z-0"
                    style={{
                      background:
                        "linear-gradient(90deg, #E63946, transparent)",
                    }}
                  />
                )}
                <div
                  className="rounded-xl p-6 relative z-10"
                  style={{ background: "#0a0f1a", border: "1px solid #1e293b" }}
                >
                  <div
                    className="text-3xl font-black mb-3 opacity-20 font-syne"
                    style={{ color: "#E63946" }}
                  >
                    {s.n}
                  </div>
                  <h3 className="font-bold mb-2">{s.t}</h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "#475569" }}
                  >
                    {s.d}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-20 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, #E6394611, transparent 70%)",
          }}
        />
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <h2 className="font-syne font-bold text-4xl">
            Ready to distribute your film?
          </h2>
          <p className="mt-4 text-lg" style={{ color: "#64748b" }}>
            Join Nigeria&apos;s leading film distribution platform and reach
            audiences nationwide.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <button
              onClick={() => onEnter("producer")}
              className="px-8 py-4 rounded-xl font-semibold text-white hover:opacity-90 transition-opacity"
              style={{ background: "linear-gradient(135deg, #E63946, #c0313d)" }}
            >
              Get Started — It&apos;s Free
            </button>
            <button
              onClick={() => onEnter("cinema")}
              className="px-8 py-4 rounded-xl font-semibold hover:border-white/30 transition-colors"
              style={{ border: "1px solid #1e293b", color: "#94a3b8" }}
            >
              I&apos;m a Cinema Partner
            </button>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ borderTop: "1px solid #0f172a", background: "#020408" }}>
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-wrap items-center justify-between gap-4">
          <div className="font-syne font-bold text-sm">
            NILE <span style={{ color: "#E63946" }}>DISTRIBUTION</span> PLATFORM
          </div>
          <div className="text-xs" style={{ color: "#334155" }}>
            © 2024 Nile Entertainment Group. All rights reserved.
          </div>
          <div className="flex gap-4 text-xs" style={{ color: "#334155" }}>
            {["Privacy", "Terms", "Contact"].map((l) => (
              <a key={l} href="#" className="hover:text-white transition-colors">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Demo access buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-2 z-50">
        <div
          className="text-xs text-right mb-1"
          style={{ color: "#475569" }}
        >
          Demo Access
        </div>
        {(
          [
            ["producer", "#E63946", "🎬 Producer"],
            ["cinema", "#F4A261", "🏢 Cinema"],
            ["admin", "#2A9D8F", "⚙️ Admin"],
          ] as [UserRole, string, string][]
        ).map(([role, color, label]) => (
          <button
            key={role}
            onClick={() => onEnter(role)}
            className="px-4 py-2 rounded-lg text-sm font-medium text-white hover:opacity-90 text-right transition-opacity"
            style={{ background: color }}
          >
            {label} Dashboard
          </button>
        ))}
      </div>
    </div>
  );
}
