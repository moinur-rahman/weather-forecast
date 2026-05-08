"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import type { RootState } from "@/redux/store";

const MONO    = { fontFamily: "var(--font-mono), monospace" };
const DISPLAY = { fontFamily: "var(--font-display), sans-serif" };

export default function Pagination({ index, headingIndex }: { index: number; headingIndex: number }) {
  const dayForecast = useSelector((state: RootState) => state.weatherData.dayForecast[headingIndex]);

  const dateStr = dayForecast?.dt_txt.split(" ")[0];
  const dateObj = dateStr ? new Date(`${dateStr}T12:00:00`) : null;

  const dayName = dateObj?.toLocaleDateString("en-US", { weekday: "long" }).toUpperCase() ?? "";
  const monthDay = dateObj?.toLocaleDateString("en-US", { month: "short", day: "numeric" }).toUpperCase() ?? "";

  return (
    <div className="relative flex items-center justify-center w-64 animate-fade-up">
      {index !== 1 ? (
        <Link href={`/day/${index - 1}`} className="btn-outline w-9 h-9 absolute left-0">
          <FaChevronLeft size={11} />
        </Link>
      ) : null}

      <div className="text-center">
        <p className="leading-none font-black uppercase" style={{ ...DISPLAY, fontSize: "clamp(18px, 3vw, 26px)", color: "var(--c-text)", letterSpacing: "-0.01em" }}>
          {dayName}
        </p>
        <p className="text-[10px] uppercase tracking-widest mt-0.5" style={{ color: "var(--c-muted)", ...MONO }}>
          {monthDay} · {index} of 6
        </p>
      </div>

      {index !== 6 ? (
        <Link href={`/day/${index + 1}`} className="btn-outline w-9 h-9 absolute right-0">
          <FaChevronRight size={11} />
        </Link>
      ) : null}
    </div>
  );
}
