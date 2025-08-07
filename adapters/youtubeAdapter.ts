// adapters/youtubeAdapter.ts
import { Video } from "@/types/videos";

export const adaptYouTubeVideo = (item: any): Video => ({
  id: item.id.videoId || item.id,
  title: item.snippet.title,
  description: item.snippet.description,
  thumbnailUrl: item.snippet.thumbnails?.high?.url,
  channelTitle: item.snippet.channelTitle,
  publishedAt: item.snippet.publishedAt,
  source: "youtube",
});
