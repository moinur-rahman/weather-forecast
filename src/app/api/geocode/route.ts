import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const place = request.nextUrl.searchParams.get("place");
  if (!place) {
    return NextResponse.json(
      { error: "Place parameter is required" },
      { status: 400 }
    );
  }

  const response = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(place)}.json?access_token=${process.env.MAPBOX_API_TOKEN}&limit=1`
  );
  const data = await response.json();
  return NextResponse.json(data);
}
