
import HomeFeedClient from "@/components/HomeFeedClient";
import clientPromise from "@/lib/mongodb";

export default async function HomePage() {
  // server-side read directly from DB for initial page
  const client = await clientPromise;
  const db = client.db("miniTube");

  const LIMIT = 12;
  const page = 1;

  const videosRaw = await db
    .collection("videos")
    .find({})
    .sort({ createdAt: -1 })
    .skip((page - 1) * LIMIT)
    .limit(LIMIT)
    .toArray();

  const formatted = videosRaw.map((v: any) => ({
    id: v._id.toString(),
    title: v.title,
    description: v.description,
    thumbnailUrl: v.thumbnailUrl,
    channelTitle: v.channelTitle,
    views: v.views ?? 0,
    createdAt: v.createdAt,
  }));

  // determine nextPage: check if more docs exist
  const totalCount = await db.collection("videos").countDocuments();
  const nextPage = totalCount > page * LIMIT ? page + 1 : null;

  return <HomeFeedClient initialVideos={formatted} nextPageToken={nextPage ?? undefined} source="backend" />;
}
