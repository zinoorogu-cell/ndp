"use client";

import { useState } from "react";
import { UserRole, USERS, ROLE_COLORS } from "@/lib/data";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";

// Screens
import ProducerOverview from "@/components/screens/ProducerOverview";
import ProducerFilms from "@/components/screens/ProducerFilms";
import SubmitFilm from "@/components/screens/SubmitFilm";
import AnalyticsView from "@/components/screens/AnalyticsView";
import MarketingView from "@/components/screens/MarketingView";
import ChatView from "@/components/screens/ChatView";
import CinemaOverview from "@/components/screens/CinemaOverview";
import AdminOverview from "@/components/screens/AdminOverview";
import AdminFilms from "@/components/screens/AdminFilms";
import AdminCinemas from "@/components/screens/AdminCinemas";
import AdminReports from "@/components/screens/AdminReports";

const SCREEN_TITLES: Record<string, string> = {
  overview_producer: "Producer Dashboard",
  overview_cinema: "Cinema Dashboard",
  overview_admin: "Master Control Panel",
  films: "My Films",
  submit: "Submit New Film",
  analytics: "Analytics & Performance",
  marketing: "Marketing Assets",
  distribution: "Distribution Request",
  chat: "Messages & Support",
  requests: "Film Requests",
  schedule: "Showtime Manager",
  sales: "Sales Reports",
  cinemas: "Cinema Network",
  reports: "Reports & Exports",
};

interface DashboardProps {
  role: UserRole;
  onLogout: () => void;
  onRoleChange: (r: UserRole) => void;
}

export default function Dashboard({ role, onLogout, onRoleChange }: DashboardProps) {
  const [activeScreen, setActiveScreen] = useState("overview");
  const user = USERS[role];
  const color = ROLE_COLORS[role];

  const titleKey =
    activeScreen === "overview"
      ? `overview_${role}`
      : activeScreen;
  const title = SCREEN_TITLES[titleKey] ?? "Dashboard";

  const renderScreen = () => {
    if (activeScreen === "chat") return <ChatView />;
    if (activeScreen === "submit") return <SubmitFilm />;
    if (activeScreen === "analytics") return <AnalyticsView role={role} />;
    if (activeScreen === "marketing") return <MarketingView />;

    if (role === "producer") {
      if (activeScreen === "overview") return <ProducerOverview />;
      if (activeScreen === "films") return <ProducerFilms />;
      return <ComingSoon />;
    }

    if (role === "cinema") {
      // All cinema screens fall back to CinemaOverview for now
      return <CinemaOverview />;
    }

    if (role === "admin") {
      if (activeScreen === "overview") return <AdminOverview />;
      if (activeScreen === "films") return <AdminFilms />;
      if (activeScreen === "cinemas") return <AdminCinemas />;
      if (activeScreen === "reports") return <AdminReports />;
      return <ComingSoon />;
    }

    return <ComingSoon />;
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        background: "#020408",
        color: "#e2e8f0",
        overflow: "hidden",
      }}
    >
      <Sidebar
        role={role}
        active={activeScreen}
        setActive={setActiveScreen}
        user={user}
        onLogout={onLogout}
      />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <TopBar title={title} role={role} />
        <div style={{ flex: 1, overflowY: "auto" }}>{renderScreen()}</div>
      </div>

      {/* Role switcher pill */}
      <div className="fixed bottom-4 right-4 flex flex-col gap-1.5 z-50">
        {(
          [
            ["producer", "#E63946", "P"],
            ["cinema", "#F4A261", "C"],
            ["admin", "#2A9D8F", "A"],
          ] as [UserRole, string, string][]
        ).map(([r, c, l]) => (
          <button
            key={r}
            onClick={() => {
              if (r !== role) {
                onRoleChange(r);
                setActiveScreen("overview");
              }
            }}
            title={`${r.charAt(0).toUpperCase() + r.slice(1)} view`}
            className="w-9 h-9 rounded-full text-xs font-bold text-white transition-all hover:scale-110"
            style={{
              background: r === role ? c : "#1e293b",
              opacity: r === role ? 1 : 0.6,
              cursor: r === role ? "default" : "pointer",
            }}
          >
            {l}
          </button>
        ))}
      </div>
    </div>
  );
}

function ComingSoon() {
  return (
    <div
      className="flex items-center justify-center"
      style={{ height: "400px", color: "#334155" }}
    >
      <div className="text-center">
        <div className="text-4xl mb-3">🚧</div>
        <div className="text-sm">This section is coming soon</div>
      </div>
    </div>
  );
}
