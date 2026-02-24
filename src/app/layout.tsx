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
  title: "gcoordinator → Bambu Lab A1 Converter",
  description:
    "gcoordinatorで生成したG-codeをBambu Lab A1用に変換するWebアプリ。プレビュー、安全性チェック、設定調整を行い、そのままSDカードに転送して印刷できます。",
  openGraph: {
    title: "gcoordinator → Bambu Lab A1 Converter",
    description:
      "Convert gcoordinator G-code for Bambu Lab A1. Preview, validate, adjust settings, and download ready-to-print files.",
    type: "website",
    locale: "ja_JP",
    siteName: "gcode2bambu",
  },
  twitter: {
    card: "summary",
    title: "gcoordinator → Bambu Lab A1 Converter",
    description:
      "Convert gcoordinator G-code for Bambu Lab A1. Preview, validate, adjust settings, and download.",
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
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <StatusBar />
        </Providers>
      </body>
    </html>
  );
}
