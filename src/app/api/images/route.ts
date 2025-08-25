/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { v4 as uuid } from "uuid";

const uploadDir = path.join(process.cwd(), "public/uploads");
const dataFile = path.join(process.cwd(), "public/uploads/images-data.json");

// Ensure directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

function readImagesData(): any[] {
  try {
    if (!fs.existsSync(dataFile)) {
      fs.writeFileSync(dataFile, JSON.stringify([]));
      return [];
    }
    const data = fs.readFileSync(dataFile, "utf8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function writeImagesData(data: any[]) {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
}

export async function GET(req: NextRequest) {
	const data = readImagesData();
	return NextResponse.json(data);
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
		id: existing.length + 1,
		source: fileUrl,
	};

	const updated = [...existing, newImage];
	writeImagesData(updated);

	return NextResponse.json(newImage, { status: 201 });
}

export async function DELETE(req: NextRequest) {
	try {
		const { searchParams } = new URL(req.url);
		const id = Number(searchParams.get("id"));

		if (isNaN(id)) {
			return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
		}

		const data = readImagesData();
		const imageToDelete = data.find((img: any) => img.id === id);
		if (!imageToDelete) {
			return NextResponse.json({ error: "Image not found" }, { status: 404 });
		}

		// Remove from file system
		const imagePath = path.join(uploadDir, path.basename(imageToDelete.source));
		if (fs.existsSync(imagePath)) {
			fs.unlinkSync(imagePath);
		}

		// Update JSON file
		const updatedData = data.filter((img: any) => img.id !== id);
		writeImagesData(updatedData);

		return NextResponse.json({ message: "Image deleted" });
	} catch (err) {
		console.error(err);
		return NextResponse.json(
			{ error: "Failed to delete image" },
			{ status: 500 }
		);
	}
}
