"use client";

import Image from "next/image";
import { forwardRef } from "react";

interface CardPreviewProps {
	image: string | null;
	name: string;
	fontSize: number;
	fontFamily: string;
	textColor: string;
}

const CardPreview = forwardRef<HTMLDivElement, CardPreviewProps>(
	({ image, name, fontSize, fontFamily, textColor }, ref) => {
		const aspectRatio = 4 / 5;

		return (
			<div
				id="card-preview"
				ref={ref}
				className="relative mx-auto rounded-lg overflow-hidden shadow-lg"
				style={{
					width: "clamp(20vw, 28vw, 520px)",

					aspectRatio: `${aspectRatio}`,
					height: "auto",
				}}
			>
				{image ? (
					<Image
						height={100}
						width={100}
						src={image || "/placeholder.svg"}
						alt="Card background"
						crossOrigin="anonymous"
						className="absolute inset-0 w-full h-full object-cover"
					/>
				) : (
					<div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
						<p className="text-muted-foreground text-center">Select an image</p>
					</div>
				)}

				<div className="absolute inset-0 bg-black/20" />

				<div className="absolute top-6 left-0 right-0 text-center">
					<p
						style={{
							fontSize: `${fontSize * 0.6}px`,
							fontFamily:
								fontFamily === "serif"
									? "Georgia, serif"
									: fontFamily === "mono"
									? "monospace"
									: "sans-serif",
							color: textColor,
							fontWeight: "bold",
							textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
						}}
					>
						THANK YOU
					</p>
				</div>

				<div className="absolute bottom-6 left-0 right-0 text-center px-4">
					<p
						style={{
							fontSize: `${fontSize}px`,
							fontFamily:
								fontFamily === "serif"
									? "Georgia, serif"
									: fontFamily === "mono"
									? "monospace"
									: "sans-serif",
							color: textColor,
							fontWeight: "500",
							textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
							wordBreak: "break-word",
						}}
					>
						{name || "Your Name"}
					</p>
				</div>
			</div>
		);
	}
);

CardPreview.displayName = "CardPreview";

export default CardPreview;
