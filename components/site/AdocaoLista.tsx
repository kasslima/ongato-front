'use client'

import { useState, useMemo } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowRight, Search, SlidersHorizontal, X, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

// 1. Atualizado: Adicionado os campos 'faseVida' e 'porte' para os filtros funcionarem
const ANIMAIS = [
  { 
    id: 1, 
    nome: "Luna", 
    idade: "2 Anos", 
    tipo: "Gato", 
    faseVida: "Adulto",
    porte: "Pequeno",
    tags: ["Brincalhona", "Vacinada", "Castrada"], 
    image: "/ingatos1.jpg",
    descricaoLonga: "Luna é uma gatinha cheia de energia e amor para dar. Foi resgatada nas ruas, mas logo mostrou ser super dócil. Adora brincar com bolinhas de papel e dormir no sol da tarde. Já está castrada, vacinada e vermifugada, pronta para encher sua casa de alegria."
  },
  { 
    id: 2, 
    nome: "Oliver", 
    idade: "5 Meses", 
    tipo: "Gato", 
    faseVida: "Filhote",
    porte: "Pequeno",
    tags: ["Energético", "Dócil"], 
    image: "/ingatos2.jpg",
    descricaoLonga: "Oliver é um filhote muito curioso que adora explorar cada cantinho. Se dá super bem com outros animais e é perfeito para famílias com crianças."
  },
  { 
    id: 3, 
    nome: "Max", 
    idade: "1 Ano", 
    tipo: "Gato", 
    faseVida: "Adulto",
    porte: "Médio",
    tags: ["Leal", "Ama Passear"], 
    image: "/ingatos3.jpg", 
    descricaoLonga: "Max é um gato leal, companheiro e muito tranquilo. Gosta de observar o movimento e tirar longas sonecas." 
  },
  { 
    id: 4, 
    nome: "Bella", 
    idade: "4 Anos", 
    tipo: "Gato", 
    faseVida: "Adulto",
    porte: "Pequeno",
    tags: ["Calma", "Caseira"], 
    image: "/ingatos4.jpg", 
    descricaoLonga: "Bella é super caseira e calma, ideal para quem busca uma companhia silenciosa e carinhosa para o dia a dia." 
  },
  { 
    id: 5, 
    nome: "Milo", 
    idade: "1 Ano", 
    tipo: "Gato", 
    faseVida: "Adulto",
    porte: "Pequeno",
    tags: ["Tímido", "Gentil"], 
    image: "/ingatos5.jpg", 
    descricaoLonga: "Milo é um pouco tímido no começo, mas logo se revela um gatinho extremamente gentil e apegado." 
  },
  { 
    id: 6, 
    nome: "Daisy", 
    idade: "3 Anos", 
    tipo: "Gato", 
    faseVida: "Adulto",
    porte: "Médio",
    tags: ["Amigável", "Adestrada"], 
    image: "/ingatos6.jpg", 
    descricaoLonga: "Daisy é muito amigável, sociável e super receptiva a novas pessoas. Um doce de felino." 
  },
  { 
    id: 7, 
    nome: "Simba", 
    idade: "6 Anos", 
    tipo: "Cão", 
    faseVida: "Sênior",
    porte: "Grande",
    tags: ["Carinhoso", "Sênior"], 
    image: "/ingatos7.jpg", 
    descricaoLonga: "Simba é um cãozinho sênior muito experiente, extremamente carinhoso e que só quer uma caminha quentinha." 
  },
  { 
    id: 8, 
    nome: "Mocha", 
    idade: "2 Anos", 
    tipo: "Cão", 
    faseVida: "Adulto",
    porte: "Médio",
    tags: ["Independente", "Vocal"], 
    image: "/ingatos8.jpg", 
    descricaoLonga: "Mocha tem uma personalidade independente e adora demonstrar sua alegria emitindo sons fofos." 
  },
  { 
    id: 9, 
    nome: "Pipoca", 
    idade: "3 Meses", 
    tipo: "Cão", 
    faseVida: "Filhote",
    porte: "Pequeno",
    tags: ["Curioso", "Vacinado"], 
    image: "/ingatos9.jpg", 
    descricaoLonga: "Pipoca é um filhote muito curioso e cheio de energia, já com a vacinação em dia." 
  },
  { 
    id: 10, 
    nome: "Thor", 
    idade: "2 Anos", 
    tipo: "Cão", 
    faseVida: "Adulto",
    porte: "Grande",
    tags: ["Protetor", "Brincalhão"], 
    image: "/ingatos10.jpg", 
    descricaoLonga: "Thor é um cão de guarda nato, protetor, mas que adora uma boa brincadeira com bolinhas." 
  },
  { 
    id: 11, 
    nome: "Mel", 
    idade: "8 Meses", 
    tipo: "Cão", 
    faseVida: "Filhote",
    porte: "Médio",
    tags: ["Dócil", "Sociável"], 
    image: "/ingatos11.jpg", 
    descricaoLonga: "Mel é super sociável, adora estar com pessoas e se dá muito bem com outros animais." 
  },
  { 
    id: 12, 
    nome: "Chico", 
    idade: "3 Anos", 
    tipo: "Cão", 
    faseVida: "Adulto",
    porte: "Pequeno",
    tags: ["Dorminhoco", "Comilão"], 
    image: "/ingatos12.jpg", 
    descricaoLonga: "Chico é um cãozinho pacato, que ama tirar longas sonecas e é um verdadeiro comilão." 
  },
];

