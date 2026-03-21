"use client";

import { useState, useEffect } from "react";
import { FILMS, CINEMAS, formatNaira } from "@/lib/data";
import { StatCard, Badge } from "@/components/ui";
import FilmPoster from "@/components/ui/FilmPoster";

export default function CinemaOverview() {
  const cinema = CINEMAS[0];
  const [ticketCount, setTicketCount] = useState(847);

  useEffect(() => {
    const t = setInterval(() => {
      setTicketCount((n) => n + Math.floor(Math.random() * 3));
    }, 3000);
    return () => clearInterval(t);
  }, []);

  const SHOWTIMES = ["10:00 AM", "1:30 PM", "4:00 PM", "7:00 PM", "10:00 PM"];

  return (
    <div className="p-6 space-y-6">
      {/* Cinema header */}
      <div
        className="rounded-xl p-5 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #F4A26111, #F4A26133)",
          border: "1px solid #F4A26144",
        }}
      >
        <div
          className="absolute top-0 right-0 w-48 h-48 opacity-5 rounded-bl-full"
          style={{ background: "#F4A261" }}
        />
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold font-syne">{cinema.name}</h2>
            <div
              className="flex flex-wrap items-center gap-4 mt-2 text-sm"
              style={{ color: "#94a3b8" }}
            >
              <span>📍 {cinema.city}</span>
              <span>🎬 {cinema.screens} Screens</span>
              <span>💺 {cinema.capacity} Seats</span>
            </div>
          </div>
          <Badge color="#22c55e">Active</Badge>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          label="Monthly Revenue"
          value={formatNaira(cinema.revenue)}
          sub="+8% MoM"
          color="#F4A261"
          icon="₦"
        />
        <StatCard
          label="Active Screenings"
          value="18"
          sub="Across 3 films"
          color="#22c55e"
          icon="▶"
        />
        <StatCard
          label="Occupancy Rate"
          value="74%"
          sub="Above average"
          color="#3b82f6"
          icon="◉"
        />
        <StatCard
          label="Tickets Sold Today"
          value={ticketCount.toLocaleString()}
          sub="Live count"
          color="#a78bfa"
          icon="🎟"
        />
      </div>

      {/* Film requests */}
      <div
        className="rounded-xl overflow-hidden"
        style={{ border: "1px solid #1e293b" }}
      >
        <div
          className="px-5 py-3 flex items-center justify-between"
          style={{ background: "#0a0f1a", borderBottom: "1px solid #1e293b" }}
        >
          <span className="text-sm font-medium">Incoming Film Requests</span>
          <Badge color="#F4A261">{FILMS.length} pending</Badge>
        </div>
        {FILMS.map((film) => (
          <div
            key={film.id}
            className="flex items-center gap-4 px-5 py-4 hover:bg-white/5 transition-colors"
            style={{
              borderBottom: "1px solid #0f172a",
              background: "#050b14",
            }}
          >
            <FilmPoster film={film} size="sm" />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium">{film.title}</div>
              <div className="text-xs mt-0.5" style={{ color: "#475569" }}>
                {film.genre} · {film.releaseType} · Dir. {film.director}
              </div>
              <div className="text-xs mt-1" style={{ color: "#64748b" }}>
                Requested for {film.cinemaCount} screens · {film.duration}
              </div>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button
                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:opacity-80"
                style={{
                  background: "#22c55e22",
                  color: "#22c55e",
                  border: "1px solid #22c55e44",
                }}
              >
                Accept
              </button>
              <button
                className="px-3 py-1.5 rounded-lg text-xs transition-all hover:border-white/20"
                style={{
                  background: "#0f172a",
                  color: "#64748b",
                  border: "1px solid #1e293b",
                }}
              >
                Decline
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Showtimes */}
      <div
        className="rounded-xl p-5"
        style={{ background: "#0a0f1a", border: "1px solid #1e293b" }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-medium">Today&apos;s Showtime Schedule</div>
          <button
            className="text-xs px-3 py-1.5 rounded-lg"
            style={{
              background: "#F4A26122",
              color: "#F4A261",
              border: "1px solid #F4A26144",
            }}
          >
            + Add Showtime
          </button>
        </div>
        {FILMS.slice(0, 2).map((film, fi) => (
          <div key={film.id} className="mb-5 last:mb-0">
            <div className="flex items-center gap-2 mb-2">
              <FilmPoster film={film} size="sm" />
              <div>
                <div className="text-sm font-medium">{film.title}</div>
                <div className="text-xs" style={{ color: "#64748b" }}>
                  {film.duration} · {film.language}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 ml-14">
              {SHOWTIMES.map((time, ti) => (
                <div
                  key={time}
                  className="px-3 py-1.5 rounded-lg text-xs"
                  style={{
                    background: "#0f172a",
                    border: "1px solid #1e293b",
                    color: "#94a3b8",
                  }}
                >
                  {time} · Screen {((fi + ti) % cinema.screens) + 1}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
