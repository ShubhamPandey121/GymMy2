'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FitnessPlan, DayPlan } from '@/lib/gemini';

export default function FitnessPlanPage() {
  const router = useRouter();
  const [fitnessPlans, setFitnessPlans] = useState<FitnessPlan | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'workout' | 'diet' | 'tips'>('overview');
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get the fitness plans and user data from localStorage
    const storedPlans = localStorage.getItem('fitnessPlans');
    const storedUserData = localStorage.getItem('userData');
    
    if (storedPlans && storedUserData) {
      setFitnessPlans(JSON.parse(storedPlans));
      setUserData(JSON.parse(storedUserData));
    } else {
      // Redirect back to form if no plans found
      router.push('/');
    }
    setLoading(false);
  }, [router]);

  const handleStartOver = () => {
    localStorage.removeItem('fitnessPlans');
    localStorage.removeItem('userData');
    router.push('/');
  };

  const handlePrintPlan = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white rounded-full animate-ping"></div>
          <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-purple-300 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-pink-300 rounded-full animate-bounce" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="text-center z-10">
          <div className="relative mb-8">
            <div className="w-24 h-24 border-4 border-white/20 rounded-full mx-auto"></div>
            <div className="absolute inset-0 w-24 h-24 border-4 border-t-white border-r-transparent border-b-transparent border-l-transparent rounded-full mx-auto animate-spin"></div>
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-white animate-pulse">Crafting Your Perfect Plan</h2>
            <p className="text-white/80 text-lg animate-bounce">Preparing your personalized fitness journey...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!fitnessPlans) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 text-9xl animate-float">💪</div>
          <div className="absolute bottom-20 right-20 text-9xl animate-float" style={{animationDelay: '2s'}}>🏋️</div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-9xl animate-spin-slow">⚡</div>
        </div>
        
        <div className="text-center z-10">
          <div className="mb-8">
            <div className="text-8xl mb-4 ">😔</div>
            <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              No Plan Found
            </h1>
            <p className="text-white/70 text-xl mb-8">Let's create your amazing fitness journey!</p>
          </div>
          <button 
            onClick={() => router.push('/')}
            className="group relative bg-gradient-to-r from-purple-500 to-pink-500 text-white px-12 py-4 rounded-full font-bold text-lg shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-3">
              <span className="text-2xl group-hover:">🚀</span>
              Create New Plan
              <span className="text-2xl group-hover:" style={{animationDelay: '0.1s'}}>✨</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>
    );
  }

  const currentDayPlan = fitnessPlans.dailyPlans.find(plan => plan.day === selectedDay);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Enhanced Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full opacity-30 animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full opacity-15 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 right-10 w-18 h-18 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full opacity-25 animate-float" style={{animationDelay: '3s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-gradient-to-br from-red-400 to-pink-400 rounded-full opacity-20 animate-float" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute top-1/3 right-1/3 w-14 h-14 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full opacity-25 animate-float" style={{animationDelay: '1.5s'}}></div>
      </div>

      {/* Animated background icons */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-32 left-32 text-6xl animate-spin-slow">🏋️</div>
        <div className="absolute top-64 right-32 text-6xl -slow">💪</div>
        <div className="absolute bottom-32 left-48 text-6xl animate-pulse-slow">🎯</div>
        <div className="absolute bottom-48 right-48 text-6xl animate-float">⚡</div>
      </div>

      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-black/30 to-purple-900/30 backdrop-blur-xl border-b border-white/10 relative z-10 shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-2xl animate-pulse">
                  🎯
                </div>
                <div>
                  <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-2">
                    Your Fitness Journey
                  </h1>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <span className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm text-purple-200 px-4 py-2 rounded-full border border-purple-400/30">
                      🎯 {fitnessPlans.overview.goal}
                    </span>
                    <span className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm text-blue-200 px-4 py-2 rounded-full border border-blue-400/30">
                      ⏱️ {fitnessPlans.overview.duration}
                    </span>
                    <span className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm text-green-200 px-4 py-2 rounded-full border border-green-400/30">
                      📊 {fitnessPlans.overview.fitnessLevel}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={handlePrintPlan}
                className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 backdrop-blur-sm border border-white/20 hover:scale-105"
              >
                <span className="flex items-center gap-2">
                  <span className="text-xl group-hover:">📄</span>
                  Print Plan
                </span>
              </button>
              <button 
                onClick={handleStartOver}
                className="group bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 backdrop-blur-sm border border-white/20 hover:scale-105"
              >
                <span className="flex items-center gap-2">
                  <span className="text-xl group-hover:animate-spin">🔄</span>
                  Start Over
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Tab Navigation */}
      <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {[
            { key: 'overview', label: 'Overview', icon: '📊', gradient: 'from-blue-500 to-cyan-500' },
            { key: 'workout', label: 'Workouts', icon: '💪', gradient: 'from-purple-500 to-violet-500' },
            { key: 'diet', label: 'Nutrition', icon: '🍽️', gradient: 'from-green-500 to-emerald-500' },
            { key: 'tips', label: 'Expert Tips', icon: '💡', gradient: 'from-yellow-500 to-orange-500' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`group relative px-8 py-4 rounded-2xl font-bold transition-all duration-300 text-lg overflow-hidden ${
                activeTab === tab.key
                  ? `bg-gradient-to-r ${tab.gradient} text-white shadow-2xl scale-105`
                  : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border border-white/20 hover:scale-105'
              }`}
            >
              <span className="relative z-10 flex items-center gap-3">
                <span className={`text-2xl ${activeTab === tab.key ? '' : 'group-hover:'}`}>
                  {tab.icon}
                </span>
                {tab.label}
              </span>
              {activeTab !== tab.key && (
                <div className={`absolute inset-0 bg-gradient-to-r ${tab.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
              )}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fade-in">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                  <span className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-xl">📋</span>
                  Plan Overview
                </h2>
                <div className="space-y-6">
                  {[
                    { label: 'Goal', value: fitnessPlans.overview.goal, icon: '🎯', color: 'from-purple-400 to-pink-400' },
                    { label: 'Duration', value: fitnessPlans.overview.duration, icon: '⏱️', color: 'from-blue-400 to-cyan-400' },
                    { label: 'Fitness Level', value: fitnessPlans.overview.fitnessLevel, icon: '📊', color: 'from-green-400 to-emerald-400' },
                    { label: 'Daily Calories', value: fitnessPlans.overview.estimatedCaloriesPerDay, icon: '🔥', color: 'from-orange-400 to-red-400' }
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                      <div className="flex items-center gap-3">
                        <span className={`w-10 h-10 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center text-lg`}>
                          {item.icon}
                        </span>
                        <span className="text-white/80 text-lg">{item.label}:</span>
                      </div>
                      <span className="text-white font-bold capitalize text-lg">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                  <span className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-xl">🎯</span>
                  Expected Results
                </h2>
                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-purple-400/20">
                  <p className="text-white/90 text-lg leading-relaxed">
                    {fitnessPlans.overview.expectedResults}
                  </p>
                </div>
              </div>
            </div>

            {/* Enhanced User Profile */}
            {userData && (
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300">
                <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                  <span className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center text-xl">👤</span>
                  Your Profile
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    { label: 'Years Old', value: userData.age, icon: '🎂', color: 'from-purple-500 to-pink-500' },
                    { label: 'Height', value: `${userData.height}cm`, icon: '📏', color: 'from-blue-500 to-cyan-500' },
                    { label: 'Weight', value: `${userData.weight}kg`, icon: '⚖️', color: 'from-green-500 to-emerald-500' }
                  ].map((stat, index) => (
                    <div key={index} className="text-center group">
                      <div className={`w-20 h-20 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        {stat.icon}
                      </div>
                      <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                      <div className="text-white/70 text-lg">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Workout Tab */}
        {activeTab === 'workout' && (
          <div className="space-y-8 animate-fade-in">
            {/* Enhanced Day Selector */}
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white mb-8 flex items-center justify-center gap-3">
                <span className="">📅</span>
                Select Your Training Day
                <span className="" style={{animationDelay: '0.5s'}}>💪</span>
              </h2>
              <div className="flex flex-wrap justify-center gap-4">
                {fitnessPlans.dailyPlans.map(plan => (
                  <button
                    key={plan.day}
                    onClick={() => setSelectedDay(plan.day)}
                    className={`group relative px-6 py-4 rounded-2xl font-bold transition-all duration-300 overflow-hidden ${
                      selectedDay === plan.day
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-2xl scale-110'
                        : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border border-white/20 hover:scale-105'
                    }`}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <span className={selectedDay === plan.day ? 'animate-pulse' : 'group-hover:'}>
                        {plan.day === 1 ? '🏃' : plan.day === 2 ? '💪' : plan.day === 3 ? '🏋️' : plan.day === 4 ? '🚴' : plan.day === 5 ? '🏊' : plan.day === 6 ? '🧘' : '🎯'}
                      </span>
                      Day {plan.day}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Enhanced Workout Plan */}
            {currentDayPlan && (
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
                <h3 className="text-4xl font-bold text-white mb-8 text-center flex items-center justify-center gap-3">
                  <span className="">💪</span>
                  Day {currentDayPlan.day} Workout
                  <span className="" style={{animationDelay: '0.5s'}}>🔥</span>
                </h3>
                <div className="grid gap-6">
                  {currentDayPlan.workouts.map((workout, index) => (
                    <div key={index} className="group bg-gradient-to-r from-white/5 to-white/10 rounded-3xl p-8 border border-white/20 hover:border-white/40 hover:shadow-2xl transition-all duration-300 hover:scale-105">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                        <h4 className="text-2xl font-bold text-white flex items-center gap-3">
                          <span className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-white font-bold text-lg">
                            {index + 1}
                          </span>
                          {workout.name}
                        </h4>
                        <div className="flex gap-3 text-sm flex-wrap">
                          <span className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-200 px-4 py-2 rounded-full font-semibold border border-blue-400/30 flex items-center gap-2">
                            <span className="animate-pulse">⏱️</span>
                            {workout.duration}
                          </span>
                          {workout.sets && (
                            <span className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-200 px-4 py-2 rounded-full font-semibold border border-green-400/30 flex items-center gap-2">
                              <span className="animate-pulse">📊</span>
                              {workout.sets}
                            </span>
                          )}
                          {workout.reps && (
                            <span className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-200 px-4 py-2 rounded-full font-semibold border border-purple-400/30 flex items-center gap-2">
                              <span className="animate-pulse">🔢</span>
                              {workout.reps}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-purple-400/20">
                        <p className="text-white/90 text-lg leading-relaxed">
                          {workout.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Enhanced Daily Tips */}
                {currentDayPlan.tips && currentDayPlan.tips.length > 0 && (
                  <div className="mt-8 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-3xl p-8 border border-yellow-400/20">
                    <h4 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                      <span className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center animate-pulse">💡</span>
                      Day {currentDayPlan.day} Pro Tips
                    </h4>
                    <ul className="space-y-4">
                      {currentDayPlan.tips.map((tip, index) => (
                        <li key={index} className="text-white/90 flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                          <span className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                            {index + 1}
                          </span>
                          <span className="text-lg">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Diet Tab */}
        {activeTab === 'diet' && (
          <div className="space-y-8 animate-fade-in">
            {/* Enhanced Day Selector */}
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white mb-8 flex items-center justify-center gap-3">
                <span className="">🍽️</span>
                Select Your Meal Day
                <span className="" style={{animationDelay: '0.5s'}}>🥗</span>
              </h2>
              <div className="flex flex-wrap justify-center gap-4">
                {fitnessPlans.dailyPlans.map(plan => (
                  <button
                    key={plan.day}
                    onClick={() => setSelectedDay(plan.day)}
                    className={`group relative px-6 py-4 rounded-2xl font-bold transition-all duration-300 overflow-hidden ${
                      selectedDay === plan.day
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-2xl scale-110'
                        : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border border-white/20 hover:scale-105'
                    }`}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <span className={selectedDay === plan.day ? 'animate-pulse' : 'group-hover:'}>
                        {plan.day === 1 ? '🍎' : plan.day === 2 ? '🥑' : plan.day === 3 ? '🍊' : plan.day === 4 ? '🥗' : plan.day === 5 ? '🍇' : plan.day === 6 ? '🥕' : '🍓'}
                      </span>
                      Day {plan.day}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Enhanced Diet Plan */}
            {currentDayPlan && currentDayPlan.meals && (
              <div className="space-y-8">
                <h3 className="text-4xl font-bold text-white mb-8 text-center flex items-center justify-center gap-3">
                  <span className="">🍽️</span>
                  Day {currentDayPlan.day} Nutrition Plan
                  <span className="" style={{animationDelay: '0.5s'}}>🌟</span>
                </h3>
                
               {/* Enhanced Meals */}
                {[
                  { meal: currentDayPlan.meals.breakfast, name: 'Breakfast', icon: '🌅', gradient: 'from-yellow-500 to-orange-500', bgGradient: 'from-yellow-500/10 to-orange-500/10', borderColor: 'border-yellow-400/20' },
                  { meal: currentDayPlan.meals.lunch, name: 'Lunch', icon: '☀️', gradient: 'from-green-500 to-emerald-500', bgGradient: 'from-green-500/10 to-emerald-500/10', borderColor: 'border-green-400/20' },
                  { meal: currentDayPlan.meals.dinner, name: 'Dinner', icon: '🌙', gradient: 'from-purple-500 to-indigo-500', bgGradient: 'from-purple-500/10 to-indigo-500/10', borderColor: 'border-purple-400/20' }
                ].map(({ meal, name, icon, gradient, bgGradient, borderColor }, index) => (
                  <div key={index} className={`group bg-gradient-to-br ${bgGradient} backdrop-blur-xl rounded-3xl p-8 border ${borderColor} hover:shadow-2xl transition-all duration-300 hover:scale-105`}>
                    <div className="flex items-center gap-4 mb-8">
                      <span className={`w-16 h-16 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center text-3xl group-hover:`}>
                        {icon}
                      </span>
                      <div className="flex-1">
                        <h4 className="text-3xl font-bold text-white">{name}</h4>
                        <h5 className="text-xl font-semibold text-white/80 mt-2">{meal.name}</h5>
                      </div>
                      <div className={`bg-gradient-to-r ${gradient} text-white px-6 py-3 rounded-2xl font-bold text-lg shadow-lg`}>
                        <span className="flex items-center gap-2">
                          <span className="animate-pulse">🔥</span>
                          {meal.calories}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <h6 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                          <span className={`w-10 h-10 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center text-lg`}>
                            🛒
                          </span>
                          Ingredients
                        </h6>
                        <div className="space-y-3">
                          {meal.ingredients.map((ingredient, ingIndex) => (
                            <div key={ingIndex} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                              <span className={`w-8 h-8 bg-gradient-to-br ${gradient} rounded-full flex items-center justify-center text-white font-bold text-sm`}>
                                {ingIndex + 1}
                              </span>
                              <span className="text-white/90 text-lg">{ingredient}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h6 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                          <span className={`w-10 h-10 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center text-lg`}>
                            👨‍🍳
                          </span>
                          Instructions
                        </h6>
                        <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-2xl p-6 border border-white/10">
                          <p className="text-white/90 text-lg leading-relaxed">
                            {meal.instructions}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Enhanced Snacks Section */}
                {currentDayPlan.meals.snacks && currentDayPlan.meals.snacks.length > 0 && (
                  <div className="group bg-gradient-to-br from-indigo-500/10 to-violet-500/10 backdrop-blur-xl rounded-3xl p-8 border border-indigo-400/20 hover:shadow-2xl transition-all duration-300 hover:scale-105">
                    <div className="flex items-center gap-4 mb-8">
                      <span className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-2xl flex items-center justify-center text-3xl group-hover:">
                        🍎
                      </span>
                      <h4 className="text-3xl font-bold text-white">Healthy Snacks</h4>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      {currentDayPlan.meals.snacks.map((snack, index) => (
                        <div key={index} className="group bg-gradient-to-br from-white/5 to-white/10 rounded-2xl p-6 border border-white/20 hover:border-white/40 hover:shadow-xl transition-all duration-300 hover:scale-105">
                          <div className="flex justify-between items-center mb-4">
                            <h6 className="text-xl font-bold text-white flex items-center gap-3">
                              <span className="w-8 h-8 bg-gradient-to-br from-indigo-400 to-violet-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                {index + 1}
                              </span>
                              {snack.name}
                            </h6>
                            <span className="bg-gradient-to-r from-indigo-500 to-violet-500 text-white px-4 py-2 rounded-xl font-bold text-sm shadow-lg flex items-center gap-2">
                              <span className="animate-pulse">🔥</span>
                              {snack.calories}
                            </span>
                          </div>
                          <div className="space-y-2">
                            {snack.ingredients.map((ingredient, ingIndex) => (
                              <div key={ingIndex} className="flex items-center gap-2 p-2 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300">
                                <span className="w-6 h-6 bg-gradient-to-br from-indigo-400 to-violet-400 rounded-full flex items-center justify-center text-white font-bold text-xs">
                                  •
                                </span>
                                <span className="text-white/90">{ingredient}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Enhanced Daily Calorie Summary */}
                <div className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                  <h4 className="text-3xl font-bold text-white mb-8 text-center flex items-center justify-center gap-3">
                    <span className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center text-xl animate-pulse">
                      📊
                    </span>
                    Daily Calorie Breakdown
                    <span className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center text-xl animate-pulse" style={{animationDelay: '0.5s'}}>
                      🔥
                    </span>
                  </h4>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                      { 
                        name: 'Breakfast', 
                        calories: currentDayPlan.meals.breakfast.calories, 
                        icon: '🌅', 
                        gradient: 'from-yellow-500 to-orange-500',
                        bgGradient: 'from-yellow-500/20 to-orange-500/20',
                        borderColor: 'border-yellow-400/30'
                      },
                      { 
                        name: 'Lunch', 
                        calories: currentDayPlan.meals.lunch.calories, 
                        icon: '☀️', 
                        gradient: 'from-green-500 to-emerald-500',
                        bgGradient: 'from-green-500/20 to-emerald-500/20',
                        borderColor: 'border-green-400/30'
                      },
                      { 
                        name: 'Dinner', 
                        calories: currentDayPlan.meals.dinner.calories, 
                        icon: '🌙', 
                        gradient: 'from-purple-500 to-indigo-500',
                        bgGradient: 'from-purple-500/20 to-indigo-500/20',
                        borderColor: 'border-purple-400/30'
                      },
                      { 
                        name: 'Snacks', 
                        calories: currentDayPlan.meals.snacks?.reduce((total, snack) => {
                          const calories = parseInt(snack.calories.replace(/\D/g, '')) || 0;
                          return total + calories;
                        }, 0) || 0, 
                        icon: '🍎', 
                        gradient: 'from-indigo-500 to-violet-500',
                        bgGradient: 'from-indigo-500/20 to-violet-500/20',
                        borderColor: 'border-indigo-400/30'
                      }
                    ].map((item, index) => (
                      <div key={index} className={`group bg-gradient-to-br ${item.bgGradient} backdrop-blur-sm rounded-2xl p-6 border ${item.borderColor} hover:shadow-xl transition-all duration-300 hover:scale-110 text-center`}>
                        <div className={`w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4 group-hover:`}>
                          {item.icon}
                        </div>
                        <div className="text-3xl font-bold text-white mb-2">
                          {typeof item.calories === 'number' ? `${item.calories} cal` : item.calories}
                        </div>
                        <div className="text-white/70 text-lg font-semibold">{item.name}</div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Total Calories */}
                  <div className="mt-8 text-center">
                    <div className="bg-gradient-to-r from-pink-500/20 to-rose-500/20 backdrop-blur-sm rounded-2xl p-6 border border-pink-400/30 inline-block">
                      <div className="text-5xl font-bold bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent mb-2">
                        {(() => {
                          const breakfast = parseInt(currentDayPlan.meals.breakfast.calories.replace(/\D/g, '')) || 0;
                          const lunch = parseInt(currentDayPlan.meals.lunch.calories.replace(/\D/g, '')) || 0;
                          const dinner = parseInt(currentDayPlan.meals.dinner.calories.replace(/\D/g, '')) || 0;
                          const snacks = currentDayPlan.meals.snacks?.reduce((total, snack) => {
                            const calories = parseInt(snack.calories.replace(/\D/g, '')) || 0;
                            return total + calories;
                          }, 0) || 0;
                          return breakfast + lunch + dinner + snacks;
                        })()}
                      </div>
                      <div className="text-white/80 text-xl font-semibold">Total Daily Calories</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Enhanced Tips Tab */}
        {activeTab === 'tips' && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold text-white mb-4 flex items-center justify-center gap-3">
                <span className="">💡</span>
                Expert Tips & Advice
                <span className="" style={{animationDelay: '0.5s'}}>🌟</span>
              </h2>
              <p className="text-white/80 text-xl">Professional guidance to maximize your results</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Enhanced Workout Tips */}
              <div className="group bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-xl rounded-3xl p-8 border border-blue-400/20 hover:border-blue-400/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <div className="flex items-center gap-4 mb-8">
                  <span className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-3xl group-hover:">
                    💪
                  </span>
                  <h3 className="text-3xl font-bold text-white">Workout Tips</h3>
                </div>
                <div className="space-y-4">
                  {fitnessPlans.generalTips.workout.map((tip, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                      <span className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0 group-hover:animate-pulse">
                        {index + 1}
                      </span>
                      <span className="text-white/90 text-lg leading-relaxed">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Enhanced Diet Tips */}
              <div className="group bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-xl rounded-3xl p-8 border border-green-400/20 hover:border-green-400/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <div className="flex items-center gap-4 mb-8">
                  <span className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center text-3xl group-hover:">
                    🥗
                  </span>
                  <h3 className="text-3xl font-bold text-white">Diet Tips</h3>
                </div>
                <div className="space-y-4">
                  {fitnessPlans.generalTips.diet.map((tip, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                      <span className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-400 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0 group-hover:animate-pulse">
                        {index + 1}
                      </span>
                      <span className="text-white/90 text-lg leading-relaxed">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Enhanced Lifestyle Tips */}
              <div className="group bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl rounded-3xl p-8 border border-purple-400/20 hover:border-purple-400/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <div className="flex items-center gap-4 mb-8">
                  <span className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-3xl group-hover:">
                    🌟
                  </span>
                  <h3 className="text-3xl font-bold text-white">Lifestyle Tips</h3>
                </div>
                <div className="space-y-4">
                  {fitnessPlans.generalTips.lifestyle.map((tip, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                      <span className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0 group-hover:animate-pulse">
                        {index + 1}
                      </span>
                      <span className="text-white/90 text-lg leading-relaxed">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Enhanced Success Message */}
            <div className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-12 border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl text-center">
              <div className="mb-8">
                <div className="flex justify-center gap-4 mb-6">
                  <span className="text-6xl ">🎉</span>
                  <span className="text-6xl " style={{animationDelay: '0.2s'}}>💪</span>
                  <span className="text-6xl " style={{animationDelay: '0.4s'}}>🌟</span>
                </div>
                <h3 className="text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-4">
                  You've Got This Champion!
                </h3>
              </div>
              
              <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl p-8 border border-purple-400/20 mb-8">
                <p className="text-white/90 text-xl leading-relaxed max-w-4xl mx-auto">
                  Remember, consistency is the key to unlocking your fitness potential. Follow this personalized plan, 
                  listen to your body, and celebrate every milestone along the way. You're not just building a stronger body – 
                  you're creating a healthier, more confident version of yourself. Every workout, every healthy meal, 
                  every positive choice brings you closer to your goals!
                </p>
              </div>
              
              <div className="flex justify-center gap-4 flex-wrap">
                {[
                  { text: 'Stay Strong', icon: '💪', gradient: 'from-blue-500 to-cyan-500', bgGradient: 'from-blue-500/20 to-cyan-500/20', border: 'border-blue-400/30' },
                  { text: 'Eat Smart', icon: '🥗', gradient: 'from-green-500 to-emerald-500', bgGradient: 'from-green-500/20 to-emerald-500/20', border: 'border-green-400/30' },
                  { text: 'Rest Well', icon: '😴', gradient: 'from-purple-500 to-violet-500', bgGradient: 'from-purple-500/20 to-violet-500/20', border: 'border-purple-400/30' },
                  { text: 'Stay Hydrated', icon: '💧', gradient: 'from-cyan-500 to-blue-500', bgGradient: 'from-cyan-500/20 to-blue-500/20', border: 'border-cyan-400/30' },
                  { text: 'Keep Going', icon: '🚀', gradient: 'from-pink-500 to-rose-500', bgGradient: 'from-pink-500/20 to-rose-500/20', border: 'border-pink-400/30' }
                ].map((badge, index) => (
                  <div key={index} className={`group bg-gradient-to-r ${badge.bgGradient} backdrop-blur-sm text-white px-6 py-3 rounded-full font-bold border ${badge.border} hover:shadow-xl transition-all duration-300 hover:scale-110`}>
                    <span className="flex items-center gap-2">
                      <span className="text-xl group-hover:">{badge.icon}</span>
                      {badge.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );}