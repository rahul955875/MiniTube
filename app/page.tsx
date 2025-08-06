import HomeFeedClient from "@/components/HomeFeedClient";

export default async function HomePage() {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=popular&type=video&maxResults=12&regionCode=IN&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`,
    { cache: "no-store" }
  );

  const data = await res.json();

  const initialVideos = data.items.map((item: any) => ({
    ...item,
    id: item.id.videoId,
  }));

  const nextPageToken = data.nextPageToken;

  return (
    <HomeFeedClient
      initialVideos={initialVideos}
      nextPageToken={nextPageToken}
    />
  );
}
