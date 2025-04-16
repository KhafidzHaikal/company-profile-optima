import Navbar from "@/components/navbar/Navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { IoArrowRedoOutline } from "react-icons/io5";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import Footer from "@/components/footer/Footer";
import { setRequestLocale, getTranslations } from "next-intl/server";

type Props = {
	params?: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
	const resolvedParams = params ? await params : { locale: "en" }; // default fallback

	const { locale } = resolvedParams;
	setRequestLocale(locale);
	const t = await getTranslations({ locale });

	return (
		<main className="mt-12 lg:mt-0">
			<Navbar />

			<section className="relative h-screen flex items-center mt-2 sm:mt-0 overflow-hidden">
				{/* Background Video */}
				<video
					autoPlay
					muted
					loop
					playsInline
					className="absolute top-0 left-0 w-full h-full object-cover z-0 brightness-[50%]">
					<source src="/videos/dubai.mp4" type="video/mp4" />
					Your browser does not support the video tag.
				</video>

				{/* Foreground Content */}
				<div className="relative z-10 container">
					<h1 className="text-[22px] sm:text-[32px] lg:text-[40px] font-bold mx-12 lg:mx-32 text-white">
						{t("jumbotron-text-1")}
					</h1>
					<h1 className="text-[22px] sm:text-[32px] lg:text-[40px] font-bold mx-12 lg:mx-32 text-white">
						{t("jumbotron-text-2")}
					</h1>
					<p className="md:w-1/2 text-sm md:text-base mx-12 lg:mx-32 mt-4 text-white">
						{t("jumbotron-text-desc")}
					</p>
					<div className="mx-12 lg:mx-32 mt-4">
						<Link href={"#"}>
							<Button className="rounded-md py-4 flex items-center gap-2 text-black bg-[#F3C623] hover:bg-[#f5d666] cursor-pointer">
								{t("jumbotron-text-button")}
								<FaWhatsapp className="text-md" />
							</Button>
						</Link>
					</div>
				</div>
			</section>

			<section className="py-12 mx-12 lg:mx-32">
				<p className="text-2xl text-yellow-400">{t("title-menu-homepage")}</p>
				<p className="text-md my-4">{t("subtitle-menu-homepage")}</p>
				<Carousel className="mt-7 overflow-hidden p-2">
					<CarouselContent>
						<CarouselItem className="sm:basis-1/2 md:basis-1/3 xl:basis-1/4 dark:bg-white shadow-md rounded-md ml-2.5 sm:ml-4 p-0">
							<div className="h-full">
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
										<span className="text-md font-semibold">
											{t("price-1")}
										</span>{" "}
										/ pax
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
						</CarouselItem>
						<CarouselItem className="sm:basis-1/2 md:basis-1/3 xl:basis-1/4 dark:bg-white shadow-md rounded-md ml-2.5 sm:ml-4 p-0">
							<div className="h-full">
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
										<span className="text-md font-semibold">
											{t("price-2")}
										</span>{" "}
										/ pax
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
						</CarouselItem>
						<CarouselItem className="sm:basis-1/2 md:basis-1/3 xl:basis-1/4 dark:bg-white shadow-md rounded-md ml-2.5 sm:ml-4 p-0">
							<div className="h-full">
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
										<span className="text-md font-semibold">
											{t("price-3")}
										</span>{" "}
										/ pax
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
						</CarouselItem>
						<CarouselItem className="sm:basis-1/2 md:basis-1/3 xl:basis-1/4 dark:bg-white shadow-md rounded-md ml-2.5 sm:ml-4 p-0">
							<div className="h-full">
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
										<span className="text-md font-semibold">
											{t("price-4")}
										</span>{" "}
										/ pax
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
						</CarouselItem>
					</CarouselContent>
				</Carousel>
			</section>
			<section className="py-12 mx-12 lg:mx-32">
				<div
					className="rounded-xl"
					style={{
						backgroundImage: "url(/images/sub-3-home-page.png)",
						width: "100%",
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}>
					<div className="container py-32 backdrop-brightness-50 xl:flex gap-4">
						<div className="w-full">
							<h1
								className={`text-[22px] sm:text-[32px] lg:text-[40px] font-bold mx-12 lg:mx-32 text-white`}>
								{t("title-menu-bottom")}
							</h1>
							<p className="md:w-1/2 text-sm md:text-base mx-12 lg:mx-32 mt-4 text-white">
								{t("subtitle-menu-bottom")}
							</p>
							<div className="mx-12 lg:mx-32 mt-4">
								<Link href={"/"}>
									<Button className=" rounded-md py-4 flex items-center gap-2 text-black bg-[#F3C623] hover:bg-[#f5d666] cursor-pointer">
										{t("see-more")}
										<IoArrowRedoOutline className="text-md" />
									</Button>
								</Link>
							</div>
						</div>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-2 px-12 py-12 lg:px-32 xl:py-0">
							<div>
								<Image
									src="/images/optima-foto-1.png"
									width={0}
									height={0}
									sizes="100vh"
									alt="Desert Group"
									className="w-64 h-64 md:h-72 object-cover rounded-lg sm:w-64"
								/>
							</div>

							<div className="grid grid-rows-2 gap-2">
								<Image
									src="/images/optima-foto-2.png"
									width={0}
									height={0}
									sizes="100vh"
									alt="Mosque"
									className="w-96 h-32 md:h-36 object-cover rounded-lg"
								/>

								<div className="grid grid-cols-2 gap-2">
									<Image
										src="/images/optima-foto-3.png"
										width={0}
										height={0}
										sizes="100vh"
										alt="Dinner"
										className="w-32 h-32 object-cover rounded-lg md:w-36 md:h-36"
									/>
									<Image
										src="/images/optima-foto-4.png"
										width={0}
										height={0}
										sizes="100vh"
										alt="Jeep"
										className="w-32 h-32 object-cover rounded-lg md:w-36 md:h-36"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="py-12 mx-12 lg:mx-32">
				<p className="text-2xl text-yellow-400">
					{t("title-menu-next-bottom")}
				</p>
				<div className="md:flex justify-between items-center">
					<p className="text-md my-4">{t("subtitle-menu-next-bottom")}</p>
					<Link href={"/"} className="text-md underline text-yellow-400">
						{t("see-more")}
					</Link>
				</div>
				<div className="py-12 md:flex justify-center gap-4 items-center mx-auto">
					{/* Abu Dhabi */}
					<div className="relative inline-block overflow-hidden rounded-xl group">
						<Image
							src="/images/abu-dhabi-poto.png"
							width={0}
							height={0}
							sizes="100vh"
							alt="Abu Dhabi"
							className="rounded-xl object-fit hover:scale-110 duration-500 transition-transform w-[600px] h-[200px] sm:h-[400px]"
						/>
						<div className="absolute inset-0 flex items-center justify-center">
							<Link href={"/destination/abu-dhabi"}>
								<span className="bg-black/50 text-white px-4 py-2 rounded-md flex items-center gap-2 font-semibold text-sm lg:text-lg group-hover:bg-black/70 transition-colors duration-300">
									Abu Dhabi <IoArrowRedoOutline size={16} />
								</span>
							</Link>
						</div>
					</div>

					{/* Dubai */}
					<div className="relative inline-block overflow-hidden rounded-xl group">
						<Image
							src="/images/dubai-poto.png"
							width={0}
							height={0}
							sizes="100vh"
							alt="Dubai"
							className="rounded-xl object-cover hover:scale-110 duration-500 transition-transform w-[600px] h-[200px] sm:h-[400px]"
						/>
						<div className="absolute inset-0 flex items-center justify-center">
							<Link href={"/destination/dubai"}>
								<span className="bg-black/50 text-white px-4 py-2 rounded-md flex items-center gap-2 font-semibold text-sm lg:text-lg group-hover:bg-black/70 transition-colors duration-300">
									Dubai <IoArrowRedoOutline size={16} />
								</span>
							</Link>
						</div>
					</div>
				</div>
			</section>
			<section className="py-12" id="background-yellow">
				<div className="mx-12 lg:mx-32 md:flex justify-between items-center gap-4">
					<div className="hidden md:flex">
						<Image
							src="/images/call-poto.jpg"
							width={0}
							height={0}
							sizes="100vh"
							alt="Call three"
							className="object-none object-left-top w-[400px] h-[300px]"
						/>
					</div>
					<div className="">
						<p className="text-2xl text-black font-semibold">
							{t("title-menu-next-call")}
						</p>
						<p className="text-sm my-4 text-black">
							{t("subtitle-menu-next-call")}
						</p>
						<Link href={""}>
							<Button className=" rounded-md py-4 flex items-center gap-2  text-black bg-[#F3C623] border-2 border-black cursor-pointer">
								{t("contact")}
								<FaWhatsapp className="text-md" />
							</Button>
						</Link>
					</div>
				</div>
			</section>
			<Footer />
		</main>
	);
}
