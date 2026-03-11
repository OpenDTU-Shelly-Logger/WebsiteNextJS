import { formatNumberSeparated } from "@/helper/formatHelper";

export const DataTableRow = (
  title: string,
  value: number | undefined,
  digits: number,
  unit?: string,
) => {
  const frmt = formatNumberSeparated(value, digits, unit);
  return (
    <tr>
      <td>{title}</td>
      <td>{frmt[0]}</td>
      <td>{frmt[1]}</td>
    </tr>
  );
};
