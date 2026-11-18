import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Build an Unsplash CDN URL from a photo id. lib/image-loader.ts adds sizing. */
export function unsplash(id: string) {
  return `https://images.unsplash.com/photo-${id}`;
}
