'use client'

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight, X, MessageCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getAnimalAttributes, getAnimals, getAnimalTypeLabel } from "@/lib/animals";
import { siteConfig } from "@/lib/site";
import { Animal } from "@/types/animais";

export default function Gatos() {
  const [gatos, setGatos] = useState<Animal[]>([]);
  const [activeCard, setActiveCard] = useState(0);
  const [petSelecionado, setPetSelecionado] = useState<Animal | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;

    getAnimals({ featured: true, limit: 4 })
      .then((animals) => {
        if (active) setGatos(animals.filter((animal) => animal.featured).slice(0, 4));
      })
      .catch((error) => console.error("Erro ao buscar animais em destaque:", error));

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = petSelecionado ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [petSelecionado]);

  const scrollToSlide = (index: number) => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.querySelector('[data-card]')?.getBoundingClientRect().width || 0;
      const gap = 24; 
      
      scrollRef.current.scrollTo({
        left: index * (cardWidth + gap),
        behavior: "smooth",
      });
      setActiveCard(index);
    }
  };

  useEffect(() => {
    if (petSelecionado || gatos.length < 2) return;

    const autoPlay = setInterval(() => {
      const nextIndex = activeCard === gatos.length - 1 ? 0 : activeCard + 1;
      scrollToSlide(nextIndex);
    }, 6000);

    return () => clearInterval(autoPlay);
  }, [activeCard, gatos.length, petSelecionado]);

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const cardWidth = scrollRef.current.querySelector('[data-card]')?.getBoundingClientRect().width || 1;
      const gap = 24;
      
      const index = Math.round(scrollLeft / (cardWidth + gap));
      if (index !== activeCard && index >= 0 && index < gatos.length) {
        setActiveCard(index);
      }
    }
  };

  const handleVerPerfil = (gato: Animal) => {
    setPetSelecionado(gato);
  };

  const fecharModal = () => {
    setPetSelecionado(null);
  };

  const handleAdotarWhatsApp = (gato: Animal) => {
    const numeroAdmin = siteConfig.whatsapp; 
    const mensagem = `Olá! Tenho interesse em adotar o(a) ${gato.name} (${getAnimalTypeLabel(gato.type)} - ID: ${gato.id}) que vi no carrossel de destaques do site do Instituto Ongato em Manaus. Podemos conversar sobre o processo de adoção?`;
    const url = `https://wa.me/${numeroAdmin}?text=${encodeURIComponent(mensagem)}`;
    
    window.open(url, '_blank');
  };

  return (
    <section className="py-12 px-4 relative w-full" style={{ background: 'linear-gradient(to bottom, #f3e8ff, #f5f3ff, #ffffff)' }}>
      <div className="container mx-auto">
        
        {/* Cabeçalho Ajustado para Centralização Responsiva */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-10 gap-4 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
              Animais em destaque para adoção
            </h2>
            <p className="text-slate-500 text-base md:text-lg">
              Conheça alguns gatos e cães resgatados em Manaus à espera de alguém especial.
            </p>
          </div>
          <Link 
            href="/adocao" 
            className="flex items-center gap-2 text-[#7C3AED] font-bold hover:underline group text-sm md:text-base whitespace-nowrap"
          >
            Ver animais para adoção 
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* CONTROLLER DO SLIDE CORRIGIDO PARA CELULAR */}
        <div className="relative w-full">
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex flex-row overflow-x-auto gap-6 pb-6 snap-x snap-mandatory scroll-smooth sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-x-visible sm:pb-0 px-[7.5vw] sm:px-0"
            style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}
          >
            {gatos.map((gato) => (
              <div 
                key={gato.id} 
                data-card
                className="min-w-[85vw] sm:min-w-0 bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 snap-center flex flex-col justify-between"
              >
                {/* Imagem */}
                <div className="relative h-64 w-full">
                  <Image
                    src={gato.imageUrl}
                    alt={`${gato.name}, ${getAnimalTypeLabel(gato.type)} para adoção em Manaus`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full text-[10px] font-bold text-[#7C3AED] uppercase tracking-wider">
                    {gato.age}
                  </div>
                </div>

                {/* Informações */}
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">
                      {gato.name}
                    </h3>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {getAnimalAttributes(gato.attributes).map((tag) => (
                        <span 
                          key={tag} 
                          className="bg-purple-50 text-[#7C3AED] text-[10px] font-bold px-3 py-1 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button 
                    onClick={() => handleVerPerfil(gato)}
                    className="w-full border-2 border-[#7C3AED] text-[#7C3AED] py-2.5 rounded-full font-bold text-sm hover:bg-[#7C3AED] hover:text-white transition-colors active:scale-98"
                  >
                    Conhecer {gato.name}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* BOTÕES GRANDES PARA CELULAR */}
          {gatos.length > 1 && <div className="flex justify-between items-center mt-4 sm:hidden px-2">
            <button 
              onClick={() => scrollToSlide(activeCard === 0 ? gatos.length - 1 : activeCard - 1)}
              className="bg-white border border-slate-200 text-slate-700 active:bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center shadow-md transition-all"
              aria-label="Slide anterior"
            >
              <ChevronLeft size={24} />
            </button>

            {/* PONTINHOS INDICADORES */}
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
          </div>}
        </div>

      </div>

      {/* ================= MODAL DE PERFIL INTEGRADO ================= */}
      {petSelecionado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm transition-opacity">
          
          <div className="absolute inset-0" onClick={fecharModal}></div>
          
          <div className="bg-white rounded-[32px] w-full max-w-4xl max-h-[90vh] overflow-y-auto relative z-10 flex flex-col md:flex-row shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            
            <button 
              onClick={fecharModal}
              className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all shadow-sm"
            >
              <X size={20} />
            </button>

            <div className="w-full md:w-1/2 p-4 sm:p-6 bg-slate-50/50 flex flex-col gap-3">
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-slate-200 border border-slate-100 shadow-inner">
                <Image 
                  src={petSelecionado.imageUrl} 
                  alt={`${petSelecionado.name}, ${getAnimalTypeLabel(petSelecionado.type)} para adoção em Manaus`} 
                  fill 
                  className="object-cover"
                />
              </div>
            </div>

            <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                    {petSelecionado.name}
                  </h2>
                  <div className="px-3 py-1 rounded-lg text-xs font-bold text-white uppercase tracking-wider bg-[#7C3AED]">
                    {getAnimalTypeLabel(petSelecionado.type)}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Fase da Vida</span>
                    <span className="font-semibold text-slate-700">{petSelecionado.age}</span>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Personalidade</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {getAnimalAttributes(petSelecionado.attributes).map(tag => (
                        <span key={tag} className="text-[10px] font-bold text-[#7C3AED] bg-[#F3E8FF] px-2 py-0.5 rounded-md">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-sm font-bold text-slate-900 mb-2 uppercase tracking-wider">Sobre a História</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {petSelecionado.description}
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 mt-auto">
                <Button 
                  onClick={() => handleAdotarWhatsApp(petSelecionado)}
                  className="w-full bg-[#25D366] hover:bg-[#1DA851] text-white py-6 rounded-2xl text-base font-bold shadow-lg shadow-[#25D366]/20 transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle size={20} />
                  Quero adotar via WhatsApp
                </Button>
                <p className="text-center text-[10px] text-slate-400 mt-3 font-medium">
                  Você será redirecionado para conversar com nossa equipe.
                </p>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
