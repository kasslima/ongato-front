import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, HeartHandshake, Home, Sparkles } from "lucide-react";
import Footer from "@/components/site/Footer";
import Navbar from "@/components/site/Navbar";

export const metadata: Metadata = {
  title: "Doação Confirmada",
  description:
    "Obrigado pela sua doação ao Instituto Ongato. Sua ajuda apoia alimentação, abrigo e cuidados veterinários para animais resgatados.",
  alternates: {
    canonical: "/pagamento/sucesso/",
  },
};

export default function PagamentoSucessoPage() {
  return (
    <>
      <Navbar />
      <section className="w-full bg-slate-50 px-4 py-12 sm:px-6 md:py-16">
        <div className="container mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-[32px] border border-emerald-100 bg-white p-6 text-center shadow-sm sm:p-10 md:p-12">
            <div className="absolute left-0 top-0 h-2 w-full bg-gradient-to-r from-emerald-500 via-teal-400 to-[#FF7A29]" />

            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-50 text-emerald-600 shadow-inner">
              <CheckCircle2 size={40} />
            </div>

            <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-emerald-700">
              <Sparkles size={14} /> Doação confirmada
            </span>

            <h1 className="mx-auto max-w-2xl text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">
              Obrigado por transformar cuidado em ação
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
              Sua doação vai ajudar o Instituto Ongato com ração, abrigo, resgates e cuidados
              veterinários para animais que precisam de uma nova chance.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <HeartHandshake className="mx-auto mb-2 text-[#FF7A29]" size={22} />
                <p className="text-xs font-semibold text-slate-600">Mais cuidado diário</p>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <Home className="mx-auto mb-2 text-emerald-600" size={22} />
                <p className="text-xs font-semibold text-slate-600">Abrigo mais seguro</p>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <Sparkles className="mx-auto mb-2 text-[#7C3AED]" size={22} />
                <p className="text-xs font-semibold text-slate-600">Novas oportunidades</p>
              </div>
            </div>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/"
                className="inline-flex h-11 items-center justify-center rounded-xl bg-[#FF7A29] px-6 text-sm font-bold text-white transition-colors hover:bg-[#e66a1f]"
              >
                Voltar ao início
              </Link>
              <Link
                href="/adocao"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-[#7C3AED] bg-white px-6 text-sm font-bold text-[#7C3AED] transition-colors hover:bg-[#7C3AED] hover:text-white"
              >
                Ver animais para adoção
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
