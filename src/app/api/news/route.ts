import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import cloudinary from "@/lib/cloudinary";
import { v4 as uuidv4 } from 'uuid';

interface NewsData {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  image: string;
  cloudinary_id?: string;
  createdAt: string;
  updatedAt: string;
}

const dataFile = path.join(process.cwd(), "src/app/api/data/news.json");
const isVercel = process.env.VERCEL === '1';

// In-memory storage for Vercel
let memoryNewsData: NewsData[] = [];

function readNewsData(): NewsData[] {
  if (isVercel) {
    // On Vercel, use in-memory storage with fallback to default data
    if (memoryNewsData.length === 0) {
      memoryNewsData = [
        {
          id: 1,
          title: "Abu Dhabi Cultural Tour Now Available",
          content: "Experience the rich culture and heritage of Abu Dhabi with our specially curated cultural tour package.",
          excerpt: "Discover Abu Dhabi's rich culture and heritage with our new cultural tour package.",
          image: "/articles/f2e0c84e-7086-4575-b2fd-239fc5a90c87.png",
          createdAt: "2024-01-10T14:30:00Z",
          updatedAt: "2024-01-10T14:30:00Z"
        }
      ];
    }
    return memoryNewsData;
  } else {
    // Local development - use file system
    try {
      const data = fs.readFileSync(dataFile, "utf8");
      return JSON.parse(data);
    } catch {
      return [];
    }
  }
}

function writeNewsData(data: NewsData[]) {
  if (isVercel) {
    // On Vercel, store in memory
    memoryNewsData = data;
  } else {
    // Local development - write to file
    try {
      fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Failed to write news data:', error);
    }
  }
}

export async function GET() {
  const news = readNewsData();
  return NextResponse.json(news);
}

export async function POST(req: NextRequest) {
  try {
    // Validate Cloudinary configuration
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      console.error('Missing Cloudinary environment variables');
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    const contentType = req.headers.get('content-type') || '';
    let title: string, content: string, excerpt: string, imageUrl: string;
    
    if (contentType.includes('application/json')) {
      // Handle JSON data with image URL from news-images API
      const body = await req.json();
      title = body.title;
      content = body.content;
      excerpt = body.excerpt;
      imageUrl = body.image || '';
    } else {
      // Handle form data with file upload
      const formData = await req.formData();
      title = formData.get("title") as string;
      content = formData.get("content") as string;
      excerpt = formData.get("excerpt") as string;
      const file = formData.get("image") as File;
      
      imageUrl = "";
      if (file && file instanceof File && file.size > 0) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64 = buffer.toString('base64');
        const dataURI = `data:${file.type};base64,${base64}`;
        
        const uuid = uuidv4();
        const result = await cloudinary.uploader.upload(dataURI, {
          folder: 'optima-news',
          public_id: uuid,
          resource_type: 'auto'
        });
        
        imageUrl = result.secure_url;
      }
    }

    if (!title || !content || !excerpt) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const news = readNewsData();
    const newNews = {
      id: news.length > 0 ? Math.max(...news.map((n: NewsData) => n.id)) + 1 : 1,
      title,
      content,
      excerpt,
      image: imageUrl,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    news.push(newNews);
    writeNewsData(news);

    return NextResponse.json(newNews, { status: 201 });
  } catch (error) {
    console.error('News creation error:', error);
    return NextResponse.json({ error: "Failed to create news" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const news = readNewsData();
    const newsIndex = news.findIndex((n: NewsData) => n.id === parseInt(id));
    
    if (newsIndex === -1) {
      return NextResponse.json({ error: "News not found" }, { status: 404 });
    }

    const newsItem = news[newsIndex];
    
    // Delete from Cloudinary if image exists
    if (newsItem.image && newsItem.image.includes('cloudinary.com')) {
      try {
        const urlParts = newsItem.image.split('/');
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

    news.splice(newsIndex, 1);
    writeNewsData(news);

    return NextResponse.json({ message: "News deleted successfully" });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ error: "Failed to delete news" }, { status: 500 });
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