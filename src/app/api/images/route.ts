import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import cloudinary from "@/lib/cloudinary";
import { v4 as uuidv4 } from 'uuid';

interface ImageData {
  id: number;
  source: string;
  cloudinary_id?: string;
}

async function readImagesData() {
  try {
    const data = await fs.readFile(process.cwd() + '/src/app/api/data/images.json', 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeImagesData(data: ImageData[]) {
  try {
    await fs.writeFile(process.cwd() + '/src/app/api/data/images.json', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Write error:', error);
  }
}

export async function GET() {
  const images = await readImagesData();
  return NextResponse.json(images);
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString('base64');
    const dataURI = `data:${file.type};base64,${base64}`;

    const uuid = uuidv4();
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: 'optima-gallery',
      public_id: uuid,
      resource_type: 'auto'
    });

    const existing = await readImagesData();
    const newImage = {
      id: existing.length > 0 ? Math.max(...existing.map((img: ImageData) => img.id)) + 1 : 1,
      source: result.secure_url,
      cloudinary_id: result.public_id
    };

    const updated = [...existing, newImage];
    await writeImagesData(updated);

    return NextResponse.json(newImage, { status: 201 });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const images = await readImagesData();
    const imageIndex = images.findIndex((img: ImageData) => img.id === parseInt(id));
    
    if (imageIndex === -1) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    const image = images[imageIndex];
    
    // Delete from Cloudinary
    if (image.source && image.source.includes('cloudinary.com')) {
      try {
        const urlParts = image.source.split('/');
        const uploadIndex = urlParts.findIndex((part: string) => part === 'upload');
        if (uploadIndex !== -1) {
          const pathAfterUpload = urlParts.slice(uploadIndex + 2).join('/');
          const publicId = pathAfterUpload.replace(/\.[^/.]+$/, '');
          console.log('Deleting from Cloudinary:', publicId);
          await cloudinary.uploader.destroy(publicId);
        }
      } catch (cloudinaryError) {
        console.error('Cloudinary delete error:', cloudinaryError);
      }
    }

    images.splice(imageIndex, 1);
    await writeImagesData(images);

    return NextResponse.json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ error: "Failed to delete image" }, { status: 500 });
  }
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