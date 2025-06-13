'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CuteRobotIcon } from '@/components/icons/CharacterIcons';

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleGetStarted = () => {
    router.push('/auth');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cute-pink via-cute-peach to-cute-lavender overflow-hidden">
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-16 h-16 bg-cute-mint rounded-full opacity-20 animate-bounce-soft"></div>
        <div className="absolute top-40 right-20 w-12 h-12 bg-cute-sky rounded-full opacity-30 animate-pulse-slow"></div>
        <div className="absolute bottom-40 left-20 w-20 h-20 bg-white rounded-full opacity-15 animate-bounce-soft"></div>
        <div className="absolute bottom-20 right-10 w-14 h-14 bg-cute-lavender rounded-full opacity-25 animate-pulse-slow"></div>
      </div>

      {/* Header */}
      {/* <header className="relative py-6 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <CuteRobotIcon className="w-12 h-12 animate-wiggle" />
            <h1 className="text-3xl font-bold text-white font-cute">GymMy</h1>
          </div>
          <button
            onClick={handleGetStarted}
            className="bg-white text-cute-pink px-6 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Get Started
          </button>
        </div>
      </header> */}

      {/* Main Content */}
      <main className="relative">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Hero Section */}
            <div className="mb-16">
              <div className="flex justify-center mb-8">
                <CuteRobotIcon className="w-32 h-32 animate-bounce-soft" />
              </div>
              
              <h2 className="text-6xl md:text-8xl font-bold text-white mb-6 font-cute">
                Meet Your
                <br />
                <span className="text-cute-sky">Cute Trainer!</span>
              </h2>
              
              <p className="text-xl md:text-2xl text-white opacity-90 mb-12 max-w-3xl mx-auto leading-relaxed">
                Transform your fitness journey with personalized workouts, nutrition plans, and gamified achievements. 
                Your adorable AI trainer is here to make fitness fun! 🎯
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <button
                  onClick={handleGetStarted}
                  className="bg-white text-cute-pink px-10 py-4 rounded-full text-xl font-bold hover:bg-opacity-90 transition-all duration-300 hover:scale-105 shadow-2xl"
                >
                  Start Your Journey 🚀
                </button>
                <button className="text-white border-2 border-white px-10 py-4 rounded-full text-xl font-semibold hover:bg-white hover:text-cute-pink transition-all duration-300 hover:scale-105">
                  Learn More
                </button>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-8 mt-20">
              <div className="glass-effect p-8 rounded-3xl text-center hover:scale-105 transition-all duration-300">
                <div className="text-6xl mb-4">🎯</div>
                <h3 className="text-2xl font-bold text-white mb-4">Personalized Goals</h3>
                <p className="text-white opacity-80">Set custom fitness goals and get tailored workout plans just for you!</p>
              </div>
              
              <div className="glass-effect p-8 rounded-3xl text-center hover:scale-105 transition-all duration-300">
                <div className="text-6xl mb-4">🏆</div>
                <h3 className="text-2xl font-bold text-white mb-4">Gamified Experience</h3>
                <p className="text-white opacity-80">Earn points, unlock achievements, and level up your fitness game!</p>
              </div>
              
              <div className="glass-effect p-8 rounded-3xl text-center hover:scale-105 transition-all duration-300">
                <div className="text-6xl mb-4">📊</div>
                <h3 className="text-2xl font-bold text-white mb-4">Smart Tracking</h3>
                <p className="text-white opacity-80">Visualize your progress with beautiful charts and analytics!</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      {/* <footer className="relative py-8 text-center">
        <p className="text-white opacity-60">
          Made with 💖 by Shubham
        </p>
      </footer> */}
    </div>
  );
}