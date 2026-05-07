"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import CurrentDayDetailsBox from "./CurrentDayDetailsBox";

const MONO = { fontFamily: "var(--font-mono), monospace" };

export default function CurrentDayDetails() {
  const dayForecast = useSelector((state: RootState) => state.weatherData.dayForecast[0]);
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (!dayForecast) return;
    setVisibleCount(0);
    let count = 0;
    const intervalId = setInterval(() => {
      count += 1;
      setVisibleCount(count);
      if (count >= 4) clearInterval(intervalId);
    }, 125);
    return () => clearInterval(intervalId);
  }, [dayForecast]);

  if (!dayForecast) return null;

  return (
    <div className="card px-5 py-4">
      <p
        className="text-[10px] uppercase tracking-widest mb-3"
        style={{ color: "var(--c-muted)", ...MONO }}
      >
        Hourly Forecast
      </p>
      <div className="flex gap-3 overflow-x-auto pb-1">
        {([1, 2, 3, 4] as const).map((idx, pos) =>
          visibleCount > pos ? (
            <div
              key={idx}
              className="animate-card-in flex-1 min-w-0"
              style={{ animationDelay: `${pos * 70}ms` }}
            >
              <CurrentDayDetailsBox index={idx} />
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}
