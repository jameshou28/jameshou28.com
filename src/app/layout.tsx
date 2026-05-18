import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import SiteParticleBackground from "@/components/ui/SiteParticleBackground";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

const siteDescription =
  "James Hou's portfolio featuring software, AI, and hardware projects across programming, web, and robotics.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "James Hou",
    template: "James Hou | %s",
  },
  description: siteDescription,
  applicationName: "James Hou Portfolio",
  keywords: [
    "James Hou",
    "software engineer",
    "programming portfolio",
    "AI",
    "web development",
    "robotics",
    "3D",
  ],
  authors: [{ name: "James Hou" }],
  creator: "James Hou",
  publisher: "James Hou",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    title: "James Hou",
    description: siteDescription,
    url: "/",
    siteName: "James Hou",
    images: [
      {
        url: "/images/profile.jpg",
        alt: "James Hou",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "James Hou",
    description: siteDescription,
    images: ["/images/profile.jpg"],
  },
  icons: {
    icon: "/images/favicon.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${dmSans.variable} antialiased bg-[var(--bg-primary)] text-[var(--text-primary)]`}
        suppressHydrationWarning
      >
        <CustomCursor />
        <SiteParticleBackground />
        <div className="relative z-10 flex min-h-screen flex-col">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
