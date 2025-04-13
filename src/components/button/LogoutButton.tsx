"use client";

import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function LogoutButton() {
	const router = useRouter();

	const logout = () => {
		Swal.fire({
			title: "Are you sure?",
			text: "You will be logged out.",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, logout",
		}).then((result) => {
			if (result.isConfirmed) {
				localStorage.removeItem("token");
				localStorage.removeItem("tokenExpiry");
				localStorage.removeItem("user");

				Swal.fire({
					title: "Logged out",
					text: "You have been successfully logged out.",
					icon: "success",
					timer: 1500,
					showConfirmButton: false,
				});

				setTimeout(() => {
					router.push("/login-admin-optima");
				}, 1500);
			}
		});
	};

	return (
		<Button variant="destructive" onClick={logout}>
			Logout
		</Button>
	);
}
