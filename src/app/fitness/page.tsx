// 1. Updated FitnessPlanPage.tsx - Fixed data isolation and removed unnecessary localStorage
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FitnessPlan, DayPlan } from '@/lib/gemini';

export default function FitnessPlanPage() {
  const router = useRouter();
  const [fitnessPlans, setFitnessPlans] = useState<FitnessPlan | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [currentPlanId, setCurrentPlanId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'workout' | 'diet' | 'tips' | 'progress'>('overview');
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  
  // Progress tracking - now plan-specific
  const [completedTasks, setCompletedTasks] = useState<{
    workouts: { [key: string]: boolean },
    meals: { [key: string]: boolean }
  }>({
    workouts: {},
    meals: {}
  });
  const [dailyProgress, setDailyProgress] = useState<{ [key: number]: { workouts: number, meals: number, total: number } }>({});
  const [totalPoints, setTotalPoints] = useState(0);
  const [completedDays, setCompletedDays] = useState<number[]>([]);

  useEffect(() => {
    // Get the current plan ID and load specific plan data
    const storedCurrentPlanId = localStorage.getItem('currentPlanId');
    const storedPlans = localStorage.getItem('fitnessPlans');
    const storedUserData = localStorage.getItem('userData');
    
    if (storedCurrentPlanId && storedPlans && storedUserData) {
      setCurrentPlanId(storedCurrentPlanId);
      setFitnessPlans(JSON.parse(storedPlans));
      setUserData(JSON.parse(storedUserData));
      
      // Load plan-specific progress
      loadPlanProgress(storedCurrentPlanId);
    } else {
      // Try to get from fitnessPlanList if direct access fails
      const fitnessPlanList = JSON.parse(localStorage.getItem('fitnessPlanList') || '[]');
      const activeId = localStorage.getItem('currentPlanId');
      
      if (activeId && fitnessPlanList.length > 0) {
        const activePlan = fitnessPlanList.find((plan: any) => plan.id === activeId);
        if (activePlan) {
          setCurrentPlanId(activeId);
          setFitnessPlans(activePlan.fitnessPlans);
          setUserData(activePlan.userData);
          loadPlanProgress(activeId);
        } else {
          router.push('/');
        }
      } else {
        router.push('/');
      }
    }
    
    setLoading(false);
  }, [router]);

  // Load progress specific to current plan
  const loadPlanProgress = (planId: string) => {
    const storedProgress = localStorage.getItem(`fitnessProgress_${planId}`);
    if (storedProgress) {
      const progress = JSON.parse(storedProgress);
      setCompletedTasks(progress.completedTasks || { workouts: {}, meals: {} });
      setDailyProgress(progress.dailyProgress || {});
      setTotalPoints(progress.totalPoints || 0);
      setCompletedDays(progress.completedDays || []);
    }
  };

  // Save progress specific to current plan
  const saveProgress = (newProgress: any) => {
    if (!currentPlanId) return;
    
    const progressData = {
      completedTasks: newProgress.completedTasks,
      dailyProgress: newProgress.dailyProgress,
      totalPoints: newProgress.totalPoints,
      completedDays: newProgress.completedDays,
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem(`fitnessProgress_${currentPlanId}`, JSON.stringify(progressData));
    
    // Update global rewards
    updateGlobalRewards();
  };

  // Update global rewards across all plans
  const updateGlobalRewards = () => {
    const fitnessPlanList = JSON.parse(localStorage.getItem('fitnessPlanList') || '[]');
    let totalGlobalPoints = 0;
    let totalCompletedDays = 0;
    let totalActivePlans = 0;

    fitnessPlanList.forEach((plan: any) => {
      const planProgress = localStorage.getItem(`fitnessProgress_${plan.id}`);
      if (planProgress) {
        const progress = JSON.parse(planProgress);
        totalGlobalPoints += progress.totalPoints || 0;
        totalCompletedDays += progress.completedDays?.length || 0;
        if (progress.totalPoints > 0) totalActivePlans++;
      }
    });

    const globalRewards = {
      totalPoints: totalGlobalPoints,
      totalCompletedDays,
      totalActivePlans,
      lastUpdated: new Date().toISOString()
    };

    localStorage.setItem('globalRewards', JSON.stringify(globalRewards));
  };

  // Handle task completion
  const handleTaskCompletion = (taskId: string, taskType: 'workout' | 'meal', points: number = 10) => {
    const newCompletedTasks = {
      ...completedTasks,
      [taskType === 'workout' ? 'workouts' : 'meals']: {
        ...completedTasks[taskType === 'workout' ? 'workouts' : 'meals'],
        [taskId]: !completedTasks[taskType === 'workout' ? 'workouts' : 'meals'][taskId]
      }
    };

    const isCompleting = !completedTasks[taskType === 'workout' ? 'workouts' : 'meals'][taskId];
    const newTotalPoints = isCompleting ? totalPoints + points : totalPoints - points;

    setCompletedTasks(newCompletedTasks);
    setTotalPoints(Math.max(0, newTotalPoints));

    // Update daily progress
    updateDailyProgress(newCompletedTasks);

    // Save to localStorage
    const progressData = {
      completedTasks: newCompletedTasks,
      dailyProgress,
      totalPoints: Math.max(0, newTotalPoints),
      completedDays
    };
    saveProgress(progressData);
  };

  // Update daily progress calculation
  const updateDailyProgress = (tasks: any) => {
    if (!fitnessPlans) return;

    const newDailyProgress: { [key: number]: { workouts: number, meals: number, total: number } } = {};
    const newCompletedDays: number[] = [];

    fitnessPlans.dailyPlans.forEach(dayPlan => {
      const dayWorkouts = dayPlan.workouts.length;
      const dayMeals = 4; // breakfast, lunch, dinner, snacks
      
      let completedWorkouts = 0;
      let completedMeals = 0;

      // Count completed workouts
      dayPlan.workouts.forEach((workout, index) => {
        const taskId = `day-${dayPlan.day}-workout-${index}`;
        if (tasks.workouts[taskId]) completedWorkouts++;
      });

      // Count completed meals
      ['breakfast', 'lunch', 'dinner', 'snacks'].forEach(mealType => {
        const taskId = `day-${dayPlan.day}-meal-${mealType}`;
        if (tasks.meals[taskId]) completedMeals++;
      });

      const totalTasks = dayWorkouts + dayMeals;
      const completedTotal = completedWorkouts + completedMeals;
      
      newDailyProgress[dayPlan.day] = {
        workouts: completedWorkouts,
        meals: completedMeals,
        total: Math.round((completedTotal / totalTasks) * 100)
      };

      // Check if day is fully completed
      if (completedTotal === totalTasks) {
        newCompletedDays.push(dayPlan.day);
      }
    });

    setDailyProgress(newDailyProgress);
    setCompletedDays(newCompletedDays);
  };

  // Mark entire day as complete
  const handleDayCompletion = (day: number) => {
    if (!fitnessPlans) return;

    const dayPlan = fitnessPlans.dailyPlans.find(plan => plan.day === day);
    if (!dayPlan) return;

    const newCompletedTasks = { ...completedTasks };
    let pointsEarned = 0;

    // Mark all workouts as complete
    dayPlan.workouts.forEach((workout, index) => {
      const taskId = `day-${day}-workout-${index}`;
      if (!newCompletedTasks.workouts[taskId]) {
        newCompletedTasks.workouts[taskId] = true;
        pointsEarned += 15; // More points for workouts
      }
    });

    // Mark all meals as complete
    ['breakfast', 'lunch', 'dinner', 'snacks'].forEach(mealType => {
      const taskId = `day-${day}-meal-${mealType}`;
      if (!newCompletedTasks.meals[taskId]) {
        newCompletedTasks.meals[taskId] = true;
        pointsEarned += 10; // Points for meals
      }
    });

    // Bonus points for completing entire day
    pointsEarned += 50;

    setCompletedTasks(newCompletedTasks);
    setTotalPoints(totalPoints + pointsEarned);
    updateDailyProgress(newCompletedTasks);

    // Save progress
    const progressData = {
      completedTasks: newCompletedTasks,
      dailyProgress,
      totalPoints: totalPoints + pointsEarned,
      completedDays: [...completedDays, day]
    };
    saveProgress(progressData);

    // Show completion celebration
    alert(`🎉 Congratulations! Day ${day} completed! You earned ${pointsEarned} points!`);
  };

  const handleStartOver = () => {
    // Clear only current plan data, not all data
    if (currentPlanId) {
      localStorage.removeItem(`fitnessProgress_${currentPlanId}`);
    }
    localStorage.removeItem('fitnessPlans');
    localStorage.removeItem('userData');
    localStorage.removeItem('currentPlanId');
    router.push('/');
  };

  const handlePrintPlan = () => {
    window.print();
  };

  const navigateToRewards = () => {
    // Save current progress before navigating
    const progressData = {
      completedTasks,
      dailyProgress,
      totalPoints,
      completedDays,
      lastUpdated: new Date().toISOString()
    };
    if (currentPlanId) {
      localStorage.setItem(`fitnessProgress_${currentPlanId}`, JSON.stringify(progressData));
    }
    updateGlobalRewards();
    router.push('/rewards');
  };

  // Rest of your component logic remains the same...
  // (loading state, no plans state, etc.)

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center relative overflow-hidden">
        {/* Your existing loading UI */}
      </div>
    );
  }

  if (!fitnessPlans) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center relative overflow-hidden">
        {/* Your existing no plans UI */}
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
                    {/* NEW: Progress indicator */}
                    <span className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm text-yellow-200 px-4 py-2 rounded-full border border-yellow-400/30 animate-pulse">
                      🏆 {totalPoints} Points
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={navigateToRewards}
                className="group bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 backdrop-blur-sm border border-white/20 hover:scale-105"
              >
                <span className="flex items-center gap-2">
                  <span className="text-xl group-hover:">🏆</span>
                  Rewards ({totalPoints})
                </span>
              </button>
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
            { key: 'tips', label: 'Expert Tips', icon: '💡', gradient: 'from-yellow-500 to-orange-500' },
            { key: 'progress', label: 'Progress', icon: '📈', gradient: 'from-pink-500 to-rose-500' }
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
                <span className={`text-2xl ${activeTab === tab.key ? 'animate-pulse' : 'group-hover:'}`}>
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
                      {/* Progress indicator */}
                      {dailyProgress[plan.day] && (
                        <span className="ml-2 text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded-full">
                          {dailyProgress[plan.day].total}%
                        </span>
                      )}
                    </span>
                  </button>
                ))}
              </div>
            </div>


