// app/contato/page.tsx

import type { Metadata } from "next";
import Contato from "@/components/site/Contato";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import Banner from "@/components/site/Banner";

export const metadata: Metadata = {
  title: "Contato da ONG de Animais em Manaus",
  description:
    "Fale com o Instituto Ongato em Manaus para adoção responsável, doações, voluntariado e informações sobre animais resgatados.",
  alternates: {
    canonical: "/contato/",
  },
};

export default function ContatoPage() {
  return (
    <>
    <Navbar/>
    <Banner headingLevel="h2" />
    <Contato />
    <Footer/>

    </>
  );
}
