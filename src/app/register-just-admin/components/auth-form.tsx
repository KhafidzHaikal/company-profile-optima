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
import Swal from "sweetalert2";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaEyeSlash, FaEye } from "react-icons/fa";

export function RegisterForm({
	className,
	...props
}: React.ComponentPropsWithoutRef<"div">) {
	const [showPassword, setShowPassword] = useState(false);
	const [username, setUsername] = useState("");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();

	async function handleRegister(event: React.FormEvent) {
		event.preventDefault();
		const response = await fetch("/api/auth", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				username,
				name,
				email,
				password,
				action: "register",
			}),
		});
		const data = await response.json();

		if (data.success) {
			Swal.fire({
				icon: "success",
				title: "Registration Successful",
				text: `Welcome, ${data.user.name}!`,
				timer: 1000,
				showConfirmButton: false,
			});

			// Redirect to login page
			setTimeout(() => {
				router.push("/login-admin-optima");
			}, 1000);
		} else {
			Swal.fire({
				icon: "error",
				title: "Registration Failed",
				text: data.message,
			});
		}
	}
	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader>
					<CardTitle className="text-2xl">Register</CardTitle>
					<CardDescription>
						Enter your username below to Register to your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleRegister}>
						<div className="flex flex-col gap-6">
							<div className="grid gap-2">
								<Label htmlFor="name">Name</Label>
								<Input
									id="name"
									type="text"
									placeholder=""
									value={name}
									onChange={(e) => setName(e.target.value)}
									required
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="username">Username</Label>
								<Input
									id="username"
									type="text"
									placeholder=""
									value={username}
									onChange={(e) => setUsername(e.target.value)}
									required
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									placeholder=""
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
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
