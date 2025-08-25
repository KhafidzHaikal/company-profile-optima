import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import cloudinary from "@/lib/cloudinary";
import { v4 as uuidv4 } from 'uuid';

interface ImageData {
  id: number;
  source: string;
  cloudinary_id?: string;
}

// In-memory storage for Vercel
let memoryImagesData: ImageData[] = [
  {
    id: 2,
    source: "/uploads/c36754bb-f3fb-47b1-9a5c-ae5ad23c15a1.png"
  },
  {
    id: 3,
    source: "/uploads/965c0dd5-a0bd-44d2-8408-45dd7ff4f1c5.png"
  },
  {
    id: 4,
    source: "/uploads/60188c25-819a-4a8d-b189-af132f7c89ef.png"
  },
  {
    id: 5,
    source: "/uploads/79067bfd-c26c-44ed-93c3-dc202ea72864.png"
  },
  {
    id: 6,
    source: "/uploads/def0e730-5695-4cb6-a719-2c893f9ac7ad.png"
  },
  {
    id: 7,
    source: "/uploads/b7ab53de-eafe-4c66-a15f-2869dd3d1008.png"
  },
  {
    id: 8,
    source: "/uploads/c60c910c-f248-400d-acd8-77810f5f76f5.png"
  },
  {
    id: 9,
    source: "/uploads/1833a08e-1e03-4b57-b237-795b0b2cd9a5.png"
  },
  {
    id: 10,
    source: "/uploads/7fcff089-924b-4a19-81c7-371c22af9dfc.png"
  },
  {
    id: 11,
    source: "/uploads/38605c26-d7f7-4203-8b37-3f59a2808329.png"
  },
  {
    id: 12,
    source: "/uploads/cbbb4588-1e43-4ad6-a0da-ce1c628a9920.png"
  },
  {
    id: 13,
    source: "https://res.cloudinary.com/dnj32ehjo/image/upload/v1756125587/optima-gallery/ildakcftq3xrn0ezocp8.png",
    cloudinary_id: "optima-gallery/ildakcftq3xrn0ezocp8"
  }
];

const isVercel = process.env.VERCEL === '1';

async function readImagesData() {
  if (isVercel) {
    return memoryImagesData;
  }
  try {
    const data = await fs.readFile(process.cwd() + '/src/app/api/data/images.json', 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeImagesData(data: ImageData[]) {
  if (isVercel) {
    memoryImagesData = data;
    return;
  }
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
    // Validate Cloudinary configuration
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      console.error('Missing Cloudinary environment variables');
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

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