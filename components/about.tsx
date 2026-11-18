import Image from "next/image";
import { images } from "@/lib/site";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="px-3 sm:px-4">
      <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[1.75rem] bg-cream-2 lg:grid-cols-2">
        <div className="flex flex-col justify-center p-7 sm:p-12 lg:p-16">
          <h2
            id="about-title"
            className="font-display text-[clamp(3rem,7vw,5.5rem)] leading-[0.95] text-secondary"
          >
            Made by
            <br />
            Family
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-espresso/80 sm:text-lg">
            Konjo is run by husband and wife Abdul and Rozenn, who have been feeding Footscray
            since the mid-2000s. Everything is cooked from scratch, the berbere is blended by
            hand, and the jebena is always warm.
          </p>
          <a
            href="#ceremony"
            className="mt-7 inline-flex h-11 w-fit items-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
          >
            The coffee ceremony
          </a>
        </div>
        <div className="relative min-h-80 lg:min-h-[34rem]">
          <Image
            src={images.story.src}
            alt={images.story.alt}
            fill
            sizes="(min-width:1024px) 40rem, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
