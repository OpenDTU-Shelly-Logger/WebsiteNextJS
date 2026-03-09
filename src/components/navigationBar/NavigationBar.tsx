import Link from "next/link";
import styles from "./NavigationBar.module.scss";

type Props = {
  children: React.ReactNode;
};

export default function NavigationBar({ children }: Props) {
  return (
    <div className={styles.app}>
      <nav className={styles.navigationBar}>
        <div className={styles.navBarButtons}>
          <Link href="/" className={styles.navigationBarButton}>
            Übersicht
          </Link>
          <Link href="/live" className={styles.navigationBarButton}>
            OpenDTU
          </Link>
          <Link href="/history" className={styles.navigationBarButton}>
            Verlauf
          </Link>
          <Link href="/table" className={styles.navigationBarButton}>
            Tabelle
          </Link>
          <Link href="/usage" className={styles.navigationBarButton}>
            Verbrauch
          </Link>
        </div>
      </nav>
      <main className={styles.pageDisplay}>{children}</main>
    </div>
  );
}
