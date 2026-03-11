import { DCData } from "@/types/OpenDTUData";
import styles from "./SolarCellDisplay.module.scss";
import { DataTableRow } from "../dataTableRow/DataTableRow";
import { useTranslations } from "@/locales";

export default function SolarCellDisplay(data: DCData) {
  const t = useTranslations();
  if (data == null) return <div>{t.noData}</div>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.headline}>{data.name.u ?? ""}</div>
      <table>
        <thead>
          <tr>
            <th>{t.property}</th>
            <th>{t.value}</th>
            <th>{t.unit}</th>
          </tr>
        </thead>
        <tbody>
          {DataTableRow(t.power, data.Power.v, 2, data.Power.u)}
          {DataTableRow(t.voltage, data.Voltage.v, 2, data.Voltage.u)}
          {DataTableRow(t.current, data.Current.v, 2, data.Current.u)}
          {DataTableRow(t.dailyYield, data.YieldDay.v, 2, data.YieldDay.u)}
          {DataTableRow(t.totalYield, data.YieldTotal.v, 2, data.YieldTotal.u)}
          {DataTableRow(
            t.irradiation,
            data.Irradiation?.v,
            2,
            data.Irradiation?.u,
          )}
        </tbody>
      </table>
    </div>
  );
}
