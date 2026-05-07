import CurrentDay from "@/components/HomePage/CurrentDay";
import CurrentDayDetails from "@/components/HomePage/CurrentDayDetails";

export default function Home() {
  return (
    <div className="flex flex-col p-4 md:p-5 gap-4 min-h-screen md:h-screen md:overflow-hidden">
      <div className="flex-1 md:min-h-0">
        <CurrentDay />
      </div>
      <div className="flex-none">
        <CurrentDayDetails />
      </div>
    </div>
  );
}
