import TablePage from "@/components/tablePage/TablePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solar Page",
  description: "",
  robots: "nofollow",
  manifest: "https://solar.frozenassassine.de/assets/solar/manifest.json",
  icons: "https://solar.frozenassassine.de/assets/solar/favicon.ico",
};

export default function TableView() {
  return <TablePage />;
}