{/* Enhanced Workout Plan with Checkboxes */}
            {currentDayPlan && (
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
                <h3 className="text-4xl font-bold text-white mb-8 text-center flex items-center justify-center gap-3">
                  <span className="">💪</span>
                  Day {currentDayPlan.day} Workout
                  <span className="" style={{animationDelay: '0.5s'}}>🔥</span>
                </h3>
                <div className="grid gap-6">
                  {currentDayPlan.workouts.map((workout, index) => {
                    const taskId = `day-${currentDayPlan.day}-workout-${index}`;
                    const isCompleted = completedTasks.workouts[taskId];
                    
                    return (
                      <div key={index} className={`group bg-gradient-to-r from-white/5 to-white/10 rounded-3xl p-8 border transition-all duration-300 hover:scale-105 ${
                        isCompleted 
                          ? 'border-green-400/50 bg-gradient-to-r from-green-500/10 to-emerald-500/10' 
                          : 'border-white/20 hover:border-white/40 hover:shadow-2xl'
                      }`}>
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                          <div className="flex items-center gap-4">
                            <button
                              onClick={() => handleTaskCompletion(taskId, 'workout', 15)}
                              className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                                isCompleted
                                  ? 'bg-green-500 border-green-500 text-white'
                                  : 'border-white/40 hover:border-green-400 hover:bg-green-400/20'
                              }`}
                            >
                              {isCompleted && <span className="text-sm font-bold">✓</span>}
                            </button>
                            <h4 className={`text-2xl font-bold flex items-center gap-3 transition-all duration-300 ${
                              isCompleted ? 'text-green-300 line-through' : 'text-white'
                            }`}>
                              <span className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-white font-bold text-lg">
                                {index + 1}
                              </span>
                              {workout.name}
                              {isCompleted && <span className="text-2xl ">🎉</span>}
                            </h4>
                          </div>
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
                            {isCompleted && (
                              <span className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-200 px-4 py-2 rounded-full font-semibold border border-green-400/30 flex items-center gap-2 animate-pulse">
                                <span>🏆</span>
                                +15 Points
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
                    );
                  })}
                </div>

                {/* Day Completion Button */}
                {currentDayPlan && !completedDays.includes(currentDayPlan.day) && (
                  <div className="mt-8 text-center">
                    <button
                      onClick={() => handleDayCompletion(currentDayPlan.day)}
                      className="group bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-green-500/25 transition-all duration-300 hover:scale-105"
                    >
                      <span className="flex items-center gap-3">
                        <span className="text-2xl group-hover:">🎯</span>
                        Complete Day {currentDayPlan.day}
                        <span className="text-2xl group-hover:" style={{animationDelay: '0.1s'}}>🏆</span>
                      </span>
                    </button>
                  </div>
                )}

                {/* Day Completed Badge */}
                {completedDays.includes(currentDayPlan.day) && (
                  <div className="mt-8 text-center">
                    <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm text-green-200 px-8 py-4 rounded-2xl border border-green-400/30 animate-pulse">
                      <span className="text-3xl">🏆</span>
                      <span className="text-xl font-bold">Day {currentDayPlan.day} Completed!</span>
                      <span className="text-3xl">🎉</span>
                    </div>
                  </div>
                )}

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

        {/* Enhanced Diet Tab with Checkboxes */}
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
                {fitnessPlans.dailyPlans.map(plan => {
                  const dayProgress = dailyProgress[plan.day];
                  const isCompleted = completedDays.includes(plan.day);
                  
                  return (
                    <button
                      key={plan.day}
                      onClick={() => setSelectedDay(plan.day)}
                      className={`group relative px-6 py-4 rounded-2xl font-bold transition-all duration-300 overflow-hidden ${
                        selectedDay === plan.day
                          ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-2xl scale-110'
                          : isCompleted
                          ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white border-2 border-green-400'
                          : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border border-white/20 hover:scale-105'
                      }`}
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        <span className={selectedDay === plan.day ? 'animate-pulse' : 'group-hover:'}>
                          {plan.day === 1 ? '🍎' : plan.day === 2 ? '🥑' : plan.day === 3 ? '🍊' : plan.day === 4 ? '🥗' : plan.day === 5 ? '🍇' : plan.day === 6 ? '🥕' : '🍓'}
                        </span>
                        Day {plan.day}
                        {isCompleted && <span className="text-sm">🏆</span>}
                      </span>
                      {dayProgress && (
                        <div className="absolute bottom-1 left-1 right-1 h-1 bg-white/20 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-green-400 to-emerald-400 transition-all duration-500"
                            style={{ width: `${dayProgress.total}%` }}
                          ></div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Enhanced Diet Plan with Checkboxes */}
            {currentDayPlan && currentDayPlan.meals && (
              <div className="space-y-8">
                <h3 className="text-4xl font-bold text-white mb-8 text-center flex items-center justify-center gap-3">
                  <span className="">🍽️</span>
                  Day {currentDayPlan.day} Nutrition Plan
                  <span className="" style={{animationDelay: '0.5s'}}>🌟</span>
                </h3>
               
                {/* Enhanced Meals with Checkboxes */}
                {[
                  { meal: currentDayPlan.meals.breakfast, name: 'Breakfast', icon: '🌅', gradient: 'from-yellow-500 to-orange-500', bgGradient: 'from-yellow-500/10 to-orange-500/10', borderColor: 'border-yellow-400/20', mealType: 'breakfast' },
                  { meal: currentDayPlan.meals.lunch, name: 'Lunch', icon: '☀️', gradient: 'from-green-500 to-emerald-500', bgGradient: 'from-green-500/10 to-emerald-500/10', borderColor: 'border-green-400/20', mealType: 'lunch' },
                  { meal: currentDayPlan.meals.dinner, name: 'Dinner', icon: '🌙', gradient: 'from-purple-500 to-indigo-500', bgGradient: 'from-purple-500/10 to-indigo-500/10', borderColor: 'border-purple-400/20', mealType: 'dinner' }
                ].map(({ meal, name, icon, gradient, bgGradient, borderColor, mealType }, index) => {
                  const taskId = `day-${currentDayPlan.day}-meal-${mealType}`;
                  const isCompleted = completedTasks.meals[taskId];
                  
                  return (
                    <div key={index} className={`group backdrop-blur-xl rounded-3xl p-8 border hover:shadow-2xl transition-all duration-300 hover:scale-105 ${
                      isCompleted 
                        ? `bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-400/50` 
                        : `bg-gradient-to-br ${bgGradient} ${borderColor}`
                    }`}>
                      <div className="flex items-center gap-4 mb-8">
                        <button
                          onClick={() => handleTaskCompletion(taskId, 'meal', 10)}
                          className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                            isCompleted
                              ? 'bg-green-500 border-green-500 text-white'
                              : 'border-white/40 hover:border-green-400 hover:bg-green-400/20'
                          }`}
                        >
                          {isCompleted && <span className="text-sm font-bold">✓</span>}
                        </button>
                        <span className={`w-16 h-16 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center text-3xl group-hover:`}>
                          {icon}
                        </span>
                        <div className="flex-1">
                          <h4 className={`text-3xl font-bold transition-all duration-300 ${
                            isCompleted ? 'text-green-300' : 'text-white'
                          }`}>
                            {name}
                            {isCompleted && <span className="ml-2 text-2xl ">🎉</span>}
                          </h4>
                          <h5 className="text-xl font-semibold text-white/80 mt-2">{meal.name}</h5>
                        </div>
                        <div className="flex gap-3">
                          <div className={`bg-gradient-to-r ${gradient} text-white px-6 py-3 rounded-2xl font-bold text-lg shadow-lg`}>
                            <span className="flex items-center gap-2">
                              <span className="animate-pulse">🔥</span>
                              {meal.calories}
                            </span>
                          </div>
                          {isCompleted && (
                            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-200 px-4 py-3 rounded-2xl font-bold border border-green-400/30 animate-pulse">
                              <span className="flex items-center gap-2">
                                <span>🏆</span>
                                +10 Points
                              </span>
                            </div>
                          )}
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
                  );
                })}

                {/* Enhanced Snacks Section with Checkbox */}
                {currentDayPlan.meals.snacks && currentDayPlan.meals.snacks.length > 0 && (
                  <div className={`group backdrop-blur-xl rounded-3xl p-8 border hover:shadow-2xl transition-all duration-300 hover:scale-105 ${
                    completedTasks.meals[`day-${currentDayPlan.day}-meal-snacks`]
                      ? 'bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-400/50'
                      : 'bg-gradient-to-br from-indigo-500/10 to-violet-500/10 border-indigo-400/20'
                  }`}>
                    <div className="flex items-center gap-4 mb-8">
                      <button
                        onClick={() => handleTaskCompletion(`day-${currentDayPlan.day}-meal-snacks`, 'meal', 10)}
                        className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                          completedTasks.meals[`day-${currentDayPlan.day}-meal-snacks`]
                            ? 'bg-green-500 border-green-500 text-white'
                            : 'border-white/40 hover:border-green-400 hover:bg-green-400/20'
                        }`}
                      >
                        {completedTasks.meals[`day-${currentDayPlan.day}-meal-snacks`] && <span className="text-sm font-bold">✓</span>}
                      </button>
                      <span className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-2xl flex items-center justify-center text-3xl group-hover:">
                        🍎
                      </span>
                      <h4 className={`text-3xl font-bold transition-all duration-300 ${
                        completedTasks.meals[`day-${currentDayPlan.day}-meal-snacks`] ? 'text-green-300' : 'text-white'
                      }`}>
                        Healthy Snacks
                        {completedTasks.meals[`day-${currentDayPlan.day}-meal-snacks`] && <span className="ml-2 text-2xl ">🎉</span>}
                      </h4>
                      {completedTasks.meals[`day-${currentDayPlan.day}-meal-snacks`] && (
                        <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-200 px-4 py-3 rounded-2xl font-bold border border-green-400/30 animate-pulse ml-auto">
                          <span className="flex items-center gap-2">
                            <span>🏆</span>
                            +10 Points
                          </span>
                        </div>
                      )}
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
                        borderColor: 'border-yellow-400/30',
                        completed: completedTasks.meals[`day-${currentDayPlan.day}-meal-breakfast`]
                      },
                      {
                        name: 'Lunch',
                        calories: currentDayPlan.meals.lunch.calories,
                        icon: '☀️',
                        gradient: 'from-green-500 to-emerald-500',
                        bgGradient: 'from-green-500/20 to-emerald-500/20',
                        borderColor: 'border-green-400/30',
                        completed: completedTasks.meals[`day-${currentDayPlan.day}-meal-lunch`]
                      },
                      {
                        name: 'Dinner',
                        calories: currentDayPlan.meals.dinner.calories,
                        icon: '🌙',
                        gradient: 'from-purple-500 to-indigo-500',
                        bgGradient: 'from-purple-500/20 to-indigo-500/20',
                        borderColor: 'border-purple-400/30',
                        completed: completedTasks.meals[`day-${currentDayPlan.day}-meal-dinner`]
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
                        borderColor: 'border-indigo-400/30',
                        completed: completedTasks.meals[`day-${currentDayPlan.day}-meal-snacks`]
                      }
                    ].map((item, index) => (
                      <div key={index} className={`group backdrop-blur-sm rounded-2xl p-6 border hover:shadow-xl transition-all duration-300 hover:scale-110 text-center ${
                        item.completed 
                          ? 'bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-400/30'
                          : `bg-gradient-to-br ${item.bgGradient} ${item.borderColor}`
                      }`}>
                        <div className={`w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4 group-hover: relative`}>
                          {item.icon}
                          {item.completed && (
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                              ✓
                            </div>
                          )}
                        </div>
                        <div className={`text-3xl font-bold mb-2 ${item.completed ? 'text-green-300' : 'text-white'}`}>
                          {typeof item.calories === 'number' ? `${item.calories} cal` : item.calories}
                        </div>
                        <div className="text-white/70 text-lg font-semibold">{item.name}</div>
                        {item.completed && (
                          <div className="mt-2 text-green-400 text-sm font-bold animate-pulse">
                            Completed! 🏆
                          </div>
                        )}
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

        
{/* Progress Tab */}
        {activeTab === 'progress' && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold text-white mb-4 flex items-center justify-center gap-3">
                <span className="">📈</span>
                Your Progress Journey
                <span className="animate-pulse" style={{animationDelay: '0.5s'}}>🏆</span>
              </h2>
              <p className="text-white/80 text-xl">Track your achievements and earn rewards!</p>
            </div>

            {/* Overall Progress Stats */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="group bg-gradient-to-br from-yellow-500/10 to-orange-500/10 backdrop-blur-xl rounded-3xl p-6 border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300 hover:scale-105 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 group-hover:">
                  🏆
                </div>
                <div className="text-4xl font-bold text-white mb-2">{totalPoints}</div>
                <div className="text-yellow-200 text-lg font-semibold">Total Points</div>
              </div>

              <div className="group bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-xl rounded-3xl p-6 border border-green-400/20 hover:border-green-400/40 transition-all duration-300 hover:scale-105 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 group-hover:">
                  ✅
                </div>
                <div className="text-4xl font-bold text-white mb-2">{completedDays.length}</div>
                <div className="text-green-200 text-lg font-semibold">Days Completed</div>
              </div>

              <div className="group bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl rounded-3xl p-6 border border-purple-400/20 hover:border-purple-400/40 transition-all duration-300 hover:scale-105 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 group-hover:">
                  💪
                </div>
                <div className="text-4xl font-bold text-white mb-2">
                  {Object.values(completedTasks.workouts).filter(Boolean).length}
                </div>
                <div className="text-purple-200 text-lg font-semibold">Workouts Done</div>
              </div>

              <div className="group bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-xl rounded-3xl p-6 border border-blue-400/20 hover:border-blue-400/40 transition-all duration-300 hover:scale-105 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 group-hover:">
                  🍽️
                </div>
                <div className="text-4xl font-bold text-white mb-2">
                  {Object.values(completedTasks.meals).filter(Boolean).length}
                </div>
                <div className="text-blue-200 text-lg font-semibold">Meals Tracked</div>
              </div>
            </div>

            {/* Daily Progress Overview */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
              <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <span className="animate-pulse">📊</span>
                Daily Progress Overview
              </h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {fitnessPlans?.dailyPlans.map(dayPlan => {
                  const progress = dailyProgress[dayPlan.day] || { workouts: 0, meals: 0, total: 0 };
                  const isCompleted = completedDays.includes(dayPlan.day);
                  
                  return (
                    <div key={dayPlan.day} className={`group relative overflow-hidden rounded-2xl p-6 border transition-all duration-300 hover:scale-105 ${
                      isCompleted 
                        ? 'bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-400/40' 
                        : 'bg-gradient-to-br from-white/5 to-white/2 border-white/20 hover:border-white/40'
                    }`}>
                      {/* Completion Badge */}
                      {isCompleted && (
                        <div className="absolute top-4 right-4">
                          <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white text-sm animate-pulse">
                            ✓
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                          isCompleted ? 'bg-gradient-to-br from-green-500 to-emerald-500' : 'bg-gradient-to-br from-purple-500 to-pink-500'
                        }`}>
                          {dayPlan.day === 1 ? '🏃' : dayPlan.day === 2 ? '💪' : dayPlan.day === 3 ? '🏋️' : 
                           dayPlan.day === 4 ? '🚴' : dayPlan.day === 5 ? '🏊' : dayPlan.day === 6 ? '🧘' : '🎯'}
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-white">Day {dayPlan.day}</h4>
                          <p className="text-white/70">{progress.total}% Complete</p>
                        </div>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="bg-white/10 rounded-full h-3 overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-500 ${
                              isCompleted 
                                ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                                : 'bg-gradient-to-r from-purple-500 to-pink-500'
                            }`}
                            style={{width: `${progress.total}%`}}
                          ></div>
                        </div>
                      </div>
                      
                      {/* Task Breakdown */}
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-white/80 flex items-center gap-2">
                            💪 Workouts
                          </span>
                          <span className="text-white font-semibold">
                            {progress.workouts}/{dayPlan.workouts.length}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-white/80 flex items-center gap-2">
                            🍽️ Meals
                          </span>
                          <span className="text-white font-semibold">
                            {progress.meals}/4
                          </span>
                        </div>
                      </div>
                      
                      {/* Complete Day Button */}
                      {!isCompleted && progress.total < 100 && (
                        <button
                          onClick={() => handleDayCompletion(dayPlan.day)}
                          className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
                        >
                          Complete Day {dayPlan.day}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Achievement Badges */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
              <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <span className="">🏅</span>
                Achievement Badges
              </h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    title: 'First Step',
                    description: 'Complete your first workout',
                    icon: '👟',
                    condition: Object.values(completedTasks.workouts).filter(Boolean).length >= 1,
                    gradient: 'from-blue-500 to-cyan-500'
                  },
                  {
                    title: 'Nutrition Hero',
                    description: 'Track 10 meals',
                    icon: '🥗',
                    condition: Object.values(completedTasks.meals).filter(Boolean).length >= 10,
                    gradient: 'from-green-500 to-emerald-500'
                  },
                  {
                    title: 'Consistency King',
                    description: 'Complete 3 full days',
                    icon: '👑',
                    condition: completedDays.length >= 3,
                    gradient: 'from-yellow-500 to-orange-500'
                  },
                  {
                    title: 'Points Master',
                    description: 'Earn 500 points',
                    icon: '💎',
                    condition: totalPoints >= 500,
                    gradient: 'from-purple-500 to-pink-500'
                  },
                  {
                    title: 'Week Warrior',
                    description: 'Complete a full week',
                    icon: '🗓️',
                    condition: completedDays.length >= 7,
                    gradient: 'from-red-500 to-rose-500'
                  },
                  {
                    title: 'Fitness Fanatic',
                    description: 'Complete 20 workouts',
                    icon: '🔥',
                    condition: Object.values(completedTasks.workouts).filter(Boolean).length >= 20,
                    gradient: 'from-orange-500 to-red-500'
                  },
                  {
                    title: 'Meal Planner',
                    description: 'Track all meals for 5 days',
                    icon: '📋',
                    condition: Object.entries(dailyProgress).filter(([_, progress]) => progress.meals === 4).length >= 5,
                    gradient: 'from-teal-500 to-cyan-500'
                  },
                  {
                    title: 'Champion',
                    description: 'Earn 1000 points',
                    icon: '🏆',
                    condition: totalPoints >= 1000,
                    gradient: 'from-yellow-400 to-yellow-600'
                  }
                ].map((badge, index) => (
                  <div key={index} className={`group relative overflow-hidden rounded-2xl p-6 border transition-all duration-300 hover:scale-105 ${
                    badge.condition 
                      ? `bg-gradient-to-br ${badge.gradient.replace('to-', 'to-').replace('from-', 'from-')}/20 border-white/40` 
                      : 'bg-gradient-to-br from-gray-500/10 to-gray-600/10 border-gray-400/20'
                  }`}>
                    <div className="text-center">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 transition-all duration-300 ${
                        badge.condition 
                          ? `bg-gradient-to-br ${badge.gradient} group-hover:` 
                          : 'bg-gray-500/20 grayscale'
                      }`}>
                        {badge.icon}
                      </div>
                      <h4 className={`text-lg font-bold mb-2 ${badge.condition ? 'text-white' : 'text-gray-400'}`}>
                        {badge.title}
                      </h4>
                      <p className={`text-sm ${badge.condition ? 'text-white/80' : 'text-gray-500'}`}>
                        {badge.description}
                      </p>
                      {badge.condition && (
                        <div className="absolute top-2 right-2">
                          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs animate-pulse">
                            ✓
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress Motivational Section */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 text-center">
              <h3 className="text-3xl font-bold text-white mb-6 flex items-center justify-center gap-3">
                <span className="animate-pulse">🌟</span>
                Keep Pushing Forward!
                <span className="animate-pulse" style={{animationDelay: '0.5s'}}>💪</span>
              </h3>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl p-6 border border-blue-400/20">
                  <div className="text-4xl mb-4">🎯</div>
                  <h4 className="text-xl font-bold text-white mb-2">Stay Focused</h4>
                  <p className="text-white/80">Every completed task brings you closer to your goals</p>
                </div>
                
                <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl p-6 border border-green-400/20">
                  <div className="text-4xl mb-4">📈</div>
                  <h4 className="text-xl font-bold text-white mb-2">Track Progress</h4>
                  <p className="text-white/80">Consistency is the key to lasting transformation</p>
                </div>
                
                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-purple-400/20">
                  <div className="text-4xl mb-4">🏆</div>
                  <h4 className="text-xl font-bold text-white mb-2">Earn Rewards</h4>
                  <p className="text-white/80">Celebrate every milestone on your fitness journey</p>
                </div>
              </div>
              
              {/* Progress Summary */}
              <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-purple-400/20">
                <p className="text-white/90 text-lg leading-relaxed">
                  {totalPoints === 0 ? (
                    "🚀 Ready to start your fitness journey? Complete your first task to earn points and unlock achievements!"
                  ) : totalPoints < 100 ? (
                    "🌱 Great start! You're building momentum. Keep going to unlock more achievements!"
                  ) : totalPoints < 500 ? (
                    "🔥 You're on fire! Your consistency is paying off. Keep pushing towards your goals!"
                  ) : totalPoints < 1000 ? (
                    "⭐ Amazing progress! You're becoming a fitness champion. Stay strong!"
                  ) : (
                    "🏆 Incredible! You're a true fitness champion! Your dedication is inspiring!"
                  )}
                </p>
              </div>
            </div>
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