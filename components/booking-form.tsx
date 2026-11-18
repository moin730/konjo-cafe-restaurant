"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { CalendarCheck, Check, LoaderCircle, MessageSquare, Phone } from "lucide-react";
import { requestBooking, type BookingState } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect } from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import { MAX_GUESTS, formatSlot, isPastSlot, melbourneToday, slotsFor } from "@/lib/booking";
import { site } from "@/lib/site";

const noopSubscribe = () => () => {};
const initial: BookingState = { status: "idle", message: "" };

function FieldError({ id, msg }: { id: string; msg?: string }) {
  if (!msg) return null;
  return (
    <p id={id} className="text-sm font-medium text-secondary">
      {msg}
    </p>
  );
}

function Fields({ state }: { state: BookingState }) {
  const v = state.values ?? {};
  const e = state.fieldErrors ?? {};
  // Empty during prerender, real Melbourne date once hydrated (keeps the static shell static).
  const today = React.useSyncExternalStore(noopSubscribe, melbourneToday, () => "");
  const [date, setDate] = React.useState(v.date ?? "");
  const [time, setTime] = React.useState(v.time ?? "");

  const slots = React.useMemo(
    () => slotsFor(date).filter((t) => !today || !isPastSlot(date, t)),
    [date, today],
  );
  const closed = date !== "" && slotsFor(date).length === 0;
  const dateMsg = e.date ?? (closed ? "We're closed on Mondays. Please choose another day." : undefined);

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="b-name">Name</Label>
          <Input
            id="b-name"
            name="name"
            autoComplete="name"
            required
            minLength={2}
            defaultValue={v.name}
            aria-invalid={!!e.name || undefined}
            aria-describedby={e.name ? "b-name-err" : undefined}
            placeholder="Your full name"
          />
          <FieldError id="b-name-err" msg={e.name} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="b-phone">Phone</Label>
          <Input
            id="b-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            defaultValue={v.phone}
            aria-invalid={!!e.phone || undefined}
            aria-describedby={e.phone ? "b-phone-err" : undefined}
            placeholder="04xx xxx xxx"
          />
          <FieldError id="b-phone-err" msg={e.phone} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="b-date">Date</Label>
          <Input
            id="b-date"
            name="date"
            type="date"
            required
            min={today || undefined}
            value={date}
            onChange={(ev) => {
              setDate(ev.target.value);
              setTime("");
            }}
            aria-invalid={!!dateMsg || undefined}
            aria-describedby={dateMsg ? "b-date-err" : "b-date-hint"}
          />
          {dateMsg ? (
            <FieldError id="b-date-err" msg={dateMsg} />
          ) : (
            <p id="b-date-hint" className="text-xs text-muted">
              Tue–Sat 9am–8pm · Sun 9:30am–3pm
            </p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="b-time">Time</Label>
          <NativeSelect
            id="b-time"
            name="time"
            required
            value={time}
            onChange={(ev) => setTime(ev.target.value)}
            disabled={!date || closed || slots.length === 0}
            aria-invalid={!!e.time || undefined}
            aria-describedby={e.time ? "b-time-err" : undefined}
          >
            <option value="" disabled>
              {!date
                ? "Choose a date first"
                : closed
                  ? "Closed"
                  : slots.length === 0
                    ? "No times left today"
                    : "Select a time"}
            </option>
            {slots.map((t) => (
              <option key={t} value={t}>
                {formatSlot(t)}
              </option>
            ))}
          </NativeSelect>
          <FieldError id="b-time-err" msg={e.time} />
        </div>

        <div className="grid gap-2 sm:col-span-2">
          <Label htmlFor="b-guests">Guests</Label>
          <NativeSelect
            id="b-guests"
            name="guests"
            required
            defaultValue={v.guests || "2"}
            aria-invalid={!!e.guests || undefined}
            aria-describedby={e.guests ? "b-guests-err" : "b-guests-hint"}
          >
            {Array.from({ length: MAX_GUESTS }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "guest" : "guests"}
              </option>
            ))}
          </NativeSelect>
          {e.guests ? (
            <FieldError id="b-guests-err" msg={e.guests} />
          ) : (
            <p id="b-guests-hint" className="text-xs text-muted">
              Platters are for a minimum of 2. Bigger group? Call {site.phone.display}.
            </p>
          )}
        </div>

        <div className="grid gap-2 sm:col-span-2">
          <Label htmlFor="b-notes">
            Notes <span className="font-normal tracking-normal normal-case opacity-70">(optional)</span>
          </Label>
          <Textarea
            id="b-notes"
            name="notes"
            maxLength={500}
            defaultValue={v.notes}
            aria-invalid={!!e.notes || undefined}
            aria-describedby={e.notes ? "b-notes-err" : undefined}
            placeholder="Coffee ceremony for the table, a birthday, dietary needs…"
          />
          <FieldError id="b-notes-err" msg={e.notes} />
        </div>
      </div>

      {/* Honeypot */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
    </>
  );
}

export function BookingForm() {
  const [resetKey, setResetKey] = React.useState(0);
  return <BookingFormInner key={resetKey} onReset={() => setResetKey((k) => k + 1)} />;
}

function BookingFormInner({ onReset }: { onReset: () => void }) {
  const [state, action, pending] = React.useActionState(requestBooking, initial);
  const statusRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (state.status !== "idle") statusRef.current?.focus();
  }, [state]);

  return (
    <div className="relative">
      <AnimatePresence mode="wait" initial={false}>
        {state.status === "success" ? (
          <motion.div
            key="ok"
            ref={statusRef}
            tabIndex={-1}
            role="status"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex min-h-[28rem] flex-col items-start justify-center gap-5 outline-none"
          >
            <span className="flex size-16 items-center justify-center rounded-full bg-secondary text-cream">
              <Check className="size-7" />
            </span>
            <h3 className="font-display text-3xl font-medium sm:text-4xl">Request received</h3>
            <p className="max-w-md text-lg text-espresso/80">{state.message}</p>
            <p className="text-sm text-muted">
              Need it sooner? SMS{" "}
              <a className="font-semibold text-secondary underline" href={site.sms.href}>
                {site.sms.display}
              </a>
              .
            </p>
            <Button
              variant="outline"
              className="text-espresso"
              onClick={onReset}
            >
              Make another booking
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            action={action}
            initial={false}
            exit={{ opacity: 0, y: -10 }}
            className="relative grid gap-7"
            aria-describedby={state.status === "error" ? "booking-status" : undefined}
          >
            <Fields key={JSON.stringify(state.values ?? {})} state={state} />

            <div
              id="booking-status"
              ref={statusRef}
              tabIndex={-1}
              role="alert"
              aria-live="assertive"
              className="outline-none empty:hidden"
            >
              {state.status === "error" && (
                <p className="rounded-xl bg-secondary/10 px-4 py-3 text-sm font-medium text-secondary">
                  {state.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Button type="submit" size="lg" disabled={pending} className="w-full sm:w-auto">
                {pending ? (
                  <>
                    <LoaderCircle className="animate-spin" /> Sending…
                  </>
                ) : (
                  <>
                    <CalendarCheck /> Request booking
                  </>
                )}
              </Button>
              <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
                <a href={site.sms.href} className="inline-flex items-center gap-1.5 hover:text-secondary">
                  <MessageSquare aria-hidden className="size-4" /> SMS {site.sms.display}
                </a>
                <a href={site.phone.href} className="inline-flex items-center gap-1.5 hover:text-secondary">
                  <Phone aria-hidden className="size-4" /> {site.phone.display}
                </a>
              </div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
