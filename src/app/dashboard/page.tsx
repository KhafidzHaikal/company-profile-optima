"use client";

import { useUser } from "@/components/context/UserContext";
import { AppSidebar } from "@/components/sidebar/SidebarAdmin";
import {
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbSeparator,
	BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import React, { useEffect, useState } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import customSwal, { successSwal, errorSwal, confirmSwal } from "@/lib/sweetalert";
import Image from "next/image";

type ImageItem = {
	id: number;
	source: string;
};

export default function DashboardPage() {
	const [file, setFile] = useState<File | null>(null);
	const [isUploading, setIsUploading] = useState(false);
	const [images, setImages] = useState<ImageItem[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch("/api/images");
			const data = await res.json();
			setImages(data);
		};
		fetchData();
	}, []);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selected = e.target.files?.[0];
		if (!selected) return;
	
		const allowedTypes = ["image/png", "image/jpeg"];
		if (!allowedTypes.includes(selected.type)) {
			errorSwal.fire({
				icon: "error",
				title: "Invalid file type",
				text: "Only PNG and JPG images are allowed.",
			});
			return;
		}
	
		setFile(selected);
	};
	
	const handleUpload = async () => {
		if (!file) {
			customSwal.fire({
				icon: "warning",
				title: "No file selected",
				text: "Please choose an image before uploading.",
			});
			return;
		}

		setIsUploading(true);

		const formData = new FormData();
		formData.append("file", file);

		try {
			const res = await fetch("/api/images", {
				method: "POST",
				body: formData,
			});

			if (res.ok) {
				const data = await res.json();

				successSwal.fire({
					icon: "success",
					title: "Upload Successful",
					text: "Your image has been uploaded!",
					timer: 2000,
					showConfirmButton: false,
				});

				console.log("Image uploaded:", data);
				setFile(null); // reset file

				// 🔁 Refetch image list and update table
				const updated = await fetch("/api/images");
				const newImages = await updated.json();
				setImages(newImages);
			} else {
				errorSwal.fire({
					icon: "error",
					title: "Upload Failed",
					text: "Something went wrong. Try again.",
				});
			}
		} catch (err) {
			console.error("Error uploading image:", err);
			errorSwal.fire({
				icon: "error",
				title: "Upload Error",
				text: "Unable to upload the image.",
			});
		} finally {
			setIsUploading(false);
		}
	};

	const deleteImage = async (id: number) => {
		const confirm = await confirmSwal.fire({
			title: "Delete this image?",
			text: "This action cannot be undone!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#d33",
			cancelButtonColor: "#3085d6",
			confirmButtonText: "Yes, delete it!",
		});

		if (!confirm.isConfirmed) return;

		try {
			const res = await fetch(`/api/images?id=${id}`, {
				method: "DELETE",
			});

			if (res.ok) {
				successSwal.fire({
					icon: "success",
					title: "Deleted!",
					text: "Image has been removed.",
					timer: 1500,
					showConfirmButton: false,
				});
				setImages((prev) => prev.filter((img) => img.id !== id));
			} else {
				errorSwal.fire({
					icon: "error",
					title: "Delete Failed",
					text: "Something went wrong.",
				});
			}
		} catch (err) {
			console.error("Delete error:", err);
			errorSwal.fire({
				icon: "error",
				title: "Error",
				text: "Unable to delete the image.",
			});
		}
	};

	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
					<SidebarTrigger className="-ml-1" />
					<Separator orientation="vertical" className="mr-2 h-4" />
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem className="hidden md:block">
								<BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator className="hidden md:block" />
							<BreadcrumbItem>
								<BreadcrumbPage>Data Images</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</header>
				<div className="flex flex-1 flex-col gap-6 p-6">
					<div className="flex items-center justify-between">
						<div>
							<h1 className="text-3xl font-bold tracking-tight">Images</h1>
							<p className="text-muted-foreground">Manage your image gallery</p>
						</div>
						<Dialog>
							<DialogTrigger asChild>
								<Button className="bg-yellow-400 hover:bg-yellow-500 text-black">Add Image</Button>
							</DialogTrigger>
							<DialogContent className="sm:max-w-[425px]">
								<DialogHeader>
									<DialogTitle>Add Image</DialogTitle>
									<DialogDescription>
										Upload and store your image
									</DialogDescription>
								</DialogHeader>
								<div className="grid w-full max-w-sm items-center gap-1.5">
									<Label htmlFor="picture">Picture</Label>
									<Input
										id="picture"
										type="file"
										accept=".png, .jpg, .jpeg"
										onChange={handleFileChange}
									/>
								</div>
								<DialogFooter>
									<Button onClick={handleUpload} disabled={isUploading}>
										{isUploading ? "Uploading..." : "Save"}
									</Button>
								</DialogFooter>
							</DialogContent>
						</Dialog>
					</div>
					<div className="rounded-md border">
						<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[150px]">Preview</TableHead>
								<TableHead>Source</TableHead>
								<TableHead className="text-right">Action</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{images.map((img) => (
								<TableRow key={img.id}>
									<TableCell>
										<Image
											src={img.source}
											alt={`Image ${img.id}`}
											width={100}
											height={100}
											className="rounded-md object-cover"
										/>
									</TableCell>
									<TableCell>{img.source}</TableCell>
									<TableCell className="text-right">
										<Button
											variant="destructive"
											onClick={() => deleteImage(img.id)}>
											Delete
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
						{images.length === 0 && (
							<TableFooter>
								<TableRow>
									<TableCell
										colSpan={3}
										className="text-center text-muted-foreground">
										No images found.
									</TableCell>
								</TableRow>
							</TableFooter>
						)}
						</Table>
					</div>
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
