import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="w-full border-b bg-white">
      <div className="container mx-auto flex h-18 items-center justify-between px-4">
        
        {/* Lado Esquerdo: Logo */}
        <div className="flex items-center gap-4">
          <Image src="/ongato-logo.png" alt="Instituto Ongato" width={55} height={55} />
          <span className="text-2xl font-bold text-[#7C3AED]">Instituto Ongato</span>
        </div>

        {/* Centro: Links de Navegação */}
        <div className="hidden md:flex items-center gap-8 text-lg font-medium text-slate-400">
          <Link href="/inicio" className="hovertext-[#7C3AED] border-b-2 border-[#FF7A29] pb-1">Início</Link>
          <Link href="/adocao" className="hover:text-[#7C3AED] transition-colors">Adoção</Link>
          <Link href="/doar" className="hover:text-[#7C3AED] transition-colors">Doar</Link>
          <Link href="/eventos" className="hover:text-[#7C3AED] transition-colors">Eventos</Link>
          <Link href="/contato" className="hover:text-[#7C3AED] transition-colors">Contato</Link>
        </div>

        {/* Lado Direito: Botão Call to Action */}
        <Link href="/adocao" 
  className="bg-[#FF7A29] hover:bg-[#e66a1f] text-white rounded-full px-6 py-2 text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center">
  Adote Agora
</Link>

      </div>
    </nav>
  );
}