'use client'

import { useEffect, useState } from "react";
import SimpleCrud from "@/components/admin/crud/SimpleCrud";
import { UsuariosFilter } from "@/components/admin/crud/CrudFilters";
import { getUsers, deleteUser, createUser } from "@/lib/users";
import { User } from "@/components/admin/usuarios-types";
import { UsuarioModal } from "../UsuarioModal";

export default function UsuariosPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<{ name?: string }>({});
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getUsers(filter);
      setUsers(data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [filter]);

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este usuário?")) return;
    try {
      await deleteUser(Number(id));
      fetchUsers();
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
    }
  };

  const handleOpenCreate = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = async (data: { name: string; email: string; password: string; role?: "admin" | "dev" }) => {
    await createUser(data);
    fetchUsers();
  };

  const crudItems = users.map((u) => ({
    id: u.id.toString(),
    values: {
      nome: u.name,
      email: u.email,
      perfil: u.role === "admin" ? "Administrador" : "Dev",
      criado: u.createdAt ? new Date(u.createdAt).toLocaleDateString("pt-BR") : "—",
    },
    raw: u
  }));

  return (
    <>
      <SimpleCrud
        title="Usuarios"
        description="Controle os acessos administrativos e permissoes da equipe."
        itemLabel="usuarios"
        filterComponent={
          <UsuariosFilter 
            onSearch={(params) => setFilter(prev => ({ ...prev, ...params }))}
            onAdd={handleOpenCreate}
          />
        }
        fields={[
          { key: "nome", label: "Nome", placeholder: "Ex: Maria" },
          { key: "email", label: "E-mail", placeholder: "Ex: maria@email.com" },
          { key: "perfil", label: "Perfil", placeholder: "Ex: Admin" },
          { key: "criado", label: "Criado em", placeholder: "Ex: 01/01/2026" },
        ]}
        items={crudItems}
        onDelete={handleDelete}
      />

      <UsuarioModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </>
  );
}
