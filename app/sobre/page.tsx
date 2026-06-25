
import type { Metadata } from "next";
import Sobre_Nos from "@/components/site/Sobre_Nos";

export const metadata: Metadata = {
  title: "Sobre a ONG de Animais em Manaus",
  description:
    "Conheça o Instituto Ongato, ONG de animais em Manaus dedicada ao resgate, reabilitação, adoção responsável e cuidado de gatos e cães.",
  alternates: {
    canonical: "/sobre/",
  },
};

export default function SobrePage() {
  return (
    <>
    <Sobre_Nos headingLevel="h1" />
    </>
  );
}
