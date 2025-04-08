import { useTranslations } from "next-intl";
import { FaWhatsapp } from "react-icons/fa";
import { IoArrowRedoOutline } from "react-icons/io5";
import Image from "next/image";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PackagePage() {
	const t = useTranslations();
	return (
		<main>
			<Navbar />
			<section className="py-12 mx-12 lg:mx-32 mt-12">
				<p className="text-2xl text-yellow-400">{t("title-menu-homepage")}</p>
				<p className="text-md my-4">{t("subtitle-menu-homepage")}</p>
				<div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
					<div className="h-full dark:bg-white shadow-md rounded-md ml-2.5 sm:ml-4 p-0">
						<Image
							src={"/images/mosque.png"}
							width={0}
							height={0}
							sizes="100vh"
							alt="Mosque"
							className=" h-44 w-full -mt-1"
						/>
						<div className="p-4">
							<p className="text-md font-semibold text-black">
								{t("text-card-package")}
							</p>
							<p className="text-black my-2 text-sm">
								<span className="text-md font-semibold">{t("price-1")}</span> /{" "}
								{t("person")}
							</p>
							<p className="text-sm font-normal text-black">
								{t("text-card-description")}
							</p>
							<div className="flex md:block xl:flex justify-between items-center mt-8 gap-2">
								<Link href={""}>
									<Button className=" rounded-md py-4 flex items-center gap-2 mx-auto sm:mx-0 text-black bg-[#F3C623] hover:bg-[#f5d666] cursor-pointer w-full">
										{t("contact")}
										<FaWhatsapp className="text-md" />
									</Button>
								</Link>
								<Link href={""}>
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
							src={"/images/mosque.png"}
							width={0}
							height={0}
							sizes="100vh"
							alt="Mosque"
							className=" h-44 w-full -mt-1"
						/>
						<div className="p-4">
							<p className="text-md font-semibold text-black">
								{t("text-card-package")}
							</p>
							<p className="text-black my-2 text-sm">
								<span className="text-md font-semibold">{t("price-1")}</span> /{" "}
								{t("person")}
							</p>
							<p className="text-sm font-normal text-black">
								{t("text-card-description")}
							</p>
							<div className="flex md:block xl:flex justify-between items-center mt-8 gap-2">
								<Link href={""}>
									<Button className=" rounded-md py-4 flex items-center gap-2 mx-auto sm:mx-0 text-black bg-[#F3C623] hover:bg-[#f5d666] cursor-pointer w-full">
										{t("contact")}
										<FaWhatsapp className="text-md" />
									</Button>
								</Link>
								<Link href={""}>
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
							src={"/images/mosque.png"}
							width={0}
							height={0}
							sizes="100vh"
							alt="Mosque"
							className=" h-44 w-full -mt-1"
						/>
						<div className="p-4">
							<p className="text-md font-semibold text-black">
								{t("text-card-package")}
							</p>
							<p className="text-black my-2 text-sm">
								<span className="text-md font-semibold">{t("price-1")}</span> /{" "}
								{t("person")}
							</p>
							<p className="text-sm font-normal text-black">
								{t("text-card-description")}
							</p>
							<div className="flex md:block xl:flex justify-between items-center mt-8 gap-2">
								<Link href={""}>
									<Button className=" rounded-md py-4 flex items-center gap-2 mx-auto sm:mx-0 text-black bg-[#F3C623] hover:bg-[#f5d666] cursor-pointer w-full">
										{t("contact")}
										<FaWhatsapp className="text-md" />
									</Button>
								</Link>
								<Link href={""}>
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
							src={"/images/mosque.png"}
							width={0}
							height={0}
							sizes="100vh"
							alt="Mosque"
							className=" h-44 w-full -mt-1"
						/>
						<div className="p-4">
							<p className="text-md font-semibold text-black">
								{t("text-card-package")}
							</p>
							<p className="text-black my-2 text-sm">
								<span className="text-md font-semibold">{t("price-1")}</span> /{" "}
								{t("person")}
							</p>
							<p className="text-sm font-normal text-black">
								{t("text-card-description")}
							</p>
							<div className="flex md:block xl:flex justify-between items-center mt-8 gap-2">
								<Link href={""}>
									<Button className=" rounded-md py-4 flex items-center gap-2 mx-auto sm:mx-0 text-black bg-[#F3C623] hover:bg-[#f5d666] cursor-pointer w-full">
										{t("contact")}
										<FaWhatsapp className="text-md" />
									</Button>
								</Link>
								<Link href={""}>
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
							src={"/images/mosque.png"}
							width={0}
							height={0}
							sizes="100vh"
							alt="Mosque"
							className=" h-44 w-full -mt-1"
						/>
						<div className="p-4">
							<p className="text-md font-semibold text-black">
								{t("text-card-package")}
							</p>
							<p className="text-black my-2 text-sm">
								<span className="text-md font-semibold">{t("price-1")}</span> /{" "}
								{t("person")}
							</p>
							<p className="text-sm font-normal text-black">
								{t("text-card-description")}
							</p>
							<div className="flex md:block xl:flex justify-between items-center mt-8 gap-2">
								<Link href={""}>
									<Button className=" rounded-md py-4 flex items-center gap-2 mx-auto sm:mx-0 text-black bg-[#F3C623] hover:bg-[#f5d666] cursor-pointer w-full">
										{t("contact")}
										<FaWhatsapp className="text-md" />
									</Button>
								</Link>
								<Link href={""}>
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
							src={"/images/mosque.png"}
							width={0}
							height={0}
							sizes="100vh"
							alt="Mosque"
							className=" h-44 w-full -mt-1"
						/>
						<div className="p-4">
							<p className="text-md font-semibold text-black">
								{t("text-card-package")}
							</p>
							<p className="text-black my-2 text-sm">
								<span className="text-md font-semibold">{t("price-1")}</span> /{" "}
								{t("person")}
							</p>
							<p className="text-sm font-normal text-black">
								{t("text-card-description")}
							</p>
							<div className="flex md:block xl:flex justify-between items-center mt-8 gap-2">
								<Link href={""}>
									<Button className=" rounded-md py-4 flex items-center gap-2 mx-auto sm:mx-0 text-black bg-[#F3C623] hover:bg-[#f5d666] cursor-pointer w-full">
										{t("contact")}
										<FaWhatsapp className="text-md" />
									</Button>
								</Link>
								<Link href={""}>
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
							src={"/images/mosque.png"}
							width={0}
							height={0}
							sizes="100vh"
							alt="Mosque"
							className=" h-44 w-full -mt-1"
						/>
						<div className="p-4">
							<p className="text-md font-semibold text-black">
								{t("text-card-package")}
							</p>
							<p className="text-black my-2 text-sm">
								<span className="text-md font-semibold">{t("price-1")}</span> /{" "}
								{t("person")}
							</p>
							<p className="text-sm font-normal text-black">
								{t("text-card-description")}
							</p>
							<div className="flex md:block xl:flex justify-between items-center mt-8 gap-2">
								<Link href={""}>
									<Button className=" rounded-md py-4 flex items-center gap-2 mx-auto sm:mx-0 text-black bg-[#F3C623] hover:bg-[#f5d666] cursor-pointer w-full">
										{t("contact")}
										<FaWhatsapp className="text-md" />
									</Button>
								</Link>
								<Link href={""}>
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
							src={"/images/mosque.png"}
							width={0}
							height={0}
							sizes="100vh"
							alt="Mosque"
							className=" h-44 w-full -mt-1"
						/>
						<div className="p-4">
							<p className="text-md font-semibold text-black">
								{t("text-card-package")}
							</p>
							<p className="text-black my-2 text-sm">
								<span className="text-md font-semibold">{t("price-1")}</span> /{" "}
								{t("person")}
							</p>
							<p className="text-sm font-normal text-black">
								{t("text-card-description")}
							</p>
							<div className="flex md:block xl:flex justify-between items-center mt-8 gap-2">
								<Link href={""}>
									<Button className=" rounded-md py-4 flex items-center gap-2 mx-auto sm:mx-0 text-black bg-[#F3C623] hover:bg-[#f5d666] cursor-pointer w-full">
										{t("contact")}
										<FaWhatsapp className="text-md" />
									</Button>
								</Link>
								<Link href={""}>
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
