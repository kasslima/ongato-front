'use client'

import { useState } from "react";
import { CreditCard, QrCode, Lock, Utensils, BriefcaseMedical, Home, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { siteConfig } from "@/lib/site";

export default function DoacaoCheckout() {
  // Estados para controlar a seleção do usuário
  const [impactoSelecionado, setImpactoSelecionado] = useState<number>(1); // Padrão: Card 2 (index 1)
  const [metodoPagamento, setMetodoPagamento] = useState<"cartao" | "pix">("cartao");
  const [copiouPix, setCopiouPix] = useState(false);

  const impactos = [
    {
      id: 0,
      titulo: "Alimente um gato por uma semana",
      descricao: "Fornece refeições nutritivas de alta qualidade para um amigo felino.",
      valor: "R$ 50",
      icone: <Utensils size={24} />,
      bgIcone: "bg-purple-100",
      textIcone: "text-[#7C3AED]"
    },
    {
      id: 1,
      titulo: "Cuidados médicos essenciais",
      descricao: "Cobre vacinas essenciais e tratamentos contra pulgas para novos resgatados.",
      valor: "R$ 150",
      icone: <BriefcaseMedical size={24} />,
      bgIcone: "bg-orange-100",
      textIcone: "text-[#FF7A29]",
      destaque: true
    },
    {
      id: 2,
      titulo: "Patrocine um Leito no Santuário",
      descricao: "Mantém um espaço aconchegante e seguro em nosso abrigo por um mês.",
      valor: "R$ 300",
      icone: <Home size={24} />,
      bgIcone: "bg-purple-100",
      textIcone: "text-[#7C3AED]"
    }
  ];


  return (
    <section className="w-full py-10 md:py-16 bg-slate-50 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        
        {/* Cabeçalho */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Doe para ajudar animais resgatados em Manaus</h1>
          <p className="text-sm sm:text-base text-slate-500">Sua doação para ONG de animais ajuda com ração, abrigo e cuidados veterinários</p>
        </div>

        {/* Grid de Impacto Responsivo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12 md:mb-16 items-start">
          {impactos.map((item) => {
            const isSelected = impactoSelecionado === item.id;
            return (
              <div 
                key={item.id}
                onClick={() => setImpactoSelecionado(item.id)}
                className={`bg-white p-6 sm:p-8 rounded-[32px] md:rounded-4xl shadow-sm border transition-all cursor-pointer flex flex-col items-center text-center relative ${
                  isSelected 
                    ? "border-[#FF7A29] ring-2 ring-[#FF7A29]/20 scale-100 md:scale-105 z-10 shadow-md" 
                    : "border-slate-100 hover:border-slate-300"
                }`}
              >
                {item.destaque && (
                  <div className="absolute -top-3.5 bg-[#FF7A29] text-white text-[9px] font-bold px-4 py-1 rounded-full uppercase tracking-widest">
                    Mais Necessário
                  </div>
                )}
                
                <div className={`w-12 h-12 ${item.bgIcone} ${item.textIcone} rounded-2xl flex items-center justify-center mb-4 md:mb-6 shrink-0`}>
                  {item.icone}
                </div>
                
                <h3 className="font-bold text-slate-900 text-base md:text-lg mb-2 leading-snug">{item.titulo}</h3>
                <p className="text-xs sm:text-sm text-slate-500 mb-4 md:mb-6 min-h-[40px]">{item.descricao}</p>
                <span className={`text-2xl font-bold mb-5 md:mb-6 ${isSelected ? "text-[#FF7A29]" : "text-slate-800"}`}>{item.valor}</span>
                
                <Button 
                  variant={isSelected ? "default" : "outline"}
                  className={`w-full rounded-xl transition-all font-semibold ${
                    isSelected 
                      ? "bg-[#FF7A29] hover:bg-[#e66a1f] text-white border-none" 
                      : "border-[#7C3AED] text-[#7C3AED] hover:bg-[#7C3AED] hover:text-white"
                  }`}
                >
                  {isSelected ? "Selecionado" : "Selecionar"}
                </Button>
              </div>
            );
          })}
        </div>

        {/* Formulário de Finalização */}
        <div className="max-w-xl mx-auto bg-white rounded-[32px] md:rounded-[40px] p-5 sm:p-8 md:p-10 shadow-sm border border-slate-100">
          
          {/* Stepper */}
          <div className="flex justify-center items-center gap-3 mb-6 md:mb-8">
            <div className="w-7 h-7 rounded-full bg-[#FF7A29] text-white flex items-center justify-center text-xs font-bold">1</div>
            <div className="h-px w-8 bg-slate-200"></div>
            <div className="w-7 h-7 rounded-full bg-[#7C3AED] text-white flex items-center justify-center text-xs">🐾</div>
            <div className="h-px w-8 bg-slate-200"></div>
            <div className="w-7 h-7 rounded-full bg-[#7C3AED] text-white flex items-center justify-center text-xs">❤️</div>
          </div>

          <h2 className="text-xl md:text-2xl font-bold text-center text-slate-900 mb-6 md:mb-8">Finalizar Doação</h2>

          {/* Abas de Pagamento Interativas */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button 
              type="button"
              onClick={() => setMetodoPagamento("cartao")}
              className={`flex items-center justify-center gap-2 py-3 px-2 rounded-xl font-bold text-xs sm:text-sm transition-all border ${
                metodoPagamento === "cartao"
                  ? "border-[#7C3AED] text-[#7C3AED] bg-[#F3E8FF]/40"
                  : "border-transparent bg-slate-50 text-slate-500 hover:bg-slate-100"
              }`}
            >
              <CreditCard size={16} /> Cartão de Crédito
            </button>
            <button 
              type="button"
              onClick={() => setMetodoPagamento("pix")}
              className={`flex items-center justify-center gap-2 py-3 px-2 rounded-xl font-bold text-xs sm:text-sm transition-all border ${
                metodoPagamento === "pix"
                  ? "border-[#7C3AED] text-[#7C3AED] bg-[#F3E8FF]/40"
                  : "border-transparent bg-slate-50 text-slate-500 hover:bg-slate-100"
              }`}
            >
              <QrCode size={16} /> Transferência PIX
            </button>
          </div>

          {/* CONTEÚDO DINÂMICO BASEADO NO MÉTODO SELECIONADO */}
          {metodoPagamento === "cartao" ? (
            /* Campos do Cartão */
            <div className="space-y-3.5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Nome no Cartão</label>
                <Input placeholder="João da Silva" className="rounded-xl py-5 border-slate-200 text-sm focus-visible:ring-[#7C3AED]" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Número do Cartão</label>
                <div className="relative">
                  <Input placeholder="0000 0000 0000 0000" className="rounded-xl py-5 border-slate-200 text-sm pr-10 focus-visible:ring-[#7C3AED]" />
                  <Lock className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Validade</label>
                  <Input placeholder="MM/AA" className="rounded-xl py-5 border-slate-200 text-sm focus-visible:ring-[#7C3AED]" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">CVV</label>
                  <Input placeholder="123" className="rounded-xl py-5 border-slate-200 text-sm focus-visible:ring-[#7C3AED]" />
                </div>
              </div>

              {/* Checkbox Recorrência (Exclusivo para Cartão) */}
              <div className="flex items-start gap-2.5 pt-2">
                <input type="checkbox" id="recorrencia" className="w-4 h-4 mt-0.5 rounded border-slate-300 accent-[#FF7A29] shrink-0" />
                <label htmlFor="recorrencia" className="text-xs text-slate-500 italic leading-snug cursor-pointer select-none">
                  Tornar esta uma doação mensal para nos apoiar a longo prazo.
                </label>
              </div>
            </div>
          ) : (
            /* Tela do PIX */
            <div className="flex flex-col items-center text-center p-4 border border-dashed border-slate-200 rounded-2xl bg-slate-50/50 space-y-4 animate-fadeIn">
              <div className="bg-white p-3 rounded-xl shadow-inner border border-slate-100">
                {/* QR Code Simulado Dinamicamente */}
                <div className="w-36 h-36 bg-slate-200 flex items-center justify-center rounded-lg text-slate-400 text-xs font-mono p-2">
                  [ QR CODE INSTITUTO ONGATO ]
                </div>
              </div>
              <div className="space-y-1 max-w-xs">
                <h4 className="font-bold text-xs uppercase text-slate-700 tracking-wider">Pix Copia e Cola</h4>
                <p className="text-xs text-slate-400">Copie o código abaixo para pagar no app do seu banco.</p>
              </div>
              <button
                type="button"
                onClick={handleCopyPix}
                className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold transition-all border ${
                  copiouPix 
                    ? "bg-emerald-50 text-emerald-600 border-emerald-200" 
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                }`}
              >
                {copiouPix ? <Check size={14} /> : <Copy size={14} />}
                {copiouPix ? "Código Copiado!" : "Copiar Código Pix"}
              </button>
            </div>
          )}

          {/* Botão de Ação Principal */}
          <Button className="w-full bg-[#FF7A29] hover:bg-[#e66a1f] text-white py-6 md:py-7 rounded-xl font-bold text-base mt-6 md:mt-8 shadow-md transition-all">
            {metodoPagamento === "cartao" ? "Confirmar Doação" : "Já realizei o PIX"}
          </Button>

          <p className="text-center text-[10px] text-slate-400 mt-4 flex items-center justify-center gap-1">
            <Lock size={10} /> Doação segura para o Instituto Ongato em Manaus
          </p>
          <p className="text-center text-[10px] text-slate-400 mt-2">
            CNPJ: {siteConfig.cnpj}
          </p>
        </div>

      </div>
    </section>
  );
}
