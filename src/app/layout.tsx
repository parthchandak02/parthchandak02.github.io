import type { Metadata } from "next";
import { Montserrat, Source_Sans_3 } from "next/font/google";
import "./globals.css";

// Font Configuration System
// Navigation Font - Clean, geometric, perfect for all-caps
const navigationFont = Montserrat({
  variable: "--font-navigation",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Title/Subtitle Font - Strong display font for impact
// Using Source Sans Pro for now, will add Clash Display later
const titleFont = Source_Sans_3({
  variable: "--font-title",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

// Secondary/Body Font - Excellent readability for details
const secondaryFont = Source_Sans_3({
  variable: "--font-secondary",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Parth Chandak | Portfolio",
  description: "Interactive portfolio showcasing engineering, research, and creative work",
  icons: {
    icon: [
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
      },
      {
        url: '/favicon.ico',
        sizes: '32x32',
        type: 'image/x-icon',
      }
    ],
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
      <body
        className={`${navigationFont.variable} ${titleFont.variable} ${secondaryFont.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
