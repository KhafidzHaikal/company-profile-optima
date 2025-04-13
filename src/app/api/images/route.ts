/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { v4 as uuid } from "uuid";

// Where to save uploaded files
const uploadDir = path.join(process.cwd(), "public/uploads");
const dataFile = path.join(process.cwd(), "src/app/api/data/images.json");

// Ensure directory exists
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

export async function GET(req: NextRequest) {
	try {
		const data = fs.existsSync(dataFile)
			? JSON.parse(fs.readFileSync(dataFile, "utf-8"))
			: [];

		return NextResponse.json(data);
	} catch (error) {
		return NextResponse.json(
			{ error: "Failed to read image data" },
			{ status: 500 }
		);
	}
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

	// Update metadata JSON
	const existing = fs.existsSync(dataFile)
		? JSON.parse(fs.readFileSync(dataFile, "utf8"))
		: [];

	const newImage = {
		id: existing.length + 1,
		source: fileUrl,
	};

	const updated = [...existing, newImage];
	fs.writeFileSync(dataFile, JSON.stringify(updated, null, 2));

	return NextResponse.json(newImage, { status: 201 });
}

export async function DELETE(req: NextRequest) {
	try {
		const { searchParams } = new URL(req.url);
		const id = Number(searchParams.get("id"));

		if (isNaN(id)) {
			return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
		}

		// Load current data
		const fileData = fs.readFileSync(dataFile, "utf-8");
		let data = JSON.parse(fileData);

		// Find the image
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
		data = data.filter((img: any) => img.id !== id);
		fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));

		return NextResponse.json({ message: "Image deleted" });
	} catch (err) {
		console.error(err);
		return NextResponse.json(
			{ error: "Failed to delete image" },
			{ status: 500 }
		);
	}
}
