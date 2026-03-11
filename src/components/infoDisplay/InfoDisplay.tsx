import { DailySolarData } from "@/types/SolarHistory";
import styles from "./infoDisplay.module.scss";
import { SolarData } from "@/types/OpenDTUData";
import { formatNumber } from "../../helper/formatHelper";

type Props = {
  solarData: SolarData;
  todayData: DailySolarData;
};

export default function InfoDisplay({ solarData, todayData }: Props) {
  if (solarData == null || todayData == null || solarData.inverters == null)
    return <div>Got no Data</div>;

  return (
    <div className={styles.wrapper}>
      <div>
        <div>Wechselrichter: {solarData.inverters[0].name}</div>
        <div>
          Temperatur:{" "}
          {formatNumber(
            solarData.inverters[0].INV[0].Temperature.v,
            2,
            solarData.inverters[0].INV[0].Temperature.u,
          )}
        </div>
        <div>Letztes Update: {solarData.inverters[0].data_age} Sekunde</div>
      </div>
      <div className={styles.alignRight}>
        <div>
          Erreichbar: {solarData.inverters[0].reachable ? "True" : "False"}
        </div>
        <div>Watt Peak: {formatNumber(todayData.highestWatt, 0, "Wh")}</div>
      </div>
    </div>
  );
}
