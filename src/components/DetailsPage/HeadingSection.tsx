"use client";

import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";

export default function HeadingSection({ index }: { index: number }) {
  const dayForecast = useSelector(
    (state: RootState) => state.weatherData.dayForecast[index]
  );

  return (
    <div className="mb-4">
      <h2 className="text-white text-5xl font-bold">
        {dayForecast?.dt_txt.split(" ")[0]}
      </h2>
    </div>
  );
}
