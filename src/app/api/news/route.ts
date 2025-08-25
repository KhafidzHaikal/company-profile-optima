import { NextRequest, NextResponse } from "next/server";

type NewsItem = {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  image: string;
  createdAt: string;
  updatedAt: string;
};

// In-memory storage (will reset on deployment)
// For production, use a database like Vercel Postgres, MongoDB, etc.
let newsData: NewsItem[] = [];

function readNewsData(): NewsItem[] {
  return newsData;
}

function writeNewsData(data: NewsItem[]) {
  newsData = data;
}

export async function GET() {
  const news = readNewsData();
  return NextResponse.json(news);
}

export async function POST(request: NextRequest) {
  try {
    const { title, content, excerpt, image } = await request.json();
    
    if (!title || !content || !excerpt) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const news = readNewsData();
    const newId = news.length > 0 ? Math.max(...news.map(n => n.id)) + 1 : 1;
    
    const newNews: NewsItem = {
      id: newId,
      title,
      content,
      excerpt,
      image: image || "",
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

export async function PUT(request: NextRequest) {
  try {
    const { id, title, content, excerpt, image } = await request.json();
    
    if (!id || !title || !content || !excerpt) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const news = readNewsData();
    const index = news.findIndex(n => n.id === id);
    
    if (index === -1) {
      return NextResponse.json({ error: "News not found" }, { status: 404 });
    }

    news[index] = {
      ...news[index],
      title,
      content,
      excerpt,
      image: image || news[index].image,
      updatedAt: new Date().toISOString(),
    };

    writeNewsData(news);
    return NextResponse.json(news[index]);
  } catch {
    return NextResponse.json({ error: "Failed to update news" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get("id") || "");
    
    if (!id) {
      return NextResponse.json({ error: "Missing news ID" }, { status: 400 });
    }

    const news = readNewsData();
    const filteredNews = news.filter(n => n.id !== id);
    
    if (news.length === filteredNews.length) {
      return NextResponse.json({ error: "News not found" }, { status: 404 });
    }

    writeNewsData(filteredNews);
    return NextResponse.json({ message: "News deleted successfully" });
  } catch {
    return NextResponse.json({ error: "Failed to delete news" }, { status: 500 });
  }
}