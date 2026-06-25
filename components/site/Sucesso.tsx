'use client'

import Image from "next/image";
import { Star } from "lucide-react";

export default function Sucesso() {
  const depoimentos = [
    {
      imagem: "/sucesso1.jpg", // Substitua pelo seu arquivo
      texto: "Adotar o Felix foi a melhor decisão que já tomamos. A equipe do Instituto Ongato tornou a transição muito suave e nos deu todo o apoio.",
      autor: "FAMÍLIA ANDERSON",
    },
    {
      imagem: "/sucesso2.jpg", // Substitua pelo seu arquivo
      texto: "A Bella trouxe tanta alegria e companheirismo para minha casa. Ela é realmente minha melhor amiga. Obrigada, Ongato!",
      autor: "MARTHA STEWART",
    },
  ];

  return (
    <section className="py-12 md:py-20 px-5 bg-slate-50">
      <div className="container mx-auto max-w-6xl">
        
        {/* Título Responsivo */}
        <h2 className="text-2xl md:text-4xl font-bold text-center text-slate-900 mb-8 md:mb-14 tracking-tight">
          Histórias de Sucesso
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {depoimentos.map((item, index) => (
            <div 
              key={index} 
              /* ALTERAÇÃO AQUI: 
                 Se for o segundo item (index === 1), ele fica oculto no mobile ('hidden')
                 e só passa a ser exibido a partir de telas pequenas/tablets ('sm:flex')
              */
              className={`bg-white rounded-[32px] md:rounded-[40px] overflow-hidden flex flex-col md:flex-row shadow-sm hover:shadow-md transition-all duration-300 h-full ${
                index === 1 ? "hidden sm:flex" : "flex"
              }`}
            >
              {/* Lado da Imagem: h-64 no mobile para ficar proporcional e h-auto/fill no desktop */}
              <div className="relative w-full md:w-1/2 h-64 md:h-auto min-h-[260px] md:min-h-full shrink-0">
                <Image
                  src={item.imagem}
                  alt={`História de adoção em Manaus - ${item.autor}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority={index === 0}
                />
              </div>

              {/* Lado do Texto: p-6 no mobile para poupar espaço e p-10/p-12 em telas maiores */}
              <div className="p-6 sm:p-10 md:p-12 flex flex-col justify-center w-full md:w-1/2">
                
                {/* Estrelas menores no mobile */}
                <div className="flex gap-1 mb-4 md:mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-[#FF7A29] text-[#FF7A29]" />
                  ))}
                </div>

                {/* Texto com tamanho de fonte fluido */}
                <p className="text-slate-600 text-sm sm:text-base md:text-lg italic leading-relaxed mb-6 md:mb-8">
                  &quot;{item.texto}&quot;
                </p>

                {/* Autor/Assinatura */}
                <div className="flex items-center gap-2 mt-auto">
                  <div className="w-5 h-0.5 bg-[#7C3AED]" />
                  <span className="text-[#7C3AED] font-bold text-xs md:text-sm tracking-widest uppercase">
                    {item.autor}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
