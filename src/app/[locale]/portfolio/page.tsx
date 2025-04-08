import { setRequestLocale, getTranslations } from "next-intl/server";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import PortfolioCard from "@/components/card/PortfolioCard";

type Props = {
	params?: Promise<{ locale: string }>;
};

export default async function PortfolioPage({ params }: Props) {
	const resolvedParams = params ? await params : { locale: "en" }; // default fallback

	const { locale } = resolvedParams;
	setRequestLocale(locale);
	const t = await getTranslations({ locale });

	return (
		<main>
			<Navbar />
			<section className="py-12 mx-12 lg:mx-32 lg:mt-12">
				<p className="text-2xl font-bold text-yellow-400">
					{t("portfolio-title")}
				</p>
				<p className="text-md mt-8 mb-12">{t("portfolio-subtitle")}</p>
				<PortfolioCard />
			</section>
			<Footer />
		</main>
	);
}
