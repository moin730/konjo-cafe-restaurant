import { marqueeWords } from "@/lib/site";
import { MesobDivider } from "@/components/mesob";

function Star() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="mx-6 size-5 shrink-0 text-accent sm:mx-10 sm:size-7">
      <path fill="currentColor" d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z" />
    </svg>
  );
}

export function Marquee() {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {marqueeWords.map((w, i) => (
        <li key={w} className="flex items-center">
          <span
            className={
              i % 2
                ? "font-display text-5xl italic text-accent sm:text-7xl"
                : "font-display text-5xl sm:text-7xl"
            }
          >
            {w}
          </span>
          <Star />
        </li>
      ))}
    </ul>
  );

  return (
    <section id="marquee" aria-label="What we cook" className="bg-primary text-cream">
      <MesobDivider tone="dark" className="opacity-80" />
      <div className="marquee-pause overflow-hidden py-7 sm:py-9">
        <div className="marquee-track animate-marquee flex w-max">
          {row(false)}
          {row(true)}
        </div>
      </div>
      <MesobDivider tone="dark" className="rotate-180 opacity-80" />
    </section>
  );
}
