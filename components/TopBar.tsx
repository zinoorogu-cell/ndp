"use client";

import { UserRole, ROLE_COLORS } from "@/lib/data";
import LiveTicker from "@/components/LiveTicker";

interface TopBarProps {
  title: string;
  role: UserRole;
  notifCount?: number;
}

export default function TopBar({ title, role, notifCount = 4 }: TopBarProps) {
  const color = ROLE_COLORS[role];

  const today = new Date().toLocaleDateString("en-NG", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div
      className="flex items-center justify-between px-6 py-4"
      style={{ borderBottom: "1px solid #0f172a", background: "#050b14" }}
    >
      <div>
        <h1 className="font-semibold text-white">{title}</h1>
        <div className="text-xs mt-0.5" style={{ color: "#334155" }}>
          {today}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <LiveTicker />
        <div className="relative">
          <button
            className="w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ background: "#0a0f1a", border: "1px solid #1e293b" }}
          >
            <span className="text-base">🔔</span>
          </button>
          {notifCount > 0 && (
            <div
              className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-xs flex items-center justify-center text-white"
              style={{ background: color, fontSize: "9px" }}
            >
              {notifCount}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
