import { DCData } from "@/types/OpenDTUData";
import styles from "./SolarCellDisplay.module.scss";
import { DataTableRow } from "../dataTableRow/DataTableRow";

export default function SolarCellDisplay(data: DCData) {
  if (data == null) return <div>Got no Data</div>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.headline}>{data.name.u ?? ""}</div>
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
          {DataTableRow("Tagesertrag", data.YieldDay.v, 2, data.YieldDay.u)}
          {DataTableRow(
            "Gesamtertrag",
            data.YieldTotal.v,
            2,
            data.YieldTotal.u,
          )}
          {DataTableRow(
            "Bestrahlung",
            data.Irradiation?.v,
            2,
            data.Irradiation?.u,
          )}
        </tbody>
      </table>
    </div>
  );
}
