// app/adocao/page.tsx
'use client'

import AdocaoLista from "@/components/site/AdocaoLista";
import Footer from "@/components/site/Footer";
import Navbar from "@/components/site/Navbar";

export default function AdocaoPage() {
  return (
    <>
      <Navbar/>
      <AdocaoLista />
      <Footer/>
    </>
  );
}