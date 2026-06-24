export type Animal = {
  id: number;
  name: string;
  imageUrl: string;
  age: "0 a 6 meses" | "6 a 12 meses" | "1 a 2 anos" | "2 a 5 anos" | "5 a 9 anos" | "mais de 9 anos";
  gender: "macho" | "femea";
  size: "pequeno" | "medio" | "grande";
  type: "gato" | "cachorro";
  description: string;
  featured: boolean;
  attributes: string | null;
  createdAt: string;
  updatedAt: string;
};

export type GetAnimalsParams = {
  cursor?: number;
  limit?: number;
  name?: string;
  type?: "gato" | "cachorro";
  gender?: "macho" | "femea";
};
