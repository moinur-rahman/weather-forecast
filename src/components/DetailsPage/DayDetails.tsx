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
    }, 125);
    return () => clearInterval(intervalId);
  }, [first]);

  const indices = [];
  for (let i = first; i <= last && i < 40; i++) {
    indices.push(i);
  }

  return (
    <div className="flex flex-wrap justify-evenly gap-4">
      {indices.map((idx, pos) =>
        visibleCount > pos ? (
          <div
            key={idx}
            className="animate-fade-in flex items-center justify-center w-[300px] h-[300px]"
          >
            <DayDetailsBox index={idx} />
          </div>
        ) : null
      )}
    </div>
  );
}
