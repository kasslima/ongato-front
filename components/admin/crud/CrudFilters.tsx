'use client'

import { Dog, Cat as CatIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AnimaisFilter() {
  return (
    <div className="flex flex-wrap items-center gap-4 py-2">
      <div className="flex flex-1 flex-wrap gap-3">
        <div className="relative flex-[2] min-w-[240px]">
          <Input 
            className="bg-neutral-50 border-neutral-200" 
            placeholder="Pesquisar por nome..." 
          />
        </div>
        <div className="relative flex-1 min-w-[180px]">
          <select className="flex h-10 w-full rounded-md border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-neutral-400">
            <option value="">Todas as Raças</option>
            <option value="srd">SRD</option>
            <option value="siames">Siamês</option>
            <option value="persa">Persa</option>
          </select>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="h-10 w-10 border-neutral-200 bg-neutral-50 hover:bg-neutral-100">
            <Dog className="h-4 w-4 text-neutral-600" />
          </Button>
          <Button variant="outline" size="icon" className="h-10 w-10 border-neutral-200 bg-neutral-50 hover:bg-neutral-100">
            <CatIcon className="h-4 w-4 text-neutral-600" />
          </Button>
        </div>
      </div>
      
      <div className="flex gap-2">
        <Button variant="default" className="px-6">Pesquisar</Button>
        <Button type="button" variant="outline" className="border-neutral-300">
          Novo Registro
        </Button>
      </div>
    </div>
  );
}

export function EventosFilter() {
  return (
    <div className="flex flex-wrap items-center gap-4 py-2">
      <div className="flex flex-1 flex-wrap gap-3">
        <div className="relative flex-[2] min-w-[240px]">
          <Input 
            className="bg-neutral-50 border-neutral-200" 
            placeholder="Título do evento..." 
          />
        </div>
        <div className="relative flex-1 min-w-[180px]">
          <select className="flex h-10 w-full rounded-md border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-neutral-400">
            <option value="ativos">Eventos Ativos</option>
            <option value="inativos">Inativos</option>
          </select>
        </div>
      </div>
      
      <div className="flex gap-2">
        <Button variant="default" className="px-6">Pesquisar</Button>
        <Button type="button" variant="outline" className="border-neutral-300">
          Novo Registro
        </Button>
      </div>
    </div>
  );
}

export function BannersFilter() {
  return (
    <div className="flex flex-wrap items-center gap-4 py-2">
      <div className="flex flex-1 flex-wrap gap-3">
        <div className="relative flex-[2] min-w-[240px]">
          <Input 
            className="bg-neutral-50 border-neutral-200" 
            placeholder="Título do banner..." 
          />
        </div>
        <div className="relative flex-1 min-w-[180px]">
          <select className="flex h-10 w-full rounded-md border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-neutral-400">
            <option value="ativo">Ativo</option>
            <option value="inativo">Inativo</option>
          </select>
        </div>
      </div>
      
      <div className="flex gap-2">
        <Button variant="default" className="px-6">Pesquisar</Button>
        <Button type="button" variant="outline" className="border-neutral-300">
          Novo Registro
        </Button>
      </div>
    </div>
  );
}

export function UsuariosFilter() {
  return (
    <div className="flex flex-wrap items-center gap-4 py-2">
      <div className="flex flex-1 flex-wrap gap-3">
        <div className="relative flex-[2] min-w-[240px]">
          <Input 
            className="bg-neutral-50 border-neutral-200" 
            placeholder="Nome do usuário..." 
          />
        </div>
        <div className="relative flex-1 min-w-[180px]">
          <select className="flex h-10 w-full rounded-md border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-neutral-400">
            <option value="">Todos os Perfis</option>
            <option value="admin">Administrador</option>
            <option value="editor">Editor</option>
            <option value="voluntario">Voluntário</option>
          </select>
        </div>
      </div>
      
      <div className="flex gap-2">
        <Button variant="default" className="px-6">Pesquisar</Button>
        <Button type="button" variant="outline" className="border-neutral-300">
          Novo Registro
        </Button>
      </div>
    </div>
  );
}
