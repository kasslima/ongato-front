'use client'

import Banner from "@/components/site/Banner";
import ComoAdotar from "@/components/site/Sobre_Nos";
import Footer from "@/components/site/Footer";
import Gatos from "@/components/site/Gatos";
import Navbar from "@/components/site/Navbar";
import Sucesso from "@/components/site/Sucesso";

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