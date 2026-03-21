"use client";

import React from "react";

// ─── MINI BAR ────────────────────────────────────────────────────────────────
interface MiniBarProps {
  value: number;
  max: number;
  color: string;
}
export function MiniBar({ value, max, color }: MiniBarProps) {
  return (
    <div className="w-full h-1.5 rounded-full" style={{ background: "#ffffff10" }}>
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{ width: `${Math.min((value / max) * 100, 100)}%`, background: color }}
      />
    </div>
  );
}

// ─── STAT CARD ───────────────────────────────────────────────────────────────
interface StatCardProps {
  label: string;
  value: string;
  sub: string;
  color: string;
  icon: string;
}
export function StatCard({ label, value, sub, color, icon }: StatCardProps) {
  return (
    <div
      className="rounded-xl p-4 relative overflow-hidden"
      style={{ background: "#0f172a", border: "1px solid #1e293b" }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="text-2xl">{icon}</div>
        <div
          className="text-xs px-2 py-0.5 rounded-full"
          style={{ background: `${color}22`, color }}
        >
          {sub}
        </div>
      </div>
      <div className="text-2xl font-bold mb-1" style={{ color }}>
        {value}
      </div>
      <div className="text-xs" style={{ color: "#64748b" }}>
        {label}
      </div>
      <div
        className="absolute bottom-0 right-0 w-16 h-16 rounded-tl-full opacity-5"
        style={{ background: color }}
      />
    </div>
  );
}

// ─── SIMPLE CHART ────────────────────────────────────────────────────────────
interface SimpleChartProps {
  data: number[];
  color: string;
  height?: number;
}
export function SimpleChart({ data, color, height = 60 }: SimpleChartProps) {
  const max = Math.max(...data);
  return (
    <div className="flex items-end gap-1" style={{ height }}>
      {data.map((v, i) => (
        <div
          key={i}
          className="flex-1 rounded-t transition-all duration-500"
          style={{
            height: `${(v / max) * 100}%`,
            background: `${color}${i === data.length - 1 ? "ff" : "66"}`,
          }}
        />
      ))}
    </div>
  );
}

// ─── BADGE ───────────────────────────────────────────────────────────────────
interface BadgeProps {
  children: React.ReactNode;
  color?: string;
}
export function Badge({ children, color = "#3b82f6" }: BadgeProps) {
  return (
    <span
      className="text-xs px-2 py-0.5 rounded-full font-medium"
      style={{ background: `${color}22`, color }}
    >
      {children}
    </span>
  );
}

// ─── AVATAR ──────────────────────────────────────────────────────────────────
interface AvatarProps {
  initials: string;
  color?: string;
  size?: "sm" | "md";
}
export function Avatar({ initials, color = "#3b82f6", size = "sm" }: AvatarProps) {
  const s = size === "sm" ? "w-8 h-8 text-xs" : "w-10 h-10 text-sm";
  return (
    <div
      className={`${s} rounded-full flex items-center justify-center font-bold flex-shrink-0`}
      style={{
        background: `${color}33`,
        color,
        border: `1px solid ${color}44`,
      }}
    >
      {initials}
    </div>
  );
}
