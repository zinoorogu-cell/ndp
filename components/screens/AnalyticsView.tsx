"use client";

import { useState, useEffect } from "react";
import { FILMS, CINEMAS, UserRole, ROLE_COLORS, formatNaira } from "@/lib/data";
import { SimpleChart, MiniBar, Badge } from "@/components/ui";
import FilmPoster from "@/components/ui/FilmPoster";

interface AnalyticsViewProps {
  role: UserRole;
}

export default function AnalyticsView({ role }: AnalyticsViewProps) {
  const color = ROLE_COLORS[role];
  const [liveData, setLiveData] = useState<number[]>(FILMS[0].weeklyData);

  useEffect(() => {
    const t = setInterval(() => {
      setLiveData((d) =>
        d.map((v, i) =>
          i === d.length - 1 ? v + Math.floor(Math.random() * 500) : v
        )
      );
    }, 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* Film trend cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {FILMS.map((film, idx) => (
          <div
            key={film.id}
            className="rounded-xl p-4"
            style={{ background: "#0a0f1a", border: `1px solid ${film.color}33` }}
          >
            <div className="flex items-center gap-3 mb-3">
              <FilmPoster film={film} size="sm" />
              <div>
                <div className="text-sm font-bold">{film.title}</div>
                <Badge color={film.color}>{film.genre}</Badge>
              </div>
            </div>
            <SimpleChart
              data={idx === 0 ? liveData : film.weeklyData}
              color={film.color}
              height={50}
            />
            <div className="flex justify-between mt-2 text-xs" style={{ color: "#64748b" }}>
              <span>7-day trend</span>
              <span style={{ color: film.accentColor }}>
                +{Math.round((film.weeklyData[6] / film.weeklyData[0] - 1) * 100)}%
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* City breakdown per film */}
      <div className="grid md:grid-cols-3 gap-4">
        {FILMS.map((film) => (
          <div
            key={film.id}
            className="rounded-xl p-5"
            style={{ background: "#0a0f1a", border: "1px solid #1e293b" }}
          >
            <div className="text-sm font-medium mb-4 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ background: film.color }} />
              {film.title} — By City
            </div>
            {Object.entries(film.cities).map(([city, tickets]) => (
              <div key={city} className="flex items-center gap-3 mb-2">
                <div className="text-xs flex-shrink-0" style={{ color: "#64748b", width: "100px" }}>
                  {city}
                </div>
                <div className="flex-1">
                  <MiniBar value={tickets} max={1200} color={film.color} />
                </div>
                <div className="text-xs w-12 text-right" style={{ color: "#94a3b8" }}>
                  {tickets.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Cinema rankings */}
      <div className="rounded-xl p-5" style={{ background: "#0a0f1a", border: "1px solid #1e293b" }}>
        <div className="text-sm font-medium mb-4">Cinema Performance Rankings</div>
        {CINEMAS.slice(0, 8).map((cinema, i) => (
          <div
            key={cinema.id}
            className="flex items-center gap-4 py-2.5"
            style={{ borderBottom: "1px solid #0f172a" }}
          >
            <div
              className="text-xs w-6 text-center font-bold flex-shrink-0"
              style={{ color: i < 3 ? "#f59e0b" : "#334155" }}
            >
              #{i + 1}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{cinema.name}</div>
              <div className="text-xs" style={{ color: "#475569" }}>
                {cinema.city} · {cinema.screens} screens
              </div>
            </div>
            <div className="w-32 hidden md:block">
              <MiniBar value={cinema.revenue} max={20000000} color={color} />
            </div>
            <div className="text-sm font-medium w-20 text-right flex-shrink-0">
              {formatNaira(cinema.revenue)}
            </div>
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: cinema.status === "active" ? "#22c55e" : "#f59e0b" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
