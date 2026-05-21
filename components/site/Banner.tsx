import Image from "next/image";
import { Heart } from "lucide-react";

export default function Banner() {
  return (
    <section className="bg-white container mx-auto px-4 py-12 md:py-20 flex flex-col md:flex-row items-center justify-between gap-12">
      
      {/* Lado Esquerdo: Conteúdo de Texto */}
      <div className="flex-1 space-y-6">
        <div className="inline-block px-4 py-1 bg-purple-100 text-[#7C3AED] rounded-full text-xs font-bold uppercase tracking-wider">
          Bem-vindo ao Instituto Ongato
        </div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight">
          Todo gato merece um <span className="text-[#7C3AED]">Lar Eterno</span>.
        </h1>
        
        <p className="text-slate-500 text-lg max-w-lg">
          Somos uma organização sem fins lucrativos dedicada a resgatar, 
          reabilitar e encontrar famílias amorosas para gatos necessitados. 
          Junte-se à nossa missão.
        </p>

        <div className="flex flex-wrap gap-4">
          <button className="bg-[#FF7A29] hover:bg-[#e66a1f] text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg shadow-orange-200">
            Adote Agora
          </button>
          <button className="border-2 border-purple-200 text-[#7C3AED] hover:border-[#7C3AED] px-8 py-4 rounded-full font-bold transition-all">
            Saiba Mais
          </button>
        </div>
      </div>

      {/* Lado Direito: Imagem e Card Flutuante */}
      <div className="flex-1 relative w-full max-w-[500px]">
        {/* Container da Imagem Principal */}
        <div className="relative h-[400px] md:h-[500px] w-full rounded-[40px] overflow-hidden shadow-2xl">
          <Image
            src="/bannerHome.jpg" 
            alt="Gato preto olhando para a câmera"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Card Flutuante de Estatística */}
        <div className="absolute -bottom-6 -right-4 md:right-0 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-xl flex items-center gap-4 border border-white">
          <div className="bg-[#FF7A29] p-3 rounded-full">
            <Heart className="text-white w-6 h-6 fill-current" />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-800 leading-none">100+</p>
            <p className="text-xs text-slate-500">Adoções Felizes</p>
          </div>
        </div>
      </div>
      
    </section>
  );
}