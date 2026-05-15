export type Banner = {
  id: number;
  title: string;
  imageUrl: string;
  description: string | null;
  createdAt: string | null;
};

export type GetBannersParams = {
  cursor?: number;
  limit?: number;
  title?: string;
};
