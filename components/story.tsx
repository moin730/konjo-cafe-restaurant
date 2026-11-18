import Image from "next/image";
import { Parallax, Reveal, RevealLines } from "@/components/motion";
import { MesobMedallion } from "@/components/mesob";
import { images } from "@/lib/site";

export function Story() {
  return (
    <section
      id="story"
      aria-labelledby="story-title"
      className="mesob-texture relative overflow-hidden py-24 sm:py-32 lg:py-40"
    >
      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-8 lg:grid-cols-12 lg:gap-10">
        {/* Images: asymmetric stack */}
        <div className="relative lg:col-span-6">
          <Reveal>
            <Parallax
              strength={50}
              className="aspect-[4/5] w-[86%] rounded-t-[12rem] rounded-b-[2rem] sm:w-[78%]"
            >
              <Image
                src={images.story.src}
                alt={images.story.alt}
                fill
                sizes="(min-width:1024px) 40vw, 85vw"
                className="object-cover"
              />
            </Parallax>
          </Reveal>
          <Reveal
            delay={0.15}
            className="absolute right-0 bottom-[-2.5rem] w-[46%] sm:bottom-[-3rem] sm:w-[40%]"
          >
            <div className="relative aspect-square overflow-hidden rounded-full ring-8 ring-cream">
              <Image
                src={images.storyInset.src}
                alt={images.storyInset.alt}
                fill
                sizes="(min-width:1024px) 22vw, 45vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <MesobMedallion className="animate-spin-slow absolute -top-8 right-[8%] size-24 sm:size-32" />
        </div>

        {/* Copy */}
        <div className="flex flex-col justify-center pt-10 lg:col-span-5 lg:col-start-8 lg:pt-0">
          <Reveal>
            <p className="mb-6 text-xs font-semibold tracking-[0.25em] text-gold-ink uppercase">
              Our story · ታሪካችን
            </p>
          </Reveal>
          <RevealLines
            id="story-title"
            className="font-display text-[clamp(2.6rem,6vw,4.75rem)] leading-[0.95] font-medium"
            lines={[
              "A family table,",
              <span key="b" className="text-primary italic">
                and a pot of coffee
              </span>,
              "always on.",
            ]}
          />
          <Reveal delay={0.1}>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-espresso/80">
              <p>
                Konjo is run by husband and wife{" "}
                <strong className="font-semibold text-espresso">Abdul and Rozenn</strong>, who
                have been feeding Footscray since the mid-2000s. It began next door to their
                Ethiopian jewellery and craft shop, as a few tables and a jebena that never got
                a chance to cool down.
              </p>
              <p>
                In Ethiopia coffee is more than a drink. It&apos;s how neighbours are welcomed,
                news is shared and friendships are kept. That&apos;s the heart of Konjo:
                unhurried, generous and made to share. We still blend our own berbere by hand.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-espresso/15 pt-6">
              {[
                ["~20", "years in Footscray"],
                ["1", "family kitchen"],
                ["100%", "house-made berbere"],
              ].map(([k, v]) => (
                <div key={v}>
                  <dt className="sr-only">{v}</dt>
                  <dd className="font-display text-3xl text-primary sm:text-4xl">{k}</dd>
                  <dd className="mt-1 text-sm text-muted">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
