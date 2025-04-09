import { setRequestLocale, getTranslations } from "next-intl/server";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaWhatsapp } from "react-icons/fa";

type Props = {
	params?: Promise<{ locale: string }>;
};

export default async function DubaiPage({ params }: Props) {
	const resolvedParams = params ? await params : { locale: "en" }; // default fallback

	const { locale } = resolvedParams;
	setRequestLocale(locale);
	const t = await getTranslations({ locale });

	return (
		<main className="mt-12 lg:mt-0">
			<Navbar />
			<section className="py-12 mx-12 lg:mx-32 lg:mt-12">
				<p className="text-3xl font-bold text-yellow-400">Dubai</p>
				<p className="text-md mt-8 mb-8">{t("dubai-subtitle")}</p>
				<Link href={""}>
					<Button className="mt-4 mb-8 rounded-md py-4 flex items-center gap-2  text-black bg-[#F3C623] border-2 border-black cursor-pointer">
						{t("dubai-text-button")}
						<FaWhatsapp className="text-md" />
					</Button>
				</Link>
				<div className="md:flex justify-between gap-4 items-center">
					<div className="md:w-1/2">
						<p className="text-2xl font-bold text-yellow-400">
							{t("dubai-header-1")}
						</p>
						<p className="text-md mt-8">{t("dubai-desc-1")}</p>
					</div>
					<Image
						src={"/images/optima-foto-5.png"}
						alt={`Optima Portfolio`}
						width={300}
						height={100}
						className="w-1/3 rounded-lg object-cover"
					/>
				</div>
				<div className="md:flex justify-between gap-4 items-center">
					<Image
						src={"/images/optima-foto-6.png"}
						alt={`Optima Portfolio`}
						width={300}
						height={100}
						className="w-1/3 rounded-lg object-cover"
					/>
					<div className="md:w-1/2 text-right">
						<p className="text-2xl font-bold text-yellow-400">
							{t("dubai-header-2")}
						</p>
						<p className="text-md mt-8">{t("dubai-desc-2")}</p>
					</div>
				</div>
				<div className="md:flex justify-between gap-4 items-center">
					<div className="md:w-1/2">
						<p className="text-2xl font-bold text-yellow-400">
							{t("dubai-header-3")}
						</p>
						<p className="text-md mt-8">{t("dubai-desc-3")}</p>
					</div>
					<Image
						src={"/images/optima-foto-7.png"}
						alt={`Optima Portfolio`}
						width={300}
						height={100}
						className="w-1/3 rounded-lg object-cover"
					/>
				</div>
				<div className="md:flex justify-between gap-4 items-center">
					<Image
						src={"/images/optima-foto-8.png"}
						alt={`Optima Portfolio`}
						width={300}
						height={100}
						className="w-1/3 rounded-lg object-cover"
					/>
					<div className="md:w-1/2 text-right">
						<p className="text-2xl font-bold text-yellow-400">
							{t("dubai-header-4")}
						</p>
						<p className="text-md mt-8">{t("dubai-desc-4")}</p>
					</div>
				</div>
				<div className="md:flex justify-between gap-4 items-center">
					<div className="md:w-1/2">
						<p className="text-2xl font-bold text-yellow-400">
							{t("dubai-header-5")}
						</p>
						<p className="text-md mt-8">{t("dubai-desc-5")}</p>
					</div>
					<Image
						src={"/images/optima-foto-9.png"}
						alt={`Optima Portfolio`}
						width={300}
						height={100}
						className="w-1/3 rounded-lg object-cover"
					/>
				</div>
			</section>
			<section
				className="py-12 mx-12 lg:mx-32 lg:mt-12 rounded-md p-8"
				id="background-yellow">
				<p className="text-3xl font-bold text-black">{t("dubai-footer")}</p>
				<p className="text-md mt-4 text-black">{t("dubai-footer-desc")}</p>
				<Link href={""}>
					<Button className="mt-8 rounded-md py-4 flex items-center gap-2  text-black bg-[#F3C623] border-2 border-black cursor-pointer">
						{t("dubai-text-button")}
						<FaWhatsapp className="text-md" />
					</Button>
				</Link>
			</section>
			<Footer />
		</main>
	);
}
