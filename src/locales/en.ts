const en = {
  // Page titles
  overview: "Overview",
  solar: "Solar",
  consumption: "Consumption",
  solarHistory: "Solar History",
  settings: "Settings",

  // Section headers
  allTime: "Total",
  solarPanels: "Solar Panels",
  inverter: "Inverter",
  phases: "Phases",
  cellYield: "Cell Yield",

  // Overview / home values
  yieldToday: "Today's Yield",
  totalYield: "Total Solar Yield",
  peak: "Peak",
  currentPower: "Current Power",
  temperature: "Temperature",
  houseConsumption: "House Consumption",
  gridFeedIn: "Grid Feed-in",
  usedSolarPower: "Used Solar Power",
  selfConsumptionRate: "Self-Consumption Rate",
  autarkyRate: "Autarky Rate",
  totalPowerConsumption: "Total Power Consumption",
  totalSolarUsed: "Total Solar Used",
  totalGridFeedIn: "Total Grid Feed-in",

  // Power usage
  currentFeedIn: "Current Feed-in",
  solarCurrent: "Solar Current",
  phase: "Phase",

  // Solar panel / inverter detail keys
  power: "Power",
  voltage: "Voltage",
  current: "Current",
  dailyYield: "Daily Yield",
  irradiation: "Irradiation",
  frequency: "Frequency",
  powerFactor: "Power Factor",
  reactivePower: "Reactive Power",
  efficiency: "Efficiency",

  // Solar table columns
  date: "Date",
  total: "Total",
  today: "Today",
  temp: "Temp",

  // Solar table modal
  dataFrom: "Data from",
  yield: "Yield",
  highestTemperature: "Highest Temperature",

  // Settings
  serverUrl: "Server URL",
  enterBaseUrl: "Enter the base URL for the solar data server.",
  save: "Save",
  resetToDefault: "Reset to Default",
  about: "About",
  language: "Language",

  // Solar layout config
  solarLayout: "Solar Panel Layout",
  compassRotation: "Compass Rotation",
  addPanel: "Add Panel",
  position: "Position",
  size: "Size",
  panelIndex: "DC Input",
  removePanel: "Remove",
  exportLayout: "Export Layout",
  importLayout: "Import Layout",
  layoutCode: "Paste layout code here",
  applyLayout: "Apply",
  invalidLayoutCode: "Invalid layout code — please check and try again.",

  // Navigation
  history: "History",
  table: "Table",
  openDTU: "OpenDTU",

  // Common
  noData: "No Data",
  property: "Property",
  value: "Value",
  unit: "Unit",
  seconds: "s",
  lastUpdate: "Last Update",
  reachable: "Reachable",
  wattPeak: "Watt Peak",
  currentConsumption: "Current Consumption",
  dcPower: "DC Power",
  yes: "Yes",
  no: "No",

  // Graph - time range filters
  showLast: "Show last:",
  week: "Week",
  month: "Month",
  threeMonths: "3 Months",
  sixMonths: "6 Months",
  year: "Year",
  all: "All",

  // Graph - chart titles
  totalYieldKwh: "Total Yield (kWh)",
  yearlyComparisonKwh: "Yearly Comparison (kWh)",
  yearlyComparisonLast30Days: "Yearly Comparison – Last 30 Days (kWh)",
  dailyYieldWh: "Daily Yield (Wh)",
  peakYieldW: "Peak Yield (W)",
  avgDailyYieldPerMonth: "Avg. Daily Yield per Month (W)",
  totalMonthlyYield: "Total Monthly Yield (kWh)",
  monthlyHighestYield: "Monthly Highest Yield (Wh)",
  monthlyHighestPeak: "Monthly Highest Peak (W)",
  temperaturePeakC: "Temperature Peak (°C)",
  yearlyStatistics: "Yearly Statistics",
  annualData: "Annual Data",
  energyInWh: "Energy in Wh",

  // Graph - dataset labels
  averageWh: "Average (Wh)",
  weeklyAverageWh: "Weekly Average (Wh)",
  trendLine: "Trend Line",
  sma31Days: "SMA (31 days)",
  yieldPeak: "Yield Peak",
  selfConsumptionLabel: "Self Consumption",
  gridExportLabel: "Grid Export (Solar)",
  gridImportLabel: "Grid Import",
  solarYieldTotalLabel: "Solar Yield (total)",
  avgDailyYieldWatt: "Avg. Daily Yield (W)",
  highestYieldWatt: "Highest Yield (W)",
  avgTemperatureC: "Avg. Temperature (°C)",
  avgPeakWatt: "Avg. Peak (W)",
  highestPeakWatt: "Highest Peak (W)",

  // Month names
  january: "January",
  february: "February",
  march: "March",
  april: "April",
  may: "May",
  june: "June",
  july: "July",
  august: "August",
  september: "September",
  october: "October",
  november: "November",
  december: "December",

  direction_north: "N",
  direction_south: "S",
  direction_east: "E",
  direction_west: "W",
};

export default en;
export type Translations = typeof en;
