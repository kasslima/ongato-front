'use client'

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation"; 
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react"; 

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
      <div className="container mx-auto flex h-20 items-center justify-center md:justify-between px-5 relative">
        
        {/* Centro (Mobile) / Lado Esquerdo (Desktop): Logo e Nome */}
        <div className="flex items-center gap-3 md:gap-6">
          <Link href="/" className="block">
            <Image src="/ongato-logo.png" alt="Instituto Ongato" width={50} height={50} className="md:w-[60px] md:h-[60px]" />
          </Link>
          <span className="text-xl font-bold text-[#7C3AED]">Instituto Ongato</span>
        </div>

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
        <div className="hidden md:block">
          <Link href="/adocao">
            <Button className="bg-[#FF7A29] hover:bg-[#e66a1f] text-white px-8 py-6 rounded-full font-bold transition-all shadow-lg text-md border-none">
              Adote Agora
            </Button>
            

            
          </Link>
        </div>

        {/* 
          Botão Hambúrguer: Fixado no canto direito de forma absoluta no mobile, 
          para que ele não empurre o título do Instituto para o lado.
        */}
        <button 
          onClick={toggleMenu} 
          className="absolute right-5 md:hidden text-slate-600 hover:text-[#7C3AED] p-2 focus:outline-none"
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
        <div className="flex flex-col p-4 gap-2 text-center font-medium">
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
          
          <hr className="border-slate-100 my-2" />
          
          {/* Botão Adote Laranja dentro do menu mobile */}
          <Link href="/adocao" onClick={() => setIsOpen(false)}>
            <Button className="w-full bg-[#FF7A29] hover:bg-[#e66a1f] text-white py-6 rounded-full font-bold shadow-lg border-none">
              Adote Agora
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}