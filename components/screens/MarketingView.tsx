"use client";

import { FILMS } from "@/lib/data";
import { Badge } from "@/components/ui";
import FilmPoster from "@/components/ui/FilmPoster";

const ASSET_TYPES = [
  { label: "Film Poster", icon: "🖼", size: "1000×1500px" },
  { label: "Trailer", icon: "🎬", size: "1920×1080px" },
  { label: "Social Square", icon: "📱", size: "1080×1080px" },
  { label: "Billboard", icon: "🏙", size: "6000×2000px" },
  { label: "Press Kit", icon: "📦", size: "PDF" },
];

export default function MarketingView() {
  return (
    <div className="p-6 space-y-6">
      <div className="text-sm" style={{ color: "#64748b" }}>
        Manage and upload marketing assets for your films.
      </div>

      {FILMS.map((film) => (
        <div
          key={film.id}
          className="rounded-xl overflow-hidden"
          style={{ border: `1px solid ${film.color}33` }}
        >
          {/* Film header */}
          <div
            className="flex items-center gap-3 px-5 py-3"
            style={{
              background: `${film.color}11`,
              borderBottom: `1px solid ${film.color}22`,
            }}
          >
            <FilmPoster film={film} size="sm" />
            <div>
              <div className="font-bold">{film.title}</div>
              <Badge color={film.color}>{film.genre}</Badge>
            </div>
          </div>

          {/* Asset grid */}
          <div
            className="grid grid-cols-2 md:grid-cols-5 gap-3 p-5"
            style={{ background: "#050b14" }}
          >
            {ASSET_TYPES.map((asset) => (
              <div
                key={asset.label}
                className="rounded-xl p-4 text-center cursor-pointer transition-all hover:border-white/20"
                style={{ border: "1px dashed #1e293b", background: "#0a0f1a" }}
              >
                <div className="text-2xl mb-1">{asset.icon}</div>
                <div className="text-xs font-medium mb-0.5">{asset.label}</div>
                <div className="text-xs" style={{ color: "#475569" }}>
                  {asset.size}
                </div>
                <div
                  className="mt-2 text-xs px-2 py-1 rounded-md inline-block"
                  style={{
                    background: `${film.color}22`,
                    color: film.accentColor,
                  }}
                >
                  Upload
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
