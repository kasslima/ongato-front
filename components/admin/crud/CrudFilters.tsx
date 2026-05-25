'use client'

import { Dog, Cat as CatIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AnimaisFilter({ 
  onSearch, 
  onAdd 
}: { 
  onSearch?: (params: { name?: string; type?: "gato" | "cachorro" }) => void,
  onAdd?: () => void
}) {
  return (
    <div className="flex flex-wrap items-center gap-4 py-2">
      <div className="flex flex-1 flex-wrap gap-3">
        <div className="relative flex-[2] min-w-[240px]">
          <Input 
            className="bg-neutral-50 border-neutral-200" 
            placeholder="Pesquisar por nome..." 
            onChange={(e) => onSearch?.({ name: e.target.value })}
          />
        </div>
        <div className="relative flex-1 min-w-[180px]">
          <select 
            className="flex h-10 w-full rounded-md border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-neutral-100 focus:outline-none focus:ring-1 focus:ring-neutral-700"
            onChange={(e) => onSearch?.({ type: e.target.value as any })}
          >
            <option value="">Todas as Espécies</option>
            <option value="gato">Gatos</option>
            <option value="cachorro">Cachorros</option>
          </select>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            className="h-10 w-10 border-neutral-200 bg-neutral-50 hover:bg-neutral-100"
            onClick={() => onSearch?.({ type: "cachorro" })}
          >
            <Dog className="h-4 w-4 text-neutral-600" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="h-10 w-10 border-neutral-200 bg-neutral-50 hover:bg-neutral-100"
            onClick={() => onSearch?.({ type: "gato" })}
          >
            <CatIcon className="h-4 w-4 text-neutral-600" />
          </Button>
        </div>
      </div>
      
      <div className="flex gap-2">
        <Button variant="default" className="px-6" onClick={() => onSearch?.({})}>Pesquisar</Button>
        <Button type="button" variant="outline" className="border-neutral-300" onClick={onAdd}>
          Novo Registro
        </Button>
      </div>
    </div>
  );
}

export function EventosFilter({
  onSearch,
  onAdd,
}: {
  onSearch?: (params: { title?: string }) => void;
  onAdd?: () => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-4 py-2">
      <div className="flex flex-1 flex-wrap gap-3">
        <div className="relative flex-[2] min-w-[240px]">
          <Input 
            className="bg-neutral-50 border-neutral-200" 
            placeholder="Título do evento..." 
            onChange={(e) => onSearch?.({ title: e.target.value })}
          />
        </div>
      </div>
      
      <div className="flex gap-2">
        <Button variant="default" className="px-6" onClick={() => onSearch?.({})}>Pesquisar</Button>
        <Button type="button" variant="outline" className="border-neutral-300" onClick={onAdd}>
          Novo Registro
        </Button>
      </div>
    </div>
  );
}

export function BannersFilter({
  onSearch,
  onAdd,
}: {
  onSearch?: (params: { title?: string }) => void;
  onAdd?: () => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-4 py-2">
      <div className="flex flex-1 flex-wrap gap-3">
        <div className="relative flex-[2] min-w-[240px]">
          <Input 
            className="bg-neutral-50 border-neutral-200" 
            placeholder="Título do banner..." 
            onChange={(e) => onSearch?.({ title: e.target.value })}
          />
        </div>
      </div>
      
      <div className="flex gap-2">
        <Button variant="default" className="px-6" onClick={() => onSearch?.({})}>Pesquisar</Button>
        <Button type="button" variant="outline" className="border-neutral-300" onClick={onAdd}>
          Novo Registro
        </Button>
      </div>
    </div>
  );
}

export function UsuariosFilter({
  onSearch,
  onAdd,
}: {
  onSearch?: (params: { name?: string }) => void;
  onAdd?: () => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-4 py-2">
      <div className="flex flex-1 flex-wrap gap-3">
        <div className="relative flex-[2] min-w-[240px]">
          <Input 
            className="bg-neutral-50 border-neutral-200" 
            placeholder="Nome do usuário..." 
            onChange={(e) => onSearch?.({ name: e.target.value })}
          />
        </div>
      </div>
      
      <div className="flex gap-2">
        <Button variant="default" className="px-6" onClick={() => onSearch?.({})}>Pesquisar</Button>
        <Button type="button" variant="outline" className="border-neutral-300" onClick={onAdd}>
          Novo Registro
        </Button>
      </div>
    </div>
  );
}
