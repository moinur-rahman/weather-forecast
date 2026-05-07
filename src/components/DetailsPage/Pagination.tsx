"use client";

import Link from "next/link";
import { FcNext, FcPrevious } from "react-icons/fc";
import {
  RiNumber1,
  RiNumber2,
  RiNumber3,
  RiNumber4,
  RiNumber5,
  RiNumber6,
} from "react-icons/ri";

const linkClass =
  "flex items-center justify-center bg-white text-black w-9 h-9 rounded-md hover:bg-gray-100 transition-colors";

const icons = [RiNumber1, RiNumber2, RiNumber3, RiNumber4, RiNumber5, RiNumber6];

export default function Pagination({ index }: { index: number }) {
  return (
    <div className="flex items-center gap-2 mt-4">
      {index !== 1 && (
        <Link href={`/day/${index - 1}`} className={linkClass}>
          <FcPrevious />
        </Link>
      )}
      {([1, 2, 3, 4, 5, 6] as const).map((n, i) => {
        const Icon = icons[i];
        return (
          <Link
            key={n}
            href={`/day/${n}`}
            className={`${linkClass} ${index === n ? "ring-2 ring-blue-400" : ""}`}
          >
            <Icon />
          </Link>
        );
      })}
      {index !== 6 && (
        <Link href={`/day/${index + 1}`} className={linkClass}>
          <FcNext />
        </Link>
      )}
    </div>
  );
}
