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

// Sample data
const data = {
	navMain: [
		{
			title: "Home",
			url: "#",
			items: [
				{
					title: "Images",
					url: "#",
					isActive: true,
				},
			],
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar {...props}>
			<SidebarHeader>
				<h1>Optima Admin</h1>
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
												<a href={subItem.url}>{subItem.title}</a>
											</SidebarMenuButton>
										</SidebarMenuItem>
									))}
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup>
					))}
				</div>

				{/* Footer for toggles */}
				<div className="mt-8 px-4 pb-4">
					<div className="flex items-center justify-between">
						<ModeToggle />
            <LogoutButton />
					</div>
				</div>
			</SidebarContent>

			<SidebarRail />
		</Sidebar>
	);
}
