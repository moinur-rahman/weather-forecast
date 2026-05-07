"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSelector } from "react-redux";
import Link from "next/link";
import { AiFillHome } from "react-icons/ai";
import DayDetails from "@/components/DetailsPage/DayDetails";
import HeadingSection from "@/components/DetailsPage/HeadingSection";
import Pagination from "@/components/DetailsPage/Pagination";
import type { RootState } from "@/redux/store";

function getRange(
  pageId: number,
  remaining: number
): { first: number; last: number; headingIndex: number } {
  if (pageId === 1) return { first: 0, last: remaining - 1, headingIndex: 0 };
  const first = remaining + (pageId - 2) * 8;
  const last = pageId === 6 ? first + 8 : first + 7;
  return { first, last, headingIndex: first };
}

export default function DayPage() {
  const params = useParams();
  const id = parseInt(params.id as string);
  const router = useRouter();

  const dayForecast0 = useSelector(
    (state: RootState) => state.weatherData.dayForecast[0]
  );

  const remaining = dayForecast0
    ? Math.floor(
        (24 - parseInt(dayForecast0.dt_txt.split(" ")[1].substring(0, 2))) / 3
      )
    : 0;

  useEffect(() => {
    if (!dayForecast0) router.push("/");
  }, [dayForecast0, router]);

  if (!dayForecast0) return null;

  const { first, last, headingIndex } = getRange(id, remaining);

  return (
    <div
      className="flex items-center justify-center w-full h-screen bg-cover bg-center flex-col"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.1),rgba(0,0,0,0.3)), url('/images/cloud.jpg')",
      }}
    >
      <div className="flex w-full h-full justify-end absolute top-0 right-0 p-3">
        <Link href="/">
          <button className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-md font-semibold hover:bg-gray-100 transition-colors">
            <AiFillHome />
            Back to Home
          </button>
        </Link>
      </div>

      <div className="flex items-center justify-center w-[90%] h-[92%]">
        <div className="flex flex-col items-center justify-center gap-4">
          <HeadingSection index={headingIndex} />
          <DayDetails first={first} last={last} />
          <Pagination index={id} />
        </div>
      </div>
    </div>
  );
}
