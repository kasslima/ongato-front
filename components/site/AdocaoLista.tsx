'use client'

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowRight, Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

// Lista expandida para 12 animais (com placeholders prontos para suas URLs)
const ANIMAIS = [
  { id: 1, nome: "Luna", idade: "2 Anos", tipo: "Gato", tags: ["Brincalhona", "Vacinada"], image: "/ingatos1.jpg" },
  { id: 2, nome: "Oliver", idade: "5 Meses", tipo: "Gato", tags: ["Energético", "Dócil"], image: "/ingatos2.jpg" },
  { id: 3, nome: "Max", idade: "1 Ano", tipo: "Cão", tags: ["Leal", "Ama Passear"], image: "/ingatos3.jpg" },
  { id: 4, nome: "Bella", idade: "4 Anos", tipo: "Gato", tags: ["Calma", "Caseira"], image: "/ingatos4.jpg" },
  { id: 5, nome: "Milo", idade: "1 Ano", tipo: "Gato", tags: ["Tímido", "Gentil"], image: "/ingatos8.jpg" },
  { id: 6, nome: "Daisy", idade: "3 Anos", tipo: "Cão", tags: ["Amigável", "Adestrada"], image: "/ingatos9.jpg" },
  { id: 7, nome: "Simba", idade: "6 Anos", tipo: "Gato", tags: ["Carinhoso", "Sênior"], image: "/ingatos10.jpg" },
  { id: 8, nome: "Mocha", idade: "2 Anos", tipo: "Gato", tags: ["Independente", "Vocal"], image: "/ingatos11.jpg" },
  { id: 9, nome: "Pipoca", idade: "3 Meses", tipo: "Gato", tags: ["Curioso", "Vacinado"], image: "/ingatos12.jpg" },
  { id: 10, nome: "Thor", idade: "2 Anos", tipo: "Cão", tags: ["Protetor", "Brincalhão"], image: "/ingatos13.jpg" },
  { id: 11, nome: "Mel", idade: "8 Meses", tipo: "Cão", tags: ["Dócil", "Sociável"], image: "/ingatos14.jpg" },
  { id: 12, nome: "Chico", idade: "3 Anos", tipo: "Gato", tags: ["Dorminhoco", "Comilão"], image: "/ingatos15.jpg" },
];

