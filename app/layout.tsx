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
    default: "Starbounded Studio — Small studio. Big workbench.",
    template: "%s | Starbounded Studio",
  },
  description:
    "An independent studio in Canada, building the LuxEngine game engine and sharing the work as we go.",
  openGraph: {
    title: "Starbounded Studio",
    description:
      "An independent studio in Canada, building LuxEngine and sharing the work as we go.",
    url: "https://starbounded.com",
    siteName: "Starbounded Studio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/lux-editor-sponza.webp",
        width: 3839,
        height: 2088,
        alt: "Sponza running in the LuxEngine editor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Starbounded Studio",
    description:
      "An independent studio in Canada, building LuxEngine and sharing the work as we go.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeScript = `
    try {
      const stored = localStorage.getItem("starbounded-theme");
      const theme = stored === "light" || stored === "dark" ? stored : "light";
      document.documentElement.dataset.theme = theme;
      document.documentElement.style.colorScheme = theme;
    } catch {
      document.documentElement.dataset.theme = "light";
      document.documentElement.style.colorScheme = "light";
    }
  `;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${plexSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
