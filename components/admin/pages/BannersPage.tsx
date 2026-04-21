import SimpleCrud from "@/components/admin/crud/SimpleCrud";

export default function BannersPage() {
  return (
    <SimpleCrud
      title="Banners"
      description="Atualize os banners exibidos nas paginas publicas do site."
      itemLabel="banners"
      fields={[
        { key: "titulo", label: "Titulo", placeholder: "Ex: Campanha de Inverno" },
        { key: "posicao", label: "Posicao", placeholder: "Ex: Home Topo" },
        { key: "periodo", label: "Periodo", placeholder: "Ex: Maio/2026" },
        { key: "visibilidade", label: "Visibilidade", placeholder: "Ex: Publico" },
      ]}
      initialItems={[
        {
          titulo: "Adote com Amor",
          posicao: "Home",
          periodo: "Abr-Jun",
          visibilidade: "Publico",
        },
      ]}
    />
  );
}
