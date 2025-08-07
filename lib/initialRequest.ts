export const fetchInitialVideos = async () => {
  const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=popular&type=video&maxResults=1&regionCode=IN&key=${API_KEY}`
  );

  if (!res.ok) {
    const errorData = await res.json();
    console.error("YouTube API error:", errorData);

    if (errorData?.error?.errors?.[0]?.reason === "quotaExceeded") {
      throw new Error("YouTube API quota exceeded. Try again tomorrow.");
    }

    throw new Error("Failed to fetch YouTube videos");
  }

  return await res.json();
};
