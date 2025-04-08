"use client"

import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

const Footer = () => {
	const t = useTranslations();
	return (
		<footer className="bg-black text-white px-6 py-12">
			<div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="w-full">
					<h2 className="text-yellow-400 text-xl font-bold mb-2">
						{t("footer-title")}
					</h2>
					<p className="text-yellow-400 font-semibold mb-4">
						{t("footer-subtitle")}
					</p>

					<div className="flex items-center w-full mb-4">
						<input
							type="email"
							placeholder={t("enter-email")}
							className="px-4 py-2 w-full md:w-3/4 text-md rounded-l-md bg-white text-black "
						/>
						<button className="bg-transparent border border-white px-4 py-2 rounded-r-md hover:bg-white hover:text-black transition">
							<ArrowRight />
						</button>
					</div>

					<p className="text-sm">
						<span className="text-yellow-400 font-semibold">
							{t("office-address")}
						</span>
						<br />
						Port Saeed, Deira Centurion Star Building Tower B,
						<br />
						7th floor - office No. 709 - Dubai - United Arab Emirates
					</p>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div>
						<h3 className="text-yellow-400 font-semibold mb-2">
							{t("destination")}
						</h3>
						<ul className="space-y-1">
							<li>Abu Dhabi</li>
							<li>Dubai</li>
						</ul>
					</div>

					<div>
						<h3 className="text-yellow-400 font-semibold mb-2">
							{t("portfolio")}
						</h3>
						<ul className="space-y-1">
							<li>Abu Dhabi Travel Pic</li>
							<li>Dubai Travel Pic</li>
						</ul>
					</div>

					<div>
						<h3 className="text-yellow-400 font-semibold mb-2">
							{t("social-media")}
						</h3>
						<div className="flex gap-4 text-2xl mt-2">
							<a href="" target="_blank" rel="noopener noreferrer">
								<FaWhatsapp />
							</a>
							<a href="" target="_blank" rel="noopener noreferrer">
								<FaInstagram />
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
