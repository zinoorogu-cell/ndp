"use client";

import { UserRole, ROLE_COLORS, User } from "@/lib/data";
import { Avatar } from "@/components/ui";

interface MenuItem {
  id: string;
  icon: string;
  label: string;
}

const MENUS: Record<UserRole, MenuItem[]> = {
  producer: [
    { id: "overview", icon: "◈", label: "Overview" },
    { id: "films", icon: "🎬", label: "My Films" },
    { id: "submit", icon: "+", label: "Submit Film" },
    { id: "analytics", icon: "◉", label: "Analytics" },
    { id: "marketing", icon: "◎", label: "Marketing" },
    { id: "distribution", icon: "→", label: "Distribution" },
    { id: "chat", icon: "◷", label: "Messages" },
  ],
  cinema: [
    { id: "overview", icon: "◈", label: "Overview" },
    { id: "requests", icon: "📥", label: "Film Requests" },
    { id: "schedule", icon: "◷", label: "Showtimes" },
    { id: "sales", icon: "₦", label: "Sales Report" },
    { id: "chat", icon: "◎", label: "Messages" },
  ],
  admin: [
    { id: "overview", icon: "◈", label: "Master Control" },
    { id: "films", icon: "🎬", label: "All Films" },
    { id: "cinemas", icon: "🏢", label: "Cinema Network" },
    { id: "analytics", icon: "◉", label: "Box Office" },
    { id: "reports", icon: "📄", label: "Reports" },
    { id: "chat", icon: "◷", label: "Support Chat" },
  ],
};

interface SidebarProps {
  role: UserRole;
  active: string;
  setActive: (id: string) => void;
  user: User;
  onLogout: () => void;
}

export default function Sidebar({
  role,
  active,
  setActive,
  user,
  onLogout,
}: SidebarProps) {
  const color = ROLE_COLORS[role];
  const items = MENUS[role];

  return (
    <div
      className="flex flex-col h-full"
      style={{
        background: "#050b14",
        borderRight: "1px solid #0f172a",
        width: "220px",
        flexShrink: 0,
      }}
    >
      {/* Logo */}
      <div
        className="p-4 flex items-center gap-3"
        style={{ borderBottom: "1px solid #0f172a" }}
      >
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{
            background: `linear-gradient(135deg, ${color}, ${color}88)`,
          }}
        >
          <span className="text-white text-xs font-bold">N</span>
        </div>
        <div>
          <div className="text-xs font-bold font-syne">NDP</div>
          <div className="text-xs" style={{ color: "#334155" }}>
            Nile Distribution
          </div>
        </div>
      </div>

      {/* Nav items */}
      <div className="p-3 flex-1 overflow-y-auto">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm mb-0.5 transition-all text-left"
            style={{
              background: active === item.id ? `${color}18` : "transparent",
              color: active === item.id ? color : "#475569",
              borderLeft:
                active === item.id
                  ? `2px solid ${color}`
                  : "2px solid transparent",
            }}
          >
            <span className="text-base w-5 text-center flex-shrink-0">
              {item.icon}
            </span>
            <span className={active === item.id ? "font-medium" : ""}>
              {item.label}
            </span>
          </button>
        ))}
      </div>

      {/* User footer */}
      <div className="p-3" style={{ borderTop: "1px solid #0f172a" }}>
        <div
          className="flex items-center gap-2 p-2 rounded-lg mb-2"
          style={{ background: "#0a0f1a" }}
        >
          <Avatar initials={user.avatar} color={color} />
          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium truncate">{user.name}</div>
            <div className="text-xs capitalize" style={{ color: "#475569" }}>
              {user.role}
            </div>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="w-full text-xs py-1.5 rounded-lg transition-all hover:text-white"
          style={{ color: "#475569", border: "1px solid #0f172a" }}
        >
          ← Sign Out
        </button>
      </div>
    </div>
  );
}
