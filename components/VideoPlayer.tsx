// components/VideoPlayer.tsx
import { Video } from "@/types/videos";

interface Props {
  video: Video;
}

const VideoPlayer = ({ video }: Props) => {

  if (video.source === "youtube") {
    return (
      <iframe
        width="100%"
        height="500"
        src={`https://www.youtube.com/embed/${video.id}`}
        frameBorder="0"
        allowFullScreen
        title={video.title}
      />
    );
  }

  // Render your own backend-hosted video
  return (
    <video width="100%" height="500" controls>
      <source src={`https://your-backend.com/videos/${video.id}`} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoPlayer;
