import CurrentDay from "@/components/HomePage/CurrentDay";
import CurrentDayDetails from "@/components/HomePage/CurrentDayDetails";

export default function Home() {
  return (
    <div
      className="flex items-center justify-center w-full h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.1),rgba(0,0,0,0.3)), url('/images/cloud.jpg')",
      }}
    >
      <div className="flex flex-col w-[90%] h-[96%]">
        <CurrentDay />
        <CurrentDayDetails />
      </div>
    </div>
  );
}
