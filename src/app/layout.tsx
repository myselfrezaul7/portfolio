import type { Metadata } from "next";
import { ThemeProvider } from "@/contexts/ThemeContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Md Rezaul Karim — Business Strategy & Technical Execution",
  description: "Master's student in International Management & Information System with expertise in process optimization, data analytics, and technical deployment. Based in Germany.",
  keywords: ["Rezaul Karim", "Business Strategy", "Process Management", "SAP", "Power BI", "Data Analytics", "Germany"],
  authors: [{ name: "Md Rezaul Karim" }],
  openGraph: {
    title: "Md Rezaul Karim — Business Strategy & Technical Execution",
    description: "Master's student in International Management & Information System with expertise in process optimization, data analytics, and technical deployment.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
