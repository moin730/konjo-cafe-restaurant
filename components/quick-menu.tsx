import Link from "next/link";
import { ArrowUpRight, Coffee, Sunrise, UtensilsCrossed, Users } from "lucide-react";
import { sections } from "@/lib/menu";
import { cn } from "@/lib/utils";

/** Lowest price in the given /menu sections, e.g. "$12". */
function fromPrice(ids: string[]) {
  const prices = sections
    .filter((s) => ids.includes(s.id))
    .flatMap((s) => s.groups.flatMap((g) => g.items))
    .map((i) => i.price)
    .filter((p) => !p.startsWith("+")) // skip add-ons like "+$0.50"
    .map((p) => Number(p.replace(/[^0-9.]/g, "")))
    .filter((n) => n > 0);
  const min = Math.min(...prices);
  return `$${Number.isInteger(min) ? min : min.toFixed(2)}`;
}

const links = [
  {
    href: "/menu#breakfast",
    label: "Breakfast",
    blurb: "Ful, silsi & more",
    from: fromPrice(["breakfast"]),
    icon: Sunrise,
    style: "bg-primary text-espresso",
  },
  {
    href: "/menu#vegetarian",
    label: "Lunch & Dinner",
    blurb: "Wots, tibs & kitfo",
    from: fromPrice(["vegetarian", "meat"]),
    icon: UtensilsCrossed,
    style: "bg-espresso text-cream",
  },
  {
    href: "/menu#platters",
    label: "Platters",
    blurb: "Share the love",
    from: `${fromPrice(["platters"])} pp`,
    icon: Users,
    style: "bg-cream-2 text-espresso ring-1 ring-primary/30",
  },
  {
    href: "/menu#drinks",
    label: "Coffee & Drinks",
    blurb: "Jebana, lattes & tea",
    from: fromPrice(["drinks"]),
    icon: Coffee,
    style: "bg-secondary text-cream",
  },
];

export function QuickMenu() {
  return (
    <nav aria-label="Jump to the menu" className="mx-auto max-w-6xl px-4 pt-12 sm:px-6 sm:pt-16">
      <p className="text-center text-xs font-bold tracking-[0.25em] text-secondary uppercase">
        What are you hungry for?
      </p>
      <ul className="mt-5 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {links.map(({ href, label, blurb, from, icon: Icon, style }) => (
          <li key={href}>
            <Link
              href={href}
              className={cn(
                "group flex h-full flex-col justify-between gap-6 rounded-[1.5rem] p-5 transition-transform duration-300 hover:-translate-y-1 sm:p-6",
                style,
              )}
            >
              <span className="flex items-start justify-between">
                <Icon aria-hidden className="size-7 sm:size-8" />
                <ArrowUpRight
                  aria-hidden
                  className="size-5 opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                />
              </span>
              <span>
                <span className="font-display block text-2xl leading-tight sm:text-3xl">{label}</span>
                <span className="mt-1 block text-sm opacity-80">
                  {blurb} · from {from}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
