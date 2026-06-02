"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Heart, ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// Dados dos slides - Você pode adicionar quantos quiser aqui
const slides = [
  {
    id: 1,
    badge: "Bem-vindo ao Instituto Ongato",
    title: "Todo gato merece um ",
    titleAccent: "Lar Eterno",
    description: "Somos uma organização sem fins lucrativos dedicada a resgatar, reabilitar e encontrar famílias amorosas para gatos.",
    image: "/ingatos7.jpg", // Substitua pelos seus caminhos de imagem
    stats: "100+",
    statsText: "Adoções Felizes"
  },
  {
    id: 2,
    badge: "Sua ajuda salva vidas",
    title: "Mude o destino de um ",
    titleAccent: "Gatinho",
    description: "Cada doação nos ajuda a fornecer comida, abrigo e cuidados médicos essenciais para nossos resgatados.",
    image: "/ingatos5.jpg", 
    stats: "500kg",
    statsText: "Ração Mensal"
  },
  {
    id: 3,
    badge: "Seja um voluntário",
    title: "Doe seu tempo e ganhe ",
    titleAccent: "Amor",
    description: "Nossos gatinhos precisam de carinho e socialização. Junte-se ao nosso time de voluntários hoje mesmo.",
    image: "/ingatos6.jpg",
    stats: "24/7",
    statsText: "Cuidado Atento"
  }
];

export default function Banner() {
  const [current, setCurrent] = useState(0);

  // Lógica para passar o slide automaticamente a cada 5 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-white container mx-auto px-4 py-12 md:py-10 flex flex-col md:flex-row items-center justify-between gap-10 overflow-hidden">
      
      {/* LADO ESQUERDO: CONTEÚDO DE TEXTO COM ANIMAÇÃO */}
      <div className="flex-1 space-y-6 min-h-[250 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={slides[current].id}
            initial={{ opacity: 0, y: 20 }} // Começa um pouco abaixo e invisível
            animate={{ opacity: 1, y: 0 }}  // Sobe e aparece
            exit={{ opacity: 0, y: -20 }}   // Sobe mais um pouco e desaparece ao sair
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="inline-block px-4 py-1 bg-purple-100 text-[#7C3AED] rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              {slides[current].badge}
            </div>
            
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight">
              {slides[current].title} 
              <span className="text-[#7C3AED]">{slides[current].titleAccent}</span>.
            </h1>
            
            <p className="text-slate-500 text-lg max-w-lg mt-4">
              {slides[current].description}
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <Link href="/adocao" className="block">
                <button className="bg-[#FF7A29] hover:bg-[#e66a1f] text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg shadow-orange-200 flex items-center gap-2">
                  Adote Agora <ChevronRight size={20} />
                </button>
              </Link>

              <button className="border-2 border-purple-200 text-[#7C3AED] hover:border-[#7C3AED] px-8 py-4 rounded-full font-bold transition-all">
                Saiba Mais
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Indicadores (Pontinhos) */}
        <div className="flex gap-2 mt-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-2 rounded-full transition-all ${
                index === current ? "w-8 bg-[#7C3AED]" : "w-2 bg-purple-200"
              }`}
            />
          ))}
        </div>
      </div>

      {/* LADO DIREITO: IMAGEM COM ANIMAÇÃO DE FADE */}
      <div className="flex-1 relative w-full max-w-[500px]">
        <div className="relative h-[400px] md:h-[550px] w-full rounded-[40px] overflow-hidden shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={slides[current].id}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.7 }}
              className="absolute inset-0"
            >
              <Image
                src={slides[current].image} 
                alt="Imagem do Instituto Ongato"
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Card Flutuante com Animação */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={slides[current].id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="absolute -bottom-6 -right-4 md:right-0 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl flex items-center gap-4 border border-white z-10"
          >
            <div className="bg-[#FF7A29] p-3 rounded-full">
              <Heart className="text-white w-6 h-6 fill-current" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800 leading-none">
                {slides[current].stats}
              </p>
              <p className="text-xs text-slate-500">{slides[current].statsText}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      
    </section>
  );
}