export function formatNumber(
  value: number | undefined,
  fractionDigits: number = 1,
  unit: string = "",
): string {
  const number = value ?? 0;

  const locale =
    typeof navigator !== "undefined"
      ? navigator.languages?.[0] || navigator.language
      : "en-US";

  const options: Intl.NumberFormatOptions = {
    useGrouping: false,
  };

  if (fractionDigits !== null) {
    options.minimumFractionDigits = fractionDigits;
    options.maximumFractionDigits = fractionDigits;
  }

  const formatted =
    number === 0 ? "0" : new Intl.NumberFormat(locale, options).format(number);

  return unit ? `${formatted} ${unit}` : formatted;
}

export function formatNumberSeparated(
  value: number | undefined,
  fractionDigits: number = 1,
  unit: string = "",
): [val: string, unit: string] {
  const number = value ?? 0;

  const locale =
    typeof navigator !== "undefined"
      ? navigator.languages?.[0] || navigator.language
      : "en-US";

  const options: Intl.NumberFormatOptions = {
    useGrouping: false,
  };

  if (fractionDigits !== null) {
    options.minimumFractionDigits = fractionDigits;
    options.maximumFractionDigits = fractionDigits;
  }

  const formatted = new Intl.NumberFormat(locale, options).format(number);

  return [formatted, unit ? ` ${unit}` : ""];
}
