"use client";

import Navbar from "@/components/navbar/Navbar";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";


export default function Home() {
	const t = useTranslations();
	return (
		<main>
			<Navbar />

			<section
				className="h-screen flex items-center container mt-2 sm:mt-0"
				style={{
					backgroundImage: "url(/images/jumbotron-optima-baru.png)",
					width: "100%",
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}>
				<div className="container">
					<h1
						className={`text-[22px] sm:text-[32px] lg:text-[40px] font-bold mx-12 lg:mx-32`}>
						{t("jumbotron-text-1")}
					</h1>
					<h1
						className={`text-[22px] sm:text-[32px] lg:text-[40px] font-bold mx-12 lg:mx-32`}>
						{t("jumbotron-text-2")}
					</h1>
					<p className="md:w-1/2 text-sm md:text-base mx-12 lg:mx-32 mt-4">
						{t("jumbotron-text-desc")}
					</p>
					<div className="mx-12 lg:mx-32 mt-4">
						<Link href={"https://wa.me/+6281911506190"}>
							<Button className=" rounded-2xl py-6 flex items-center gap-2 mx-auto sm:mx-0 bg-[#f5d666] hover:bg-[#F3C623]">
								{t("jumbotron-text-button")}
                <FaWhatsapp className="text-md" />
							</Button>
						</Link>
					</div>
				</div>
			</section>
		</main>
	);
}
