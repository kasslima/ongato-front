'use client'

import ComoAdotar from "@/components/site/ComoAdotar";
import Gatos from "@/components/site/Gatos";
import Sucesso from "@/components/site/Sucesso";

export default function HomePage() {
  return (
    <>
      <ComoAdotar />
      <Gatos />
      <Sucesso />
    </>
  );
}