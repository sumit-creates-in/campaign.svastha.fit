import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

const COUNTRY_CODES = [
    { code: "+91", country: "IN", flag: "🇮🇳" },
    { code: "+1", country: "US", flag: "🇺🇸" },
];

interface RegistrationModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    hideNameEmail?: boolean;
    defaultCountryCode?: string;
    phoneLabel?: string;
    buttonText?: string;
    modalTitle?: string;
    isInternational?: boolean;
}

const RegistrationModal = ({ isOpen, onOpenChange, hideNameEmail = false, defaultCountryCode = "+91", phoneLabel = "Phone Number", buttonText = "Proceed to Payment - ₹99", modalTitle = "Registration Details", isInternational = false }: RegistrationModalProps) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        countryCode: defaultCountryCode,
    });
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        phone: "",
    });

    // Update country code when defaultCountryCode prop changes
    useEffect(() => {
        setFormData(prev => ({ ...prev, countryCode: defaultCountryCode }));
    }, [defaultCountryCode]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

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

        if (!hideNameEmail) {
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

        // For international users, fire webhook and redirect to confirmation page
        if (isInternational) {
            // Remove + from country code and combine with phone number
            const phoneWithoutPlus = formData.countryCode.replace('+', '') + formData.phone.trim();
            
            // Fire webhook
            const webhookUrl = "https://dash.botbiz.io/webhook/whatsapp-workflow/106644.353253.334276.1773479085";
            fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phone: phoneWithoutPlus
                })
            }).catch(error => {
                console.error('Webhook error:', error);
            });

            // Redirect to confirmation page
            window.location.href = "/registration-confirm-14-day-yoga-fat-loss-camp-int";
            
            setFormData({ name: "", email: "", phone: "", countryCode: defaultCountryCode });
            onOpenChange(false);
            return;
        }

        // For domestic users, proceed to payment
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

        setFormData({ name: "", email: "", phone: "", countryCode: "+91" });
        onOpenChange(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-center text-2xl">
                        {modalTitle}
                    </DialogTitle>
                    <DialogDescription className="text-center">
                        Fill your details to proceed to payment
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!hideNameEmail && (
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
                    )}

                    {!hideNameEmail && (
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
                    )}

                    <div>
                        <Label htmlFor="phone" className="text-base">
                            {phoneLabel} *
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
                        {buttonText}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default RegistrationModal;
