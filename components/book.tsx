import { BookingForm } from "@/components/booking-form";
import { hoursSummary, site } from "@/lib/site";

export function Book() {
  return (
    <section id="book" aria-labelledby="book-title" className="px-3 pb-16 sm:px-4 sm:pb-24">
      <div className="mx-auto grid max-w-7xl gap-10 rounded-[1.75rem] bg-cream-2 p-6 ring-1 ring-primary/20 sm:p-10 lg:grid-cols-12 lg:p-12">
        <div className="lg:col-span-4">
          <h2
            id="book-title"
            className="font-display text-[clamp(3.25rem,7vw,5.5rem)] leading-[0.92] text-espresso"
          >
            Book a
            <br />
            Table
          </h2>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-espresso/80">
            Send a request and we&apos;ll confirm by phone or SMS. Walk-ins are always welcome
            when there&apos;s room.
          </p>
          <dl className="mt-6 space-y-1 text-sm">
            {hoursSummary.map((h) => (
              <div key={h.label} className="flex gap-4">
                <dt className="w-20 text-muted">{h.label}</dt>
                <dd className="font-semibold text-espresso">{h.value}</dd>
              </div>
            ))}
          </dl>
          <a
            href={site.mapLink}
            target="_blank"
            rel="noreferrer"
            className="mt-6 block text-sm font-semibold text-secondary underline-offset-4 hover:underline"
          >
            {site.address.full} ↗
          </a>
        </div>
        <div className="lg:col-span-8">
          <BookingForm />
        </div>
      </div>
    </section>
  );
}
