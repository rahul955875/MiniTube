
import { adaptYouTubeVideo } from "@/adapters/youtubeAdapter";
import CommentsSection from "@/components/CommentsSection";
import VideoDescription from "@/components/VideoDescription";
import VideoPlayer from "@/components/VideoPlayer";

// You’ll replace this with custom API logic later
async function fetchYouTubeVideo(id: string) {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
  );
  const data = await res.json();
  console.log(data, "data");
  return data.items?.[0] ? adaptYouTubeVideo(data.items[0]) : null;
}

export default async function VideoPage({
  params,
}: {
  params: { id: string };
}) {
  const video = await fetchYouTubeVideo(params.id);
  return video ? (
    <div style={{ padding: "1rem" }}>
      <VideoPlayer video={video} />

      <VideoDescription video={video} />
      <CommentsSection />
    </div>
  ) : (
    <h2>Error while Fetching video</h2>
  );
}
