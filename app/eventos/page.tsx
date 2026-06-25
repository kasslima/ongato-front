// app/eventos/page.tsx

import type { Metadata } from "next";
import Banner from "@/components/site/Banner";
import EventosLista from "@/components/site/EventosLista";
import Footer from "@/components/site/Footer";
import Navbar from "@/components/site/Navbar";

export const metadata: Metadata = {
  title: "Eventos de Adoção de Animais em Manaus",
  description:
    "Acompanhe feiras de adoção, mutirões e eventos do Instituto Ongato em Manaus para apoiar animais resgatados.",
  alternates: {
    canonical: "/eventos/",
  },
};

export default function EventosPage() {
  return (
    <>
      <Navbar/>
      <Banner headingLevel="h2" />
      <EventosLista />
      <Footer />
    </>
  );
}
