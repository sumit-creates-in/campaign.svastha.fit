import { useMemo, useRef, useState } from "react";
import { CheckCircle, Loader2, PhoneCall, ShieldCheck } from "lucide-react";
import { FREE_CONSULTATION as C, LEAD_SOURCES } from "@/config/masterclass";
import { istDateLabel, sendCrmLead, trackPixel } from "@/lib/crmLead";
import { applyMetaUserData, getStoredMetaUser, saveMetaUserData } from "@/lib/metaUserData";
import {
  ErrorText,
  Overlay,
  PhoneInput,
  chipClass,
  fieldClass,
  validateName,
  validatePhone,
} from "./leadFormBits";

/**
 * "Book a free consultation call" — for visitors who read the whole page and
 * are still unsure (Sumit, 15 Nov 2026). Shown once, after they reach the
 * bottom and scroll back up, or from "Not sure which one?" on the choice screen.
 * The lead goes straight to the SVASTHA CRM with their preferred call slot.
 */
interface Props {
  onClose: () => void;
  /** CRM source (default: the Master Class page's). */
  source?: string;
  /** Where the visitor booked from, written into the CRM details. */
  fromLabel?: string;
  /** content_name of the Meta Lead event. */
  pixelName?: string;
}

const DOUBTS = [
  "Will it work for my body?",
  "I have a health condition",
  "Is it safe for me to fast?",
  "Price / which plan to pick",
  "Time — my routine is busy",
  "Something else",
];

type Day = { key: string; label: string; date: Date };

/** Today (if there's still a slot left), tomorrow and the day after — in IST. */
function upcomingDays(now = new Date()): Day[] {
  const out: Day[] = [];
  for (let i = 0; i < 3; i++) {
    const d = new Date(now.getTime() + i * 86400000);
    const short = d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", timeZone: "Asia/Kolkata" });
    out.push({ key: istDateLabel(d), label: i === 0 ? `Today · ${short}` : i === 1 ? `Tomorrow · ${short}` : short, date: d });
  }
  return out;
}

function slotHourIst(slot: string) {
  const [hm, ampm] = slot.split(" ");
  const h = Number(hm.split(":")[0]) % 12;
  return ampm === "PM" ? h + 12 : h;
}

function nowHourIst(now = new Date()) {
  return Number(now.toLocaleString("en-GB", { hour: "2-digit", hour12: false, timeZone: "Asia/Kolkata" }));
}

type Errors = { name?: string; phone?: string; day?: string; slot?: string };

