import { Logo } from "@/components/logo";
import { site } from "@/lib/site";

const columns = [
  {
    title: "Explore",
    links: [
      { label: "Menu", href: "/menu" },
      { label: "About", href: "/#about" },
      { label: "Coffee ceremony", href: "/#ceremony" },
      { label: "Book a table", href: "/#book" },
    ],
  },
  {
    title: "Follow",
    links: [
      { label: "Instagram", href: site.instagram.href, external: true },
      { label: "Facebook", href: site.facebook.href, external: true },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: site.phone.display, href: site.phone.href },
      { label: `SMS ${site.sms.display}`, href: site.sms.href },
      { label: site.email, href: `mailto:${site.email}` },
      { label: "Download menu (PDF)", href: site.menuPdf },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 pt-14 pb-8 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Logo className="h-auto w-full max-w-[34rem] text-white" />
          </div>
          <div className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3 lg:col-span-6 lg:pt-4">
            {columns.map((c) => (
              <div key={c.title}>
                <h2 className="font-semibold text-espresso">{c.title}</h2>
                <ul className="mt-3 space-y-1.5">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        {...("external" in l && l.external ? { target: "_blank", rel: "noreferrer" } : {})}
                        className="break-all text-espresso/80 hover:text-espresso hover:underline underline-offset-4"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-14 flex flex-col justify-between gap-2 text-xs text-espresso/75 sm:flex-row">
          <p>© {site.name} · {site.address.full}</p>
          <a href="#top" className="hover:text-espresso">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
