"use client"

import React from "react";
import { useTranslations } from "next-intl";

export default function TermCondition() {
    const t = useTranslations();

	return (
		<>
			<p className="text-2xl font-bold text-yellow-400 mb-4">
				{t("term-and-condition-title")}
			</p>
			<ul className="list-disc list-inside text-black dark:text-white space-y-2 ml-4 lg:ml-12 mt-2 text-sm">
				<li>{t("term-and-condition.point1")}</li>
				<li>{t("term-and-condition.point2")}</li>
				<li>{t("term-and-condition.point3")}</li>
				<li>{t("term-and-condition.point4")}</li>
				<li>{t("term-and-condition.point5")}</li>
				<li>{t("term-and-condition.point6")}</li>
			</ul>
			<p className="text-lg font-medium text-yellow-400 my-4">
				{t("term-and-condition-description")}
			</p>
		</>
	);
}
