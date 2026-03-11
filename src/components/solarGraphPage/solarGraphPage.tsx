"use client";
import { useEffect, useState } from "react";
import styles from "./SolarGraphPage.module.scss";
import { Chart as ChartJS, registerables } from "chart.js";
import { Chart, Line } from "react-chartjs-2";
import {
  calculateAverageHighestWatt,
  calculateAverageTemperature,
  calculateAverageYieldDay,
  calculateFullMovingAverage,
  calculateHighestPeakWatt,
  calculateHighestYieldDay,
  calculateTotalYield,
  calculateTrendLine,
  calculateWeeklyAverages,
  stringToColor,
} from "@/helper/SolarChartCalculationHelper";
import { DailySolarData } from "@/types/SolarHistory";
import { useSolar } from "@/contexts/PowerContext";
import { DateItem, dateItemToString } from "@/types/DateItem";
import { formatNumber } from "@/helper/formatHelper";

let showEntryCount = 31;
const PRICE_PER_KWH = 0.24;

export default function SolarGraphPage() {
  const { historyData } = useSolar();

  const [dates, setDates] = useState<string[]>([]);
  const [yieldTotal, setYieldTotal] = useState<number[]>([]);
  const [yieldDay, setYieldDay] = useState<number[]>([]);
  const [temperature, setTemperature] = useState<number[]>([]);
  const [highestWatt, setHighestWatt] = useState<number[]>([]);
  const [solarData, setSolarData] = useState<DailySolarData[]>([]);
  const [allYearData, setAllYearData] = useState<
    Record<string, DailySolarData[]>
  >({});
  const [allMonthData, setAllMonthData] = useState<
    Record<string, DailySolarData[]>
  >({});
  const yearDates: string[] = Object.keys(allYearData);
  const monthDates: string[] = Object.keys(allMonthData);
  const [chartAccentColor, setChartAccentColor] = useState("rgb(255,100,0)");
  const [locale, setLocale] = useState("en-US");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const acc = getComputedStyle(document.documentElement)
        .getPropertyValue("--accent1")
        .trim();
      setChartAccentColor(acc);

      const localLocale =
        navigator.languages?.[0] || navigator.language || "en-US";
      ChartJS.defaults.locale = localLocale;
      setLocale(localLocale);
    }
  }, []);

  const yieldAverage =
    yieldDay.reduce((sum, value) => sum + value, 0) / yieldDay.length;

  function updateData() {
    const showItems = historyData.slice(historyData.length - showEntryCount);

    setSolarData(showItems);

    setDates(showItems.map((entry) => dateItemToString(entry.date)));
    setYieldTotal(showItems.map((entry) => entry.yieldTotal));
    setYieldDay(showItems.map((entry) => entry.yieldDay));
    setTemperature(showItems.map((entry) => entry.temperature));
    setHighestWatt(showItems.map((entry) => entry.highestWatt));
  }

  useEffect(() => {
    if (historyData.length === 0) return;

    updateData();

    const yearData: Record<string, DailySolarData[]> = {};

    for (const item of historyData) {
      const year = item.date.year;

      if (yearData[year] == null) yearData[year] = [];
      yearData[year].push(item);
    }

    const monthData: Record<string, DailySolarData[]> = {};

    const startYear = historyData[0].date.year;
    const endYear = historyData[historyData.length - 1].date.year;

    //add all month to the dictionary, for correct display, because we don't have all months in the data => data starting in march
    for (let year = startYear; year <= endYear; year++) {
      for (let i = 1; i < 13; i++) {
        const month = `${i.toString().length == 1 ? "0" + i : i}.${year}`;
        monthData[month] = [];
      }
    }

    for (const item of historyData) {
      const month = `${item.date.month < 10 ? "0" + item.date.month : item.date.month}.${item.date.year}`;

      monthData[month].push(item);
    }

    setAllYearData(yearData);
    setAllMonthData(monthData);
  }, [historyData]);

  if (historyData == null) return <div>Got no Data</div>;

  const parseGermanDate = (dateItem: DateItem): Date => {
    return new Date(dateItem.year, dateItem.month - 1, dateItem.day);
  };

  const getLastCommonDate = (): Date => {
    const maxTimestampsPerYear = yearDates.map((year) =>
      allYearData[year]
        .map((d) => {
          const date = parseGermanDate(d.date);
          // Set full year to a static leap year (2024) to compare M/D correctly across years
          date.setFullYear(2024);
          return date.getTime();
        })
        .reduce((a, b) => Math.max(a, b), -Infinity),
    );

    return new Date(
      maxTimestampsPerYear.reduce((a, b) => Math.min(a, b), Infinity),
    );
  };

  const lineChartData = {
    labels: dates,
    datasets: [
      {
        label: "Yield Total",
        data: yieldTotal,
        fill: false,
        borderColor: chartAccentColor,
        backgroundColor: chartAccentColor,
        pointRadius: 6,
      },
    ],
  };

  const dailyYieldData = {
    labels: dates,
    datasets: [
      {
        label: "Tagesertrag (Wh)",
        data: yieldDay,
        type: "bar" as const,
        backgroundColor: "rgb(255, 99, 132)",
        fill: false,
      },
      {
        label: "Durchschnitt (Wh)",
        data: Array(dates.length).fill(yieldAverage),
        borderColor: "rgb(0, 255, 50)",
        type: "line" as const,
        borderWidth: 3,
        pointRadius: 0,
        fill: false,
      },
      {
        type: "line" as const,
        label: "Wöchentlicher Durchschnitt (Wh)",
        data: calculateWeeklyAverages(yieldDay, dates),
        borderColor: "rgb(255,165,0)",
        borderWidth: 3,
        borderDash: [5, 5],
        pointRadius: 2,
        fill: false,
      },
      {
        label: "Trendlinie",
        type: "line" as const,
        data: calculateTrendLine(yieldDay),
        borderColor: "rgb(75, 192, 192)",
        borderWidth: 3,
        borderDash: [10, 5],
        pointRadius: 0,
        fill: false,
        hidden: true,
      },
      {
        label: `SMA (31 Tage)`,
        type: "line" as const,
        data: calculateFullMovingAverage(yieldDay, 31),
        borderColor: "rgb(195, 0, 255)",
        borderWidth: 3,
        pointRadius: 0,
        fill: false,
      },
    ],
  };

  const lineYieldDayData = {
    labels: dates,
    datasets: [
      {
        label: "Ertrag Peak",
        data: highestWatt,
        backgroundColor: "rgb(255,100,0)",
        borderColor: "rgb(255,100,0)",
        type: "bar" as const,
      },
      {
        label: "Trendlinie",
        type: "line" as const,
        data: calculateTrendLine(highestWatt),
        borderColor: "rgb(75, 192, 192)",
        borderWidth: 3,
        borderDash: [10, 5],
        pointRadius: 0,
        fill: false,
      },
      {
        label: `SMA (31 Tage)`,
        type: "line" as const,
        data: calculateFullMovingAverage(highestWatt, 31),
        borderColor: "rgb(0,255,0)",
        borderWidth: 3,
        pointRadius: 0,
        fill: false,
      },
      {
        label: "Wöchentlicher Durchschnitt (Wh)",
        type: "line" as const,
        data: calculateWeeklyAverages(highestWatt, dates),
        borderColor: "rgb(255, 0, 212)",
        borderWidth: 3,
        borderDash: [5, 5],
        pointRadius: 2,
        fill: false,
      },
    ],
  };

  const temperatureData = {
    labels: dates,
    datasets: [
      {
        label: "Temperatur Peak",
        data: temperature,
        backgroundColor: "rgb(0,255,100)",
        borderColor: "rgb(0,255,100)",
        type: "bar" as const,
      },
      {
        label: "Trendlinie",
        type: "line" as const,
        data: calculateTrendLine(temperature),
        borderColor: "rgb(75, 192, 192)",
        borderWidth: 3,
        borderDash: [10, 5],
        pointRadius: 0,
        fill: false,
        hidden: true,
      },
      {
        label: "Durchschnitt (Wh)",
        data: Array(dates.length).fill(temperature),
        borderColor: "rgb(0, 255, 50)",
        type: "line" as const,
        borderWidth: 3,
        pointRadius: 0,
        fill: false,
      },
      {
        label: `SMA (31 Tage)`,
        type: "line" as const,
        data: calculateFullMovingAverage(temperature, 31),
        borderColor: "rgb(195, 0, 255)",
        borderWidth: 3,
        pointRadius: 0,
        fill: false,
      },
    ],
  };

  const yearOptions = {
    locale: locale,
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Jährliche Daten",
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
      },
    },
    scales: {
      x: {
        stacked: false,
      },
      y: {
        stacked: false,
      },
    },
  };

  const allDates = new Set<string>();
  yearDates.forEach((year) => {
    allYearData[year].forEach((item) => {
      // Use a string format 'MM-DD' for correct Set deduplication and Map matching
      const monthStr = item.date.month.toString().padStart(2, "0");
      const dayStr = item.date.day.toString().padStart(2, "0");
      allDates.add(`${monthStr}-${dayStr}`);
    });
  });

  // Sort the 'MM-DD' strings
  const allDatesArr = [...allDates].sort();

  // Format MM-DD for display labels
  const formattedLabels = allDatesArr.map((dateStr) => {
    const [month, day] = dateStr.split("-");
    return `${day}.${month}.`;
  });

  let prevYearYield = 0;
  const yearlyData = {
    labels: formattedLabels,
    datasets: yearDates
      .map((year, index) => {
        prevYearYield -=
          index - 1 >= 0
            ? parseInt(calculateTotalYield(allYearData[yearDates[index - 1]]))
            : 0;

        const dateToYieldMap = new Map(
          allYearData[year].map((item) => {
            const monthStr = item.date.month.toString().padStart(2, "0");
            const dayStr = item.date.day.toString().padStart(2, "0");
            return [`${monthStr}-${dayStr}`, item.yieldTotal + prevYearYield];
          }),
        );
        const data = allDatesArr.map((dateStr) => {
          return dateToYieldMap.get(dateStr) || null;
        });

        return [
          {
            label: year,
            data: data,
            borderColor: stringToColor(year + index + "*142"),
            fill: false,
            pointRadius: 0,
          },
        ];
      })
      .flat(),
  };

  const START_MONTH = 0; // January = 0
  const START_DAY = 1; // 1st
  let prevYearYield2 = 0;

  const lastCommonDate = getLastCommonDate();

  const filteredDates = allDatesArr.filter((dateStr) => {
    const [month, day] = dateStr.split("-");
    // Use an arbitrary leap year (2024) to parse the date so Feb 29 remains valid
    const date = new Date(2024, parseInt(month) - 1, parseInt(day));
    const startDate = new Date(2024, START_MONTH, START_DAY);

    // Make lastCommonDate use that same leap year for a fair MM-DD comparison
    const compareLastCommonDate = new Date(lastCommonDate);
    compareLastCommonDate.setFullYear(2024);

    return date >= startDate && date <= compareLastCommonDate;
  });

  const lastNdates = filteredDates.slice(-30);

  const formattedLastNLabels = lastNdates.map((dateStr) => {
    const [month, day] = dateStr.split("-");
    return `${day}.${month}.`;
  });

  const smallRangeYearYield = {
    labels: formattedLastNLabels,
    datasets: yearDates
      .map((year, index) => {
        prevYearYield2 -=
          index - 1 >= 0
            ? parseInt(calculateTotalYield(allYearData[yearDates[index - 1]]))
            : 0;

        const dateToYieldMap = new Map(
          allYearData[year].map((item) => {
            const monthStr = item.date.month.toString().padStart(2, "0");
            const dayStr = item.date.day.toString().padStart(2, "0");
            return [`${monthStr}-${dayStr}`, item.yieldTotal + prevYearYield2];
          }),
        );

        const data = lastNdates.map((dateStr) => {
          return dateToYieldMap.get(dateStr) || null;
        });

        return {
          label: year,
          data,
          borderColor: stringToColor(year + index + "*142"),
          fill: false,
          pointRadius: 0,
        };
      })
      .flat(),
  };

  const yearData = {
    labels: yearDates,
    datasets: [
      {
        label: "Durchschnitt täglicher Ertrag (Watt)",
        data: yearDates.map((date) =>
          calculateAverageYieldDay(allYearData[date]),
        ),
        backgroundColor: "rgb(162, 0, 255)",
        type: "bar" as const,
      },
      {
        label: "Höchster Ertrag (Watt)",
        data: yearDates.map((date) =>
          calculateHighestYieldDay(allYearData[date]),
        ),
        backgroundColor: "rgb(0,255,100)",
        type: "bar" as const,
      },
      {
        label: "Durchschnitt Temperatur (°C)",
        data: yearDates.map((date) =>
          calculateAverageTemperature(allYearData[date]),
        ),
        backgroundColor: "rgb(255, 102, 0)",
        type: "bar" as const,
      },
      {
        label: "Gesamtertrag (KWh)",
        data: yearDates.map((date) => calculateTotalYield(allYearData[date])),
        backgroundColor: "rgb(0, 183, 255)",
        type: "bar" as const,
      },
      {
        label: "Durchschnitt Peak (Watt)",
        data: yearDates.map((date) =>
          calculateAverageHighestWatt(allYearData[date]),
        ),
        backgroundColor: "rgb(251, 255, 0)",
        type: "bar" as const,
      },
      {
        label: "Höchster Peak (Watt)",
        data: yearDates.map((date) =>
          calculateHighestPeakWatt(allYearData[date]),
        ),
        backgroundColor: "rgb(255, 0, 179)",
        type: "bar" as const,
      },
    ],
  };

  const monthNames = [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
  ];

  const monthlyAverageYieldData = {
    labels: monthNames,
    datasets: yearDates.map((year, index) => ({
      label: year,
      data: monthDates
        .filter((x) => x.includes(year))
        .map((month) => calculateAverageYieldDay(allMonthData[month])),
      fill: false,
      backgroundColor: stringToColor(year + index + "Hello"),
      pointRadius: 6,
    })),
  };

  const monthlyTotalYieldData = {
    labels: monthNames,
    datasets: yearDates.map((year, index) => ({
      label: year,
      data: monthDates
        .filter((x) => x.includes(year))
        .map((month) => calculateTotalYield(allMonthData[month])),
      fill: false,
      backgroundColor: stringToColor(year + index + "color"),
      pointRadius: 6,
    })),
  };
  const monthlyPeakData = {
    labels: monthNames,
    datasets: yearDates.map((year, index) => ({
      label: year,
      data: monthDates
        .filter((x) => x.includes(year))
        .map((month) => calculateHighestYieldDay(allMonthData[month])),
      fill: false,
      backgroundColor: stringToColor(year + index + "tra"),
      pointRadius: 6,
    })),
  };
  const monthlyLivePeakData = {
    labels: monthNames,
    datasets: yearDates.map((year, index) => ({
      label: year,
      data: monthDates
        .filter((x) => x.includes(year))
        .map((month) => calculateHighestPeakWatt(allMonthData[month])),
      fill: false,
      backgroundColor: stringToColor(year + index + "asldh"),
      pointRadius: 6,
    })),
  };

  const homePowerUsageChartOptions = {
    locale: locale,
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
        callbacks: {
          label: function (context: any) {
            const whValue = context.parsed.y || 0;
            const euroValue = (whValue / 1000) * PRICE_PER_KWH;

            const label = context.dataset.label || "";
            return `${label}: ${formatNumber(whValue, 0, "Wh")} (${formatNumber(
              euroValue,
              2,
              "€",
            )})`;
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: "Energie in Wh",
        },
      },
    },
  };

  const homePowerUsageChartData = {
    labels: dates,
    datasets: [
      {
        type: "bar" as const,
        label: "Eigenverbrauch",
        data: solarData.map((item) => item.selfUsedWH ?? 0),
        backgroundColor: "rgba(0, 200, 100, 0.8)",
        stack: "Energie",
      },
      {
        type: "bar" as const,
        label: "Einspeisung (Solar exportiert)",
        data: solarData.map((item) => item.exportedWH ?? 0),
        backgroundColor: "rgba(0, 150, 255, 0.8)",
        stack: "Energie",
      },
      {
        type: "bar" as const,
        label: "Netzbezug (vom Netz)",
        data: solarData.map((item) => {
          const imported = (item.consumedWH ?? 0) - (item.selfUsedWH ?? 0);
          return imported > 0 ? imported : 0;
        }),
        backgroundColor: "rgba(255, 100, 100, 0.8)",
        stack: "Energie",
      },
      {
        type: "line" as const,
        label: "Solarertrag (gesamt)",
        data: solarData.map((item) => item.yieldDay ?? 0),
        borderColor: "gold",
        borderWidth: 2,
        fill: false,
        tension: 0.3,
        pointRadius: 3,
        yAxisID: "y",
      },
    ],
  };

  ChartJS.register(...registerables);

  const showEntryCountInputChanged = (count: number) => {
    showEntryCount =
      count > 0 ? (count <= historyData.length ? count : 31) : 31;
    updateData();
  };

  return (
    <div className={styles.solargraphpage}>
      <div className={styles.selectEntryCountWrapper}>
        <div className={styles.entryCountHeadline}>Zeige letzte:</div>
        <div className={styles.entryCountButtons}>
          <div
            className={styles.showEntryCountButton}
            onClick={() => showEntryCountInputChanged(7)}
          >
            Woche
          </div>
          <div
            className={styles.showEntryCountButton}
            onClick={() => showEntryCountInputChanged(31)}
          >
            Monat
          </div>
          <div
            className={styles.showEntryCountButton}
            onClick={() => showEntryCountInputChanged(93)}
          >
            3 Monate
          </div>
          <div
            className={styles.showEntryCountButton}
            onClick={() => showEntryCountInputChanged(186)}
          >
            6 Monate
          </div>
          <div
            className={styles.showEntryCountButton}
            onClick={() => showEntryCountInputChanged(365)}
          >
            Jahr
          </div>
          <div
            className={styles.showEntryCountButton}
            onClick={() => showEntryCountInputChanged(historyData.length)}
          >
            Alle
          </div>
        </div>
      </div>
      <div className={styles.chartswrapper}>
        <div className={styles.charts}>
          <div className={styles.chartwrapper}>
            <h2>Gesamtertrag (KWh)</h2>
            <Line
              className={styles.chartStyle}
              data={lineChartData}
              options={{ locale: locale }}
            />
          </div>

          <div className={styles.chartwrapper}>
            <h2>Hausverbrauch</h2>
            <Chart
              options={homePowerUsageChartOptions}
              type={"bar"}
              className={styles.chartStyle}
              data={homePowerUsageChartData}
            />
          </div>
          {yearDates.length > 1 && (
            <>
              <div className={styles.chartwrapper}>
                <h2>Vergleich Jährlicher Ertrag (KWh)</h2>
                <Chart
                  type={"line"}
                  className={styles.chartStyle}
                  data={yearlyData}
                  options={{ locale: locale }}
                />
              </div>
              <div className={styles.chartwrapper}>
                <h2>Jährlich Vergleich letzte 30 Tage (KWh)</h2>
                <Chart
                  type={"line"}
                  className={styles.chartStyle}
                  data={smallRangeYearYield}
                  options={{ locale: locale }}
                />
              </div>
            </>
          )}
          <div className={styles.chartwrapper}>
            <h2>Tagesertrag (Wh)</h2>
            <Chart
              type={"bar"}
              className={styles.chartStyle}
              data={dailyYieldData}
              options={{ locale: locale }}
            />
          </div>

          <div className={styles.chartwrapper}>
            <h2>Ertrag Peak (W)</h2>
            <Chart
              type={"bar"}
              className={styles.chartStyle}
              data={lineYieldDayData}
              options={{ locale: locale }}
            />
          </div>

          <div className={styles.chartwrapper}>
            <h2>Durchschnitt täglicher Ertrag pro Monat (Watt)</h2>
            <Chart
              type={"bar"}
              className={styles.chartStyle}
              data={monthlyAverageYieldData}
              options={{ locale: locale }}
            />
          </div>
          <div className={styles.chartwrapper}>
            <h2>Gesamter Monatlicher Ertrag (KWh)</h2>
            <Chart
              type={"bar"}
              className={styles.chartStyle}
              data={monthlyTotalYieldData}
              options={{ locale: locale }}
            />
          </div>
          <div className={styles.chartwrapper}>
            <h2>Monatlicher höchster Ertrag (Wh)</h2>
            <Chart
              type={"bar"}
              className={styles.chartStyle}
              data={monthlyPeakData}
              options={{ locale: locale }}
            />
          </div>
          <div className={styles.chartwrapper}>
            <h2>Monatlicher höchster Peak (W)</h2>
            <Chart
              type={"bar"}
              className={styles.chartStyle}
              data={monthlyLivePeakData}
              options={{ locale: locale }}
            />
          </div>
          <div className={styles.chartwrapper}>
            <h2>Temperatur Peak (C°)</h2>
            <Chart
              type={"bar"}
              className={styles.chartStyle}
              data={temperatureData}
              options={{ locale: locale }}
            />
          </div>

          <div className={styles.chartwrapper}>
            <h2>Jährliche Statistiken</h2>
            <Chart
              type={"bar"}
              className={styles.chartStyle}
              data={yearData}
              options={yearOptions}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
