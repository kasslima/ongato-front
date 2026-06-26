'use client'

import { useEffect, useState } from "react";
import SimpleCrud from "@/components/admin/crud/SimpleCrud";
import { UsuariosFilter } from "@/components/admin/crud/CrudFilters";
import { getUsers, deleteUser, createUser } from "@/lib/users";
import { User } from "@/types/usuarios";
import { UsuarioModal } from "./UsuarioModal";

type StatusMessage = {
  type: "success" | "error";
  text: string;
};

export default function UsuariosPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<{ name?: string }>({});
  const [message, setMessage] = useState<StatusMessage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchUsers = async (showError = true) => {
    try {
      setLoading(true);
      const data = await getUsers(filter);
      setUsers(data);
      return true;
    } catch (error) {
      console.error("Erro ao buscar usuarios:", error);
      if (showError) {
        setMessage({ type: "error", text: "Nao foi possivel carregar os usuarios." });
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [filter]);

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este usuario?")) return;

    try {
      await deleteUser(Number(id));
      const refreshed = await fetchUsers(false);
      setMessage({
        type: refreshed ? "success" : "error",
        text: refreshed
          ? "Usuario excluido com sucesso."
          : "Usuario excluido, mas nao foi possivel atualizar a lista.",
      });
    } catch (error) {
      console.error("Erro ao excluir usuario:", error);
      setMessage({ type: "error", text: error instanceof Error ? error.message : "Erro ao excluir usuario." });
    }
  };

  const handleSubmit = async (data: { name: string; email: string; password: string; role?: "admin" | "dev" }) => {
    await createUser(data);
    const refreshed = await fetchUsers(false);
    setMessage({
      type: refreshed ? "success" : "error",
      text: refreshed
        ? "Usuario cadastrado com sucesso."
        : "Registro salvo, mas nao foi possivel atualizar a lista.",
    });
  };

  const crudItems = users.map((u) => ({
    id: u.id.toString(),
    values: {
      nome: u.name,
      email: u.email,
      perfil: u.role === "admin" ? "Administrador" : "Dev",
      criado: u.createdAt ? new Date(u.createdAt).toLocaleDateString("pt-BR") : "-",
    },
    raw: u,
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
            onAdd={() => setIsModalOpen(true)}
          />
        }
        fields={[
          { key: "nome", label: "Nome", placeholder: "Ex: Maria" },
          { key: "email", label: "E-mail", placeholder: "Ex: maria@email.com" },
          { key: "perfil", label: "Perfil", placeholder: "Ex: Admin" },
          { key: "criado", label: "Criado em", placeholder: "Ex: 01/01/2026" },
        ]}
        items={crudItems}
        loading={loading}
        message={message}
        onDelete={handleDelete}
      />
      <UsuarioModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleSubmit} />
    </>
  );
}
