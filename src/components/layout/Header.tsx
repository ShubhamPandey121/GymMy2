'use client';

import { useState, useEffect } from 'react';
import { useUser, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CuteRobotIcon } from '@/components/icons/CharacterIcons';
import { Menu, X } from 'lucide-react';
import { useGlobalRewards } from '@/hook/globalReward'

export const RewardsHeader = () => {
  const { globalRewards, loadGlobalRewards } = useGlobalRewards();

  useEffect(() => {
    // Load rewards once on mount
    loadGlobalRewards();
    
    // Listen for storage changes to update rewards in real-time
    const handleStorageChange = () => {
      loadGlobalRewards();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also check for updates every 5 seconds if user is active
    const interval = setInterval(loadGlobalRewards, 5000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []); // Empty dependency array

  return (
    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-lg shadow-lg">
      <div className="flex items-center gap-4 text-sm font-semibold">
        <div className="flex items-center gap-1">
          <span>🏆</span>
          <span>{globalRewards.totalPoints} pts</span>
        </div>
        
      </div>
    </div>
  );
};


const Header = () => {
  const { isSignedIn, user } = useUser();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Don't show header on auth pages
  if (pathname === '/sign-in' || pathname === '/sign-up') {
    return null;
  }

  const isHomePage = pathname === '/';

  const navigationItems = isSignedIn 
  ? [
      { name: 'Home', href: '/' },
      { name: 'Dashboard', href: '/dashboard' },
      { name: 'Why Us', href: '/why-us' },
      { name: 'Fitness Meals', href: '/fitness-meal' },
      { name: 'Reward', href: '/reward' },
    ]
    : [
      { name: 'Home', href: '/' },
        { name: 'Why Us', href: '/why-us' },
        { name: 'Fitness Meals', href: '/fitness-meal' },
        { name: 'Contact', href: '#contact' },
      ];

  return (
    <header className="relative py-6 px-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 shadow-lg border-b border-white/20">
      {/* Subtle decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-4 left-1/4 w-8 h-8 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-8 right-1/3 w-6 h-6 bg-purple-200 rounded-full opacity-15 animate-bounce"></div>
        <div className="absolute bottom-4 left-1/2 w-10 h-10 bg-indigo-200 rounded-full opacity-10 animate-pulse"></div>
      </div>

      <div className="max-w-7xl mx-auto flex items-center justify-between relative z-10">
        {/* Logo */}
        <Link href={isSignedIn ? '/dashboard' : '/'} className="flex items-center space-x-3 hover:scale-105 transition-all duration-300">
          <CuteRobotIcon className="w-12 h-12 animate-wiggle" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent font-cute">GymMy</h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-slate-700 hover:text-blue-600 transition-colors duration-300 font-semibold relative ${
                pathname === item.href ? 'text-blue-600' : ''
              }`}
            >
              {item.name}
              {pathname === item.href && (
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              )}
            </Link>
          ))}
        </nav>

        {/* Desktop Auth Section */}
        <div className="hidden md:flex items-center space-x-4">
          {isSignedIn && (
            <RewardsHeader />
          )}
          {isSignedIn ? (
            <div className="flex items-center space-x-4">
              <span className="text-slate-700 font-semibold">
                Hey, {user?.firstName || 'Fitness Star'}! 👋
              </span>
              <div className="scale-110">
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: "w-10 h-10 border-2 border-blue-200",
                      userButtonPopoverCard: "bg-white shadow-2xl border-2 border-blue-100",
                      userButtonPopoverActionButton: "hover:bg-blue-50",
                    }
                  }}
                  afterSignOutUrl="/"
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                href="/sign-in"
                className="text-slate-700 hover:text-blue-600 transition-colors duration-300 font-semibold"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-slate-700 p-2 hover:bg-blue-50 rounded-lg transition-all duration-300"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg shadow-2xl z-50 border-t border-blue-100">
          <div className="px-6 py-4 space-y-4">
            {/* Mobile Rewards Header */}
            {isSignedIn && (
              <div className="pb-4 border-b border-blue-100">
                <RewardsHeader />
              </div>
            )}

            {/* Mobile Navigation */}
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block text-slate-700 hover:text-blue-600 transition-colors duration-300 font-semibold py-2 ${
                  pathname === item.href ? 'text-blue-600 border-l-4 border-blue-500 pl-4' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* Mobile Auth Section */}
            <div className="border-t border-blue-100 pt-4">
              {isSignedIn ? (
                <div className="flex items-center justify-between">
                  <span className="text-slate-700 font-semibold">
                    Hey, {user?.firstName || 'Fitness Star'}! 👋
                  </span>
                  <UserButton 
                    appearance={{
                      elements: {
                        avatarBox: "w-10 h-10 border-2 border-blue-200",
                        userButtonPopoverCard: "bg-white shadow-2xl border-2 border-blue-100",
                        userButtonPopoverActionButton: "hover:bg-blue-50",
                      }
                    }}
                    afterSignOutUrl="/"
                  />
                </div>
              ) : (
                <div className="space-y-3">
                  <Link
                    href="/sign-in"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-slate-700 hover:text-blue-600 transition-colors duration-300 font-semibold py-2"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/sign-up"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 text-center"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;