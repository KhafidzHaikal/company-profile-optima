"use client";

import { useTranslations } from "next-intl";

export default function NewDubaiPriceTable() {
	const t = useTranslations("new-dubai");

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
				<tbody className="text-white text-sm font-light">
					<tr className="transition rounded-md">
						<td className="px-3 py-3 align-top">1</td>
						<td className="px-3 py-3 align-top font-medium">
							{t("accommodation")}
						</td>
						<td className="px-3 py-3">
							<p>{t("hotelDetail")}</p>
							<p className="mt-1">{t("hotelPriceCalc")}</p>
						</td>
						<td className="px-3 py-3 text-right">USD 330</td>
					</tr>
					<tr className="transition rounded-md">
						<td className="px-3 py-3 align-top">2</td>
						<td className="px-3 py-3 font-medium">{t("transportation")}</td>
						<td className="px-3 py-3">{t("transportationDetail")}</td>
						<td className="px-3 py-3 text-right">USD 430</td>
					</tr>
					<tr className="transition rounded-md">
						<td className="px-3 py-3 align-top">3</td>
						<td className="px-3 py-3 font-medium">{t("tickets")}</td>
						<td className="px-3 py-3">{t("ticketDetail")}</td>
						<td className="px-3 py-3 text-right">USD 550</td>
					</tr>
					<tr className="transition rounded-md">
						<td className="px-3 py-3 align-top">4</td>
						<td className="px-3 py-3 font-medium">{t("guideHandling")}</td>
						<td className="px-3 py-3">{t("guideDetail")}</td>
						<td className="px-3 py-3 text-right">USD 80</td>
					</tr>
					<tr className="transition rounded-md">
						<td className="px-3 py-3 align-top">5</td>
						<td className="px-3 py-3 font-medium">{t("markup")}</td>
						<td className="px-3 py-3">{t("markupDetail")}</td>
						<td className="px-3 py-3 text-right">USD 100</td>
					</tr>
					<tr className="text-yellow-400 font-bold border-t border-yellow-500 text-sm">
						<td colSpan={3} className="px-3 py-3 text-right">
							{t("total")}
						</td>
						<td className="px-3 py-3 text-right">USD 1,880</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}