const ITENS_POR_PAGINA = 4; // Quantidade de pets exibidos por página

export default function AdocaoLista() {
  const [especieFiltro, setEspecieFiltro] = useState<"Todos" | "Gato" | "Cão">("Todos");
  const [faseVida, setFaseVida] = useState("Qualquer Idade");
  const [porte, setPorte] = useState("Todos os Portes");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [petSelecionado, setPetSelecionado] = useState<typeof ANIMAIS[0] | null>(null);

  // 2. Corrigido: Filtragem dinâmica agora engloba todos os filtros
  const animaisFiltrados = useMemo(() => {
    return ANIMAIS.filter((pet) => {
      const bateEspecie = especieFiltro === "Todos" || pet.tipo === especieFiltro;
      const bateFase = faseVida === "Qualquer Idade" || pet.faseVida === faseVida;
      const batePorte = porte === "Todos os Portes" || pet.porte === porte;

      return bateEspecie && bateFase && batePorte;
    });
  }, [especieFiltro, faseVida, porte]);

  // 3. Adicionado: Paginação real baseada nos itens filtrados
  const totalPaginas = Math.ceil(animaisFiltrados.length / ITENS_POR_PAGINA);
  
  const animaisPaginados = useMemo(() => {
    const inicio = (paginaAtual - 1) * ITENS_POR_PAGINA;
    const fim = inicio + ITENS_POR_PAGINA;
    return animaisFiltrados.slice(inicio, fim);
  }, [animaisFiltrados, paginaAtual]);

  const handleVerPerfil = (pet: typeof ANIMAIS[0]) => {
    setPetSelecionado(pet);
    document.body.style.overflow = 'hidden';
  };

  const fecharModal = () => {
    setPetSelecionado(null);
    document.body.style.overflow = 'unset';
  };

  const handleAdotarWhatsApp = (pet: typeof ANIMAIS[0]) => {
    const numeroAdmin = "5511999999999"; 
    const mensagem = `Olá! Tenho interesse em adotar o(a) ${pet.nome} (${pet.tipo} - ID: ${pet.id}) que vi no site do Instituto Ongato. Podemos conversar sobre o processo de adoção?`;
    const url = `https://wa.me/${numeroAdmin}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
  };

  return (
    <section className="w-full py-8 md:py-16 bg-white px-4 sm:px-6 relative">
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

        {/* Barra de Filtros */}
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
                        setPaginaAtual(1); // Reseta a página ao mudar o filtro
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
                  onChange={(e) => {
                    setFaseVida(e.target.value);
                    setPaginaAtual(1);
                  }}
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
                  onChange={(e) => {
                    setPorte(e.target.value);
                    setPaginaAtual(1);
                  }}
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

        {/* Grid Dinâmico de Animais (Usa animaisPaginados em vez de animaisFiltrados) */}
        {animaisPaginados.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-slate-200 rounded-3xl text-slate-400">
            Nenhum animal encontrado para este filtro específico.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {animaisPaginados.map((pet) => (
              <div 
                key={pet.id} 
                className="bg-white rounded-2xl sm:rounded-3xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-all group"
              >
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
                    onClick={() => handleVerPerfil(pet)} 
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

        {/* Paginação Dinâmica (só aparece se houver mais de uma página) */}
        {totalPaginas > 1 && (
          <div className="flex justify-center items-center gap-1.5 sm:gap-2 mt-10 md:mt-16">
            <button 
              type="button"
              disabled={paginaAtual === 1}
              onClick={() => setPaginaAtual(prev => prev - 1)}
              className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent"
            >
              <ChevronLeft size={18} />
            </button>
            
            {Array.from({ length: totalPaginas }, (_, index) => index + 1).map((num) => (
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
              disabled={paginaAtual === totalPaginas}
              onClick={() => setPaginaAtual(prev => prev + 1)}
              className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}

      </div>

      {/* ================= MODAL / BANNER DE PERFIL ================= */}
      {petSelecionado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm transition-opacity">
          <div className="absolute inset-0" onClick={fecharModal}></div>
          
          <div className="bg-white rounded-[32px] w-full max-w-4xl max-h-[90vh] overflow-y-auto relative z-10 flex flex-col md:flex-row shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            
            <button 
              onClick={fecharModal}
              className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all shadow-sm"
            >
              <X size={20} />
            </button>

            {/* Lado Esquerdo: Foto */}
            <div className="w-full md:w-1/2 p-4 sm:p-6 bg-slate-50/50 flex flex-col gap-3">
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-slate-200 border border-slate-100 shadow-inner">
                <Image 
                  src={petSelecionado.image} 
                  alt={petSelecionado.nome} 
                  fill 
                  className="object-cover"
                />
              </div>
            </div>

            {/* Lado Direito: Informações */}
            <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                    {petSelecionado.nome}
                  </h2>
                  <div className={`px-3 py-1 rounded-lg text-xs font-bold text-white uppercase tracking-wider ${
                    petSelecionado.tipo === 'Gato' ? 'bg-[#7C3AED]' : 'bg-[#FF7A29]'
                  }`}>
                    {petSelecionado.tipo}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Idade</span>
                    <span className="font-semibold text-slate-700">{petSelecionado.idade}</span>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Personalidade</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {petSelecionado.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-bold text-[#7C3AED] bg-[#F3E8FF] px-2 py-0.5 rounded-md">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-sm font-bold text-slate-900 mb-2 uppercase tracking-wider">Sobre a História</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {petSelecionado.descricaoLonga}
                  </p>
                </div>
              </div>

              {/* Botão de Ação WhatsApp */}
              <div className="pt-6 border-t border-slate-100 mt-auto">
                <Button 
                  onClick={() => handleAdotarWhatsApp(petSelecionado)}
                  className="w-full bg-[#25D366] hover:bg-[#1DA851] text-white py-6 rounded-2xl text-base font-bold shadow-lg shadow-[#25D366]/20 transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle size={20} />
                  Quero adotar via WhatsApp
                </Button>
                <p className="text-center text-[10px] text-slate-400 mt-3 font-medium">
                  Você será redirecionado para conversar com nossa equipe.
                </p>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}