export const FreeConsultationModal = ({
  onClose,
  source = LEAD_SOURCES.consultation,
  fromLabel = "the Master Class page (read the full page, still unsure)",
  pixelName = "Free consultation - Master Class page",
}: Props) => {
  const days = useMemo(() => upcomingDays(), []);
  // Prefill from this device so nobody types twice (26 Nov 2026).
  const [name, setName] = useState(() => getStoredMetaUser().name ?? "");
  const [phone, setPhone] = useState(() => getStoredMetaUser().phone ?? "");
  const [doubt, setDoubt] = useState("");
  const [day, setDay] = useState("");
  const [slot, setSlot] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  const isToday = day === days[0].key;
  const hourNow = nowHourIst();
  const slots = C.slots.filter((s) => !isToday || slotHourIst(s) >= hourNow + 1);
  const visibleDays = days.filter((d, i) => i > 0 || C.slots.some((s) => slotHourIst(s) >= hourNow + 1));

  const clear = (k: keyof Errors) =>
    setErrors((e) => {
      if (!e[k]) return e;
      const n = { ...e };
      delete n[k];
      return n;
    });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const found: Errors = {
      name: validateName(name),
      phone: validatePhone(phone),
      day: day ? undefined : "Pick a day",
      slot: slot ? undefined : "Pick a time",
    };
    (Object.keys(found) as (keyof Errors)[]).forEach((k) => found[k] === undefined && delete found[k]);
    if (Object.keys(found).length) {
      setErrors(found);
      (found.name ? nameRef.current : found.phone ? phoneRef.current : null)?.focus();
      return;
    }
    setBusy(true);
    saveMetaUserData({ name: name.trim(), phone });
    applyMetaUserData();
    trackPixel("Lead", { content_name: pixelName });
    await sendCrmLead(
      {
        name: name.trim(),
        phone,
        source,
        details: `Free consultation call booked from ${fromLabel}. Main doubt: ${doubt || "not given"} | Preferred: ${day}, ${slot}.`,
        callDate: day,
        callTime: slot,
      },
      4000,
    );
    setBusy(false);
    setDone(true);
  };

  if (done) {
    return (
      <Overlay onClose={onClose} labelledBy="consult-done-title">
        <div className="px-6 pb-7 pt-9 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
            <CheckCircle className="h-12 w-12 text-emerald-600" />
          </div>
          <h2 id="consult-done-title" className="text-2xl font-extrabold text-gray-900">
            Your free call is booked
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Our team will call you on <b>{day}</b> around <b>{slot}</b> (India time). Keep your phone handy —
            we'll message you on WhatsApp first.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="no-heartbeat mt-6 rounded-full bg-emerald-600 px-10 py-3 font-bold text-white hover:bg-emerald-700"
          >
            Got it
          </button>
        </div>
      </Overlay>
    );
  }

  return (
    <Overlay onClose={onClose} labelledBy="consult-title">
      <div className="px-5 pb-6 pt-7 md:px-7">
        <div className="mb-4 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
            <PhoneCall className="h-7 w-7 text-emerald-700" />
          </div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">Still have questions?</p>
          <h2 id="consult-title" className="mt-1 text-xl font-extrabold leading-snug text-gray-900 md:text-2xl">
            Book a free {C.durationLabel} consultation call
          </h2>
          <p className="mt-1.5 text-sm text-gray-600">
            Talk to a Svastha expert about your goal, your routine and any health condition. Get a clear answer on
            what will work for you. <b>Free, and no pressure to buy.</b>
          </p>
        </div>

        <form onSubmit={submit} noValidate className="space-y-4">
          <div>
            <label htmlFor="fc-name" className="mb-1.5 block text-xs font-semibold text-gray-700">
              Your name <span className="text-red-500">*</span>
            </label>
            <input
              id="fc-name"
              ref={nameRef}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                clear("name");
              }}
              autoComplete="name"
              placeholder="Full name"
              className={fieldClass(!!errors.name)}
            />
            {errors.name && <ErrorText>{errors.name}</ErrorText>}
          </div>

          <PhoneInput
            id="fc-phone"
            ref={phoneRef}
            value={phone}
            onChange={(d) => {
              setPhone(d);
              clear("phone");
            }}
            error={errors.phone}
            hint="We'll call you on this number."
          />

          <div>
            <p className="mb-2 text-xs font-semibold text-gray-700">
              What's on your mind? <span className="font-normal text-gray-400">(optional)</span>
            </p>
            <div className="grid grid-cols-2 gap-2">
              {DOUBTS.map((d) => (
                <button key={d} type="button" onClick={() => setDoubt(doubt === d ? "" : d)} className={chipClass(doubt === d)}>
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold text-gray-700">
              When should we call? <span className="text-red-500">*</span>
            </p>
            <div className="grid grid-cols-3 gap-2">
              {visibleDays.map((d) => (
                <button
                  key={d.key}
                  type="button"
                  onClick={() => {
                    setDay(d.key);
                    setSlot("");
                    clear("day");
                  }}
                  className={chipClass(day === d.key, !!errors.day)}
                >
                  {d.label}
                </button>
              ))}
            </div>
            {errors.day && <ErrorText>{errors.day}</ErrorText>}
            {day && (
              <div className="mt-2 grid grid-cols-3 gap-2">
                {slots.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      setSlot(s);
                      clear("slot");
                    }}
                    className={chipClass(slot === s, !!errors.slot)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
            {errors.slot && <ErrorText>{errors.slot}</ErrorText>}
          </div>

          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-full bg-gradient-to-r from-green-600 to-lime-500 py-4 text-base font-bold text-white shadow-lg transition-all hover:from-green-700 hover:to-lime-600 disabled:opacity-70"
          >
            {busy ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" /> Booking…
              </span>
            ) : (
              "Book my free call"
            )}
          </button>
          <p className="flex items-center justify-center gap-1.5 text-[11px] text-gray-500">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            Your number is only used to call you about your plan.
          </p>
        </form>
      </div>
    </Overlay>
  );
};
