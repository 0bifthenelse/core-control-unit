import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Core Control Unit — Ingénierie & Solutions Numériques",
  description:
    "Core Control Unit est une entreprise française spécialisée en ingénierie logicielle, architecture système et solutions numériques sur mesure.",
  keywords: ["ingénierie logicielle", "architecture système", "développement web", "France", "Core Control Unit"],
  authors: [{ name: "Core Control Unit" }],
  openGraph: {
    title: "Core Control Unit — Ingénierie & Solutions Numériques",
    description:
      "Core Control Unit est une entreprise française spécialisée en ingénierie logicielle, architecture système et solutions numériques sur mesure.",
    url: "https://corecontrolunit.fr",
    siteName: "Core Control Unit",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Core Control Unit — Ingénierie & Solutions Numériques",
    description:
      "Core Control Unit est une entreprise française spécialisée en ingénierie logicielle, architecture système et solutions numériques sur mesure.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://corecontrolunit.fr",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-[#0d0f12] text-[#e8eaf0]">{children}</body>
    </html>
  );
}
