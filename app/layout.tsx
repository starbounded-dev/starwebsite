import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Mona_Sans } from "next/font/google";
import "./globals.css";
import { InteractionProvider } from "@/components/InteractionProvider";

// One family carries the brand: the width axis gives headlines their wide voice.
const monaSans = Mona_Sans({
  subsets: ["latin"],
  variable: "--font-mona",
  display: "swap",
  axes: ["wdth"],
});

// Monospace is reserved for commands and code.
const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-code",
  display: "swap",
  weight: ["400", "500"],
});

const description =
  "Starbounded is an independent software company making tools for people who build games and interactive worlds. Our first product is LuxEngine, an open-source 3D game engine.";

export const metadata: Metadata = {
  metadataBase: new URL("https://starbounded.com"),
  title: {
    default: "Starbounded — Tools for people who build worlds",
    template: "%s | Starbounded",
  },
  description,
  openGraph: {
    title: "Starbounded — Tools for people who build worlds",
    description,
    url: "https://starbounded.com",
    siteName: "Starbounded",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/lux-dist-renderer.webp",
        width: 3840,
        height: 2088,
        alt: "Sponza running in the LuxEngine editor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Starbounded — Tools for people who build worlds",
    description,
  },
};

// Matches the dark default page colour (--paper).
export const viewport: Viewport = {
  themeColor: "#0c0c12",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Dark is the house default; a stored choice wins.
  const themeScript = `
    try {
      if (!sessionStorage.getItem("starbounded-entry-seen")) {
        document.documentElement.dataset.entry = "ready";
        sessionStorage.setItem("starbounded-entry-seen", "true");
      }
    } catch { /* Entry animation is optional when storage is unavailable. */ }
    try {
      const stored = localStorage.getItem("starbounded-theme");
      const theme = stored === "light" || stored === "dark" ? stored : "dark";
      document.documentElement.dataset.theme = theme;
      document.documentElement.style.colorScheme = theme;
    } catch {
      document.documentElement.dataset.theme = "dark";
      document.documentElement.style.colorScheme = "dark";
    }
  `;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      {/* Browser extensions can add attributes before React hydrates this element. */}
      <body
        suppressHydrationWarning
        className={`${monaSans.variable} ${jetBrainsMono.variable} antialiased`}
      >
        <InteractionProvider>{children}</InteractionProvider>
      </body>
    </html>
  );
}
