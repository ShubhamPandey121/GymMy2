'use client';

import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CuteRobotIcon } from '@/components/icons/CharacterIcons';
import { Heart, Mail, Github, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  const { isSignedIn } = useUser();
  const pathname = usePathname();

  // Don't show footer on auth pages
  if (pathname === '/sign-in' || pathname === '/sign-up') {
    return null;
  }

  const isHomePage = pathname === '/';

  const quickLinks = isSignedIn 
    ? [
        { name: 'Dashboard', href: '/dashboard' },
        { name: 'My Workouts', href: '/workouts' },
        { name: 'Nutrition Plans', href: '/nutrition' },
        { name: 'Progress Tracker', href: '/progress' },
      ]
    : [
        { name: 'Features', href: '#features' },
        { name: 'Pricing', href: '#pricing' },
        { name: 'About Us', href: '#about' },
        { name: 'Contact', href: '#contact' },
      ];

  const supportLinks = [
    { name: 'Help Center', href: '/help' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'FAQ', href: '/faq' },
  ];

  const socialLinks = [
    { name: 'GitHub', href: '#', icon: Github },
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'Instagram', href: '#', icon: Instagram },
    { name: 'Email', href: 'mailto:hello@gymmy.com', icon: Mail },
  ];

  return (
    <footer className="relative mt-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 border-t border-slate-200">
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-12 h-12 bg-blue-200 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute top-20 right-20 w-8 h-8 bg-indigo-200 rounded-full opacity-15 animate-bounce"></div>
        <div className="absolute bottom-10 left-1/4 w-10 h-10 bg-purple-200 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute top-1/2 right-1/3 w-6 h-6 bg-sky-200 rounded-full opacity-20 animate-bounce"></div>
      </div>

      <div className="relative px-6 py-16">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <CuteRobotIcon className="w-12 h-12 animate-wiggle" />
                <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent font-cute">GymMy</h3>
              </div>
              <p className="text-slate-600 text-lg leading-relaxed mb-6 max-w-md">
                Your adorable AI fitness companion! 🤖💪 Transform your health journey with personalized workouts, 
                nutrition guidance, and gamified achievements. Let's make fitness fun together!
              </p>
              <div className="flex items-center space-x-2 text-slate-600">
                <Heart className="w-5 h-5 text-red-400 animate-pulse" />
                <span className="font-semibold">Join 10,000+ happy users worldwide!</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xl font-bold text-slate-700 mb-6 font-cute">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-slate-600 hover:text-blue-600 transition-all duration-300 font-medium flex items-center group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {link.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-xl font-bold text-slate-700 mb-6 font-cute">Support</h4>
              <ul className="space-y-3">
                {supportLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-slate-600 hover:text-blue-600 transition-all duration-300 font-medium flex items-center group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {link.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Social Links */}
          <div className="border-t border-slate-200 pt-8 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-center md:text-left">
                <h4 className="text-xl font-bold text-slate-700 mb-4 font-cute">Stay Connected! 🌟</h4>
                <p className="text-slate-600">Follow us for fitness tips, cute updates, and community love!</p>
              </div>
              <div className="flex items-center space-x-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <Link
                      key={social.name}
                      href={social.href}
                      className="bg-white bg-opacity-80 backdrop-blur-sm p-3 rounded-full text-slate-600 hover:text-blue-600 hover:bg-blue-50 hover:scale-110 transition-all duration-300 group shadow-sm border border-slate-200"
                      aria-label={social.name}
                    >
                      <Icon className="w-5 h-5 group-hover:animate-bounce" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="text-center border-t border-slate-200 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-slate-500 text-sm">
                © 2024 GymMy - Your Cute AI Fitness Companion. All rights reserved.
              </p>
              <div className="flex items-center space-x-2">
                <span className="text-slate-500 text-sm">Made with</span>
                <Heart className="w-4 h-4 text-red-400 animate-pulse" />
                <span className="text-slate-500 text-sm">by Shubham</span>
              </div>
            </div>
            
            {/* Fun Stats for Signed In Users */}
            {isSignedIn && (
              <div className="mt-6 bg-white/60 backdrop-blur-sm rounded-2xl p-4 max-w-2xl mx-auto border border-slate-200 shadow-sm">
                <p className="text-slate-700 font-semibold mb-2">🎉 You're part of our amazing fitness family!</p>
                <div className="flex justify-center space-x-8 text-sm text-slate-600">
                  <span>💪 Workouts Completed Today</span>
                  <span>🔥 Calories Burned</span>
                  <span>⭐ Achievement Points</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;