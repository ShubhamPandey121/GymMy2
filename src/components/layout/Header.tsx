'use client';

import { useState } from 'react';
import { useUser, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CuteRobotIcon } from '@/components/icons/CharacterIcons';
import { Menu, X } from 'lucide-react';

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
        { name: 'Dashboard', href: '/dashboard' },
        { name: 'Workouts', href: '/workouts' },
        { name: 'Nutrition', href: '/nutrition' },
        { name: 'Progress', href: '/progress' },
        { name: 'Community', href: '/community' },
      ]
    : [
        { name: 'Features', href: '#features' },
        { name: 'About', href: '#about' },
        { name: 'Contact', href: '#contact' },
      ];

  return (
    <header className="relative py-6 px-6 bg-gradient-to-br from-cute-pink via-cute-peach to-cute-lavender shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href={isSignedIn ? '/dashboard' : '/'} className="flex items-center space-x-3 hover:scale-105 transition-all duration-300">
          <CuteRobotIcon className="w-12 h-12 animate-wiggle" />
          <h1 className="text-3xl font-bold text-white font-cute">GymMy</h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-white hover:text-cute-sky transition-colors duration-300 font-semibold ${
                pathname === item.href ? 'text-cute-sky border-b-2 border-cute-sky pb-1' : ''
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Auth Section */}
        <div className="hidden md:flex items-center space-x-4">
          {isSignedIn ? (
            <div className="flex items-center space-x-4">
              <span className="text-white font-semibold">
                Hey, {user?.firstName || 'Fitness Star'}! 👋
              </span>
              <div className="scale-110">
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: "w-10 h-10",
                      userButtonPopoverCard: "bg-white shadow-2xl border-2 border-cute-pink",
                      userButtonPopoverActionButton: "hover:bg-cute-pink hover:bg-opacity-10",
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
                className="text-white hover:text-cute-sky transition-colors duration-300 font-semibold"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="bg-white text-cute-pink px-6 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-white p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-all duration-300"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white bg-opacity-95 backdrop-blur-lg shadow-2xl z-50">
          <div className="px-6 py-4 space-y-4">
            {/* Mobile Navigation */}
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block text-cute-pink hover:text-cute-sky transition-colors duration-300 font-semibold py-2 ${
                  pathname === item.href ? 'text-cute-sky border-l-4 border-cute-sky pl-4' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* Mobile Auth Section */}
            <div className="border-t border-cute-pink border-opacity-20 pt-4">
              {isSignedIn ? (
                <div className="flex items-center justify-between">
                  <span className="text-cute-pink font-semibold">
                    Hey, {user?.firstName || 'Fitness Star'}! 👋
                  </span>
                  <UserButton 
                    appearance={{
                      elements: {
                        avatarBox: "w-10 h-10",
                        userButtonPopoverCard: "bg-white shadow-2xl border-2 border-cute-pink",
                        userButtonPopoverActionButton: "hover:bg-cute-pink hover:bg-opacity-10",
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
                    className="block text-cute-pink hover:text-cute-sky transition-colors duration-300 font-semibold py-2"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/sign-up"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block bg-cute-pink text-white px-6 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all duration-300 text-center"
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