import { SolarData } from "@/types/OpenDTUData";
import styles from "./SolarSummaryDisplay.module.scss";
import { DataTableRow } from "../dataTableRow/DataTableRow";

export default function SolarSummaryDisplay(solarData: SolarData) {
  if (solarData == null) return <div>Got no Data</div>;

  const data = solarData.inverters[0].AC[0];

  return (
    <div className={styles.wrapper}>
      <div className={styles.headline}>Phase 1</div>
      <table>
        <thead>
          <tr>
            <th>Eigenschaft</th>
            <th>Wert</th>
            <th>Einheit</th>
          </tr>
        </thead>
        <tbody>
          {DataTableRow("Leistung", data.Power.v, 2, data.Power.u)}
          {DataTableRow("Spannung", data.Voltage.v, 2, data.Voltage.u)}
          {DataTableRow("Strom", data.Current.v, 2, data.Current.u)}
          {DataTableRow("DC-Leistung", data.PowerDC?.v, 2, data.PowerDC?.u)}
          {DataTableRow("Tagesertrag", data.YieldDay.v, 2, data.YieldDay.u)}
          {DataTableRow(
            "Gesamtertrag",
            data.YieldTotal.v,
            2,
            data.YieldTotal.u,
          )}
          {DataTableRow("Frequenz", data.Frequency.v, 2, data.Frequency.u)}
          {DataTableRow(
            "Leistungsfaktor",
            data.PowerFactor.v,
            2,
            data.PowerFactor.u,
          )}
          {DataTableRow(
            "Blindleistung",
            data.ReactivePower.v,
            2,
            data.ReactivePower.u,
          )}
          {DataTableRow(
            "Wirkungsgrad",
            data.Efficiency.v,
            2,
            data.Efficiency.u,
          )}
        </tbody>
      </table>
    </div>
  );
}
