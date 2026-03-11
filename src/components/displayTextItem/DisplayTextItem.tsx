import { formatNumber } from "@/helper/formatHelper";
import styles from "./DisplayTextItem.module.scss";

type Props = {
  headline: string;
  content?: { v: number; u: string; d: number };
  text?: string;
  lines?: { key: string | number; value: string }[];
};

export default function DisplayTextItem(props: Props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.headline}>{props.headline}</div>
      {(props.content !== undefined || props.text !== undefined) && (
        <div className={styles.content}>
          {props.text !== undefined
            ? props.text
            : formatNumber(props.content?.v, 2, props.content?.u)}
          {props.lines &&
            props.lines.map((line, idx) => (
              <div key={idx} className={styles.inlineLine}>
                <p>{line.key}</p>
                <p>{line.value}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
