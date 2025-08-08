import clientPromise from "@/lib/mongodb";
import { Video } from "@/types/videos";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, thumbnailUrl, videoUrl } = body;

    if (!title || !videoUrl) {
      return Response.json(
        { error: "Title and videoUrl are required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("miniTube");

    const result = await db.collection("videos").insertOne({
      title,
      description,
      thumbnailUrl,
      videoUrl,
      createdAt: new Date(),
    });

    return Response.json({ message: "Video added", id: result.insertedId });
  } catch (err: any) {
    console.error(err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}


export async function GET() {
  const client = await clientPromise;
  const db = client.db("miniTube");

  // MongoDB returns documents, so we map them to our Video type
  const videosFromDB = await db.collection("videos").find({}).toArray();

  const videos: Video[] = videosFromDB.map((v: any) => ({
    id: v._id.toString(),
    title: v.title,
    description: v.description,
    thumbnailUrl: v.thumbnailUrl,
    channelTitle: v.channelTitle,
    views: v.views,
    createdAt: v.createdAt,
    source: "local"
  }));

  return Response.json(videos);
}

