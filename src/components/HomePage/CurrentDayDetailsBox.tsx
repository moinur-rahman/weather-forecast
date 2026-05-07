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

export default function CurrentDayDetailsBox({ index }: { index: number }) {
  const dayForecast = useSelector(
    (state: RootState) => state.weatherData.dayForecast[index]
  );

  if (!dayForecast) return null;

  return (
    <div className="hourly-card">
      <p className="text-xs font-semibold mb-2" style={{ color: "var(--c-accent)", ...MONO }}>
        {change24To12(dayForecast.dt_txt)}
      </p>

      <div className="flex items-center gap-2 mb-2">
        <Image
          src={`https://openweathermap.org/img/w/${dayForecast.weather[0].icon}.png`}
          alt={dayForecast.weather[0].main}
          width={32}
          height={32}
          style={{ opacity: 0.85 }}
        />
        <span
          className="font-bold uppercase leading-none"
          style={{ fontSize: "30px", ...DISPLAY, color: "var(--c-text)", letterSpacing: "-0.01em" }}
        >
          {dayForecast.main.temp}°
        </span>
      </div>

      <p className="text-xs capitalize mb-3" style={{ color: "var(--c-sub)", ...MONO }}>
        {dayForecast.weather[0].description}
      </p>

      <div className="rule mb-3" />

      <div className="flex flex-col gap-1.5">
        {[
          ["HUM", `${dayForecast.main.humidity}%`],
          ["CLD", `${dayForecast.clouds.all}%`],
          ["WND", `${dayForecast.wind.speed} m/s`],
        ].map(([label, val]) => (
          <div key={label} className="flex justify-between">
            <span className="text-[9px] uppercase tracking-wider" style={{ color: "var(--c-muted)", ...MONO }}>
              {label}
            </span>
            <span className="text-[11px] font-semibold" style={{ color: "var(--c-sub)", ...MONO }}>
              {val}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
