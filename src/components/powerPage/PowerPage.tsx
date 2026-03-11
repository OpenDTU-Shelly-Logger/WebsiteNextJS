"use client";
import { useSolar } from "@/contexts/PowerContext";
import DisplayTextItem from "../displayTextItem/DisplayTextItem";
import styles from "./PowerPage.module.scss";
import { formatNumber } from "@/helper/formatHelper";
import { DataTableRow } from "../dataTableRow/DataTableRow";
import { useTranslations } from "@/locales";

export default function PowerPage() {
  const t = useTranslations();
  const { livePowerData, liveSolarData } = useSolar();

  if (livePowerData === null) return <div>{t.noData}</div>;

  return (
    <div>
      <div className={styles.powerPage}>
        <div className={styles.items}>
          <DisplayTextItem
            text={formatNumber(livePowerData.total_power, 2, "W")}
            headline={t.currentFeedIn}
          />
          <DisplayTextItem
            text={formatNumber(
              livePowerData.total_power + (liveSolarData?.total.Power.v ?? 0),
              2,
              "W",
            )}
            headline={t.currentConsumption}
          />
        </div>
        <div className={styles.phases}>
          {livePowerData.emeters.map((phase, i) => (
            <div key={i} className={styles.phaseItem}>
              <div className={styles.headline}>{t.phase + " " + (i + 1)}</div>
              <table>
                <thead>
                  <tr>
                    <th>{t.property}</th>
                    <th>{t.value}</th>
                    <th>{t.unit}</th>
                  </tr>
                </thead>
                <tbody>
                  {DataTableRow(t.power, phase.power, 2, "W")}
                  {DataTableRow(t.current, phase.current, 2, "A")}
                  {DataTableRow(t.voltage, phase.voltage, 2, "V")}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
