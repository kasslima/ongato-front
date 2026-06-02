// app/contato/page.tsx
'use client'

import Contato from "@/components/site/Contato";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import Banner from "@/components/site/Banner";
export default function ContatoPage() {
  return (
    <>
    <Navbar/>
    <Banner/>
    <Contato />
    <Footer/>

    </>
  );
}