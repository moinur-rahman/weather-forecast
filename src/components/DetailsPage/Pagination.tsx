"use client";

import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const MONO = { fontFamily: "var(--font-mono), monospace" };

export default function Pagination({ index }: { index: number }) {
  return (
    <div className="flex items-center gap-2 animate-fade-up">
      {index !== 1 && (
        <Link href={`/day/${index - 1}`} className="btn-outline w-9 h-9" style={MONO}>
          <FaChevronLeft size={11} />
        </Link>
      )}

      {([1, 2, 3, 4, 5, 6] as const).map((n) => {
        const isActive = index === n;
        return (
          <Link
            key={n}
            href={`/day/${n}`}
            className="btn-outline w-10 h-9 text-xs font-bold tracking-wider"
            style={{
              ...MONO,
              ...(isActive
                ? {
                    background: "var(--c-accent)",
                    borderColor: "var(--c-accent)",
                    color: "#100F0D",
                  }
                : {}),
            }}
          >
            {n}
          </Link>
        );
      })}

      {index !== 6 && (
        <Link href={`/day/${index + 1}`} className="btn-outline w-9 h-9" style={MONO}>
          <FaChevronRight size={11} />
        </Link>
      )}
    </div>
  );
}
