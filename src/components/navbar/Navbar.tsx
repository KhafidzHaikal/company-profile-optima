/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useTranslations } from "next-intl";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import LanguageSwitcher from "../LanguageSwitcher";
import { ModeToggle } from "../button/ButtonTheme";
import Image from "next/image";
import { HumburgerButton } from "../sidebar/Sidebar";
import { cn } from "@/lib/utils";

const components: { title: string; href: string; description: string }[] = [
	{
		title: "Abu Dhabi",
		href: "/destination/abu-dhabi",
		description: "Abu Dhabi Tourism",
	},
	{
		title: "Dubai",
		href: "/destination/dubai",
		description: "Dubai Tourism",
	},
];

const Navbar = () => {
	const t = useTranslations();

	return (
		<>
			{/* Mobile Navbar */}
			<nav className="flex z-50 fixed w-full top-0 bg-background/70 backdrop-blur-sm shadow-sm items-center justify-between p-4 lg:hidden">
				<Link href="/" aria-label="Optima Logo">
					<Image
						src="/images/logo.png"
						alt="Optima Logo"
						width={100}
						height={30}
						priority
					/>
				</Link>
				<HumburgerButton />
			</nav>

			{/* Desktop Navbar */}
			<nav className="hidden lg:flex fixed top-0 z-50 w-full bg-background/70 backdrop-blur-sm shadow-sm">
				<div className="container mx-12 lg:mx-32 py-2 flex items-center justify-between">
					<Link href="/" aria-label="Optima Logo">
						<Image
							src="/images/logo.png"
							alt="Optima Logo"
							width={80}
							height={40}
							priority
						/>
					</Link>

					<NavigationMenu>
						<NavigationMenuList>
							<NavigationMenuItem>
								<NavigationMenuLink asChild>
									<Link href="/">{t("home")}</Link>
								</NavigationMenuLink>
							</NavigationMenuItem>

							<NavigationMenuItem>
								<NavigationMenuLink asChild>
									<Link href="/package">{t("package")}</Link>
								</NavigationMenuLink>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<NavigationMenuTrigger>{t("destination")}</NavigationMenuTrigger>
								<NavigationMenuContent>
									<ul className="grid gap-3 p-4 w-[250px]">
										{components.map((component) => (
											<ListItem
												key={component.title}
												title={component.title}
												href={component.href}
												description={component.description}
											/>
										))}
									</ul>
								</NavigationMenuContent>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<NavigationMenuLink asChild>
									<Link href="/portfolio">{t("portfolio")}</Link>
								</NavigationMenuLink>
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>

					<div className="flex items-center gap-4">
						<LanguageSwitcher />
						<ModeToggle />
					</div>
				</div>
			</nav>
		</>
	);
};

const ListItem = ({ title, href, description }: any) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<Link
					href={href}
					className={cn(
						"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
					)}>
					<p className="text-sm font-bold leading-none">{title}</p>
					<p className="line-clamp-2 font-normal text-sm leading-snug text-muted-foreground">
						{description}
					</p>
				</Link>
			</NavigationMenuLink>
		</li>
	);
};
ListItem.displayName = "ListItem";

export default Navbar;
