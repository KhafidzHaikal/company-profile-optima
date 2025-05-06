import { setRequestLocale, getTranslations } from "next-intl/server";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaWhatsapp } from "react-icons/fa";
import DubaiTabsFull from "./components/itenarary";

type Props = {
	params?: Promise<{ locale: string }>;
};

export default async function Dubai2Page({ params }: Props) {
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
						{t("text-card-package-2")}
					</p>
					<p className="text-yellow-400 my-2 text-md">
						<span className="text-2xl font-semibold">{t("price-2")}</span> / pax
					</p>
				</div>
				<p className="text-md mt-8 mb-8">{t("text-card-description-2")}</p>
				<Link href={"https://wa.me/6281388266868"}>
					<Button className="mt-4 mb-8 rounded-md py-4 flex items-center gap-2  text-black bg-[#F3C623] hover:bg-[#f4e19d] border-2 border-black cursor-pointer">
						{t("contact")}
						<FaWhatsapp className="text-md" />
					</Button>
				</Link>
				<DubaiTabsFull />
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
				className="py-12 mx-12 lg:mx-32 lg:mt-12 rounded-md p-8 mb-12"
				id="background-yellow">
				<p className="text-3xl font-bold text-black">{t("dubai-footer")}</p>
				<p className="text-md mt-4 text-black">{t("dubai-footer-desc")}</p>
				<Link href={"https://wa.me/6281388266868"}>
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
