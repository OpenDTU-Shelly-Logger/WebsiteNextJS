import en from "./en";
import de from "./de";

export type { Translations } from "./en";
export { en, de };

/** Reactive hook — returns the translation object matching the current language setting. */
export function useTranslations() {
  return process.env.NEXT_PUBLIC_LANGUAGE === "de" ? de : en;
}
