'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CuteRobotIcon } from '@/components/icons/CharacterIcons';

export default function LandingPage(): JSX.Element {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [currentQuote, setCurrentQuote] = useState<string>("Transform your fitness journey with your adorable AI trainer! 💪");
  const router = useRouter();

  const motivationalQuotes: string[] = [
    "Transform your fitness journey with your adorable AI trainer! 💪",
    "Your body can do it. It's your mind you have to convince! 🧠",
    "Success is the sum of small efforts repeated day in and day out! 🌟",
    "Don't limit your challenges, challenge your limits! 🚀",
    "The only bad workout is the one that didn't happen! 💪"
  ];

  useEffect(() => {
    setIsVisible(true);
    
    // Rotate quotes every 8 seconds
    const interval = setInterval(() => {
      const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
      setCurrentQuote(randomQuote);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const handleGetStarted = (): void => {
    router.push('/auth');
  };

  const handleLearnMore = (): void => {
    // Smooth scroll to features section
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden relative">
      {/* Animated Background Elements - Similar to fitness dashboard */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.05]">
        <div className="absolute top-[10%] left-[5%] text-[140px] text-blue-500 animate-bounce" style={{ animationDelay: '0s', animationDuration: '6s' }}>🏋️</div>
        <div className="absolute top-[60%] right-[8%] text-[140px] text-purple-500 animate-pulse" style={{ animationDelay: '2s', animationDuration: '6s' }}>💪</div>
        <div className="absolute bottom-[20%] left-[15%] text-[140px] text-blue-500 animate-bounce" style={{ animationDelay: '4s', animationDuration: '6s' }}>🏃</div>
        <div className="absolute top-[30%] right-[25%] text-[140px] text-indigo-500 animate-pulse" style={{ animationDelay: '1s', animationDuration: '6s' }}>🚴</div>
        <div className="absolute bottom-[40%] right-[40%] text-[140px] text-sky-500 animate-bounce" style={{ animationDelay: '3s', animationDuration: '6s' }}>🎯</div>
      </div>

      {/* Floating Bubbles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-16 h-16 bg-blue-200 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '0s', animationDuration: '4s' }}></div>
        <div className="absolute top-40 right-20 w-12 h-12 bg-purple-200 rounded-full opacity-30 animate-pulse" style={{ animationDelay: '1s', animationDuration: '5s' }}></div>
        <div className="absolute bottom-40 left-20 w-20 h-20 bg-indigo-200 rounded-full opacity-15 animate-bounce" style={{ animationDelay: '2s', animationDuration: '6s' }}></div>
        <div className="absolute bottom-20 right-10 w-14 h-14 bg-sky-200 rounded-full opacity-25 animate-pulse" style={{ animationDelay: '3s', animationDuration: '4s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-18 h-18 bg-blue-300 rounded-full opacity-10 animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '5s' }}></div>
      </div>

      {/* Main Content */}
      <main className="relative z-10">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Hero Section */}
            <div className="mb-16">
              <div className="flex justify-center mb-8">
                <CuteRobotIcon className="w-32 h-32 " />
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gray-800 to-blue-500 bg-clip-text text-transparent mb-6" style={{ fontFamily: 'Comic Neue, cursive' }}>
                Meet Your
                <br />
                <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Cute Trainer!</span>
              </h1>
              
              {/* Rotating Quote */}
              <div className="text-xl md:text-2xl text-gray-600 italic mb-8 p-6 bg-white/70 rounded-3xl backdrop-blur-lg mx-auto max-w-4xl leading-relaxed shadow-lg transition-all duration-500">
                {currentQuote}
              </div>

              <p className="text-lg md:text-xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
                Transform your fitness journey with personalized workouts, nutrition plans, and gamified achievements. 
                Your adorable AI trainer is here to make fitness fun! 🎯
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <button
                  onClick={handleGetStarted}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-10 py-4 rounded-2xl text-xl font-bold hover:scale-105 hover:shadow-xl transition-all duration-300 shadow-lg shadow-blue-500/30"
                >
                  ✨ Start Your Journey 🚀
                </button>
                <button 
                  onClick={handleLearnMore}
                  className="bg-white/90 backdrop-blur-lg text-gray-800 border-2 border-white/50 px-10 py-4 rounded-2xl text-xl font-semibold hover:bg-white hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  Learn More 📚
                </button>
              </div>
            </div>

            {/* Features Grid */}
            <div id="features" className="grid md:grid-cols-3 gap-8 mt-20">
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 text-center hover:scale-105 hover:-translate-y-2 transition-all duration-300 shadow-xl border border-white/20">
                <div className="text-6xl mb-4 " style={{ animationDelay: '0s', animationDuration: '2s' }}>🎯</div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">Personalized Goals</h3>
                <p className="text-gray-700">Set custom fitness goals and get tailored workout plans just for you!</p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 text-center hover:scale-105 hover:-translate-y-2 transition-all duration-300 shadow-xl border border-white/20">
                <div className="text-6xl mb-4 " style={{ animationDelay: '0.5s', animationDuration: '2s' }}>🏆</div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">Gamified Experience</h3>
                <p className="text-gray-700">Earn points, unlock achievements, and level up your fitness game!</p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 text-center hover:scale-105 hover:-translate-y-2 transition-all duration-300 shadow-xl border border-white/20">
                <div className="text-6xl mb-4 " style={{ animationDelay: '1s', animationDuration: '2s' }}>📊</div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">Smart Tracking</h3>
                <p className="text-gray-700">Visualize your progress with beautiful charts and analytics!</p>
              </div>
            </div>

            {/* Additional Features Section */}
            <div className="mt-20 grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl p-8 shadow-xl border border-white/20">
                <div className="text-5xl mb-4">🤖</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">AI-Powered Coaching</h3>
                <p className="text-gray-700 text-left">
                  Get personalized workout recommendations, real-time form corrections, and adaptive training plans 
                  that evolve with your progress. Your AI trainer learns your preferences and optimizes your routine!
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-3xl p-8 shadow-xl border border-white/20">
                <div className="text-5xl mb-4">📱</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Beautiful Dashboard</h3>
                <p className="text-gray-700 text-left">
                  Track your fitness journey with stunning visualizations, progress charts, and achievement badges. 
                  Stay motivated with our cute and colorful interface designed to make fitness fun!
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}