export type User = {
  id: number;
  name: string;
  email: string;
  role?: "admin" | "dev";
  createdAt: string | null;
};

export type GetUsersParams = {
  cursor?: number;
  limit?: number;
  name?: string;
  email?: string;
};
