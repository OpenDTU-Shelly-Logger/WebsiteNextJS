"use client";
import DisplayTextItem from "../displayTextItem/DisplayTextItem";
import SolarCellDisplay from "../solarCellDisplay/SolarCellDisplay";
import SolarSummaryDisplay from "../solarSummaryDisplay/SolarSummaryDisplay";
import styles from "./HomePage.module.scss";
import InfoDisplay from "../infoDisplay/InfoDisplay";
import { useSolar } from "@/contexts/PowerContext";

export default function HomePage() {
  const { liveSolarData, historyData } = useSolar();
  const todayData = historyData[historyData.length - 1];

  return (
    <div>
      {liveSolarData !== null && (
        <div className={styles.header}>
          <div className={styles.headitems}>
            <DisplayTextItem
              content={liveSolarData?.total.YieldTotal}
              headline="Gesamtertrag"
            />
            <DisplayTextItem
              content={liveSolarData?.total.YieldDay}
              headline="Tagesertrag"
            />
            <DisplayTextItem
              content={liveSolarData?.total.Power}
              headline="Aktuelle Leistung"
            />
          </div>
        </div>
      )}
      {liveSolarData !== null && (
        <InfoDisplay solarData={liveSolarData} todayData={todayData} />
      )}

      <div className={styles.infoItems}>
        {liveSolarData !== null && <SolarSummaryDisplay {...liveSolarData} />}

        <div className={styles.solarCells}>
          {liveSolarData?.inverters[0].DC &&
            Object.values(liveSolarData?.inverters[0].DC).map((x, i) => {
              if (x.name.u !== "-" && x.name.u !== "Leer") {
                return <SolarCellDisplay key={i} {...x} />;
              }
              return null;
            })}
        </div>
      </div>
    </div>
  );
}