export default function AdocaoLista() {
  // Estados funcionais para controlar filtros e paginação
  const [especieFiltro, setEspecieFiltro] = useState<"Todos" | "Gato" | "Cão">("Todos");
  const [faseVida, setFaseVida] = useState("Qualquer Idade");
  const [porte, setPorte] = useState("Todos os Portes");
  const [paginaAtual, setPaginaAtual] = useState(1);

  // Filtragem dinâmica dos animais em tempo real
  const animaisFiltrados = ANIMAIS.filter((pet) => {
    if (especieFiltro !== "Todos" && pet.tipo !== especieFiltro) return false;
    // (Buscadores futuros para idade e porte podem ser acoplados aqui sem quebrar a estrutura)
    return true;
  });

  // Função fictícia para simular a navegação até o perfil
  const handleVerPerfil = (id: number, nome: string) => {
    // Substitua pelo seu roteador se preferir, ex: router.push(`/adocao/${id}`)
    alert(`Redirecionando para o perfil completo de ${nome} (ID: ${id})`);
  };

  return (
    <section className="w-full py-8 md:py-16 bg-white px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        
        {/* Título e Descrição */}
        <div className="mb-8 md:mb-12 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3 md:mb-4 tracking-tight">
            Encontre seu Companheiro Ideal
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-3xl leading-relaxed">
            Cada residente do Instituto Ongato tem uma história. Explore nossos cães e gatos disponíveis e ajude-nos a escrever o próximo capítulo deles em um lar definitivo e amoroso.
          </p>
        </div>

        {/* Barra de Filtros Responsiva */}
        <div className="bg-slate-50 p-4 sm:p-6 rounded-2xl md:rounded-3xl mb-8 flex flex-col gap-4 shadow-sm">
          <div className="flex items-center gap-2 text-slate-700 font-bold text-xs uppercase tracking-wider border-b border-slate-200/60 pb-2 md:hidden">
            <SlidersHorizontal size={14} /> Filtros de Busca
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:flex flex-wrap items-end gap-4 md:gap-6 w-full md:w-auto">
              
              {/* Espécie */}
              <div className="flex flex-col gap-1.5 col-span-1 sm:col-span-2 md:col-span-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Espécie</span>
                <div className="flex bg-white p-1 rounded-xl border border-slate-200 shadow-sm w-full">
                  {(["Todos", "Gato", "Cão"] as const).map((tipo) => (
                    <button
                      key={tipo}
                      type="button"
                      onClick={() => {
                        setEspecieFiltro(tipo);
                        setPaginaAtual(1); // Reseta a página ao filtrar
                      }}
                      className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                        especieFiltro === tipo
                          ? "bg-[#7C3AED] text-white shadow-sm"
                          : "text-slate-500 hover:bg-slate-50"
                      }`}
                    >
                      {tipo === "Todos" ? "Todos" : tipo === "Gato" ? "Gatos" : "Cães"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fase da Vida */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Fase da Vida</span>
                <select 
                  value={faseVida}
                  onChange={(e) => setFaseVida(e.target.value)}
                  className="bg-white border border-slate-200 p-2.5 rounded-xl text-xs sm:text-sm font-medium text-slate-600 outline-none shadow-sm min-w-full md:min-w-[160px] h-11"
                >
                  <option value="Qualquer Idade">Qualquer Idade</option>
                  <option value="Filhote">Filhote</option>
                  <option value="Adulto">Adulto</option>
                  <option value="Sênior">Sênior</option>
                </select>
              </div>

              {/* Porte */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Porte</span>
                <select 
                  value={porte}
                  onChange={(e) => setPorte(e.target.value)}
                  className="bg-white border border-slate-200 p-2.5 rounded-xl text-xs sm:text-sm font-medium text-slate-600 outline-none shadow-sm min-w-full md:min-w-[160px] h-11"
                >
                  <option value="Todos os Portes">Todos os Portes</option>
                  <option value="Pequeno">Pequeno</option>
                  <option value="Médio">Médio</option>
                  <option value="Grande">Grande</option>
                </select>
              </div>
            </div>

            {/* Contador de Itens */}
            <div className="flex items-center gap-1.5 text-slate-400 text-xs sm:text-sm italic justify-center md:justify-start shrink-0 pt-2 md:pt-0">
              <Search size={14} />
              Mostrando {animaisFiltrados.length} {animaisFiltrados.length === 1 ? 'animal' : 'animais'}
            </div>
          </div>
        </div>

        {/* Grid Dinâmico de Animais (1 coluna em celulares, 2 em tablets e 4 em desktops) */}
        {animaisFiltrados.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-slate-200 rounded-3xl text-slate-400">
            Nenhum animal encontrado para este filtro específico.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {animaisFiltrados.map((pet) => (
              <div 
                key={pet.id} 
                className="bg-white rounded-2xl sm:rounded-3xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-all group"
              >
                {/* Imagem responsiva */}
                <div className="relative w-full aspect-square bg-slate-100">
                  <Image 
                    src={pet.image} 
                    alt={pet.nome} 
                    fill 
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    priority={pet.id <= 4}
                  />
                  <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-md text-[9px] font-bold text-white uppercase tracking-wider ${
                    pet.tipo === 'Gato' ? 'bg-[#7C3AED]' : 'bg-[#FF7A29]'
                  }`}>
                    {pet.tipo}
                  </div>
                </div>
                
                <div className="p-4 sm:p-5">
                  <div className="flex justify-between items-center mb-2.5">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-800 tracking-tight">{pet.nome}</h3>
                    <span className="text-xs sm:text-sm text-slate-400 font-medium">{pet.idade}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {pet.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-0.5 bg-[#F3E8FF] text-[#7C3AED] rounded-full text-[9px] sm:text-[10px] font-bold">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Button 
                    type="button"
                    onClick={() => handleVerPerfil(pet.id, pet.nome)}
                    variant="outline" 
                    className="w-full border-[#7C3AED] text-[#7C3AED] hover:bg-[#7C3AED] hover:text-white rounded-xl py-4 sm:py-5 font-bold group text-xs sm:text-sm transition-all shadow-sm"
                  >
                    Ver Perfil 
                    <ArrowRight size={14} className="ml-1.5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Paginação Interativa */}
        <div className="flex justify-center items-center gap-1.5 sm:gap-2 mt-10 md:mt-16">
          <button 
            type="button"
            disabled={paginaAtual === 1}
            onClick={() => setPaginaAtual(prev => prev - 1)}
            className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent"
          >
            <ChevronLeft size={18} />
          </button>
          
          {[1, 2, 3].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => setPaginaAtual(num)}
              className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full text-xs sm:text-sm font-bold transition-all ${
                paginaAtual === num
                  ? "bg-[#7C3AED] text-white shadow-sm"
                  : "text-slate-400 hover:bg-slate-50 font-medium"
              }`}
            >
              {num}
            </button>
          ))}
          
          <button 
            type="button"
            disabled={paginaAtual === 3}
            onClick={() => setPaginaAtual(prev => prev + 1)}
            className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent"
          >
            <ChevronRight size={18} />
          </button>
        </div>

      </div>
    </section>
  );
}