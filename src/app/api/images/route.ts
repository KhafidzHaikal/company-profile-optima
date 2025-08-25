/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";

// In-memory storage (will reset on deployment)
// For production, use cloud storage like Cloudinary, AWS S3, etc.
let imagesData: any[] = [];

export async function GET(req: NextRequest) {
	return NextResponse.json(imagesData);
}

export async function POST(req: NextRequest) {
	const formData = await req.formData();
	const file = formData.get("file") as File;

	if (!file) {
		return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
	}

	// For demo purposes, use a placeholder image
	// In production, upload to cloud storage (Cloudinary, AWS S3, etc.)
	const newImage = {
		id: imagesData.length + 1,
		source: `https://picsum.photos/400/300?random=${Date.now()}`,
	};

	imagesData.push(newImage);

	return NextResponse.json(newImage, { status: 201 });
}

export async function DELETE(req: NextRequest) {
	try {
		const { searchParams } = new URL(req.url);
		const id = Number(searchParams.get("id"));

		if (isNaN(id)) {
			return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
		}

		// Find the image
		const imageToDelete = imagesData.find((img: any) => img.id === id);
		if (!imageToDelete) {
			return NextResponse.json({ error: "Image not found" }, { status: 404 });
		}

		// Remove from in-memory storage
		imagesData = imagesData.filter((img: any) => img.id !== id);

		return NextResponse.json({ message: "Image deleted" });
	} catch (err) {
		console.error(err);
		return NextResponse.json(
			{ error: "Failed to delete image" },
			{ status: 500 }
		);
	}
}
