import TablePage from "@/components/tablePage/TablePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solar Page",
  description: "",
  robots: "nofollow",
};

export default function TableView() {
  return <TablePage />;
}
