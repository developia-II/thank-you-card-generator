"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface FontCustomizerProps {
	fontSize: number;
	setFontSize: (size: number) => void;
	fontFamily: string;
	setFontFamily: (family: string) => void;
	textColor: string;
	setTextColor: (color: string) => void;
}

export default function FontCustomizer({
	fontSize,
	setFontSize,
	fontFamily,
	setFontFamily,
	textColor,
	setTextColor,
}: FontCustomizerProps) {
	return (
		<div className="space-y-4">
			<div>
				<Label
					htmlFor="font-size"
					className="text-sm font-medium text-foreground"
				>
					Font Size: {fontSize}px
				</Label>
				<input
					id="font-size"
					type="range"
					min="24"
					max="72"
					value={fontSize}
					onChange={(e) => setFontSize(Number(e.target.value))}
					className="w-full mt-2"
				/>
			</div>

			<div>
				<Label
					htmlFor="font-family"
					className="text-sm font-medium text-foreground"
				>
					Font Style
				</Label>
				<select
					id="font-family"
					value={fontFamily}
					onChange={(e) => setFontFamily(e.target.value)}
					className="w-full mt-2 px-3 py-2 border border-border rounded-md bg-card text-foreground"
				>
					<option value="sans">Sans Serif</option>
					<option value="serif">Serif</option>
					<option value="mono">Monospace</option>
				</select>
			</div>

			<div>
				<Label
					htmlFor="text-color"
					className="text-sm font-medium text-foreground"
				>
					Text Color
				</Label>
				<div className="flex gap-2 mt-2">
					<input
						id="text-color"
						type="color"
						value={textColor}
						onChange={(e) => setTextColor(e.target.value)}
						className="w-12 h-10 rounded-md border border-border cursor-pointer"
					/>
					<Input
						type="text"
						value={textColor}
						onChange={(e) => setTextColor(e.target.value)}
						className="flex-1"
						placeholder="#ffffff"
					/>
				</div>
			</div>
		</div>
	);
}
