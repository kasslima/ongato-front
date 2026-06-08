'use client'

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Gatos() {
  const gatos = [
    {
      nome: "Oliver",
      idade: "Filhote",
      tags: ["VACINADO", "BRINCALHÃO"],
      imagem: "/ingatos1.jpg", // Substitua pelos seus arquivos
    },
    {
      nome: "Luna",
      idade: "Sênior",
      tags: ["DÓCIL", "AMIGA DE CRIANÇAS"],
      imagem: "/ingatos2.jpg",
    },
    {
      nome: "Oliver", // O gato preto da imagem
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

  return (
    <section className="py-10 px-4" style={{background: 'linear-gradient(to bottom, #f3e8ff, #f5f3ff, #ffffff)'}}>
      <div className="container mx-auto">
        
        {/* Cabeçalho da Seção */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-2">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
              Residentes em Destaque
            </h2>
            <p className="text-slate-500 text-lg">
              Conheça alguns dos nossos gatos à espera de alguém especial.
            </p>
          </div>
          <Link 
            href="/adocao" 
            className="flex items-center gap-2 text-[#7C3AED] font-bold hover:underline"
          >
            Ver Todos os Gatos <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Grid de Gatos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {gatos.map((gato, index) => (
            <div 
              key={index} 
              className="group bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-3 tansition-all duration-300"
            >
              {/* Container da Imagem */}
              <div className="relative h-64 w-full">
                <Image
                  src={gato.imagem}
                  alt={gato.nome}
                  fill
                  className="object-cover"
                />
                {/* Badge de Idade (Canto superior direito) */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full text-[10px] font-bold text-[#7C3AED] uppercase tracking-wider">
                  {gato.idade}
                </div>
              </div>

              {/* Informações */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  {gato.nome}
                </h3>
                
                {/* Tags */}
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

                {/* Botão */}
                <button className="w-full border-2 border-[#7C3AED] text-[#7C3AED] py-2 rounded-full font-bold text-sm hover:bg-[#7C3AED] hover:text-white transition-colors">
                  Conhecer {gato.nome}
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}