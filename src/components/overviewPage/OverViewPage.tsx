"use client";

import styles from "./OverViewPage.module.scss";
import PowerFlowGraph from "../powerFlowGraph/PowerFlowGraph";
import { useSolar } from "@/contexts/PowerContext";
import IndividualCellDisplay from "../individualCellDisplay/IndividualCellDisplay";
import OverviewItem from "../overviewItem/OverviewItem";
import SectionHeadline from "../sectionHeadline/SectionHeadline";

export default function OverViewPage() {
  const { historyData, livePowerData, liveSolarData } = useSolar();
  const todayData = historyData[historyData.length - 1];

  if (!todayData || !liveSolarData || !livePowerData) return "No Data";

  const calculateTotalExported = () => {
    let total = 0;
    historyData?.forEach((item) => {
      if (item.exportedWH === undefined) return;
      total += item.exportedWH;
    });
    return total;
  };
  const calculateTotalConsumed = () => {
    let total = 0;
    historyData?.forEach((item) => {
      if (item.consumedWH === undefined) return;
      total += item.consumedWH;
    });
    return total;
  };

  const calculateTotalSolarUsed = () => {
    let total = 0;
    historyData?.forEach((item) => {
      if (item.selfUsedWH === undefined) return;
      total += item.selfUsedWH;
    });
    return total;
  };

  return (
    <div>
      <div className={styles.overviewPage}>
        <PowerFlowGraph powerData={livePowerData} solarData={liveSolarData} />

        <SectionHeadline text="Heute" />

        <div className={styles.overviewItems}>
          <OverviewItem
            digits={0}
            title="Solar Peak"
            value={todayData.highestWatt}
            unit="W"
          />

          <OverviewItem
            digits={0}
            title="Tagesertrag"
            value={liveSolarData?.total.YieldDay.v}
            unit="Wh"
          />

          <OverviewItem
            digits={0}
            title="Hausverbrauch"
            value={todayData.consumedWH ?? 0}
            unit="Wh"
          />

          <OverviewItem
            digits={0}
            title="Netzeinspeisung"
            value={todayData.exportedWH ?? 0}
            unit="Wh"
          />

          <OverviewItem
            digits={0}
            title="Umgesetzter Solarstrom"
            value={todayData.selfUsedWH ?? 0}
            unit="Wh"
          />

          <OverviewItem
            digits={1}
            title="Eigenverbrauchsquote"
            value={(todayData.selfConsumptionRatio ?? 0) * 100}
            unit="%"
          />

          <OverviewItem
            digits={1}
            title="Autarkiegrad"
            value={(todayData.autarkyRatio ?? 0) * 100}
            unit="%"
          />
          <SectionHeadline text="Gesamt" />

          <OverviewItem
            digits={0}
            title="Gesamtertrag"
            value={liveSolarData?.total.YieldTotal.v}
            unit="kWh"
          />

          <OverviewItem
            digits={2}
            title="Gesamt Stromverbrauch"
            value={calculateTotalConsumed() / 1000}
            unit="kWh"
          />

          <OverviewItem
            digits={2}
            title="Gesamt Solar verwendet"
            value={calculateTotalSolarUsed() / 1000}
            unit="kWh"
          />

          <OverviewItem
            digits={2}
            title="Gesamt ins Netz"
            value={calculateTotalExported() / 1000}
            unit="kWh"
          />
        </div>
        <SectionHeadline text="Solarzellen Ertrag" />

        <div className={styles.centered}>
          <IndividualCellDisplay />
        </div>
      </div>
    </div>
  );
}
