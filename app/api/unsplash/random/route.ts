import { NextResponse } from "next/server";

export async function GET() {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;
  if (!accessKey) {
    return NextResponse.json({ error: "Missing UNSPLASH_ACCESS_KEY" }, { status: 500 });
  }

  try {
    const res = await fetch("https://api.unsplash.com/photos/random?count=4", {
      headers: {
        Authorization: `Client-ID ${accessKey}`,
      },
      // Prevent Next from caching API responses unexpectedly
      cache: "no-store",
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ error: "Unsplash error", details: text }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: "Network error", details: message }, { status: 500 });
  }
}
