import React from "react";
import styles from "./Compass.module.scss";

const Compass: React.FC = () => {
  return (
    <div className={styles.rotatedContainer}>
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
