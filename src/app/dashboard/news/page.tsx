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

type NewsItem = {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  image: string;
  createdAt: string;
  updatedAt: string;
};

export default function NewsAdminPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    image: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    const res = await fetch("/api/news");
    const data = await res.json();
    setNews(data);
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.content || !formData.excerpt) {
      customSwal.fire({
        icon: "warning",
        title: "Missing fields",
        text: "Please fill all required fields.",
      });
      return;
    }

    setIsUploading(true);
    let imageUrl = formData.image;

    try {
      // Upload image if file is selected
      if (imageFile) {
        const imageFormData = new FormData();
        imageFormData.append("file", imageFile);

        const imageRes = await fetch("/api/news-images", {
          method: "POST",
          body: imageFormData,
        });

        if (imageRes.ok) {
          const imageData = await imageRes.json();
          imageUrl = imageData.imageUrl;
        } else {
          throw new Error("Failed to upload image");
        }
      }

      const method = editingNews ? "PUT" : "POST";
      const body = editingNews 
        ? { ...formData, id: editingNews.id, image: imageUrl }
        : { ...formData, image: imageUrl };

      const res = await fetch("/api/news", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        successSwal.fire({
          icon: "success",
          title: editingNews ? "Updated!" : "Created!",
          text: `News ${editingNews ? "updated" : "created"} successfully.`,
          timer: 2000,
          showConfirmButton: false,
        });
        
        setIsDialogOpen(false);
        setEditingNews(null);
        setFormData({ title: "", content: "", excerpt: "", image: "" });
        setImageFile(null);
        fetchNews();
      } else {
        throw new Error("Failed to save news");
      }
    } catch {
      errorSwal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to save news.",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleEdit = (newsItem: NewsItem) => {
    setEditingNews(newsItem);
    setFormData({
      title: newsItem.title,
      content: newsItem.content,
      excerpt: newsItem.excerpt,
      image: newsItem.image,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    const confirm = await confirmSwal.fire({
      title: "Delete this news?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(`/api/news?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        successSwal.fire({
          icon: "success",
          title: "Deleted!",
          text: "News has been removed.",
          timer: 1500,
          showConfirmButton: false,
        });
        fetchNews();
      } else {
        throw new Error("Failed to delete news");
      }
    } catch {
      errorSwal.fire({
        icon: "error",
        title: "Error",
        text: "Unable to delete the news.",
      });
    }
  };

  const resetForm = () => {
    setEditingNews(null);
    setFormData({ title: "", content: "", excerpt: "", image: "" });
    setImageFile(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (!allowedTypes.includes(file.type)) {
        errorSwal.fire({
          icon: "error",
          title: "Invalid file type",
          text: "Only PNG and JPG images are allowed.",
        });
        return;
      }
      setImageFile(file);
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
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>News Management</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-6 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">News Management</h1>
              <p className="text-muted-foreground">Create and manage news articles</p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={(open) => {
              setIsDialogOpen(open);
              if (!open) resetForm();
            }}>
              <DialogTrigger asChild>
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-black">Add News</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>{editingNews ? "Edit News" : "Add News"}</DialogTitle>
                  <DialogDescription>
                    {editingNews ? "Update news article" : "Create a new news article"}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Enter news title"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="excerpt">Excerpt *</Label>
                    <Input
                      id="excerpt"
                      value={formData.excerpt}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      placeholder="Brief description"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="image">Image</Label>
                    <Input
                      id="image"
                      type="file"
                      accept=".png,.jpg,.jpeg"
                      onChange={handleImageChange}
                    />
                    {(formData.image || imageFile) && (
                      <p className="text-sm text-muted-foreground">
                        {imageFile ? `Selected: ${imageFile.name}` : `Current: ${formData.image}`}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="content">Content *</Label>
                    <textarea
                      id="content"
                      className="min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      placeholder="Enter news content"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleSubmit} disabled={isUploading}>
                    {isUploading ? "Uploading..." : editingNews ? "Update" : "Create"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="rounded-md border">
            <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Excerpt</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {news.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell>{item.excerpt}</TableCell>
                  <TableCell>{new Date(item.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            </Table>
            {news.length === 0 && (
              <div className="text-center text-muted-foreground py-8">
                No news articles found.
              </div>
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}