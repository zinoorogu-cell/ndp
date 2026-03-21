"use client";

import { useState, useEffect } from "react";
import {
  FILMS,
  NOTIFICATIONS,
  formatNaira,
  formatNum,
} from "@/lib/data";
import { StatCard, MiniBar, SimpleChart, Badge } from "@/components/ui";
import FilmPoster from "@/components/ui/FilmPoster";

export default function ProducerOverview() {
  const [liveRevenue, setLiveRevenue] = useState(97010000);
  const [liveTickets, setLiveTickets] = useState(174150);

  useEffect(() => {
    const t = setInterval(() => {
      setLiveRevenue((r) => r + Math.floor(Math.random() * 15000));
      setLiveTickets((t) => t + Math.floor(Math.random() * 3));
    }, 2000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          label="Total Box Office"
          value={formatNaira(liveRevenue)}
          sub="+12% this week"
          color="#E63946"
          icon="₦"
        />
        <StatCard
          label="Tickets Sold"
          value={formatNum(liveTickets)}
          sub="+847 today"
          color="#F4A261"
          icon="🎟"
        />
        <StatCard
          label="Active Cinemas"
          value="26"
          sub="Across 7 cities"
          color="#2A9D8F"
          icon="🏢"
        />
        <StatCard
          label="Films in Distribution"
          value="3"
          sub="2 Active, 1 Pending"
          color="#a78bfa"
          icon="🎬"
        />
      </div>

      {/* Films table */}
      <div
        className="rounded-xl overflow-hidden"
        style={{ border: "1px solid #1e293b" }}
      >
        <div
          className="px-5 py-3 flex items-center justify-between"
          style={{ borderBottom: "1px solid #1e293b", background: "#0a0f1a" }}
        >
          <span className="text-sm font-medium">My Films</span>
          <Badge color="#E63946">3 films</Badge>
        </div>
        <div style={{ background: "#050b14" }}>
          {FILMS.map((film) => (
            <div
              key={film.id}
              className="flex items-center gap-4 px-5 py-4 transition-all hover:bg-white/5"
              style={{ borderBottom: "1px solid #0f172a" }}
            >
              <FilmPoster film={film} size="sm" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">{film.title}</span>
                  <Badge
                    color={film.status === "active" ? "#22c55e" : "#F4A261"}
                  >
                    {film.status}
                  </Badge>
                </div>
                <div
                  className="text-xs mb-2"
                  style={{ color: "#475569" }}
                >
                  {film.genre} · {film.cinemaCount} cinemas · Dir.{" "}
                  {film.director}
                </div>
                <MiniBar
                  value={film.totalTickets}
                  max={100000}
                  color={film.color}
                />
              </div>
              <div className="text-right flex-shrink-0">
                <div className="font-bold text-sm">
                  {formatNaira(film.totalRevenue)}
                </div>
                <div className="text-xs" style={{ color: "#475569" }}>
                  {formatNum(film.totalTickets)} tickets
                </div>
              </div>
              <SimpleChart
                data={film.weeklyData}
                color={film.color}
                height={40}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* City breakdown */}
        <div
          className="rounded-xl p-5"
          style={{ background: "#0a0f1a", border: "1px solid #1e293b" }}
        >
          <div className="text-sm font-medium mb-4">
            Revenue by City — RED CIRCLE
          </div>
          {Object.entries(FILMS[0].cities).map(([city, tickets]) => (
            <div key={city} className="flex items-center gap-3 mb-3">
              <div
                className="text-xs w-24 flex-shrink-0"
                style={{ color: "#64748b" }}
              >
                {city}
              </div>
              <div className="flex-1">
                <MiniBar value={tickets} max={1200} color="#E63946" />
              </div>
              <div
                className="text-xs w-16 text-right"
                style={{ color: "#94a3b8" }}
              >
                {formatNum(tickets)}
              </div>
            </div>
          ))}
        </div>

        {/* Notifications */}
        <div
          className="rounded-xl p-5"
          style={{ background: "#0a0f1a", border: "1px solid #1e293b" }}
        >
          <div className="text-sm font-medium mb-4">Notifications</div>
          {NOTIFICATIONS.map((n) => (
            <div
              key={n.id}
              className="flex items-start gap-3 mb-3 pb-3"
              style={{ borderBottom: "1px solid #0f172a" }}
            >
              <div
                className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                style={{
                  background:
                    n.type === "success"
                      ? "#22c55e"
                      : n.type === "warning"
                      ? "#f59e0b"
                      : "#3b82f6",
                }}
              />
              <div className="flex-1">
                <div className="text-xs">{n.text}</div>
                <div className="text-xs mt-0.5" style={{ color: "#334155" }}>
                  {n.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
