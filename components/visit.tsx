import { Clock, Mail, MapPin, MessageSquare, Phone } from "lucide-react";
import { BookingForm } from "@/components/booking-form";
import { Reveal, RevealLines } from "@/components/motion";
import { MesobDivider } from "@/components/mesob";
import { hours, site } from "@/lib/site";

function formatRange(open?: string, close?: string) {
  if (!open || !close) return "Closed";
  const f = (t: string) => {
    const [h, m] = t.split(":").map(Number);
    const s = h >= 12 ? "pm" : "am";
    const h12 = h % 12 || 12;
    return m ? `${h12}:${String(m).padStart(2, "0")}${s}` : `${h12}${s}`;
  };
  return `${f(open)} – ${f(close)}`;
}

export function Visit() {
  const contacts = [
    { icon: Phone, label: "Call", value: site.phone.display, href: site.phone.href },
    { icon: MessageSquare, label: "SMS bookings", value: site.sms.display, href: site.sms.href },
    { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
  ];

  return (
    <>
      <section id="visit" aria-labelledby="visit-title" className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="mb-14 grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="mb-6 text-xs font-semibold tracking-[0.25em] text-gold-ink uppercase">
                  Visit us · እንኳን ደህና መጡ
                </p>
              </Reveal>
              <RevealLines
                id="visit-title"
                className="font-display text-[clamp(2.6rem,7vw,5.75rem)] leading-[0.92] font-medium"
                lines={[
                  "Come hungry,",
                  <span key="b" className="text-primary italic">
                    leave family.
                  </span>,
                ]}
              />
            </div>
            <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
              <a
                href={site.mapLink}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-start gap-3 text-lg leading-snug"
              >
                <MapPin aria-hidden className="mt-1 size-5 shrink-0 text-primary" />
                <span>
                  {site.address.street}
                  <br />
                  {site.address.suburb} {site.address.state} {site.address.postcode}
                  <span className="mt-1 block text-sm text-primary underline-offset-4 group-hover:underline">
                    Get directions ↗
                  </span>
                </span>
              </a>
            </Reveal>
          </div>

          <div className="grid gap-6 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <div className="relative h-80 overflow-hidden rounded-[2rem] ring-1 ring-espresso/10 sm:h-[28rem] lg:h-full lg:min-h-[30rem]">
                <iframe
                  title="Map showing Konjo Cafe at 89 Irving St, Footscray"
                  src={site.mapEmbed}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 size-full border-0 grayscale-[.35] sepia-[.25]"
                />
              </div>
            </Reveal>

            <div className="grid gap-6 lg:col-span-5">
              <Reveal delay={0.1}>
                <div className="rounded-[2rem] bg-espresso p-7 text-cream sm:p-8">
                  <h3 className="flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-gold uppercase">
                    <Clock aria-hidden className="size-4" /> Opening hours
                  </h3>
                  <dl className="mt-5 divide-y divide-cream/10">
                    {[...hours.slice(1), hours[0]].map((h) => (
                      <div key={h.day} className="flex items-baseline justify-between py-2.5">
                        <dt className="text-cream/80">{h.day}</dt>
                        <dd className={h.open ? "font-semibold" : "text-cream/50"}>
                          {formatRange(h.open, h.close)}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Reveal>
              <Reveal delay={0.18}>
                <ul className="grid gap-3">
                  {contacts.map(({ icon: Icon, label, value, href }) => (
                    <li key={label}>
                      <a
                        href={href}
                        className="group flex items-center justify-between gap-4 rounded-2xl border border-espresso/10 bg-white/50 px-5 py-4 transition-colors hover:border-primary/40 hover:bg-white"
                      >
                        <span className="flex items-center gap-3">
                          <span className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <Icon aria-hidden className="size-4" />
                          </span>
                          <span>
                            <span className="block text-xs text-muted">{label}</span>
                            <span className="block font-semibold break-all">{value}</span>
                          </span>
                        </span>
                        <span aria-hidden className="text-primary transition-transform group-hover:translate-x-1">
                          →
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section
        id="book"
        aria-labelledby="book-title"
        className="mesob-texture relative bg-cream-2/70 py-24 sm:py-32"
      >
        <MesobDivider className="absolute inset-x-0 top-0" />
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="mb-6 text-xs font-semibold tracking-[0.25em] text-gold-ink uppercase">
                Reservations · ቦታ ያስይዙ
              </p>
            </Reveal>
            <RevealLines
              id="book-title"
              className="font-display text-[clamp(2.6rem,6vw,5rem)] leading-[0.92] font-medium"
              lines={[
                "Your table",
                <span key="b" className="text-primary italic">
                  is waiting.
                </span>,
              ]}
            />
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-sm text-lg leading-relaxed text-espresso/80">
                Send a request and we&apos;ll confirm by phone or SMS. Walk-ins are always welcome
                when there&apos;s room.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="rounded-[2rem] bg-cream p-6 shadow-[0_40px_80px_-40px_rgba(34,21,15,.45)] ring-1 ring-espresso/10 sm:p-10">
              <BookingForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
