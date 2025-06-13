'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CuteRobotIcon } from '@/components/icons/CharacterIcons';

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock authentication - in real app, this would be actual auth
    localStorage.setItem('gymmy_user', JSON.stringify({
      id: '1',
      name: formData.name || 'User',
      email: formData.email,
      totalPoints: 0,
      level: 1,
      joinedAt: new Date().toISOString()
    }));

    setIsLoading(false);
    router.push('/home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cute-pink via-cute-peach to-cute-lavender flex items-center justify-center p-6">
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-16 h-16 bg-cute-mint rounded-full opacity-20 animate-bounce-soft"></div>
        <div className="absolute top-40 right-20 w-12 h-12 bg-cute-sky rounded-full opacity-30 animate-pulse-slow"></div>
        <div className="absolute bottom-40 left-20 w-20 h-20 bg-white rounded-full opacity-15 animate-bounce-soft"></div>
        <div className="absolute bottom-20 right-10 w-14 h-14 bg-cute-lavender rounded-full opacity-25 animate-pulse-slow"></div>
      </div>

      <div className="relative w-full max-w-md">
        <div className="glass-effect p-8 rounded-3xl shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <CuteRobotIcon className="w-20 h-20 animate-bounce-soft" />
            </div>
            <h1 className="text-3xl font-bold text-white font-cute">
              {isLogin ? 'Welcome Back!' : 'Join GymMy!'}
            </h1>
            <p className="text-white opacity-80 mt-2">
              {isLogin ? 'Ready to continue your fitness journey?' : 'Start your cute fitness adventure!'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-white font-medium mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-white border-opacity-20 bg-white bg-opacity-10 text-white placeholder-white placeholder-opacity-60 focus:border-cute-sky focus:outline-none transition-all duration-300"
                  placeholder="Your cute name"
                  required={!isLogin}
                />
              </div>
            )}

            <div>
              <label className="block text-white font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-white border-opacity-20 bg-white bg-opacity-10 text-white placeholder-white placeholder-opacity-60 focus:border-cute-sky focus:outline-none transition-all duration-300"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-white border-opacity-20 bg-white bg-opacity-10 text-white placeholder-white placeholder-opacity-60 focus:border-cute-sky focus:outline-none transition-all duration-300"
                placeholder="••••••••"
                required
              />
            </div>

            {!isLogin && (
              <div>
                <label className="block text-white font-medium mb-2">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-white border-opacity-20 bg-white bg-opacity-10 text-white placeholder-white placeholder-opacity-60 focus:border-cute-sky focus:outline-none transition-all duration-300"
                  placeholder="••••••••"
                  required={!isLogin}
                />
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white text-cute-pink py-4 rounded-xl font-bold text-lg hover:bg-opacity-90 transition-all duration-300 hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-cute-pink mr-2"></div>
                  Processing...
                </div>
              ) : (
                isLogin ? 'Login 🚀' : 'Sign Up 🎉'
              )}
            </button>
          </form>

          {/* Toggle Form */}
          <div className="text-center mt-6">
            <p className="text-white opacity-80">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-cute-sky font-semibold hover:underline transition-all duration-300"
              >
                {isLogin ? 'Sign Up' : 'Login'}
              </button>
            </p>
          </div>

          {/* Social Login (Optional) */}
          <div className="mt-8 pt-6 border-t border-white border-opacity-20">
            <p className="text-center text-white opacity-60 text-sm mb-4">Or continue with</p>
            <div className="flex space-x-4">
              <button className="flex-1 bg-white bg-opacity-10 text-white py-3 rounded-xl font-medium hover:bg-opacity-20 transition-all duration-300">
                Google
              </button>
              <button className="flex-1 bg-white bg-opacity-10 text-white py-3 rounded-xl font-medium hover:bg-opacity-20 transition-all duration-300">
                Apple
              </button>
            </div>
          </div>
        </div>

        {/* Back to Landing */}
        <div className="text-center mt-6">
          <button
            onClick={() => router.push('/')}
            className="text-white opacity-70 hover:opacity-100 transition-all duration-300"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}