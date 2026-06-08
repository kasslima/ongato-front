import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Instituto Ongato",
  description: "Todo gato merece um lar eterno",
  icons: {
    icon: "/ongato-logo.png",
    shortcut: "/ongato-logo.png",
    apple: "/ongato-logo.png",
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt" className="h-full antialiased">
      <body className="min-h-screen flex flex-col">

        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
