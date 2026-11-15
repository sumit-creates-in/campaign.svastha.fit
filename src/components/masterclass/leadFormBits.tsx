import { forwardRef, type ReactNode } from "react";
import { AlertCircle, X } from "lucide-react";

/** Shared look for the Master Class page's small lead forms. */

export const fieldClass = (hasError: boolean) =>
  `w-full rounded-xl border-2 px-3.5 py-2.5 text-base text-gray-900 outline-none transition-colors ${
    hasError
      ? "border-red-400 bg-red-50 focus:border-red-500"
      : "border-gray-200 focus:border-emerald-500"
  }`;

export const ErrorText = ({ children }: { children: ReactNode }) => (
  <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-600">
    <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
    {children}
  </p>
);

export const chipClass = (selected: boolean, hasError = false) =>
  `no-heartbeat rounded-xl border-2 px-2.5 py-2 text-xs font-medium transition-all ${
    selected
      ? "border-emerald-500 bg-emerald-50 text-emerald-800"
      : hasError
        ? "border-red-300 bg-red-50 text-gray-600"
        : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
  }`;

interface PhoneProps {
  id: string;
  value: string;
  onChange: (digits: string) => void;
  error?: string;
  hint?: string;
}

export const PhoneInput = forwardRef<HTMLInputElement, PhoneProps>(
  ({ id, value, onChange, error, hint }, ref) => (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-semibold text-gray-700">
        WhatsApp number <span className="text-red-500">*</span>
      </label>
      <div
        className={`flex items-stretch overflow-hidden rounded-xl border-2 transition-colors ${
          error
            ? "border-red-400 bg-red-50 focus-within:border-red-500"
            : "border-gray-200 focus-within:border-emerald-500"
        }`}
      >
        <span
          className={`flex items-center whitespace-nowrap border-r-2 px-3 text-base font-medium text-gray-600 ${
            error ? "border-red-400 bg-red-100/60" : "border-gray-200 bg-gray-50"
          }`}
        >
          🇮🇳 +91
        </span>
        <input
          id={id}
          ref={ref}
          type="tel"
          inputMode="numeric"
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/\D/g, "").slice(0, 10))}
          autoComplete="tel"
          placeholder="10-digit number"
          aria-invalid={!!error}
          className="w-full bg-transparent px-3.5 py-2.5 text-base text-gray-900 outline-none"
        />
      </div>
      {error ? (
        <ErrorText>{error}</ErrorText>
      ) : hint ? (
        <p className="mt-1 text-[11px] text-gray-500">{hint}</p>
      ) : null}
    </div>
  ),
);
PhoneInput.displayName = "PhoneInput";

export function validateName(name: string) {
  const n = name.trim();
  if (!n) return "Please enter your name";
  if (n.length < 2) return "That name looks too short";
  return undefined;
}

export function validatePhone(digits: string) {
  if (!digits) return "Please enter your WhatsApp number";
  if (digits.length !== 10) return `Needs 10 digits — you've entered ${digits.length}`;
  return undefined;
}

export function validateEmail(email: string) {
  const e = email.trim();
  if (!e) return "Please enter your email";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) return "That email doesn't look right";
  return undefined;
}

/** Full-screen dim layer + white card used by every popup on the page. */
export const Overlay = ({
  children,
  onClose,
  labelledBy,
  maxWidth = "max-w-md",
  z = "z-[60]",
}: {
  children: ReactNode;
  onClose: () => void;
  labelledBy: string;
  maxWidth?: string;
  z?: string;
}) => (
  <div
    className={`fixed inset-0 ${z} flex items-start justify-center overflow-y-auto bg-black/70 p-3 backdrop-blur-sm md:items-center md:p-4`}
    role="dialog"
    aria-modal="true"
    aria-labelledby={labelledBy}
    onClick={onClose}
  >
    <div
      className={`relative my-4 w-full ${maxWidth} rounded-3xl bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-200`}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        onClick={onClose}
        className="no-heartbeat absolute right-3 top-3 z-10 rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
        aria-label="Close"
      >
        <X className="h-5 w-5" strokeWidth={2} />
      </button>
      {children}
    </div>
  </div>
);
