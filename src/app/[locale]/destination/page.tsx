// File: app/[locale]/destination/page.tsx

import { setRequestLocale, getTranslations } from "next-intl/server";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import DestinationCard from "@/components/card/DestinationCard";

type Props = {
	params?: Promise<{ locale: string }>;
};

export default async function DestinationPage({ params }: Props) {
	const resolvedParams = params ? await params : { locale: "en" }; // default fallback

	const { locale } = resolvedParams;
	setRequestLocale(locale);
	const t = await getTranslations({ locale });

	return (
		<main className="mt-12 lg:mt-0">
			<Navbar />
			<section className="py-12 mx-12 lg:mx-32 lg:mt-12">
				<p className="text-2xl font-bold text-yellow-400">
					{t("destination-title")}
				</p>
				<p className="text-md mt-8 mb-12">{t("destination-subtitle")}</p>

				<DestinationCard
					title="Dubai"
					description={t("destination-card-title-dubai")}
					imageUrl="/images/destination-poto-dubai.png"
					link={`/${locale}/destination/dubai`}
				/>
				<DestinationCard
					title="Abu Dhabi"
					description={t("destination-card-title-abu-dhabi")}
					imageUrl="/images/destination-poto-abu-dhabi.png"
					link={`/${locale}/destination/abu-dhabi`}
				/>
			</section>
			<Footer />
		</main>
	);
}
