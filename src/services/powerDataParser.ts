import { PowerData } from "@/types/Emeter";

async function loadPowerData(): Promise<PowerData | null> {
  const jsonData = await fetch("/data/livepower.json").then((res) =>
    res.json(),
  );
  return jsonData;
}

export { loadPowerData };
