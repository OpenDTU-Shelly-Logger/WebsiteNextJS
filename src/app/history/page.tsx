import SolarGraphPage from "@/components/solarGraphPage/solarGraphPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solar Page",
  description: "",
  robots: "nofollow",
};

export default function HistoryView() {
  return <SolarGraphPage />;
}
