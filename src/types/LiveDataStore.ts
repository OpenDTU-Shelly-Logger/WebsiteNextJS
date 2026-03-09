import { PowerData } from "./Emeter";
import { SolarData } from "./OpenDTUData";

interface LiveDataStore {
  data?: SolarData;
  power?: PowerData;
}

export type { LiveDataStore };
