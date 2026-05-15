export type Event = {
  id: number;
  title: string;
  imageUrl: string;
  text: string | null;
  createdAt: string | null;
};

export type GetEventsParams = {
  cursor?: number;
  limit?: number;
  title?: string;
};
