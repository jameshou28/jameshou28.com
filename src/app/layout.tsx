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

const canonicalBase = "https://jameshou28.com";
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.NODE_ENV === "production" ? canonicalBase : "http://localhost:3000");

const siteDescription =
  "James Hou is a high school software & hardware engineer building mobile apps, websites, AI projects, and more.";

const personStructuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "James Hou",
  url: siteUrl,
  jobTitle: "Software & Hardware Engineer",
  sameAs: ["https://github.com/jameshou28", "https://www.linkedin.com/in/jameshou28/"],
};

export const metadata: Metadata = {
  metadataBase: new URL(canonicalBase),
  title: "James Hou | Software & Hardware Engineer",
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
    title: "James Hou | Software & Hardware Engineer",
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
    title: "James Hou | Software & Hardware Engineer",
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personStructuredData) }}
        />
      </head>
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
