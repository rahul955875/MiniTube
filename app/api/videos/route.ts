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



export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page") || "1");
    const limit = Number(url.searchParams.get("limit") || "12");
    const query = url.searchParams.get("query") || "";

    const client = await clientPromise;
    const db = client.db("miniTube");

    const filter = query ? { title: { $regex: query, $options: "i" } } : {};

    const skip = (page - 1) * limit;

    const [videosRaw, totalCount] = await Promise.all([
      db
        .collection("videos")
        .find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .toArray(),
      db.collection("videos").countDocuments(filter),
    ]);

    const videos = videosRaw.map((v: any) => ({
      id: v._id.toString(),
      title: v.title,
      description: v.description,
      thumbnailUrl: v.thumbnailUrl,
      channelTitle: v.channelTitle,
      views: v.views ?? 0,
      createdAt: v.createdAt,
    }));

    const nextPage = totalCount > page * limit ? page + 1 : null;

    return new Response(JSON.stringify({ videos, nextPage }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
