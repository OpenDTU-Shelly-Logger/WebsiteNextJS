import sqlite3 from "sqlite3";
import { NextResponse } from "next/server";
import { open } from "sqlite";
import { DailySolarData } from "@/types/SolarHistory";
import { DateItem } from "../../../../types/DateItem";

export async function GET() {
  try {
    const db = await open({
      filename: "./data/solar_data.db",
      driver: sqlite3.Database,
    });

    const rows = await db.all(`
      SELECT 
          ds.date, 
          ds.total_solar_kwh, 
          ds.daily_solar_wh, 
          ds.peak_solar_watt, 
          ds.peak_time, 
          ds.peak_temp_inverter, 
          ds.peak_temp_time,
          dp.solar_used_in_home_wh,
          dp.solar_exported_to_grid_wh,
          dp.total_power_consumed_wh,
          dp.self_used_percent,
          dp.autarky_percent
      FROM daily_solar ds
      LEFT JOIN daily_power_usage dp ON ds.date = dp.date
      ORDER BY ds.date ASC
    `);

    await db.close();

    const makeDate = (dateStr: string): DateItem => {
      const splitted = dateStr.split("-");
      return {
        day: parseInt(splitted[2]),
        month: parseInt(splitted[1]),
        year: parseInt(splitted[0]),
      };
    };

    // Map rows to the DailySolarData struct
    const formattedData: DailySolarData[] = rows.map((row) => ({
      date: makeDate(row.date),
      yieldTotal: row.total_solar_kwh,
      yieldDay: row.daily_solar_wh,
      highestWatt: row.peak_solar_watt,
      timeHighestWatt: row.peak_time,
      temperature: row.peak_temp_inverter,
      timeHighestTemp: row.peak_temp_time,
      selfUsedWH: row.solar_used_in_home_wh,
      exportedWH: row.solar_exported_to_grid_wh,
      consumedWH: row.total_power_consumed_wh,
      selfConsumptionRatio: row.self_used_percent,
      autarkyRatio: row.autarky_percent,
    }));

    return NextResponse.json({ items: formattedData });
  } catch (error) {
    console.error("Failed to read database:", error);
    return NextResponse.json({ items: [] }, { status: 500 });
  }
}
