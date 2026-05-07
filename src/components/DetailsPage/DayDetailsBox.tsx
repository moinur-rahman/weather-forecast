"use client";

import Image from "next/image";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";

const DISPLAY = { fontFamily: "var(--font-display), sans-serif" };
const MONO    = { fontFamily: "var(--font-mono), monospace" };

const change24To12 = (dtTxt: string): string => {
  const timePart = dtTxt.split(" ")[1];
  let hours = Number(timePart.substring(0, 2));
  const mins = timePart.substring(3, 5);
  if (hours === 0)  return `12:${mins} AM`;
  if (hours === 12) return `12:${mins} PM`;
  if (hours > 12)   return `${hours - 12}:${mins} PM`;
  return `${hours}:${mins} AM`;
};

export default function DayDetailsBox({ index }: { index: number }) {
  const dayForecast = useSelector(
    (state: RootState) => state.weatherData.dayForecast[index]
  );

  if (!dayForecast) return null;

  return (
    <div className="card p-4 flex flex-col gap-2" style={{ width: "190px" }}>

      {/* Time + icon */}
      <div className="flex items-center justify-between">
        <span
          className="text-xs font-semibold"
          style={{ color: "var(--c-accent)", ...MONO }}
        >
          {change24To12(dayForecast.dt_txt)}
        </span>
        <Image
          src={`https://openweathermap.org/img/w/${dayForecast.weather[0].icon}.png`}
          alt={dayForecast.weather[0].main}
          width={28}
          height={28}
          style={{ opacity: 0.85 }}
        />
      </div>

      {/* Temperature */}
      <div>
        <div
          className="leading-none uppercase"
          style={{
            fontSize: "42px",
            ...DISPLAY,
            fontWeight: 900,
            color: "var(--c-text)",
            letterSpacing: "-0.02em",
          }}
        >
          {dayForecast.main.temp}°
        </div>
        <p className="text-xs capitalize mt-0.5" style={{ color: "var(--c-sub)", ...MONO }}>
          {dayForecast.weather[0].description}
        </p>
      </div>

      <div className="rule" />

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
        {[
          ["HUM", `${dayForecast.main.humidity}%`],
          ["CLD", `${dayForecast.clouds.all}%`],
          ["WND", `${dayForecast.wind.speed} m/s`],
          ["PRE", `${dayForecast.main.pressure} hPa`],
        ].map(([label, value]) => (
          <div key={label} className="flex flex-col gap-0.5">
            <span
              className="text-[9px] uppercase tracking-widest"
              style={{ color: "var(--c-muted)", ...MONO }}
            >
              {label}
            </span>
            <span className="text-xs font-semibold" style={{ color: "var(--c-text)", ...MONO }}>
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
