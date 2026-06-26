import { apiFetch, throwApiError } from "./api";
import { User, GetUsersParams } from "@/types/usuarios";

export async function getUsers(params: GetUsersParams = {}) {
  const query = new URLSearchParams();
  if (params.cursor) query.set("cursor", params.cursor.toString());
  if (params.limit) query.set("limit", params.limit.toString());
  if (params.name) query.set("name", params.name);
  if (params.email) query.set("email", params.email);

  const response = await apiFetch(`/users?${query.toString()}`);
  if (!response.ok) await throwApiError(response, "Falha ao buscar usuarios");

  const data = await response.json();
  return data.result as User[];
}

export async function deleteUser(id: number) {
  const response = await apiFetch(`/users/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) await throwApiError(response, "Falha ao excluir usuario");
}

export async function createUser(data: { name: string; email: string; password: string; role?: "admin" | "dev" }) {
  const response = await apiFetch("/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) await throwApiError(response, "Falha ao criar usuario");
  return await response.json();
}
