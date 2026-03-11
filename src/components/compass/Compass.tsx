import React from "react";
import styles from "./Compass.module.scss";
import { useTranslations } from "@/locales";

type Props = {
  rotation?: number;
};

const Compass: React.FC<Props> = ({ rotation = 0 }) => {
  const t = useTranslations();

  return (
    <div
      className={styles.rotatedContainer}
      style={{ transform: `rotate: ${rotation}deg` }}
    >
      <div className={styles.container}>
        <div className={`${styles.label} ${styles.north}`}>
          {t.direction_north}
        </div>
        <div className={`${styles.label} ${styles.south}`}>
          {t.direction_south}
        </div>
        <div className={`${styles.label} ${styles.west}`}>
          {t.direction_west}
        </div>
        <div className={`${styles.label} ${styles.east}`}>
          {t.direction_east}
        </div>
        <div className={styles.circle}></div>
      </div>
    </div>
  );
};

export default Compass;
