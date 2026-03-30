"use client";
import { useState, useEffect, useRef } from "react";

// ─── FILM DATA ────────────────────────────────────────────────────────────────
const FILMS = [
  {
    id: 1,
    title: "OMO GHETTO: THE SAGA",
    genre: "Action Comedy",
    director: "Funke Akindele & JJC Skillz",
    cast: ["Funke Akindele", "Ayo Makun", "Chioma Chukwuka Akpotha", "Yemi Alade", "Naira Marley"],
    duration: "148 min",
    language: "English / Yoruba",
    releaseDate: "2020-12-25",
    releaseType: "Nationwide",
    status: "completed",
    cinemaCount: 12,
    color: "#E63946",
    accentColor: "#FF6B6B",
    gbo: 1100000000,
    admissions: 201604,
    synopsis: "Twin sisters — Lefty, a street-smart gang leader, and Ayomide, a refined professional — are reunited when their worlds dramatically collide, bringing chaos, laughter, and family revelations.",
    weeklyData: [180000000, 210000000, 195000000, 170000000, 140000000, 120000000, 85000000],
    cities: { Lagos: 890, Abuja: 620, "Port Harcourt": 380, Enugu: 210, Ibadan: 280, Accra: 150 },
    producer: "Funke Akindele Network",
  },
  {
    id: 2,
    title: "BEHIND THE SCENES",
    genre: "Drama",
    director: "Funke Akindele & Tunde Olaoye",
    cast: ["Scarlet Gomez", "Funke Akindele", "Iyabo Ojo", "Destiny Etiko", "Tobi Bakre", "Uche Montana"],
    duration: "130 min",
    language: "English / Yoruba",
    releaseDate: "2025-12-12",
    releaseType: "Nationwide",
    status: "active",
    cinemaCount: 14,
    color: "#2A9D8F",
    accentColor: "#48CAE4",
    gbo: 2100000000,
    admissions: 401604,
    synopsis: "Aderonke 'Ronky-Fella' Faniran is a successful real estate mogul whose generosity becomes her greatest burden — as family, friends and associates drain her resources, she must confront the true cost of unchecked kindness.",
    weeklyData: [200000000, 310000000, 380000000, 340000000, 290000000, 260000000, 320000000],
    cities: { Lagos: 1400, Abuja: 980, "Port Harcourt": 520, Accra: 420, Enugu: 310, Ibadan: 290 },
    producer: "Funke Akindele Network",
  },
  {
    id: 3,
    title: "EVERYBODY LOVES JENIFA",
    genre: "Comedy Drama",
    director: "Funke Akindele & Tunde Olaoye",
    cast: ["Funke Akindele", "Patience Ozokwor", "Nancy Isime", "Stan Nze", "Jackie Appiah", "Falz"],
    duration: "120 min",
    language: "English / Yoruba",
    releaseDate: "2024-12-13",
    releaseType: "Nationwide",
    status: "active",
    cinemaCount: 11,
    color: "#F4A261",
    accentColor: "#FFBA49",
    gbo: 1800000000,
    admissions: 251604,
    synopsis: "Jenifa's popularity fades when a shady new neighbour, Lobster, outshines her charity work. A Ghana trip turns dangerous when she and her crew accidentally become entangled with a deadly drug baron.",
    weeklyData: [206000000, 280000000, 320000000, 295000000, 270000000, 240000000, 189000000],
    cities: { Lagos: 1100, Abuja: 780, "Port Harcourt": 430, Accra: 310, Ibadan: 260, Calabar: 180 },
    producer: "Funke Akindele Network",
  },
];

const CINEMAS = [
  { id: 1, name: "Nile Cinemas Ikota", city: "Lagos", screens: 8, capacity: 1200, status: "active", revenue: 285000000 },
  { id: 2, name: "Viva Cinemas Ikeja", city: "Lagos", screens: 6, capacity: 900, status: "active", revenue: 214000000 },
  { id: 3, name: "Genesis Cinemas Lekki", city: "Lagos", screens: 5, capacity: 750, status: "active", revenue: 168000000 },
  { id: 4, name: "Silverbird Cinemas Abuja", city: "Abuja", screens: 7, capacity: 1050, status: "active", revenue: 244000000 },
  { id: 5, name: "Kada Cinemas Abuja", city: "Abuja", screens: 4, capacity: 600, status: "active", revenue: 142000000 },
  { id: 6, name: "Genesis Cinemas PH", city: "Port Harcourt", screens: 5, capacity: 750, status: "active", revenue: 127000000 },
  { id: 7, name: "Filmhouse Enugu", city: "Enugu", screens: 3, capacity: 450, status: "active", revenue: 78000000 },
  { id: 8, name: "Odeon Ibadan", city: "Ibadan", screens: 4, capacity: 600, status: "active", revenue: 91000000 },
  { id: 9, name: "Rex Cinemas Benin", city: "Benin", screens: 3, capacity: 400, status: "maintenance", revenue: 42000000 },
  { id: 10, name: "Miramax Calabar", city: "Calabar", screens: 2, capacity: 300, status: "active", revenue: 38000000 },
];

const USERS = {
  producer: { name: "Funke Akindele", role: "producer", avatar: "FA" },
  cinema: { name: "Amina Bello", role: "cinema", avatar: "AB" },
  admin: { name: "Moses Babatope", role: "admin", avatar: "MB" },
};

const NOTIFICATIONS = [
  { id: 1, type: "success", text: "BEHIND THE SCENES: ₦2.1B — Nollywood record!", time: "1h ago" },
  { id: 2, type: "success", text: "EVERYBODY LOVES JENIFA crossed 250,000 admissions", time: "3h ago" },
  { id: 3, type: "info", text: "OMO GHETTO: THE SAGA final settlement ready", time: "1d ago" },
  { id: 4, type: "warning", text: "Rex Cinemas Benin in maintenance — 6 shows rescheduled", time: "2d ago" },
];

const ROLE_COLORS = { producer: "#E63946", cinema: "#F4A261", admin: "#2A9D8F" };

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const fmtN = (n) => `₦${(n / 1000000).toFixed(0)}M`;
const fmtNB = (n) => n >= 1000000000 ? `₦${(n / 1000000000).toFixed(2)}B` : `₦${(n / 1000000).toFixed(0)}M`;
const fmtNum = (n) => n.toLocaleString();
const GENRE_ICONS = { "Action Comedy": "⚡", Drama: "🎭", "Comedy Drama": "🌟" };

