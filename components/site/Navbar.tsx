'use client'

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation"; 
import { Menu, X, ChevronRight } from "lucide-react"; 

export default function Navbar() {
  const pathname = usePathname(); 
  const [isOpen, setIsOpen] = useState(false); 

  const navLinks = [
    { href: "/", label: "Início" },
    { href: "/adocao", label: "Adoção" },
    { href: "/doar", label: "Doar" },
    { href: "/eventos", label: "Eventos" },
    { href: "/contato", label: "Contato" },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="w-full bg-white shadow-sm relative z-50">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8 relative gap-2">
        
        {/* BLOCO 1: Esquerda (Logo e Nome) */}
        <div className="flex shrink-0 justify-start items-center z-10">
          <Link href="/" className="flex items-center gap-2 lg:gap-3 active:scale-95 transition-transform">
            <Image 
              src="/ongato-logo.png" 
              alt="Instituto Ongato" 
              width={48} 
              height={48} 
              className="w-11 h-11 lg:w-14 lg:h-14 object-contain shrink-0" 
            />
            <span className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 text-xl sm:text-2xl md:text-2xl lg:text-2xl font-bold text-[#7C3AED] select-none whitespace-nowrap">
              Instituto Ongato
            </span>
          </Link>
        </div>

        {/* BLOCO 2: Centro (Links de Navegação com Efeito de Subir e Linha Ativa) */}
        <div className="hidden md:flex flex-1 justify-center items-center gap-3 lg:gap-6 xl:gap-12 text-sm lg:text-base font-medium px-2 h-full">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-all duration-300 pb-1 border-b-2 whitespace-nowrap transform hover:-translate-y-[2px] ${
                  isActive
                    ? "text-[#7C3AED] border-[#FF7A29] font-bold"
                    : "text-slate-600 border-transparent hover:text-[#7C3AED] hover:border-[#FF7A29]/40"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* BLOCO 3: Direita (Botão Adotar) */}
        <div className="flex shrink-0 justify-end items-center">
          <Link href="/adocao" className="hidden md:block shrink-0">
            <button className="bg-[#FF7A29] hover:bg-[#e66a1f] text-white px-4 lg:px-6 py-2.5 rounded-full font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-1 text-sm lg:text-base active:scale-95 hover:-translate-y-[1px]">
              Adote Agora <ChevronRight size={16} />
            </button>
          </Link>

          {/* Botão Hambúrguer (Mobile) */}
          <button 
            onClick={toggleMenu} 
            className="md:hidden text-[#FF7A29] hover:text-[#7C3AED] p-2 rounded-lg transition-colors focus:outline-none"
            aria-label="Alternar Menu"
          >
            {isOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>

      </div>

      {/* --- MENU VERTICAL MOBILE --- */}
      <div 
        className={`absolute top-20 left-0 w-full bg-white border-t border-slate-100 shadow-xl transition-all duration-300 md:hidden ${
          isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="flex flex-col p-6 gap-3 text-center font-medium">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)} 
                className={`text-lg py-2 transition-all duration-200 rounded-lg active:scale-98 ${
                  isActive
                    ? "text-[#7C3AED] font-bold bg-purple-50"
                    : "text-slate-800 hover:text-[#7C3AED] hover:bg-slate-50"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          
          <hr className="border-slate-100 my-2" />
          
          <Link href="/adocao" onClick={() => setIsOpen(false)} className="w-full flex justify-center">
            <button className="w-full max-w-sm bg-[#FF7A29] hover:bg-[#e66a1f] text-white py-3 rounded-full font-bold transition-all shadow-md flex items-center justify-center gap-1 text-base active:scale-95">
              Adote Agora <ChevronRight size={20} />
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}