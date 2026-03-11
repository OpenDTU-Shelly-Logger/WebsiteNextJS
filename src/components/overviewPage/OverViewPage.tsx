"use client";

import styles from "./OverViewPage.module.scss";
import PowerFlowGraph from "../powerFlowGraph/PowerFlowGraph";
import { useSolar } from "@/contexts/PowerContext";
import IndividualCellDisplay from "../individualCellDisplay/IndividualCellDisplay";
import OverviewItem from "../overviewItem/OverviewItem";
import SectionHeadline from "../sectionHeadline/SectionHeadline";
import { useTranslations } from "@/locales";

export default function OverViewPage() {
  const t = useTranslations();
  const { historyData, livePowerData, liveSolarData } = useSolar();
  const todayData = historyData[historyData.length - 1];

  if (!todayData || !liveSolarData || !livePowerData) return t.noData;

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

        <SectionHeadline text={t.today} />

        <div className={styles.overviewItems}>
          <OverviewItem
            digits={0}
            title={`${t.solar} ${t.peak}`}
            value={todayData.highestWatt}
            unit="W"
          />

          <OverviewItem
            digits={0}
            title={t.dailyYield}
            value={liveSolarData?.total.YieldDay.v}
            unit="Wh"
          />

          <OverviewItem
            digits={0}
            title={t.houseConsumption}
            value={todayData.consumedWH ?? 0}
            unit="Wh"
          />

          <OverviewItem
            digits={0}
            title={t.gridFeedIn}
            value={todayData.exportedWH ?? 0}
            unit="Wh"
          />

          <OverviewItem
            digits={0}
            title={t.usedSolarPower}
            value={todayData.selfUsedWH ?? 0}
            unit="Wh"
          />

          <OverviewItem
            digits={1}
            title={t.selfConsumptionRate}
            value={(todayData.selfConsumptionRatio ?? 0) * 100}
            unit="%"
          />

          <OverviewItem
            digits={1}
            title={t.autarkyRate}
            value={(todayData.autarkyRatio ?? 0) * 100}
            unit="%"
          />
          <SectionHeadline text={t.allTime} />

          <OverviewItem
            digits={0}
            title={t.totalYield}
            value={liveSolarData?.total.YieldTotal.v}
            unit="kWh"
          />

          <OverviewItem
            digits={2}
            title={t.totalPowerConsumption}
            value={calculateTotalConsumed() / 1000}
            unit="kWh"
          />

          <OverviewItem
            digits={2}
            title={t.totalSolarUsed}
            value={calculateTotalSolarUsed() / 1000}
            unit="kWh"
          />

          <OverviewItem
            digits={2}
            title={t.totalGridFeedIn}
            value={calculateTotalExported() / 1000}
            unit="kWh"
          />
        </div>
        <SectionHeadline text={t.cellYield} />

        <div className={styles.centered}>
          <IndividualCellDisplay />
        </div>
      </div>
    </div>
  );
}
