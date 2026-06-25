'use client'

import Link from "next/link";
import { Mail, MapPin, ExternalLink, Share2, PawPrint } from "lucide-react";
import { siteConfig } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="w-full bg-[#F8FAFC] pt-8 pb-6 md:pt-12 md:pb-8 border-t border-slate-200">
      {/* max-w-6xl adicionado aqui para ancorar o layout no PC */}
      <div className="container mx-auto px-5 max-w-6xl">
        
        {/* Mantido o md:grid-cols-2 para o tablet não quebrar antes da hora */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-8 md:mb-12 text-center md:text-left">
          
          {/* Coluna 1: Logo e Descrição */}
          <div className="flex flex-col items-center md:items-start space-y-3">
            <div className="flex items-center gap-2 text-[#7C3AED]">
              <PawPrint size={24} fill="currentColor" className="shrink-0" />
              <span className="text-xl md:text-2xl font-bold tracking-tight">Instituto Ongato</span>
            </div>
            <p className="text-slate-500 text-xs md:text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
              Dedicados a transformar vidas em Manaus através do resgate, reabilitação e adoção responsável de gatos e cães.
            </p>
          </div>

          {/* Coluna 2: Institucional */}
          <div className="flex flex-col items-center md:items-start space-y-2 md:space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 mt-2 md:mt-0">Institucional</h3>
            <ul className="flex flex-col items-center md:items-start space-y-2 text-xs md:text-sm text-slate-500">
              <li><Link href="/sobre" className="hover:text-[#7C3AED] transition-colors block py-0.5">Sobre Nós</Link></li>
              <li><Link href="/adocao" className="hover:text-[#7C3AED] transition-colors block py-0.5">Animais para Adoção</Link></li>
              <li><Link href="/doar" className="hover:text-[#7C3AED] transition-colors block py-0.5">Doar para a ONG</Link></li>
              <li><Link href="/contato" className="hover:text-[#7C3AED] transition-colors block py-0.5">Contato em Manaus</Link></li>
            </ul>
          </div>

          {/* Coluna 3: Contato */}
          <div className="flex flex-col items-center md:items-start space-y-2 md:space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 mt-2 md:mt-0">Contato</h3>
            <ul className="flex flex-col items-center md:items-start space-y-2 text-xs md:text-sm text-slate-500">
              <li className="flex items-center gap-2 max-w-full">
                <Mail size={16} className="text-[#7C3AED] shrink-0" />
                <span className="truncate block" title={siteConfig.email}>
                  {siteConfig.email}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-[#7C3AED] shrink-0" />
                <span>{siteConfig.address}</span>
              </li>
            </ul>
          </div>

          {/* Coluna 4: Redes Sociais */}
          <div className="flex flex-col items-center md:items-start space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 mt-2 md:mt-0">Redes Sociais</h3>
            <div className="flex gap-3 justify-center md:justify-start">
              <Link 
                href={siteConfig.instagram} 
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[#7C3AED] hover:bg-[#7C3AED] hover:text-white transition-all shadow-sm shrink-0"
                aria-label="Instagram"
              >
                <ExternalLink size={16} />
              </Link>
              <button 
                className="w-9 h-9 rounded-full bg-slate-200/60 flex items-center justify-center text-slate-600 hover:bg-slate-300/80 transition-all shadow-sm shrink-0"
                aria-label="Compartilhar"
              >
                <Share2 size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Linha Inferior: Copyright */}
        <div className="pt-6 border-t border-slate-200/60 flex flex-col-reverse md:flex-row justify-between items-center gap-3 text-center md:text-left">
          <p className="text-[11px] text-slate-400 leading-relaxed max-w-2xl">
            © 2026 Instituto Ongato. CNPJ: {siteConfig.cnpj}. Todos os direitos reservados.
          </p>
          <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400 shrink-0">
            Feito com amor por amantes de felinos 🐾
          </p>
        </div>
      </div>
    </footer>
  );
}
