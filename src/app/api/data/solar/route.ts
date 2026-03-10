import { NextRequest, NextResponse } from "next/server";
import { LiveDataStore } from "@/types/LiveDataStore";
import { emitLiveData } from "@/services/socketEmitter";

const liveDataStore: LiveDataStore = {};

export async function POST(request: NextRequest) {
  try {
    if (request.headers.get("apikey") != process.env.UPLOAD_API_KEY) {
      return NextResponse.json({ message: "Invalid API key" }, { status: 503 });
    }

    const data = await request.json();
    liveDataStore.data = data;

    emitLiveData(data);

    return NextResponse.json(
      { message: "Data stored successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error storing live data:", error);
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

    return NextResponse.json(liveDataStore.data, { status: 200 });
  } catch (error) {
    console.error("Error retrieving live data:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export { liveDataStore };
