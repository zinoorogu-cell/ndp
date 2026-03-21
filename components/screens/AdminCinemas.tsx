"use client";

import { CINEMAS, formatNaira } from "@/lib/data";
import { Badge } from "@/components/ui";

export default function AdminCinemas() {
  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm" style={{ color: "#64748b" }}>
          {CINEMAS.length} cinemas across 7 cities
        </div>
        <button
          className="px-4 py-2 rounded-lg text-sm font-medium text-white hover:opacity-90"
          style={{ background: "#2A9D8F" }}
        >
          + Add Cinema
        </button>
      </div>

      <div
        className="rounded-xl overflow-hidden"
        style={{ border: "1px solid #1e293b" }}
      >
        {/* Table header */}
        <div
          className="grid grid-cols-6 gap-4 px-5 py-3 text-xs font-medium"
          style={{
            background: "#0a0f1a",
            borderBottom: "1px solid #1e293b",
            color: "#475569",
          }}
        >
          <div className="col-span-2">Cinema</div>
          <div>City</div>
          <div>Screens</div>
          <div>Revenue</div>
          <div>Status</div>
        </div>

        {/* Rows */}
        {CINEMAS.map((cinema) => (
          <div
            key={cinema.id}
            className="grid grid-cols-6 gap-4 px-5 py-4 items-center hover:bg-white/5 transition-colors"
            style={{
              borderBottom: "1px solid #0f172a",
              background: "#050b14",
            }}
          >
            <div className="col-span-2">
              <div className="text-sm font-medium">{cinema.name}</div>
              <div className="text-xs mt-0.5" style={{ color: "#475569" }}>
                {cinema.capacity} seat capacity
              </div>
            </div>
            <div className="text-sm">{cinema.city}</div>
            <div className="text-sm">{cinema.screens}</div>
            <div className="text-sm font-medium">
              {formatNaira(cinema.revenue)}
            </div>
            <Badge
              color={cinema.status === "active" ? "#22c55e" : "#f59e0b"}
            >
              {cinema.status}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
}
