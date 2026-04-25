import SimpleCrud from "@/components/admin/crud/SimpleCrud";

export default function UsuariosPage() {
  return (
    <SimpleCrud
      title="Usuarios"
      description="Controle os acessos administrativos e permissoes da equipe."
      itemLabel="usuarios"
      fields={[
        { key: "nome", label: "Nome", placeholder: "Ex: Maria" },
        { key: "email", label: "E-mail", placeholder: "Ex: maria@email.com" },
        { key: "perfil", label: "Perfil", placeholder: "Ex: Editor" },
        { key: "ultimoAcesso", label: "Ultimo acesso", placeholder: "Ex: Hoje 10:45" },
      ]}
      initialItems={[
        {
          nome: "Admin Principal",
          email: "admin@ongato.com",
          perfil: "Administrador",
          ultimoAcesso: "Hoje 09:00",
        },
      ]}
    />
  );
}
