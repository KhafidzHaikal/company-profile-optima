"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

type NewsItem = {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  image: string;
  createdAt: string;
  updatedAt: string;
};

export default function NewsPage() {
  const t = useTranslations();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch("/api/news");
        const data = await res.json();
        setNews(data);
      } catch (error) {
        console.error("Failed to fetch news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="mt-12 lg:mt-0 flex-1">
          <Navbar />
          <section className="py-12 mx-12 lg:mx-32 lg:mt-12">
            <div className="text-center py-8">Loading news...</div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="mt-12 lg:mt-0 flex-1">
        <Navbar />
        <section className="py-12 mx-12 lg:mx-32 lg:mt-12">
          <p className="text-2xl font-bold text-yellow-400">{t("news")}</p>
          <p className="text-md mt-8 mb-12">{t("news-subtitle")}</p>

          {news.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No news articles available.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.map((item) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  {item.image && (
                    <div className="relative h-48 w-full">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="line-clamp-2">{item.title}</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                      {item.excerpt}
                    </p>
                    <Link
                      href={`/news/${item.id}`}
                      className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                    >
                      {t("read-more")} →
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}