'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CuteRobotIcon } from '@/components/icons/CharacterIcons';
import { FitnessIcon} from '@/components/icons/FitnessIcons';
import { Goal } from '@/types/fitness';

export default function HomePage() {
  const [user, setUser] = useState<any>(null);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [showNewGoalModal, setShowNewGoalModal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    type: 'weight-loss' as Goal['type'],
    targetValue: '',
    unit: 'kg',
    deadline: '',
  });
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    const userData = localStorage.getItem('gymmy_user');
    if (!userData) {
      router.push('/auth');
      return;
    }
    
    setUser(JSON.parse(userData));
    
    // Load existing goals
    const savedGoals = localStorage.getItem('gymmy_goals');
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    }
  }, [router]);

  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    
    const goal: Goal = {
      id: Date.now().toString(),
      title: newGoal.title,
      type: newGoal.type,
      targetValue: parseFloat(newGoal.targetValue),
      currentValue: 0,
      unit: newGoal.unit,
      deadline: new Date(newGoal.deadline),
      createdAt: new Date(),
      isCompleted: false,
      points: getPointsForGoalType(newGoal.type),
    };

    const updatedGoals = [goal, ...goals];
    setGoals(updatedGoals);
    localStorage.setItem('gymmy_goals', JSON.stringify(updatedGoals));
    
    // Reset form
    setNewGoal({
      title: '',
      type: 'weight-loss',
      targetValue: '',
      unit: 'kg',
      deadline: '',
    });
    setShowNewGoalModal(false);
  };

  const getPointsForGoalType = (type: Goal['type']): number => {
    const pointsMap = {
      'weight-loss': 100,
      'muscle-gain': 120,
      'endurance': 90,
      'flexibility': 80,
      'general-fitness': 85,
    };
    return pointsMap[type];
  };

  const getGoalTypeLabel = (type: Goal['type']): string => {
    const labels = {
      'weight-loss': 'Weight Loss',
      'muscle-gain': 'Muscle Gain',
      'endurance': 'Endurance',
      'flexibility': 'Flexibility',
      'general-fitness': 'General Fitness',
    };
    return labels[type];
  };

  const getProgressPercentage = (goal: Goal): number => {
    if (goal.targetValue === 0) return 0;
    return Math.min((goal.currentValue / goal.targetValue) * 100, 100);
  };

  const getDaysRemaining = (deadline: Date): number => {
    const today = new Date();
    const timeDiff = deadline.getTime() - today.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cute-pink via-cute-peach to-cute-lavender flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
      </div>
    );
  }

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
      <header className="relative py-6 px-6 bg-white bg-opacity-10 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <CuteRobotIcon className="w-12 h-12 animate-wiggle" />
            <div>
              <h1 className="text-2xl font-bold text-white font-cute">GymMy</h1>
              <p className="text-white opacity-80">Hey {user.name}! 👋</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{user.totalPoints || 0}</div>
              <div className="text-white opacity-70 text-sm">Points</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">Level {user.level || 1}</div>
              <div className="text-white opacity-70 text-sm">Trainer</div>
            </div>
            <button
              onClick={() => router.push('/auth')}
              className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-full hover:bg-opacity-30 transition-all duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 font-cute">
            Your Fitness Journey
          </h2>
          <p className="text-xl text-white opacity-90 mb-8">
            Ready to crush some goals today? Let's make it happen! 💪
          </p>
        </div>

        {/* New Goal Button */}
        <div className="mb-8">
          <button
            onClick={() => setShowNewGoalModal(true)}
            className="w-full glass-effect p-8 rounded-3xl border-2 border-dashed border-white border-opacity-40 hover:border-opacity-60 hover:bg-white hover:bg-opacity-10 transition-all duration-300 group"
          >
            <div className="text-center">
              <div className="text-6xl mb-4 group-hover:animate-bounce">✨</div>
              <h3 className="text-2xl font-bold text-white mb-2">Create New Goal</h3>
              <p className="text-white opacity-70">Start a new fitness adventure!</p>
            </div>
          </button>
        </div>

        {/* Goals Grid */}
        {goals.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {goals.map((goal) => (
              <div
                key={goal.id}
                className="glass-effect p-6 rounded-3xl hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <FitnessIcon type={goal.type} className="w-16 h-16" />
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">+{goal.points}</div>
                    <div className="text-white opacity-70 text-sm">points</div>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">{goal.title}</h3>
                <p className="text-cute-sky font-medium mb-4">{getGoalTypeLabel(goal.type)}</p>
                
                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-white text-sm mb-2">
                    <span>{goal.currentValue} / {goal.targetValue} {goal.unit}</span>
                    <span>{getProgressPercentage(goal).toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-white bg-opacity-20 rounded-full h-3">
                    <div
                      className="bg-cute-sky h-3 rounded-full transition-all duration-500"
                      style={{ width: `${getProgressPercentage(goal)}%` }}
                    ></div>
                  </div>
                </div>
                
                {/* Deadline */}
                <div className="flex items-center justify-between text-white opacity-70 text-sm">
                  <span>
                    {getDaysRemaining(new Date(goal.deadline)) > 0
                      ? `${getDaysRemaining(new Date(goal.deadline))} days left`
                      : 'Overdue'}
                  </span>
                  <span>{goal.isCompleted ? '✅ Completed' : '🎯 In Progress'}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {goals.length === 0 && (
          <div className="text-center py-16">
            <div className="text-8xl mb-6">🎯</div>
            <h3 className="text-3xl font-bold text-white mb-4">No Goals Yet!</h3>
            <p className="text-xl text-white opacity-80 mb-8">
              Create your first goal to start your amazing fitness journey!
            </p>
          </div>
        )}
      </main>

      {/* New Goal Modal */}
      {showNewGoalModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 z-50">
          <div className="glass-effect p-8 rounded-3xl w-full max-w-md">
            <div className="text-center mb-6">
              <div className="text-4xl mb-2">🎯</div>
              <h3 className="text-2xl font-bold text-white">Create New Goal</h3>
            </div>

            <form onSubmit={handleCreateGoal} className="space-y-4">
              <div>
                <label className="block text-white font-medium mb-2">Goal Title</label>
                <input
                  type="text"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-white border-opacity-20 bg-white bg-opacity-10 text-white placeholder-white placeholder-opacity-60 focus:border-cute-sky focus:outline-none"
                  placeholder="e.g., Lose 10kg in 3 months"
                  required
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Goal Type</label>
                <select
                  value={newGoal.type}
                  onChange={(e) => setNewGoal({ ...newGoal, type: e.target.value as Goal['type'] })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-white border-opacity-20 bg-white bg-opacity-10 text-white focus:border-cute-sky focus:outline-none"
                >
                  <option value="weight-loss">Weight Loss</option>
                  <option value="muscle-gain">Muscle Gain</option>
                  <option value="endurance">Endurance</option>
                  <option value="flexibility">Flexibility</option>
                  <option value="general-fitness">General Fitness</option>
                </select>
              </div>

              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="block text-white font-medium mb-2">Target Value</label>
                  <input
                    type="number"
                    value={newGoal.targetValue}
                    onChange={(e) => setNewGoal({ ...newGoal, targetValue: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-white border-opacity-20 bg-white bg-opacity-10 text-white placeholder-white placeholder-opacity-60 focus:border-cute-sky focus:outline-none"
                    placeholder="10"
                    required
                  />
                </div>
                <div className="w-24">
                  <label className="block text-white font-medium mb-2">Unit</label>
                  <select
                    value={newGoal.unit}
                    onChange={(e) => setNewGoal({ ...newGoal, unit: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-white border-opacity-20 bg-white bg-opacity-10 text-white focus:border-cute-sky focus:outline-none"
                  >
                    <option value="kg">kg</option>
                    <option value="lbs">lbs</option>
                    <option value="mins">mins</option>
                    <option value="reps">reps</option>
                    <option value="days">days</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Deadline</label>
                <input
                  type="date"
                  value={newGoal.deadline}
                  onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-white border-opacity-20 bg-white bg-opacity-10 text-white focus:border-cute-sky focus:outline-none"
                  required
                />
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowNewGoalModal(false)}
                  className="flex-1 px-6 py-3 rounded-xl bg-white bg-opacity-20 text-white hover:bg-opacity-30 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 rounded-xl bg-cute-sky text-white hover:bg-opacity-90 transition-all duration-300 font-medium"
                >
                  Create Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
