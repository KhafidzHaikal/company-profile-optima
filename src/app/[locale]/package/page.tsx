import { FaWhatsapp } from "react-icons/fa";
import { IoArrowRedoOutline } from "react-icons/io5";
import Image from "next/image";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { setRequestLocale, getTranslations } from "next-intl/server";

type Props = {
	params?: Promise<{ locale: string }>;
};

export default async function PackagePage({ params }: Props) {
	const resolvedParams = params ? await params : { locale: "en" }; // default fallback

	const { locale } = resolvedParams;
	setRequestLocale(locale);
	const t = await getTranslations({ locale });

	return (
		<main className="mt-12 lg:mt-0">
			<Navbar />
			<section className="py-12 mx-12 lg:mx-32 mt-12">
				<p className="text-2xl font-bold text-yellow-400">
					{t("package-title")}
				</p>
				<p className="text-md mt-8 mb-12">{t("package-subtitle")}</p>
				<p className="text-xl font-bold text-yellow-400 my-4">Dubai</p>
				<div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
					<div className="h-full dark:bg-white shadow-md rounded-md ml-2.5 sm:ml-4 p-0">
						<Image
							src={"/images/optima-foto-5.png"}
							width={0}
							height={0}
							sizes="100vh"
							alt="Mosque"
							className=" h-44 w-full -mt-1"
						/>
						<div className="p-4">
							<p className="text-md font-semibold text-black">
								{t("text-card-package-1")}
							</p>
							<p className="text-black my-2 text-sm">
								<span className="text-md font-semibold">{t("price-1")}</span> /
								pax
							</p>
							<p className="text-sm font-normal text-black py-4">
								{t("text-card-description-1")}
							</p>
							<div className="flex md:block xl:flex justify-between items-center mt-8 gap-2">
								<Link href={""}>
									<Button className=" rounded-md py-4 flex items-center gap-2 mx-auto sm:mx-0 text-black bg-[#F3C623] hover:bg-[#f5d666] cursor-pointer w-full">
										{t("contact")}
										<FaWhatsapp className="text-md" />
									</Button>
								</Link>
								<Link href={"/package/dubai-1"}>
									<Button className="mt-0 md:mt-4 xl:mt-0 rounded-md py-4 flex items-center gap-2 mx-auto sm:mx-0 text-black bg-[#F3C623] hover:bg-[#f5d666] cursor-pointer w-full">
										{t("text-button-card")}
										<IoArrowRedoOutline className="text-md" />
									</Button>
								</Link>
							</div>
						</div>
					</div>
					<div className="h-full dark:bg-white shadow-md rounded-md ml-2.5 sm:ml-4 p-0">
						<Image
							src={"/images/dubai-poto.png"}
							width={0}
							height={0}
							sizes="100vh"
							alt="Mosque"
							className=" h-44 w-full -mt-1"
						/>
						<div className="p-4">
							<p className="text-md font-semibold text-black">
								{t("text-card-package-2")}
							</p>
							<p className="text-black my-2 text-sm">
								<span className="text-md font-semibold">{t("price-2")}</span> /
								pax
							</p>
							<p className="text-sm font-normal text-black py-4">
								{t("text-card-description-2")}
							</p>
							<div className="flex md:block xl:flex justify-between items-center mt-8 gap-2">
								<Link href={""}>
									<Button className=" rounded-md py-4 flex items-center gap-2 mx-auto sm:mx-0 text-black bg-[#F3C623] hover:bg-[#f5d666] cursor-pointer w-full">
										{t("contact")}
										<FaWhatsapp className="text-md" />
									</Button>
								</Link>
								<Link href={"/package/dubai-2"}>
									<Button className="mt-0 md:mt-4 xl:mt-0 rounded-md py-4 flex items-center gap-2 mx-auto sm:mx-0 text-black bg-[#F3C623] hover:bg-[#f5d666] cursor-pointer w-full">
										{t("text-button-card")}
										<IoArrowRedoOutline className="text-md" />
									</Button>
								</Link>
							</div>
						</div>
					</div>
				</div>
				<p className="text-xl font-bold text-yellow-400 my-4">Abu Dhabi</p>
				<div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
					<div className="h-full dark:bg-white shadow-md rounded-md ml-2.5 sm:ml-4 p-0">
						<Image
							src={"/images/optima-foto-8.png"}
							width={0}
							height={0}
							sizes="100vh"
							alt="Mosque"
							className=" h-44 w-full -mt-1"
						/>
						<div className="p-4">
							<p className="text-md font-semibold text-black">
								{t("text-card-package-3")}
							</p>
							<p className="text-black my-2 text-sm">
								<span className="text-md font-semibold">{t("price-3")}</span> /
								pax
							</p>
							<p className="text-sm font-normal text-black py-1">
								{t("text-card-description-3")}
							</p>
							<div className="flex md:block xl:flex justify-between items-center mt-8 gap-2">
								<Link href={""}>
									<Button className=" rounded-md py-4 flex items-center gap-2 mx-auto sm:mx-0 text-black bg-[#F3C623] hover:bg-[#f5d666] cursor-pointer w-full">
										{t("contact")}
										<FaWhatsapp className="text-md" />
									</Button>
								</Link>
								<Link href={"/package/abu-dhabi-1"}>
									<Button className="mt-0 md:mt-4 xl:mt-0 rounded-md py-4 flex items-center gap-2 mx-auto sm:mx-0 text-black bg-[#F3C623] hover:bg-[#f5d666] cursor-pointer w-full">
										{t("text-button-card")}
										<IoArrowRedoOutline className="text-md" />
									</Button>
								</Link>
							</div>
						</div>
					</div>
					<div className="h-full dark:bg-white shadow-md rounded-md ml-2.5 sm:ml-4 p-0">
						<Image
							src={"/images/optima-foto-11.png"}
							width={0}
							height={0}
							sizes="100vh"
							alt="Mosque"
							className=" h-44 w-full -mt-1"
						/>
						<div className="p-4">
							<p className="text-md font-semibold text-black">
								{t("text-card-package-4")}
							</p>
							<p className="text-black my-2 text-sm">
								<span className="text-md font-semibold">{t("price-4")}</span> /
								pax
							</p>
							<p className="text-sm font-normal text-black py-1">
								{t("text-card-description-4")}
							</p>
							<div className="flex md:block xl:flex justify-between items-center mt-8 gap-2">
								<Link href={""}>
									<Button className=" rounded-md py-4 flex items-center gap-2 mx-auto sm:mx-0 text-black bg-[#F3C623] hover:bg-[#f5d666] cursor-pointer w-full">
										{t("contact")}
										<FaWhatsapp className="text-md" />
									</Button>
								</Link>
								<Link href={"/package/abu-dhabi-2"}>
									<Button className="mt-0 md:mt-4 xl:mt-0 rounded-md py-4 flex items-center gap-2 mx-auto sm:mx-0 text-black bg-[#F3C623] hover:bg-[#f5d666] cursor-pointer w-full">
										{t("text-button-card")}
										<IoArrowRedoOutline className="text-md" />
									</Button>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</section>
			<Footer />
		</main>
	);
}
