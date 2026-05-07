"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsSearch } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";
import { fetchWeatherData } from "@/redux/weatherDataSlice";
import type { AppDispatch, RootState } from "@/redux/store";

const formatTimezone = (seconds: number): string => {
  const hours = Math.floor(Math.abs(seconds) / 3600);
  const minutes = Math.floor((Math.abs(seconds) % 3600) / 60);
  const sign = seconds < 0 ? "-" : "";
  return `${sign}${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
};

export default function CurrentDay() {
  const [place, setPlace] = useState("");
  const [visible, setVisible] = useState(false);

  const locationName = useSelector(
    (state: RootState) => state.geocodeData.location
  );
  const dayForecast = useSelector(
    (state: RootState) => state.weatherData.dayForecast[0]
  );
  const city = useSelector((state: RootState) => state.weatherData.city);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (dayForecast) setVisible(true);
  }, [dayForecast]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setVisible(false);
    dispatch(fetchWeatherData(place));
  };

  return (
    <div className="flex items-center justify-evenly w-full h-[55%]">
      <div className="flex flex-col items-center justify-center w-[700px] h-[375px] bg-black/80 rounded-[30px] px-6">
        <div className="w-full mb-3">
          <form onSubmit={onSubmit} className="flex items-center gap-2">
            <input
              name="place"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              placeholder="Search"
              className="flex-1 text-white bg-white/10 border-none rounded-[10px] px-3 py-2 outline-none placeholder-gray-400"
            />
            <button
              type="submit"
              className="bg-white text-black px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              <BsSearch />
            </button>
          </form>
        </div>

        {visible && dayForecast && (
          <div className="animate-fade-in w-full">
            <p className="text-white text-xl font-semibold mb-3">
              Weather in {locationName}
            </p>
            <div className="grid grid-cols-4 gap-x-2 gap-y-1 text-white text-sm font-semibold">
              <span>Temperature:</span>
              <span>{dayForecast.main.temp} °C</span>
              <span>Cloudy:</span>
              <span>{dayForecast.clouds.all}%</span>

              <span>Feels like:</span>
              <span>{dayForecast.main.feels_like} °C</span>
              <span>Sunrise:</span>
              <span>{city?.sunrise}</span>

              <span className="flex items-center">
                <Image
                  src={`https://openweathermap.org/img/w/${dayForecast.weather[0].icon}.png`}
                  alt={dayForecast.weather[0].main}
                  width={30}
                  height={30}
                />
              </span>
              <span>{dayForecast.weather[0].main}</span>
              <span>Sunset:</span>
              <span>{city?.sunset}</span>

              <span className="col-span-2">
                {dayForecast.weather[0].description}
              </span>
              <span>Date:</span>
              <span>{city?.date}</span>

              <span>Humidity:</span>
              <span>{dayForecast.main.humidity}%</span>
              <span>Timezone:</span>
              <span>UTC {city && formatTimezone(city.timezone)}</span>

              <span>Wind speed:</span>
              <span>{dayForecast.wind.speed} m/s</span>
              <span>Pressure:</span>
              <span>{dayForecast.main.pressure} hPa</span>

              <span className="col-span-4 text-xs text-gray-300 mt-1">
                Weather recorded at {dayForecast.dt_txt}
              </span>
            </div>
          </div>
        )}
      </div>

      {dayForecast && (
        <div className="animate-fade-in">
          <Link
            href="/day/1"
            className="bg-white text-black px-4 py-2 rounded-md font-semibold hover:bg-gray-100 transition-colors"
          >
            Click here for 5 day forecast
          </Link>
        </div>
      )}
    </div>
  );
}
