# Thank You Card Generator

Create personalized "Thank You" cards using Unsplash images. Select from four random photos, customize text (font, size, color), preview in a responsive 4:5 frame, and download as PNG or JPG.

## Demo

- Live Site: [Vercel](https://thank-you-card-generator-pearl.vercel.app/)
- Repository: [GitHub](https://github.com/developia-II/thank-you-card-generator.git)

## Features

- Four random Unsplash images on load (via server API route)
- Image search with live debounce and pagination
- Custom overlay text: “THANK YOU” (top) and your name (bottom)
- Font family options: Sans, Serif, Monospace
- Adjustable font size and color
- Download as PNG or JPG (Canvas-based export)
- Responsive preview with strict 4:5 aspect ratio (≥ 20% viewport width)
- TypeScript + Next.js App Router + Tailwind + shadcn/ui

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS + shadcn/ui components
- Unsplash API (Random + Search)

## Getting Started

### 1) Prerequisites

- Node.js 18+
- Unsplash developer account and an application Access Key

### 2) Environment Variables

Create `.env.local` in the project root:

```
UNSPLASH_ACCESS_KEY=your_unsplash_access_key
```

### 3) Install & Run

```
npm install
npm run dev
```

Open http://localhost:3000

## Project Structure

```
app/
  api/
    unsplash/
      random/route.ts   # 4 random photos (server-side)
      search/route.ts   # search with pagination (server-side)
  page.tsx              # main UI and Canvas download
components/
  image-gallery.tsx     # gallery, live search + pagination
  card-preview.tsx      # 4:5 responsive preview with overlay texts
  font-customizer.tsx   # font size/family/color controls
```

## How It Works

- On load, the gallery requests `/api/unsplash/random` for 4 random photos.
- Searching triggers `/api/unsplash/search?query=...&page=...` with debounce and pagination.
- Preview overlays “THANK YOU” and the user name; sizing and families reflect the controls.
- Download uses a Canvas renderer to avoid DOM/CSS color parsing issues and guarantees a 4:5 image.

## Security Notes

- The Unsplash Access Key is never exposed in the client; requests are proxied via Next.js API routes that read `process.env.UNSPLASH_ACCESS_KEY`.

## Deployment

- Recommended: Vercel
  - Add `UNSPLASH_ACCESS_KEY` in the project’s Environment Variables (Production/Preview)
  - Deploy the repository
- Ensure `next.config.ts` allows `images.unsplash.com` in `images.remotePatterns` for Next/Image.

## Assessment Checklist

- Image Selection: 4 random images from Unsplash (Random API)
- Personalization: “THANK YOU” top + user name bottom (customizable font/size/color)
- Downloadable Image: PNG/JPG via Canvas export
- Dimensions: 4:5 ratio, preview ≥ 20% of screen width
- Image Search: Live as-you-type with debounce + pagination
- UI/UX: Responsive, modern styling (Tailwind + shadcn/ui)
- Submission: Hosted link + repository link
- Bonus: TypeScript + font type and color selection

## Known Considerations

- Some Unsplash images can be slow to load; a skeleton state appears while loading.
- If a specific image fails CORS for drawImage, try another (rare).
