export default function NewsPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-2xl font-bold">News Page - Coming Soon</h1>
    </div>
  );
}

// import { setRequestLocale, getTranslations } from "next-intl/server";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import Image from "next/image";
// import Link from "next/link";
// import Navbar from "@/components/navbar/Navbar";
// import Footer from "@/components/footer/Footer";

// type NewsItem = {
//   id: number;
//   title: string;
//   content: string;
//   excerpt: string;
//   image: string;
//   createdAt: string;
//   updatedAt: string;
// };

// type Props = {
//   params?: Promise<{ locale: string }>;
// };

// async function getNews(): Promise<NewsItem[]> {
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.newoptimatourism.com'}/api/news`, {
//       cache: 'no-store'
//     });
//     if (!res.ok) throw new Error('Failed to fetch');
//     return res.json();
//   } catch {
//     return [];
//   }
// }

// export default async function NewsPage({ params }: Props) {
//   const resolvedParams = params ? await params : { locale: "en" };
//   const { locale } = resolvedParams;
//   setRequestLocale(locale);
//   const t = await getTranslations({ locale });

//   const newsData = await getNews();

//   return (
//     <div className="min-h-screen flex flex-col">
//       <main className="mt-12 lg:mt-0 flex-1">
//         <Navbar />
//         <section className="py-12 mx-12 lg:mx-32 lg:mt-12">
//           <p className="text-2xl font-bold text-yellow-400">{t("news")}</p>
//           <p className="text-md mt-8 mb-12">{t("news-subtitle")}</p>

//           {newsData.length === 0 ? (
//             <div className="text-center py-12">
//               <p className="text-muted-foreground">No news articles available.</p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {newsData.map((item) => (
//                 <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
//                   {item.image && (
//                     <div className="relative h-48 w-full">
//                       <Image
//                         src={item.image}
//                         alt={item.title}
//                         fill
//                         className="object-cover"
//                       />
//                     </div>
//                   )}
//                   <CardHeader>
//                     <CardTitle className="line-clamp-2">{item.title}</CardTitle>
//                     <CardDescription className="text-sm text-muted-foreground">
//                       {new Date(item.createdAt).toLocaleDateString()}
//                     </CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
//                       {item.excerpt}
//                     </p>
//                     <Link
//                       href={`/${locale}/news/${item.id}`}
//                       className="inline-flex items-center text-sm font-medium text-primary hover:underline"
//                     >
//                       {t("read-more")} →
//                     </Link>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           )}
//         </section>
//       </main>
//       <Footer />
//     </div>
//   );
// }