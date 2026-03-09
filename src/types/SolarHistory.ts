import { DateItem } from "./DateItem";

export interface DailySolarData {
  date: DateItem;
  yieldTotal: number;
  yieldDay: number;
  highestWatt: number;
  timeHighestWatt: string;
  temperature: number;
  timeHighestTemp: string;

  selfUsedWH?: number;
  exportedWH?: number;
  consumedWH?: number;
  selfConsumptionRatio?: number;
  autarkyRatio?: number;
}
