import { useState, useEffect } from 'react';
import { Check, X, Calendar, MapPin, Youtube, Clock, Star, Sunrise, Sunset, ArrowBigDown } from 'lucide-react';
import coachImage from '@/assets/image.png';
import svasthaLogo from '@/assets/svastha.png';

const YogaWithSumit = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: ''
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ name: '', whatsapp: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.whatsapp) {
      alert('Please fill in all fields');
      return;
    }

    // Create WhatsApp message with user details
    const message = `Hi, I'm ${formData.name} and I want to join Yoga with Sumit. My WhatsApp number is ${formData.whatsapp}`;
    const whatsappLink = `https://wa.me/[PHONE_NUMBER]?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp
    window.open(whatsappLink, '_blank');
    
    // Close modal and reset form
    handleCloseModal();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 md:p-8 relative animate-in fade-in zoom-in duration-300">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
            
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Join Yoga with Sumit</h3>
              <p className="text-gray-600">Enter your details to get started</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#25D366] focus:outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label htmlFor="whatsapp" className="block text-sm font-semibold text-gray-700 mb-2">
                  WhatsApp Number
                </label>
                <input
                  type="tel"
                  id="whatsapp"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleInputChange}
                  placeholder="Enter your WhatsApp number"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#25D366] focus:outline-none transition-colors"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Continue to WhatsApp
              </button>
            </form>

            <p className="text-xs text-gray-500 text-center mt-4">
              By continuing, you agree to receive class updates on WhatsApp
            </p>
          </div>
        </div>
      )}

      {/* SECTION 1: HERO */}
      <section className="py-10 px-4 md:py-20 md:px-8 max-w-6xl mx-auto">
        <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <img 
            src={svasthaLogo} 
            alt="Svastha Logo" 
            className="w-20 md:w-20 mx-auto mb-6"
          />
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Yoga with Sumit
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-orange-600 mb-4">
            Lose Weight with Daily Yoga — FREE Live Classes
          </h2>
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Join India's fastest-growing daily yoga program and start your fitness journey from home.
          </p>

          <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-8">
            <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-md">
              <Check className="text-green-500 flex-shrink-0" size={24} />
              <span className="text-left">45–55 min guided sessions</span>
            </div>
            <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-md">
              <Check className="text-green-500 flex-shrink-0" size={24} />
              <span className="text-left">Beginner friendly</span>
            </div>
            <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-md">
              <Check className="text-green-500 flex-shrink-0" size={24} />
              <span className="text-left">Morning & evening batches</span>
            </div>
            <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-md">
              <Check className="text-green-500 flex-shrink-0" size={24} />
              <span className="text-left">No equipment needed</span>
            </div>
          </div>

          <button
            onClick={handleOpenModal}
            className="inline-block bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-lg px-8 py-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 mb-6"
          >
            Join FREE on WhatsApp
          </button>

          <p className="text-gray-600 flex items-center justify-center gap-2">
            <Star className="text-green-500 fill-green-500" size={20} />
            <span className="font-semibold">1000+ people already practicing daily</span>
          </p>
        </div>
      </section>

      {/* SECTION 2: PROBLEM → AGITATION */}
      <section className="py-10 px-4 md:py-16 md:px-8 bg-red-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            Struggling to Stay Consistent with Fitness?
          </h2>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-700">❌ Started workouts but couldn't continue?</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-700">❌ No time to go to gym?</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-700">❌ Tried diets but no results?</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-700">❌ Feeling low energy & gaining weight?</p>
            </div>
          </div>
          <div className="bg-orange-100 border-l-4 border-orange-500 p-6 rounded-lg">
            <p className="text-lg font-semibold text-gray-800">
              You're not alone. The real problem is lack of consistency and guidance.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: SOLUTION */}
      <section className="py-10 px-4 md:py-16 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            We Made Yoga Simple, Daily & Effective
          </h2>
          <p className="text-lg text-gray-700 mb-6 text-center">
            With Yoga with Sumit, you don't need:
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 bg-gray-100 px-6 py-3 rounded-full">
              <X className="text-red-500" size={20} />
              <span>Fancy gym</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-100 px-6 py-3 rounded-full">
              <X className="text-red-500" size={20} />
              <span>Expensive trainers</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-100 px-6 py-3 rounded-full">
              <X className="text-red-500" size={20} />
              <span>Strict dieting</span>
            </div>
          </div>

          <div className="bg-green-50 border-2 border-green-500 p-6 rounded-lg mb-8">
            <p className="text-xl font-bold text-center text-gray-800">
              Just follow along daily from your home.
            </p>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">What You Get</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-orange-500">
              <p className="font-semibold text-gray-800">✨ Structured daily yoga sessions</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-orange-500">
              <p className="font-semibold text-gray-800">✨ Easy-to-follow routines</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-orange-500">
              <p className="font-semibold text-gray-800">✨ Guided by expert coach Sumit</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-orange-500">
              <p className="font-semibold text-gray-800">✨ Designed for real results (weight loss, energy, flexibility)</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: CLASS DETAILS */}
      <section className="py-10 px-4 md:py-16 md:px-8 bg-gradient-to-b from-blue-50 to-purple-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center">
            Choose Your Convenient Time
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <Sunrise className="text-orange-500" size={32} />
                <h3 className="text-2xl font-bold text-gray-900">Morning</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-lg">
                  <Clock className="text-orange-500" size={20} />
                  <span className="font-semibold">6:30 AM</span>
                </div>
                <div className="flex items-center gap-3 text-lg">
                  <Clock className="text-orange-500" size={20} />
                  <span className="font-semibold">7:30 AM</span>
                </div>
                <div className="flex items-center gap-3 text-lg">
                  <Clock className="text-orange-500" size={20} />
                  <span className="font-semibold">8:30 AM</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <Sunset className="text-purple-500" size={32} />
                <h3 className="text-2xl font-bold text-gray-900">Evening</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-lg">
                  <Clock className="text-purple-500" size={20} />
                  <span className="font-semibold">5:30 PM</span>
                </div>
                <div className="flex items-center gap-3 text-lg">
                  <Clock className="text-purple-500" size={20} />
                  <span className="font-semibold">6:30 PM</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-3">
              <Calendar className="text-blue-500 flex-shrink-0" size={24} />
              <span className="font-semibold">Available 7 Days a Week</span>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-3">
              <MapPin className="text-green-500 flex-shrink-0" size={24} />
              <span className="font-semibold">Join from anywhere</span>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-3">
              <Youtube className="text-red-500 flex-shrink-0" size={24} />
              <span className="font-semibold">Live on YouTube</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: HOW IT WORKS */}
      <section className="py-10 px-4 md:py-16 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center">
            Start in Just 2 Simple Steps
          </h2>

          {/* Mobile View - Vertical with Arrows */}
          <div className="md:hidden space-y-4">
            {/* Step 1 Badge */}
            <div className="flex justify-center">
              <div className="text-3xl font-bold text-green-600 bg-gradient-to-br from-green-100 to-green-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg border-2 border-green-300">
                1
              </div>
            </div>

            <div className="flex justify-center">
              <ArrowBigDown className="w-10 h-10 text-green-600 animate-bounce" />
            </div>

            {/* Step 1 Text */}
            <div className="bg-gradient-to-br from-green-100 to-green-50 p-6 rounded-xl shadow-lg border-2 border-green-300">
              <p className="text-xl font-semibold text-gray-800 text-center">
                Click the button & join WhatsApp
              </p>
            </div>

            <div className="flex justify-center">
              <ArrowBigDown className="w-10 h-10 text-green-600 animate-bounce" />
            </div>

            {/* Step 2 Badge */}
            <div className="flex justify-center">
              <div className="text-3xl font-bold text-blue-600 bg-gradient-to-br from-blue-100 to-blue-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg border-2 border-blue-300">
                2
              </div>
            </div>

            <div className="flex justify-center">
              <ArrowBigDown className="w-10 h-10 text-green-600 animate-bounce" />
            </div>

            {/* Step 2 Text */}
            <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-6 rounded-xl shadow-lg border-2 border-blue-300">
              <p className="text-xl font-semibold text-gray-800 text-center">
                Get daily class links & reminders
              </p>
            </div>
          </div>

          {/* Desktop View - Side by Side */}
          <div className="hidden md:grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-green-100 to-green-50 p-8 rounded-xl shadow-lg border-2 border-green-300">
              <div className="text-4xl font-bold text-green-600 mb-4">1</div>
              <p className="text-xl font-semibold text-gray-800">
                Click the button & join WhatsApp
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-8 rounded-xl shadow-lg border-2 border-blue-300">
              <div className="text-4xl font-bold text-blue-600 mb-4">2</div>
              <p className="text-xl font-semibold text-gray-800">
                Get daily class links & reminders
              </p>
            </div>
          </div>

          <div className="bg-green-100 border-2 border-green-400 p-6 rounded-lg mt-8">
            <p className="text-xl font-bold text-center text-gray-800">
              That's it. No complicated process.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 6: RESULTS PUSH */}
      <section className="py-10 px-4 md:py-16 md:px-8 bg-gradient-to-r from-orange-50 to-red-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center">
            This is NOT Just Yoga — It's a Habit Transformation
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-lg shadow-md flex items-start gap-3">
              <Check className="text-green-500 flex-shrink-0 mt-1" size={24} />
              <span className="text-lg font-semibold text-gray-800">Lose weight naturally</span>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex items-start gap-3">
              <Check className="text-green-500 flex-shrink-0 mt-1" size={24} />
              <span className="text-lg font-semibold text-gray-800">Improve energy levels</span>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex items-start gap-3">
              <Check className="text-green-500 flex-shrink-0 mt-1" size={24} />
              <span className="text-lg font-semibold text-gray-800">Reduce stress</span>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex items-start gap-3">
              <Check className="text-green-500 flex-shrink-0 mt-1" size={24} />
              <span className="text-lg font-semibold text-gray-800">Build a strong daily routine</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: CTA (HIGH CONVERSION) */}
      <section className="py-10 px-4 md:py-16 md:px-8 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Start Your Fitness Journey Today — FREE
          </h2>
          <div className="bg-red-100 border-2 border-red-400 p-4 rounded-lg mb-8 inline-block">
            <p className="text-lg font-bold text-red-700">
              ⚠️ Limited WhatsApp spots to maintain quality
            </p>
          </div>
          <button
            onClick={handleOpenModal}
            className="inline-block bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-xl px-12 py-5 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            Join FREE Yoga Classes Now
          </button>
        </div>
      </section>

      {/* SECTION 8: AUTHORITY */}
      <section className="py-10 px-4 md:py-16 md:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            Meet Your Coach
          </h2>
          <div className="bg-white p-8 md:p-12 rounded-xl shadow-lg">
            <div className="text-center mb-6">
              <img 
                src={coachImage} 
                alt="Sumit - Yoga Teacher & Wellness Coach" 
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover shadow-lg border-4 border-orange-400"
              />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Sumit</h3>
              <p className="text-lg text-gray-600">Yoga Teacher & Wellness Coach</p>
            </div>
            <p className="text-lg text-gray-700 mb-6 text-center">
              Hi, I'm Sumit — Yoga Teacher & Wellness Coach.
            </p>
            <p className="text-xl font-semibold text-gray-800 mb-4 text-center md:text-center">
              I've helped hundreds of people:
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 justify-start md:justify-center">
                <Check className="text-green-500" size={24} />
                <span className="text-lg">Lose weight</span>
              </div>
              <div className="flex items-center gap-3 justify-start md:justify-center">
                <Check className="text-green-500" size={24} />
                <span className="text-lg">Build consistency</span>
              </div>
              <div className="flex items-center gap-3 justify-start md:justify-center">
                <Check className="text-green-500" size={24} />
                <span className="text-lg">Improve overall health</span>
              </div>
            </div>
            <p className="text-xl font-bold text-center text-orange-600">
              Now I want to help YOU — completely FREE.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 9: SOCIAL PROOF */}
      <section className="py-10 px-4 md:py-16 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center">
            What People Are Saying
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-green-500">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-green-500 fill-green-500" size={20} />
                ))}
              </div>
              <p className="text-lg font-semibold text-gray-800 mb-3">
                "Lost 3kg in 2 weeks!"
              </p>
              <p className="text-gray-600">
                The daily sessions are so easy to follow. I finally found something that works for me.
              </p>
              <p className="text-sm text-gray-500 mt-4">— Priya S.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-green-500">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-green-500 fill-green-500" size={20} />
                ))}
              </div>
              <p className="text-lg font-semibold text-gray-800 mb-3">
                "Finally consistent with fitness"
              </p>
              <p className="text-gray-600">
                I've tried everything but never stuck with it. This program changed that completely.
              </p>
              <p className="text-sm text-gray-500 mt-4">— Rahul M.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-green-500">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-green-500 fill-green-500" size={20} />
                ))}
              </div>
              <p className="text-lg font-semibold text-gray-800 mb-3">
                "Easy & effective sessions"
              </p>
              <p className="text-gray-600">
                Perfect for beginners. Sumit explains everything clearly and the results are amazing.
              </p>
              <p className="text-sm text-gray-500 mt-4">— Anjali K.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 10: FINAL CTA */}
      <section className="py-10 px-4 md:py-20 md:px-8 bg-gradient-to-b from-orange-100 to-orange-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Don't Wait for 'Someday'
          </h2>
          <div className="space-y-3 mb-8">
            <p className="text-2xl md:text-3xl font-bold text-orange-600">Start TODAY</p>
            <p className="text-2xl md:text-3xl font-bold text-orange-600">Start FREE</p>
            <p className="text-2xl md:text-3xl font-bold text-orange-600">Start with guidance</p>
          </div>
          <button
            onClick={handleOpenModal}
            className="inline-block bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-xl px-12 py-5 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            Join FREE on WhatsApp
          </button>
        </div>
      </section>

      {/* Sticky Bottom CTA (Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl p-4 md:hidden z-50 border-t-2 border-gray-200">
        <button
          onClick={handleOpenModal}
          className="block w-full bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-center py-4 rounded-full shadow-lg transition-all duration-300"
        >
          Join FREE on WhatsApp
        </button>
      </div>

      {/* Bottom padding for mobile sticky button */}
      <div className="h-20 md:hidden"></div>
    </div>
  );
};

export default YogaWithSumit;
