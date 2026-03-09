import { DailySolarData } from "@/types/SolarHistory";

function calculateFullMovingAverage(data: number[], length: number) {
  const movingAverage = [];
  let cumulativeSum = 0;

  for (let i = 0; i < data.length; i++) {
    cumulativeSum += data[i];

    if (i < length - 1) {
      //Use CMA for the initial points
      movingAverage.push(cumulativeSum / (i + 1));
    } else {
      //Use SMA for points after the initial window
      const sum = data.slice(i - length + 1, i + 1).reduce((a, b) => a + b, 0);
      movingAverage.push(sum / length);
    }
  }
  return movingAverage;
}
function calculateWeeklyAverages(data: number[], labels: string[]) {
  const weeklyAverages: number[] = [];
  let weekSum = 0;
  let weekCount = 0;

  labels.forEach((label, index) => {
    weekSum += data[index];
    weekCount++;

    if ((index + 1) % 7 === 0 || index === labels.length - 1) {
      weeklyAverages.push(weekSum / weekCount);
      weekSum = 0;
      weekCount = 0;
    }
  });

  const weeklyAverageLine: number[] = [];
  let weekIndex = 0;
  labels.forEach((_, index) => {
    if (index % 7 === 0 && weekIndex < weeklyAverages.length) {
      weekIndex++;
    }
    weeklyAverageLine.push(weeklyAverages[weekIndex - 1] || 0);
  });
  return weeklyAverageLine;
}
function calculateTrendLine(data: number[]) {
  const n = data.length;
  const x = [...Array(n).keys()];
  const sumX = x.reduce((sum, val) => sum + val, 0);
  const sumY = data.reduce((sum, val) => sum + val, 0);
  const sumXY = data.reduce((sum, val, i) => sum + val * x[i], 0);
  const sumX2 = x.reduce((sum, val) => sum + val * val, 0);

  const m = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const b = (sumY - m * sumX) / n;
  return x.map((xi) => m * xi + b);
}
function calculateAverageYieldDay(yearData: DailySolarData[]) {
  if (yearData === undefined) return 0;
  let calc = 0;
  yearData.forEach((item) => {
    calc += item.yieldDay;
  });

  return (calc / yearData.length).toFixed(0);
}
function calculateAverageTemperature(yearData: DailySolarData[]) {
  if (yearData === undefined) return 0;
  let calc = 0;
  yearData.forEach((item) => {
    calc += item.temperature;
  });
  return (calc / yearData.length).toFixed(2);
}
function calculateAverageHighestWatt(yearData: DailySolarData[]) {
  if (yearData === undefined) return 0;
  let calc = 0;
  yearData.forEach((item) => {
    calc += item.highestWatt;
  });
  return (calc / yearData.length).toFixed(0);
}
function calculateHighestPeakWatt(yearData: DailySolarData[]) {
  if (yearData === undefined) return 0;
  let highest = 0;
  yearData.forEach((item) => {
    if (item.highestWatt > highest) highest = item.highestWatt;
  });
  return highest.toFixed(0);
}
function calculateHighestYieldDay(yearData: DailySolarData[]) {
  if (yearData === undefined) return 0;
  let highest = 0;
  yearData.forEach((item) => {
    if (item.yieldDay > highest) highest = item.yieldDay;
  });
  return highest.toFixed(0);
}
function calculateTotalYield(yearData: DailySolarData[]): string {
  if (yearData === undefined || yearData.length == 0) return "0";

  return (
    yearData[yearData.length - 1].yieldTotal - yearData[0].yieldTotal
  ).toFixed(0);
}
function calculateAveragePowerConsumption(dataRange: DailySolarData[]) {
  if (dataRange === undefined) return 0;
  let calc = 0;
  dataRange.forEach((item) => {
    calc += (item.consumedWH ?? 0) + (item.exportedWH ?? 0);
  });
  return Math.round(calc / dataRange.length);
}

const stringToColor = (value: string) => {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = value.charCodeAt(i) + ((hash << 5) - hash);
  }
  return `hsl(${hash % 360}, 80%, 50%)`;
};

export {
  stringToColor,
  calculateAverageHighestWatt,
  calculateAveragePowerConsumption,
  calculateAverageTemperature,
  calculateAverageYieldDay,
  calculateFullMovingAverage,
  calculateHighestPeakWatt,
  calculateHighestYieldDay,
  calculateTotalYield,
  calculateTrendLine,
  calculateWeeklyAverages,
};
