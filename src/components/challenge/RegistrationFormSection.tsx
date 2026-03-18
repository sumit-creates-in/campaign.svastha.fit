import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Zap, Phone, Mail, Calendar } from "lucide-react";
import { UseFormRegister, FieldErrors, UseFormSetValue, UseFormWatch } from "react-hook-form";

export interface RegistrationFormData {
  name: string;
  phone: string;
  countryCode: string;
}

interface RegistrationFormSectionProps {
  register: UseFormRegister<RegistrationFormData>;
  errors: FieldErrors<RegistrationFormData>;
  setValue: UseFormSetValue<RegistrationFormData>;
  watch: UseFormWatch<RegistrationFormData>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
}

const COUNTRY_CODES = [
  { code: "+91", country: "IN", flag: "🇮🇳" },
  { code: "+1", country: "US", flag: "🇺🇸" },
];

export const RegistrationFormSection = ({ register, errors, setValue, watch, onSubmit }: RegistrationFormSectionProps) => {
  return (
    <section id="registration" className="py-20 px-4 bg-gradient-to-br from-emerald-600 via-green-600 to-teal-600 text-white">
      <div className="container mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Register Now
          </h2>
          <p className="text-xl text-emerald-100">
            Join 6733+ people who are transforming their lives
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-8 shadow-2xl">
          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name" className="text-gray-700 font-semibold mb-2 block">
                Full Name *
              </Label>
              <Input
                id="name"
                {...register("name")}
                placeholder="Enter your full name"
                className="w-full text-lg py-6"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="phone" className="text-gray-700 font-semibold mb-2 block">
                Phone Number *
              </Label>
              <div className="flex gap-2">
                <Select
                  value={watch("countryCode")}
                  onValueChange={(value) => setValue("countryCode", value)}>
                  <SelectTrigger className="w-32 text-lg py-6">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {COUNTRY_CODES.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.flag} {country.code}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  id="phone"
                  {...register("phone")}
                  placeholder="10-digit phone number"
                  className="flex-1 text-lg py-6"
                  maxLength={10}
                />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
              )}
            </div>

            <div className="bg-emerald-50 rounded-xl p-6 border-2 border-emerald-200">
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-gray-900">Total Amount:</span>
                <span className="text-3xl font-bold text-emerald-600">₹990</span>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-600" />
                  21-Day Challenge Access
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-600" />
                  WhatsApp Support Group
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-emerald-600" />
                  Daily Diet & Yoga Plans
                </li>
              </ul>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-gradient-to-r from-green-600 to-lime-400 hover:from-green-700 hover:to-lime-500 text-white font-bold text-xl py-8 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              Register Now - Pay ₹990
              <Zap className="ml-2 w-6 h-6" />
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};
