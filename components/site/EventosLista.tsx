'use client'

import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const EVENTOS = [
  {
    id: 1,
    titulo: "Feira de Adoção Responsável: Encontre seu Miau",
    data: "24 de Mai",
    horario: "10:00 às 16:00",
    local: "Parque da Cidade, Espaço Pet - São Paulo, SP",
    descricao: "Venha conhecer nossos gatinhos resgatados que estão à procura de um lar amoroso. Teremos orientações veterinárias e lojinha beneficente.",
    status: "Gratuito",
  },
  {
    id: 2,
    titulo: "Workshop Online: Cuidados com Gatos Filhotes",
    data: "07 de Jun",
    horario: "19:30 às 21:00",
    local: "Transmissão Ao Vivo (Link enviado por e-mail)",
    descricao: "Aprenda tudo sobre alimentação, vacinação, adaptação e enriquecimento ambiental para gatinhos de até 6 meses com nossos especialistas.",
    status: "Inscrições Abertas",
  },
  {
    id: 3,
    titulo: "Mutirão de Voluntariado no Santuário",
    data: "21 de Jun",
    horario: "09:00 às 15:00",
    local: "Sede Instituto Ongato - São Paulo, SP",
    descricao: "Dia de cuidar do nosso espaço! Ajude na organização das salas, manutenção dos parquinhos dos gatos e, claro, dê muito carinho aos nossos residentes.",
    status: "Vagas Limitadas",
  },
];

export default function EventosLista() {
  return (
    <section className="w-full py-16 bg-white">
      <div className="container mx-auto px-4">
        
        {/* Cabeçalho centralizado no Desktop */}
        <div className="mb-12 flex flex-col md:items-center md:text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Próximos Eventos</h1>
          <p className="text-slate-500 max-w-2xl leading-relaxed md:mx-auto">
            Participe das nossas feiras de adoção, workshops educacionais e mutirões. Juntos, podemos fazer muito mais pela causa felina.
          </p>
        </div>

        {/* Lista de Eventos centralizada na página */}   
        <div className="space-y-6 max-w-4xl mx-auto">
          {EVENTOS.map((evento) => (
            <div 
              key={evento.id} 
              className="bg-white rounded-[32px] border border-slate-100 p-5 md:p-8 shadow-sm hover:shadow-md transition-all flex flex-row items-start md:items-center gap-4 md:gap-6 group"
            >
              {/* Bloco de Data (Menor no mobile, mantendo à esquerda) */}
              <div className="w-16 h-16 md:w-20 md:h-20 bg-[#F3E8FF] rounded-2xl flex flex-col items-center justify-center text-center shrink-0 border border-[#7C3AED]/10 mt-1 md:mt-0">
                <span className="text-[10px] md:text-xs font-bold text-[#7C3AED] uppercase tracking-wider">
                  {evento.data.split(" ")[2]}
                </span>
                <span className="text-xl md:text-2xl font-black text-[#7C3AED] leading-none mt-0.5">
                  {evento.data.split(" ")[0]}
                </span>
              </div>

              {/* Detalhes do Evento */}
              <div className="space-y-3 w-full">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 bg-slate-50 text-slate-500 rounded-full text-[10px] font-bold uppercase border border-slate-100">
                    {evento.status}
                  </span>
                </div>
                
                {/* Título */}
                <h3 className="text-lg md:text-2xl font-bold text-slate-900 group-hover:text-[#FF7A29] transition-colors leading-tight">
                  {evento.titulo}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed max-w-2xl">
                  {evento.descricao}
                </p>
                
                {/* Meta dados (Hora e Local perfeitamente alinhados) */}
                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-x-6 gap-y-2 text-xs font-medium text-slate-400 pt-1">
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-[#FF7A29] shrink-0" />
                    <span>{evento.horario}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-[#FF7A29] shrink-0" />
                    <span className="leading-snug">{evento.local}</span>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}