import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q") || "bitcoin";

    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
      q
    )}&apiKey=${process.env.NEWS_API_KEY}`;

    const res = await fetch(url, {
      headers: {
        "User-Agent": "NextJS-News-App",
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("NewsAPI error:", errorText);
      return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("SERVER ERROR:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
