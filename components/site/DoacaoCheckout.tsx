'use client'

import { CreditCard, QrCode, Lock, Utensils, BriefcaseMedical, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function DoacaoCheckout() {
  return (
    <section className="w-full py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        
        {/* Cabeçalho */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Escolha seu Impacto</h1>
          <p className="text-slate-500">Sua generosidade move nossa missão</p>
        </div>

        {/* Grid de Impacto */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {/* Card 1 */}
          <div className="bg-white p-8 rounded-4xl shadow-sm border border-slate-100 text-center flex flex-col items-center">
            <div className="w-12 h-12 bg-[#F3E8FF] text-[#7C3AED] rounded-2xl flex items-center justify-center mb-6">
              <Utensils size={24} />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Alimente um gato por uma semana</h3>
            <p className="text-sm text-slate-500 mb-6">Fornece refeições nutritivas de alta qualidade para um amigo felino.</p>
            <span className="text-2xl font-bold text-[#7C3AED] mb-6">R$ 50</span>
            <Button variant="outline" className="w-full rounded-xl border-[#7C3AED] text-[#7C3AED] hover:bg-[#7C3AED] hover:text-white transition-all">Selecionar</Button>
          </div>

          {/* Card 2 - Destaque (Mais Necessário) */}
          <div className="bg-white p-8 rounded-4xl shadow-lg border-2 border-[#FF7A29] text-center flex flex-col items-center relative scale-105">
            <div className="absolute -top-4 bg-[#FF7A29] text-white text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-widest">
              Mais Necessário
            </div>
            <div className="w-12 h-12 bg-[#FFF1E7] text-[#FF7A29] rounded-2xl flex items-center justify-center mb-6">
              <BriefcaseMedical size={24} />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Cuidados médicos essenciais</h3>
            <p className="text-sm text-slate-500 mb-6">Cobre vacinas essenciais e tratamentos contra pulgas para novos resgatados.</p>
            <span className="text-2xl font-bold text-[#FF7A29] mb-6">R$ 150</span>
            <Button className="w-full rounded-xl bg-[#FF7A29] hover:bg-[#e66a1f] text-white shadow-md transition-all">Selecionar</Button>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded-4xl shadow-sm border border-slate-100 text-center flex flex-col items-center">
            <div className="w-12 h-12 bg-[#F3E8FF] text-[#7C3AED] rounded-2xl flex items-center justify-center mb-6">
              <Home size={24} />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Patrocine um Leito no Santuário</h3>
            <p className="text-sm text-slate-500 mb-6">Mantém um espaço aconchegante e seguro em nosso abrigo por um mês.</p>
            <span className="text-2xl font-bold text-[#7C3AED] mb-6">R$ 300</span>
            <Button variant="outline" className="w-full rounded-xl border-[#7C3AED] text-[#7C3AED] hover:bg-[#7C3AED] hover:text-white transition-all">Selecionar</Button>
          </div>
        </div>

        {/* Formulário de Finalização */}
        <div className="max-w-2xl mx-auto bg-white rounded-[40px] p-8 md:p-12 shadow-sm border border-slate-100">
          {/* Stepper */}
          <div className="flex justify-center items-center gap-4 mb-10">
            <div className="w-8 h-8 rounded-full bg-[#FF7A29] text-white flex items-center justify-center text-xs font-bold">1</div>
            <div className="h-px w-12 bg-slate-200"></div>
            <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-xs font-bold">🐾</div>
            <div className="h-px w-12 bg-slate-200"></div>
            <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-xs font-bold">❤️</div>
          </div>

          <h2 className="text-2xl font-bold text-center text-slate-900 mb-8">Finalizar Doação</h2>

          {/* Abas de Pagamento */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button className="flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-[#7C3AED] text-[#7C3AED] font-bold text-sm bg-[#F3E8FF]/30">
              <CreditCard size={18} /> Cartão de Crédito
            </button>
            <button className="flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-100 text-slate-500 font-bold text-sm hover:bg-slate-200 transition-all">
              <QrCode size={18} /> Transferência PIX
            </button>
          </div>

          {/* Campos do Cartão */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase">Nome no Cartão</label>
              <Input placeholder="João da Silva" className="rounded-xl py-6 border-slate-100" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase">Número do Cartão</label>
              <div className="relative">
                <Input placeholder="0000 0000 0000 0000" className="rounded-xl py-6 border-slate-100 pr-10" />
                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase">Validade</label>
                <Input placeholder="MM/AA" className="rounded-xl py-6 border-slate-100" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase">CVV</label>
                <Input placeholder="123" className="rounded-xl py-6 border-slate-100" />
              </div>
            </div>
          </div>

          {/* Checkbox Recorrência */}
          <div className="flex items-center gap-3 mt-8">
            <input type="checkbox" className="w-5 h-5 rounded border-slate-300 accent-[#FF7A29]" />
            <label className="text-sm text-slate-500 italic">Tornar esta uma doação mensal para nos apoiar a longo prazo.</label>
          </div>

          {/* Botão Doar Agora */}
          <Button className="w-full bg-[#FF7A29] hover:bg-[#e66a1f] text-white py-8 rounded-2xl font-bold text-lg mt-8 shadow-lg shadow-orange-100">
            Doar Agora
          </Button>

          <p className="text-center text-[10px] text-slate-400 mt-6 flex items-center justify-center gap-1">
            <Lock size={10} /> Sua transação é criptografada e segura
          </p>
        </div>

      </div>
    </section>
  );
}