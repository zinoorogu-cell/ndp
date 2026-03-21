"use client";

import { FILMS, formatNaira, formatNum } from "@/lib/data";
import { Badge, SimpleChart, MiniBar } from "@/components/ui";
import FilmPoster from "@/components/ui/FilmPoster";

export default function AdminFilms() {
  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm" style={{ color: "#64748b" }}>
          {FILMS.length} films in the distribution system
        </div>
        <button
          className="px-4 py-2 rounded-lg text-sm font-medium text-white hover:opacity-90"
          style={{ background: "#2A9D8F" }}
        >
          + Add Film
        </button>
      </div>

      {FILMS.map((film) => (
        <div
          key={film.id}
          className="flex items-center gap-4 p-4 rounded-xl"
          style={{
            background: "#0a0f1a",
            border: `1px solid ${film.color}33`,
          }}
        >
          <FilmPoster film={film} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="font-bold">{film.title}</span>
              <Badge color={film.color}>{film.genre}</Badge>
              <Badge
                color={film.status === "active" ? "#22c55e" : "#f59e0b"}
              >
                {film.status}
              </Badge>
              <Badge color="#475569">{film.releaseType}</Badge>
            </div>
            <div className="text-sm mb-2" style={{ color: "#64748b" }}>
              Dir. {film.director} · {film.cinemaCount} cinemas · {film.language} · {film.duration}
            </div>
            <MiniBar
              value={film.totalTickets}
              max={100000}
              color={film.color}
            />
          </div>
          <div className="text-right flex-shrink-0">
            <div className="font-bold">{formatNaira(film.totalRevenue)}</div>
            <div className="text-sm" style={{ color: "#475569" }}>
              {formatNum(film.totalTickets)} tickets
            </div>
            <div className="text-xs mt-1" style={{ color: "#334155" }}>
              {film.releaseDate}
            </div>
          </div>
          <div className="w-24 flex-shrink-0">
            <SimpleChart data={film.weeklyData} color={film.color} height={50} />
          </div>
          {film.status === "pending" && (
            <div className="flex flex-col gap-2 flex-shrink-0">
              <button
                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:opacity-80"
                style={{
                  background: "#2A9D8F22",
                  color: "#2A9D8F",
                  border: "1px solid #2A9D8F44",
                }}
              >
                Approve
              </button>
              <button
                className="px-3 py-1.5 rounded-lg text-xs transition-all"
                style={{
                  background: "#0f172a",
                  color: "#64748b",
                  border: "1px solid #1e293b",
                }}
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
