"use client";

import { useState } from "react";
import { UserRole } from "@/lib/data";
import LandingPage from "@/components/LandingPage";
import Dashboard from "@/components/Dashboard";

type Page = "landing" | "app";

export default function NDPApp() {
  const [page, setPage] = useState<Page>("landing");
  const [role, setRole] = useState<UserRole>("producer");

  const handleEnter = (r: UserRole) => {
    setRole(r);
    setPage("app");
  };

  const handleLogout = () => {
    setPage("landing");
  };

  const handleRoleChange = (r: UserRole) => {
    setRole(r);
  };

  if (page === "app") {
    return (
      <Dashboard
        role={role}
        onLogout={handleLogout}
        onRoleChange={handleRoleChange}
      />
    );
  }

  return <LandingPage onEnter={handleEnter} />;
}
