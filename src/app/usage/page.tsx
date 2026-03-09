import PowerPage from "@/components/powerPage/PowerPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solar Page",
  description: "",
  robots: "nofollow",
  manifest: "https://solar.frozenassassine.de/assets/solar/manifest.json",
  icons: "https://solar.frozenassassine.de/assets/solar/favicon.ico",
};

export default function PowerView() {
  return <PowerPage />;
}
