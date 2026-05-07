"use client";

import Image from "next/image";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";

const change24To12 = (dtTxt: string): string => {
  const timePart = dtTxt.split(" ")[1];
  let hours = Number(timePart.substring(0, 2));
  const rest = timePart.substring(2, 8);

  if (hours === 0) return `12${rest} AM`;
  if (hours > 12) return `${hours - 12}${rest} PM`;
  return `${hours}${rest} AM`;
};

export default function DayDetailsBox({ index }: { index: number }) {
  const dayForecast = useSelector(
    (state: RootState) => state.weatherData.dayForecast[index]
  );

  if (!dayForecast) return null;

  return (
    <div className="flex items-center justify-center w-[280px] h-[280px] bg-black/80 rounded-[20px]">
      <div className="grid grid-cols-2 w-[90%] gap-x-2 gap-y-1 text-white font-semibold text-sm">
        <span className="text-base">Time:</span>
        <span className="text-base">{change24To12(dayForecast.dt_txt)}</span>

        <span>Temperature:</span>
        <span>{dayForecast.main.temp} °C</span>

        <Image
          src={`https://openweathermap.org/img/w/${dayForecast.weather[0].icon}.png`}
          alt={dayForecast.weather[0].main}
          width={30}
          height={30}
        />
        <span>{dayForecast.weather[0].description}</span>

        <span>Humidity:</span>
        <span>{dayForecast.main.humidity}%</span>

        <span>Cloudy:</span>
        <span>{dayForecast.clouds.all}%</span>

        <span>Wind speed:</span>
        <span>{dayForecast.wind.speed} m/s</span>

        <span>Pressure:</span>
        <span>{dayForecast.main.pressure} hPa</span>
      </div>
    </div>
  );
}
