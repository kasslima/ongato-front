import type { Metadata } from "next";
import Banner from "@/components/site/Banner";
import ComoAdotar from "@/components/site/Sobre_Nos";
import Footer from "@/components/site/Footer";
import Gatos from "@/components/site/Gatos";
import Navbar from "@/components/site/Navbar";
import Sucesso from "@/components/site/Sucesso";

export const metadata: Metadata = {
  title: "Adoção de Animais em Manaus",
  description:
    "Conheça o Instituto Ongato, ONG de animais em Manaus. Adote gatos e cães resgatados ou doe para alimentação, cuidados veterinários e resgate animal.",
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <>
      <Navbar/>
      <Banner />
   <ComoAdotar/>
      <Gatos />
      <Sucesso />
      <Footer/>
    </>
  );
}
