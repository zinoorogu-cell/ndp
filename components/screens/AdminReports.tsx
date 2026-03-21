"use client";

import { FILMS, CINEMAS, formatNaira, formatNum } from "@/lib/data";

export default function AdminReports() {
  const totalRevenue = FILMS.reduce((a, f) => a + f.totalRevenue, 0);
  const totalTickets = FILMS.reduce((a, f) => a + f.totalTickets, 0);

  const ROW: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr 1fr",
    gap: "16px",
    padding: "14px 20px",
    borderBottom: "1px solid #0f172a",
    background: "#050b14",
    alignItems: "center",
  };

  const HEAD: React.CSSProperties = {
    ...ROW,
    background: "#0a0f1a",
    borderBottom: "1px solid #1e293b",
    color: "#475569",
    fontSize: "12px",
    fontWeight: 500,
  };

  return (
    <div className="p-6 space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Box Office", value: formatNaira(totalRevenue), color: "#2A9D8F" },
          { label: "Total Tickets", value: formatNum(totalTickets), color: "#E63946" },
          { label: "Active Cinemas", value: "26", color: "#F4A261" },
          { label: "Films Released", value: "3", color: "#a78bfa" },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-xl p-4"
            style={{ background: "#0a0f1a", border: "1px solid #1e293b" }}
          >
            <div className="text-2xl font-bold mb-1" style={{ color: s.color }}>
              {s.value}
            </div>
            <div className="text-xs" style={{ color: "#64748b" }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Film report table */}
      <div
        className="rounded-xl overflow-hidden"
        style={{ border: "1px solid #1e293b" }}
      >
        <div
          className="px-5 py-3 flex items-center justify-between"
          style={{ background: "#0a0f1a", borderBottom: "1px solid #1e293b" }}
        >
          <span className="text-sm font-medium">Film Performance Report</span>
          <div className="flex gap-2">
            <button
              className="px-3 py-1.5 rounded-lg text-xs"
              style={{
                background: "#2A9D8F22",
                color: "#2A9D8F",
                border: "1px solid #2A9D8F44",
              }}
            >
              Export PDF
            </button>
            <button
              className="px-3 py-1.5 rounded-lg text-xs"
              style={{
                background: "#3b82f622",
                color: "#3b82f6",
                border: "1px solid #3b82f644",
              }}
            >
              Export Excel
            </button>
          </div>
        </div>

        <div style={HEAD}>
          <div>Film</div>
          <div>Revenue</div>
          <div>Tickets</div>
          <div>Cinemas</div>
        </div>

        {FILMS.map((film) => (
          <div key={film.id} style={ROW}>
            <div>
              <div className="text-sm font-medium">{film.title}</div>
              <div className="text-xs" style={{ color: "#475569" }}>
                {film.genre} · {film.releaseType}
              </div>
            </div>
            <div className="text-sm font-medium" style={{ color: film.accentColor }}>
              {formatNaira(film.totalRevenue)}
            </div>
            <div className="text-sm">{formatNum(film.totalTickets)}</div>
            <div className="text-sm">{film.cinemaCount}</div>
          </div>
        ))}

        <div
          style={{
            ...ROW,
            background: "#0a0f1a",
            fontWeight: 600,
            borderBottom: "none",
          }}
        >
          <div className="text-sm">TOTAL</div>
          <div className="text-sm" style={{ color: "#2A9D8F" }}>
            {formatNaira(totalRevenue)}
          </div>
          <div className="text-sm">{formatNum(totalTickets)}</div>
          <div className="text-sm">26</div>
        </div>
      </div>

      {/* City breakdown */}
      <div
        className="rounded-xl overflow-hidden"
        style={{ border: "1px solid #1e293b" }}
      >
        <div
          className="px-5 py-3"
          style={{ background: "#0a0f1a", borderBottom: "1px solid #1e293b" }}
        >
          <span className="text-sm font-medium">City Performance Breakdown</span>
        </div>
        {["Lagos", "Abuja", "Port Harcourt", "Enugu", "Ibadan", "Benin", "Calabar"].map(
          (city) => {
            const cityRevenue = CINEMAS.filter((c) => c.city === city).reduce(
              (a, c) => a + c.revenue,
              0
            );
            const cityTickets = FILMS.reduce(
              (a, f) => a + (f.cities[city] ?? 0),
              0
            );
            return (
              <div
                key={city}
                className="flex items-center justify-between px-5 py-3 hover:bg-white/5"
                style={{
                  borderBottom: "1px solid #0f172a",
                  background: "#050b14",
                }}
              >
                <div className="text-sm">{city}</div>
                <div className="flex items-center gap-8 text-sm">
                  <div style={{ color: "#94a3b8" }}>
                    {cityRevenue > 0 ? formatNaira(cityRevenue) : "—"}
                  </div>
                  <div style={{ color: "#64748b" }}>
                    {cityTickets > 0 ? formatNum(cityTickets) + " tickets/day" : "—"}
                  </div>
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}
