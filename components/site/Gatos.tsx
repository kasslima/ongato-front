'use client'

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Gatos() {
  const gatos = [
    {
      nome: "Oliver",
      idade: "Filhote",
      tags: ["VACINADO", "BRINCALHÃO"],
      imagem: "/ingatos1.jpg",
    },
    {
      nome: "Luna",
      idade: "Sênior",
      tags: ["DÓCIL", "AMIGA DE CRIANÇAS"],
      imagem: "/ingatos2.jpg",
    },
    {
      nome: "Frape",
      idade: "Adulto",
      tags: ["INDEPENDENTE", "CASTRADO"],
      imagem: "/ingatos3.jpg",
    },
    {
      nome: "Mochi",
      idade: "Filhote",
      tags: ["ATIVA", "VACINADA"],
      imagem: "/ingatos4.jpg",
    },
  ];

  const [activeCard, setActiveCard] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Função para mover o slide via botões ou automação
  const scrollToSlide = (index: number) => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.querySelector('[data-card]')?.getBoundingClientRect().width || 0;
      const gap = 24; // Equivalente ao gap-6 do Tailwind (24px)
      
      scrollRef.current.scrollTo({
        left: index * (cardWidth + gap),
        behavior: "smooth",
      });
      setActiveCard(index);
    }
  };

  // 1. PASSA SOZINHO (Efeito Automático)
  useEffect(() => {
    const autoPlay = setInterval(() => {
      // Se chegar no último gato, volta para o primeiro
      const nextIndex = activeCard === gatos.length - 1 ? 0 : activeCard + 1;
      scrollToSlide(nextIndex);
    }, 6000); // Muda a cada 6 segundos

    return () => clearInterval(autoPlay);
  }, [activeCard, gatos.length]);

  // 2. ATUALIZA O PONTINHO SE O USUÁRIO ARRASTAR COM O DEDO
  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const cardWidth = scrollRef.current.querySelector('[data-card]')?.getBoundingClientRect().width || 1;
      const gap = 24;
      
      const index = Math.round(scrollLeft / (cardWidth + gap));
      // Garante que o estado só mude se o index for diferente (evita re-renders infinitos)
      if (index !== activeCard && index >= 0 && index < gatos.length) {
        setActiveCard(index);
      }
    }
  };

  return (
    <section className="py-12 px-4 relative" style={{ background: 'linear-gradient(to bottom, #f3e8ff, #f5f3ff, #ffffff)' }}>
      <div className="container mx-auto">
        
        {/* Cabeçalho */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-3">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
              Residentes em Destaque
            </h2>
            <p className="text-slate-500 text-base md:text-lg">
              Conheça alguns dos nossos gatos à espera de alguém especial.
            </p>
          </div>
          <Link 
            href="/adocao" 
            className="flex items-center gap-2 text-[#7C3AED] font-bold hover:underline group text-sm md:text-base"
          >
            Ver Todos os Gatos 
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* CONTROLLER DO SLIDE (Arraste nativo + Snap Magnético) */}
        <div className="relative w-full">
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex flex-row overflow-x-auto gap-6 pb-6 snap-x snap-mandatory scroll-smooth sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-x-visible sm:pb-0"
            style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }} // Remove barras visíveis no Mobile
          >
            {gatos.map((gato, index) => (
              <div 
                key={index} 
                data-card
                className="min-w-[85vw] sm:min-w-0 bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 snap-center"
              >
                {/* Imagem */}
                <div className="relative h-64 w-full">
                  <Image
                    src={gato.imagem}
                    alt={gato.nome}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full text-[10px] font-bold text-[#7C3AED] uppercase tracking-wider">
                    {gato.idade}
                  </div>
                </div>

                {/* Informações */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">
                    {gato.nome}
                  </h3>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {gato.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="bg-purple-50 text-[#7C3AED] text-[10px] font-bold px-3 py-1 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button className="w-full border-2 border-[#7C3AED] text-[#7C3AED] py-2.5 rounded-full font-bold text-sm hover:bg-[#7C3AED] hover:text-white transition-colors">
                    Conhecer {gato.nome}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* BOTÕES GRANDES PARA CELULAR (Fáceis de clicar com o dedão) */}
          <div className="flex justify-between items-center mt-4 sm:hidden px-2">
            <button 
              onClick={() => scrollToSlide(activeCard === 0 ? gatos.length - 1 : activeCard - 1)}
              className="bg-white border border-slate-200 text-slate-700 active:bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center shadow-md transition-all"
              aria-label="Slide anterior"
            >
              <ChevronLeft size={24} />
            </button>

            {/* PONTINHOS INDICADORES (Centralizados entre os botões) */}
            <div className="flex gap-2">
              {gatos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSlide(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    index === activeCard ? "w-6 bg-[#FF7A29]" : "w-2.5 bg-slate-300"
                  }`}
                />
              ))}
            </div>

            <button 
              onClick={() => scrollToSlide(activeCard === gatos.length - 1 ? 0 : activeCard + 1)}
              className="bg-white border border-slate-200 text-slate-700 active:bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center shadow-md transition-all"
              aria-label="Próximo slide"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}