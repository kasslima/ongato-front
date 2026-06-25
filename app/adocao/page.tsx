// app/adocao/page.tsx

import type { Metadata } from "next";
import AdocaoLista from "@/components/site/AdocaoLista";
import Footer from "@/components/site/Footer";
import Navbar from "@/components/site/Navbar";

export const metadata: Metadata = {
  title: "Animais para Adoção em Manaus",
  description:
    "Veja gatos e cães para adoção em Manaus pelo Instituto Ongato. Encontre um animal resgatado e fale com a equipe pelo WhatsApp para adotar com responsabilidade.",
  alternates: {
    canonical: "/adocao/",
  },
};

export default function AdocaoPage() {
  return (
    <>
      <Navbar/>
      <AdocaoLista />
      <Footer/>
    </>
  );
}
