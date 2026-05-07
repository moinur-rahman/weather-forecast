import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const latitude = searchParams.get("latitude");
  const longitude = searchParams.get("longitude");

  if (!latitude || !longitude) {
    return NextResponse.json(
      { error: "Latitude and longitude parameters are required" },
      { status: 400 }
    );
  }

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${process.env.OPEN_WEATHER_MAP_API_TOKEN}`
  );
  const data = await response.json();
  return NextResponse.json(data);
}
