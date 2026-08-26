import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/contexts/ThemeContext";
import "./globals.css";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://mdkarim.vercel.app'),
  title: {
    default: "Md Rezaul Karim - Bridging Business Operations & Technology",
    template: "%s | Md Rezaul Karim"
  },
  description: "Master's student in IMIS | Supply Chain Optimizer | Founder. Bridging business operations and technology through process analytics, data-driven insights, and digital transformation. Based in Germany.",
  keywords: [
    "Rezaul Karim",
    "Data Analytics",
    "Operations Management",
    "Supply Chain Optimization",
    "ETL Pipelines",
    "SAP BW/4HANA",
    "SAP Signavio",
    "BPMN 2.0",
    "Power BI",
    "Jira",
    "Agile",
    "PPT Framework",
    "Digital Transformation",
    "IMIS",
    "Fachhochschule Südwestfalen",
    "Germany"
  ],
  authors: [{ name: "Md Rezaul Karim", url: "https://linkedin.com/in/myselfkarim" }],
  creator: "Md Rezaul Karim",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mdkarim.vercel.app",
    siteName: "Md Rezaul Karim",
    title: "Md Rezaul Karim - Bridging Business Operations & Technology",
    description: "Master's student in IMIS | Supply Chain Optimizer | Founder. Bridging business operations and technology through process analytics and digital transformation.",
    images: [
      {
        url: "/images/profile.jpg",
        width: 800,
        height: 800,
        alt: "Md Rezaul Karim - Operations & Technology",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Md Rezaul Karim - Bridging Business Operations & Technology",
    description: "Master's student in IMIS | Supply Chain Optimizer | Founder. Bridging operations and technology.",
    images: ["/images/profile.jpg"],
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
  url: "https://mdkarim.vercel.app",
  image: "https://mdkarim.vercel.app/images/profile.jpg",
  sameAs: [
    "https://linkedin.com/in/myselfkarim",
    "https://github.com/myselfrezaul7",
  ],
  jobTitle: "Data & Operations Analyst | IT Project Management | IMIS Master's Student",
  affiliation: {
    "@type": "CollegeOrUniversity",
    name: "Fachhochschule Südwestfalen",
    url: "https://www.fh-swf.de",
  },
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "Daffodil International University",
      url: "https://daffodilvarsity.edu.bd",
    },
    {
      "@type": "CollegeOrUniversity",
      name: "Fachhochschule Südwestfalen",
      url: "https://www.fh-swf.de",
    },
  ],
  knowsAbout: [
    "Supply Chain Optimization",
    "Business Process Management",
    "SAP Signavio",
    "SAP BW/4HANA",
    "BPMN 2.0",
    "Power BI",
    "Data Analytics",
    "ETL Pipelines",
    "KPI Tracking & Dashboards",
    "PPT Framework",
    "Agile Product Management",
    "Jira & Confluence",
    "Digital Transformation",
    "AI-Assisted Workflows",
    "Prompt Engineering",
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
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme')||(window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}

