import PowerPage from "@/components/powerPage/PowerPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solar Page",
  description: "",
  robots: "nofollow",
};

export default function PowerView() {
  return <PowerPage />;
}
