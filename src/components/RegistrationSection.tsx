import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const COUNTRY_CODES = [
  { code: "+91", country: "IN", flag: "🇮🇳" },
  { code: "+1", country: "US", flag: "🇺🇸" },
];

const RegistrationSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "+91",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // For phone field, only allow digits and limit to 10 characters
    if (name === 'phone') {
      const digitsOnly = value.replace(/\D/g, '').slice(0, 10);
      setFormData((prev) => ({ ...prev, [name]: digitsOnly }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleCountryCodeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, countryCode: value }));
  };

  const validateForm = () => {
    const newErrors = { name: "", email: "", phone: "" };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = "Please enter a valid email address";
      }
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (formData.phone.length !== 10) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

    setErrors(newErrors);
    return !newErrors.name && !newErrors.email && !newErrors.phone;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Create URL with pre-filled parameters for Razorpay Payment Link
    const baseUrl = "https://pages.razorpay.com/pl_SPR12T8v0hv9BD/view";
    const params = new URLSearchParams({
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      contact: formData.phone.trim(),
      mobile: formData.phone.trim(),
      name: formData.name.trim(),
      full_name: formData.name.trim(),
      customer_name: formData.name.trim(),
    });

    const paymentUrl = `${baseUrl}?${params.toString()}`;
    window.open(paymentUrl, "_blank");

    // Reset form and close modal
    setFormData({ name: "", email: "", phone: "", countryCode: "+91" });
    setIsModalOpen(false);
  };

  return (
    <>
      <section
        id="register"
        className="py-20 bg-gradient-to-b from-background to-primary/5"
      >
        <div className="w-full px-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 px-4"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Register Now
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Secure your spot in the Ultimate 14-Day Yoga Camp for just ₹99
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto text-center px-4"
          >
            <div className="">
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <Button
                      size="lg"
                      className="w-full px-8 bg-green-700 hover:bg-primary text-primary-foreground text-sm py-6 shadow-hover transition-all duration-300 hover:scale-105"
                    >
                      Complete Registration
                    </Button>
                  </motion.div>
                </DialogTrigger>

                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-center text-2xl">
                      Registration Details
                    </DialogTitle>
                    <DialogDescription className="text-center">
                      Fill your details to proceed to payment
                    </DialogDescription>
                  </DialogHeader>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="text-base">
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className="mt-2"
                      />
                      {errors.name && (
                        <p className="text-destructive text-sm mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-base">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email address"
                        className="mt-2"
                      />
                      {errors.email && (
                        <p className="text-destructive text-sm mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-base">
                        Phone Number *
                      </Label>
                      <div className="flex gap-2 mt-2">
                        <Select value={formData.countryCode} onValueChange={handleCountryCodeChange}>
                          <SelectTrigger className="w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {COUNTRY_CODES.map((country) => (
                              <SelectItem key={country.code} value={country.code}>
                                <span className="flex items-center gap-2">
                                  <span>{country.flag}</span>
                                  <span>{country.code}</span>
                                </span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <div className="flex-1 relative">
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="Enter your 10-digit phone number"
                            className="pr-12"
                            maxLength={10}
                          />
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
                            {formData.phone.length}/10
                          </div>
                        </div>
                      </div>
                      {errors.phone && (
                        <p className="text-destructive text-sm mt-1">
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6 mt-6"
                    >
                      Proceed to Payment - ₹99
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Separate Chat Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-green-50 to-emerald-50 border-t border-green-200">
        <div className="w-full px-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center px-4"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Have Questions?
            </h3>
            <p className="text-lg text-gray-600 mb-8">
              Our team is here to help! Chat with us on WhatsApp for any queries about the program.
            </p>
            <Button
              type="button"
              size="lg"
              onClick={() => window.open('https://api.whatsapp.com/send/?phone=917208683034&text&type=phone_number&app_absent=0', '_blank')}
              className="bg-green-700 hover:bg-green-600 text-white text-lg py-6 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <MessageCircle className="w-6 h-6" />
              Chat with us
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default RegistrationSection;