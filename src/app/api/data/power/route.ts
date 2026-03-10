import { NextRequest, NextResponse } from "next/server";
import { liveDataStore } from "../solar/route";
import { emitPowerData } from "@/services/socketEmitter";

export async function POST(request: NextRequest) {
  try {
    if (request.headers.get("apikey") != process.env.POWER_API_KEY) {
      return NextResponse.json({ message: "Invalid API key" }, { status: 503 });
    }

    const data = await request.json();
    liveDataStore.power = data;

    emitPowerData(data);

    return NextResponse.json(
      { message: "Data stored successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error writing file:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    if (!liveDataStore.data) {
      return NextResponse.json(
        { message: "No live data available" },
        { status: 404 },
      );
    }

    return NextResponse.json(liveDataStore.power, { status: 200 });
  } catch (error) {
    console.error("Error retrieving live data:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
