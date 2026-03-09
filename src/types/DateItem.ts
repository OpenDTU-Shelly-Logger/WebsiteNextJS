export type DateItem = { year: number; month: number; day: number };

const appendZero = (item: number): string => {
  return item < 10 ? "0" + item : item.toString();
};

export const dateItemToString = (d: DateItem) =>
  `${appendZero(d.day)}.${appendZero(d.month)}.${d.year}`;
