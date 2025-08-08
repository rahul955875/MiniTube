// types/video.ts
export interface Video {
  id: string; // Can be YouTube videoId or MongoDB _id
  title: string;
  description: string;
  thumbnailUrl: string;
  channelTitle: string;
  views: number;
  createdAt: string; // ISO date string
  source: "youtube" | "local"; // where it came from
}
