"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { FaEyeSlash, FaEye } from "react-icons/fa";

export function LoginForm({
	className,
	...props
}: React.ComponentPropsWithoutRef<"div">) {
	const [showPassword, setShowPassword] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();

	async function handleLogin(event: React.FormEvent) {
		event.preventDefault();
		const response = await fetch("/api/auth", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ username, password, action: "login" }),
		});
		const data = await response.json();
		if (data.success) {
			Swal.fire({
				icon: "success",
				title: "Login Successful",
				text: `Welcome back, ${data.user?.name || username}!`, // Use `username` as a fallback
				timer: 1000,
				showConfirmButton: false,
			});

			// sessionStorage.setItem("token", data.token);
			const now = Date.now();
			const twelveHours = 1 * 60 * 60 * 1000; // 12 hours in ms
			const expiry = now + twelveHours;

			localStorage.setItem("token", data.token);
			localStorage.setItem("tokenExpiry", String(expiry));
			localStorage.setItem("user", JSON.stringify(data.user));

			setTimeout(() => {
				router.replace("/dashboard");
			}, 1000);
		} else {
			Swal.fire({
				icon: "error",
				title: "Login Failed",
				text: data.message,
			});
		}
	}
	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader>
					<CardTitle className="text-2xl">Login</CardTitle>
					<CardDescription>
						Enter your username below to login to your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleLogin}>
						<div className="flex flex-col gap-6">
							<div className="grid gap-2">
								<Label htmlFor="username">Username</Label>
								<Input
									id="username"
									type="text"
									placeholder=""
									required
									value={username}
									onChange={(e) => setUsername(e.target.value)}
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="password">Password</Label>
								<div className="relative">
									<Input
										id="password"
										type={showPassword ? "text" : "password"}
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										required
										className="pr-10"
									/>
									<button
										type="button"
										onClick={() => setShowPassword(!showPassword)}
										className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground dark:text-white"
										aria-label="Toggle password visibility"
										title={showPassword ? "Hide password" : "Show password"}>
										{showPassword ? <FaEyeSlash /> : <FaEye />}
									</button>
								</div>
							</div>

							<Button type="submit" className="w-full">
								Login
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
