'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const [fitnessPlans, setFitnessPlans] = useState<any[]>([]);
  const [currentQuote, setCurrentQuote] = useState('');
  const [userData, setUserData] = useState<any>(null);
  const router = useRouter();

  const motivationalQuotes = [
    "The only bad workout is the one that didn't happen. Let's make today count! 💪",
    "Your body can do it. It's your mind you have to convince! 🧠",
    "Success is the sum of small efforts repeated day in and day out! 🌟",
    "Don't limit your challenges, challenge your limits! 🚀",
    "The pain you feel today will be the strength you feel tomorrow! 💪"
  ];

  useEffect(() => {
    // Load fitness plans
    const savedPlans = localStorage.getItem('fitnessPlanList');
    if (savedPlans) {
      try {
        const plansList = JSON.parse(savedPlans);
        if (Array.isArray(plansList)) {
          setFitnessPlans(plansList);
        }
      } catch (e) {
        console.error('Error loading fitness plans:', e);
        setFitnessPlans([]);
      }
    }

    // Load user data
    const formData = localStorage.getItem('userData');
    if (formData) {
      setUserData(JSON.parse(formData));
    }

    // Set initial quote
    setCurrentQuote(motivationalQuotes[0]);
  }, []);

  // Rotate quotes every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
      setCurrentQuote(randomQuote);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Handle fitness plan card click
  const handleFitnessPlanClick = (plan: any) => {
    try {
      // Set the clicked plan as the active fitness plan
      localStorage.setItem('fitnessPlans', JSON.stringify(plan.fitnessPlans));
      localStorage.setItem('userData', JSON.stringify(plan.userData));
      localStorage.setItem('currentPlanId', plan.id);
      
      console.log('Switching to plan:', plan.title);
      
      // Navigate to fitness page
      router.push('/fitness');
    } catch (error) {
      console.error('Error switching fitness plan:', error);
      alert('Error loading fitness plan. Please try again.');
    }
  };

  const handleCreateNewGoalClick = () => {
    router.push('/form');
  };

  const deleteFitnessPlan = (planId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    
    const updatedPlans = fitnessPlans.filter(plan => plan.id !== planId);
    setFitnessPlans(updatedPlans);
    localStorage.setItem('fitnessPlanList', JSON.stringify(updatedPlans));
    
    // If deleted plan was the current active plan, clear it
    const currentPlanId = localStorage.getItem('currentPlanId');
    if (currentPlanId === planId) {
      localStorage.removeItem('currentPlanId');
      localStorage.removeItem('fitnessPlans');
      localStorage.removeItem('userData');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getGoalIcon = (fitnessGoal: string) => {
    const icons = {
      'weight-loss': '🏃',
      'muscle-gain': '💪',
      'endurance': '🚴',
      'flexibility': '🧘',
      'general-fitness': '🏋️',
      'strength-training': '💪'
    };
    return icons[fitnessGoal as keyof typeof icons] || '🎯';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-x-hidden">
      {/* Background Gym Icons */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-5">
        <div className="absolute top-[10%] left-[5%] text-[120px] text-blue-500 animate-bounce" style={{ animationDelay: '0s', animationDuration: '6s' }}>🏋️</div>
        <div className="absolute top-[60%] right-[8%] text-[120px] text-blue-500 animate-pulse" style={{ animationDelay: '2s', animationDuration: '6s' }}>💪</div>
        <div className="absolute bottom-[20%] left-[15%] text-[120px] text-blue-500 animate-bounce" style={{ animationDelay: '4s', animationDuration: '6s' }}>🏃</div>
        <div className="absolute top-[30%] right-[25%] text-[120px] text-blue-500 animate-pulse" style={{ animationDelay: '1s', animationDuration: '6s' }}>🚴</div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-8 relative z-10">
        {/* Welcome Section */}
        <section className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-800 to-blue-500 bg-clip-text text-transparent mb-4" style={{ fontFamily: 'Comic Neue, cursive' }}>
            Your Fitness Journey Awaits! 🚀
          </h1>
          <div className="text-xl text-gray-600 italic mb-8 p-4 bg-white/60 rounded-2xl backdrop-blur-lg">
            {currentQuote}
          </div>
          <button
            onClick={handleCreateNewGoalClick}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-2xl text-xl font-semibold hover:scale-105 hover:shadow-xl transition-all duration-300 shadow-lg shadow-blue-500/30"
          >
            ✨ Create New Plan
          </button>
        </section>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-4 mb-8 max-w-md mx-auto">
          <div className="bg-white/90 rounded-2xl p-6 text-center shadow-lg hover:-translate-y-2 transition-all duration-300">
            <div className="text-3xl font-bold text-orange-500 mb-2">{fitnessPlans.length}</div>
            <div className="text-gray-600 font-medium">Fitness Plans</div>
          </div>
        </div>

        {/* Fitness Plans Section */}
        <section className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/20 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            📋 My Fitness Plans
          </h2>
          
          {fitnessPlans.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-8xl mb-6">📋</div>
              <h3 className="text-3xl font-bold text-gray-700 mb-4">No Fitness Plans Yet!</h3>
              <p className="text-xl text-gray-600 mb-8">
                Create your first fitness plan to get personalized workouts and meal plans!
              </p>
              <button
                onClick={handleCreateNewGoalClick}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-2xl text-xl font-semibold hover:scale-105 hover:shadow-xl transition-all duration-300 shadow-lg shadow-blue-500/30"
              >
                🚀 Create Your First Plan
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {fitnessPlans.map((plan) => {
                const currentPlanId = localStorage.getItem('currentPlanId');
                const isActivePlan = currentPlanId === plan.id;
                
                return (
                  <div
                    key={plan.id}
                    onClick={() => handleFitnessPlanClick(plan)}
                    className={`bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl p-6 border-l-4 ${
                      isActivePlan ? 'border-green-500 ring-2 ring-green-200' : 'border-blue-500'
                    } hover:translate-x-2 hover:shadow-lg hover:shadow-blue-500/15 transition-all duration-300 cursor-pointer hover:scale-105 relative`}
                  >
                    {/* Delete Button */}
                    <button
                      onClick={(e) => deleteFitnessPlan(plan.id, e)}
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xl font-bold w-8 h-8 rounded-full hover:bg-red-100 flex items-center justify-center transition-all duration-200"
                      title="Delete Plan"
                    >
                      ×
                    </button>

                    {/* Active Plan Badge */}
                    {isActivePlan && (
                      <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                        Active
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between mb-4 mt-4">
                      <div className="text-4xl">
                        {getGoalIcon(plan.userData?.fitnessGoal)}
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-blue-500">{plan.userData?.targetDays} days</div>
                        <div className="text-gray-600 text-sm">duration</div>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{plan.title}</h3>
                    <p className="text-blue-600 font-medium mb-2">{plan.description}</p>
                    
                    {/* Plan Details */}
                    <div className="space-y-2 mb-4 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Age:</span>
                        <span>{plan.userData?.age} years</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Weight:</span>
                        <span>{plan.userData?.weight} kg</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Level:</span>
                        <span className="capitalize">{plan.userData?.currentFitnessLevel}</span>
                      </div>
                    </div>
                    
                    {/* Creation Date */}
                    <div className="flex items-center justify-between text-gray-600 text-sm border-t pt-2">
                      <span>Created: {formatDate(plan.createdAt)}</span>
                      <span className="text-blue-500 font-medium">Click to Open →</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}