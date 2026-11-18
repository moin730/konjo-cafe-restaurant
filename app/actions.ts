"use server";

import { z } from "zod";
import { MAX_GUESTS, isPastSlot, slotsFor } from "@/lib/booking";
import { site } from "@/lib/site";

export type BookingState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Partial<Record<"name" | "phone" | "date" | "time" | "guests" | "notes", string>>;
  values?: Record<string, string>;
};

const schema = z
  .object({
    name: z.string().trim().min(2, "Please tell us your name.").max(80),
    phone: z
      .string()
      .trim()
      .regex(/^\+?[\d\s()-]{8,18}$/, "Please enter a valid phone number."),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Please choose a date."),
    time: z.string().regex(/^\d{2}:\d{2}$/, "Please choose a time."),
    guests: z.coerce
      .number({ error: "How many guests?" })
      .int()
      .min(1, "At least one guest.")
      .max(MAX_GUESTS, `For groups over ${MAX_GUESTS}, please call us.`),
    notes: z.string().trim().max(500, "Please keep notes under 500 characters.").optional(),
  })
  .superRefine((v, ctx) => {
    const slots = slotsFor(v.date);
    if (slots.length === 0) {
      ctx.addIssue({ code: "custom", path: ["date"], message: "We're closed on Mondays." });
      return;
    }
    if (!slots.includes(v.time)) {
      ctx.addIssue({ code: "custom", path: ["time"], message: "Please pick a time from the list." });
    } else if (isPastSlot(v.date, v.time)) {
      ctx.addIssue({ code: "custom", path: ["time"], message: "That time has already passed." });
    }
  });

async function deliver(booking: z.infer<typeof schema>) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.BOOKING_TO_EMAIL ?? site.email;
  const from = process.env.BOOKING_FROM_EMAIL;

  if (!apiKey || !from) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[booking] email delivery not configured; booking received:", booking);
      return true;
    }
    console.error("[booking] RESEND_API_KEY / BOOKING_FROM_EMAIL missing; booking not delivered.");
    return false;
  }

  const text = [
    `New table request from konjo.com.au`,
    ``,
    `Name:   ${booking.name}`,
    `Phone:  ${booking.phone}`,
    `Date:   ${booking.date}`,
    `Time:   ${booking.time}`,
    `Guests: ${booking.guests}`,
    `Notes:  ${booking.notes || "-"}`,
  ].join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `Booking: ${booking.name}, ${booking.guests} guests, ${booking.date} ${booking.time}`,
      text,
    }),
  });
  if (!res.ok) console.error("[booking] Resend error", res.status, await res.text());
  return res.ok;
}

export async function requestBooking(_prev: BookingState, formData: FormData): Promise<BookingState> {
  const raw = Object.fromEntries(
    ["name", "phone", "date", "time", "guests", "notes"].map((k) => [k, String(formData.get(k) ?? "")]),
  );

  // Honeypot: real people never fill this hidden field.
  if (String(formData.get("company") ?? "").length > 0) {
    return { status: "success", message: "Thanks! We'll be in touch shortly." };
  }

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: BookingState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof NonNullable<BookingState["fieldErrors"]>;
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      fieldErrors,
      values: raw,
    };
  }

  const ok = await deliver(parsed.data);
  if (!ok) {
    return {
      status: "error",
      message: `Sorry, we couldn't send that just now. Please SMS ${site.sms.display} or call ${site.phone.display}.`,
      values: raw,
    };
  }

  return {
    status: "success",
    message: `Thanks ${parsed.data.name.split(" ")[0]}! Your request for ${parsed.data.guests} is in. We'll confirm by phone or SMS shortly.`,
  };
}
