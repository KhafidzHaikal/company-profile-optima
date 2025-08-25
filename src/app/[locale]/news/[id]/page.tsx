import { setRequestLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { getNewsById } from "@/lib/news";

type Props = {
  params?: Promise<{ locale: string; id: string }>;
};

export default async function NewsDetailPage({ params }: Props) {
  const resolvedParams = params ? await params : { locale: "en", id: "1" };
  const { locale, id } = resolvedParams;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  const news = getNewsById(parseInt(id));

  if (!news) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="mt-12 lg:mt-0 flex-1">
          <Navbar />
          <section className="py-12 mx-12 lg:mx-32 lg:mt-12">
            <div className="text-center py-8">
              <h1 className="text-2xl font-bold mb-4">News not found</h1>
              <Link href={`/${locale}/news`}>
                <Button>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {t("back")}
                </Button>
              </Link>
            </div>
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
          <Link href={`/${locale}/news`}>
            <Button 
              variant="outline" 
              className="mb-6"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("back")}
            </Button>
          </Link>

          <article className="max-w-4xl mx-auto">
            {news.image && (
              <div className="relative h-64 md:h-96 w-full mb-8 rounded-lg overflow-hidden">
                <Image
                  src={news.image}
                  alt={news.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <header className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{news.title}</h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <time dateTime={news.createdAt}>
                  {new Date(news.createdAt).toLocaleDateString()}
                </time>
                {news.updatedAt !== news.createdAt && (
                  <span>
                    Updated: {new Date(news.updatedAt).toLocaleDateString()}
                  </span>
                )}
              </div>
            </header>

            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-muted-foreground mb-6">{news.excerpt}</p>
              <div className="whitespace-pre-wrap">{news.content}</div>
            </div>
          </article>
        </section>
      </main>
      <Footer />
    </div>
  );
}