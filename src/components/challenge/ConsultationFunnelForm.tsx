import { forwardRef, useMemo, useRef, useState } from "react";
import { ArrowLeft, CheckCircle, Loader2, Lock, PhoneCall } from "lucide-react";
import { FREE_CONSULTATION as C } from "@/config/masterclass";
import { istDateLabel, sendCrmLead, trackPixel } from "@/lib/crmLead";
import { applyMetaUserData, getStoredMetaUser, saveMetaUserData } from "@/lib/metaUserData";
import { ErrorText, PhoneInput, chipClass, fieldClass, validateName, validatePhone } from "@/components/masterclass/leadFormBits";

/**
 * Step-by-step free-consultation form for /21-day-free-consultation
 * (Sumit, 26 Nov 2026 — adapted from Fitelo's consultation-first funnel).
 *
 * Step 1: name, WhatsApp, age, gender.  Step 2: goal, health conditions, tried before.
 * Step 3: open to a paid plan, call language, day + time.
 * The lead goes to the SVASTHA CRM with everything the caller needs.
 * Health answers go ONLY to the CRM — never to the Meta pixel.
 */

export const CONSULT_PAGE_SOURCE = "21day-consultation-page";

const AGES = ["Under 25", "25–34", "35–44", "45–54", "55+"];
const GENDERS = ["Female", "Male"];
const GOALS = ["Up to 5 kg", "5–10 kg", "10–20 kg", "20+ kg", "Get fit / tone up"];
const CONDITIONS = ["Thyroid", "PCOD / PCOS", "Diabetes / pre-diabetes", "BP", "Knee / back pain", "None"];
const TRIED = ["Diet plans", "Gym", "Intermittent fasting", "Yoga", "Nothing yet"];
const OPEN_TO_PLAN = [
  "Yes, if it suits me",
  "Want to know the fees first",
  "Just exploring for now",
];
const LANGS = ["Hindi", "English"];

type Day = { key: string; label: string };

