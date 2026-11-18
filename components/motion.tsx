"use client";

import * as React from "react";
import {
  MotionConfig,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type HTMLMotionProps,
} from "motion/react";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Honour the OS "reduce motion" setting for every Motion animation on the page. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

/** Fade + slide-up when scrolled into view. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = "div",
  ...rest
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article" | "p" | "span";
} & Omit<HTMLMotionProps<"div">, "children">) {
  const reduce = useReducedMotion();
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

/**
 * Editorial line-by-line text reveal. Pass each visual line as an array item;
 * every line slides up from behind its own mask.
 */
export function RevealLines({
  lines,
  className,
  lineClassName,
  delay = 0,
  stagger = 0.11,
  immediate = false,
  as = "h2",
  id,
}: {
  id?: string;
  lines: React.ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  immediate?: boolean;
  as?: "h1" | "h2" | "h3" | "p";
}) {
  const reduce = useReducedMotion();
  const Tag = as;
  const trigger = immediate
    ? { animate: "show" as const }
    : { whileInView: "show" as const, viewport: { once: true, margin: "0px 0px -10% 0px" } };

  return (
    <Tag id={id} className={className}>
      <motion.span
        className="block"
        initial="hidden"
        {...trigger}
        transition={{ staggerChildren: stagger, delayChildren: delay }}
      >
        {lines.map((line, i) => (
          <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
            <motion.span
              className={cn("block will-change-transform", lineClassName)}
              variants={{
                hidden: { y: reduce ? 0 : "110%", opacity: reduce ? 0 : 1 },
                show: { y: "0%", opacity: 1, transition: { duration: 1.05, ease: EASE } },
              }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

/** Light vertical parallax for an image wrapper. The child should overflow the frame a little. */
export function Parallax({
  children,
  className,
  strength = 60,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-strength, strength]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div
        style={{ y, top: -strength, bottom: -strength }}
        className="absolute inset-x-0 will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}
