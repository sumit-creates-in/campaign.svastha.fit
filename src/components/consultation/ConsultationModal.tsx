import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, CheckCircle } from "lucide-react";
import svasthaLogo from "@/assets/svastha.png";

interface FormData {
  name: string;
  countryCode: string;
  contactNumber: string;
  email: string;
  age: string;
  gender: string;
  service: string;
  preferredCallTime: string;
  preferredCallDate: string;
}

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConsultationModal = ({ isOpen, onClose }: ConsultationModalProps) => {
  const [showConfirmation, setShowConfirmation] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    countryCode: "+91",
    contactNumber: "",
    email: "",
    age: "",
    gender: "",
    service: "",
    preferredCallTime: "",
    preferredCallDate: "",
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const formatTime12h = (timeStr: string) => {
        if (!timeStr) return "";
        const [h, m] = timeStr.split(":").map(Number);
        const ampm = h >= 12 ? "PM" : "AM";
        const hour = h % 12 || 12;
        return `${hour}:${m.toString().padStart(2, "0")} ${ampm}`;
      };

      const formatDate = (dateStr: string) => {
        if (!dateStr) return "";
        const d = new Date(dateStr + "T00:00:00");
        return d.toLocaleDateString("en-US", { month: "long", day: "2-digit", year: "numeric" });
      };

      // Fire webhook directly
      const webhookPayload = {
        name: formData.name,
        contact: `${formData.countryCode.replace('+', '')}${formData.contactNumber}`,
        email: formData.email || "",
        age: formData.age,
        gender: formData.gender,
        service: formData.service,
        preferredCallTime: `${formatTime12h(formData.preferredCallTime)}`,
        preferredCallDate: formatDate(formData.preferredCallDate),
      };

      await fetch("https://svastha-automator-webhook-production.up.railway.app/api/webhooks/1MVICIqbXcGzeurjkm-iMr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(webhookPayload),
      });

      onClose();
      setShowSuccessModal(true);
      setShowConfirmation(true); // Reset for next time
      setFormData({
        name: "",
        countryCode: "+91",
        contactNumber: "",
        email: "",
        age: "",
        gender: "",
        service: "",
        preferredCallTime: "",
        preferredCallDate: "",
      });
    } catch (error) {
      console.error("Failed to submit form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const canSubmit = formData.name && formData.contactNumber && formData.age && formData.gender && formData.service && formData.preferredCallTime && formData.preferredCallDate;

  // Returns today's date as YYYY-MM-DD in LOCAL timezone (not UTC)
  const getTodayLocal = () => {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  if (!isOpen && !showSuccessModal) return null;

  return (
    <>
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-8 relative animate-in fade-in zoom-in duration-300">
            {/* Close button */}
            <button
              type="button"
              onClick={() => setShowSuccessModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-24 h-24 bg-teal-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-16 w-16 text-teal-500" strokeWidth={2} />
                </div>
                <div className="absolute inset-0 bg-teal-400 rounded-full blur-xl opacity-20 animate-pulse"></div>
              </div>
            </div>

            {/* Success Message */}
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-3">
              Thanks! Your form is submitted
            </h2>
            <p className="text-center text-gray-600 mb-8">
              Our team will contact you soon.
            </p>

            {/* Got it Button */}
            <div className="flex justify-center">
              <Button
                type="button"
                onClick={() => setShowSuccessModal(false)}
                className="px-12 py-6 rounded-full bg-teal-500 hover:bg-teal-600 text-white text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Got it!
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Consultation Form Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          {showConfirmation ? (
            // Simple Confirmation Screen
            <div className="bg-white rounded-3xl w-full max-w-md p-8 relative animate-in fade-in zoom-in duration-300">
              {/* Close button */}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  setShowConfirmation(true); // Reset for next time
                }}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Logo */}
              <div className="text-center mb-6">
                <img src={svasthaLogo} alt="Svastha" className="h-12 mx-auto" />
              </div>

              {/* Simple Question */}
              <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
                Are you okay with paid plan?
              </h2>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button
                  type="button"
                  onClick={() => setShowConfirmation(false)}
                  className="flex-1 px-8 py-6 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Yes
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    onClose();
                    setShowConfirmation(true);
                  }}
                  variant="outline"
                  className="flex-1 px-8 py-6 rounded-full border-2 border-gray-300 text-gray-700 hover:bg-gray-50 text-lg font-semibold"
                >
                  No
                </Button>
              </div>
            </div>
          ) : (
            // Registration Form
            <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
              {/* Close button */}
              <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Logo */}
              <div className="text-center pt-8 pb-4 px-4">
                <img src={svasthaLogo} alt="Svastha" className="h-10 sm:h-12 mx-auto" />
              </div>

              {/* Form content */}
              <div className="px-4 sm:px-8 py-6">
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-center">Let's Get Started!</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">
                        Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Your name"
                        className="mt-1 border-0 border-b border-gray-300 rounded-none focus:ring-0 bg-teal-50/50"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">
                        Contact Number <span className="text-red-500">*</span>
                      </Label>
                      <div className="flex items-center mt-1 gap-2">
                        <select
                          value={formData.countryCode}
                          onChange={(e) => handleInputChange("countryCode", e.target.value)}
                          className="border-0 border-b border-gray-300 rounded-none focus:ring-0 bg-transparent px-2 py-2"
                          style={{ width: "80px" }}
                        >
                          <option value="+91">🇮🇳 +91</option>
                          <option value="+1">🇺🇸 +1</option>
                          <option value="+44">🇬🇧 +44</option>
                          <option value="+971">🇦🇪 +971</option>
                          <option value="+61">🇦🇺 +61</option>
                          <option value="+65">🇸🇬 +65</option>
                          <option value="+60">🇲🇾 +60</option>
                        </select>
                        <Input
                          value={formData.contactNumber}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                            handleInputChange("contactNumber", value);
                          }}
                          placeholder="Your number"
                          type="tel"
                          maxLength={10}
                          className="flex-1 border-0 border-b border-gray-300 rounded-none focus:ring-0"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Email (optional)</Label>
                      <Input
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="your@email.com"
                        className="mt-1 border-0 border-b border-gray-300 rounded-none focus:ring-0"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">
                        Age <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        value={formData.age}
                        onChange={(e) => handleInputChange("age", e.target.value)}
                        placeholder="Your age"
                        type="number"
                        className="mt-1 border-0 border-b border-gray-300 rounded-none focus:ring-0"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">
                        Service <span className="text-red-500">*</span>
                      </Label>
                      <Select value={formData.service} onValueChange={(v) => handleInputChange("service", v)}>
                        <SelectTrigger className="mt-1 border-0 border-b border-gray-300 rounded-none">
                          <SelectValue placeholder="Select service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="weight-loss">Weight Loss</SelectItem>
                          <SelectItem value="diabetes-pcos-thyroid">Reverse Diabetes, PCOS & Thyroid</SelectItem>
                          <SelectItem value="hypertension-heart">Reverse Hypertension & Heart Diseases</SelectItem>
                          <SelectItem value="hormonal-inflammation">Reverse Hormonal Imbalance & Inflammation</SelectItem>
                          <SelectItem value="fatty-liver-kidney">Reverse Fatty Liver, Liver & Kidney Issues</SelectItem>
                          <SelectItem value="all-above">All of the above</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">
                        Gender <span className="text-red-500">*</span>
                      </Label>
                      <Select value={formData.gender} onValueChange={(v) => handleInputChange("gender", v)}>
                        <SelectTrigger className="mt-1 border-0 border-b border-gray-300 rounded-none">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Preferred Date for Call</Label>
                      <Input
                        type="date"
                        value={formData.preferredCallDate}
                        min={getTodayLocal()}
                        onChange={(e) => {
                          const newDate = e.target.value;
                          handleInputChange("preferredCallDate", newDate);
                          // Clear selected time if it's now in the past for today
                          if (newDate === getTodayLocal() && formData.preferredCallTime) {
                            const [h, m] = formData.preferredCallTime.split(':').map(Number);
                            const selectedMinutes = h * 60 + m;
                            const now = new Date();
                            const currentMinutes = now.getHours() * 60 + now.getMinutes();
                            if (selectedMinutes <= currentMinutes + 30) {
                              handleInputChange("preferredCallTime", "");
                            }
                          }
                        }}
                        className="mt-1 border-0 border-b border-gray-300 rounded-none"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Preferred Time for Call</Label>
                      <Select
                        value={formData.preferredCallTime}
                        onValueChange={(value) => handleInputChange("preferredCallTime", value)}
                      >
                        <SelectTrigger className="mt-1 border-0 border-b border-gray-300 rounded-none shadow-none focus:ring-0">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          {(() => {
                            const now = new Date();
                            const isToday = formData.preferredCallDate === getTodayLocal();
                            const currentTotalMinutes = isToday ? now.getHours() * 60 + now.getMinutes() : -1;

                            return Array.from({ length: Math.floor((21 * 60 - 9 * 60) / 15) + 1 }, (_, i) => {
                              const totalMinutes = 9 * 60 + i * 15;
                              // Skip past times when today is selected (add 30 min buffer)
                              if (isToday && totalMinutes <= currentTotalMinutes + 30) return null;
                              const h = Math.floor(totalMinutes / 60);
                              const m = totalMinutes % 60;
                              const period = h >= 12 ? 'PM' : 'AM';
                              const displayHour = h > 12 ? h - 12 : h;
                              const label = `${displayHour}:${m.toString().padStart(2, '0')} ${period}`;
                              const value = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
                              return <SelectItem key={value} value={value}>{label}</SelectItem>;
                            }).filter(Boolean);
                          })()}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <p className="text-xs text-center text-gray-500">
                    By clicking the button you agree to Svastha's{" "}
                    <a href="/terms" className="underline">Terms & Conditions</a>
                  </p>
                </div>
              </div>

              {/* Submit button */}
              <div className="px-4 sm:px-8 pb-8 flex justify-center">
                <Button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!canSubmit || isSubmitting}
                  className="w-full sm:w-auto px-8 py-3 rounded-full bg-teal-400 hover:bg-teal-500 text-white disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting..." : "Book your consultation"}
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ConsultationModal;
