"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Heart, ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    id: 1,
    badge: "Bem-vindo ao Instituto Ongato",
    title: "Todo gato merece um ",
    titleAccent: "Lar",
    description: "Somos uma organização sem fins lucrativos dedicada a resgatar, reabilitar e encontrar famílias amorosas para gatos.",
    image: "/ingatos7.jpg", 
    stats: "100+",
    statsText: "Adoções Felizes"
  },
  {
    id: 2,
    badge: "Sua ajuda salva vidas",
    title: "Mude o destino de um ",
    titleAccent: "Gatinho",
    description: "Cada doação nos ajuda a fornecer comida, abrigo e cuidados médicos essenciais para nossos resgatados.",
    image: "/ingatos8.jpg", 
    stats: "500kg",
    statsText: "Ração Mensal"
  },
  {
    id: 3,
    badge: "Seja um voluntário",
    title: "Doe seu tempo e ganhe ",
    titleAccent: "Amor",
    description: "Nossos gatinhos precisam de carinho e socialização. Junte-se ao nosso time de voluntários hoje mesmo.",
    image: "/ingatos9.jpg",
    stats: "24/7",
    statsText: "Cuidado Atento"
  }
];

export default function Banner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[400px] md:h-[600px] overflow-hidden bg-slate-900">
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[current].id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 w-full h-full"
        >
          {/* IMAGEM DE FUNDO (OCUPA TUDO) */}
          <motion.div 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 8 }}
            className="relative w-full h-full"
          >
            <Image
              src={slides[current].image}
              alt="Instituto Ongato"
              fill
              className="object-cover"
              priority
            />
            {/* Overlay Escuro para dar leitura ao texto */}
            <div className="absolute inset-0 bg-black/40 md:bg-black/30" />
          </motion.div>

          {/* CONTEÚDO CENTRALIZADO */}
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4 md:px-12">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="max-w-2xl text-white"
              >
                <div className="inline-block px-4 py-1 bg-purple-600 text-white rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                  {slides[current].badge}
                </div>

                <h1 className="text-4xl md:text-7xl font-extrabold leading-tight drop-shadow-md">
                  {slides[current].title}
                  <span className="text-[#FF7A29]">{slides[current].titleAccent}</span>.
                </h1>

                <p className="text-slate-100 text-lg md:text-xl max-w-lg mt-6 drop-shadow-sm">
                  {slides[current].description}
                </p>

                <div className="flex flex-wrap gap-4 mt-10">
                  <Link href="/adocao">
                    <button className="bg-[#FF7A29] hover:bg-[#e66a1f] text-white px-10 py-4 rounded-full font-bold transition-all shadow-xl flex items-center gap-2">
                      Adote Agora <ChevronRight size={20} />
                    </button>
                  </Link>

                  <button className="bg-white/10 backdrop-blur-md border-2 border-white/20 text-white hover:bg-white/20 px-10 py-4 rounded-full font-bold transition-all">
                    Saiba Mais
                  </button>
                </div>
              </motion.div>
            </div>
          </div>

          {/* CARD FLUTUANTE (AGORA INTEGRADO AO SLIDE) */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="absolute bottom-10 right-4 md:right-12 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-white"
          >
            <div className="bg-[#FF7A29] p-3 rounded-full">
              <Heart className="text-white w-6 h-6 fill-current" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800 leading-none">
                {slides[current].stats}
              </p>
              <p className="text-xs text-slate-500 font-medium">{slides[current].statsText}</p>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* INDICADORES (PONTINHOS) */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 md:left-12 md:translate-x-0 flex gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-3 rounded-full transition-all duration-300 ${
              index === current ? "w-10 bg-[#FF7A29]" : "w-3 bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </section>
  );
}