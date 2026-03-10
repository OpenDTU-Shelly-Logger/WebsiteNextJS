import HomePage from "@/components/homePage/HomePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solar Page",
  description: "",
  robots: "nofollow",
};

export default function LiveView() {
  return <HomePage />;
}
