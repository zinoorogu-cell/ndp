import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nile Distribution Platform — The OS for Film Distribution in Africa",
  description:
    "Distribute your film across cinemas in Nigeria and Africa from one dashboard. Track box office performance, manage cinema releases, and reach audiences nationwide.",
  keywords: [
    "film distribution",
    "Nigeria cinema",
    "Nollywood",
    "box office",
    "Africa film",
  ],
  openGraph: {
    title: "Nile Distribution Platform",
    description: "The Operating System for Film Distribution in Africa",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
