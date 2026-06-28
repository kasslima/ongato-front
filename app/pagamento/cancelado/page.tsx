import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CreditCard, Heart, RefreshCcw } from "lucide-react";
import Footer from "@/components/site/Footer";
import Navbar from "@/components/site/Navbar";

export const metadata: Metadata = {
  title: "Pagamento Não Concluído",
  description:
    "O pagamento da doação ao Instituto Ongato não foi concluído. Você pode voltar para a página de doação e tentar novamente.",
  alternates: {
    canonical: "/pagamento/cancelado/",
  },
};

export default function PagamentoCanceladoPage() {
  return (
    <>
      <Navbar />
      <section className="w-full bg-slate-50 px-4 py-12 sm:px-6 md:py-16">
        <div className="container mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-[32px] border border-orange-100 bg-white p-6 text-center shadow-sm sm:p-10 md:p-12">
            <div className="absolute left-0 top-0 h-2 w-full bg-gradient-to-r from-[#FF7A29] via-amber-400 to-[#7C3AED]" />

            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-orange-50 text-[#FF7A29] shadow-inner">
              <CreditCard size={40} />
            </div>

            <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-orange-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-orange-700">
              <RefreshCcw size={14} /> Pagamento não concluído
            </span>

            <h1 className="mx-auto max-w-2xl text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">
              Parece que sua doação não foi finalizada
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
              Que pena, tivemos uma falha ou o pagamento foi cancelado. Você pode tentar novamente
              em alguns instantes e continuar ajudando os animais resgatados pelo Instituto Ongato.
            </p>

            <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-5">
              <Heart className="mx-auto mb-3 text-[#7C3AED]" size={24} />
              <p className="text-sm font-medium text-slate-600">
                Cada tentativa de apoio importa. Se o problema persistir, tente outro método de
                pagamento ou volte mais tarde.
              </p>
            </div>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/doar"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#FF7A29] px-6 text-sm font-bold text-white transition-colors hover:bg-[#e66a1f]"
              >
                <RefreshCcw size={16} /> Tentar novamente
              </Link>
              <Link
                href="/"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50"
              >
                <ArrowLeft size={16} /> Voltar ao início
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
