'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Dumbbell, 
  Apple, 
  TrendingUp, 
  Users, 
  Settings,
  Menu,
  X,
  Trophy,
  Calendar,
  Target
} from 'lucide-react';

const Navigation = () => {
  const { isSignedIn, user } = useUser();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't show navigation on auth pages or home page if not signed in
  if (!mounted || pathname === '/sign-in' || pathname === '/sign-up' || (!isSignedIn && pathname === '/')) {
    return null;
  }

  // Only show navigation for signed-in users
  if (!isSignedIn) {
    return null;
  }

  const navigationItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: Home,
      description: 'Your fitness overview'
    },
    {
      name: 'Workouts',
      href: '/workouts',
      icon: Dumbbell,
      description: 'Exercise routines & plans'
    },
    {
      name: 'Nutrition',
      href: '/nutrition',
      icon: Apple,
      description: 'Meal plans & tracking'
    },
    {
      name: 'Progress',
      href: '/progress',
      icon: TrendingUp,
      description: 'Stats & achievements'
    },
    {
      name: 'Community',
      href: '/community',
      icon: Users,
      description: 'Connect with others'
    },
    {
      name: 'Goals',
      href: '/goals',
      icon: Target,
      description: 'Set & track goals'
    },
    {
      name: 'Schedule',
      href: '/schedule',
      icon: Calendar,
      description: 'Plan your workouts'
    },
    {
      name: 'Achievements',
      href: '/achievements',
      icon: Trophy,
      description: 'Your fitness milestones'
    },
  ];

  const bottomNavItems = [
    {
      name: 'Settings',
      href: '/settings',
      icon: Settings,
      description: 'App preferences'
    }
  ];

  return (
    <>
      {/* Mobile Navigation Toggle */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 md:hidden bg-cute-pink text-white p-3 rounded-full shadow-lg hover:scale-110 transition-all duration-300"
      >
        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <nav className={`
        fixed left-0 top-0 h-full w-80 bg-gradient-to-b from-cute-pink via-cute-peach to-cute-lavender
        shadow-2xl z-45 transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
      `}>
        {/* Header */}
        <div className="p-6 border-b border-white border-opacity-20">
          <Link href="/dashboard" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300">
              <Dumbbell className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white font-cute">GymMy</h2>
              <p className="text-sm text-white opacity-80">Your AI Trainer</p>
            </div>
          </Link>
        </div>

        {/* User Info */}
        <div className="p-6 border-b border-white border-opacity-20">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">
                {user?.firstName?.charAt(0) || user?.emailAddresses[0]?.emailAddress?.charAt(0) || '👤'}
              </span>
            </div>
            <div>
              <p className="text-white font-semibold">
                {user?.firstName || 'Fitness Star'}
              </p>
              <p className="text-sm text-white opacity-70">
                Level 5 • 🔥 Streak: 7 days
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 px-4 py-6 overflow-y-auto">
          <div className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group relative
                    ${isActive 
                      ? 'bg-white bg-opacity-20 text-white shadow-lg scale-105' 
                      : 'text-white opacity-80 hover:bg-white hover:bg-opacity-10 hover:opacity-100'
                    }
                  `}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'animate-bounce' : 'group-hover:scale-110'} transition-all duration-300`} />
                  <div className="flex-1">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-xs opacity-70">{item.description}</p>
                  </div>
                  {isActive && (
                    <div className="absolute right-2 w-2 h-2 bg-cute-sky rounded-full animate-pulse" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="p-4 border-t border-white border-opacity-20">
          {bottomNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className={`
                  flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group
                  ${isActive 
                    ? 'bg-white bg-opacity-20 text-white shadow-lg' 
                    : 'text-white opacity-80 hover:bg-white hover:bg-opacity-10 hover:opacity-100'
                  }
                `}
              >
                <Icon className={`w-5 h-5 ${isActive ? '' : 'group-hover:scale-110'} transition-all duration-300`} />
                <div className="flex-1">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-xs opacity-70">{item.description}</p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Fun Stats Card */}
        <div className="p-4">
          <div className="bg-white bg-opacity-10 rounded-xl p-4 backdrop-blur-sm">
            <h3 className="text-white font-semibold mb-2 text-center">Today's Progress 🎯</h3>
            <div className="grid grid-cols-2 gap-2 text-center">
              <div>
                <p className="text-2xl font-bold text-white">0</p>
                <p className="text-xs text-white opacity-70">Workouts</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">0</p>
                <p className="text-xs text-white opacity-70">Calories</p>
              </div>
            </div>
            <div className="mt-3 bg-white bg-opacity-20 rounded-full h-2">
              <div className="bg-cute-sky h-2 rounded-full w-0 transition-all duration-500"></div>
            </div>
            <p className="text-xs text-white opacity-70 text-center mt-1">Daily Goal: 0%</p>
          </div>
        </div>
      </nav>

      {/* Main Content Margin for Desktop */}
      <div className="hidden md:block w-80 flex-shrink-0" />
    </>
  );
};

export default Navigation;