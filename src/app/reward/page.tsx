"use client";

import { useState, useEffect } from "react";
import { useGlobalRewards } from "@/hook/globalReward"; // Import your existing hook

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  requirement: string;
}

interface Activity {
  planName: string;
  day: number;
  date: string;
  points: number;
}

interface Milestone {
  points: number;
  title: string;
}

const RewardsPage = (): JSX.Element => {
  const { globalRewards, loadGlobalRewards, calculateGlobalRewards } = useGlobalRewards();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [recentActivities, setRecentActivities] = useState<Activity[]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    setIsVisible(true);
    loadGlobalRewards();
    loadAchievements();
    loadRecentActivities();
    
    const handleStorageChange = (): void => {
      loadGlobalRewards();
      loadAchievements();
      loadRecentActivities();
    };

    window.addEventListener('storage', handleStorageChange);
    const interval = setInterval(() => {
      loadGlobalRewards();
      loadAchievements();
    }, 5000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const loadAchievements = (): void => {
    const achievementsList: Achievement[] = [
      {
        id: 1,
        title: "First Steps",
        description: "Complete your first workout day",
        icon: "👟",
        unlocked: globalRewards.totalCompletedDays >= 1,
        requirement: "1 day completed"
      },
      {
        id: 2,
        title: "Week Warrior",
        description: "Complete 7 workout days",
        icon: "💪",
        unlocked: globalRewards.totalCompletedDays >= 7,
        requirement: "7 days completed"
      },
      {
        id: 3,
        title: "Point Collector",
        description: "Earn your first 100 points",
        icon: "⭐",
        unlocked: globalRewards.totalPoints >= 100,
        requirement: "100 points earned"
      },
      {
        id: 4,
        title: "Consistency King",
        description: "Complete 30 workout days",
        icon: "👑",
        unlocked: globalRewards.totalCompletedDays >= 30,
        requirement: "30 days completed"
      },
      {
        id: 5,
        title: "Multi-Tasker",
        description: "Have 3 active fitness plans",
        icon: "🎯",
        unlocked: globalRewards.totalActivePlans >= 3,
        requirement: "3 active plans"
      },
      {
        id: 6,
        title: "Point Master",
        description: "Earn 1000 points",
        icon: "💎",
        unlocked: globalRewards.totalPoints >= 1000,
        requirement: "1000 points earned"
      }
    ];
    setAchievements(achievementsList);
  };

  const loadRecentActivities = (): void => {
    try {
      const fitnessPlanList = JSON.parse(localStorage.getItem('fitnessPlanList') || '[]');
      const activities: Activity[] = [];
      
      fitnessPlanList.forEach((plan: any) => {
        const planProgress = localStorage.getItem(`fitnessProgress_${plan.id}`);
        if (planProgress) {
          const progress = JSON.parse(planProgress);
          if (progress.completedDays && progress.completedDays.length > 0) {
            const recentDays: Activity[] = progress.completedDays
              .slice(-3)
              .map((day: number) => ({
                planName: plan.name,
                day: day,
                date: new Date().toLocaleDateString(),
                points: 20 // Assuming 20 points per completed day
              }));
            activities.push(...recentDays);
          }
        }
      });
      
      setRecentActivities(activities.slice(0, 5));
    } catch (error) {
      console.error('Error loading recent activities:', error);
    }
  };

  const getNextMilestone = (): Milestone | undefined => {
    const milestones: Milestone[] = [
      { points: 100, title: "Point Collector" },
      { points: 250, title: "Rising Star" },
      { points: 500, title: "Fitness Enthusiast" },
      { points: 1000, title: "Point Master" },
      { points: 2000, title: "Fitness Legend" }
    ];

    return milestones.find(milestone => milestone.points > globalRewards.totalPoints);
  };

  const nextMilestone = getNextMilestone();
  const progressPercentage = nextMilestone 
    ? (globalRewards.totalPoints / nextMilestone.points) * 100 
    : 100;

  const handleRefreshRewards = (): void => {
    calculateGlobalRewards();
    loadAchievements();
    loadRecentActivities();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.05]">
        <div className="absolute top-[10%] left-[5%] text-[140px] text-blue-500 " style={{ animationDelay: '0s', animationDuration: '6s' }}>🏆</div>
        <div className="absolute top-[60%] right-[8%] text-[140px] text-purple-500 animate-pulse" style={{ animationDelay: '2s', animationDuration: '6s' }}>⭐</div>
        <div className="absolute bottom-[20%] left-[15%] text-[140px] text-blue-500 " style={{ animationDelay: '4s', animationDuration: '6s' }}>💎</div>
        <div className="absolute top-[30%] right-[25%] text-[140px] text-indigo-500 animate-pulse" style={{ animationDelay: '1s', animationDuration: '6s' }}>👑</div>
        <div className="absolute bottom-[40%] right-[40%] text-[140px] text-sky-500 " style={{ animationDelay: '3s', animationDuration: '6s' }}>🎯</div>
      </div>

      {/* Floating Bubbles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-16 h-16 bg-blue-200 rounded-full opacity-20 " style={{ animationDelay: '0s', animationDuration: '4s' }}></div>
        <div className="absolute top-40 right-20 w-12 h-12 bg-purple-200 rounded-full opacity-30 animate-pulse" style={{ animationDelay: '1s', animationDuration: '5s' }}></div>
        <div className="absolute bottom-40 left-20 w-20 h-20 bg-indigo-200 rounded-full opacity-15 " style={{ animationDelay: '2s', animationDuration: '6s' }}></div>
        <div className="absolute bottom-20 right-10 w-14 h-14 bg-sky-200 rounded-full opacity-25 animate-pulse" style={{ animationDelay: '3s', animationDuration: '4s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-18 h-18 bg-blue-300 rounded-full opacity-10 " style={{ animationDelay: '1.5s', animationDuration: '5s' }}></div>
      </div>

      {/* Main Content */}
      <main className="relative z-10">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Header */}
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gray-800 to-blue-500 bg-clip-text text-transparent mb-6" style={{ fontFamily: 'Comic Neue, cursive' }}>
                Your Amazing
                <br />
                <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Rewards! 🏆</span>
              </h1>
              <div className="text-xl md:text-2xl text-gray-600 italic mb-8 p-6 bg-white/70 rounded-3xl backdrop-blur-lg mx-auto max-w-4xl leading-relaxed shadow-lg">
                Track your incredible fitness journey achievements and celebrate every milestone! ✨
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white p-8 rounded-3xl shadow-xl hover:scale-105 hover:-translate-y-2 transition-all duration-300 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold opacity-90 mb-2">Total Points</h3>
                    <p className="text-4xl font-black">{globalRewards.totalPoints}</p>
                  </div>
                  <span className="text-6xl animate-pulse">🏆</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-400 to-blue-500 text-white p-8 rounded-3xl shadow-xl hover:scale-105 hover:-translate-y-2 transition-all duration-300 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold opacity-90 mb-2">Days Completed</h3>
                    <p className="text-4xl font-black">{globalRewards.totalCompletedDays}</p>
                  </div>
                  <span className="text-6xl ">📅</span>
                </div>
               </div>

              <div className="bg-gradient-to-br from-purple-400 to-pink-500 text-white p-8 rounded-3xl shadow-xl hover:scale-105 hover:-translate-y-2 transition-all duration-300 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold opacity-90 mb-2">Active Plans</h3>
                    <p className="text-4xl font-black">{globalRewards.totalActivePlans}</p>
                  </div>
                  <span className="text-6xl animate-pulse">📋</span>
                </div>
              </div>
            </div>

            {/* Progress to Next Milestone */}
            {nextMilestone && (
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-8 mb-12 border border-white/20 hover:scale-[1.02] transition-all duration-300">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6 text-center">
                  🎯 Next Milestone
                </h2>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg text-gray-700 font-semibold">Progress to {nextMilestone.title}</span>
                  <span className="text-lg font-bold text-gray-800 bg-gray-100 px-4 py-2 rounded-full">
                    {globalRewards.totalPoints} / {nextMilestone.points} points
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 mb-3 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-4 rounded-full transition-all duration-1000 shadow-lg"
                    style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                  ></div>
                </div>
                <p className="text-center text-gray-600 font-semibold">
                  🔥 Only {nextMilestone.points - globalRewards.totalPoints} points to go! Keep it up! 🚀
                </p>
              </div>
            )}

            {/* Achievements */}
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-8 mb-12 border border-white/20">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8 text-center">
                🏅 Your Achievements
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 hover:-translate-y-1 ${
                      achievement.unlocked
                        ? 'border-green-300 bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg shadow-green-200/50'
                        : 'border-gray-200 bg-gradient-to-br from-gray-50 to-slate-50 shadow-md'
                    }`}
                  >
                    <div className="text-center">
                      <div className={`text-5xl mb-4 transition-all duration-300 ${achievement.unlocked ? '' : 'grayscale opacity-50'}`}>
                        {achievement.icon}
                      </div>
                      <h3 className={`text-xl font-bold mb-2 ${
                        achievement.unlocked ? 'text-green-800' : 'text-gray-500'
                      }`}>
                        {achievement.title}
                      </h3>
                      <p className={`text-sm mb-4 leading-relaxed ${
                        achievement.unlocked ? 'text-green-600' : 'text-gray-400'
                      }`}>
                        {achievement.description}
                      </p>
                      <span className={`text-sm px-4 py-2 rounded-full font-semibold ${
                        achievement.unlocked 
                          ? 'bg-green-200 text-green-800 shadow-md' 
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {achievement.unlocked ? '✅ Unlocked!' : `📋 ${achievement.requirement}`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>


            <div className="text-center">
              <button
                onClick={handleRefreshRewards}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-10 py-4 rounded-2xl text-xl font-bold hover:scale-105 hover:shadow-xl transition-all duration-300 shadow-lg shadow-blue-500/30"
              >
                🔄 Refresh Rewards ✨
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Add default export
export default RewardsPage;