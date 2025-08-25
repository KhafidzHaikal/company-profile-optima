import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { v4 as uuid } from "uuid";

interface ImageData {
  id: number;
  source: string;
}

const uploadDir = path.join(process.cwd(), "public/uploads");
const dataFile = path.join(process.cwd(), "src/app/api/data/images.json");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

function readImagesData() {
  try {
    const data = fs.readFileSync(dataFile, "utf8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function writeImagesData(data: ImageData[]) {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
}

export async function GET() {
  const images = readImagesData();
  return NextResponse.json(images);
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const fileExt = file.name.split(".").pop();
  const fileName = `${uuid()}.${fileExt}`;
  const filePath = path.join(uploadDir, fileName);
  const fileUrl = `/uploads/${fileName}`;

  fs.writeFileSync(filePath, buffer);

  const existing = readImagesData();
  const newImage = {
    id: existing.length > 0 ? Math.max(...existing.map((img: ImageData) => img.id)) + 1 : 1,
    source: fileUrl,
  };

  const updated = [...existing, newImage];
  writeImagesData(updated);

  return NextResponse.json(newImage, { status: 201 });
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
      'Access-Control-Max-Age': '86400',
    },
  });
}