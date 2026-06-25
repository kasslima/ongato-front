import type { Metadata, Viewport } from "next";
import "./globals.css";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Adoção de Animais em Manaus | Instituto Ongato",
    template: "%s | Instituto Ongato",
  },
  description:
    "Adote gatos e cães resgatados em Manaus ou ajude o Instituto Ongato com doações para alimentação, cuidados veterinários e resgate animal.",
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  keywords: [
    "adoção de animais em Manaus",
    "adotar cachorro em Manaus",
    "adotar gato em Manaus",
    "ONG de animais em Manaus",
    "doação para ONG de animais",
    "resgate de animais em Manaus",
    "animais para adoção Manaus",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Adoção de Animais em Manaus | Instituto Ongato",
    description:
      "ONG de animais em Manaus com gatos e cães para adoção responsável. Doe para apoiar resgates, alimentação e cuidados veterinários.",
    images: [
      {
        url: "/banner1.jpg",
        width: 1200,
        height: 630,
        alt: "Gato resgatado pelo Instituto Ongato em Manaus",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Adoção de Animais em Manaus | Instituto Ongato",
    description:
      "Adote animais em Manaus ou doe para ajudar o Instituto Ongato a cuidar de gatos e cães resgatados.",
    images: ["/banner1.jpg"],
  },
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
  const structuredData = {
    "@context": "https://schema.org",
    "@type": ["AnimalShelter", "NGO"],
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/ongato-logo.png`,
    image: `${siteConfig.url}/banner1.jpg`,
    description: siteConfig.description,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.city,
      addressRegion: siteConfig.region,
      addressCountry: siteConfig.country,
    },
    areaServed: {
      "@type": "City",
      name: siteConfig.city,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.phone,
      contactType: "Atendimento para adoção, doações e resgate animal",
      areaServed: siteConfig.country,
      availableLanguage: "Portuguese",
    },
    sameAs: [siteConfig.instagram],
  };

  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="min-h-screen flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
