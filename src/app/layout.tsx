import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/contexts/ThemeContext";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://myselfkarim.vercel.app'),
  title: {
    default: "Md Rezaul Karim — Bridging Business Operations & Technology",
    template: "%s | Md Rezaul Karim"
  },
  description: "Master's student in IMIS | Supply Chain Optimizer | Founder. Bridging business operations and technology through process analytics, data-driven insights, and digital transformation. Based in Germany.",
  keywords: [
    "Rezaul Karim",
    "Supply Chain Optimization",
    "Operations Management",
    "Process Analytics",
    "SAP Signavio",
    "BPMN",
    "Power BI",
    "Data Analytics",
    "Digital Transformation",
    "IMIS",
    "Founder",
    "Germany",
    "International Management"
  ],
  authors: [{ name: "Md Rezaul Karim", url: "https://linkedin.com/in/myselfkarim" }],
  creator: "Md Rezaul Karim",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://myselfkarim.vercel.app",
    siteName: "Md Rezaul Karim",
    title: "Md Rezaul Karim — Bridging Business Operations & Technology",
    description: "Master's student in IMIS | Supply Chain Optimizer | Founder. Bridging business operations and technology through process analytics and digital transformation.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Md Rezaul Karim - Operations & Technology",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Md Rezaul Karim — Bridging Business Operations & Technology",
    description: "Master's student in IMIS | Supply Chain Optimizer | Founder. Bridging operations and technology.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Icons are auto-detected from src/app/icon.jpg and apple-icon.jpg
  manifest: "/manifest.json",
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Md Rezaul Karim",
  url: "https://myselfkarim.vercel.app",
  image: "https://myselfkarim.vercel.app/images/profile.jpg",
  sameAs: [
    "https://linkedin.com/in/myselfkarim",
    "https://github.com/myselfrezaul7",
  ],
  jobTitle: "Operations & Technology Strategist | IMIS Master's Student",
  worksFor: {
    "@type": "Organization",
    name: "South Westphalia University of Applied Sciences",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "South Westphalia University of Applied Sciences",
  },
  knowsAbout: [
    "Supply Chain Optimization",
    "Business Process Management",
    "SAP Signavio",
    "BPMN 2.0",
    "Power BI",
    "Data Analytics",
    "Digital Transformation",
    "Operations Management",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Soest",
    addressCountry: "Germany",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
