import Link from "next/link";
import styles from "./NavigationBar.module.scss";
import { useTranslations } from "@/locales";

type Props = {
  children: React.ReactNode;
};

export default function NavigationBar({ children }: Props) {
  const t = useTranslations();
  return (
    <div className={styles.app}>
      <nav className={styles.navigationBar}>
        <div className={styles.navBarButtons}>
          <Link href="/" className={styles.navigationBarButton}>
            {t.overview}
          </Link>
          <Link href="/live" className={styles.navigationBarButton}>
            {t.openDTU}
          </Link>
          <Link href="/history" className={styles.navigationBarButton}>
            {t.history}
          </Link>
          <Link href="/table" className={styles.navigationBarButton}>
            {t.table}
          </Link>
          <Link href="/usage" className={styles.navigationBarButton}>
            {t.consumption}
          </Link>
        </div>
      </nav>
      <main className={styles.pageDisplay}>{children}</main>
    </div>
  );
}
