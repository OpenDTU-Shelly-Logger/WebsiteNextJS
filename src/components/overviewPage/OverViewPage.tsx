"use client";

import { useEffect, useState } from "react";
import styles from "./OverViewPage.module.scss";
import Compass from "../compass/Compass";
import PowerFlowGraph from "../powerFlowGraph/PowerFlowGraph";
import { useSolar } from "@/contexts/PowerContext";

export default function OverViewPage() {
  const { historyData, livePowerData, liveSolarData } = useSolar();
  const todayData = historyData[historyData.length - 1];
  const solarCells = liveSolarData?.inverters[0].DC;

  const [screenWidth, setScreenWidth] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!todayData || !liveSolarData || !livePowerData) return "No Data";

  const makeCell = (width: number, index: number) => {
    if (solarCells === undefined) return;

    if (screenWidth <= 500) width = 140;

    const dynamicStyle = {
      width: width - 20,
      height: width,
    };

    return (
      <div className={styles.cell} style={dynamicStyle}>
        <div
          className={styles.irradiationBox}
          style={{ height: solarCells[index].Irradiation?.v + "%" }}
        />
        <div className={styles.cellLabel}>{solarCells[index].name.u}</div>
        <div
          style={{ zIndex: 100 }}
        >{`${solarCells[index].Power.v.toFixed(1)}W`}</div>
      </div>
    );
  };

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

        <div style={{ fontSize: "24px", marginTop: 80 }}>Allgemeine Daten</div>

        <div className={styles.overviewItems}>
          <div className={styles.overviewItem}>
            <div>Gesamtertrag</div>
            <div>{liveSolarData?.total.YieldTotal.v.toFixed(0)} KWh</div>
          </div>
          <div className={styles.overviewItem}>
            <div>Peak</div>
            <div>{todayData.highestWatt} W</div>
          </div>
          <div className={styles.overviewItem}>
            <div>Tagesertrag</div>
            <div>{liveSolarData?.total.YieldDay.v.toFixed(0)} Wh</div>
          </div>

          <div className={styles.overviewItem} style={{ marginTop: "20px" }}>
            <div>Hausverbrauch</div>
            <div>{(todayData.consumedWH ?? 0).toFixed(0)} Wh</div>
          </div>
          <div className={styles.overviewItem}>
            <div>Netzeinspeisung</div>
            <div>{(todayData.exportedWH ?? 0).toFixed(0)} Wh</div>
          </div>
          <div className={styles.overviewItem}>
            <div>Umgesetzter Solarstrom</div>
            <div>{(todayData.selfUsedWH ?? 0).toFixed(0)} Wh</div>
          </div>
          <div className={styles.overviewItem}>
            <div>Eigenverbrauchsquote</div>
            <div>
              {((todayData.selfConsumptionRatio ?? 0) * 100).toFixed(1)}%
            </div>
          </div>
          <div className={styles.overviewItem}>
            <div>Autarkiegrad</div>
            <div>{((todayData.autarkyRatio ?? 0) * 100).toFixed(1)}%</div>
          </div>

          <div className={styles.overviewItem} style={{ marginTop: "20px" }}>
            <div>Gesamt Stromverbrauch</div>
            <div>{(calculateTotalConsumed() / 1000).toFixed(2)} kWh</div>
          </div>

          <div className={styles.overviewItem}>
            <div>Gesamt Solar verwendet</div>
            <div>{(calculateTotalSolarUsed() / 1000).toFixed(2)} kWh</div>
          </div>
          <div className={styles.overviewItem}>
            <div>Gesamt ins Netz</div>
            <div>{(calculateTotalExported() / 1000).toFixed(2)} kWh</div>
          </div>
        </div>

        <div style={{ fontSize: "24px", marginTop: 60 }}>
          Solarzellen Ertrag
        </div>
        <div className={styles.centered}>
          <div className={styles.column}>
            <div className={styles.rowBetween}>
              {makeCell(180, 3)}
              <Compass />
              {makeCell(160, 2)}
            </div>
            <div className={styles.rowCenter}>
              {makeCell(170, 0)}
              {makeCell(170, 1)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
