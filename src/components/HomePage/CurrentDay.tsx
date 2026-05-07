"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsSearch } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";
import { fetchWeatherData } from "@/redux/weatherDataSlice";
import type { AppDispatch, RootState } from "@/redux/store";

const DISPLAY = { fontFamily: "var(--font-display), sans-serif" };
const MONO    = { fontFamily: "var(--font-mono), monospace" };
const BODY    = { fontFamily: "var(--font-body), sans-serif" };

const formatTimezone = (s: number): string => {
  const h = Math.floor(Math.abs(s) / 3600);
  const m = Math.floor((Math.abs(s) % 3600) / 60);
  const sign = s < 0 ? "−" : "+";
  return `UTC ${sign}${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
};

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="chip p-3 flex flex-col gap-0.5">
      <span
        className="text-[10px] uppercase tracking-widest"
        style={{ color: "var(--c-muted)", ...MONO }}
      >
        {label}
      </span>
      <span className="text-sm font-semibold" style={{ color: "var(--c-text)", ...MONO }}>
        {value}
      </span>
    </div>
  );
}

function FooterItem({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <p
        className="text-[10px] uppercase tracking-widest mb-0.5"
        style={{ color: "var(--c-muted)", ...MONO }}
      >
        {label}
      </p>
      <p className="text-sm font-semibold" style={{ color: "var(--c-sub)", ...MONO }}>
        {value ?? "—"}
      </p>
    </div>
  );
}

export default function CurrentDay() {
  const [place, setPlace]     = useState("");
  const [visible, setVisible] = useState(false);

  const locationName = useSelector((state: RootState) => state.geocodeData.location);
  const dayForecast  = useSelector((state: RootState) => state.weatherData.dayForecast[0]);
  const city         = useSelector((state: RootState) => state.weatherData.city);
  const dispatch     = useDispatch<AppDispatch>();

  useEffect(() => {
    if (dayForecast) setVisible(true);
  }, [dayForecast]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setVisible(false);
    dispatch(fetchWeatherData(place));
  };

  return (
    <div className="card h-full p-6 flex flex-col">

      {visible && dayForecast ? (
        <>
          {/* ── Top row: city name + compact search ── */}
          <div className="flex items-start justify-between gap-4 flex-shrink-0 mb-4">
            <div className="animate-slide-right">
              <h1
                className="leading-none uppercase tracking-wide"
                style={{
                  ...DISPLAY,
                  fontSize: "clamp(22px, 2.5vw, 38px)",
                  fontWeight: 900,
                  color: "var(--c-text)",
                }}
              >
                {locationName}
              </h1>
              <p
                className="text-xs mt-1 uppercase tracking-widest"
                style={{ color: "var(--c-muted)", ...MONO }}
              >
                {city?.country} · {city?.date}
              </p>
            </div>

            <form onSubmit={onSubmit} className="flex gap-2 flex-shrink-0 animate-fade-up">
              <input
                name="place"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                placeholder="Search city…"
                className="search-input px-3 py-2 text-sm"
                style={{ ...BODY, width: "190px" }}
              />
              <button type="submit" className="btn-accent w-9 h-9 flex-shrink-0">
                <BsSearch size={13} />
              </button>
            </form>
          </div>

          <div className="rule flex-shrink-0 mb-4" />

          {/* ── Main: 3-column layout ── */}
          <div className="flex flex-1 min-h-0">

            {/* Col 1: Temperature */}
            <div className="flex flex-col justify-center pr-6 flex-shrink-0">
              <div className="animate-temp-in">
                <div
                  className="leading-none uppercase"
                  style={{
                    ...DISPLAY,
                    fontSize: "clamp(64px, 8vw, 128px)",
                    fontWeight: 900,
                    color: "var(--c-text)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {dayForecast.main.temp}
                </div>
                <span
                  className="text-2xl font-bold uppercase"
                  style={{ color: "var(--c-accent)", ...DISPLAY, letterSpacing: "0.05em" }}
                >
                  °C
                </span>
              </div>
            </div>

            {/* Divider */}
            <div
              className="flex-shrink-0 self-stretch"
              style={{ width: "1px", background: "var(--c-border)" }}
            />

            {/* Col 2: Condition (center, fills remaining) */}
            <div className="flex-1 flex flex-col items-center justify-center gap-3 px-6 animate-fade-up">
              <Image
                src={`https://openweathermap.org/img/w/${dayForecast.weather[0].icon}.png`}
                alt={dayForecast.weather[0].main}
                width={64}
                height={64}
                style={{ opacity: 0.9 }}
              />
              <div className="text-center">
                <p
                  className="text-lg font-semibold capitalize"
                  style={{ color: "var(--c-text)", ...BODY }}
                >
                  {dayForecast.weather[0].description}
                </p>
                <p className="text-sm mt-1" style={{ color: "var(--c-sub)", ...MONO }}>
                  Feels like {dayForecast.main.feels_like}°C
                </p>
              </div>
            </div>

            {/* Divider */}
            <div
              className="flex-shrink-0 self-stretch"
              style={{ width: "1px", background: "var(--c-border)" }}
            />

            {/* Col 3: Stats + button */}
            <div
              className="flex flex-col justify-between flex-shrink-0 pl-6 animate-fade-up"
              style={{ width: "196px" }}
            >
              <div className="grid grid-cols-2 gap-2">
                <Stat label="Humidity" value={`${dayForecast.main.humidity}%`} />
                <Stat label="Clouds"   value={`${dayForecast.clouds.all}%`} />
                <Stat label="Wind"     value={`${dayForecast.wind.speed} m/s`} />
                <Stat label="Pressure" value={`${dayForecast.main.pressure}`} />
              </div>

              <Link
                href="/day/1"
                className="btn-accent w-full py-2.5 text-xs tracking-widest"
                style={MONO}
              >
                5-DAY FORECAST →
              </Link>
            </div>
          </div>

          <div className="rule flex-shrink-0 mt-4 mb-3" />

          {/* ── Footer ── */}
          <div className="animate-fade-in flex-shrink-0 flex justify-between">
            <FooterItem label="Sunrise"  value={city?.sunrise} />
            <FooterItem label="Sunset"   value={city?.sunset} />
            <FooterItem label="Timezone" value={city ? formatTimezone(city.timezone) : undefined} />
            <FooterItem label="Recorded" value={dayForecast.dt_txt.split(" ")[1].substring(0, 5)} />
          </div>
        </>
      ) : (
        /* ── Empty state ── */
        <div className="flex-1 flex flex-col">
          <form onSubmit={onSubmit} className="flex gap-2 mb-5 flex-shrink-0">
            <input
              name="place"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              placeholder="Search city…"
              className="search-input flex-1 px-4 py-2.5 text-sm"
              style={BODY}
            />
            <button type="submit" className="btn-accent w-11 h-[42px] flex-shrink-0">
              <BsSearch size={14} />
            </button>
          </form>

          <div className="flex-1 flex flex-col items-center justify-center gap-3">
            <div
              className="uppercase leading-none"
              style={{
                ...DISPLAY,
                fontSize: "clamp(60px, 9vw, 120px)",
                fontWeight: 900,
                color: "var(--c-text)",
                opacity: 0.04,
                letterSpacing: "0.05em",
                userSelect: "none",
              }}
            >
              Weather
            </div>
            <p className="text-sm" style={{ color: "var(--c-muted)", ...MONO }}>
              Search a city to get started
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
