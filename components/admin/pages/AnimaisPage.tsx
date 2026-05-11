import SimpleCrud from "@/components/admin/crud/SimpleCrud";
import { AnimaisFilter } from "@/components/admin/crud/CrudFilters";

export default function AnimaisPage() {
  return (
    <SimpleCrud
      title="Animais"
      description="Gerencie os animais cadastrados para adocao e acompanhamento."
      itemLabel="animais"
      filterComponent={<AnimaisFilter />}
      fields={[
        { key: "nome", label: "Nome", placeholder: "Ex: Mingau" },
        { key: "especie", label: "Especie", placeholder: "Ex: Gato" },
        { key: "status", label: "Status", placeholder: "Ex: Disponivel" },
        { key: "responsavel", label: "Responsavel", placeholder: "Ex: Equipe A" },
      ]}
      initialItems={[
        { nome: "Nina", especie: "Gato", status: "Disponivel", responsavel: "Equipe 1" },
      ]}
    />
  );
}
