import OverViewPage from "@/components/overviewPage/OverViewPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solar Page",
  description: "",
  robots: "nofollow",
};

export default function OverViewView() {
  return <OverViewPage />;
}
