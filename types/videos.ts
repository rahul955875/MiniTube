// types/video.ts
export interface Video {
  id: string;
  title: string;
  description?: string;
  thumbnailUrl: string;
  channelTitle?: string;
  publishedAt?: string;
  source: "youtube" | "custom";
}
