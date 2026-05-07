import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import StoreProvider from "@/lib/redux/StoreProvider";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Weather Forecast",
  description: "5-day weather forecast application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={roboto.variable}>
      <body style={{ fontFamily: "var(--font-roboto), sans-serif" }}>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
