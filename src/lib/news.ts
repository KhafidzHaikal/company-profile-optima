import fs from 'fs';
import path from 'path';

export type NewsItem = {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  image: string;
  createdAt: string;
  updatedAt: string;
};

export function getNewsData(): NewsItem[] {
  try {
    const filePath = path.join(process.cwd(), 'src/app/api/data/news.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch {
    return [];
  }
}

export function getLatestNews(count: number = 3): NewsItem[] {
  const news = getNewsData();
  return news
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, count);
}

export function getNewsById(id: number): NewsItem | null {
  const news = getNewsData();
  return news.find(item => item.id === id) || null;
}