import CurrentDay from "@/components/HomePage/CurrentDay";
import CurrentDayDetails from "@/components/HomePage/CurrentDayDetails";

export default function Home() {
  return (
    <div
      className="h-screen overflow-hidden flex flex-col p-5 gap-4"
      style={{
        background:
          "radial-gradient(ellipse at 25% 15%, #1E1A14 0%, #100F0D 55%)",
      }}
    >
      <div className="flex-1 min-h-0">
        <CurrentDay />
      </div>
      <div className="flex-none">
        <CurrentDayDetails />
      </div>
    </div>
  );
}
