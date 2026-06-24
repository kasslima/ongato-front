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
      <div className="container mx-auto px-4 ">
        
        {/* Cabeçalho */}
        <div className="mb-12">
          {/* CORREÇÃO: Removido o trecho de código quebrado 'border-[#FF7A29' */}
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Próximos Eventos</h1>
          <p className="text-slate-500 max-w-2xl leading-relaxed">
            Participe das nossas feiras de adoção, workshops educacionais e mutirões. Juntos, podemos fazer muito mais pela causa felina.
          </p>
        </div>

        {/* Lista de Eventos */}   
        <div className="space-y-6 max-w-4xl">
          {EVENTOS.map((evento) => (
            <div 
              key={evento.id} 
              className="bg-white rounded-[32px] border border-slate-100 p-6 md:p-8 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group"
            >
              {/* Lado Esquerdo: Data e Info */}
              <div className="flex items-start gap-6 flex-1">
                
                {/* Bloco de Data (Garante que exiba o Dia e o Mês Corretamente) */}
                <div className="w-20 h-20 bg-[#F3E8FF] rounded-2xl flex flex-col items-center justify-center text-center shrink-0 border border-[#7C3AED]/10">
                  <span className="text-xs font-bold text-[#7C3AED] uppercase tracking-wider">
                    {evento.data.split(" ")[2]} {/* Captura o 'Mai' ou 'Jun' */}
                  </span>
                  <span className="text-2xl font-black text-[#7C3AED] leading-none">
                    {evento.data.split(" ")[0]} {/* Captura o número '24', '07', etc. */}
                  </span>
                </div>

                {/* Detalhes do Evento */}
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 bg-slate-50 text-slate-500 rounded-full text-[10px] font-bold uppercase border border-slate-100">
                      {evento.status}
                    </span>
                  </div>
                  
                  {/* Título com hover dinâmico combinando com o botão */}
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 group-hover:text-[#FF7A29] transition-colors">
                    {evento.titulo}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed max-w-2xl">
                    {evento.descricao}
                  </p>
                  
                  {/* Meta dados (Hora e Local) */}
                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-medium text-slate-400 pt-1">
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} className="text-[#FF7A29]" />
                      {evento.horario}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin size={14} className="text-[#FF7A29]" />
                      {evento.local}
                    </div>
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