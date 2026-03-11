import { SolarData } from "@/types/OpenDTUData";
import styles from "./SolarSummaryDisplay.module.scss";
import { DataTableRow } from "../dataTableRow/DataTableRow";
import { useTranslations } from "@/locales";

export default function SolarSummaryDisplay(solarData: SolarData) {
  const t = useTranslations();
  if (solarData == null) return <div>{t.noData}</div>;

  const data = solarData.inverters[0].AC[0];

  return (
    <div className={styles.wrapper}>
      <div className={styles.headline}>{t.phase} 1</div>
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
          {DataTableRow(t.dcPower, data.PowerDC?.v, 2, data.PowerDC?.u)}
          {DataTableRow(t.dailyYield, data.YieldDay.v, 2, data.YieldDay.u)}
          {DataTableRow(t.totalYield, data.YieldTotal.v, 2, data.YieldTotal.u)}
          {DataTableRow(t.frequency, data.Frequency.v, 2, data.Frequency.u)}
          {DataTableRow(
            t.powerFactor,
            data.PowerFactor.v,
            2,
            data.PowerFactor.u,
          )}
          {DataTableRow(
            t.reactivePower,
            data.ReactivePower.v,
            2,
            data.ReactivePower.u,
          )}
          {DataTableRow(t.efficiency, data.Efficiency.v, 2, data.Efficiency.u)}
        </tbody>
      </table>
    </div>
  );
}
