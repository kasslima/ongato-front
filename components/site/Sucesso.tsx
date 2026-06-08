'use client'

import Image from "next/image";
import { Star } from "lucide-react";

export default function Sucesso() {
  const depoimentos = [
    {
      imagem: "/ingatos5.jpg", // Substitua pelo seu arquivo
      texto: "Adotar o Felix foi a melhor decisão que já tomamos. A equipe do Instituto Ongato tornou a transição muito suave e nos deu todo o apoio.",
      autor: "FAMÍLIA ANDERSON",
    },
    {
      imagem: "/ingatos6.jpg", // Substitua pelo seu arquivo
      texto: "A Bella trouxe tanta alegria e companheirismo para minha casa. Ela é realmente minha melhor amiga. Obrigada, Ongato!",
      autor: "MARTHA STEWART",
    },
  ];

  return (
    <section className="py-20 px-4 bg-slate-50">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-10">
          Histórias de Sucesso
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {depoimentos.map((item, index) => (
            <div 
              key={index} 
              className="bg-white rounded-[40px] overflow-hidden flex flex-col md:flex-row shadow-sm hover:shadow-md transition-shadow h-full"
            >
              {/* Lado da Imagem */}
              <div className="relative w-full md:w-1/2 h-80 md:h-auto">
                <Image
                  src={item.imagem}
                  alt={item.autor}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Lado do Texto */}
              <div className="p-8 md:p-12 flex flex-col justify-center w-full md:w-1/2">
                {/* Estrelas */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#FF7A29] text-[#FF7A29]" />
                  ))}
                </div>

                <p className="text-slate-600 text-lg italic leading-relaxed mb-8">
                  &quot;{item.texto}&quot;
                </p>

                <div className="flex items-center gap-2">
                  <div className="w-6 h-0.5 bg-[#7C3AED]" />
                  <span className="text-[#7C3AED] font-bold text-sm tracking-widest uppercase">
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