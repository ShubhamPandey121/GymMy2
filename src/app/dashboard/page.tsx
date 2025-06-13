'use client';

import { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

// Type definitions
interface Goal {
  id: number;
  name: string;
  type: GoalType;
  icon: string;
  targetValue: number;
  currentValue: number;
  targetDate: string;
  createdDate: string;
}

type GoalType = 'weight-loss' | 'muscle-gain' | 'endurance' | 'strength' | 'flexibility';

interface NewGoalForm {
  name: string;
  type: string;
  targetValue: string;
  targetDate: string;
}

interface ChartData {
  labels: string[];
  datasets: {
    data: string[];
    backgroundColor: string[];
    borderWidth: number;
  }[];
}

interface ChartOptions {
  responsive: boolean;
  maintainAspectRatio: boolean;
  plugins: {
    legend: {
      position: 'bottom';
      labels: {
        padding: number;
        usePointStyle: boolean;
      };
    };
  };
}

// Sample initial goals data
const initialGoals: Goal[] = [
  {
    id: 1,
    name: "Lose 5kg",
    type: "weight-loss",
    icon: "🏃",
    targetValue: 5,
    currentValue: 2,
    targetDate: "2025-08-01",
    createdDate: "2025-06-01"
  },
  {
    id: 2,
    name: "Run 10km",
    type: "endurance",
    icon: "🚴",
    targetValue: 10,
    currentValue: 6,
    targetDate: "2025-07-15",
    createdDate: "2025-05-15"
  },
  {
    id: 3,
    name: "Bench Press 80kg",
    type: "strength",
    icon: "🏋️",
    targetValue: 80,
    currentValue: 65,
    targetDate: "2025-09-01",
    createdDate: "2025-06-01"
  }
];

const motivationalQuotes: string[] = [
  "The only bad workout is the one that didn't happen. Let's make today count! 💪",
  "Your body can do it. It's your mind you have to convince! 🧠",
  "Success is the sum of small efforts repeated day in and day out! 🌟",
  "Don't limit your challenges, challenge your limits! 🚀",
  "The pain you feel today will be the strength you feel tomorrow! 💪"
];

const goalIcons: Record<GoalType, string> = {
  'weight-loss': '🏃',
  'muscle-gain': '💪',
  'endurance': '🚴',
  'strength': '🏋️',
  'flexibility': '🧘'
};

export default function FitnessDashboard(): JSX.Element {
  const [goals, setGoals] = useState<Goal[]>(initialGoals);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentQuote, setCurrentQuote] = useState<string>(motivationalQuotes[0]);
  const [newGoal, setNewGoal] = useState<NewGoalForm>({
    name: '',
    type: '',
    targetValue: '',
    targetDate: ''
  });

  // Load goals from localStorage on component mount
  useEffect(() => {
    const savedGoals = localStorage.getItem('fitnessGoals');
    if (savedGoals) {
      try {
        const parsedGoals: Goal[] = JSON.parse(savedGoals);
        if (parsedGoals.length > 0) {
          setGoals(parsedGoals);
        }
      } catch (error) {
        console.error('Error loading goals:', error);
      }
    }
  }, []);

  // Save goals to localStorage whenever goals change
  useEffect(() => {
    localStorage.setItem('fitnessGoals', JSON.stringify(goals));
  }, [goals]);

  // Rotate quotes every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
      setCurrentQuote(randomQuote);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleCreateGoal = (): void => {
    if (!newGoal.name || !newGoal.type || !newGoal.targetValue || !newGoal.targetDate) {
      return;
    }

    const goal: Goal = {
      id: Date.now(),
      name: newGoal.name,
      type: newGoal.type as GoalType,
      icon: goalIcons[newGoal.type as GoalType] || '🎯',
      targetValue: parseFloat(newGoal.targetValue),
      currentValue: 0,
      targetDate: newGoal.targetDate,
      createdDate: new Date().toISOString().split('T')[0]
    };

    setGoals(prev => [...prev, goal]);
    setNewGoal({ name: '', type: '', targetValue: '', targetDate: '' });
    setIsModalOpen(false);
  };

  const updateGoalProgress = (goalId: number): void => {
    const goal = goals.find(g => g.id === goalId);
    if (!goal) return;

    const newValue = prompt(`Update progress for "${goal.name}" (current: ${goal.currentValue}/${goal.targetValue}):`);
    if (newValue !== null && !isNaN(Number(newValue))) {
      setGoals(prev => prev.map(g => 
        g.id === goalId 
          ? { ...g, currentValue: Math.min(parseFloat(newValue), g.targetValue) }
          : g
      ));
    }
  };

  // Calculate statistics
  const totalGoals: number = goals.length;
  const completedGoals: number = goals.filter(g => g.currentValue >= g.targetValue).length;
  const avgProgress: number = totalGoals > 0 ? 
    goals.reduce((sum, g) => sum + (g.currentValue / g.targetValue * 100), 0) / totalGoals : 0;
  const streakDays: number = Math.floor(Math.random() * 30) + 1; // Simulated streak

  // Chart data
  const chartData: ChartData = {
    labels: goals.map(goal => goal.name),
    datasets: [{
      data: goals.map(goal => (goal.currentValue / goal.targetValue * 100).toFixed(1)),
      backgroundColor: [
        '#3b82f6',
        '#8b5cf6',
        '#06b6d4',
        '#10b981',
        '#f59e0b',
        '#ef4444'
      ],
      borderWidth: 0
    }]
  };

  const chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 15,
          usePointStyle: true
        }
      }
    }
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
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-2xl text-xl font-semibold hover:scale-105 hover:shadow-xl transition-all duration-300 shadow-lg shadow-blue-500/30"
          >
            ✨ Create New Goal
          </button>
        </section>

        {/* Dashboard Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Goals Section */}
          <section className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/20">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              🎯 My Goals
            </h2>
            <div className="space-y-4">
              {goals.length === 0 ? (
                <p className="text-center text-gray-500 italic">No goals yet. Create your first goal! 🎯</p>
              ) : (
                goals.map(goal => {
                  const progress = Math.min((goal.currentValue / goal.targetValue) * 100, 100);
                  return (
                    <div
                      key={goal.id}
                      onClick={() => updateGoalProgress(goal.id)}
                      className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl p-6 border-l-4 border-blue-500 hover:translate-x-2 hover:shadow-lg hover:shadow-blue-500/15 transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-gray-800">{goal.name}</span>
                        <span className="text-2xl">{goal.icon}</span>
                      </div>
                      <div className="text-sm text-gray-600 mb-4">
                        {goal.currentValue}/{goal.targetValue} - {progress.toFixed(1)}%
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </section>

          {/* Progress Section */}
          <section className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/20">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              📊 Progress Tracking
            </h2>
            <div className="h-80">
              {goals.length > 0 ? (
                <Doughnut data={chartData} options={chartOptions} />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500 italic">
                  Create goals to see your progress chart! 📈
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white/90 rounded-2xl p-6 text-center shadow-lg hover:-translate-y-2 transition-all duration-300">
            <div className="text-3xl font-bold text-blue-500 mb-2">{totalGoals}</div>
            <div className="text-gray-600 font-medium">Total Goals</div>
          </div>
          <div className="bg-white/90 rounded-2xl p-6 text-center shadow-lg hover:-translate-y-2 transition-all duration-300">
            <div className="text-3xl font-bold text-blue-500 mb-2">{completedGoals}</div>
            <div className="text-gray-600 font-medium">Completed</div>
          </div>
          <div className="bg-white/90 rounded-2xl p-6 text-center shadow-lg hover:-translate-y-2 transition-all duration-300">
            <div className="text-3xl font-bold text-blue-500 mb-2">{avgProgress.toFixed(1)}%</div>
            <div className="text-gray-600 font-medium">Avg Progress</div>
          </div>
          <div className="bg-white/90 rounded-2xl p-6 text-center shadow-lg hover:-translate-y-2 transition-all duration-300">
            <div className="text-3xl font-bold text-blue-500 mb-2">{streakDays}</div>
            <div className="text-gray-600 font-medium">Day Streak</div>
          </div>
        </div>
      </main>

      {/* New Goal Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Create New Goal 🎯</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Goal Name</label>
                <input
                  type="text"
                  value={newGoal.name}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Lose 10 kg"
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Goal Type</label>
                <select
                  value={newGoal.type}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                  required
                >
                  <option value="">Select goal type</option>
                  <option value="weight-loss">Weight Loss 🏃</option>
                  <option value="muscle-gain">Muscle Gain 💪</option>
                  <option value="endurance">Endurance 🚴</option>
                  <option value="strength">Strength Training 🏋️</option>
                  <option value="flexibility">Flexibility 🧘</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Target Value</label>
                <input
                  type="number"
                  value={newGoal.targetValue}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, targetValue: e.target.value }))}
                  placeholder="e.g., 10"
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Target Date</label>
                <input
                  type="date"
                  value={newGoal.targetDate}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, targetDate: e.target.value }))}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                  required
                />
              </div>
              <div className="flex gap-4 justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 bg-gray-500 text-white rounded-xl font-semibold hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateGoal}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:scale-105 transition-all duration-300"
                >
                  Create Goal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}