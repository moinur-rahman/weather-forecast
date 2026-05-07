"use client";

import { useEffect, useState } from "react";
import DayDetailsBox from "./DayDetailsBox";

interface DayDetailsProps {
  first: number;
  last: number;
}

export default function DayDetails({ first, last }: DayDetailsProps) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    setVisibleCount(0);
    let count = 0;
    const intervalId = setInterval(() => {
      count += 1;
      setVisibleCount(count);
      if (count >= 8) clearInterval(intervalId);
    }, 90);
    return () => clearInterval(intervalId);
  }, [first]);

  const indices: number[] = [];
  for (let i = first; i <= last && i < 40; i++) {
    indices.push(i);
  }

  return (
    <div className="flex flex-wrap justify-center gap-4 w-full max-w-5xl">
      {indices.map((idx, pos) =>
        visibleCount > pos ? (
          <div
            key={idx}
            className="animate-card-in"
            style={{ animationDelay: `${pos * 45}ms` }}
          >
            <DayDetailsBox index={idx} />
          </div>
        ) : null
      )}
    </div>
  );
}
