"use client";

import * as React from "react";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
} from "@/components/ui/sidebar";
import { ModeToggle } from "../button/ButtonTheme";
import LogoutButton from "../button/LogoutButton";
import Image from "next/image";
import Link from "next/link";
// import { Images, Newspaper } from "lucide-react";
import { Images } from "lucide-react";

// Sample data
const data = {
	navMain: [
		{
			title: "Content Management",
			url: "#",
			items: [
				{
					title: "Images",
					url: "/dashboard",
					isActive: false,
					icon: Images,
				},
				// {
				// 	title: "News",
				// 	url: "/dashboard/news",
				// 	isActive: false,
				// 	icon: Newspaper,
				// },
			],
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar {...props}>
			<SidebarHeader className="border-b px-6 py-4">
				<div className="flex items-center gap-3">
					<Image
						src="/images/logo.png"
						alt="Optima Logo"
						width={40}
						height={20}
					/>
					<div>
						<h1 className="font-bold text-lg">Optima Admin</h1>
						<p className="text-xs text-muted-foreground">Travel Management</p>
					</div>
				</div>
			</SidebarHeader>

			<SidebarContent className="flex flex-col justify-between h-full">
				{/* Navigation */}
				<div>
					{data.navMain.map((item) => (
						<SidebarGroup key={item.title}>
							<SidebarGroupLabel>{item.title}</SidebarGroupLabel>
							<SidebarGroupContent>
								<SidebarMenu>
									{item.items.map((subItem) => (
										<SidebarMenuItem key={subItem.title}>
											<SidebarMenuButton asChild isActive={subItem.isActive}>
												<Link href={subItem.url} className="flex items-center gap-3">
													<subItem.icon className="h-4 w-4" />
													{subItem.title}
												</Link>
											</SidebarMenuButton>
										</SidebarMenuItem>
									))}
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup>
					))}
				</div>

				{/* Footer for toggles */}
				<div className="mt-auto border-t px-4 py-4">
					<div className="flex items-center justify-between mb-3">
						<span className="text-sm font-medium">Settings</span>
						<ModeToggle />
					</div>
					<LogoutButton />
				</div>
			</SidebarContent>

			<SidebarRail />
		</Sidebar>
	);
}
