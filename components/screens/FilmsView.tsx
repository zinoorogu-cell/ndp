"use client";

import { FILMS, formatNaira, formatNum, GENRE_ICONS } from "@/lib/data";
import { Badge } from "@/components/ui";

export default function FilmsView() {
  return (
    <div className="p-6 grid md:grid-cols-3 gap-6">
      {FILMS.map((film) => (
        <div
          key={film.id}
          className="rounded-2xl overflow-hidden"
          style={{ background: "#0a0f1a", border: `1px solid ${film.color}44` }}
        >
          {/* Poster area */}
          <div
            className="h-44 flex items-center justify-center relative"
            style={{
              background: `linear-gradient(135deg, ${film.color}11, ${film.color}33)`,
            }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-1"
              style={{ background: film.color }}
            />
            <div className="text-center px-4">
              <div className="text-5xl mb-2">{GENRE_ICONS[film.genre] ?? "🎬"}</div>
              <div
                className="font-bold text-lg font-syne"
                style={{ color: film.accentColor }}
              >
                {film.title}
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="p-4">
            <div className="flex flex-wrap gap-1.5 mb-3">
              <Badge color={film.color}>{film.genre}</Badge>
              <Badge color={film.status === "active" ? "#22c55e" : "#f59e0b"}>
                {film.status}
              </Badge>
              <Badge color="#475569">{film.releaseType}</Badge>
            </div>

            <div className="space-y-1 text-xs mb-4" style={{ color: "#64748b" }}>
              <div>🎬 Dir. {film.director}</div>
              <div>⏱ {film.duration} · {film.language}</div>
              <div>🏢 {film.cinemaCount} cinemas · {film.releaseDate}</div>
              <div>👥 {film.cast.join(", ")}</div>
            </div>

            <p className="text-xs leading-relaxed mb-4" style={{ color: "#475569" }}>
              {film.synopsis.slice(0, 100)}...
            </p>

            <div
              className="flex justify-between pt-3"
              style={{ borderTop: "1px solid #0f172a" }}
            >
              <div>
                <div className="text-sm font-bold">{formatNaira(film.totalRevenue)}</div>
                <div className="text-xs" style={{ color: "#475569" }}>Revenue</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold">{formatNum(film.totalTickets)}</div>
                <div className="text-xs" style={{ color: "#475569" }}>Tickets</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
