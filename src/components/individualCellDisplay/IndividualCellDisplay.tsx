"use client";
import { useSolar } from "@/contexts/PowerContext";
import {
  CELL_SIZE_PX,
  CellConfig,
  CellPosition,
  decodeSolarLayout,
} from "@/types/SolarLayout";
import React, { useEffect, useRef, useState } from "react";
import Compass from "../compass/Compass";
import { useMemo } from "react";
import styles from "./IndividualCellDisplay.module.scss";
import { formatNumber } from "@/helper/formatHelper";

export default function IndividualCellDisplay() {
  const data = useSolar();
  const dcCells = data.liveSolarData?.inverters[0].DC;
  const containerRef = useRef<HTMLDivElement>(null);
  const [screenWidth, setScreenWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0,
  );
  const solarLayout = useMemo(() => {
    return decodeSolarLayout(process.env.NEXT_PUBLIC_SOLAR_CELL_LAYOUT ?? "");
  }, []);

  useEffect(() => {
    const updateScale = () => {
      setScreenWidth(window.outerWidth);
    };
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  function clamp(num: number, lower: number, upper: number) {
    return Math.min(Math.max(num, lower), upper);
  }

  const makeCell = (cell: CellConfig, key: number) => {
    if (!dcCells || dcCells[cell.dcIndex] === undefined) return null;
    const cellData = dcCells[cell.dcIndex];
    const px = CELL_SIZE_PX[cell.size];
    const irradiation = cellData.Irradiation?.v ?? 0;

    if (solarLayout === null)
      return <div>No solar layout defined in .env file</div>;

    return (
      <div
        key={key}
        ref={containerRef}
        className={styles.cell}
        style={{
          height: clamp((screenWidth / px) * 30, 100, 250),
          width: clamp((screenWidth / px) * 20, 100, 250),
          margin: clamp(screenWidth / px, 5, 20),
        }}
      >
        <div
          className={styles.irradiationBar}
          style={{
            height: `${irradiation < 1 ? 0 : irradiation}%`,
          }}
        />

        <p className={styles.powerText}>
          {formatNumber(cellData.Power.v, 1, "W")}
        </p>

        <p className={styles.labelText}>{cellData.name.u}</p>
      </div>
    );
  };

  const cellsAt = (pos: CellPosition) =>
    solarLayout?.cells.filter((c) => c.position === pos);

  return (
    <div className={styles.wrapper}>
      <div className={styles.layout}>
        <div className={styles.rowCenter}>
          {cellsAt("N")?.map((cell, i) => makeCell(cell, i))}
        </div>

        <div className={styles.rowMiddle}>
          <div className={styles.column}>
            {cellsAt("W")?.map((cell, i) => makeCell(cell, i))}
          </div>

          <div style={{ margin: clamp(screenWidth / 50, 2, 50) }}>
            <Compass rotation={solarLayout?.compassRotation} />
          </div>

          <div className={styles.column}>
            {cellsAt("E")?.map((cell, i) => makeCell(cell, i))}
          </div>
        </div>

        <div className={styles.rowCenter}>
          {cellsAt("S")?.map((cell, i) => makeCell(cell, i))}
        </div>
      </div>
    </div>
  );
}
