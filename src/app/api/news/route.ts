import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import cloudinary from "@/lib/cloudinary";

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

function readNewsData() {
  try {
    const data = fs.readFileSync(dataFile, "utf8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function writeNewsData(data: NewsData[]) {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
}

export async function GET() {
  const news = readNewsData();
  return NextResponse.json(news);
}

export async function POST(req: NextRequest) {
  try {
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
        
        const result = await cloudinary.uploader.upload(dataURI, {
          folder: 'optima-news',
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