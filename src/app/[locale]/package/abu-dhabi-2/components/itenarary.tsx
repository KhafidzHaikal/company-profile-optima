"use client";

import TermCondition from "@/components/TermCondition";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Info, LayoutGrid } from "lucide-react";
import { useTranslations } from "next-intl";
import EstimatedNewAbuDhabiTable from "./estimateTable";

export default function AbuDhabiTabsFull() {
	const t = useTranslations();

	return (
		<Tabs defaultValue="itinerary" className="w-full mt-8">
			<TabsList className="flex w-full justify-start gap-8 border-b-2 bg-transparent pb-1">
				<TabsTrigger
					value="itinerary"
					className="flex items-center gap-2 text-sm px-1 py-2 
    bg-transparent data-[state=active]:text-black
    data-[state=active]:underline data-[state=active]:underline-solid data-[state=active]:underline-yellow-400
    data-[state=active]:w-full">
					{" "}
					{/* Full width for active tab */}
					<LayoutGrid size={16} />
					Detail
				</TabsTrigger>

				<TabsTrigger
					value="terms"
					className="flex items-center gap-2 text-sm px-1 py-2 
    bg-transparent data-[state=active]:text-black
    data-[state=active]:underline data-[state=active]:underline-solid data-[state=active]:underline-yellow-400
    data-[state=active]:w-full">
					{" "}
					{/* Full width for active tab */}
					<Info size={16} />
					Term and Condition
				</TabsTrigger>
			</TabsList>

			{/* Itinerary Tab */}
			<TabsContent value="itinerary">
				<p className="text-2xl font-bold text-yellow-400">
					{t("abu-dhabi-itinerary-title")}
				</p>

				{/* Day 1 */}
				<p className="text-xl font-bold text-yellow-400 mt-4">Day 1</p>
				<ul className="list-disc list-inside dark:text-white text-black space-y-2 ml-4 lg:ml-12 mt-2 text-sm">
					<li>{t("abu-dhabi-day1-new.point1")}</li>
					<li>{t("abu-dhabi-day1-new.point2")}</li>
					<li>{t("abu-dhabi-day1-new.point3")}</li>
					<li>{t("abu-dhabi-day1-new.point4")}</li>
					<li>{t("abu-dhabi-day1-new.point5")}</li>
					<li>{t("abu-dhabi-day1-new.point6")}</li>
					<li>{t("abu-dhabi-day1-new.point7")}</li>
				</ul>

				{/* Day 2 */}
				<p className="text-xl font-bold text-yellow-400 mt-6">Day 2</p>
				<ul className="list-disc list-inside dark:text-white text-black space-y-2 ml-4 lg:ml-12 mt-2 text-sm">
					<li>{t("abu-dhabi-day2-new.point1")}</li>
					<li>{t("abu-dhabi-day2-new.point2")}</li>
					<li>{t("abu-dhabi-day2-new.point3")}</li>
					<li>{t("abu-dhabi-day2-new.point4")}</li>
					<li>{t("abu-dhabi-day2-new.point5")}</li>
					<li>{t("abu-dhabi-day2-new.point6")}</li>
					<li>{t("abu-dhabi-day2-new.point7")}</li>
				</ul>

				{/* Day 3 */}
				<p className="text-xl font-bold text-yellow-400 mt-6">Day 3</p>
				<ul className="list-disc list-inside dark:text-white text-black space-y-2 ml-4 lg:ml-12 mt-2 text-sm">
					<li>{t("abu-dhabi-day3-new.point1")}</li>
					<li>{t("abu-dhabi-day3-new.point2")}</li>
					<li>{t("abu-dhabi-day3-new.point3")}</li>
					<li>{t("abu-dhabi-day3-new.point4")}</li>
					<li>{t("abu-dhabi-day3-new.point5")}</li>
					<li>{t("abu-dhabi-day3-new.point6")}</li>
				</ul>

				{/* Day 4 */}
				<p className="text-xl font-bold text-yellow-400 mt-6">Day 4</p>
				<ul className="list-disc list-inside dark:text-white text-black space-y-2 ml-4 lg:ml-12 mt-2 text-sm">
					<li>{t("abu-dhabi-day4-new.point1")}</li>
					<li>{t("abu-dhabi-day4-new.point2")}</li>
					<li>{t("abu-dhabi-day4-new.point3")}</li>
					<li>{t("abu-dhabi-day4-new.point4")}</li>
					<li>{t("abu-dhabi-day4-new.point5")}</li>
				</ul>
				<EstimatedNewAbuDhabiTable />
			</TabsContent>

			{/* Terms & Conditions Tab */}
			<TabsContent value="terms">
				<TermCondition />
			</TabsContent>
		</Tabs>
	);
}
