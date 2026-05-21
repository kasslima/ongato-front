'use client'
import Image from "next/image";
import { Search, ClipboardList, Home, PawPrint } from "lucide-react";

export default function ComoAdotar() {
  const etapas = [
    {
      titulo: "Conheça nossos Gatos",
      descricao: "Explore os perfis dos nossos residentes e encontre uma personalidade que combine perfeitamente com você.",
      icone: <Search className="w-6 h-6 text-[#7C3AED]" />,
      bgColor: "bg-purple-100",
    },
    {
      titulo: "Envie sua Candidatura",
      descricao: "Preencha nosso formulário para nos ajudar a entender seu ambiente doméstico e suas necessidades.",
      icone: <ClipboardList className="w-6 h-6 text-[#FF7A29]" />,
      bgColor: "bg-orange-100",
    },
    {
      titulo: "Lar Eterno",
      descricao: "Uma vez aprovado, conheça seu novo companheiro e comece sua jornada de amizade juntos.",
      icone: <Home className="w-6 h-6 text-[#7C3AED]" />,
      bgColor: "bg-purple-100",
    },
  ];

  return (
    <section className="bg-white py-20 px-4">
      <div className="container mx-auto">
        
        {/* Cabeçalho da Seção */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Como Funciona a Adoção
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            Nosso processo simplificado garante que cada gato e família encontrem o 
            par perfeito através de cuidado e compromisso.
          </p>
        </div>

        {/* Grid de Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {etapas.map((etapa, index) => (
            <div 
              key={index} 
              className="bg-white p-10 rounded-[40px] shadow-sm flex flex-col items-center text-center transition-transform hover:scale-105"
            >
              <div className={`${etapa.bgColor} p-5 rounded-2xl mb-6`}>
                {etapa.icone}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                {etapa.titulo}
              </h3>
              <p className="text-slate-500 leading-relaxed">
                {etapa.descricao}
              </p>
            </div>
          ))}
        </div>

        {/* Divisor de Patinhas */}
        <div className="flex items-center justify-center gap-4">
          <PawPrint className="text-[#FF7A29] w-6 h-6" />
          <div className="h-0.5 w-16 md:w-24 bg-[#FF7A29] rounded-full" />
          <PawPrint className="text-[#FF7A29] w-6 h-6" />
          <div className="h-0.5 w-16 md:w-24 bg-[#FF7A29] rounded-full" />
          <PawPrint className="text-[#FF7A29] w-6 h-6" />
        </div>

      </div>
    </section>
  );
}