// ─── UI PRIMITIVES ────────────────────────────────────────────────────────────
function Badge({ children, color = "#3b82f6" }) {
  return <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: `${color}22`, color }}>{children}</span>;
}
function MiniBar({ value, max, color }) {
  return (
    <div className="w-full h-1.5 rounded-full" style={{ background: "#ffffff10" }}>
      <div className="h-full rounded-full" style={{ width: `${Math.min((value / max) * 100, 100)}%`, background: color }} />
    </div>
  );
}
function SimpleChart({ data, color, height = 50 }) {
  const max = Math.max(...data);
  return (
    <div className="flex items-end gap-0.5" style={{ height }}>
      {data.map((v, i) => (
        <div key={i} className="flex-1 rounded-t" style={{ height: `${(v / max) * 100}%`, background: `${color}${i === data.length - 1 ? "ff" : "55"}` }} />
      ))}
    </div>
  );
}
function StatCard({ label, value, sub, color, icon }) {
  return (
    <div className="rounded-xl p-4 relative overflow-hidden" style={{ background: "#0f172a", border: "1px solid #1e293b" }}>
      <div className="flex items-start justify-between mb-3">
        <div className="text-xl">{icon}</div>
        <div className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${color}22`, color }}>{sub}</div>
      </div>
      <div className="text-xl font-bold mb-1" style={{ color }}>{value}</div>
      <div className="text-xs" style={{ color: "#64748b" }}>{label}</div>
      <div className="absolute bottom-0 right-0 w-12 h-12 rounded-tl-full opacity-5" style={{ background: color }} />
    </div>
  );
}
function FilmCard({ film, size = "md" }) {
  const sizes = { sm: "w-12 h-16 text-xs", md: "w-16 h-22", lg: "w-24 h-32" };
  return (
    <div className={`${sizes[size]} rounded-lg flex flex-col items-center justify-center relative overflow-hidden flex-shrink-0`}
      style={{ background: `linear-gradient(135deg, ${film.color}22, ${film.color}55)`, border: `1px solid ${film.color}44`, minWidth: size === "sm" ? "48px" : "64px", minHeight: size === "sm" ? "64px" : "88px" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: film.color }} />
      <div style={{ fontSize: "1.4rem" }}>{GENRE_ICONS[film.genre] || "🎬"}</div>
      <div style={{ fontSize: "7px", fontWeight: 700, color: film.accentColor, textAlign: "center", padding: "2px 4px", lineHeight: 1.2 }}>{film.title.split(":")[0]}</div>
    </div>
  );
}
function LiveTicker({ films }) {
  const [idx, setIdx] = useState(0);
  const cities = ["Lagos", "Abuja", "Port Harcourt", "Accra", "Ibadan"];
  useEffect(() => { const t = setInterval(() => setIdx(i => (i + 1) % (films.length * cities.length)), 2500); return () => clearInterval(t); }, []);
  const film = films[idx % films.length];
  const city = cities[Math.floor(idx / films.length) % cities.length];
  const tickets = Math.floor(Math.random() * 80) + 10;
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs" style={{ background: "#0f172a", border: "1px solid #1e293b" }}>
      <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#22c55e", animation: "pulse 2s infinite" }} />
      <span style={{ color: "#64748b" }}>LIVE</span>
      <span style={{ color: film.accentColor }}>{film.title.split(":")[0]}</span>
      <span style={{ color: "#64748b" }}>—</span>
      <span className="text-white">{tickets} tickets</span>
      <span style={{ color: "#64748b" }}>in {city}</span>
    </div>
  );
}

// ─── NILE LOGO ────────────────────────────────────────────────────────────────
function NileLogo({ size = "md" }) {
  const s = size === "sm" ? 28 : size === "md" ? 36 : 48;
  return (
    <div className="flex items-center gap-2">
      <div style={{ width: s, height: s, background: "linear-gradient(135deg, #E63946 0%, #c0313d 50%, #8B0000 100%)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <svg width={s * 0.65} height={s * 0.65} viewBox="0 0 24 24" fill="none">
          <path d="M3 20 Q8 4 12 12 Q16 20 21 4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <circle cx="12" cy="20" r="2" fill="white" />
        </svg>
      </div>
      {size !== "icon" && (
        <div>
          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: size === "sm" ? "0.85rem" : "1rem", lineHeight: 1, color: "white", letterSpacing: "0.02em" }}>
            NILE
          </div>
          <div style={{ fontSize: "9px", color: "#64748b", letterSpacing: "0.08em", fontWeight: 600 }}>DISTRIBUTION PLATFORM</div>
        </div>
      )}
    </div>
  );
}

// ─── LANDING PAGE ─────────────────────────────────────────────────────────────
function LandingPage({ onEnter }) {
  const steps = [
    { n: "01", t: "Submit Your Film", d: "Upload film details, poster, trailer and press kit through our secure producer portal." },
    { n: "02", t: "Nile Admin Reviews", d: "Our distribution team reviews your submission, approves the release plan and assigns territories." },
    { n: "03", t: "Cinemas Confirm", d: "Partner cinemas receive the distribution request and confirm showtimes, screens and ticket prices." },
    { n: "04", t: "Release & Track", d: "Your film goes live nationwide. Track real-time box office, admissions and revenue from your dashboard." },
  ];

  return (
    <div style={{ background: "#020408", color: "#e2e8f0", fontFamily: "'DM Sans', system-ui, sans-serif", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Syne:wght@700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 4px; }
        .grad-text { background: linear-gradient(135deg, #E63946, #F4A261, #2A9D8F); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .hover-up { transition: transform 0.2s; } .hover-up:hover { transform: translateY(-3px); }
        .grid-bg { background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px); background-size: 40px 40px; }
        @keyframes pulse { 0%,100%{opacity:1}50%{opacity:0.4} }
      `}</style>

      {/* NAV */}
      <nav style={{ borderBottom: "1px solid #0a0f1a", background: "#02040899", backdropFilter: "blur(12px)" }} className="sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <NileLogo size="md" />
          <div className="hidden md:flex items-center gap-6 text-sm" style={{ color: "#64748b" }}>
            {["How It Works", "For Producers", "For Cinemas", "Network"].map(l => (
              <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => onEnter("producer")} className="text-sm px-4 py-2 rounded-lg" style={{ color: "#94a3b8", border: "1px solid #1e293b" }}>Sign In</button>
            <button onClick={() => onEnter("producer")} className="text-sm px-4 py-2 rounded-lg font-medium text-white hover:opacity-90" style={{ background: "linear-gradient(135deg, #E63946, #c0313d)" }}>
              Submit Your Film →
            </button>
          </div>
        </div>
      </nav>

      {/* HERO BANNER */}
      <div className="relative overflow-hidden grid-bg" style={{ minHeight: "85vh", display: "flex", alignItems: "center" }}>
        <div style={{ position: "absolute", top: "-100px", right: "-100px", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(230,57,70,0.12), transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-100px", left: "-50px", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(42,157,143,0.08), transparent 70%)", pointerEvents: "none" }} />
        <div className="max-w-6xl mx-auto px-6 py-20 w-full relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-6">
                <LiveTicker films={FILMS} />
              </div>
              <div className="mb-3" style={{ fontSize: "12px", color: "#E63946", letterSpacing: "0.12em", fontWeight: 600 }}>NILE MEDIA ENTERTAINMENT GROUP</div>
              <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(2.2rem, 5vw, 4rem)", lineHeight: 1.05, marginBottom: "1.5rem" }}>
                The Operating System<br />
                <span className="grad-text">for Film Distribution</span><br />
                in Africa
              </h1>
              <p className="text-lg mb-10" style={{ color: "#64748b", maxWidth: "500px" }}>
                Submit, distribute and track your film's performance across Nigeria and West Africa — from one powerful dashboard.
              </p>
              <div className="flex flex-wrap gap-4">
                <button onClick={() => onEnter("producer")} className="px-7 py-3.5 rounded-xl font-semibold text-white hover:opacity-90" style={{ background: "linear-gradient(135deg, #E63946, #c0313d)", boxShadow: "0 0 40px #E6394444" }}>
                  Submit Your Film →
                </button>
                <button onClick={() => onEnter("admin")} className="px-7 py-3.5 rounded-xl font-semibold hover:border-white/30 transition-all" style={{ border: "1px solid #1e293b", color: "#94a3b8" }}>
                  View Demo Dashboard
                </button>
              </div>
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-12">
                {[["₦5B+", "Total GBO Tracked"], ["3", "Funke Akindele Films"], ["26", "Cinema Partners"], ["850K+", "Admissions Tracked"]].map(([v, l]) => (
                  <div key={l} className="rounded-xl p-3" style={{ background: "#0a0f1a", border: "1px solid #1e293b" }}>
                    <div className="font-bold text-lg" style={{ fontFamily: "'Syne', sans-serif" }}>{v}</div>
                    <div className="text-xs mt-0.5" style={{ color: "#475569" }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Film posters */}
            <div className="flex-shrink-0 relative" style={{ width: "320px" }}>
              {FILMS.map((film, i) => (
                <div key={film.id} className="hover-up" style={{ position: "absolute", top: `${i * 70}px`, left: `${i * 20}px`, zIndex: 3 - i }}>
                  <div className="rounded-2xl overflow-hidden" style={{ width: "220px", background: `linear-gradient(135deg, ${film.color}18, ${film.color}44)`, border: `1px solid ${film.color}55`, boxShadow: `0 20px 40px ${film.color}22` }}>
                    <div style={{ height: "4px", background: film.color }} />
                    <div className="p-4">
                      <div className="text-3xl mb-2">{GENRE_ICONS[film.genre]}</div>
                      <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "0.85rem", color: film.accentColor, lineHeight: 1.2 }}>{film.title}</div>
                      <div className="text-xs mt-1" style={{ color: "#64748b" }}>{film.director.split("&")[0].trim()}</div>
                      <div className="mt-3 pt-3 flex justify-between text-xs" style={{ borderTop: `1px solid ${film.color}22` }}>
                        <span style={{ color: film.accentColor, fontWeight: 700 }}>{fmtNB(film.gbo)}</span>
                        <span style={{ color: "#475569" }}>{fmtNum(film.admissions)} admissions</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div style={{ height: "280px" }} />
            </div>
          </div>
        </div>
      </div>

      {/* FEATURED FILMS */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="mb-10">
          <div className="text-xs font-semibold mb-2" style={{ color: "#E63946", letterSpacing: "0.1em" }}>FEATURED PRODUCER</div>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold" style={{ background: "linear-gradient(135deg, #E63946, #F4A261)", color: "white" }}>FA</div>
            <div>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.8rem", fontWeight: 800 }}>Funke Akindele</h2>
              <p className="text-sm" style={{ color: "#64748b" }}>Nigeria's highest-grossing filmmaker · 4× Nollywood Box Office Records</p>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {FILMS.map(film => (
            <div key={film.id} className="rounded-2xl overflow-hidden hover-up" style={{ background: "#0a0f1a", border: `1px solid ${film.color}33` }}>
              <div className="h-52 flex items-center justify-center relative" style={{ background: `linear-gradient(160deg, ${film.color}11, ${film.color}44)` }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: film.color }} />
                <div className="text-center px-4">
                  <div className="text-5xl mb-3">{GENRE_ICONS[film.genre]}</div>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.1rem", color: film.accentColor, lineHeight: 1.2 }}>{film.title}</div>
                  <div className="mt-2 flex flex-wrap justify-center gap-1">
                    <Badge color={film.color}>{film.genre}</Badge>
                    <Badge color={film.status === "active" ? "#22c55e" : "#a78bfa"}>{film.status === "completed" ? "Completed Run" : "Now Showing"}</Badge>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <p className="text-xs mb-4 leading-relaxed" style={{ color: "#64748b" }}>{film.synopsis.slice(0, 110)}...</p>
                <div className="rounded-lg p-3 mb-3" style={{ background: "#0f172a" }}>
                  <div className="flex justify-between text-xs mb-1" style={{ color: "#475569" }}><span>Gross Box Office</span><span>Admissions</span></div>
                  <div className="flex justify-between">
                    <span className="font-bold text-sm" style={{ color: film.accentColor }}>{fmtNB(film.gbo)}</span>
                    <span className="font-bold text-sm text-white">{fmtNum(film.admissions)}</span>
                  </div>
                </div>
                <div className="text-xs" style={{ color: "#334155" }}>Dir. {film.director} · {film.cinemaCount} cinemas · {film.releaseDate}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="py-20" style={{ background: "#040810" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="text-xs font-semibold mb-3" style={{ color: "#2A9D8F", letterSpacing: "0.1em" }}>PROCESS</div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "2rem", fontWeight: 800 }}>How It Works</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-5">
            {steps.map((s, i) => (
              <div key={i} className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-full w-full h-px z-0" style={{ background: "linear-gradient(90deg, #E63946, transparent)" }} />
                )}
                <div className="rounded-xl p-5 relative z-10" style={{ background: "#0a0f1a", border: "1px solid #1e293b" }}>
                  <div className="text-3xl font-black mb-3 opacity-20" style={{ fontFamily: "'Syne', sans-serif", color: "#E63946" }}>{s.n}</div>
                  <h3 className="font-bold text-sm mb-2">{s.t}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "#475569" }}>{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ borderTop: "1px solid #0a0f1a" }}>
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-wrap items-center justify-between gap-4">
          <NileLogo size="sm" />
          <div className="text-xs" style={{ color: "#334155" }}>© 2025 Nile Media Entertainment Group. All rights reserved.</div>
          <div className="flex gap-4 text-xs" style={{ color: "#334155" }}>
            {["Privacy", "Terms", "Contact"].map(l => <a key={l} href="#" className="hover:text-white">{l}</a>)}
          </div>
        </div>
      </div>

      {/* Demo access */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-2 z-50">
        <div className="text-xs text-right mb-1" style={{ color: "#475569" }}>Demo Access</div>
        {[["producer", "#E63946", "🎬 Producer"], ["cinema", "#F4A261", "🏢 Cinema"], ["admin", "#2A9D8F", "⚙️ Admin"]].map(([role, color, label]) => (
          <button key={role} onClick={() => onEnter(role)} className="px-4 py-2 rounded-lg text-sm font-medium text-white hover:opacity-90" style={{ background: color }}>
            {label} Dashboard
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── SIDEBAR ──────────────────────────────────────────────────────────────────
function Sidebar({ role, active, setActive, user, onLogout }) {
  const menus = {
    producer: [
      { id: "overview", icon: "◈", label: "Overview" },
      { id: "films", icon: "🎬", label: "My Films" },
      { id: "submit", icon: "+", label: "Submit Film" },
      { id: "analytics", icon: "◉", label: "Analytics" },
      { id: "finance", icon: "₦", label: "Finance" },
      { id: "marketing", icon: "◎", label: "Marketing" },
      { id: "chat", icon: "◷", label: "Messages" },
    ],
    cinema: [
      { id: "overview", icon: "◈", label: "Overview" },
      { id: "requests", icon: "📥", label: "Film Requests" },
      { id: "schedule", icon: "◷", label: "Showtimes" },
      { id: "sales", icon: "₦", label: "Sales Report" },
      { id: "chat", icon: "◎", label: "Messages" },
    ],
    admin: [
      { id: "overview", icon: "◈", label: "Master Control" },
      { id: "films", icon: "🎬", label: "All Films" },
      { id: "cinemas", icon: "🏢", label: "Cinema Network" },
      { id: "analytics", icon: "◉", label: "Box Office" },
      { id: "reports", icon: "📄", label: "Reports" },
      { id: "chat", icon: "◷", label: "Support Chat" },
    ],
  };
  const color = ROLE_COLORS[role];
  const items = menus[role] || menus.producer;

  return (
    <div className="flex flex-col h-full" style={{ background: "#050b14", borderRight: "1px solid #0a0f1a", width: "220px", flexShrink: 0 }}>
      <div className="p-4" style={{ borderBottom: "1px solid #0a0f1a" }}>
        <NileLogo size="sm" />
      </div>
      <div className="p-3 flex-1 overflow-y-auto">
        {items.map(item => (
          <button key={item.id} onClick={() => setActive(item.id)} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm mb-0.5 text-left transition-all"
            style={{ background: active === item.id ? `${color}18` : "transparent", color: active === item.id ? color : "#475569", borderLeft: active === item.id ? `2px solid ${color}` : "2px solid transparent" }}>
            <span className="w-5 text-center flex-shrink-0">{item.icon}</span>
            <span className={active === item.id ? "font-medium" : ""}>{item.label}</span>
          </button>
        ))}
      </div>
      <div className="p-3" style={{ borderTop: "1px solid #0a0f1a" }}>
        <div className="flex items-center gap-2 p-2 rounded-lg mb-2" style={{ background: "#0a0f1a" }}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: `${color}33`, color, border: `1px solid ${color}44` }}>{user.avatar}</div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium truncate">{user.name}</div>
            <div className="text-xs capitalize" style={{ color: "#475569" }}>{user.role}</div>
          </div>
        </div>
        <button onClick={onLogout} className="w-full text-xs py-1.5 rounded-lg" style={{ color: "#475569", border: "1px solid #0a0f1a" }}>← Sign Out</button>
      </div>
    </div>
  );
}

// ─── TOP BAR ──────────────────────────────────────────────────────────────────
function TopBar({ title, role }) {
  const color = ROLE_COLORS[role];
  return (
    <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid #0a0f1a", background: "#050b14" }}>
      <h1 className="font-semibold text-white text-sm">{title}</h1>
      <div className="flex items-center gap-3">
        <LiveTicker films={FILMS} />
        <div className="relative">
          <button className="w-9 h-9 rounded-lg flex items-center justify-center text-base" style={{ background: "#0a0f1a", border: "1px solid #1e293b" }}>🔔</button>
          <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-white flex items-center justify-center" style={{ background: color, fontSize: "9px" }}>4</div>
        </div>
      </div>
    </div>
  );
}

// ─── SUBMIT A FILM PAGE ───────────────────────────────────────────────────────
function SubmitFilm() {
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ title: "", genre: "Action Comedy", language: "English / Yoruba", duration: "", director: "", cast: "", synopsis: "", releaseDate: "", budget: "", website: "" });
  const [selectedCities, setSelectedCities] = useState([]);
  const [releaseType, setReleaseType] = useState("Nationwide");
  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const cities = ["Lagos", "Abuja", "Port Harcourt", "Enugu", "Ibadan", "Benin", "Calabar", "Accra", "Kumasi"];
  const toggleCity = (c) => setSelectedCities(s => s.includes(c) ? s.filter(x => x !== c) : [...s, c]);
  const inp = { background: "#0a0f1a", border: "1px solid #1e293b", borderRadius: "8px", color: "white", padding: "10px 12px", fontSize: "14px", width: "100%", outline: "none" };
  const lbl = { color: "#64748b", fontSize: "12px", marginBottom: "6px", display: "block" };

  if (done) return (
    <div className="p-6 flex items-center justify-center" style={{ minHeight: "500px" }}>
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl" style={{ background: "#22c55e22" }}>✓</div>
        <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>{form.title || "Your Film"} Submitted!</h2>
        <p className="mb-6 text-sm" style={{ color: "#64748b" }}>Your film has been submitted for distribution review. Our team will respond within 48 hours with a distribution plan.</p>
        <div className="rounded-xl p-4 text-left mb-6" style={{ background: "#0a0f1a", border: "1px solid #1e293b" }}>
          <div className="text-xs font-medium mb-3" style={{ color: "#2A9D8F" }}>WHAT HAPPENS NEXT</div>
          {["Nile admin team reviews your submission (24–48h)", "Distribution plan prepared & sent to you", "Cinema network notified of upcoming release", "Showtimes confirmed & film goes live", "Real-time box office tracking begins"].map((s, i) => (
            <div key={i} className="flex items-start gap-2 mb-2 text-xs" style={{ color: "#64748b" }}>
              <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs" style={{ background: "#2A9D8F22", color: "#2A9D8F" }}>{i + 1}</div>
              {s}
            </div>
          ))}
        </div>
        <button onClick={() => { setDone(false); setStep(1); }} className="px-6 py-2 rounded-lg text-sm font-medium text-white" style={{ background: "#E63946" }}>Submit Another Film</button>
      </div>
    </div>
  );

  const STEPS = ["Film Details", "Cast & Crew", "Upload Assets", "Distribution Plan"];

  return (
    <div className="p-6 max-w-2xl">
      <div className="mb-2 text-sm" style={{ color: "#64748b" }}>Fill in your film details to begin the distribution process with Nile.</div>
      {/* Step indicators */}
      <div className="flex items-center gap-3 mb-8 mt-4">
        {STEPS.map((label, i) => {
          const s = i + 1;
          return (
            <div key={s} className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                style={{ background: step >= s ? "#E63946" : "#0a0f1a", color: step >= s ? "white" : "#475569", border: step >= s ? "none" : "1px solid #1e293b" }}>{s}</div>
              <span className="text-xs hidden md:block" style={{ color: step === s ? "white" : "#334155" }}>{label}</span>
              {s < STEPS.length && <div className="w-6 h-px hidden md:block" style={{ background: "#1e293b" }} />}
            </div>
          );
        })}
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><label style={lbl}>Film Title *</label><input style={inp} placeholder="e.g. BEHIND THE SCENES" value={form.title} onChange={e => update("title", e.target.value)} /></div>
            <div><label style={lbl}>Genre *</label><select style={inp} value={form.genre} onChange={e => update("genre", e.target.value)}>{["Action Comedy","Drama","Comedy Drama","Thriller","Action","Romance","Horror","Documentary"].map(g => <option key={g}>{g}</option>)}</select></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label style={lbl}>Language</label><select style={inp} value={form.language} onChange={e => update("language", e.target.value)}>{["English","Yoruba","Igbo","Hausa","English / Yoruba","English / Igbo","French"].map(l => <option key={l}>{l}</option>)}</select></div>
            <div><label style={lbl}>Duration</label><input style={inp} placeholder="e.g. 118 min" value={form.duration} onChange={e => update("duration", e.target.value)} /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label style={lbl}>Desired Release Date *</label><input type="date" style={inp} value={form.releaseDate} onChange={e => update("releaseDate", e.target.value)} /></div>
            <div><label style={lbl}>Production Budget (₦)</label><input style={inp} placeholder="e.g. 150,000,000" value={form.budget} onChange={e => update("budget", e.target.value)} /></div>
          </div>
          <div><label style={lbl}>Synopsis *</label><textarea style={{ ...inp, height: "90px", resize: "vertical" }} placeholder="Brief description of your film's story..." value={form.synopsis} onChange={e => update("synopsis", e.target.value)} /></div>
          <div><label style={lbl}>Film Website / Social Media</label><input style={inp} placeholder="https://..." value={form.website} onChange={e => update("website", e.target.value)} /></div>
          <button onClick={() => setStep(2)} className="px-6 py-2.5 rounded-xl text-sm font-medium text-white hover:opacity-90" style={{ background: "#E63946" }}>Next: Cast & Crew →</button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <div><label style={lbl}>Director(s) *</label><input style={inp} placeholder="e.g. Funke Akindele" value={form.director} onChange={e => update("director", e.target.value)} /></div>
          <div><label style={lbl}>Lead Cast (comma-separated)</label><textarea style={{ ...inp, height: "80px", resize: "vertical" }} placeholder="e.g. Funke Akindele, Iyabo Ojo, Tobi Bakre..." value={form.cast} onChange={e => update("cast", e.target.value)} /></div>
          <div className="rounded-xl p-4" style={{ background: "#0a0f1a", border: "1px solid #1e293b" }}>
            <div className="text-xs font-medium mb-3" style={{ color: "#64748b" }}>PRODUCTION COMPANY</div>
            <div className="grid grid-cols-2 gap-3">
              <div><label style={lbl}>Production Company</label><input style={inp} placeholder="e.g. Funke Akindele Network" /></div>
              <div><label style={lbl}>Country of Origin</label><select style={inp}><option>Nigeria</option><option>Ghana</option><option>Kenya</option><option>South Africa</option></select></div>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setStep(1)} className="px-5 py-2.5 rounded-xl text-sm" style={{ border: "1px solid #1e293b", color: "#64748b" }}>← Back</button>
            <button onClick={() => setStep(3)} className="px-6 py-2.5 rounded-xl text-sm font-medium text-white hover:opacity-90" style={{ background: "#E63946" }}>Next: Upload Assets →</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          {[["Film Poster", "JPG, PNG — 1000×1500px recommended", "🖼", "Required for distribution"],["Trailer", "MP4, MOV — Max 500MB, 1080p", "🎬", "Minimum 90-second theatrical trailer"],["Press Kit", "PDF or ZIP — EPK with stills and bio", "📦", "Recommended for press coverage"],["Film Certificate", "NFVCB classification certificate", "📋", "Required for Nigeria release"]].map(([label, hint, icon, note]) => (
            <div key={label} className="rounded-xl p-5 cursor-pointer hover:border-white/20 transition-all" style={{ border: "2px dashed #1e293b", background: "#0a0f1a" }}>
              <div className="flex items-center gap-3">
                <div className="text-2xl">{icon}</div>
                <div className="flex-1">
                  <div className="font-medium text-sm">{label}</div>
                  <div className="text-xs" style={{ color: "#475569" }}>{hint}</div>
                  <div className="text-xs mt-0.5" style={{ color: "#334155" }}>{note}</div>
                </div>
                <div className="px-3 py-1.5 rounded-lg text-xs" style={{ background: "#1e293b", color: "#94a3b8" }}>Choose File</div>
              </div>
            </div>
          ))}
          <div className="flex gap-3">
            <button onClick={() => setStep(2)} className="px-5 py-2.5 rounded-xl text-sm" style={{ border: "1px solid #1e293b", color: "#64748b" }}>← Back</button>
            <button onClick={() => setStep(4)} className="px-6 py-2.5 rounded-xl text-sm font-medium text-white hover:opacity-90" style={{ background: "#E63946" }}>Next: Distribution Plan →</button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-4">
          <div>
            <label style={lbl}>Release Type</label>
            <div className="flex gap-3 flex-wrap">
              {["Nationwide", "Limited", "Exclusive Premiere", "Festival Circuit"].map(t => (
                <button key={t} onClick={() => setReleaseType(t)} className="px-4 py-2 rounded-lg text-xs transition-all"
                  style={{ background: releaseType === t ? "#E6394622" : "#0a0f1a", border: `1px solid ${releaseType === t ? "#E63946" : "#1e293b"}`, color: releaseType === t ? "#E63946" : "#94a3b8" }}>{t}</button>
              ))}
            </div>
          </div>
          <div>
            <label style={lbl}>Select Cities / Markets</label>
            <div className="grid grid-cols-3 gap-2">
              {cities.map(city => (
                <div key={city} onClick={() => toggleCity(city)} className="flex items-center gap-2 p-2.5 rounded-lg cursor-pointer" style={{ border: `1px solid ${selectedCities.includes(city) ? "#E63946" : "#1e293b"}`, background: selectedCities.includes(city) ? "#E6394611" : "#0a0f1a" }}>
                  <div className="w-3.5 h-3.5 rounded flex items-center justify-center flex-shrink-0" style={{ background: selectedCities.includes(city) ? "#E63946" : "transparent", border: `1px solid ${selectedCities.includes(city) ? "#E63946" : "#334155"}` }}>
                    {selectedCities.includes(city) && <div className="text-white" style={{ fontSize: "8px" }}>✓</div>}
                  </div>
                  <span className="text-xs">{city}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl p-4" style={{ background: "#0a0f1a", border: "1px solid #1e293b" }}>
            <div className="text-xs font-medium mb-2" style={{ color: "#64748b" }}>DISTRIBUTION TERMS</div>
            <div className="space-y-2 text-xs" style={{ color: "#64748b" }}>
              <div className="flex justify-between"><span>Nile Distribution Fee</span><span className="font-medium" style={{ color: "#94a3b8" }}>15% of GBO</span></div>
              <div className="flex justify-between"><span>Cinema Share</span><span className="font-medium" style={{ color: "#94a3b8" }}>50% of GBO</span></div>
              <div className="flex justify-between"><span>Producer Share</span><span className="font-medium" style={{ color: "#22c55e" }}>35% of GBO</span></div>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setStep(3)} className="px-5 py-2.5 rounded-xl text-sm" style={{ border: "1px solid #1e293b", color: "#64748b" }}>← Back</button>
            <button onClick={() => setDone(true)} className="px-8 py-2.5 rounded-xl text-sm font-medium text-white hover:opacity-90" style={{ background: "linear-gradient(135deg, #E63946, #c0313d)" }}>
              Submit Film for Distribution →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── FINANCE TAB ──────────────────────────────────────────────────────────────
function FinanceView() {
  const completedFilm = FILMS[0]; // Omo Ghetto - completed run
  const gbo = completedFilm.gbo;
  const cinema = Math.round(gbo * 0.50);
  const producer = Math.round(gbo * 0.35);
  const distributor = Math.round(gbo * 0.15);
  const [activeFilm, setActiveFilm] = useState(0);

  const film = FILMS[activeFilm];
  const filmGbo = film.gbo;
  const filmCinema = Math.round(filmGbo * 0.50);
  const filmProducer = Math.round(filmGbo * 0.35);
  const filmDist = Math.round(filmGbo * 0.15);

  const weeks = ["Wk 1", "Wk 2", "Wk 3", "Wk 4", "Wk 5", "Wk 6", "Wk 7"];

  return (
    <div className="p-6 space-y-6">
      {/* Completed film banner */}
      <div className="rounded-xl p-5 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${completedFilm.color}11, ${completedFilm.color}33)`, border: `1px solid ${completedFilm.color}44` }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: completedFilm.color }} />
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <FilmCard film={completedFilm} size="md" />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="font-bold" style={{ fontFamily: "'Syne', sans-serif" }}>{completedFilm.title}</h2>
                <Badge color="#a78bfa">Cinema Run Completed</Badge>
              </div>
              <div className="text-sm" style={{ color: "#64748b" }}>Dir. {completedFilm.director} · {completedFilm.releaseDate}</div>
              <div className="flex items-center gap-4 mt-2 text-xs" style={{ color: "#64748b" }}>
                <span>🎬 {completedFilm.cinemaCount} cinemas</span>
                <span>🎟 {fmtNum(completedFilm.admissions)} admissions</span>
                <span>📅 7-week run</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold" style={{ fontFamily: "'Syne', sans-serif", color: completedFilm.accentColor }}>{fmtNB(gbo)}</div>
            <div className="text-xs" style={{ color: "#64748b" }}>Gross Box Office</div>
          </div>
        </div>
      </div>

      {/* Revenue split */}
      <div>
        <div className="text-sm font-medium mb-4">Revenue Distribution — Final Settlement</div>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { label: "Cinema Share", pct: 50, amount: cinema, color: "#3b82f6", icon: "🏢", desc: "Exhibition & operations" },
            { label: "Producer Share", pct: 35, amount: producer, color: "#22c55e", icon: "🎬", desc: "Funke Akindele Network" },
            { label: "Nile Distribution", pct: 15, amount: distributor, color: "#E63946", icon: "⚡", desc: "Distribution & marketing" },
          ].map(item => (
            <div key={item.label} className="rounded-xl p-5 relative overflow-hidden" style={{ background: "#0a0f1a", border: `1px solid ${item.color}44` }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: item.color }} />
              <div className="flex items-center justify-between mb-3">
                <div className="text-2xl">{item.icon}</div>
                <div className="text-3xl font-black opacity-10" style={{ fontFamily: "'Syne', sans-serif", color: item.color }}>{item.pct}%</div>
              </div>
              <div className="text-2xl font-bold mb-1" style={{ color: item.color }}>{fmtNB(item.amount)}</div>
              <div className="font-medium text-sm mb-0.5">{item.label}</div>
              <div className="text-xs" style={{ color: "#475569" }}>{item.desc}</div>
              <div className="mt-3">
                <div className="flex justify-between text-xs mb-1" style={{ color: "#475569" }}>
                  <span>{item.pct}% of {fmtNB(gbo)} GBO</span>
                  <span style={{ color: item.color }}>{item.pct}%</span>
                </div>
                <div className="w-full h-2 rounded-full" style={{ background: "#ffffff10" }}>
                  <div className="h-full rounded-full" style={{ width: `${item.pct}%`, background: item.color }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* GBO split visual */}
      <div className="rounded-xl p-5" style={{ background: "#0a0f1a", border: "1px solid #1e293b" }}>
        <div className="text-sm font-medium mb-4">Total GBO Breakdown</div>
        <div className="rounded-xl overflow-hidden mb-4" style={{ height: "32px" }}>
          <div className="flex h-full">
            <div className="flex items-center justify-center text-xs font-bold text-white" style={{ width: "50%", background: "#3b82f6" }}>Cinema 50%</div>
            <div className="flex items-center justify-center text-xs font-bold text-white" style={{ width: "35%", background: "#22c55e" }}>Producer 35%</div>
            <div className="flex items-center justify-center text-xs font-bold text-white" style={{ width: "15%", background: "#E63946" }}>Nile 15%</div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
          {[["Cinema", fmtNB(cinema), "#3b82f6"], ["Producer (You)", fmtNB(producer), "#22c55e"], ["Nile Dist.", fmtNB(distributor), "#E63946"]].map(([l, v, c]) => (
            <div key={l}><div className="font-bold text-lg" style={{ color: c }}>{v}</div><div className="text-xs" style={{ color: "#475569" }}>{l}</div></div>
          ))}
        </div>
      </div>

      {/* Weekly chart */}
      <div className="rounded-xl p-5" style={{ background: "#0a0f1a", border: "1px solid #1e293b" }}>
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-medium">Weekly Box Office — {completedFilm.title}</div>
          <Badge color={completedFilm.color}>{completedFilm.genre}</Badge>
        </div>
        <div className="flex items-end gap-2 mb-3" style={{ height: "100px" }}>
          {completedFilm.weeklyData.map((v, i) => {
            const max = Math.max(...completedFilm.weeklyData);
            const h = (v / max) * 100;
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="text-xs" style={{ color: completedFilm.accentColor, fontSize: "9px" }}>{fmtN(v)}</div>
                <div className="w-full rounded-t" style={{ height: `${h}%`, background: `${completedFilm.color}${i < 2 ? "ff" : "88"}` }} />
              </div>
            );
          })}
        </div>
        <div className="flex gap-2">
          {weeks.map(w => <div key={w} className="flex-1 text-center text-xs" style={{ color: "#334155" }}>{w}</div>)}
        </div>
      </div>

      {/* All films finance summary */}
      <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #1e293b" }}>
        <div className="px-5 py-3 text-sm font-medium" style={{ background: "#0a0f1a", borderBottom: "1px solid #1e293b" }}>All Films — Finance Summary</div>
        {FILMS.map(f => {
          const fProd = Math.round(f.gbo * 0.35);
          return (
            <div key={f.id} className="flex items-center gap-4 px-5 py-4 hover:bg-white/5" style={{ borderBottom: "1px solid #0a0f1a", background: "#050b14" }}>
              <FilmCard film={f} size="sm" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">{f.title.split(":")[0]}</span>
                  <Badge color={f.status === "completed" ? "#a78bfa" : "#22c55e"}>{f.status}</Badge>
                </div>
                <div className="text-xs" style={{ color: "#475569" }}>{fmtNum(f.admissions)} admissions · {f.cinemaCount} cinemas</div>
                <MiniBar value={f.gbo} max={2200000000} color={f.color} />
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-sm font-bold" style={{ color: f.accentColor }}>{fmtNB(f.gbo)}</div>
                <div className="text-xs" style={{ color: "#22c55e" }}>Your share: {fmtNB(fProd)}</div>
              </div>
            </div>
          );
        })}
        <div className="px-5 py-4 flex items-center justify-between" style={{ background: "#0a0f1a" }}>
          <div className="text-sm font-medium">TOTAL (All Films)</div>
          <div className="text-right">
            <div className="font-bold" style={{ color: "#E63946" }}>{fmtNB(FILMS.reduce((a, f) => a + f.gbo, 0))}</div>
            <div className="text-xs" style={{ color: "#22c55e" }}>Your total: {fmtNB(Math.round(FILMS.reduce((a, f) => a + f.gbo, 0) * 0.35))}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── PRODUCER OVERVIEW ────────────────────────────────────────────────────────
function ProducerOverview() {
  const [liveGbo, setLiveGbo] = useState(FILMS.reduce((a, f) => a + f.gbo, 0));
  const totalAdmissions = FILMS.reduce((a, f) => a + f.admissions, 0);
  useEffect(() => { const t = setInterval(() => setLiveGbo(g => g + Math.floor(Math.random() * 50000)), 2000); return () => clearInterval(t); }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="rounded-xl p-5 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #E6394611, #E6394633)", border: "1px solid #E6394444" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(90deg, #E63946, #F4A261, #2A9D8F)" }} />
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold" style={{ background: "linear-gradient(135deg, #E63946, #F4A261)", color: "white" }}>FA</div>
          <div>
            <h2 className="text-xl font-bold" style={{ fontFamily: "'Syne', sans-serif" }}>Funke Akindele Network</h2>
            <p className="text-sm" style={{ color: "#64748b" }}>Nigeria's highest-grossing filmmaker · Nollywood Box Office Queen</p>
            <div className="flex flex-wrap gap-2 mt-1"><Badge color="#E63946">3 Films Distributed</Badge><Badge color="#22c55e">2 Active Releases</Badge><Badge color="#a78bfa">1 Completed Run</Badge></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Gross Box Office" value={fmtNB(liveGbo)} sub="↑ Live" color="#E63946" icon="₦" />
        <StatCard label="Total Admissions" value={fmtNum(totalAdmissions)} sub="All films" color="#F4A261" icon="🎟" />
        <StatCard label="Your Producer Share (35%)" value={fmtNB(Math.round(liveGbo * 0.35))} sub="After deductions" color="#22c55e" icon="💰" />
        <StatCard label="Active Cinemas" value="26" sub="7 cities" color="#2A9D8F" icon="🏢" />
      </div>

      <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #1e293b" }}>
        <div className="px-5 py-3 flex items-center justify-between" style={{ background: "#0a0f1a", borderBottom: "1px solid #1e293b" }}>
          <span className="text-sm font-medium">Film Portfolio</span>
          <Badge color="#E63946">3 films · {fmtNB(FILMS.reduce((a, f) => a + f.gbo, 0))} total GBO</Badge>
        </div>
        {FILMS.map(film => (
          <div key={film.id} className="flex items-center gap-4 px-5 py-4 hover:bg-white/5" style={{ borderBottom: "1px solid #0a0f1a", background: "#050b14" }}>
            <FilmCard film={film} size="sm" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-sm">{film.title}</span>
                <Badge color={film.status === "completed" ? "#a78bfa" : "#22c55e"}>{film.status}</Badge>
              </div>
              <div className="text-xs mb-2" style={{ color: "#475569" }}>{film.genre} · {film.cinemaCount} cinemas · {fmtNum(film.admissions)} admissions</div>
              <MiniBar value={film.gbo} max={2200000000} color={film.color} />
            </div>
            <div className="text-right flex-shrink-0">
              <div className="font-bold text-sm" style={{ color: film.accentColor }}>{fmtNB(film.gbo)}</div>
              <div className="text-xs" style={{ color: "#22c55e" }}>Your: {fmtNB(Math.round(film.gbo * 0.35))}</div>
            </div>
            <SimpleChart data={film.weeklyData} color={film.color} height={40} />
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-xl p-5" style={{ background: "#0a0f1a", border: "1px solid #1e293b" }}>
          <div className="text-sm font-medium mb-4">BEHIND THE SCENES — City Breakdown</div>
          {Object.entries(FILMS[1].cities).map(([city, tickets]) => (
            <div key={city} className="flex items-center gap-3 mb-2">
              <div className="text-xs flex-shrink-0" style={{ color: "#64748b", width: "110px" }}>{city}</div>
              <div className="flex-1"><MiniBar value={tickets} max={1500} color={FILMS[1].color} /></div>
              <div className="text-xs w-12 text-right" style={{ color: "#94a3b8" }}>{fmtNum(tickets)}</div>
            </div>
          ))}
        </div>
        <div className="rounded-xl p-5" style={{ background: "#0a0f1a", border: "1px solid #1e293b" }}>
          <div className="text-sm font-medium mb-4">Notifications</div>
          {NOTIFICATIONS.map(n => (
            <div key={n.id} className="flex items-start gap-3 mb-3 pb-3" style={{ borderBottom: "1px solid #0a0f1a" }}>
              <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: n.type === "success" ? "#22c55e" : n.type === "warning" ? "#f59e0b" : "#3b82f6" }} />
              <div className="flex-1"><div className="text-xs">{n.text}</div><div className="text-xs mt-0.5" style={{ color: "#334155" }}>{n.time}</div></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── CHAT VIEW ────────────────────────────────────────────────────────────────
function ChatView() {
  const [messages, setMessages] = useState([
    { id: 1, from: "Support", text: "Welcome to Nile Distribution Platform! How can we help you today?", time: "10:00 AM", role: "support" },
    { id: 2, from: "You", text: "Hi, can you share the latest settlement report for Omo Ghetto?", time: "10:02 AM", role: "user" },
    { id: 3, from: "Support", text: "Sure! OMO GHETTO: THE SAGA's final settlement is ready. Total GBO: ₦1.1B. Your producer share (35%): ₦385M. Full report sent to your email.", time: "10:03 AM", role: "support" },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);
  const send = () => {
    if (!input.trim()) return;
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setMessages(m => [...m, { id: Date.now(), from: "You", text: input, time: now, role: "user" }]);
    setInput("");
    setTimeout(() => {
      setMessages(m => [...m, { id: Date.now() + 1, from: "Support", text: "Thank you for your message. A member of our distribution team will respond shortly.", time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), role: "support" }]);
    }, 1200);
  };
  return (
    <div className="p-6 flex flex-col" style={{ height: "calc(100vh - 120px)" }}>
      <div className="rounded-xl flex flex-col overflow-hidden flex-1" style={{ border: "1px solid #1e293b", background: "#050b14" }}>
        <div className="p-4 flex items-center gap-3" style={{ borderBottom: "1px solid #0a0f1a", background: "#0a0f1a" }}>
          <NileLogo size="icon" />
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm" style={{ background: "#E6394622" }}>N</div>
          <div><div className="text-sm font-medium">Nile Distribution Support</div><div className="flex items-center gap-1 text-xs" style={{ color: "#22c55e" }}><div className="w-1.5 h-1.5 rounded-full bg-green-500" /> Online</div></div>
        </div>
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className="max-w-xs">
                <div className="px-4 py-2.5 text-sm" style={{ background: msg.role === "user" ? "#E63946" : "#0f172a", color: "white", borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px" }}>{msg.text}</div>
                <div className="text-xs mt-1 px-1" style={{ color: "#334155", textAlign: msg.role === "user" ? "right" : "left" }}>{msg.time}</div>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
        <div className="p-4" style={{ borderTop: "1px solid #0a0f1a" }}>
          <div className="flex gap-2">
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Type a message..." className="flex-1 rounded-xl px-4 py-2.5 text-sm outline-none" style={{ background: "#0f172a", border: "1px solid #1e293b", color: "white" }} />
            <button onClick={send} className="px-4 py-2.5 rounded-xl text-sm font-medium text-white" style={{ background: "#E63946" }}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── ADMIN OVERVIEW ───────────────────────────────────────────────────────────
function AdminOverview() {
  const [liveRev, setLiveRev] = useState(FILMS.reduce((a, f) => a + f.gbo, 0));
  useEffect(() => { const t = setInterval(() => setLiveRev(r => r + Math.floor(Math.random() * 80000)), 1500); return () => clearInterval(t); }, []);
  const totalAdmissions = FILMS.reduce((a, f) => a + f.admissions, 0);

  return (
    <div className="p-6 space-y-6">
      <div className="rounded-xl p-5 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #2A9D8F11, #2A9D8F33)", border: "1px solid #2A9D8F44" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(90deg, #2A9D8F, #48CAE4)" }} />
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2"><NileLogo size="sm" /><Badge color="#2A9D8F">Master Control</Badge></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-4">
              {[[fmtNB(liveRev), "Total GBO (Live)"], [fmtNum(totalAdmissions), "Total Admissions"], ["26", "Cinema Partners"], ["3", "Active Titles"]].map(([v, l]) => (
                <div key={l}><div className="text-xl font-bold" style={{ fontFamily: "'Syne', sans-serif" }}>{v}</div><div className="text-xs" style={{ color: "#64748b" }}>{l}</div></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #1e293b" }}>
          <div className="px-4 py-3 text-sm font-medium" style={{ background: "#0a0f1a", borderBottom: "1px solid #1e293b" }}>Film Portfolio — Funke Akindele Network</div>
          {FILMS.map(film => (
            <div key={film.id} className="flex items-center gap-3 px-4 py-3 hover:bg-white/5" style={{ borderBottom: "1px solid #0a0f1a", background: "#050b14" }}>
              <FilmCard film={film} size="sm" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{film.title.split(":")[0]}</div>
                <div className="text-xs" style={{ color: "#475569" }}>{film.genre} · {fmtNum(film.admissions)} admissions</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold" style={{ color: film.accentColor }}>{fmtNB(film.gbo)}</div>
                <Badge color={film.status === "completed" ? "#a78bfa" : "#22c55e"}>{film.status}</Badge>
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #1e293b" }}>
          <div className="px-4 py-3 text-sm font-medium" style={{ background: "#0a0f1a", borderBottom: "1px solid #1e293b" }}>Top Cinemas by Revenue</div>
          {CINEMAS.slice(0, 5).map((cinema, i) => (
            <div key={cinema.id} className="flex items-center gap-3 px-4 py-3 hover:bg-white/5" style={{ borderBottom: "1px solid #0a0f1a", background: "#050b14" }}>
              <div className="text-xs w-5 font-bold flex-shrink-0" style={{ color: i < 3 ? "#f59e0b" : "#334155" }}>#{i + 1}</div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{cinema.name}</div>
                <div className="text-xs" style={{ color: "#475569" }}>{cinema.city} · {cinema.screens} screens</div>
              </div>
              <div className="text-sm font-medium">{fmtNB(cinema.revenue)}</div>
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: cinema.status === "active" ? "#22c55e" : "#f59e0b" }} />
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {FILMS.map(film => (
          <div key={film.id} className="rounded-xl p-4" style={{ background: "#0a0f1a", border: `1px solid ${film.color}33` }}>
            <div className="flex items-center gap-3 mb-4">
              <FilmCard film={film} size="sm" />
              <div><div className="font-bold text-sm">{film.title.split(":")[0]}</div><div className="text-xs" style={{ color: "#64748b" }}>{film.genre}</div></div>
            </div>
            <SimpleChart data={film.weeklyData} color={film.color} height={60} />
            <div className="flex justify-between mt-3 text-sm">
              <div><div className="font-bold" style={{ color: film.accentColor }}>{fmtNB(film.gbo)}</div><div className="text-xs" style={{ color: "#475569" }}>GBO</div></div>
              <div className="text-right"><div className="font-bold">{fmtNum(film.admissions)}</div><div className="text-xs" style={{ color: "#475569" }}>Admissions</div></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── CINEMA OVERVIEW ──────────────────────────────────────────────────────────
function CinemaOverview() {
  const cinema = CINEMAS[0];
  return (
    <div className="p-6 space-y-6">
      <div className="rounded-xl p-5 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #F4A26111, #F4A26133)", border: "1px solid #F4A26144" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "#F4A261" }} />
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1"><NileLogo size="icon" /><h2 className="text-xl font-bold" style={{ fontFamily: "'Syne', sans-serif" }}>{cinema.name}</h2></div>
            <div className="flex flex-wrap gap-4 mt-2 text-sm" style={{ color: "#94a3b8" }}>
              <span>📍 {cinema.city}</span><span>🎬 {cinema.screens} Screens</span><span>💺 {cinema.capacity} Seats</span>
            </div>
          </div>
          <Badge color="#22c55e">Active</Badge>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Monthly Revenue" value={fmtNB(cinema.revenue)} sub="+8% MoM" color="#F4A261" icon="₦" />
        <StatCard label="Active Screenings" value="18" sub="3 films" color="#22c55e" icon="▶" />
        <StatCard label="Occupancy Rate" value="74%" sub="Above avg" color="#3b82f6" icon="◉" />
        <StatCard label="Today's Tickets" value="847" sub="+27 vs yesterday" color="#a78bfa" icon="🎟" />
      </div>
      <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #1e293b" }}>
        <div className="px-5 py-3 text-sm font-medium" style={{ background: "#0a0f1a", borderBottom: "1px solid #1e293b" }}>Incoming Film Requests</div>
        {FILMS.map(film => (
          <div key={film.id} className="flex items-center gap-4 px-5 py-4 hover:bg-white/5" style={{ borderBottom: "1px solid #0a0f1a", background: "#050b14" }}>
            <FilmCard film={film} size="sm" />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium">{film.title}</div>
              <div className="text-xs mt-0.5" style={{ color: "#475569" }}>{film.genre} · {film.cinemaCount} screens requested · Nile Entertainment</div>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button className="px-3 py-1.5 rounded-lg text-xs font-medium" style={{ background: "#22c55e22", color: "#22c55e", border: "1px solid #22c55e44" }}>Accept</button>
              <button className="px-3 py-1.5 rounded-lg text-xs" style={{ background: "#0f172a", color: "#64748b", border: "1px solid #1e293b" }}>Decline</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── ANALYTICS VIEW ───────────────────────────────────────────────────────────
function AnalyticsView({ role }) {
  const color = ROLE_COLORS[role];
  return (
    <div className="p-6 space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        {FILMS.map(film => (
          <div key={film.id} className="rounded-xl p-4" style={{ background: "#0a0f1a", border: `1px solid ${film.color}33` }}>
            <div className="flex items-center gap-3 mb-3">
              <FilmCard film={film} size="sm" />
              <div><div className="text-sm font-bold">{film.title.split(":")[0]}</div><Badge color={film.color}>{film.genre}</Badge></div>
            </div>
            <SimpleChart data={film.weeklyData} color={film.color} height={60} />
            <div className="flex justify-between mt-2 text-xs" style={{ color: "#64748b" }}>
              <span>7-week trend</span><span style={{ color: film.accentColor }}>{fmtNB(film.gbo)} GBO</span>
            </div>
          </div>
        ))}
      </div>
      <div className="rounded-xl p-5" style={{ background: "#0a0f1a", border: "1px solid #1e293b" }}>
        <div className="text-sm font-medium mb-4">Cinema Performance Rankings</div>
        {CINEMAS.map((cinema, i) => (
          <div key={cinema.id} className="flex items-center gap-4 py-2.5" style={{ borderBottom: "1px solid #0a0f1a" }}>
            <div className="text-xs w-6 text-center font-bold flex-shrink-0" style={{ color: i < 3 ? "#f59e0b" : "#334155" }}>#{i + 1}</div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{cinema.name}</div>
              <div className="text-xs" style={{ color: "#475569" }}>{cinema.city} · {cinema.screens} screens</div>
            </div>
            <div className="w-28 hidden md:block"><MiniBar value={cinema.revenue} max={300000000} color={color} /></div>
            <div className="text-sm font-medium w-20 text-right flex-shrink-0">{fmtNB(cinema.revenue)}</div>
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: cinema.status === "active" ? "#22c55e" : "#f59e0b" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── MARKETING VIEW ───────────────────────────────────────────────────────────
function MarketingView() {
  const assets = [["Film Poster", "🖼", "1000×1500px"], ["Trailer", "🎬", "1920×1080p"], ["Social Square", "📱", "1080×1080px"], ["Billboard", "🏙", "6000×2000px"], ["Press Kit", "📦", "PDF/ZIP"]];
  return (
    <div className="p-6 space-y-6">
      {FILMS.map(film => (
        <div key={film.id} className="rounded-xl overflow-hidden" style={{ border: `1px solid ${film.color}33` }}>
          <div className="flex items-center gap-3 px-5 py-3" style={{ background: `${film.color}11`, borderBottom: `1px solid ${film.color}22` }}>
            <FilmCard film={film} size="sm" /><div><div className="font-bold">{film.title}</div><Badge color={film.color}>{film.genre}</Badge></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 p-5" style={{ background: "#050b14" }}>
            {assets.map(([label, icon, size]) => (
              <div key={label} className="rounded-xl p-4 text-center cursor-pointer hover:border-white/20 transition-all" style={{ border: "1px dashed #1e293b", background: "#0a0f1a" }}>
                <div className="text-2xl mb-1">{icon}</div>
                <div className="text-xs font-medium mb-0.5">{label}</div>
                <div className="text-xs mb-2" style={{ color: "#475569" }}>{size}</div>
                <div className="text-xs px-2 py-1 rounded-md inline-block" style={{ background: `${film.color}22`, color: film.accentColor }}>Upload</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── ADMIN REPORTS ────────────────────────────────────────────────────────────
function AdminReports() {
  const totalGbo = FILMS.reduce((a, f) => a + f.gbo, 0);
  const totalAdm = FILMS.reduce((a, f) => a + f.admissions, 0);
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[[fmtNB(totalGbo), "Total GBO", "#2A9D8F"], [fmtNum(totalAdm), "Total Admissions", "#E63946"], ["26", "Active Cinemas", "#F4A261"], ["3", "Films Released", "#a78bfa"]].map(([v, l, c]) => (
          <div key={l} className="rounded-xl p-4" style={{ background: "#0a0f1a", border: "1px solid #1e293b" }}>
            <div className="text-2xl font-bold mb-1" style={{ color: c }}>{v}</div>
            <div className="text-xs" style={{ color: "#64748b" }}>{l}</div>
          </div>
        ))}
      </div>
      <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #1e293b" }}>
        <div className="px-5 py-3 flex items-center justify-between" style={{ background: "#0a0f1a", borderBottom: "1px solid #1e293b" }}>
          <span className="text-sm font-medium">Film Performance Report</span>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 rounded-lg text-xs" style={{ background: "#2A9D8F22", color: "#2A9D8F", border: "1px solid #2A9D8F44" }}>Export PDF</button>
            <button className="px-3 py-1.5 rounded-lg text-xs" style={{ background: "#3b82f622", color: "#3b82f6", border: "1px solid #3b82f644" }}>Export Excel</button>
          </div>
        </div>
        <div className="grid px-5 py-2 text-xs font-medium" style={{ gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: "16px", background: "#0a0f1a", borderBottom: "1px solid #1e293b", color: "#475569" }}>
          <div>Film</div><div>GBO</div><div>Admissions</div><div>Cinemas</div><div>Status</div>
        </div>
        {FILMS.map(film => (
          <div key={film.id} className="grid px-5 py-4 items-center hover:bg-white/5" style={{ gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: "16px", borderBottom: "1px solid #0a0f1a", background: "#050b14" }}>
            <div><div className="text-sm font-medium">{film.title.split(":")[0]}</div><div className="text-xs" style={{ color: "#475569" }}>{film.director.split("&")[0].trim()}</div></div>
            <div className="text-sm font-medium" style={{ color: film.accentColor }}>{fmtNB(film.gbo)}</div>
            <div className="text-sm">{fmtNum(film.admissions)}</div>
            <div className="text-sm">{film.cinemaCount}</div>
            <Badge color={film.status === "completed" ? "#a78bfa" : "#22c55e"}>{film.status}</Badge>
          </div>
        ))}
        <div className="grid px-5 py-4" style={{ gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: "16px", background: "#0a0f1a", fontWeight: 600 }}>
          <div className="text-sm">TOTAL</div>
          <div className="text-sm" style={{ color: "#2A9D8F" }}>{fmtNB(totalGbo)}</div>
          <div className="text-sm">{fmtNum(totalAdm)}</div>
          <div className="text-sm">26</div>
          <div />
        </div>
      </div>
    </div>
  );
}

// ─── ADMIN CINEMAS ────────────────────────────────────────────────────────────
function AdminCinemas() {
  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm" style={{ color: "#64748b" }}>{CINEMAS.length} cinemas across 7 cities</div>
        <button className="px-4 py-2 rounded-lg text-sm font-medium text-white" style={{ background: "#2A9D8F" }}>+ Add Cinema</button>
      </div>
      <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #1e293b" }}>
        <div className="grid px-5 py-3 text-xs font-medium" style={{ gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: "16px", background: "#0a0f1a", borderBottom: "1px solid #1e293b", color: "#475569" }}>
          <div>Cinema</div><div>City</div><div>Screens</div><div>Revenue</div><div>Status</div>
        </div>
        {CINEMAS.map(cinema => (
          <div key={cinema.id} className="grid px-5 py-4 items-center hover:bg-white/5" style={{ gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: "16px", borderBottom: "1px solid #0a0f1a", background: "#050b14" }}>
            <div><div className="text-sm font-medium">{cinema.name}</div><div className="text-xs mt-0.5" style={{ color: "#475569" }}>{cinema.capacity} seat capacity</div></div>
            <div className="text-sm">{cinema.city}</div>
            <div className="text-sm">{cinema.screens}</div>
            <div className="text-sm font-medium">{fmtNB(cinema.revenue)}</div>
            <Badge color={cinema.status === "active" ? "#22c55e" : "#f59e0b"}>{cinema.status}</Badge>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("landing");
  const [role, setRole] = useState("producer");
  const [activeScreen, setActiveScreen] = useState("overview");

  const handleEnter = (r) => { setRole(r); setPage("app"); setActiveScreen("overview"); };
  const handleLogout = () => setPage("landing");
  const handleRoleChange = (r) => { setRole(r); setActiveScreen("overview"); };

  if (page === "landing") return <LandingPage onEnter={handleEnter} />;

  const user = USERS[role] || USERS.producer;
  const color = ROLE_COLORS[role];

  const screenTitles = {
    overview: role === "admin" ? "Master Control Panel" : role === "cinema" ? "Cinema Dashboard" : "Producer Dashboard",
    films: role === "admin" ? "All Films" : "My Films",
    submit: "Submit a Film",
    analytics: "Analytics & Performance",
    finance: "Finance & Settlements",
    marketing: "Marketing Assets",
    distribution: "Distribution Request",
    chat: "Messages & Support",
    requests: "Film Requests",
    schedule: "Showtime Manager",
    sales: "Sales Reports",
    cinemas: "Cinema Network",
    reports: "Reports & Exports",
  };

  const renderScreen = () => {
    if (activeScreen === "chat") return <ChatView />;
    if (activeScreen === "submit") return <SubmitFilm />;
    if (activeScreen === "analytics") return <AnalyticsView role={role} />;
    if (activeScreen === "marketing") return <MarketingView />;
    if (activeScreen === "finance") return <FinanceView />;

    if (role === "producer") {
      if (activeScreen === "overview") return <ProducerOverview />;
      if (activeScreen === "films") return (
        <div className="p-6 grid md:grid-cols-3 gap-6">
          {FILMS.map(film => (
            <div key={film.id} className="rounded-2xl overflow-hidden" style={{ background: "#0a0f1a", border: `1px solid ${film.color}44` }}>
              <div className="h-44 flex items-center justify-center relative" style={{ background: `linear-gradient(135deg, ${film.color}11, ${film.color}33)` }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: film.color }} />
                <div className="text-center px-4">
                  <div className="text-5xl mb-2">{GENRE_ICONS[film.genre]}</div>
                  <div className="font-bold text-base" style={{ fontFamily: "'Syne', sans-serif", color: film.accentColor, lineHeight: 1.2 }}>{film.title}</div>
                </div>
              </div>
              <div className="p-4">
                <div className="flex flex-wrap gap-1 mb-3"><Badge color={film.color}>{film.genre}</Badge><Badge color={film.status === "completed" ? "#a78bfa" : "#22c55e"}>{film.status}</Badge></div>
                <div className="space-y-1 text-xs mb-3" style={{ color: "#64748b" }}>
                  <div>🎬 Dir. {film.director.split("&")[0].trim()}</div>
                  <div>⏱ {film.duration} · {film.language}</div>
                  <div>🏢 {film.cinemaCount} cinemas</div>
                </div>
                <div className="pt-3 flex justify-between" style={{ borderTop: "1px solid #0f172a" }}>
                  <div><div className="text-sm font-bold" style={{ color: film.accentColor }}>{fmtNB(film.gbo)}</div><div className="text-xs" style={{ color: "#475569" }}>GBO</div></div>
                  <div className="text-right"><div className="text-sm font-bold">{fmtNum(film.admissions)}</div><div className="text-xs" style={{ color: "#475569" }}>Admissions</div></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }
    if (role === "cinema") return <CinemaOverview />;
    if (role === "admin") {
      if (activeScreen === "overview") return <AdminOverview />;
      if (activeScreen === "films") return (
        <div className="p-6 space-y-4">
          {FILMS.map(film => (
            <div key={film.id} className="flex items-center gap-4 p-4 rounded-xl" style={{ background: "#0a0f1a", border: `1px solid ${film.color}33` }}>
              <FilmCard film={film} size="md" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap"><span className="font-bold">{film.title}</span><Badge color={film.color}>{film.genre}</Badge><Badge color={film.status === "completed" ? "#a78bfa" : "#22c55e"}>{film.status}</Badge></div>
                <div className="text-sm mb-2" style={{ color: "#64748b" }}>Dir. {film.director} · {film.cinemaCount} cinemas · {film.admissions.toLocaleString()} admissions</div>
                <MiniBar value={film.gbo} max={2200000000} color={film.color} />
              </div>
              <div className="text-right flex-shrink-0">
                <div className="font-bold text-lg" style={{ color: film.accentColor }}>{fmtNB(film.gbo)}</div>
                <div className="text-sm" style={{ color: "#475569" }}>{fmtNum(film.admissions)} admissions</div>
              </div>
              <SimpleChart data={film.weeklyData} color={film.color} height={50} />
            </div>
          ))}
        </div>
      );
      if (activeScreen === "cinemas") return <AdminCinemas />;
      if (activeScreen === "analytics") return <AnalyticsView role="admin" />;
      if (activeScreen === "reports") return <AdminReports />;
    }
    return <div className="p-6 text-center" style={{ color: "#475569" }}>Select a menu item</div>;
  };

  return (
    <div style={{ display: "flex", height: "100vh", background: "#020408", color: "#e2e8f0", fontFamily: "'DM Sans', system-ui, sans-serif", overflow: "hidden" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Syne:wght@700;800&display=swap'); * { box-sizing: border-box; } ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 4px; } @keyframes pulse { 0%,100%{opacity:1}50%{opacity:0.4} }`}</style>
      <Sidebar role={role} active={activeScreen} setActive={setActiveScreen} user={user} onLogout={handleLogout} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <TopBar title={screenTitles[activeScreen] || "Dashboard"} role={role} />
        <div style={{ flex: 1, overflowY: "auto" }}>{renderScreen()}</div>
      </div>
      {/* Role switcher */}
      <div className="fixed bottom-4 right-4 flex flex-col gap-1.5 z-50">
        {[["producer", "#E63946", "P"], ["cinema", "#F4A261", "C"], ["admin", "#2A9D8F", "A"]].map(([r, c, l]) => (
          <button key={r} onClick={() => handleRoleChange(r)} title={r} className="w-9 h-9 rounded-full text-xs font-bold text-white hover:scale-110 transition-all"
            style={{ background: r === role ? c : "#1e293b", opacity: r === role ? 1 : 0.6 }}>{l}</button>
        ))}
      </div>
    </div>
  );
}
