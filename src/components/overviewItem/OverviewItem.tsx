import React from "react";
import styles from "./OverviewItem.module.scss";
import { formatNumber } from "@/helper/formatHelper";

type Props = {
  title: string;
  value?: number;
  digits: number;
  unit?: string;
  marginTop?: string | number;
};

export default function OverviewItem({
  title,
  value,
  digits,
  unit,
  marginTop = 4,
}: Props) {
  return (
    <div className={styles.overviewItem} style={{ marginTop: marginTop }}>
      <div>{title}</div>
      <div>{formatNumber(value, digits, unit)}</div>
    </div>
  );
}
