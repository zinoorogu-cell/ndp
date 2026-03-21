"use client";

import { Film, GENRE_ICONS } from "@/lib/data";

type Size = "sm" | "md" | "lg";

const SIZES: Record<Size, string> = {
  sm: "w-12 h-16",
  md: "w-20 h-28",
  lg: "w-32 h-44",
};

const FONT_SIZES: Record<Size, string> = {
  sm: "8px",
  md: "9px",
  lg: "11px",
};

interface FilmPosterProps {
  film: Film;
  size?: Size;
}

export default function FilmPoster({ film, size = "md" }: FilmPosterProps) {
  return (
    <div
      className={`${SIZES[size]} rounded-lg flex flex-col items-center justify-center relative overflow-hidden flex-shrink-0`}
      style={{
        background: `linear-gradient(135deg, ${film.color}22, ${film.color}55)`,
        border: `1px solid ${film.color}44`,
      }}
    >
      <div
        style={{
          background: film.color,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
        }}
      />
      <div className="text-2xl mb-1">{GENRE_ICONS[film.genre] ?? "🎬"}</div>
      <div
        className="text-xs font-bold text-center px-1 leading-tight"
        style={{ color: film.accentColor, fontSize: FONT_SIZES[size] }}
      >
        {film.title}
      </div>
    </div>
  );
}
