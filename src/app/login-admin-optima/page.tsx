import React from "react";
import { LoginForm } from "./components/auth-form";
import Image from "next/image";
import { ModeToggle } from "@/components/button/ButtonTheme";

export default function LoginPage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-background to-muted">
			<div className="absolute top-4 right-4">
				<ModeToggle />
			</div>
			<div className="flex min-h-screen items-center justify-center p-6">
				<div className="w-full max-w-md space-y-8">
					<div className="text-center">
						<Image
							src="/images/logo.png"
							alt="Optima Logo"
							width={120}
							height={60}
							className="mx-auto mb-4"
							priority
						/>
						<h1 className="text-3xl font-bold text-yellow-400">Admin Panel</h1>
						<p className="text-muted-foreground mt-2">Welcome back to Optima Travel</p>
					</div>
					<LoginForm />
				</div>
			</div>
		</div>
	);
}
