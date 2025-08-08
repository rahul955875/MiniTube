import clientPromise from "@/lib/mongodb";

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
  try {
    const client = await clientPromise;
    const db = client.db("miniTube");

    const videos = await db
      .collection("videos")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return Response.json(videos);
  } catch (err: any) {
    console.error(err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
