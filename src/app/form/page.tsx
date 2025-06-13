'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { generateFitnessPlans, UserData } from '@/lib/gemini';

interface FormData {
  age: string;
  height: string;
  weight: string;
  fitnessGoal: string;
  healthCondition: string;
  targetDays: string;
  currentFitnessLevel: string;
  dietaryRestrictions: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function FitnessGoalsForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    age: '',
    height: '',
    weight: '',
    fitnessGoal: '',
    healthCondition: '',
    targetDays: '',
    currentFitnessLevel: '',
    dietaryRestrictions: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.age || parseInt(formData.age) < 13 || parseInt(formData.age) > 100) {
      newErrors.age = 'Please enter a valid age between 13-100';
    }
    if (!formData.height || parseInt(formData.height) < 100 || parseInt(formData.height) > 250) {
      newErrors.height = 'Please enter height in cm (100-250)';
    }
    if (!formData.weight || parseInt(formData.weight) < 30 || parseInt(formData.weight) > 300) {
      newErrors.weight = 'Please enter weight in kg (30-300)';
    }
    if (!formData.fitnessGoal) {
      newErrors.fitnessGoal = 'Please select your fitness goal';
    }
    if (!formData.targetDays) {
      newErrors.targetDays = 'Please select your target timeframe';
    }
    if (!formData.currentFitnessLevel) {
      newErrors.currentFitnessLevel = 'Please select your current fitness level';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      
      try {
        // Generate fitness plans using Gemini AI
        const fitnessPlans = await generateFitnessPlans(formData as UserData);
        
        // Store the plans in localStorage for the results page
        localStorage.setItem('fitnessPlans', JSON.stringify(fitnessPlans));
        localStorage.setItem('userData', JSON.stringify(formData));
        
        // Navigate to results page
        router.push('/fitness-plan');
        
      } catch (error) {
        console.error('Error generating fitness plans:', error);
        alert('Sorry, there was an error generating your plans. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cute-pink via-cute-peach to-cute-lavender overflow-hidden">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-3xl p-8 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cute-pink mx-auto mb-4"></div>
            <h3 className="text-2xl font-bold text-cute-pink mb-2">Creating Your Plan ✨</h3>
            <p className="text-gray-600">Our AI is crafting the perfect fitness plan just for you...</p>
          </div>
        </div>
      )}

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-16 h-16 bg-cute-mint rounded-full opacity-20 animate-bounce-soft"></div>
        <div className="absolute top-40 right-20 w-12 h-12 bg-cute-sky rounded-full opacity-30 animate-pulse-slow"></div>
        <div className="absolute bottom-40 left-20 w-20 h-20 bg-white rounded-full opacity-15 animate-bounce-soft"></div>
        <div className="absolute bottom-20 right-10 w-14 h-14 bg-cute-lavender rounded-full opacity-25 animate-pulse-slow"></div>
      </div>

      <main className="relative">
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 font-cute">
              Tell Us About
              <br />
              <span className="text-cute-sky">Yourself! 🌟</span>
            </h1>
            <p className="text-xl text-white opacity-90 max-w-2xl mx-auto">
              Help us create the perfect fitness plan tailored just for you
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="glass-effect p-8 md:p-12 rounded-3xl">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Age */}
              <div className="space-y-2">
                <label className="text-white font-semibold text-lg flex items-center gap-2">
                  🎂 Age
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="w-full p-4 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cute-sky focus:border-transparent transition-all duration-300"
                  placeholder="Enter your age"
                  min="13"
                  max="100"
                  disabled={isLoading}
                />
                {errors.age && <p className="text-red-300 text-sm">{errors.age}</p>}
              </div>

              {/* Height */}
              <div className="space-y-2">
                <label className="text-white font-semibold text-lg flex items-center gap-2">
                  📏 Height (cm)
                </label>
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleInputChange}
                  className="w-full p-4 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cute-sky focus:border-transparent transition-all duration-300"
                  placeholder="Enter height in cm"
                  min="100"
                  max="250"
                  disabled={isLoading}
                />
                {errors.height && <p className="text-red-300 text-sm">{errors.height}</p>}
              </div>

              {/* Weight */}
              <div className="space-y-2">
                <label className="text-white font-semibold text-lg flex items-center gap-2">
                  ⚖️ Weight (kg)
                </label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  className="w-full p-4 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cute-sky focus:border-transparent transition-all duration-300"
                  placeholder="Enter weight in kg"
                  min="30"
                  max="300"
                  disabled={isLoading}
                />
                {errors.weight && <p className="text-red-300 text-sm">{errors.weight}</p>}
              </div>

              {/* Fitness Goal */}
              <div className="space-y-2">
                <label className="text-white font-semibold text-lg flex items-center gap-2">
                  🎯 Fitness Goal
                </label>
                <select
                  name="fitnessGoal"
                  value={formData.fitnessGoal}
                  onChange={handleInputChange}
                  className="w-full p-4 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-cute-sky focus:border-transparent transition-all duration-300"
                  disabled={isLoading}
                >
                  <option value="" className="text-gray-800">Select your goal</option>
                  <option value="weight-loss" className="text-gray-800">Weight Loss</option>
                  <option value="muscle-gain" className="text-gray-800">Muscle Gain</option>
                  <option value="general-fitness" className="text-gray-800">General Fitness</option>
                  <option value="strength-training" className="text-gray-800">Strength Training</option>
                  <option value="endurance" className="text-gray-800">Endurance</option>
                  <option value="flexibility" className="text-gray-800">Flexibility</option>
                </select>
                {errors.fitnessGoal && <p className="text-red-300 text-sm">{errors.fitnessGoal}</p>}
              </div>

              {/* Target Days */}
              <div className="space-y-2">
                <label className="text-white font-semibold text-lg flex items-center gap-2">
                  📅 Target Timeframe
                </label>
                <select
                  name="targetDays"
                  value={formData.targetDays}
                  onChange={handleInputChange}
                  className="w-full p-4 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-cute-sky focus:border-transparent transition-all duration-300"
                  disabled={isLoading}
                >
                  <option value="" className="text-gray-800">Select timeframe</option>
                  <option value="5" className="text-gray-800">5 Days</option>
                  <option value="10" className="text-gray-800">10 Days</option>
                  <option value="15" className="text-gray-800">15 Days</option>
                  <option value="20" className="text-gray-800">20 Days</option>
                </select>
                {errors.targetDays && <p className="text-red-300 text-sm">{errors.targetDays}</p>}
              </div>

              {/* Current Fitness Level */}
              <div className="space-y-2">
                <label className="text-white font-semibold text-lg flex items-center gap-2">
                  💪 Current Fitness Level
                </label>
                <select
                  name="currentFitnessLevel"
                  value={formData.currentFitnessLevel}
                  onChange={handleInputChange}
                  className="w-full p-4 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-cute-sky focus:border-transparent transition-all duration-300"
                  disabled={isLoading}
                >
                  <option value="" className="text-gray-800">Select your level</option>
                  <option value="beginner" className="text-gray-800">Beginner</option>
                  <option value="intermediate" className="text-gray-800">Intermediate</option>
                  <option value="advanced" className="text-gray-800">Advanced</option>
                  <option value="athlete" className="text-gray-800">Athlete</option>
                </select>
                {errors.currentFitnessLevel && <p className="text-red-300 text-sm">{errors.currentFitnessLevel}</p>}
              </div>
            </div>

            {/* Health Condition - Full Width */}
            <div className="mt-8 space-y-2">
              <label className="text-white font-semibold text-lg flex items-center gap-2">
                🏥 Health Conditions (Optional)
              </label>
              <textarea
                name="healthCondition"
                value={formData.healthCondition}
                onChange={handleInputChange}
                rows={3}
                className="w-full p-4 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cute-sky focus:border-transparent transition-all duration-300 resize-none"
                placeholder="Any injuries, medical conditions, or physical limitations we should know about..."
                disabled={isLoading}
              />
            </div>

            {/* Dietary Restrictions - Full Width */}
            <div className="mt-8 space-y-2">
              <label className="text-white font-semibold text-lg flex items-center gap-2">
                🥗 Dietary Restrictions (Optional)
              </label>
              <textarea
                name="dietaryRestrictions"
                value={formData.dietaryRestrictions}
                onChange={handleInputChange}
                rows={3}
                className="w-full p-4 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cute-sky focus:border-transparent transition-all duration-300 resize-none"
                placeholder="Vegetarian, vegan, allergies, food preferences..."
                disabled={isLoading}
              />
            </div>

            {/* Submit Button */}
            <div className="mt-12 text-center">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-white text-cute-pink px-12 py-4 rounded-full text-xl font-bold hover:bg-opacity-90 transition-all duration-300 hover:scale-105 shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isLoading ? 'Creating Your Plan...' : 'Create My Plan 🚀'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}