function upcomingDays(now = new Date()): Day[] {
  const out: Day[] = [];
  for (let i = 0; i < 3; i++) {
    const d = new Date(now.getTime() + i * 86400000);
    const short = d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", timeZone: "Asia/Kolkata" });
    out.push({ key: istDateLabel(d), label: i === 0 ? `Today · ${short}` : i === 1 ? `Tomorrow · ${short}` : short });
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

type Errors = Partial<Record<"name" | "phone" | "age" | "gender" | "goal" | "open" | "day" | "slot", string>>;

interface Props {
  /** Shown after booking: opens the plan window. */
  onSeePlans: () => void;
  onWhatsApp: () => void;
}

export const ConsultationFunnelForm = forwardRef<HTMLDivElement, Props>(({ onSeePlans, onWhatsApp }, ref) => {
  const days = useMemo(() => upcomingDays(), []);
  const [step, setStep] = useState(1);
  const [name, setName] = useState(() => getStoredMetaUser().name ?? "");
  const [phone, setPhone] = useState(() => getStoredMetaUser().phone ?? "");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [goal, setGoal] = useState("");
  const [conditions, setConditions] = useState<string[]>([]);
  const [tried, setTried] = useState<string[]>([]);
  const [open, setOpen] = useState("");
  const [lang, setLang] = useState("Hindi");
  const [day, setDay] = useState("");
  const [slot, setSlot] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  const isToday = day === days[0].key;
  const hourNow = nowHourIst();
  const slots = C.slots.filter((s) => !isToday || slotHourIst(s) >= hourNow + 1);
  const visibleDays = days.filter((_, i) => i > 0 || C.slots.some((s) => slotHourIst(s) >= hourNow + 1));

  const clear = (k: keyof Errors) =>
    setErrors((e) => {
      if (!e[k]) return e;
      const n = { ...e };
      delete n[k];
      return n;
    });

  const toggle = (list: string[], set: (v: string[]) => void, v: string) => {
    if (v === "None" || v === "Nothing yet") return set(list.includes(v) ? [] : [v]);
    const base = list.filter((x) => x !== "None" && x !== "Nothing yet");
    set(base.includes(v) ? base.filter((x) => x !== v) : [...base, v]);
  };

  const goTo = (n: number) => {
    setStep(n);
    setErrors({});
    // Keep the card in view on small phones.
    requestAnimationFrame(() => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  const check = (found: Errors) => {
    (Object.keys(found) as (keyof Errors)[]).forEach((k) => found[k] === undefined && delete found[k]);
    if (Object.keys(found).length) {
      setErrors(found);
      if (found.name) nameRef.current?.focus();
      else if (found.phone) phoneRef.current?.focus();
      return false;
    }
    return true;
  };

  const next1 = () => {
    if (!check({ name: validateName(name), phone: validatePhone(phone), age: age ? undefined : "Pick your age", gender: gender ? undefined : "Pick one" })) return;
    saveMetaUserData({ name: name.trim(), phone });
    applyMetaUserData();
    trackPixel("ViewContent", { content_name: "Consultation form - step 1 done" });
    goTo(2);
  };

  const next2 = () => {
    if (!check({ goal: goal ? undefined : "Pick your goal" })) return;
    goTo(3);
  };

  const submit = async () => {
    if (!check({ open: open ? undefined : "Pick one", day: day ? undefined : "Pick a day", slot: slot ? undefined : "Pick a time" })) return;
    setBusy(true);
    trackPixel("Lead", { content_name: "Free consultation - 21 day consultation page" });
    await sendCrmLead(
      {
        name: name.trim(),
        phone,
        source: CONSULT_PAGE_SOURCE,
        details: [
          "Free consultation call booked on the 21 Day consultation page.",
          `Age: ${age} | ${gender}`,
          `Goal: ${goal}`,
          `Health: ${conditions.length ? conditions.join(", ") : "not given"}`,
          `Tried before: ${tried.length ? tried.join(", ") : "not given"}`,
          `Open to a paid plan: ${open}`,
          `Call in: ${lang}`,
          `Preferred: ${day}, ${slot}.`,
        ].join(" | "),
        callDate: day,
        callTime: slot,
      },
      4000,
    );
    setBusy(false);
    setDone(true);
    requestAnimationFrame(() => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  const card = "w-full rounded-3xl border-2 border-emerald-100 bg-white p-5 shadow-2xl md:p-7";

  if (done) {
    return (
      <div ref={ref} className="scroll-mt-4">
        <div ref={topRef} className={`${card} text-center`}>
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
            <CheckCircle className="h-12 w-12 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900">Your free call is booked</h2>
          <p className="mt-2 text-sm text-gray-600">
            A SVASTHA expert will call you on <b>{day}</b> around <b>{slot}</b> (India time) in <b>{lang}</b>. We'll
            message you on WhatsApp first.
          </p>
          <div className="mt-6 space-y-3">
            <button
              type="button"
              onClick={onSeePlans}
              className="no-heartbeat w-full rounded-full bg-gradient-to-r from-green-600 to-lime-500 py-3.5 text-base font-extrabold text-white shadow-lg hover:from-green-700 hover:to-lime-600"
            >
              Already sure? See the plans now
            </button>
            <button
              type="button"
              onClick={onWhatsApp}
              className="no-heartbeat w-full rounded-full border-2 border-[#25D366] bg-white py-3 text-sm font-bold text-[#128C7E] hover:bg-green-50"
            >
              Chat with us on WhatsApp
            </button>
          </div>
        </div>
      </div>
    );
  }

  const ChipRow = ({ items, value, onPick, error, cols = "grid-cols-3" }: { items: string[]; value: string; onPick: (v: string) => void; error?: string; cols?: string }) => (
    <>
      <div className={`grid ${cols} gap-2`}>
        {items.map((v) => (
          <button key={v} type="button" onClick={() => onPick(v)} className={chipClass(value === v, !!error)}>
            {v}
          </button>
        ))}
      </div>
      {error && <ErrorText>{error}</ErrorText>}
    </>
  );

  const label = (t: string, req = true) => (
    <p className="mb-2 text-xs font-semibold text-gray-700">
      {t} {req ? <span className="text-red-500">*</span> : <span className="font-normal text-gray-400">(optional)</span>}
    </p>
  );

  return (
    <div ref={ref} className="scroll-mt-4">
      <div ref={topRef} className={card}>
        <div className="mb-4 flex items-center justify-between">
          {step > 1 ? (
            <button type="button" onClick={() => goTo(step - 1)} className="no-heartbeat inline-flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-gray-900">
              <ArrowLeft className="h-3.5 w-3.5" /> Back
            </button>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700">
              <PhoneCall className="h-3.5 w-3.5" /> Free {C.durationLabel} call
            </span>
          )}
          <span className="text-xs font-semibold text-gray-500">Step {step} of 3</span>
        </div>
        <div className="mb-5 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
          <div className="h-full rounded-full bg-emerald-500 transition-all duration-300" style={{ width: `${(step / 3) * 100}%` }} />
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-xl font-extrabold leading-snug text-gray-900">Book your free consultation call</h2>
            <div>
              <label htmlFor="cf-name" className="mb-1.5 block text-xs font-semibold text-gray-700">
                Your name <span className="text-red-500">*</span>
              </label>
              <input
                id="cf-name"
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
              id="cf-phone"
              ref={phoneRef}
              value={phone}
              onChange={(d) => {
                setPhone(d);
                clear("phone");
              }}
              error={errors.phone}
              hint="Our expert will call you on this number."
            />
            <div>
              {label("Your age")}
              <ChipRow items={AGES} value={age} onPick={(v) => { setAge(v); clear("age"); }} error={errors.age} />
            </div>
            <div>
              {label("You are")}
              <ChipRow items={GENDERS} value={gender} onPick={(v) => { setGender(v); clear("gender"); }} error={errors.gender} cols="grid-cols-2" />
            </div>
            <button type="button" onClick={next1} className="no-heartbeat w-full rounded-full bg-gradient-to-r from-green-600 to-lime-500 py-3.5 text-base font-extrabold text-white shadow-lg hover:from-green-700 hover:to-lime-600">
              Next →
            </button>
            <p className="flex items-center justify-center gap-1.5 text-[11px] text-gray-500">
              <Lock className="h-3 w-3" /> Used only to call you. No spam.
            </p>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-xl font-extrabold leading-snug text-gray-900">Tell us about your goal</h2>
            <div>
              {label("How much weight do you want to lose?")}
              <ChipRow items={GOALS} value={goal} onPick={(v) => { setGoal(v); clear("goal"); }} error={errors.goal} cols="grid-cols-2" />
            </div>
            <div>
              {label("Any health condition? (pick all that apply)", false)}
              <div className="grid grid-cols-2 gap-2">
                {CONDITIONS.map((v) => (
                  <button key={v} type="button" onClick={() => toggle(conditions, setConditions, v)} className={chipClass(conditions.includes(v))}>
                    {v}
                  </button>
                ))}
              </div>
            </div>
            <div>
              {label("What have you tried before?", false)}
              <div className="grid grid-cols-2 gap-2">
                {TRIED.map((v) => (
                  <button key={v} type="button" onClick={() => toggle(tried, setTried, v)} className={chipClass(tried.includes(v))}>
                    {v}
                  </button>
                ))}
              </div>
            </div>
            <button type="button" onClick={next2} className="no-heartbeat w-full rounded-full bg-gradient-to-r from-green-600 to-lime-500 py-3.5 text-base font-extrabold text-white shadow-lg hover:from-green-700 hover:to-lime-600">
              Next →
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-xl font-extrabold leading-snug text-gray-900">Pick a time for your call</h2>
            <div>
              {label("If our plan suits you, would you like to join a paid programme?")}
              <ChipRow items={OPEN_TO_PLAN} value={open} onPick={(v) => { setOpen(v); clear("open"); }} error={errors.open} cols="grid-cols-1" />
            </div>
            <div>
              {label("Call language")}
              <ChipRow items={LANGS} value={lang} onPick={setLang} cols="grid-cols-2" />
            </div>
            <div>
              {label("Day")}
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
            </div>
            {day && (
              <div>
                {label("Time (India time)")}
                <ChipRow items={slots} value={slot} onPick={(v) => { setSlot(v); clear("slot"); }} error={errors.slot} />
              </div>
            )}
            <button
              type="button"
              onClick={submit}
              disabled={busy}
              className="no-heartbeat flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-green-600 to-lime-500 py-3.5 text-base font-extrabold text-white shadow-lg hover:from-green-700 hover:to-lime-600 disabled:opacity-70"
            >
              {busy ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
              Book my free call
            </button>
            <p className="text-center text-[11px] text-gray-500">Free, and no pressure to buy.</p>
          </div>
        )}
      </div>
    </div>
  );
});
ConsultationFunnelForm.displayName = "ConsultationFunnelForm";
