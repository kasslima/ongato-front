// app/eventos/page.tsx
'use client'

import EventosLista from "@/components/site/EventosLista";
import Footer from "@/components/site/Footer";
import Navbar from "@/components/site/Navbar";

export default function EventosPage() {
  return (
    <>
      <Navbar/>
      <EventosLista />
      <Footer />
    </>
  );
}