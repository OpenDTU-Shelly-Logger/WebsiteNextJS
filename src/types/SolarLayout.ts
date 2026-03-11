export type CellPosition = "N" | "S" | "E" | "W";
export type CellSize = "S" | "M" | "L";

export interface CellConfig {
  dcIndex: number;
  position: CellPosition;
  size: CellSize;
}

export interface SolarLayoutConfig {
  cells: CellConfig[];
  compassRotation: number; // degrees
}

export const CELL_SIZE_PX: Record<CellSize, number> = {
  S: 80,
  M: 110,
  L: 140,
};

export const DEFAULT_SOLAR_LAYOUT: SolarLayoutConfig = {
  compassRotation: 20,
  cells: [
    { dcIndex: 0, position: "S", size: "M" },
    { dcIndex: 1, position: "S", size: "M" },
    { dcIndex: 2, position: "E", size: "M" },
    { dcIndex: 3, position: "W", size: "L" },
  ],
};

/**
 * Encodes layout as a compact, human-readable string.
 * Format: "compassRotation|dcIndex:position:size,..."
 * Example: "20|0:S:M,1:S:M,2:E:M,3:W:L"
 */
export function encodeSolarLayout(config: SolarLayoutConfig): string {
  const cellStr = config.cells
    .map((c) => `${c.dcIndex}:${c.position}:${c.size}`)
    .join(",");
  return `${Math.round(config.compassRotation)}|${cellStr}`;
}

/**
 * Decodes a layout string produced by encodeSolarLayout.
 * Returns null if the string is invalid.
 */
export function decodeSolarLayout(str: string): SolarLayoutConfig | null {
  try {
    const pipeIdx = str.indexOf("|");
    if (pipeIdx === -1) return null;
    const rotStr = str.slice(0, pipeIdx);
    const cellsStr = str.slice(pipeIdx + 1);
    const compassRotation = parseFloat(rotStr);
    if (isNaN(compassRotation)) return null;

    const cells: CellConfig[] = cellsStr
      ? cellsStr
          .split(",")
          .filter(Boolean)
          .map((part) => {
            const [idxStr, pos, sz] = part.split(":");
            const dcIndex = parseInt(idxStr, 10);
            if (
              isNaN(dcIndex) ||
              dcIndex < 0 ||
              dcIndex > 7 ||
              !["N", "S", "E", "W"].includes(pos) ||
              !["S", "M", "L"].includes(sz)
            )
              throw new Error("invalid");
            return {
              dcIndex,
              position: pos as CellPosition,
              size: sz as CellSize,
            };
          })
      : [];

    return { compassRotation, cells };
  } catch {
    return null;
  }
}
