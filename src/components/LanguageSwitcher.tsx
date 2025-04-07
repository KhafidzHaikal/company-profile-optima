"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuItem,
	DropdownMenuTrigger,
	DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import { locales } from "@/utils/i18n";

const LanguageSwitcher = () => {
	const router = useRouter();
	const pathname = usePathname();
	const locale = useLocale();

	const changeLanguage = (newLocale: string) => {
		const pathWithoutLocale = pathname.replace(/^\/(en|id)/, "");
		const newPath = `/${newLocale}${pathWithoutLocale}`;
		router.push(newPath);
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline">
					<Globe className="w-5 h-5 mr-2" />
					{locale === "id" ? "Indonesian" : "English"}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				{locales.map((loc) => (
					<DropdownMenuItem key={loc} onClick={() => changeLanguage(loc)}>
						{loc === "en" ? "English" : "Indonesian"}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default LanguageSwitcher;
