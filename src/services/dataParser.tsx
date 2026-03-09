import { SolarData } from "@/types/OpenDTUData";
import { DailySolarData } from "@/types/SolarHistory";

async function loadAllData(): Promise<{ items: DailySolarData[] }> {
  try {
    const response = await fetch("/api/data/history");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to load historical solar data:", error);
    return { items: [] };
  }
}

// Function to Load JSON Data
async function loadData(): Promise<SolarData> {
  const response = await fetch("/api/data/solar");

  const data = await response.json();
  return data as SolarData;
}

function getAllSolarItems(data: string): { items: DailySolarData[] } {
  const items: DailySolarData[] = [];
  const lines: string[] = data
    .split("\n")
    .filter((element) => element.trim() !== "");

  for (let i = 0; i < lines.length; i++) {
    const separated = lines[i].split("|");

    const dateSplit = separated[0].split("-");

    const item: DailySolarData = {
      date: {
        day: parseInt(dateSplit[2]),
        month: parseInt(dateSplit[1]),
        year: parseInt(dateSplit[0]),
      },
      yieldTotal: parseFloat(separated[1]),
      yieldDay: parseFloat(separated[2]),
      highestWatt: parseFloat(separated[3]),
      timeHighestWatt: separated[4],
      temperature: parseFloat(separated[5]),
      timeHighestTemp: separated[6],
      selfUsedWH: separated.length == 12 ? parseFloat(separated[7]) : undefined,
      exportedWH: separated.length == 12 ? parseFloat(separated[8]) : undefined,
      consumedWH: separated.length == 12 ? parseFloat(separated[9]) : undefined,
      selfConsumptionRatio:
        separated.length == 12 ? parseFloat(separated[10]) : undefined,
      autarkyRatio:
        separated.length == 12 ? parseFloat(separated[11]) : undefined,
    };
    items.push(item);
  }
  return { items: items };
}

export { loadAllData, loadData, getAllSolarItems };
