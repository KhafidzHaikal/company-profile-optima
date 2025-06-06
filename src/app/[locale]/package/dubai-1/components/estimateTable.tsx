"use client";

import { useTranslations } from "next-intl";

export default function EstimatedPriceTable() {
	const t = useTranslations("estimation");

	return (
		<div className="overflow-x-auto mt-4">
            <p className="text-2xl font-bold text-yellow-400 mb-4">
					{t("title")}
				</p>
			<table className="min-w-full border-separate border-spacing-y-3">
				<thead>
					<tr className="text-yellow-500 text-sm border-b border-yellow-500 uppercase">
						<th className="text-left px-3 py-2">{t("no")}</th>
						<th className="text-left px-3 py-2">{t("component")}</th>
						<th className="text-left px-3 py-2">{t("details")}</th>
						<th className="text-right px-3 py-2">{t("price")}</th>
					</tr>
				</thead>
				<tbody className="text-black dark:text-white text-sm font-light">
					<tr className="transition rounded-md">
						<td className="px-3 py-3 align-top">1</td>
						<td className="px-3 py-3 align-top font-medium">
							{t("accommodation")}
						</td>
						<td className="px-3 py-3">
							<p>{t("hotelDetail")}</p>
							<ul className="list-disc list-inside mt-1 space-y-1">
								<li>{t("twinSharing")}</li>
								<li>{t("singleRoom")}</li>
								<li>{t("extraBed")}</li>
							</ul>
						</td>
						<td className="px-3 py-3 text-right">
							USD 140
							<br />
							+ USD 100
							<br />+ USD 50
						</td>
					</tr>
					<tr className="transition rounded-md">
						<td className="px-3 py-3 align-top">2</td>
						<td className="px-3 py-3 font-medium">
							{t("transportationGuide")}
						</td>
						<td className="px-3 py-3">{t("transportationDetail")}</td>
						<td className="px-3 py-3 text-right">USD 120</td>
					</tr>
					<tr className="transition rounded-md">
						<td className="px-3 py-3 align-top">3</td>
						<td className="px-3 py-3 font-medium">{t("excursionTickets")}</td>
						<td className="px-3 py-3">{t("excursionDetail")}</td>
						<td className="px-3 py-3 text-right">USD 150</td>
					</tr>
					<tr className="transition rounded-md">
						<td className="px-3 py-3 align-top">4</td>
						<td className="px-3 py-3 font-medium">{t("meals")}</td>
						<td className="px-3 py-3">{t("mealsDetail")}</td>
						<td className="px-3 py-3 text-right">USD 30</td>
					</tr>
					<tr className="transition rounded-md">
						<td className="px-3 py-3 align-top">5</td>
						<td className="px-3 py-3 font-medium">{t("travelFee")}</td>
						<td className="px-3 py-3">{t("travelDetail")}</td>
						<td className="px-3 py-3 text-right">USD 50</td>
					</tr>
					<tr className="text-yellow-400 font-bold border-t border-yellow-500 text-sm">
						<td colSpan={3} className="px-3 py-3 text-right">
							{t("totalEstimation")}
						</td>
						<td className="px-3 py-3 text-right">USD 490</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}
