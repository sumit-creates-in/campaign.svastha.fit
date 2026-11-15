import { ArrowRight, CalendarCheck, Check, PhoneCall, Video, Zap } from "lucide-react";
import { MASTERCLASS, PRICING, PERSONALIZED_START_NOW as P } from "@/config/masterclass";
import { Overlay } from "./leadFormBits";

/**
 * Sumit, 15 Nov 2026: when someone clicks "Reserve seat", first ask how they
 * want to start — right away with their own dietitian, or at the live class.
 * Both options must be crystal clear; the dietitian path means no waiting and
 * no 90-minute session to sit through.
 */
interface Props {
  onClose: () => void;
  onPersonalized: () => void;
  onMasterClass: () => void;
  onConsultation: () => void;
}

const Point = ({ children }: { children: React.ReactNode }) => (
  <li className="flex gap-2 text-[13px] leading-snug text-gray-700">
    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600" strokeWidth={3} />
    <span>{children}</span>
  </li>
);

export const StartChoiceModal = ({ onClose, onPersonalized, onMasterClass, onConsultation }: Props) => (
  <Overlay onClose={onClose} labelledBy="start-choice-title" maxWidth="max-w-2xl" z="z-50">
    <div className="px-4 pb-5 pt-7 md:px-7 md:pb-7">
      <div className="mb-5 text-center">
        <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">
          Before you reserve — one quick choice
        </p>
        <h2 id="start-choice-title" className="mt-1 text-xl font-extrabold leading-snug text-gray-900 md:text-2xl">
          How would you like to start?
        </h2>
        <p className="mt-1.5 text-sm text-gray-600">
          Same Svastha method either way. Pick what suits you right now.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-2 md:gap-4">
        {/* Option 1 — start now with a dietitian */}
        <div className="relative flex flex-col rounded-2xl border-2 border-emerald-500 bg-gradient-to-b from-emerald-50 to-white p-4 shadow-md">
          <span className="absolute -top-3 left-4 inline-flex items-center gap-1 rounded-full bg-emerald-600 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow">
            <Zap className="h-3.5 w-3.5" /> Start today or tomorrow
          </span>
          <h3 className="mt-2 text-base font-extrabold text-gray-900 md:text-lg">Start now with your own dietitian</h3>
          <p className="text-xs font-semibold text-emerald-700">Personalized 21-Day Plan</p>
          <ul className="mt-3 space-y-2">
            <Point><b>No waiting</b> for the class — your plan starts within 24–48 hours</Point>
            <Point><b>No 90-minute session</b> to sit through</Point>
            <Point>Your dietitian builds the plan around your body, routine & home food</Point>
            <Point>Call & WhatsApp support from your dietitian for all 21 days</Point>
          </ul>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-sm text-gray-400 line-through">{P.regularPrice}</span>
            <span className="text-2xl font-extrabold text-gray-900">{P.price}</span>
            <span className="text-xs font-semibold text-gray-500">incl. GST</span>
          </div>
          <button
            type="button"
            onClick={onPersonalized}
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-green-600 to-lime-500 px-5 py-3.5 text-base font-bold text-white shadow-lg transition-all hover:from-green-700 hover:to-lime-600"
          >
            Start my plan now <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Option 2 — live Master Class first */}
        <div className="flex flex-col rounded-2xl border-2 border-gray-200 bg-white p-4">
          <h3 className="mt-2 text-base font-extrabold text-gray-900 md:text-lg">Learn first at the live Master Class</h3>
          <p className="text-xs font-semibold text-gray-600">{MASTERCLASS.name}</p>
          <ul className="mt-3 space-y-2">
            <Point>
              <span>
                <CalendarCheck className="mr-1 inline h-3.5 w-3.5 align-[-2px] text-gray-500" />
                <b>{MASTERCLASS.dateLabel}</b>, {MASTERCLASS.timeLabel}
              </span>
            </Point>
            <Point>
              <span className="inline-flex items-center gap-1">
                <Video className="h-3.5 w-3.5 text-gray-500" />
                Live on Zoom · {MASTERCLASS.durationLabel}
              </span>
            </Point>
            <Point>The 5 Golden Rules + the 21-day Indian diet & fasting plan</Point>
            <Point>Decide about the full program after the class</Point>
          </ul>
          <div className="mt-auto pt-4">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-gray-900">{PRICING.price}</span>
              <span className="text-xs font-semibold text-gray-500">one-time</span>
            </div>
            <button
              type="button"
              onClick={onMasterClass}
              className="no-heartbeat mt-3 w-full rounded-full border-2 border-emerald-600 bg-white px-5 py-3 text-base font-bold text-emerald-700 transition-colors hover:bg-emerald-50"
            >
              Reserve my seat — {PRICING.price}
            </button>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={onConsultation}
        className="no-heartbeat mx-auto mt-4 flex items-center gap-1.5 text-sm font-semibold text-gray-600 underline-offset-2 hover:text-gray-900 hover:underline"
      >
        <PhoneCall className="h-4 w-4" /> Not sure which one? Book a free call with our team
      </button>
    </div>
  </Overlay>
);
