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
    <section className="bg-white py-10 px-4">
      <div className="container mx-auto">
        
        {/* Cabeçalho da Seção */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Sobre Nossa Instituição
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            Somos uma organização sem fins lucrativos movida pelo amor e pelo compromisso 
            de transformar a realidade dos gatos abandonados na nossa região.
          </p>
        </div>

        {/* Grid de Cards Institucionais */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-16">
          {pilares.map((pilar, index) => (
            <div 
              key={index} 
              className="bg-white p-10 rounded-[40px] shadow-sm flex flex-col items-center text-center transition-transform hover:scale-105"
            >
              <div className={`${pilar.bgColor} p-5 rounded-2xl mb-6`}>
                {pilar.icone}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                {pilar.titulo}
              </h3>
              <p className="text-slate-500 leading-relaxed">
                {pilar.descricao}
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