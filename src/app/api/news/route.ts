import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { v4 as uuid } from "uuid";

interface NewsData {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

const articlesDir = path.join(process.cwd(), "public/articles");
const dataFile = path.join(process.cwd(), "src/app/api/data/news.json");

if (!fs.existsSync(articlesDir)) {
  fs.mkdirSync(articlesDir, { recursive: true });
}

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
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const excerpt = formData.get("excerpt") as string;
    const file = formData.get("image") as File;

    if (!title || !content || !excerpt) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    let imageUrl = "";
    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const fileExt = file.name.split(".").pop();
      const fileName = `${uuid()}.${fileExt}`;
      const filePath = path.join(articlesDir, fileName);
      imageUrl = `/articles/${fileName}`;
      fs.writeFileSync(filePath, buffer);
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
  } catch {
    return NextResponse.json({ error: "Failed to create news" }, { status: 500 });
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