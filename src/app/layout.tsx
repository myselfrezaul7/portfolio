import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/contexts/ThemeContext";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://rezaulkarim.vercel.app'),
  title: {
    default: "Md Rezaul Karim — Business Strategy & Technical Execution",
    template: "%s | Md Rezaul Karim"
  },
  description: "Master's student in International Management & Information System with expertise in process optimization, data analytics, and technical deployment. Based in Germany.",
  keywords: [
    "Rezaul Karim",
    "Business Strategy",
    "Process Management",
    "SAP Signavio",
    "BPMN",
    "Power BI",
    "Data Analytics",
    "Technical Execution",
    "Germany",
    "International Management"
  ],
  authors: [{ name: "Md Rezaul Karim", url: "https://linkedin.com/in/myselfkarim" }],
  creator: "Md Rezaul Karim",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rezaulkarim.vercel.app",
    siteName: "Md Rezaul Karim",
    title: "Md Rezaul Karim — Business Strategy & Technical Execution",
    description: "Master's student in International Management & Information System with expertise in process optimization, data analytics, and technical deployment.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Md Rezaul Karim - Business Strategist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Md Rezaul Karim — Business Strategy & Technical Execution",
    description: "Master's student in IMIS with expertise in process optimization and data analytics.",
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
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Md Rezaul Karim",
  url: "https://rezaulkarim.vercel.app",
  image: "https://rezaulkarim.vercel.app/images/profile.jpg",
  sameAs: [
    "https://linkedin.com/in/myselfkarim",
    "https://github.com/myselfrezaul7",
  ],
  jobTitle: "Business Strategy & Technical Execution Professional",
  worksFor: {
    "@type": "Organization",
    name: "South Westphalia University of Applied Sciences",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "South Westphalia University of Applied Sciences",
  },
  knowsAbout: [
    "Business Process Management",
    "SAP Signavio",
    "BPMN 2.0",
    "Power BI",
    "Data Analytics",
    "Project Management",
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
