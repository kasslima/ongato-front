'use client'

import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const ANIMAIS = [
  { id: 1, nome: "Luna", idade: "2 Anos", tipo: "Gato", tags: ["Brincalhona", "Vacinada"], img: "/ingato1.jpg" },
  { id: 2, nome: "Oliver", idade: "5 Meses", tipo: "Gato", tags: ["Energético", "Dócil"], img: "/ingato2.jpg" },
  { id: 3, nome: "Max", idade: "1 Ano", tipo: "Cão", tags: ["Leal", "Ama Passear"], img: "/ingato3.jpg" },
  { id: 4, nome: "Bella", idade: "4 Anos", tipo: "Gato", tags: ["Calma", "Caseira"], img: "/ingato4.jpg" },
  { id: 5, nome: "Milo", idade: "1 Ano", tipo: "Gato", tags: ["Tímido", "Gentil"], img: "/ingato5.jpg" },
  { id: 6, nome: "Daisy", idade: "3 Anos", tipo: "Cão", tags: ["Amigável", "Adestrada"], img: "/ingato6.jpg" },
  { id: 7, nome: "Simba", idade: "6 Anos", tipo: "Gato", tags: ["Carinhoso", "Sênior"], img: "/ingato7.jpg" },
  { id: 8, nome: "Mocha", idade: "2 Anos", tipo: "Gato", tags: ["Independente", "Vocal"], img: "/ingato8.jpg" },
];

export default function AdocaoLista() {
  return (
    <section className="w-full py-12 bg-white">
      <div className="container mx-auto px-4">
        
        {/* Título e Descrição */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Encontre seu Companheiro Ideal</h1>
          <p className="text-slate-600 max-w-3xl">
            Cada residente do Instituto Ongato tem uma história. Explore nossos cães e gatos disponíveis e ajude-nos a escrever o próximo capítulo deles em um lar definitivo e amoroso.
          </p>
        </div>

        {/* Barra de Filtros */}
        <div className="flex flex-wrap items-end justify-between gap-6 bg-slate-50 p-6 rounded-3xl mb-10">
          <div className="flex flex-wrap gap-6">
            {/* Espécie */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Espécie</span>
              <div className="flex bg-white p-1 rounded-xl shadow-sm border border-slate-100">
                <button className="px-4 py-1.5 rounded-lg bg-[#7C3AED] text-white text-sm font-medium">Todos</button>
                <button className="px-4 py-1.5 rounded-lg text-slate-500 text-sm font-medium hover:bg-slate-50">Gatos</button>
                <button className="px-4 py-1.5 rounded-lg text-slate-500 text-sm font-medium hover:bg-slate-50">Cães</button>
              </div>
            </div>

            {/* Fase da Vida */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Fase da Vida</span>
              <select className="bg-white border border-slate-100 p-2 rounded-xl text-sm font-medium text-slate-600 outline-none shadow-sm min-w-37.5">
                <option>Qualquer Idade</option>
                <option>Filhote</option>
                <option>Adulto</option>
                <option>Sênior</option>
              </select>
            </div>

            {/* Porte */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Porte</span>
              <select className="bg-white border border-slate-100 p-2 rounded-xl text-sm font-medium text-slate-600 outline-none shadow-sm min-w-37.5">
                <option>Todos os Portes</option>
                <option>Pequeno</option>
                <option>Médio</option>
                <option>Grande</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-400 text-sm italic">
            <Search size={16} />
            Mostrando 12 animais
          </div>
        </div>

        {/* Grid de Animais */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ANIMAIS.map((pet) => (
            <div key={pet.id} className="bg-white rounded-4xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
              <div className="relative aspect-square">
                <Image src={pet.img} alt={pet.nome} fill className="object-cover" />
                <div className={`absolute top-3 left-3 px-3 py-1 rounded-lg text-[10px] font-bold text-white uppercase ${pet.tipo === 'Gato' ? 'bg-[#7C3AED]' : 'bg-[#FF7A29]'}`}>
                  {pet.tipo}
                </div>
              </div>
              
              <div className="p-5">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xl font-bold text-slate-800">{pet.nome}</h3>
                  <span className="text-sm text-slate-400">{pet.idade}</span>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {pet.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-[#F3E8FF] text-[#7C3AED] rounded-full text-[10px] font-bold">
                      {tag}
                    </span>
                  ))}
                </div>

                <Button variant="outline" className="w-full border-[#7C3AED] text-[#7C3AED] hover:bg-[#7C3AED] hover:text-white rounded-xl py-5 font-bold group">
                  Ver Perfil <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Paginação */}
        <div className="flex justify-center items-center gap-2 mt-16">
          <button className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 text-slate-400 hover:bg-slate-50">
            <ChevronLeft size={20} />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#7C3AED] text-white font-bold">1</button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full text-slate-400 hover:bg-slate-50 font-medium">2</button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full text-slate-400 hover:bg-slate-50 font-medium">3</button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 text-slate-400 hover:bg-slate-50">
            <ChevronRight size={20} />
          </button>
        </div>

      </div>
    </section>
  );
}