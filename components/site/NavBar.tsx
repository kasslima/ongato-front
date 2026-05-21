'use client'

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation"; 
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const pathname = usePathname(); 

  const navLinks = [
    { href: "/", label: "Início" },
    { href: "/adocao", label: "Adoção" },
    { href: "/doar", label: "Doar" },
    { href: "/eventos", label: "Eventos" },
    { href: "/contato", label: "Contato" },
  ];

  return (
    <nav className="w-full bg-white">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        
        {/* Lado Esquerdo: Logo */}
        <div className="flex items-center gap-2">
          <Image src="/ongato-logo.png" alt="Instituto Ongato" width={40} height={40} />
          <span className="text-xl font-bold text-[#7C3AED]">Instituto Ongato</span>
        </div>

        {/* Centro: Links de Navegação Dinâmicos */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => {
            // Verifica se o link atual é a rota onde o usuário está
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-all pb-1 ${
                  isActive
                    ? "text-[#7C3AED] border-b-2 border-[#FF7A29] font-semibold" // Estilo Ativo
                    : "text-slate-600 hover:text-[#7C3AED]" // Estilo Padrão / Hover
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div>
        <Link href="/adocao" className="block">
       <button className="bg-[#FF7A29] hover:bg-[#e66a1f] text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg">
            Adote Agora
          </button>
         </Link>
</div>

      </div>
    </nav>
  );
}