import type { Metadata } from "next";
import { IBM_Plex_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-plex",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://starbounded.com"),
  title: {
    default: "Starbounded Studio",
    template: "%s | Starbounded Studio",
  },
  description:
    "Starbounded Studio builds open-source software for interactive worlds, including the Lux Engine game engine.",
  openGraph: {
    title: "Starbounded Studio",
    description:
      "Open-source software studio building the Lux Engine game engine and companion tools.",
    url: "https://starbounded.com",
    siteName: "Starbounded Studio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Starbounded Studio",
    description:
      "Open-source software studio building the Lux Engine game engine and companion tools.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${plexSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
