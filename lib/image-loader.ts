"use client";

/**
 * next/image loader. Unsplash is already an image CDN, so we ask it for the exact
 * width directly instead of routing through the Next optimizer (whose server-side
 * fetch to Unsplash was failing intermittently). Local images are served as-is.
 */
export default function imageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  if (src.startsWith("https://images.unsplash.com/")) {
    const url = new URL(src);
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", String(quality ?? 75));
    url.searchParams.set("auto", "format");
    url.searchParams.set("fit", "crop");
    return url.toString();
  }
  return src;
}
