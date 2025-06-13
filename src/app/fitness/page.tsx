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
      <div className="min-h-screen bg-gradient-to-br from-cute-pink via-cute-peach to-cute-lavender flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading your fitness plan...</p>
        </div>
      </div>
    );
  }

  if (!fitnessPlans) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cute-pink via-cute-peach to-cute-lavender flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">No Plan Found</h1>
          <button 
            onClick={() => router.push('/')}
            className="bg-white text-cute-pink px-8 py-3 rounded-full font-bold hover:bg-opacity-90 transition-all duration-300"
          >
            Create New Plan
          </button>
        </div>
      </div>
    );
  }

  const currentDayPlan = fitnessPlans.dailyPlans.find(plan => plan.day === selectedDay);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cute-pink via-cute-peach to-cute-lavender">
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-16 h-16 bg-cute-mint rounded-full opacity-20 animate-bounce-soft"></div>
        <div className="absolute top-40 right-20 w-12 h-12 bg-cute-sky rounded-full opacity-30 animate-pulse-slow"></div>
        <div className="absolute bottom-40 left-20 w-20 h-20 bg-white rounded-full opacity-15 animate-bounce-soft"></div>
        <div className="absolute bottom-20 right-10 w-14 h-14 bg-cute-lavender rounded-full opacity-25 animate-pulse-slow"></div>
      </div>

      {/* Header */}
      <div className="bg-white/10 backdrop-blur-sm border-b border-white/20 relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 font-cute">
                Your Personal Fitness Plan 🎯
              </h1>
              <p className="text-white/80 text-lg">
                {fitnessPlans.overview.goal} • {fitnessPlans.overview.duration} • {fitnessPlans.overview.fitnessLevel}
              </p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={handlePrintPlan}
                className="bg-white/20 text-white px-6 py-3 rounded-full font-semibold hover:bg-white/30 transition-all duration-300 backdrop-blur-sm border border-white/30"
              >
                📄 Print Plan
              </button>
              <button 
                onClick={handleStartOver}
                className="bg-white/20 text-white px-6 py-3 rounded-full font-semibold hover:bg-white/30 transition-all duration-300 backdrop-blur-sm border border-white/30"
              >
                🔄 Start Over
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto px-6 py-6 relative z-10">
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {[
            { key: 'overview', label: '📊 Overview', icon: '📊' },
            { key: 'workout', label: '💪 Workouts', icon: '💪' },
            { key: 'diet', label: '🍽️ Diet Plans', icon: '🍽️' },
            { key: 'tips', label: '💡 Tips', icon: '💡' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-8 py-4 rounded-full font-semibold transition-all duration-300 text-lg ${
                activeTab === tab.key
                  ? 'bg-white text-cute-pink shadow-lg scale-105'
                  : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm border border-white/30'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="glass-effect rounded-3xl p-8 border border-white/20">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
                  📋 Plan Overview
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-white/80 text-lg">Goal:</span>
                    <span className="text-white font-semibold capitalize">{fitnessPlans.overview.goal}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-white/80 text-lg">Duration:</span>
                    <span className="text-white font-semibold">{fitnessPlans.overview.duration}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-white/80 text-lg">Fitness Level:</span>
                    <span className="text-white font-semibold capitalize">{fitnessPlans.overview.fitnessLevel}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-white/80 text-lg">Daily Calories:</span>
                    <span className="text-white font-semibold">{fitnessPlans.overview.estimatedCaloriesPerDay}</span>
                  </div>
                </div>
              </div>
              
              <div className="glass-effect rounded-3xl p-8 border border-white/20">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
                  🎯 Expected Results
                </h2>
                <p className="text-white/90 text-lg leading-relaxed">
                  {fitnessPlans.overview.expectedResults}
                </p>
              </div>
            </div>

            {/* User Profile Summary */}
            {userData && (
              <div className="glass-effect rounded-3xl p-8 border border-white/20">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
                  👤 Your Profile
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-cute-sky">{userData.age}</div>
                    <div className="text-white/80">Years Old</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-cute-sky">{userData.height}cm</div>
                    <div className="text-white/80">Height</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-cute-sky">{userData.weight}kg</div>
                    <div className="text-white/80">Weight</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Workout Tab */}
        {activeTab === 'workout' && (
          <div className="space-y-8">
            {/* Day Selector */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-6">Select Day 📅</h2>
              <div className="flex flex-wrap justify-center gap-3">
                {fitnessPlans.dailyPlans.map(plan => (
                  <button
                    key={plan.day}
                    onClick={() => setSelectedDay(plan.day)}
                    className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                      selectedDay === plan.day
                        ? 'bg-white text-cute-pink shadow-lg scale-105'
                        : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm border border-white/30'
                    }`}
                  >
                    Day {plan.day}
                  </button>
                ))}
              </div>
            </div>

            {/* Workout Plan for Selected Day */}
            {currentDayPlan && (
              <div className="glass-effect rounded-3xl p-8 border border-white/20">
                <h3 className="text-3xl font-bold text-white mb-8 text-center">
                  Day {currentDayPlan.day} Workout 💪
                </h3>
                <div className="grid gap-6">
                  {currentDayPlan.workouts.map((workout, index) => (
                    <div key={index} className="bg-white/10 rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
                        <h4 className="text-2xl font-bold text-white flex items-center gap-2">
                          <span className="bg-cute-sky text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </span>
                          {workout.name}
                        </h4>
                        <div className="flex gap-4 text-sm">
                          <span className="bg-cute-sky/20 text-cute-sky px-3 py-1 rounded-full font-semibold">
                            ⏱️ {workout.duration}
                          </span>
                          {workout.sets && (
                            <span className="bg-cute-mint/20 text-cute-mint px-3 py-1 rounded-full font-semibold">
                              📊 {workout.sets}
                            </span>
                          )}
                          {workout.reps && (
                            <span className="bg-cute-peach/20 text-white px-3 py-1 rounded-full font-semibold">
                              🔢 {workout.reps}
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-white/90 text-lg leading-relaxed">
                        {workout.description}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Daily Tips */}
                {currentDayPlan.tips && currentDayPlan.tips.length > 0 && (
                  <div className="mt-8 bg-white/5 rounded-2xl p-6 border border-white/10">
                    <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      💡 Day {currentDayPlan.day} Tips
                    </h4>
                    <ul className="space-y-2">
                      {currentDayPlan.tips.map((tip, index) => (
                        <li key={index} className="text-white/90 flex items-start gap-2">
                          <span className="text-cute-sky">•</span>
                          {tip}
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
          <div className="space-y-8">
            {/* Day Selector */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-6">Select Day 🍽️</h2>
              <div className="flex flex-wrap justify-center gap-3">
                {fitnessPlans.dailyPlans.map(plan => (
                  <button
                    key={plan.day}
                    onClick={() => setSelectedDay(plan.day)}
                    className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                      selectedDay === plan.day
                        ? 'bg-white text-cute-pink shadow-lg scale-105'
                        : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm border border-white/30'
                    }`}
                  >
                    Day {plan.day}
                  </button>
                ))}
              </div>
            </div>

            {/* Diet Plan for Selected Day */}
            {currentDayPlan && currentDayPlan.meals && (
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-white mb-8 text-center">
                  Day {currentDayPlan.day} Meal Plan 🍽️
                </h3>
                
                {/* Breakfast */}
                <div className="glass-effect rounded-3xl p-8 border border-white/20">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-4xl">🌅</span>
                    <h4 className="text-2xl font-bold text-white">Breakfast</h4>
                    <span className="bg-cute-sky/20 text-cute-sky px-4 py-2 rounded-full font-semibold ml-auto">
                      {currentDayPlan.meals.breakfast.calories}
                    </span>
                  </div>
                  <h5 className="text-xl font-semibold text-white mb-4">{currentDayPlan.meals.breakfast.name}</h5>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h6 className="text-lg font-semibold text-white mb-3">🛒 Ingredients:</h6>
                      <ul className="space-y-1">
                        {currentDayPlan.meals.breakfast.ingredients.map((ingredient, index) => (
                          <li key={index} className="text-white/90 flex items-center gap-2">
                            <span className="text-cute-sky">•</span>
                            {ingredient}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h6 className="text-lg font-semibold text-white mb-3">👨‍🍳 Instructions:</h6>
                      <p className="text-white/90 leading-relaxed">{currentDayPlan.meals.breakfast.instructions}</p>
                    </div>
                  </div>
                </div>

                {/* Lunch */}
                <div className="glass-effect rounded-3xl p-8 border border-white/20">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-4xl">☀️</span>
                    <h4 className="text-2xl font-bold text-white">Lunch</h4>
                    <span className="bg-cute-mint/20 text-cute-mint px-4 py-2 rounded-full font-semibold ml-auto">
                      {currentDayPlan.meals.lunch.calories}
                    </span>
                  </div>
                  <h5 className="text-xl font-semibold text-white mb-4">{currentDayPlan.meals.lunch.name}</h5>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h6 className="text-lg font-semibold text-white mb-3">🛒 Ingredients:</h6>
                      <ul className="space-y-1">
                        {currentDayPlan.meals.lunch.ingredients.map((ingredient, index) => (
                          <li key={index} className="text-white/90 flex items-center gap-2">
                            <span className="text-cute-mint">•</span>
                            {ingredient}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h6 className="text-lg font-semibold text-white mb-3">👨‍🍳 Instructions:</h6>
                      <p className="text-white/90 leading-relaxed">{currentDayPlan.meals.lunch.instructions}</p>
                    </div>
                  </div>
                </div>

                {/* Dinner */}
                <div className="glass-effect rounded-3xl p-8 border border-white/20">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-4xl">🌙</span>
                    <h4 className="text-2xl font-bold text-white">Dinner</h4>
                    <span className="bg-cute-peach/20 text-white px-4 py-2 rounded-full font-semibold ml-auto">
                      {currentDayPlan.meals.dinner.calories}
                    </span>
                  </div>
                  <h5 className="text-xl font-semibold text-white mb-4">{currentDayPlan.meals.dinner.name}</h5>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h6 className="text-lg font-semibold text-white mb-3">🛒 Ingredients:</h6>
                      <ul className="space-y-1">
                        {currentDayPlan.meals.dinner.ingredients.map((ingredient, index) => (
                          <li key={index} className="text-white/90 flex items-center gap-2">
                            <span className="text-cute-peach">•</span>
                            {ingredient}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h6 className="text-lg font-semibold text-white mb-3">👨‍🍳 Instructions:</h6>
                      <p className="text-white/90 leading-relaxed">{currentDayPlan.meals.dinner.instructions}</p>
                    </div>
                  </div>
                </div>

                {/* Snacks */}
                {currentDayPlan.meals.snacks && currentDayPlan.meals.snacks.length > 0 && (
                  <div className="glass-effect rounded-3xl p-8 border border-white/20">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-4xl">🍎</span>
                      <h4 className="text-2xl font-bold text-white">Snacks</h4>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      {currentDayPlan.meals.snacks.map((snack, index) => (
                        <div key={index} className="bg-white/10 rounded-2xl p-4 border border-white/10">
                          <div className="flex justify-between items-center mb-2">
                            <h6 className="text-lg font-semibold text-white">{snack.name}</h6>
                            <span className="bg-cute-lavender/20 text-cute-lavender px-3 py-1 rounded-full text-sm font-semibold">
                              {snack.calories}
                            </span>
                          </div>
                          <ul className="space-y-1">
                            {snack.ingredients.map((ingredient, ingIndex) => (
                              <li key={ingIndex} className="text-white/80 text-sm flex items-center gap-2">
                                <span className="text-cute-lavender">•</span>
                                {ingredient}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Daily Calorie Summary */}
                <div className="glass-effect rounded-2xl p-6 border border-white/20 text-center">
                  <h4 className="text-xl font-bold text-white mb-4">📊 Daily Calorie Breakdown</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <div className="text-2xl font-bold text-cute-sky">
                        {currentDayPlan.meals.breakfast.calories}
                      </div>
                      <div className="text-white/80 text-sm">Breakfast</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-cute-mint">
                        {currentDayPlan.meals.lunch.calories}
                      </div>
                      <div className="text-white/80 text-sm">Lunch</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-cute-peach">
                        {currentDayPlan.meals.dinner.calories}
                      </div>
                      <div className="text-white/80 text-sm">Dinner</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-cute-lavender">
                        {currentDayPlan.meals.snacks?.reduce((total, snack) => {
                          const calories = parseInt(snack.calories.replace(/\D/g, '')) || 0;
                          return total + calories;
                        }, 0) || 0}
                      </div>
                      <div className="text-white/80 text-sm">Snacks</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tips Tab */}
        {activeTab === 'tips' && (
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-white text-center mb-8">Expert Tips & Advice 💡</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Workout Tips */}
              <div className="glass-effect rounded-3xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  💪 Workout Tips
                </h3>
                <ul className="space-y-4">
                  {fitnessPlans.generalTips.workout.map((tip, index) => (
                    <li key={index} className="text-white/90 flex items-start gap-3">
                      <span className="text-cute-sky text-xl">💪</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Diet Tips */}
              <div className="glass-effect rounded-3xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  🥗 Diet Tips
                </h3>
                <ul className="space-y-4">
                  {fitnessPlans.generalTips.diet.map((tip, index) => (
                    <li key={index} className="text-white/90 flex items-start gap-3">
                      <span className="text-cute-mint text-xl">🥗</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Lifestyle Tips */}
              <div className="glass-effect rounded-3xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  🌟 Lifestyle Tips
                </h3>
                <ul className="space-y-4">
                  {fitnessPlans.generalTips.lifestyle.map((tip, index) => (
                    <li key={index} className="text-white/90 flex items-start gap-3">
                      <span className="text-cute-peach text-xl">🌟</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Success Message */}
            <div className="glass-effect rounded-3xl p-8 border border-white/20 text-center">
              <h3 className="text-3xl font-bold text-white mb-4">🎉 You've Got This!</h3>
              <p className="text-white/90 text-lg leading-relaxed max-w-3xl mx-auto">
                Remember, consistency is key to achieving your fitness goals. Follow this plan, listen to your body, 
                and don't forget to celebrate your progress along the way. You're on the path to a healthier, 
                stronger version of yourself!
              </p>
              <div className="mt-6 flex justify-center gap-4 flex-wrap">
                <span className="bg-cute-sky/20 text-cute-sky px-4 py-2 rounded-full font-semibold">
                  💪 Stay Strong
                </span>
                <span className="bg-cute-mint/20 text-cute-mint px-4 py-2 rounded-full font-semibold">
                  🥗 Eat Smart
                </span>
                <span className="bg-cute-peach/20 text-white px-4 py-2 rounded-full font-semibold">
                  😴 Rest Well
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}