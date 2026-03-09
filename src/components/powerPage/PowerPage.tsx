"use client";
import { useSolar } from "@/contexts/PowerContext";
import DisplayTextItem from "../displayTextItem/DisplayTextItem";
import styles from "./PowerPage.module.scss";

export default function PowerPage() {
  const { livePowerData, liveSolarData } = useSolar();

  if (livePowerData === null) return <div>Got no power Data</div>;

  return (
    <div>
      <div className={styles.powerPage}>
        <div className={styles.items}>
          <DisplayTextItem
            text={livePowerData.total_power.toString() + "W"}
            headline="Aktuelle Einspeisung"
          />
          <DisplayTextItem
            text={
              (
                livePowerData.total_power + (liveSolarData?.total.Power.v ?? 0)
              ).toFixed(2) + "W"
            }
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
                  <tr>
                    <td>Watt</td>
                    <td>{phase.power}</td>
                    <td>W</td>
                  </tr>
                  <tr>
                    <td>Strom</td>
                    <td>{phase.current}</td>
                    <td>A</td>
                  </tr>

                  <tr>
                    <td>Spannung</td>
                    <td>{phase.voltage}</td>
                    <td>V</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
