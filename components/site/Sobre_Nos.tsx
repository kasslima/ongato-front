'use client'

import { Heart, ShieldCheck, Users, PawPrint } from "lucide-react";

export default function NossaInstituicao() {
  const pilares = [
    {
      titulo: "Nossa Missão",
      descricao: "Resgatar, reabilitar e encontrar lares amorosos para felinos em situação de risco, garantindo uma segunda chance digna a cada um deles.",
      icone: <Heart className="w-6 h-6 text-[#7C3AED]" />,
      bgColor: "bg-purple-100",
    },
    {
      titulo: "Cuidado Integral",
      descricao: "Oferecemos assistência veterinária completa, castração, alimentação de qualidade e socialização antes de qualquer rito de adoção.",
      icone: <ShieldCheck className="w-6 h-6 text-[#FF7A29]" />,
      bgColor: "bg-orange-100",
    },
    {
      titulo: "Conscientização",
      descricao: "Atuamos na comunidade educando sobre a posse responsável, a importância da castração e o combate ativo ao abandono de animais.",
      icone: <Users className="w-6 h-6 text-[#7C3AED]" />,
      bgColor: "bg-purple-100",
    },
  ];

  return (
    <section className="bg-white py-12 md:py-20 px-5">
      <div className="container mx-auto max-w-6xl">
        
        {/* Cabeçalho da Seção */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3 md:mb-4 tracking-tight">
            Sobre Nossa Instituição
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed">
            Somos uma organização sem fins lucrativos movida pelo amor e pelo compromisso 
            de transformar a realidade dos gatos abandonados na nossa região.
          </p>
        </div>

        {/* Grid de Cards Institucionais 
          - No mobile: 1 coluna com gap-6 para respirar
          - No tablet: 2 colunas para não ficar gigante
          - No desktop: 3 colunas com gap-8 para espaçamento elegante
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
          {pilares.map((pilar, index) => (
            <div 
              key={index} 
            
              className={`bg-white p-6 sm:p-8 md:p-10 rounded-[32px] md:rounded-[40px] shadow-sm border border-slate-100 flex flex-col items-center text-center transition-all duration-300 hover:scale-[1.02] md:hover:scale-105 ${
                index === 2 ? "sm:col-span-2 lg:col-span-1 sm:max-w-md sm:mx-auto lg:max-w-none" : ""
              }`}
            >
              <div className={`${pilar.bgColor} p-4 md:p-5 rounded-2xl mb-5 md:mb-6 shrink-0`}>
                {pilar.icone}
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2 md:mb-4">
                {pilar.titulo}
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm md:text-base leading-relaxed">
                {pilar.descricao}
              </p>
            </div>
          ))}
        </div>

        {/* Divisor de Patinhas Responsivo (Fica menor e mais justo em telas pequenas) */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 opacity-80">
          <PawPrint className="text-[#FF7A29] w-5 h-5 md:w-6 md:h-6 shrink-0" />
          <div className="h-0.5 w-10 sm:w-16 md:w-24 bg-[#FF7A29] rounded-full" />
          <PawPrint className="text-[#FF7A29] w-5 h-5 md:w-6 md:h-6 shrink-0" />
          <div className="h-0.5 w-10 sm:w-16 md:w-24 bg-[#FF7A29] rounded-full" />
          <PawPrint className="text-[#FF7A29] w-5 h-5 md:w-6 md:h-6 shrink-0" />
        </div>

      </div>
    </section>
  );
}