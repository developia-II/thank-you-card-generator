"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import ImageGallery from "@/components/image-gallery";
import CardPreview from "@/components/card-preview";
import FontCustomizer from "@/components/font-customizer";

export default function Home() {
	const [selectedImage, setSelectedImage] = useState<string | null>(null);
	const [userName, setUserName] = useState("");
	const [fontSize, setFontSize] = useState(48);
	const [fontFamily, setFontFamily] = useState("serif");
	const [textColor, setTextColor] = useState("#ffffff");
	const cardPreviewRef = useRef<HTMLDivElement>(null);

	const handleDownload = async (format: "png" | "jpg") => {
		if (!selectedImage) return;

		const width = 1200;
		const height = 1500; // 4:5
		const canvas = document.createElement("canvas");
		canvas.width = width;
		canvas.height = height;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		if (format === "jpg") {
			ctx.fillStyle = "#ffffff";
			ctx.fillRect(0, 0, width, height);
		}

		const img = new Image();
		img.crossOrigin = "anonymous";
		img.referrerPolicy = "no-referrer";
		img.src = selectedImage;

		await new Promise<void>((resolve, reject) => {
			img.onload = () => resolve();
			img.onerror = () => reject(new Error("Failed to load image"));
		});

		const imgAspect = img.width / img.height;
		const canvasAspect = width / height; // 0.8
		let drawW = width;
		let drawH = height;
		let dx = 0;
		let dy = 0;
		if (imgAspect > canvasAspect) {
			drawH = height;
			drawW = Math.round(height * imgAspect);
			dx = Math.round((width - drawW) / 2);
			dy = 0;
		} else {
			drawW = width;
			drawH = Math.round(width / imgAspect);
			dx = 0;
			dy = Math.round((height - drawH) / 2);
		}
		ctx.drawImage(img, dx, dy, drawW, drawH);

		ctx.fillStyle = "rgba(0,0,0,0.2)";
		ctx.fillRect(0, 0, width, height);

		const family =
			fontFamily === "serif"
				? "Georgia, serif"
				: fontFamily === "mono"
				? "monospace"
				: "sans-serif";

		// Draw THANK YOU at top
		ctx.fillStyle = textColor;
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.shadowColor = "rgba(0,0,0,0.3)";
		ctx.shadowBlur = 4;
		ctx.shadowOffsetX = 2;
		ctx.shadowOffsetY = 2;
		ctx.font = `bold ${Math.round(fontSize * 0.6 * 2)}px ${family}`; // scale up from preview
		ctx.fillText("THANK YOU", width / 2, Math.round(height * 0.12));

		ctx.font = `500 ${Math.round(fontSize * 2)}px ${family}`;
		const bottomY = Math.round(height * 0.88);
		const maxWidth = Math.round(width * 0.9);

		let size = Math.round(fontSize * 2);
		while (size > 12) {
			ctx.font = `500 ${size}px ${family}`;
			const metrics = ctx.measureText(userName || "Your Name");
			if (metrics.width <= maxWidth) break;
			size -= 2;
		}
		ctx.fillText(userName || "Your Name", width / 2, bottomY);

		const link = document.createElement("a");
		link.href = canvas.toDataURL(`image/${format}`);
		link.download = `thank-you-card.${format}`;
		link.click();
	};

	return (
		<main className="min-h-screen bg-background">
			<header className="border-b border-border bg-card">
				<div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
					<h1 className="text-4xl font-bold text-foreground">
						Thank You Card Generator
					</h1>
					<p className="text-muted-foreground mt-2">
						Create personalized thank you cards with beautiful images
					</p>
				</div>
			</header>

			<div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					<div className="lg:col-span-1 space-y-6">
						<Card className="p-6">
							<h2 className="text-xl font-semibold text-foreground mb-4">
								Select Image
							</h2>
							<ImageGallery
								onSelectImage={setSelectedImage}
								selectedImage={selectedImage}
							/>
						</Card>

						<Card className="p-6">
							<h2 className="text-xl font-semibold text-foreground mb-4">
								Your Name
							</h2>
							<Input
								type="text"
								placeholder="Enter your name"
								value={userName}
								onChange={(e) => setUserName(e.target.value)}
								className="w-full"
							/>
						</Card>

						<Card className="p-6">
							<h2 className="text-xl font-semibold text-foreground mb-4">
								Customize Text
							</h2>
							<FontCustomizer
								fontSize={fontSize}
								setFontSize={setFontSize}
								fontFamily={fontFamily}
								setFontFamily={setFontFamily}
								textColor={textColor}
								setTextColor={setTextColor}
							/>
						</Card>
					</div>

					<div className="lg:col-span-2 space-y-6">
						<Card className="p-6">
							<h2 className="text-xl font-semibold text-foreground mb-4">
								Preview
							</h2>
							<CardPreview
								ref={cardPreviewRef}
								image={selectedImage}
								name={userName}
								fontSize={fontSize}
								fontFamily={fontFamily}
								textColor={textColor}
							/>
						</Card>

						{selectedImage && userName && (
							<div className="flex gap-4">
								<Button
									onClick={() => handleDownload("png")}
									className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
								>
									Download as PNG
								</Button>
								<Button
									onClick={() => handleDownload("jpg")}
									className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
								>
									Download as JPG
								</Button>
							</div>
						)}
					</div>
				</div>
			</div>
		</main>
	);
}
