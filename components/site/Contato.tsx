'use client'

import { MapPin, Mail, Phone, ExternalLink, Share2, Video, ArrowRight, PawPrint } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";


export default function Contato() {
  return (
    <section className="w-full py-16 bg-white">
      <div className="container mx-auto px-4">
        
        {/* Cabeçalho */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Entre em Contato</h1>
          <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Estamos aqui para ajudar você a encontrar seu companheiro felino perfeito ou tirar qualquer dúvida sobre nossos programas de bem-estar.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          
          {/* Coluna Esquerda: Info Cards */}
          <div className="lg:col-span-4 space-y-6">
            {/* Card Endereço */}
            <div className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-sm border border-slate-50">
              <div className="w-10 h-10 bg-[#F3E8FF] text-[#7C3AED] rounded-lg flex items-center justify-center shrink-0">
                <MapPin size={20} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Visite-nos</h3>
                <p className="text-sm text-slate-500 leading-relaxed mt-1">
                  Rua dos Gatos, 123, Vila Felina<br />São Paulo, SP 01234-567
                </p>
              </div>
            </div>

            {/* Card Email */}
            <div className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-sm border border-slate-50">
              <div className="w-10 h-10 bg-[#F3E8FF] text-[#7C3AED] rounded-lg flex items-center justify-center shrink-0">
                <Mail size={20} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">E-mail</h3>
                <p className="text-sm text-slate-500 leading-relaxed mt-1">
                  contato@institutoongato.org<br />adocoes@institutoongato.org
                </p>
              </div>
            </div>

            {/* Card Telefone */}
            <div className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-sm border border-slate-50">
              <div className="w-10 h-10 bg-[#F3E8FF] text-[#7C3AED] rounded-lg flex items-center justify-center shrink-0">
                <Phone size={20} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Ligue para nós</h3>
                <p className="text-sm text-slate-500 leading-relaxed mt-1">
                  +55 (11) 98765-4321<br />Seg-Sex: 9h - 18h
                </p>
              </div>
            </div>

            {/* Redes Sociais */}
            <div className="pt-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] block mb-4">Siga nossos resgates</span>
              <div className="flex gap-3">
                <button className="w-10 h-10 rounded-full bg-[#F3E8FF] text-[#7C3AED] flex items-center justify-center hover:bg-[#7C3AED] hover:text-white transition-all shadow-sm">
                  <ExternalLink size={18} />
                </button>
                <button className="w-10 h-10 rounded-full bg-[#F3E8FF] text-[#7C3AED] flex items-center justify-center hover:bg-[#7C3AED] hover:text-white transition-all shadow-sm">
                  <Share2 size={18} />
                </button>
                <button className="w-10 h-10 rounded-full bg-[#F3E8FF] text-[#7C3AED] flex items-center justify-center hover:bg-[#7C3AED] hover:text-white transition-all shadow-sm">
                  <Video size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Coluna Direita: Formulário */}
          <div className="lg:col-span-8 bg-white p-8 md:p-10 rounded-[40px] shadow-sm border border-slate-50">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">Nome Completo</label>
                  <Input placeholder="Seu Nome" className="rounded-xl border-slate-100 py-6" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">E-mail</label>
                  <Input placeholder="ola@exemplo.com" className="rounded-xl border-slate-100 py-6" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Assunto</label>
                <select className="w-full bg-white border border-slate-100 p-3 rounded-xl text-sm text-slate-600 outline-none">
                  <option>Dúvida sobre Adoção</option>
                  <option>Quero ser Voluntário</option>
                  <option>Relatar maus tratos</option>
                  <option>Outros</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Sua Mensagem</label>
                <Textarea 
                  placeholder="Como podemos ajudar você e nossos gatos?" 
                  className="rounded-xl border-slate-100 min-h-37.5 resize-none" 
                />
              </div>

              <Button className="w-full bg-[#FF7A29] hover:bg-[#e66a1f] text-white py-8 rounded-2xl font-bold text-lg shadow-lg shadow-orange-100 transition-all uppercase tracking-widest">
                Enviar Mensagem
              </Button>
            </form>
          </div>
        </div>

        {/* Seção do Mapa */}
        <div className="relative w-full h-112.5 rounded-[40px] overflow-hidden bg-[#2D3139]">
          {/* Simulação de fundo de mapa (você pode usar Google Maps API aqui) */}
          <div className="absolute inset-0 opacity-40 mix-blend-overlay grayscale bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/-46.6333,-23.5505,12/1200x450?access_token=YOUR_TOKEN')] bg-cover bg-center" />
          
          {/* Pin Central Visual */}
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-40 h-40 bg-white/10 rounded-full animate-ping absolute" />
             <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center relative shadow-2xl">
                <MapPin className="text-[#FF7A29] fill-[#FF7A29]" size={40} />
             </div>
          </div>

          {/* Card Flutuante do Mapa */}
          <div className="absolute bottom-10 left-10 max-w-sm bg-white p-8 rounded-4xl shadow-2xl border border-slate-100">
            <div className="flex items-center gap-2 text-[#7C3AED] mb-4">
              <PawPrint size={18} fill="currentColor" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Sede Instituto Ongato</span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              Nosso santuário está aberto apenas para visitas agendadas para garantir um ambiente calmo para nossos residentes.
            </p>
            <button className="flex items-center gap-2 text-[#7C3AED] font-bold text-sm hover:underline">
              COMO CHEGAR <ArrowRight size={16} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}