import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StatusBar } from "@/components/layout/StatusBar";
import { Providers } from "./providers";
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
  title: "G-code Converter",
  description:
    "G-codeをBambu Lab A1用に変換するWebアプリ。プレビュー、安全性チェック、設定調整を行い、そのままSDカードに転送して印刷できます。",
  openGraph: {
    title: "G-code Converter",
    description:
      "Convert G-code for Bambu Lab A1. Preview, validate, adjust settings, and download ready-to-print files.",
    type: "website",
    locale: "ja_JP",
    siteName: "G-code Converter",
  },
  twitter: {
    card: "summary",
    title: "G-code Converter",
    description:
      "Convert G-code for Bambu Lab A1. Preview, validate, adjust settings, and download.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <div className="flex h-screen flex-col overflow-hidden">
            <Header />
            <main className="flex-1 overflow-y-auto pb-8">{children}</main>
          </div>
          <StatusBar />
        </Providers>
      </body>
    </html>
  );
}
