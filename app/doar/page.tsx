// app/doar/page.tsx
'use client'

import DoacaoCheckout from "@/components/site/DoacaoCheckout";
import Footer from "@/components/site/Footer";
import Navbar from "@/components/site/Navbar";
import Banner from "@/components/site/Banner";

export default function DoarPage() {
  return (
    <>
    <Navbar/>
    <Banner />
    <DoacaoCheckout />
    <Footer/>
    </>
  );
}