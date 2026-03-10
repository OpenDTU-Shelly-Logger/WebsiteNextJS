import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { Buffer } from "buffer";
import { emitAllData } from "@/services/socketEmitter";

export async function POST(request: NextRequest) {
  try {
    if (request.headers.get("apikey") !== process.env.SOLAR_API_KEY) {
      return NextResponse.json({ message: "Invalid API key" }, { status: 503 });
    }

    const contentType = request.headers.get("content-type") || "";
    let buffer: Buffer;

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const file = formData.get("file");
      if (!file || typeof file === "string") {
        return NextResponse.json(
          { message: "No file uploaded" },
          { status: 400 },
        );
      }
      buffer = Buffer.from(await file.arrayBuffer());
    } else {
      buffer = Buffer.from(await request.arrayBuffer());
    }

    await writeFile("data/solar_data.db", buffer);

    emitAllData(buffer);

    return NextResponse.json(
      { message: "Database file stored successfully" },
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
