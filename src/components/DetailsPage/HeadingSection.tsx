"use client";

import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";

const DISPLAY = { fontFamily: "var(--font-display), sans-serif" };
const MONO    = { fontFamily: "var(--font-mono), monospace" };

export default function HeadingSection({ index }: { index: number }) {
  const dayForecast = useSelector(
    (state: RootState) => state.weatherData.dayForecast[index]
  );
  const city = useSelector((state: RootState) => state.weatherData.city);

  const dateStr = dayForecast?.dt_txt.split(" ")[0];
  const dateObj = dateStr ? new Date(`${dateStr}T12:00:00`) : null;

  const dayName  = dateObj?.toLocaleDateString("en-US", { weekday: "long" }) ?? "";
  const fullDate = dateObj?.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }) ?? "";

  return (
    <div className="text-center animate-fade-up w-full max-w-3xl flex-shrink-0">
      {city && (
        <p
          className="text-xs uppercase tracking-widest mb-2"
          style={{ color: "var(--c-muted)", ...MONO }}
        >
          {city.name}, {city.country}
        </p>
      )}

      <h1
        className="leading-none uppercase"
        style={{
          ...DISPLAY,
          fontSize: "clamp(44px, 6vw, 88px)",
          fontWeight: 900,
          color: "var(--c-text)",
          letterSpacing: "-0.02em",
        }}
      >
        {dayName}
      </h1>

      <p className="text-sm mt-2" style={{ color: "var(--c-sub)", ...MONO }}>
        {fullDate}
      </p>

      <div className="rule mt-4" />
    </div>
  );
}
