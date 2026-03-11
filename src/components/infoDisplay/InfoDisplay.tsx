import { DailySolarData } from "@/types/SolarHistory";
import styles from "./infoDisplay.module.scss";
import { SolarData } from "@/types/OpenDTUData";
import { formatNumber } from "../../helper/formatHelper";
import { useTranslations } from "@/locales";

type Props = {
  solarData: SolarData;
  todayData: DailySolarData;
};

export default function InfoDisplay({ solarData, todayData }: Props) {
  const t = useTranslations();
  if (solarData == null || todayData == null || solarData.inverters == null)
    return <div>{t.noData}</div>;

  return (
    <div className={styles.wrapper}>
      <div>
        <div>
          {t.inverter}: {solarData.inverters[0].name}
        </div>
        <div>
          {t.temperature}:{" "}
          {formatNumber(
            solarData.inverters[0].INV[0].Temperature.v,
            2,
            solarData.inverters[0].INV[0].Temperature.u,
          )}
        </div>
        <div>
          {t.lastUpdate}: {solarData.inverters[0].data_age} {t.seconds}
        </div>
      </div>
      <div className={styles.alignRight}>
        <div>
          {t.reachable}: {solarData.inverters[0].reachable ? t.yes : t.no}
        </div>
        <div>
          {t.wattPeak}: {formatNumber(todayData.highestWatt, 0, "Wh")}
        </div>
      </div>
    </div>
  );
}
