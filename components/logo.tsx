import { cn } from "@/lib/utils";

/**
 * Official Konjo wordmark (public/konjo-logo.svg, from konjo.com.au).
 * Drawn as a CSS mask so it takes the current text colour: navy on the orange
 * header, orange on light backgrounds.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span
      role="img"
      aria-label="Konjo"
      className={cn("block aspect-[92/51] h-10 bg-current", className)}
      style={{
        mask: "url(/konjo-logo.svg) center / contain no-repeat",
        WebkitMask: "url(/konjo-logo.svg) center / contain no-repeat",
      }}
    />
  );
}
