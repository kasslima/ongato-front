'use client'

import { useState, FormEvent } from "react";
import { MapPin, Mail, Phone, ExternalLink, Share2, Video, ArrowRight, PawPrint, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Contato() {
  // Estados para gerenciar as ações do formulário
  const [enviando, setEnviando] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  // Função para simular o envio do formulário de contato
  const handleEnviarMensagem = (e: FormEvent) => {
    e.preventDefault();
    setEnviando(true);

    // Simula uma requisição de API de 2 segundos
    setTimeout(() => {
      setEnviando(false);
      setSucesso(true);
      
      // Reseta a mensagem de sucesso após 5 segundos
      setTimeout(() => setSucesso(false), 5000);
    }, 2000);
  };

  return (
    <section className="w-full py-10 md:py-16 bg-white px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        
        {/* Cabeçalho */}
        <div className="text-center mb-10 md:mb-16">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3 md:mb-4 tracking-tight">
            Entre em Contato
          </h1>
          <p className="text-slate-500 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Estamos aqui para ajudar você a encontrar seu companheiro felino perfeito ou tirar qualquer dúvida sobre nossos programas de bem-estar.
          </p>
        </div>

        {/* Grid de Informações e Formulário */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-12 md:mb-20">
          
          {/* Coluna Esquerda: Info Cards */}
          <div className="lg:col-span-4 space-y-4 sm:space-y-6 flex flex-col">
            
            {/* Card Endereço */}
            <div className="flex flex-col items-center text-center lg:flex-row lg:items-start lg:text-left gap-4 p-5 sm:p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
              <div className="w-10 h-10 bg-[#F3E8FF] text-[#7C3AED] rounded-lg flex items-center justify-center shrink-0">
                <MapPin size={20} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">Visite-nos</h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mt-1">
                  Rua dos Gatos, 123, Vila Felina<br />São Paulo, SP 01234-567
                </p>
              </div>
            </div>

            {/* Card Email */}
            <div className="flex flex-col items-center text-center lg:flex-row lg:items-start lg:text-left gap-4 p-5 sm:p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
              <div className="w-10 h-10 bg-[#F3E8FF] text-[#7C3AED] rounded-lg flex items-center justify-center shrink-0">
                <Mail size={20} />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">E-mail</h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mt-1 break-words">
                  contato@institutoongato.org<br />adocoes@institutoongato.org
                </p>
              </div>
            </div>

            {/* Card Telefone */}
            <div className="flex flex-col items-center text-center lg:flex-row lg:items-start lg:text-left gap-4 p-5 sm:p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
              <div className="w-10 h-10 bg-[#F3E8FF] text-[#7C3AED] rounded-lg flex items-center justify-center shrink-0">
                <Phone size={20} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">Ligue para nós</h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mt-1">
                  +55 (11) 98765-4321<br />Seg-Sex: 9h - 18h
                </p>
              </div>
            </div>

            {/* Redes Sociais */}
            <div className="pt-2 flex flex-col items-center lg:items-start text-center lg:text-left">
              <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] block mb-3">
                Siga nossos resgates
              </span>
              <div className="flex gap-3 justify-center lg:justify-start">
                <a href="#" aria-label="Link Externo" className="w-10 h-10 rounded-full bg-[#F3E8FF] text-[#7C3AED] flex items-center justify-center hover:bg-[#7C3AED] hover:text-white transition-all shadow-sm shrink-0">
                  <ExternalLink size={18} />
                </a>
                <a href="#" aria-label="Compartilhar" className="w-10 h-10 rounded-full bg-[#F3E8FF] text-[#7C3AED] flex items-center justify-center hover:bg-[#7C3AED] hover:text-white transition-all shadow-sm shrink-0">
                  <Share2 size={18} />
                </a>
                <a href="#" aria-label="Vídeos" className="w-10 h-10 rounded-full bg-[#F3E8FF] text-[#7C3AED] flex items-center justify-center hover:bg-[#7C3AED] hover:text-white transition-all shadow-sm shrink-0">
                  <Video size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Coluna Direita: Formulário Interativo */}
          <div className="lg:col-span-8 bg-white p-5 sm:p-8 md:p-10 rounded-[32px] md:rounded-[40px] shadow-sm border border-slate-100">
            {sucesso ? (
              <div className="flex flex-col items-center justify-center py-12 text-center space-y-4 animate-in fade-in zoom-in duration-300">
                <CheckCircle2 size={56} className="text-emerald-500 animate-bounce" />
                <h3 className="text-xl font-bold text-slate-900">Mensagem Enviada!</h3>
                <p className="text-sm text-slate-500 max-w-sm">
                  Obrigado por entrar em contato. Nossa equipe de gateiros responderá o mais breve possível.
                </p>
              </div>
            ) : (
              <form onSubmit={handleEnviarMensagem} className="space-y-4 md:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Nome Completo</label>
                    <Input required placeholder="Seu Nome" className="rounded-xl border-slate-200 py-5 text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">E-mail</label>
                    <Input required type="email" placeholder="ola@exemplo.com" className="rounded-xl border-slate-200 py-5 text-sm" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Assunto</label>
                  <select required className="w-full bg-white border border-slate-200 p-3 rounded-xl text-sm text-slate-600 outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-all h-12">
                    <option>Dúvida sobre Adoção</option>
                    <option>Quero ser Voluntário</option>
                    <option>Relatar maus tratos</option>
                    <option>Outros</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Sua Mensagem</label>
                  <Textarea 
                    required
                    placeholder="Como podemos ajudar você e nossos gatos?" 
                    className="rounded-xl border-slate-200 min-h-[120px] md:min-h-[150px] text-sm resize-none" 
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={enviando}
                  className="w-full bg-[#FF7A29] hover:bg-[#e66a1f] disabled:bg-slate-300 text-white py-6 md:py-7 rounded-xl font-bold text-base md:text-lg shadow-md transition-all uppercase tracking-widest mt-2"
                >
                  {enviando ? "Enviando..." : "Enviar Mensagem"}
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* Seção do Mapa Responsiva */}
        <div className="relative w-full h-[500px] md:h-[450px] rounded-[32px] md:rounded-[40px] overflow-hidden bg-[#2D3139] flex flex-col lg:block">
          
          {/* Fundo do mapa */}
          <div className="absolute inset-0 opacity-40 mix-blend-overlay grayscale bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/-46.6333,-23.5505,12/1200x450?access_token=YOUR_TOKEN')] bg-cover bg-center" />
          
          {/* Pin Central Visual */}
          <div className="absolute inset-0 flex items-center justify-center -translate-y-16 lg:translate-y-0">
             <div className="w-32 h-32 md:w-40 md:h-40 bg-white/10 rounded-full animate-ping absolute" />
             <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 rounded-full flex items-center justify-center relative shadow-2xl">
                <MapPin className="text-[#FF7A29] fill-[#FF7A29]" size={32} />
             </div>
          </div>

          {/* Card Flutuante do Mapa Centralizado no Mobile */}
          <div className="absolute bottom-0 left-0 w-full lg:w-auto lg:bottom-8 lg:left-8 lg:max-w-sm bg-white p-6 md:p-8 rounded-t-[24px] lg:rounded-3xl shadow-2xl border-t lg:border border-slate-100 z-10 flex flex-col items-center text-center lg:items-start lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 text-[#7C3AED] mb-3">
              <PawPrint size={16} fill="currentColor" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Sede Instituto Ongato</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 md:mb-6">
              Nosso santuário está aberto apenas para visitas agendadas para garantir um ambiente calmo para nossos residentes.
            </p>
            <button 
              type="button" 
              onClick={() => window.open("https://maps.google.com", "_blank")}
              className="flex items-center justify-center lg:justify-start gap-2 text-[#7C3AED] font-bold text-xs sm:text-sm hover:underline cursor-pointer group w-full lg:w-auto"
            >
              COMO CHEGAR 
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}