import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Greek Trip Planner - Your Perfect Greece Adventure",
  description: "AI-powered trip planning for Greece with personalized itineraries, insider tips, and realistic logistics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
