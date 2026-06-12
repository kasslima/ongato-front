'use client'

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation"; 
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react"; 
import { Heart, ChevronRight } from "lucide-react";

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
      {/* ALTERAÇÃO: Mudamos de 'justify-center md:justify-between' para 'justify-between'.
        Isso garante que no mobile a logo/nome fiquem de um lado e o botão hambúrguer do outro de forma natural.
      */}
      <div className="container mx-auto flex h-20 items-center justify-between px-5 relative">
        
        {/* Lado Esquerdo: Logo e Nome (Sempre alinhados juntos, sem quebrar) */}
        <div className="flex items-center gap-3 md:gap-6 shrink-0">
          <Link href="/" className="block">
            <Image 
              src="/ongato-logo.png" 
              alt="Instituto Ongato" 
              width={50} 
              height={50} 
              className="md:w-[60px] md:h-[60px]" 
            />
          </Link>
        </div>

         <span className=" flex flex-col p-2 gap-1 text-center text-xl font-bold text-[#7C3AED] select-none whitespace-nowrap">
            Instituto Ongato
          </span>

        {/* Centro: Links de Navegação Dinâmicos (Apenas Desktop) */}
        <div className="hidden md:flex items-center gap-4 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-all pb-1 ${
                  isActive
                    ? "text-[#7C3AED] border-b-2 border-[#FF7A29] font-semibold"
                    : "text-slate-600 hover:text-[#7C3AED]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Lado Direito: Botão Adotar (Apenas Desktop) */}
        <div>
          <Link href="/adocao" className="hidden md:block">
          <button className="w-full sm:w-auto bg-[#FF7A29] hover:bg-[#e66a1f] text-white px-8 py-6 md:px-10 md:py-4 rounded-full font-bold transition-all shadow-xl flex items-center justify-center gap-2 text-sm md:text-base">
             Adote Agora <ChevronRight size={18} />
          </button>
         </Link>
        </div>

        {/* Botão Hambúrguer (Apenas Mobile): 
          Removido o 'absolute' e 'right-5'. Agora ele se posiciona organicamente 
          à direita por causa do 'justify-between' do container pai.
        */}
        <button 
          onClick={toggleMenu} 
          className="md:hidden text-orange-400 hover:text-[#7C3AED] p-2 focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* --- MENU VERTICAL MOBILE --- */}
      <div 
        className={`absolute top-20 left-0 w-full bg-white border-t border-slate-100 shadow-xl transition-all duration-300 md:hidden ${
          isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="flex flex-col p-2 gap-1 text-center font-medium">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)} 
                className={`text-lg py-2 transition-all ${
                  isActive
                    ? "text-[#7C3AED] font-bold bg-purple-50 rounded-lg"
                    : "text-slate-800 hover:text-[#7C3AED]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          
          <hr className="border-slate-100" />
          
          {/* Botão Adote Laranja dentro do menu mobile */}
          <Link href="/adocao" onClick={() => setIsOpen(false)}>
          <button className="w-full sm:w-auto bg-[#FF7A29] hover:bg-[#e66a1f] text-white px-8 py-3 md:px-10 md:py-4 rounded-full font-bold transition-all shadow-xl flex items-center justify-center gap-1 text-sx md:text-base">
            Adote Agora <ChevronRight size={21} />
          </button>
         </Link>
        </div>
      </div>
    </nav>
  );
}