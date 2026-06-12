'use client'

import Link from "next/link";
import { Mail, MapPin, ExternalLink, Share2, PawPrint } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#F8FAFC] pt-8 pb-6 md:pt-12 md:pb-8 border-t border-slate-200">
      <div className="container mx-auto px-5">
        
        {/* GRID RESPONSIVO COM ALINHAMENTO CENTRALIZADO NO MOBILE */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-8 md:mb-12 text-center md:text-left">
          
          {/* Coluna 1: Logo e Descrição */}
          <div className="flex flex-col items-center md:items-start space-y-3">
            <div className="flex items-center gap-2 text-[#7C3AED]">
              <PawPrint size={24} fill="currentColor" className="shrink-0" />
              <span className="text-xl md:text-2xl font-bold tracking-tight">Instituto Ongato</span>
            </div>
            <p className="text-slate-500 text-xs md:text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
              Dedicados a transformar vidas através do resgate, reabilitação e adoção responsável de felinos.
            </p>
          </div>

          {/* Coluna 2: Institucional */}
          <div className="flex flex-col space-y-2 md:space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 mt-2 md:mt-0">Institucional</h3>
            <ul className="flex flex-col space-y-2 text-xs md:text-sm text-slate-500">
              <li><Link href="/sobre" className="hover:text-[#7C3AED] transition-colors block py-0.5">Sobre Nós</Link></li>
              <li><Link href="/voluntariado" className="hover:text-[#7C3AED] transition-colors block py-0.5">Seja Voluntário</Link></li>
              <li><Link href="/historias" className="hover:text-[#7C3AED] transition-colors block py-0.5">Histórias de Sucesso</Link></li>
              <li><Link href="/privacidade" className="hover:text-[#7C3AED] transition-colors block py-0.5">Política de Privacidade</Link></li>
            </ul>
          </div>

          {/* Coluna 3: Contato */}
          <div className="flex flex-col space-y-2 md:space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 mt-2 md:mt-0">Contato</h3>
            <ul className="flex flex-col items-center md:items-start space-y-2 text-xs md:text-sm text-slate-500">
              <li className="flex items-center gap-2 max-w-full">
                <Mail size={16} className="text-[#7C3AED] shrink-0" />
                <span className="truncate block" title="contato@ongato.org.br">
                  contato@ongato.org.br
                </span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-[#7C3AED] shrink-0" />
                <span>São Paulo, SP</span>
              </li>
            </ul>
          </div>

          {/* Coluna 4: Redes Sociais */}
          <div className="flex flex-col items-center md:items-start space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 mt-2 md:mt-0">Redes Sociais</h3>
            <div className="flex gap-3 justify-center md:justify-start">
              <Link 
                href="https://instagram.com" 
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
            © 2026 Instituto Ongato. CNPJ: 00.000.000/0001-00. Todos os direitos reservados.
          </p>
          <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400 shrink-0">
            Feito com amor por amantes de felinos 🐾
          </p>
        </div>
      </div>
    </footer>
  );
}