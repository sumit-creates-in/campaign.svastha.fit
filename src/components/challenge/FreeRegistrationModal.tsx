import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Country {
  value: string;
  code: string;
  flag: string;
  name: string;
  maxDigits: number;
}

const COUNTRIES: Country[] = [
  { value: "us", code: "+1", flag: "🇺🇸", name: "USA", maxDigits: 10 },
  { value: "ca", code: "+1", flag: "🇨🇦", name: "Canada", maxDigits: 10 },
];

interface FreeRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  startDateText?: string;
}

export const FreeRegistrationModal = ({
  isOpen,
  onClose,
  startDateText = "12th July",
}: FreeRegistrationModalProps) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES[0]);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Please enter your name.");
      return;
    }
    const digits = mobile.replace(/[\s\-()]/g, "");
    if (!digits?.length || digits.length !== selectedCountry.maxDigits) {
      toast.error(
        `Please enter a valid ${selectedCountry.maxDigits}-digit phone number for ${selectedCountry.name}.`,
      );
      return;
    }

    const fullPhone = `${selectedCountry.code}${digits}`;
    const WEBHOOK = "https://campaigns.svastha.fit/wp-json/uap/v2/uap-398-399";

    setIsSubmitting(true);
    try {
      // Try POST first
      let res = await fetch(WEBHOOK, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ name: name.trim(), phone: fullPhone }),
      });

      // Fallback to GET with query params if POST returns 404
      if (!res.ok && res.status === 404) {
        const params = new URLSearchParams({
          name: name.trim(),
          phone: fullPhone,
        });
        await fetch(`${WEBHOOK}?${params}`, {
          method: "GET",
          headers: { Accept: "application/json" },
        });
      }
    } catch {
      // Fire-and-forget — don't block the user on network errors
    } finally {
      setIsSubmitting(false);
    }

    toast.success("You're registered! Redirecting...");
    navigate("/u21dwlc-group-registration-success-usa");
  };

  const handleClose = () => {
    setName("");
    setMobile("");
    setSelectedCountry(COUNTRIES[0]);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-700 hover:text-gray-900 transition-colors z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" strokeWidth={2} />
        </button>

        <div className="px-8 py-10">
          {/* Header */}
          <div className="mb-6 text-center">
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1 mb-3">
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wide">
                🎁 FREE Group Plan
              </span>
            </div>
            <h2 className="text-base font-bold text-gray-900 leading-tight mb-1">
              Join the 21 Day Weight Loss Challenge
            </h2>
            <p className="text-xs text-gray-500">
              Starts{" "}
              <span className="font-semibold text-emerald-600">
                {startDateText}
              </span>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="free-reg-name"
                className="block text-xs font-semibold text-gray-700 mb-1"
              >
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="free-reg-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition"
                required
              />
            </div>

            <div>
              <label
                htmlFor="free-reg-mobile"
                className="block text-xs font-semibold text-gray-700 mb-1"
              >
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <div className="flex border border-gray-300 rounded-lg overflow-visible focus-within:ring-2 focus-within:ring-emerald-400 focus-within:border-transparent transition relative">
                {/* Custom country picker trigger */}
                <button
                  type="button"
                  onClick={() => setIsCountryOpen((o) => !o)}
                  className="flex-shrink-0 flex items-center gap-1.5 bg-gray-50 border-r border-gray-300 px-3 py-2.5 text-sm text-gray-800 font-medium hover:bg-gray-100 transition rounded-l-lg focus:outline-none whitespace-nowrap"
                  aria-label="Select country code"
                >
                  <span className="text-lg leading-none">
                    {selectedCountry.flag}
                  </span>
                  <span>{selectedCountry.code}</span>
                  <svg
                    className="w-3 h-3 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Dropdown list */}
                {isCountryOpen && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-52 overflow-y-auto">
                    {COUNTRIES.map((c) => (
                      <button
                        key={c.value}
                        type="button"
                        onClick={() => {
                          setSelectedCountry(c);
                          setIsCountryOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-emerald-50 transition text-left ${selectedCountry.value === c.value
                            ? "bg-emerald-50 text-emerald-700 font-semibold"
                            : "text-gray-700"
                          }`}
                      >
                        <span className="text-xl leading-none">{c.flag}</span>
                        <span className="flex-1">{c.name}</span>
                        <span className="text-gray-500 font-medium">
                          {c.code}
                        </span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Number input */}
                <input
                  id="free-reg-mobile"
                  type="tel"
                  value={mobile}
                  onChange={(e) => {
                    const digits = e.target.value
                      .replace(/\D/g, "")
                      .slice(0, selectedCountry.maxDigits);
                    setMobile(digits);
                  }}
                  onFocus={() => setIsCountryOpen(false)}
                  placeholder={"0".repeat(selectedCountry.maxDigits)}
                  maxLength={selectedCountry.maxDigits}
                  inputMode="numeric"
                  className="flex-1 min-w-0 px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none bg-white rounded-r-lg"
                  required
                />
              </div>
              <p className="text-[10px] text-gray-400 mt-1 text-right">
                {mobile.length}/{selectedCountry.maxDigits} digits
              </p>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-green-500 to-lime-400 hover:from-green-600 hover:to-lime-500 text-white font-semibold text-sm py-3.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Registering..." : "Register For Free →"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
