"use client";
import { useSolar } from "@/contexts/PowerContext";
import DisplayTextItem from "../displayTextItem/DisplayTextItem";
import styles from "./PowerPage.module.scss";
import { formatNumber } from "@/helper/formatHelper";
import { DataTableRow } from "../dataTableRow/DataTableRow";

export default function PowerPage() {
  const { livePowerData, liveSolarData } = useSolar();

  if (livePowerData === null) return <div>Got no power Data</div>;

  return (
    <div>
      <div className={styles.powerPage}>
        <div className={styles.items}>
          <DisplayTextItem
            text={formatNumber(livePowerData.total_power, 2, "W")}
            headline="Aktuelle Einspeisung"
          />
          <DisplayTextItem
            text={formatNumber(
              livePowerData.total_power + (liveSolarData?.total.Power.v ?? 0),
              2,
              "W",
            )}
            headline="Aktueller Verbrauch"
          />
        </div>
        <div className={styles.phases}>
          {livePowerData.emeters.map((phase, i) => (
            <div key={i} className={styles.phaseItem}>
              <div className={styles.headline}>{"Phase " + (i + 1)}</div>
              <table>
                <thead>
                  <tr>
                    <th>Eigenschaft</th>
                    <th>Wert</th>
                    <th>Einheit</th>
                  </tr>
                </thead>
                <tbody>
                  {DataTableRow("Watt", phase.power, 2, "W")}
                  {DataTableRow("Strom", phase.current, 2, "A")}
                  {DataTableRow("Spannung", phase.voltage, 2, "V")}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
