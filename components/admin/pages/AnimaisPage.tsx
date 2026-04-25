import SimpleCrud from "@/components/admin/crud/SimpleCrud";

export default function AnimaisPage() {
  return (
    <SimpleCrud
      title="Animais"
      description="Gerencie os animais cadastrados para adocao e acompanhamento."
      itemLabel="animais"
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
