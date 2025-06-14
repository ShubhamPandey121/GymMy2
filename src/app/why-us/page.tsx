'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Cute Robot Icon Component
const CuteRobotIcon = ({ className = "w-24 h-24" }) => (
  <div className={`${className} flex items-center justify-center`}>
    <img src="/GymMyLogo.svg" width={200}
                    height={80} alt="Cute Robot" />
  </div>
);

export default function WhyUsPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const router = useRouter();

  const testimonials = [
    {
      text: "This AI trainer actually understands me! It's like having a personal coach who never judges. 💖",
      author: "Sarah M.",
      achievement: "Lost 15 lbs in 2 months"
    },
    {
      text: "The gamification is addictive! I'm actually excited to work out now. 🎮",
      author: "Mike R.",
      achievement: "Gained 10 lbs muscle"
    },
    {
      text: "Best fitness app ever! The cute interface makes everything so much fun! ✨",
      author: "Emma L.",
      achievement: "Completed 100 workouts"
    }
  ];

  const stats = [
    { number: "50K+", label: "Happy Users", icon: "😊" },
    { number: "2M+", label: "Workouts Completed", icon: "💪" },
    { number: "98%", label: "Success Rate", icon: "🎯" },
    { number: "24/7", label: "AI Support", icon: "🤖" }
  ];

  useEffect(() => {
    setIsVisible(true);
    
    // Rotate testimonials every 6 seconds
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const handleGetStarted = () => {
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.05]">
        <div className="absolute top-[15%] left-[8%] text-[120px] text-blue-500 animate-bounce" style={{ animationDelay: '0s', animationDuration: '8s' }}>⭐</div>
        <div className="absolute top-[50%] right-[10%] text-[120px] text-purple-500 animate-pulse" style={{ animationDelay: '2s', animationDuration: '8s' }}>🚀</div>
        <div className="absolute bottom-[25%] left-[12%] text-[120px] text-blue-500 animate-bounce" style={{ animationDelay: '4s', animationDuration: '8s' }}>💎</div>
        <div className="absolute top-[25%] right-[30%] text-[120px] text-indigo-500 animate-pulse" style={{ animationDelay: '1s', animationDuration: '8s' }}>🏆</div>
        <div className="absolute bottom-[45%] right-[35%] text-[120px] text-sky-500 animate-bounce" style={{ animationDelay: '3s', animationDuration: '8s' }}>✨</div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-4 h-4 rounded-full opacity-20 animate-float`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: ['#3B82F6', '#8B5CF6', '#06B6D4', '#10B981'][Math.floor(Math.random() * 4)],
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <main className="relative z-10">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            
            {/* Hero Section */}
            <div className="text-center mb-20">
              <div className="flex justify-center mb-8">
                <CuteRobotIcon className="w-32 h-32" />
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gray-800 to-blue-500 bg-clip-text text-transparent mb-6" style={{ fontFamily: 'Comic Neue, cursive' }}>
                Why Choose
                <br />
                <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Our Cute Trainer?</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
                We're not just another fitness app. We're your adorable AI companion on a journey to a healthier, happier you! 🌟
              </p>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 text-center hover:scale-105 transition-all duration-300 shadow-xl border border-white/20"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="text-4xl mb-2">{stat.icon}</div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 text-sm font-medium">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Main Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
              {/* Feature 1 */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl p-8 hover:scale-105 hover:-translate-y-2 transition-all duration-300 shadow-xl border border-white/20">
                <div className="text-6xl mb-4 animate-bounce">🧠</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">True AI Intelligence</h3>
                <p className="text-gray-700">
                  Unlike other apps with basic algorithms, our AI actually learns your preferences, adapts to your schedule, and evolves with your fitness journey.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-3xl p-8 hover:scale-105 hover:-translate-y-2 transition-all duration-300 shadow-xl border border-white/20">
                <div className="text-6xl mb-4 animate-pulse">💝</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Emotionally Intelligent</h3>
                <p className="text-gray-700">
                  Our AI doesn't just track reps - it understands when you're having a tough day and adjusts motivation accordingly. It's like having an empathetic friend!
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-3xl p-8 hover:scale-105 hover:-translate-y-2 transition-all duration-300 shadow-xl border border-white/20">
                <div className="text-6xl mb-4 animate-bounce">🎮</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Next-Level Gamification</h3>
                <p className="text-gray-700">
                  Experience fitness like never before with RPG-style progression, epic achievements, and storylines that make every workout an adventure!
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-gradient-to-br from-yellow-50 to-orange-100 rounded-3xl p-8 hover:scale-105 hover:-translate-y-2 transition-all duration-300 shadow-xl border border-white/20">
                <div className="text-6xl mb-4 animate-pulse">🔬</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Science-Backed</h3>
                <p className="text-gray-700">
                  Every recommendation is based on the latest sports science research, combined with machine learning insights from thousands of successful transformations.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="bg-gradient-to-br from-rose-50 to-pink-100 rounded-3xl p-8 hover:scale-105 hover:-translate-y-2 transition-all duration-300 shadow-xl border border-white/20">
                <div className="text-6xl mb-4 animate-bounce">🎨</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Absolutely Adorable</h3>
                <p className="text-gray-700">
                  Why settle for boring when you can have beautiful? Our cute, colorful interface makes fitness feel like playing your favorite mobile game!
                </p>
              </div>

              {/* Feature 6 */}
              <div className="bg-gradient-to-br from-cyan-50 to-blue-100 rounded-3xl p-8 hover:scale-105 hover:-translate-y-2 transition-all duration-300 shadow-xl border border-white/20">
                <div className="text-6xl mb-4 animate-pulse">🚀</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Future-Ready</h3>
                <p className="text-gray-700">
                  We're constantly innovating with AR workouts, voice coaching, and smart wearable integration. You're not just using an app - you're experiencing the future!
                </p>
              </div>
            </div>

            {/* Testimonial Section */}
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 mb-20 shadow-xl border border-white/20">
              <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                What Our Users Say 💬
              </h2>
              <div className="text-center">
                <div className="text-2xl text-gray-700 italic mb-6 min-h-[3rem] transition-all duration-500">
                  "{testimonials[currentTestimonial].text}"
                </div>
                <div className="flex justify-center items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xl">
                    {testimonials[currentTestimonial].author[0]}
                  </div>
                  <div>
                    <div className="font-bold text-gray-800">{testimonials[currentTestimonial].author}</div>
                    <div className="text-sm text-purple-600 font-medium">{testimonials[currentTestimonial].achievement}</div>
                  </div>
                </div>
              </div>
              
              {/* Testimonial Dots */}
              <div className="flex justify-center mt-6 gap-2">
                {testimonials.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentTestimonial ? 'bg-purple-500' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Comparison Section */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-100 rounded-3xl p-8 mb-20 shadow-xl border border-white/20">
              <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Us vs. The Competition 🥊
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-red-600 mb-4">❌ Other Apps</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li>• Generic one-size-fits-all workouts</li>
                    <li>• Boring, clinical interfaces</li>
                    <li>• Basic tracking with no insights</li>
                    <li>• No emotional support or motivation</li>
                    <li>• Expensive subscription tiers</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-green-600 mb-4">✅ Our Cute Trainer</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li>• Personalized AI that learns YOU</li>
                    <li>• Adorable, game-like experience</li>
                    <li>• Deep analytics with actionable insights</li>
                    <li>• Emotional intelligence & encouragement</li>
                    <li>• Affordable with premium features included</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl p-12 text-white shadow-2xl">
              <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: 'Comic Neue, cursive' }}>
                Ready to Fall in Love with Fitness? 💕
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Join thousands of happy users who've transformed their lives with our cute AI trainer!
              </p>
              <button
                onClick={handleGetStarted}
                className="bg-white text-purple-600 px-12 py-4 rounded-2xl text-xl font-bold hover:scale-105 hover:shadow-xl transition-all duration-300 shadow-lg"
              >
                🌟 Start Your Journey Today! 🚀
              </button>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}