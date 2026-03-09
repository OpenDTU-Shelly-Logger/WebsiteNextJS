interface Emeter {
  power: number;
  pf: number;
  current: number;
  voltage: number;
  is_valid: boolean;
  total: number;
  total_returned: number;
}

interface PowerData {
  total_power: number;
  emeters: Emeter[];
}

export type { PowerData, Emeter };
