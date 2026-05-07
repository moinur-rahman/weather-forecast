"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import CurrentDayDetailsBox from "./CurrentDayDetailsBox";

export default function CurrentDayDetails() {
  const dayForecast = useSelector(
    (state: RootState) => state.weatherData.dayForecast[0]
  );
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

  return (
    <div className="flex flex-col items-center justify-center w-full h-[45%]">
      {dayForecast && visibleCount >= 1 && (
        <h1 className="animate-fade-in text-white text-2xl font-semibold mb-3">
          Hourly Forecast
        </h1>
      )}
      <div className="flex items-center justify-evenly w-full h-[90%]">
        {visibleCount >= 1 && (
          <div className="animate-fade-in">
            <CurrentDayDetailsBox index={1} />
          </div>
        )}
        {visibleCount >= 2 && (
          <div className="animate-fade-in">
            <CurrentDayDetailsBox index={2} />
          </div>
        )}
        {visibleCount >= 3 && (
          <div className="animate-fade-in">
            <CurrentDayDetailsBox index={3} />
          </div>
        )}
        {visibleCount >= 4 && (
          <div className="animate-fade-in">
            <CurrentDayDetailsBox index={4} />
          </div>
        )}
      </div>
    </div>
  );
}
