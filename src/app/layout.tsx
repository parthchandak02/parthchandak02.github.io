import type { Metadata } from "next";
import "./globals.css";

// Font Configuration System - Modern, Technical Typography with Array & Outfit
// Using local font files for optimal performance and control

export const metadata: Metadata = {
  title: "Parth Chandak | Portfolio",
  description: "Interactive portfolio showcasing engineering, research, and creative work",
  icons: {
    icon: {
      url: '/favicon.svg',
      type: 'image/svg+xml',
    },
    apple: {
      url: '/favicon.svg',
      type: 'image/svg+xml',
    }
  },
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
