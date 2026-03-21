"use client";

import { useState } from "react";

interface FormState {
  title: string;
  genre: string;
  language: string;
  duration: string;
  director: string;
  synopsis: string;
  releaseDate: string;
}

const INPUT_STYLE: React.CSSProperties = {
  background: "#0a0f1a",
  border: "1px solid #1e293b",
  borderRadius: "8px",
  color: "white",
  padding: "10px 12px",
  fontSize: "14px",
  width: "100%",
  outline: "none",
};

const LABEL_STYLE: React.CSSProperties = {
  color: "#64748b",
  fontSize: "12px",
  marginBottom: "6px",
  display: "block",
};

export default function SubmitFilm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormState>({
    title: "",
    genre: "Thriller",
    language: "English",
    duration: "",
    director: "",
    synopsis: "",
    releaseDate: "",
  });

  const update = (k: keyof FormState, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const reset = () => {
    setSubmitted(false);
    setStep(1);
    setForm({
      title: "",
      genre: "Thriller",
      language: "English",
      duration: "",
      director: "",
      synopsis: "",
      releaseDate: "",
    });
  };

  if (submitted) {
    return (
      <div
        className="p-6 flex items-center justify-center"
        style={{ minHeight: "400px" }}
      >
        <div className="text-center">
          <div className="text-5xl mb-4">🎉</div>
          <h2
            className="text-2xl font-bold mb-2 font-syne"
          >
            Film Submitted!
          </h2>
          <p className="mb-6" style={{ color: "#64748b" }}>
            Your film is under review. You&apos;ll hear back within 48 hours.
          </p>
          <button
            onClick={reset}
            className="px-6 py-2 rounded-lg text-sm font-medium text-white hover:opacity-90"
            style={{ background: "#E63946" }}
          >
            Submit Another Film
          </button>
        </div>
      </div>
    );
  }

  const STEPS = ["Film Details", "Upload Assets", "Distribution"];

  return (
    <div className="p-6 max-w-2xl">
      {/* Step indicator */}
      <div className="flex items-center gap-4 mb-8">
        {STEPS.map((label, i) => {
          const s = i + 1;
          return (
            <div key={s} className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all"
                style={{
                  background: step >= s ? "#E63946" : "#0a0f1a",
                  color: step >= s ? "white" : "#475569",
                  border: step >= s ? "none" : "1px solid #1e293b",
                }}
              >
                {s}
              </div>
              <span
                className="text-sm"
                style={{ color: step === s ? "white" : "#334155" }}
              >
                {label}
              </span>
              {s < STEPS.length && (
                <div className="w-8 h-px" style={{ background: "#1e293b" }} />
              )}
            </div>
          );
        })}
      </div>

      {/* Step 1 */}
      {step === 1 && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label style={LABEL_STYLE}>Film Title *</label>
              <input
                style={INPUT_STYLE}
                placeholder="e.g. RED CIRCLE"
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
              />
            </div>
            <div>
              <label style={LABEL_STYLE}>Genre *</label>
              <select
                style={INPUT_STYLE}
                value={form.genre}
                onChange={(e) => update("genre", e.target.value)}
              >
                {[
                  "Thriller",
                  "Drama",
                  "Action",
                  "Comedy",
                  "Romance",
                  "Horror",
                ].map((g) => (
                  <option key={g}>{g}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label style={LABEL_STYLE}>Director *</label>
              <input
                style={INPUT_STYLE}
                placeholder="Director name"
                value={form.director}
                onChange={(e) => update("director", e.target.value)}
              />
            </div>
            <div>
              <label style={LABEL_STYLE}>Duration</label>
              <input
                style={INPUT_STYLE}
                placeholder="e.g. 120 min"
                value={form.duration}
                onChange={(e) => update("duration", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label style={LABEL_STYLE}>Language</label>
              <select
                style={INPUT_STYLE}
                value={form.language}
                onChange={(e) => update("language", e.target.value)}
              >
                {[
                  "English",
                  "Yoruba",
                  "Igbo",
                  "Hausa",
                  "English / Yoruba",
                  "English / Igbo",
                ].map((l) => (
                  <option key={l}>{l}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={LABEL_STYLE}>Desired Release Date</label>
              <input
                type="date"
                style={INPUT_STYLE}
                value={form.releaseDate}
                onChange={(e) => update("releaseDate", e.target.value)}
              />
            </div>
          </div>

          <div>
            <label style={LABEL_STYLE}>Synopsis</label>
            <textarea
              style={{ ...INPUT_STYLE, height: "100px", resize: "vertical" }}
              placeholder="Brief film synopsis..."
              value={form.synopsis}
              onChange={(e) => update("synopsis", e.target.value)}
            />
          </div>

          <button
            onClick={() => setStep(2)}
            className="px-6 py-2.5 rounded-xl text-sm font-medium text-white hover:opacity-90"
            style={{ background: "#E63946" }}
          >
            Next: Upload Assets →
          </button>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div className="space-y-4">
          {(
            [
              ["Film Poster", "JPG, PNG — 1000x1500px recommended", "🖼"],
              ["Trailer", "MP4, MOV — Max 500MB", "🎬"],
              ["Press Kit", "PDF, ZIP — Press materials", "📦"],
            ] as [string, string, string][]
          ).map(([label, hint, icon]) => (
            <div
              key={label}
              className="rounded-xl p-6 text-center cursor-pointer transition-all hover:border-white/20"
              style={{
                border: "2px dashed #1e293b",
                background: "#0a0f1a",
              }}
            >
              <div className="text-3xl mb-2">{icon}</div>
              <div className="font-medium text-sm mb-1">{label}</div>
              <div className="text-xs" style={{ color: "#475569" }}>
                {hint}
              </div>
              <div
                className="mt-3 px-4 py-1.5 rounded-lg text-xs inline-block"
                style={{ background: "#1e293b", color: "#94a3b8" }}
              >
                Choose File
              </div>
            </div>
          ))}

          <div className="flex gap-3">
            <button
              onClick={() => setStep(1)}
              className="px-6 py-2.5 rounded-xl text-sm"
              style={{ border: "1px solid #1e293b", color: "#64748b" }}
            >
              ← Back
            </button>
            <button
              onClick={() => setStep(3)}
              className="px-6 py-2.5 rounded-xl text-sm font-medium text-white hover:opacity-90"
              style={{ background: "#E63946" }}
            >
              Next: Distribution →
            </button>
          </div>
        </div>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <div className="space-y-4">
          <div>
            <label style={LABEL_STYLE}>Release Type</label>
            <div className="flex gap-3">
              {["Nationwide", "Limited", "Exclusive"].map((t) => (
                <button
                  key={t}
                  className="px-4 py-2 rounded-lg text-sm transition-all hover:border-white/30"
                  style={{
                    background: "#0a0f1a",
                    border: "1px solid #1e293b",
                    color: "#94a3b8",
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={LABEL_STYLE}>Select Cities</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                "Lagos",
                "Abuja",
                "Port Harcourt",
                "Enugu",
                "Ibadan",
                "Benin",
                "Calabar",
              ].map((city) => (
                <div
                  key={city}
                  className="flex items-center gap-2 p-3 rounded-lg cursor-pointer hover:bg-white/5"
                  style={{ border: "1px solid #1e293b", background: "#0a0f1a" }}
                >
                  <div
                    className="w-4 h-4 rounded border flex items-center justify-center"
                    style={{ borderColor: "#1e293b" }}
                  />
                  <span className="text-sm">{city}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep(2)}
              className="px-6 py-2.5 rounded-xl text-sm"
              style={{ border: "1px solid #1e293b", color: "#64748b" }}
            >
              ← Back
            </button>
            <button
              onClick={() => setSubmitted(true)}
              className="px-8 py-2.5 rounded-xl text-sm font-medium text-white hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, #E63946, #c0313d)",
              }}
            >
              Submit Film for Distribution →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
