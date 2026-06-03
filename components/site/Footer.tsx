'use client'

import Link from "next/link";
import { Mail, MapPin, ExternalLink, Share2, PawPrint } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#F8FAFC] pt-16 pb-8 border-t border-slate-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Coluna 1: Logo e Descrição */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center gap-2 text-[#7C3AED]">
              <PawPrint size={28} fill="currentColor" />
              <span className="text-2xl font-bold font-mono">Instituto Ongato</span>
            </div>
            <p className="text-slate-500 leading-relaxed max-w-xs">
              Dedicados a transformar vidas através do resgate, reabilitação e adoção responsável de felinos.
            </p>
          </div>

          {/* Coluna 2: Institucional */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900">Institucional</h3>
            <ul className="flex flex-col space-y-3 text-slate-400">
              <li><Link href="/sobre" className="hover:text-[#7C3AED] transition-colors">Sobre Nós</Link></li>
              <li><Link href="/voluntariado" className="hover:text-[#7C3AED] transition-colors">Seja Voluntário</Link></li>
              <li><Link href="/historias" className="hover:text-[#7C3AED] transition-colors">Histórias de Sucesso</Link></li>
              <li><Link href="/privacidade" className="hover:text-[#7C3AED] transition-colors">Política de Privacidade</Link></li>
            </ul>
          </div>

          {/* Coluna 3: Contato */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900">Contato</h3>
            <ul className="flex flex-col space-y-4 text-slate-400">
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-[#7C3AED]" />
                <span className="truncate">contato@ongato.org.br</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={20} className="text-[#7C3AED]" />
                <span>São Paulo, SP</span>
              </li>
            </ul>
          </div>

          {/* Coluna 4: Redes Sociais */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900">Redes Sociais</h3>
            <div className="flex gap-4">
              <Link 
                href="https://instagram.com" 
                className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[#7C3AED] hover:bg-[#7C3AED] hover:text-white transition-all shadow-sm"
              >
                <ExternalLink size={20} />
              </Link>
              <button 
                className="w-10 h-10 rounded-full bg-[#E2E8F0] flex items-center justify-center text-slate-600 hover:bg-slate-300 transition-all shadow-sm"
              >
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Linha Inferior: Copyright */}
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-400">
            © 2024 Instituto Ongato. CNPJ: 00.000.000/0001-00. Todos os direitos reservados.
          </p>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300">
            Feito com amor por amantes de felinos
          </p>
        </div>
      </div>
    </footer>
  );
}