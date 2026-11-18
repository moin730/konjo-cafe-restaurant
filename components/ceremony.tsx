import Image from "next/image";
import { ceremonySteps } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Ceremony() {
  return (
    <section id="ceremony" aria-labelledby="ceremony-title" className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="ceremony-title" className="font-display text-4xl text-espresso sm:text-5xl">
            The Coffee Ceremony
          </h2>
          <p className="max-w-sm text-sm leading-relaxed text-espresso/70">
            Raw beans roasted, ground and brewed in clay, right at your table. Jebana coffee is
            $5 per person.
          </p>
        </div>

        <ol className="mt-8 grid gap-4 sm:gap-5 md:grid-cols-3">
          {ceremonySteps.map((step, i) => {
            const red = i !== 1;
            return (
              <li
                key={step.n}
                className={cn(
                  "flex flex-col rounded-[1.5rem] p-6 sm:p-7",
                  red ? "bg-primary text-primary-foreground" : "bg-cream-2 text-espresso ring-1 ring-primary/20",
                )}
              >
                <div className="relative mx-auto aspect-square w-3/4 overflow-hidden rounded-full ring-8 ring-white/90">
                  <Image
                    src={step.image.src}
                    alt={step.image.alt}
                    fill
                    sizes="16rem"
                    className="object-cover"
                  />
                </div>
                <h3
                  className={cn(
                    "font-display mt-7 text-3xl",
                    red ? "text-espresso" : "text-secondary",
                  )}
                >
                  {step.n} · {step.title}
                </h3>
                <p className={cn("mt-2 text-sm leading-relaxed", red ? "text-espresso/80" : "text-espresso/75")}>
                  {step.body}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
