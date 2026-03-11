import React from "react";
import styles from "./Compass.module.scss";

type Props = {
  rotation?: number;
};

const Compass: React.FC<Props> = ({ rotation = 0 }) => {
  return (
    <div
      className={styles.rotatedContainer}
      style={{ transform: `rotate: ${rotation}deg` }}
    >
      <div className={styles.container}>
        <div className={`${styles.label} ${styles.north}`}>N</div>
        <div className={`${styles.label} ${styles.south}`}>S</div>
        <div className={`${styles.label} ${styles.west}`}>W</div>
        <div className={`${styles.label} ${styles.east}`}>O</div>
        <div className={styles.circle}></div>
      </div>
    </div>
  );
};

export default Compass;
