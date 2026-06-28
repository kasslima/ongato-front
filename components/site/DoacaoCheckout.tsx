'use client'

import { useState } from "react";
import type { ReactNode } from "react";
import {
  BriefcaseMedical,
  Check,
  Copy,
  CreditCard,
  Home,
  Lock,
  Pencil,
  QrCode,
  Utensils,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { siteConfig } from "@/lib/site";

type ImpactoDoacao = {
  id: number;
  titulo: string;
  descricao: string;
  valor: string;
  icone: ReactNode;
  bgIcone: string;
  textIcone: string;
  faixa: string;
  detalhe: string;
  destaque?: boolean;
  customizado?: boolean;
};

const impactos: ImpactoDoacao[] = [
  {
    id: 0,
    titulo: "Alimente um gato por uma semana",
    descricao: "Fornece refeições nutritivas de alta qualidade para um amigo felino.",
    valor: "R$ 50",
    icone: <Utensils size={24} />,
    bgIcone: "bg-violet-100",
    textIcone: "text-[#7C3AED]",
    faixa: "from-[#7C3AED] to-[#9F67FF]",
    detalhe: "7 dias de ração",
  },
  {
    id: 1,
    titulo: "Cuidados médicos essenciais",
    descricao: "Cobre vacinas essenciais e tratamentos contra pulgas para novos resgatados.",
    valor: "R$ 150",
    icone: <BriefcaseMedical size={24} />,
    bgIcone: "bg-orange-100",
    textIcone: "text-[#FF7A29]",
    faixa: "from-[#FF7A29] to-[#FFB168]",
    detalhe: "Mais necessário",
    destaque: true,
  },
  {
    id: 2,
    titulo: "Patrocine um leito no santuário",
    descricao: "Mantém um espaço aconchegante e seguro em nosso abrigo por um mês.",
    valor: "R$ 300",
    icone: <Home size={24} />,
    bgIcone: "bg-emerald-100",
    textIcone: "text-emerald-600",
    faixa: "from-emerald-500 to-teal-400",
    detalhe: "1 mês de abrigo",
  },
];

export default function DoacaoCheckout() {
  const [impactoSelecionado, setImpactoSelecionado] = useState<number>(1);
  const [metodoPagamento, setMetodoPagamento] = useState<"cartao" | "pix">("pix");
  const [valorCustomizado, setValorCustomizado] = useState("10");
  const [copiouPix, setCopiouPix] = useState(false);

  const impactosCartao: ImpactoDoacao[] = [
    {
      id: -1,
      titulo: "Escolha seu valor",
      descricao: "Digite quanto quer doar no cartão. O valor mínimo é R$ 10.",
      valor: `R$ ${valorCustomizado || "10"}`,
      icone: <Pencil size={24} />,
      bgIcone: "bg-sky-100",
      textIcone: "text-sky-600",
      faixa: "from-sky-500 to-cyan-400",
      detalhe: "Valor livre",
      customizado: true,
    },
    ...impactos,
  ];

  function selecionarMetodo(metodo: "cartao" | "pix") {
    setMetodoPagamento(metodo);
    if (metodo === "pix" && impactoSelecionado === -1) {
      setImpactoSelecionado(1);
    }
  }

  function normalizarValorCustomizado() {
    const valor = Number(valorCustomizado);
    if (!Number.isFinite(valor) || valor < 10) {
      setValorCustomizado("10");
      return;
    }

    setValorCustomizado(String(Math.floor(valor)));
  }

  function copiarPix() {
    setCopiouPix(true);
  }

  return (
    <section className="w-full py-10 md:py-16 bg-slate-50 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8 md:mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
            Doe para ajudar animais resgatados em Manaus
          </h1>
          <p className="text-sm sm:text-base text-slate-500">
            Sua doação para ONG de animais ajuda com ração, abrigo e cuidados veterinários
          </p>
        </div>

        <div className="max-w-xl mx-auto mb-8">
          <div className="grid grid-cols-2 gap-3 rounded-2xl bg-white p-2 shadow-sm border border-slate-100">
            <button
              type="button"
              onClick={() => selecionarMetodo("pix")}
              className={`flex items-center justify-center gap-2 py-3 px-2 rounded-xl font-bold text-xs sm:text-sm transition-all border ${
                metodoPagamento === "pix"
                  ? "border-[#7C3AED] text-[#7C3AED] bg-[#F3E8FF]/60 shadow-sm"
                  : "border-transparent bg-slate-50 text-slate-500 hover:bg-slate-100"
              }`}
            >
              <QrCode size={16} /> PIX
            </button>
            <button
              type="button"
              onClick={() => selecionarMetodo("cartao")}
              className={`flex items-center justify-center gap-2 py-3 px-2 rounded-xl font-bold text-xs sm:text-sm transition-all border ${
                metodoPagamento === "cartao"
                  ? "border-[#7C3AED] text-[#7C3AED] bg-[#F3E8FF]/60 shadow-sm"
                  : "border-transparent bg-slate-50 text-slate-500 hover:bg-slate-100"
              }`}
            >
              <CreditCard size={16} /> Cartão
            </button>
          </div>
        </div>

        {metodoPagamento === "cartao" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 items-stretch">
            {impactosCartao.map((item) => {
              const isSelected = impactoSelecionado === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() => setImpactoSelecionado(item.id)}
                  className={`group bg-white rounded-2xl shadow-sm border transition-all cursor-pointer flex flex-col relative overflow-hidden ${
                    isSelected
                      ? "border-[#FF7A29] ring-2 ring-[#FF7A29]/20 shadow-md"
                      : "border-slate-100 hover:-translate-y-1 hover:border-slate-300 hover:shadow-md"
                  }`}
                >
                  <div className={`h-2 bg-gradient-to-r ${item.faixa}`} />
                  <div className="p-5 sm:p-6 flex flex-col items-center text-center flex-1">
                    <div className="flex items-center justify-between w-full mb-5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        {item.detalhe}
                      </span>
                      {item.destaque && (
                        <span className="rounded-full bg-[#FF7A29] px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-white">
                          Urgente
                        </span>
                      )}
                    </div>

                    <div
                      className={`w-12 h-12 ${item.bgIcone} ${item.textIcone} rounded-2xl flex items-center justify-center mb-4 shrink-0 transition-transform group-hover:scale-110`}
                    >
                      {item.icone}
                    </div>

                    <h3 className="font-bold text-slate-900 text-base mb-2 leading-snug">
                      {item.titulo}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mb-5 min-h-[58px]">
                      {item.descricao}
                    </p>

                    {item.customizado ? (
                      <div className="w-full mb-5">
                        <label htmlFor="valor-customizado" className="sr-only">
                          Valor customizado
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
                            R$
                          </span>
                          <Input
                            id="valor-customizado"
                            type="number"
                            min={10}
                            step={1}
                            inputMode="numeric"
                            value={valorCustomizado}
                            onClick={(event) => {
                              event.stopPropagation();
                              setImpactoSelecionado(item.id);
                            }}
                            onChange={(event) => {
                              setImpactoSelecionado(item.id);
                              setValorCustomizado(event.target.value);
                            }}
                            onBlur={normalizarValorCustomizado}
                            className="rounded-xl border-slate-200 py-5 pl-9 text-center text-lg font-bold focus-visible:ring-[#7C3AED]"
                          />
                        </div>
                      </div>
                    ) : (
                      <span
                        className={`text-2xl font-bold mb-5 ${
                          isSelected ? "text-[#FF7A29]" : "text-slate-800"
                        }`}
                      >
                        {item.valor}
                      </span>
                    )}

                    <Button
                      variant={isSelected ? "default" : "outline"}
                      className={`mt-auto w-full rounded-xl transition-all font-semibold ${
                        isSelected
                          ? "bg-[#FF7A29] hover:bg-[#e66a1f] text-white border-none"
                          : "border-[#7C3AED] text-[#7C3AED] hover:bg-[#7C3AED] hover:text-white"
                      }`}
                    >
                      {isSelected ? "Selecionado" : "Selecionar"}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="max-w-xl mx-auto bg-white rounded-[32px] md:rounded-[40px] p-5 sm:p-8 md:p-10 shadow-sm border border-slate-100">
            <h2 className="text-xl md:text-2xl font-bold text-center text-slate-900 mb-6 md:mb-8">
              Doar por PIX
            </h2>

            <div className="flex flex-col items-center text-center p-4 border border-dashed border-slate-200 rounded-2xl bg-slate-50/50 space-y-4 animate-fadeIn">
              <div className="bg-white p-3 rounded-xl shadow-inner border border-slate-100">
                <div className="w-36 h-36 bg-slate-200 flex items-center justify-center rounded-lg text-slate-400 text-xs font-mono p-2">
                  [ QR CODE INSTITUTO ONGATO ]
                </div>
              </div>
              <div className="space-y-1 max-w-xs">
                <h4 className="font-bold text-xs uppercase text-slate-700 tracking-wider">
                  Pix copia e cola
                </h4>
                <p className="text-xs text-slate-400">
                  Copie o código abaixo para pagar no app do seu banco.
                </p>
              </div>
              <button
                type="button"
                onClick={copiarPix}
                className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold transition-all border ${
                  copiouPix
                    ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                }`}
              >
                {copiouPix ? <Check size={14} /> : <Copy size={14} />}
                {copiouPix ? "Código copiado!" : "Copiar código Pix"}
              </button>
            </div>

            <p className="text-center text-[10px] text-slate-400 mt-4 flex items-center justify-center gap-1">
              <Lock size={10} /> Doação segura para o Instituto Ongato em Manaus
            </p>
            <p className="text-center text-[10px] text-slate-400 mt-2">
              CNPJ: {siteConfig.cnpj}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
