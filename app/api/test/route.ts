// app/api/test/route.js
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("miniTube");

    const collections = await db.listCollections().toArray();

    return Response.json({
      message: "Connected to MongoDB!",
      collections,
    });
  } catch (e:any) {
    console.error(e);
    return new Response(
      JSON.stringify({ message: "Connection failed", error: e.message }),
      { status: 500 }
    );
  }
}
