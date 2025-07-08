import type { Metadata } from "next";
import { BackgroundProvider } from "@/components/BackgroundProvider";
import BackgroundSwitcher from "@/components/BackgroundSwitcher";
import { TagHighlightProvider } from "@/components/TagHighlightContext";
import "./globals.css";

// Font Configuration System - Modern, Technical Typography with Array & Outfit
// Using local font files for optimal performance and control

export const metadata: Metadata = {
  title: "Parth Chandak | Portfolio",
  description: "Creative technologist specializing in cutting-edge human-computer interaction for autonomous vehicles and robotics.",
  icons: {
    icon: {
      url: "/favicon.svg",
      type: "image/svg+xml",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-black text-white">
        <BackgroundProvider>
          <TagHighlightProvider>
            {children}
            <BackgroundSwitcher />
          </TagHighlightProvider>
        </BackgroundProvider>
      </body>
    </html>
  );
}
