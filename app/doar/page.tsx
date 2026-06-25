// app/doar/page.tsx

import type { Metadata } from "next";
import DoacaoCheckout from "@/components/site/DoacaoCheckout";
import Footer from "@/components/site/Footer";
import Navbar from "@/components/site/Navbar";
import Banner from "@/components/site/Banner";

export const metadata: Metadata = {
  title: "Doe para ONG de Animais em Manaus",
  description:
    "Faça uma doação para o Instituto Ongato em Manaus e ajude com ração, vacinas, castração, resgate e cuidados veterinários de animais abandonados.",
  alternates: {
    canonical: "/doar/",
  },
};

export default function DoarPage() {
  return (
    <>
    <Navbar/>
    <Banner headingLevel="h2" />
    <DoacaoCheckout />
    <Footer/>
    </>
  );
}
