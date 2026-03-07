import { Star, Quote } from "lucide-react";

const SuccessStoriesSection = () => {
  const testimonials = [
    {
      name: "Priya M.",
      result: "Lost 9 kg in 12 weeks",
      quote: "I never imagined I could lose this much weight with yoga. The program changed my entire approach to fitness and health.",
      image: "/src/assets/Priyanka.jpg",
      rating: 5
    },
    {
      name: "Rahul K.",
      result: "Lost 11 kg in 12 weeks",
      quote: "This program changed my relationship with food. I learned to eat mindfully and the weight just came off naturally.",
      image: "/src/assets/Mudit.jpg",
      rating: 5
    },
    {
      name: "Anjali S.",
      result: "Lost 7 kg in 12 weeks",
      quote: "I feel stronger, lighter and more confident. The support from Sumit and the community made all the difference.",
      image: "/src/assets/Karishma.jpg",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Headline */}
          <h2 className="text-3xl md:text-5xl font-bold text-center text-gray-900 mb-4">
            Real Transformations
          </h2>
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
            See how our students transformed their bodies and lives in just 12 weeks
          </p>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-emerald-50 to-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-emerald-100"
              >
                {/* Quote Icon */}
                <div className="bg-emerald-600 w-10 h-10 rounded-full flex items-center justify-center mb-4">
                  <Quote className="w-5 h-5 text-white" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-gray-700 leading-relaxed mb-6 italic">
                  "{testimonial.quote}"
                </p>

                {/* Profile */}
                <div className="flex items-center gap-4 pt-4 border-t border-emerald-100">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-emerald-200"
                  />
                  <div>
                    <p className="font-bold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-emerald-600 font-semibold">{testimonial.result}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Before/After Section */}
          <div className="bg-gradient-to-br from-emerald-600 to-green-600 rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Join Thousands of Successful Transformations
            </h3>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Our proven system has helped people just like you achieve lasting results through sustainable lifestyle changes
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStoriesSection;
