import SimpleCrud from "@/components/admin/crud/SimpleCrud";

export default function EventosPage() {
  return (
    <SimpleCrud
      title="Eventos"
      description="Organize campanhas, feiras e atividades do instituto."
      itemLabel="eventos"
      fields={[
        { key: "titulo", label: "Titulo", placeholder: "Ex: Feira de Adocao" },
        { key: "data", label: "Data", placeholder: "Ex: 30/04/2026" },
        { key: "local", label: "Local", placeholder: "Ex: Praca Central" },
        { key: "publicacao", label: "Publicacao", placeholder: "Ex: Ativa" },
      ]}
      initialItems={[
        {
          titulo: "Mutirao de Castracao",
          data: "10/05/2026",
          local: "Clinica Parceira",
          publicacao: "Ativa",
        },
      ]}
    />
  );
}
