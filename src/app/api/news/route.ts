import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "src/app/api/data/news.json");
    const fileContents = fs.readFileSync(filePath, "utf8");
    const news = JSON.parse(fileContents);
    
    return NextResponse.json(news);
  } catch (error) {
    console.error("Error reading news:", error);
    return NextResponse.json({ error: "Failed to load news" }, { status: 500 });
  }
}