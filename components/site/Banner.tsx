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
    }, 100000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[460px] sm:h-[500px] md:h-[600px] overflow-hidden bg-slate-900">
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[current].id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 w-full h-full"
        >
          {/* IMAGEM DE FUNDO */}
          <motion.div 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10 }}
            className="relative w-full h-full"
          >
            <Image
              src={slides[current].image}
              alt="Instituto Ongato"
              fill
              className="object-cover"
              priority
            />
            {/* Overlay ligeiramente mais escuro no mobile para salvar a leitura do texto */}
            <div className="absolute inset-0 bg-black/50 md:bg-black/30" />
          </motion.div>

          {/* CONTEÚDO */}
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-5 md:px-12">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="max-w-2xl text-center md:text-left mx-auto md:mx-0 text-white"
              >
                <div className="inline-block px-4 py-1 bg-purple-600 text-white rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider mb-4 md:mb-6">
                  {slides[current].badge}
                </div>

                {/* Tipografia responsiva para evitar quebras gigantes no celular */}
                <h1 className="text-3xl sm:text-4xl md:text-7xl font-extrabold leading-tight drop-shadow-md">
                  {slides[current].title}
                  <span className="text-[#FF7A29]">{slides[current].titleAccent}</span>.
                </h1>

                <p className="text-slate-200 md:text-slate-100 text-sm sm:text-base md:text-xl max-w-lg mt-4 md:mt-6 drop-shadow-sm mx-auto md:mx-0">
                  {slides[current].description}
                </p>

                {/* Botões empilhados no mobile, lado a lado no desktop */}
                <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-3 mt-8 md:mt-10 max-w-xs sm:max-w-none mx-auto md:mx-0">
                  <Link href="/adocao" className="w-full sm:w-auto">
                    <button className="w-full sm:w-auto bg-[#FF7A29] hover:bg-[#e66a1f] text-white px-8 py-3.5 md:px-10 md:py-4 rounded-full font-bold transition-all shadow-xl flex items-center justify-center gap-2 text-sm md:text-base">
                      Adote Agora <ChevronRight size={18} />
                    </button>
                  </Link>

                  <button className="w-full sm:w-auto bg-white/10 backdrop-blur-md border-2 border-white/20 text-white hover:bg-white/20 px-8 py-3.5 md:px-10 md:py-4 rounded-full font-bold transition-all text-sm md:text-base">
                    Saiba Mais
                  </button>
                </div>
              </motion.div>
            </div>
          </div>

          {/* CARD FLUTUANTE (Oculto no mobile 'hidden', visível no desktop 'md:flex') */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="hidden md:flex absolute bottom-12 right-12 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-2xl items-center gap-4 border border-white"
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
      <div className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 md:left-12 md:translate-x-0 flex gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              index === current ? "w-8 bg-[#FF7A29]" : "w-2.5 bg-white/40 hover:bg-white"
            }`}
            aria-label={`Ir para o slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}