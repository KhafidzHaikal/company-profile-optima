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

export default async function AbuDhabiPage({ params }: Props) {
	const resolvedParams = params ? await params : { locale: "en" }; // default fallback

	const { locale } = resolvedParams;
	setRequestLocale(locale);
	const t = await getTranslations({ locale });

	return (
		<main className="mt-12 lg:mt-0">
			<Navbar />
			<section className="py-12 mx-12 lg:mx-32 lg:mt-12">
				<div className="md:flex justify-between items-center">
					<p className="text-3xl font-bold text-yellow-400">
						{t("text-card-package")}
					</p>
					<p className="text-yellow-400 my-2 text-md">
						<span className="text-2xl font-semibold">{t("price-1")}</span> /{" "}
						{t("person")}
					</p>
				</div>
				<p className="text-md mt-8 mb-8">{t("abu-dhabi-subtitle")}</p>
				<Link href={""}>
					<Button className="mt-4 mb-8 rounded-md py-4 flex items-center gap-2  text-black bg-[#F3C623] border-2 border-black cursor-pointer">
						{t("contact")}
						<FaWhatsapp className="text-md" />
					</Button>
				</Link>
				<div className="mt-12">
					<p className="text-2xl font-bold text-yellow-400">
						{t("abu-dhabi-subtitle-1")}
					</p>
					<ul className="list-disc list-inside dark:text-white text-black space-y-2 ml-4 lg:ml-12 mt-2 text-md">
						<li>{t("abu-dhabi-point-1")}</li>
						<li>{t("abu-dhabi-point-2")}</li>
						<li>{t("abu-dhabi-point-3")}</li>
						<li>{t("abu-dhabi-point-4")}</li>
						<li>{t("abu-dhabi-point-5")}</li>
						<li>{t("abu-dhabi-point-6")}</li>
					</ul>
				</div>
				<div className="mt-12">
					<p className="text-2xl font-bold text-yellow-400">
						{t("adu-dhabi-subtitle-2")}
					</p>
				</div>
				<div className="md:flex justify-between gap-4 items-center mt-4">
					<Image
						src={"/images/optima-foto-12.png"}
						alt={`Optima Portfolio`}
						width={300}
						height={100}
						className="w-full rounded-lg object-cover"
					/>
					<Image
						src={"/images/optima-foto-11.png"}
						alt={`Optima Portfolio`}
						width={300}
						height={100}
						className="w-full rounded-lg object-cover"
					/>
				</div>
				<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
					<Image
						src={"/images/abu-dhabi-poto.png"}
						alt={`Optima Portfolio`}
						width={300}
						height={100}
						className="w-full rounded-lg object-cover"
					/>
					<Image
						src={"/images/jumbotron-optima-baru.png"}
						alt={`Optima Portfolio`}
						width={300}
						height={100}
						className="w-full rounded-lg object-cover"
					/>
					<Image
						src={"/images/optima-foto-13.png"}
						alt={`Optima Portfolio`}
						width={300}
						height={100}
						className="w-full rounded-lg object-cover"
					/>
					<Image
						src={"/images/optima-foto-10.png"}
						alt={`Optima Portfolio`}
						width={300}
						height={100}
						className="w-full rounded-lg object-cover"
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
