"use client";
import { useState } from "react";
import styles from "./TablePage.module.scss";
import { useSolar } from "@/contexts/PowerContext";
import { dateItemToString } from "@/types/DateItem";
import { formatNumber } from "../../helper/formatHelper";

type SortField =
  | "Date"
  | "YieldTotal"
  | "YieldDay"
  | "HighestWatt"
  | "Temperature";
type SortDirection = "asc" | "desc";

export default function TablePage() {
  const { historyData } = useSolar();

  const [sortField, setSortField] = useState<SortField>("Date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  if (historyData == null) return <div>Got no Data</div>;

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const sortedData = [...historyData].sort((a, b) => {
    let comparison = 0;

    switch (sortField) {
      case "Date":
        //same as sorting dates:
        comparison = a.yieldTotal - b.yieldTotal;
        break;
      case "YieldDay":
        comparison = a.yieldDay - b.yieldDay;
        break;
      case "HighestWatt":
        comparison = a.highestWatt - b.highestWatt;
        break;
      case "Temperature":
        comparison = a.temperature - b.temperature;
        break;
    }

    return sortDirection === "asc" ? comparison : -comparison;
  });

  const getSortIndicator = (field: SortField) => {
    if (sortField === field) {
      return sortDirection === "asc" ? " ↑" : " ↓";
    }
    return "";
  };

  return (
    <div className={styles.tablePage}>
      <table>
        <thead>
          <tr>
            <th
              onClick={() => handleSort("Date")}
              className={styles.sortableHeader}
            >
              Tag{getSortIndicator("Date")}
            </th>
            <th>KW (Insgesamt)</th>
            <th
              onClick={() => handleSort("YieldDay")}
              className={styles.sortableHeader}
            >
              Watt (Täglich){getSortIndicator("YieldDay")}
            </th>
            <th
              onClick={() => handleSort("HighestWatt")}
              className={styles.sortableHeader}
            >
              Watt (Peak){getSortIndicator("HighestWatt")}
            </th>
            <th
              onClick={() => handleSort("Temperature")}
              className={styles.sortableHeader}
            >
              Temperatur (Peak){getSortIndicator("Temperature")}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((day, index) => (
            <tr key={index}>
              <td>{dateItemToString(day.date)}</td>
              <td>{formatNumber(day.yieldTotal, 1, "KWh")}</td>
              <td>{formatNumber(day.yieldDay, 0, "Wh")}</td>
              <td>{formatNumber(day.highestWatt, 1, "W")}</td>
              <td>{formatNumber(day.temperature, 0, "°C")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
