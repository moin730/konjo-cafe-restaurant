"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { site } from "@/lib/site";

const links = [
  { href: "/menu", label: "Menu" },
  { href: "/#about", label: "About" },
  { href: "/#ceremony", label: "Coffee" },
  { href: "/#book", label: "Book" },
];

/** Simple top bar that sits on the brand-red band above the hero card. */
export function Nav() {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="bg-primary text-primary-foreground">
      <a
        href="#main"
        className="sr-only z-[80] rounded-full bg-cream px-4 py-2 text-espresso focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <nav
        aria-label="Main"
        className="flex h-16 items-center justify-between px-5 sm:px-8"
      >
        <Link href="/" aria-label="Konjo Cafe & Restaurant, home">
          <Logo />
        </Link>

        <ul className="hidden items-center gap-8 text-sm font-medium md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="opacity-90 transition-opacity hover:opacity-100 hover:underline underline-offset-4">
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <a href={site.phone.href} className="opacity-90 hover:opacity-100">
              {site.phone.display}
            </a>
          </li>
        </ul>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="inline-flex size-11 items-center justify-center rounded-full md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {open && (
        <ul id="mobile-menu" className="space-y-1 px-4 pb-4 md:hidden">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-display block py-1 text-3xl"
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <a href={site.phone.href} className="block pt-2 text-sm">
              {site.phone.display}
            </a>
          </li>
        </ul>
      )}
    </header>
  );
}
