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

const MONO = { fontFamily: "var(--font-mono), monospace" };

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
  const id     = parseInt(params.id as string);
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
      className="h-screen overflow-hidden flex flex-col"
      style={{
        background:
          "radial-gradient(ellipse at 70% 10%, #1E1A14 0%, #100F0D 50%)",
      }}
    >
      {/* ── Nav ── */}
      <div className="flex-shrink-0 flex items-center px-6 py-3">
        <Link
          href="/"
          className="btn-outline flex items-center gap-2 px-4 py-2 text-xs tracking-widest"
          style={MONO}
        >
          <AiFillHome size={12} />
          HOME
        </Link>
      </div>

      {/* ── Content ── */}
      <div className="flex-1 min-h-0 flex flex-col items-center px-6 pt-2 pb-2 gap-6">
        <HeadingSection index={headingIndex} />
        <DayDetails first={first} last={last} />
      </div>

      {/* ── Pagination — always pinned to bottom ── */}
      <div className="flex-shrink-0 flex justify-center py-4">
        <Pagination index={id} />
      </div>
    </div>
  );
}
