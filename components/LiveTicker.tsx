"use client";

import { useState, useEffect } from "react";
import { FILMS } from "@/lib/data";

const CITIES = ["Lagos", "Abuja", "Port Harcourt", "Ibadan", "Enugu"];

export default function LiveTicker() {
  const [idx, setIdx] = useState(0);
  const [tickets, setTickets] = useState(12);

  useEffect(() => {
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % (FILMS.length * CITIES.length));
      setTickets(Math.floor(Math.random() * 50) + 5);
    }, 2500);
    return () => clearInterval(t);
  }, []);

  const film = FILMS[idx % FILMS.length];
  const city = CITIES[Math.floor(idx / FILMS.length) % CITIES.length];

  return (
    <div
      className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs"
      style={{ background: "#0f172a", border: "1px solid #1e293b" }}
    >
      <div
        className="w-1.5 h-1.5 rounded-full pulse-dot"
        style={{ background: "#22c55e" }}
      />
      <span style={{ color: "#64748b" }}>LIVE</span>
      <span style={{ color: film.accentColor }}>{film.title}</span>
      <span style={{ color: "#64748b" }}>—</span>
      <span className="text-white">{tickets} tickets</span>
      <span style={{ color: "#64748b" }}>in {city}</span>
    </div>
  );
}
