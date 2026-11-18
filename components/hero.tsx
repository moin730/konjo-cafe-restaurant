"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { images } from "@/lib/site";
import { cn, unsplash } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;
const SLIDE_SECONDS = 6;

const photos = [
  { label: "The food", ...images.hero, position: "object-[50%_60%]" },
  { label: "Coffee ceremony", ...images.ceremony, position: "object-center" },
  {
    label: "Injera",
    src: unsplash("1630861412977-de9bd8944f97"),
    alt: "Hands lifting injera from a woven mesob basket",
    position: "object-center",
  },
];

export function Hero() {
  const reduce = useReducedMotion();
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  // Cycle the photos; restart the timer whenever the photo changes (incl. a dot click).
  React.useEffect(() => {
    if (reduce || paused) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % photos.length), SLIDE_SECONDS * 1000);
    return () => clearTimeout(t);
  }, [index, paused, reduce]);

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: EASE, delay },
  });

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-primary text-espresso lg:min-h-[calc(100svh-4rem)]"
    >
      <div className="grid lg:min-h-[calc(100svh-4rem)] lg:grid-cols-12">
        {/* Copy */}
        <div className="relative z-10 flex flex-col justify-center px-5 pt-8 pb-12 sm:px-8 lg:col-span-7 lg:py-16 lg:pl-12 xl:pl-20">
          <motion.h1
            {...rise(0.05)}
            className="font-display text-[clamp(3.25rem,9vw,8.5rem)] leading-[0.9] tracking-wide uppercase lg:text-[clamp(4rem,6.6vw,8rem)]"
          >
            {["Ethiopian food", "made with love", "in Footscray"].map((line) => (
              <span key={line} className="block lg:whitespace-nowrap">
                {line}
              </span>
            ))}
          </motion.h1>

          <motion.p
            {...rise(0.2)}
            className="font-display mt-6 text-lg tracking-[0.12em] uppercase sm:text-xl"
          >
            Family-run since the mid-2000s.
          </motion.p>

          <motion.div {...rise(0.32)} className="mt-9 flex flex-wrap gap-3">
            <a
              href="#book"
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-espresso px-7 text-sm font-semibold text-cream transition-colors hover:bg-espresso-3"
            >
              Book a table
              <ArrowUpRight
                aria-hidden
                className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
            <Link
              href="/menu"
              className="inline-flex h-12 items-center rounded-full px-6 text-sm font-semibold ring-2 ring-espresso/80 transition-colors hover:bg-espresso hover:text-cream"
            >
              View menu
            </Link>
          </motion.div>
        </div>

        {/* Tilted photo bleeding off the edge */}
        <div className="relative h-[24rem] sm:h-[30rem] lg:col-span-5 lg:h-auto">
          <motion.div
            initial={{ opacity: 0, rotate: reduce ? 4 : 10, x: reduce ? 0 : 60 }}
            animate={{ opacity: 1, rotate: 4, x: 0 }}
            whileHover={reduce ? undefined : { rotate: 1.5, scale: 1.02 }}
            transition={{ duration: 1, ease: EASE, delay: 0.15 }}
            onHoverStart={() => setPaused(true)}
            onHoverEnd={() => setPaused(false)}
            className="absolute top-2 -right-16 -bottom-24 left-6 overflow-hidden bg-espresso shadow-[0_30px_80px_-30px_rgba(29,31,46,.6)] sm:left-16 lg:top-14 lg:-right-20 lg:-bottom-28 lg:left-0"
          >
            {photos.map((p, i) => (
              <motion.div
                key={p.src}
                className="absolute inset-0"
                initial={false}
                animate={{ opacity: i === index ? 1 : 0, scale: i === index ? 1 : 1.06 }}
                transition={{
                  opacity: { duration: 0.9, ease: "easeInOut" },
                  scale: { duration: i === index ? SLIDE_SECONDS + 1 : 0.9, ease: "easeOut" },
                }}
              >
                <Image
                  src={p.src}
                  alt={i === index ? p.alt : ""}
                  fill
                  preload={i === 0}
                  loading={i === 0 ? undefined : "eager"}
                  quality={75}
                  sizes="(min-width:1024px) 45vw, 100vw"
                  className={cn("object-cover", p.position)}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Photo picker */}
          <div
            role="group"
            aria-label="Choose a photo"
            className="absolute bottom-5 left-10 z-10 flex gap-2 sm:left-20 lg:bottom-10 lg:left-6"
          >
            {photos.map((p, i) => (
              <button
                key={p.src}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show ${p.label.toLowerCase()} photo`}
                aria-pressed={i === index}
                className={cn(
                  "h-2.5 rounded-full ring-1 ring-cream/60 transition-all duration-500",
                  i === index ? "w-8 bg-cream" : "w-2.5 bg-cream/40 hover:bg-cream/70",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
