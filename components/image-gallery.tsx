"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ImageGalleryProps {
	onSelectImage: (url: string) => void;
	selectedImage: string | null;
}

interface UnsplashImageUrls {
	regular: string;
}

interface UnsplashPhoto {
	urls: UnsplashImageUrls;
}

interface UnsplashSearchResponse {
	results: UnsplashPhoto[];
}

export default function ImageGallery({
	onSelectImage,
	selectedImage,
}: ImageGalleryProps) {
	const [images, setImages] = useState<string[]>([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);

	const [debouncedQuery, setDebouncedQuery] = useState("");

	const fetchImages = async (query = "", pageNum = 1) => {
		setLoading(true);
		try {
			if (!query) {
				const response = await fetch(`/api/unsplash/random`);
				const data: unknown = await response.json();
				const urls = Array.isArray(data)
					? (data as UnsplashPhoto[]).map((img) => img.urls.regular)
					: [];
				setImages(urls);
			} else {
				const params = new URLSearchParams({
					query,
					page: String(pageNum),
					per_page: "4",
				});
				const response = await fetch(
					`/api/unsplash/search?${params.toString()}`
				);
				const data: UnsplashSearchResponse = await response.json();
				setImages(data.results.map((img) => img.urls.regular));
			}
		} catch (error) {
			console.error("Error fetching images:", error);

			setImages([
				"/lush-forest-stream.png",
				"/vast-mountain-valley.png",
				"/sunset.jpg",
				"/colorful-flower-arrangement.png",
			]);
		}
		setLoading(false);
	};

	useEffect(() => {
		void fetchImages();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		const t = setTimeout(() => setDebouncedQuery(searchQuery), 400);
		return () => clearTimeout(t);
	}, [searchQuery]);

	useEffect(() => {
		if (debouncedQuery === "") {
			setPage(1);
			void fetchImages("", 1);
			return;
		}
		setPage(1);
		void fetchImages(debouncedQuery, 1);
	}, [debouncedQuery]);

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		setPage(1);
		fetchImages(searchQuery, 1);
	};

	const handleNextPage = () => {
		const newPage = page + 1;
		setPage(newPage);
		fetchImages(searchQuery, newPage);
	};

	const handlePrevPage = () => {
		if (page > 1) {
			const newPage = page - 1;
			setPage(newPage);
			fetchImages(searchQuery, newPage);
		}
	};

	return (
		<div className="space-y-4">
			<form onSubmit={handleSearch} className="flex gap-2">
				<Input
					type="text"
					placeholder="Search images..."
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					className="flex-1"
				/>
				<Button
					type="submit"
					disabled={loading}
					className="bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-60"
				>
					Search
				</Button>
			</form>

			{loading ? (
				<div className="grid grid-cols-2 gap-3">
					{Array.from({ length: 4 }).map((_, i) => (
						<div
							key={i}
							className="relative aspect-square rounded-lg border-2 border-border animate-pulse bg-muted"
						/>
					))}
				</div>
			) : (
				<div className="grid grid-cols-2 gap-3">
					{images.map((image, index) => (
						<button
							key={index}
							onClick={() => onSelectImage(image)}
							className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
								selectedImage === image
									? "border-primary ring-2 ring-primary/50"
									: "border-border hover:border-primary/50"
							}`}
						>
							<Image
								fill
								sizes="(min-width: 1024px) 200px, 40vw"
								quality={85}
								src={image || "/placeholder.svg"}
								alt={`Gallery image ${index + 1}`}
								className="object-cover"
							/>
						</button>
					))}
				</div>
			)}

			<div className="flex gap-2 justify-between">
				<Button
					onClick={handlePrevPage}
					disabled={page === 1 || loading}
					variant="outline"
					className="flex-1 bg-transparent"
				>
					Previous
				</Button>
				<span className="flex items-center text-sm text-muted-foreground">
					Page {page}
				</span>
				<Button
					onClick={handleNextPage}
					disabled={loading}
					variant="outline"
					className="flex-1 bg-transparent"
				>
					Next
				</Button>
			</div>
		</div>
	);
}
