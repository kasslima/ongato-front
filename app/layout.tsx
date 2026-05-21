import type { Metadata } from "next";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Banner from "@/components/site/Banner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Instituto Ongato",
  description: "Todo gato merece um lar eterno",
  colorScheme: 'light',
  icons: {
    icon: "/ongato-logo.png",
    shortcut: "/ongato-logo.png",
    apple: "/ongato-logo.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <Banner />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}