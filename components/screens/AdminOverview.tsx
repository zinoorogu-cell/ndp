"use client";

import { useState, useEffect } from "react";
import { FILMS, CINEMAS, formatNaira, formatNum, GENRE_ICONS } from "@/lib/data";
import { SimpleChart, Badge } from "@/components/ui";
import FilmPoster from "@/components/ui/FilmPoster";

export default function AdminOverview() {
  const [liveRev, setLiveRev] = useState(97010000);
  const [liveTickets, setLiveTickets] = useState(174150);

  useEffect(() => {
    const t = setInterval(() => {
      setLiveRev((r) => r + Math.floor(Math.random() * 20000));
      setLiveTickets((t) => t + Math.floor(Math.random() * 4));
    }, 1500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* Master control banner */}
      <div
        className="rounded-xl p-5 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #2A9D8F11, #2A9D8F33)",
          border: "1px solid #2A9D8F44",
        }}
      >
        <div
          className="absolute top-0 right-0 w-48 h-48 opacity-5 rounded-bl-full"
          style={{ background: "#2A9D8F" }}
        />
        <div
          className="text-xs font-medium mb-1"
          style={{ color: "#2A9D8F", letterSpacing: "0.1em" }}
        >
          MASTER CONTROL
        </div>
        <h2 className="text-2xl font-bold mb-4 font-syne">
          Nile Distribution Network
        </h2>
        <div className="flex flex-wrap gap-8 text-sm">
          <div>
            <span className="font-bold text-2xl text-white">
              {formatNaira(liveRev)}
            </span>
            <br />
            <span style={{ color: "#64748b" }}>Total Box Office (Live)</span>
          </div>
          <div>
            <span className="font-bold text-2xl text-white">26</span>
            <br />
            <span style={{ color: "#64748b" }}>Active Cinemas</span>
          </div>
          <div>
            <span className="font-bold text-2xl text-white">3</span>
            <br />
            <span style={{ color: "#64748b" }}>Films in Distribution</span>
          </div>
          <div>
            <span className="font-bold text-2xl text-white">
              {formatNum(liveTickets)}
            </span>
            <br />
            <span style={{ color: "#64748b" }}>Tickets Sold</span>
          </div>
          <div>
            <span className="font-bold text-2xl text-white">7</span>
            <br />
            <span style={{ color: "#64748b" }}>Cities Covered</span>
          </div>
        </div>
      </div>

      {/* Two-col tables */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Film submissions */}
        <div
          className="rounded-xl overflow-hidden"
          style={{ border: "1px solid #1e293b" }}
        >
          <div
            className="px-4 py-3 flex items-center justify-between"
            style={{ background: "#0a0f1a", borderBottom: "1px solid #1e293b" }}
          >
            <span className="text-sm font-medium">Film Submissions Queue</span>
            <Badge color="#2A9D8F">{FILMS.length} films</Badge>
          </div>
          {FILMS.map((film) => (
            <div
              key={film.id}
              className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors"
              style={{
                borderBottom: "1px solid #0f172a",
                background: "#050b14",
              }}
            >
              <FilmPoster film={film} size="sm" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{film.title}</div>
                <div className="text-xs" style={{ color: "#475569" }}>
                  {film.director} · {film.genre}
                </div>
              </div>
              <Badge
                color={film.status === "active" ? "#22c55e" : "#f59e0b"}
              >
                {film.status}
              </Badge>
              {film.status === "pending" && (
                <button
                  className="text-xs px-2 py-1 rounded-lg transition-all hover:opacity-80"
                  style={{
                    background: "#2A9D8F22",
                    color: "#2A9D8F",
                    border: "1px solid #2A9D8F44",
                  }}
                >
                  Approve
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Cinema network */}
        <div
          className="rounded-xl overflow-hidden"
          style={{ border: "1px solid #1e293b" }}
        >
          <div
            className="px-4 py-3 flex items-center justify-between"
            style={{ background: "#0a0f1a", borderBottom: "1px solid #1e293b" }}
          >
            <span className="text-sm font-medium">Cinema Network Status</span>
            <Badge color="#2A9D8F">{CINEMAS.length} cinemas</Badge>
          </div>
          {CINEMAS.slice(0, 6).map((cinema) => (
            <div
              key={cinema.id}
              className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors"
              style={{
                borderBottom: "1px solid #0f172a",
                background: "#050b14",
              }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-base"
                style={{ background: "#1e293b" }}
              >
                🏢
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{cinema.name}</div>
                <div className="text-xs" style={{ color: "#475569" }}>
                  {cinema.city} · {cinema.screens} screens
                </div>
              </div>
              <div
                className="text-xs font-medium"
                style={{ color: "#94a3b8" }}
              >
                {formatNaira(cinema.revenue)}
              </div>
              <div
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{
                  background:
                    cinema.status === "active" ? "#22c55e" : "#f59e0b",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Film performance cards */}
      <div className="grid md:grid-cols-3 gap-4">
        {FILMS.map((film) => (
          <div
            key={film.id}
            className="rounded-xl p-4"
            style={{
              background: "#0a0f1a",
              border: `1px solid ${film.color}33`,
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <FilmPoster film={film} />
              <div>
                <div className="font-bold">{film.title}</div>
                <div className="text-xs" style={{ color: "#64748b" }}>
                  {film.genre} · {film.cinemaCount} cinemas
                </div>
              </div>
            </div>
            <SimpleChart
              data={film.weeklyData}
              color={film.color}
              height={60}
            />
            <div className="flex justify-between mt-3 text-sm">
              <div>
                <div className="font-bold">{formatNaira(film.totalRevenue)}</div>
                <div className="text-xs" style={{ color: "#475569" }}>
                  Revenue
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold">{formatNum(film.totalTickets)}</div>
                <div className="text-xs" style={{ color: "#475569" }}>
                  Tickets
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
