import { motion } from "framer-motion";
import { CheckCircle, Phone, Mail, MessageCircle } from "lucide-react";
import { useEffect } from "react";

const U21DWLCPaymentConfirmation = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleWhatsApp = () => {
        window.open("https://wa.me/917208683034", "_blank");
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-pink-50 overflow-x-hidden">
            {/* Success Header */}
            <section className="py-12 px-4 bg-gradient-to-r from-purple-600 to-pink-600">
                <div className="container mx-auto max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <div className="flex justify-center mb-6">
                            <CheckCircle className="w-20 h-20 text-white" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            🥳 Congratulations! 🎉
                        </h1>
                        <p className="text-xl text-white/90">
                            You have successfully registered for the Personalized Ultimate 21 Day Weight Loss Challenge
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-12 px-4">
                <div className="container mx-auto max-w-4xl">
                    {/* We Will Call You */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8 border-2 border-purple-200"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <Phone className="w-12 h-12 text-purple-600" />
                            <h2 className="text-2xl font-bold text-gray-900">
                                We will call you soon to schedule your plan!
                            </h2>
                        </div>
                        <div className="space-y-4 text-gray-700 text-lg">
                            <p>
                                You don't have to do anything now. We will call you soon to schedule your plan.
                            </p>
                            <p className="text-gray-600">
                                If you have registered out of office hours (10 am to 7 pm) then we will call you the next working hour slot.
                            </p>
                        </div>
                    </motion.div>

                    {/* Support Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-lg p-8 md:p-12 border-2 border-green-200"
                    >
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">
                            Need Support?
                        </h3>

                        <div className="space-y-6">
                            {/* WhatsApp */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: 0.5 }}
                                className="flex items-start gap-4 bg-white rounded-xl p-6 cursor-pointer hover:shadow-md transition-shadow"
                                onClick={handleWhatsApp}
                            >
                                <MessageCircle className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
                                <div>
                                    <p className="font-bold text-gray-900 text-lg mb-1">WhatsApp us</p>
                                    <p className="text-green-600 font-semibold">+91 72086 83034</p>
                                </div>
                            </motion.div>

                            {/* Email */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: 0.6 }}
                                className="flex items-start gap-4 bg-white rounded-xl p-6"
                            >
                                <Mail className="w-8 h-8 text-purple-600 flex-shrink-0 mt-1" />
                                <div className="min-w-0 flex-1">
                                    <p className="font-bold text-gray-900 text-lg mb-1">Email us for support</p>
                                    <a 
                                        href="mailto:support@StrongByYoga.com"
                                        className="text-purple-600 font-semibold hover:underline"
                                    >
                                        support@StrongBy<br />Yoga.com
                                    </a>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default U21DWLCPaymentConfirmation;
