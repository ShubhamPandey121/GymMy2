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
      const fitnessPlans = await generateFitnessPlans(formData as UserData);

      // Get existing plans list
      let fitnessPlanList: any[] = [];
      try {
        const storedList = localStorage.getItem('fitnessPlanList');
        fitnessPlanList = storedList ? JSON.parse(storedList) : [];
        if (!Array.isArray(fitnessPlanList)) fitnessPlanList = [];
      } catch (e) {
        console.error('Error parsing fitnessPlanList:', e);
        fitnessPlanList = [];
      }

      // Create unique plan
      const newPlan = {
        id: `plan_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`, // More unique ID
        createdAt: new Date().toISOString(),
        userData: { ...formData }, // Create copy to avoid reference issues
        fitnessPlans: fitnessPlans,
        title: `${formData.fitnessGoal.replace('-', ' ').toUpperCase()} Plan`,
        description: `${formData.targetDays} days plan for ${formData.fitnessGoal.replace('-', ' ')}`
      };

      // Add to beginning of array
      fitnessPlanList.unshift(newPlan);

      // Store data
      localStorage.setItem('fitnessPlanList', JSON.stringify(fitnessPlanList));
      localStorage.setItem('fitnessPlans', JSON.stringify(fitnessPlans));
      localStorage.setItem('userData', JSON.stringify(formData));
      localStorage.setItem('currentPlanId', newPlan.id);

      console.log('New plan created:', newPlan.id);
      router.push('/fitness');
    } catch (error) {
      console.error('Error generating fitness plans:', error);
      alert('Sorry, there was an error generating your plans. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }
};
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 overflow-hidden relative">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          >
            <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
          </div>
        ))}
      </div>

      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 border-2 border-cyan-400/20 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
        <div className="absolute top-40 right-20 w-16 h-16 border-2 border-pink-400/20 rounded-lg rotate-45 animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 border-2 border-yellow-400/20 rounded-full animate-bounce" style={{ animationDuration: '6s' }}></div>
        <div className="absolute bottom-20 right-10 w-18 h-18 border-2 border-green-400/20 rounded-lg animate-spin" style={{ animationDuration: '15s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-12 h-12 border-2 border-blue-400/20 rounded-full animate-pulse" style={{ animationDuration: '3s' }}></div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-12 text-center shadow-2xl border border-white/20">
            <div className="relative mb-6">
              <div className="animate-spin rounded-full h-20 w-20 border-4 border-transparent border-t-indigo-500 border-r-purple-500 mx-auto"></div>
              <div className="absolute inset-0 animate-ping rounded-full h-20 w-20 border-2 border-indigo-300 opacity-20 mx-auto"></div>
            </div>
            <h3 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
              Creating Your Plan ✨
            </h3>
            <p className="text-gray-600 text-lg">Our AI is crafting the perfect fitness journey just for you...</p>
            <div className="mt-4 flex justify-center space-x-1">
              <div className="h-2 w-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
              <div className="h-2 w-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="h-2 w-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      )}

      <main className="relative z-10">
        <div className="max-w-5xl mx-auto px-6 py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full mb-8 shadow-2xl">
              <span className="text-4xl">🎯</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 mb-6 leading-tight">
              Tell Us About
              <br />
              <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent animate-pulse">
                Yourself! 🌟
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Help us create the perfect fitness plan tailored just for you
            </p>
          </div>

          {/* Form Container */}
          <div className="relative">
            {/* Glassmorphism Form */}
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
              <form onSubmit={handleSubmit}>
              {/* Gradient Border Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl -z-10 blur-xl"></div>
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* Age */}
                <div className="space-y-3">
                  <label className="text-white font-bold text-lg flex items-center gap-3 mb-2">
                    <span className="text-2xl">🎂</span> Age
                  </label>
                  <div className="relative group">
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      className="w-full p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 hover:bg-white/15 focus:bg-white/15"
                      placeholder="Enter your age"
                      min="13"
                      max="100"
                      disabled={isLoading}
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/10 group-hover:to-purple-500/10 transition-all duration-300 pointer-events-none"></div>
                  </div>
                  {errors.age && <p className="text-red-400 text-sm flex items-center gap-2"><span>⚠️</span>{errors.age}</p>}
                </div>

                {/* Height */}
                <div className="space-y-3">
                  <label className="text-white font-bold text-lg flex items-center gap-3 mb-2">
                    <span className="text-2xl">📏</span> Height (cm)
                  </label>
                  <div className="relative group">
                    <input
                      type="number"
                      name="height"
                      value={formData.height}
                      onChange={handleInputChange}
                      className="w-full p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 hover:bg-white/15 focus:bg-white/15"
                      placeholder="Enter height in cm"
                      min="100"
                      max="250"
                      disabled={isLoading}
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-all duration-300 pointer-events-none"></div>
                  </div>
                  {errors.height && <p className="text-red-400 text-sm flex items-center gap-2"><span>⚠️</span>{errors.height}</p>}
                </div>

                {/* Weight */}
                <div className="space-y-3">
                  <label className="text-white font-bold text-lg flex items-center gap-3 mb-2">
                    <span className="text-2xl">⚖️</span> Weight (kg)
                  </label>
                  <div className="relative group">
                    <input
                      type="number"
                      name="weight"
                      value={formData.weight}
                      onChange={handleInputChange}
                      className="w-full p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-300 hover:bg-white/15 focus:bg-white/15"
                      placeholder="Enter weight in kg"
                      min="30"
                      max="300"
                      disabled={isLoading}
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-500/0 to-yellow-500/0 group-hover:from-pink-500/10 group-hover:to-yellow-500/10 transition-all duration-300 pointer-events-none"></div>
                  </div>
                  {errors.weight && <p className="text-red-400 text-sm flex items-center gap-2"><span>⚠️</span>{errors.weight}</p>}
                </div>

                {/* Fitness Goal */}
                <div className="space-y-3">
                  <label className="text-white font-bold text-lg flex items-center gap-3 mb-2">
                    <span className="text-2xl">🎯</span> Fitness Goal
                  </label>
                  <div className="relative group">
                    <select
                      name="fitnessGoal"
                      value={formData.fitnessGoal}
                      onChange={handleInputChange}
                      className="w-full p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 hover:bg-white/15 focus:bg-white/15"
                      disabled={isLoading}
                    >
                      <option value="" className="text-gray-800 bg-gray-100">Select your goal</option>
                      <option value="weight-loss" className="text-gray-800 bg-gray-100">Weight Loss</option>
                      <option value="muscle-gain" className="text-gray-800 bg-gray-100">Muscle Gain</option>
                      <option value="general-fitness" className="text-gray-800 bg-gray-100">General Fitness</option>
                      <option value="strength-training" className="text-gray-800 bg-gray-100">Strength Training</option>
                      <option value="endurance" className="text-gray-800 bg-gray-100">Endurance</option>
                      <option value="flexibility" className="text-gray-800 bg-gray-100">Flexibility</option>
                    </select>
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-500/0 to-cyan-500/0 group-hover:from-yellow-500/10 group-hover:to-cyan-500/10 transition-all duration-300 pointer-events-none"></div>
                  </div>
                  {errors.fitnessGoal && <p className="text-red-400 text-sm flex items-center gap-2"><span>⚠️</span>{errors.fitnessGoal}</p>}
                </div>

                {/* Target Days */}
                <div className="space-y-3">
                  <label className="text-white font-bold text-lg flex items-center gap-3 mb-2">
                    <span className="text-2xl">📅</span> Target Timeframe
                  </label>
                  <div className="relative group">
                    <select
                      name="targetDays"
                      value={formData.targetDays}
                      onChange={handleInputChange}
                      className="w-full p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300 hover:bg-white/15 focus:bg-white/15"
                      disabled={isLoading}
                    >
                      <option value="" className="text-gray-800 bg-gray-100">Select timeframe</option>
                      <option value="5" className="text-gray-800 bg-gray-100">5 Days</option>
                      <option value="10" className="text-gray-800 bg-gray-100">10 Days</option>
                      <option value="15" className="text-gray-800 bg-gray-100">15 Days</option>
                      <option value="20" className="text-gray-800 bg-gray-100">20 Days</option>
                    </select>
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/0 to-blue-500/0 group-hover:from-green-500/10 group-hover:to-blue-500/10 transition-all duration-300 pointer-events-none"></div>
                  </div>
                  {errors.targetDays && <p className="text-red-400 text-sm flex items-center gap-2"><span>⚠️</span>{errors.targetDays}</p>}
                </div>

                {/* Current Fitness Level */}
                <div className="space-y-3">
                  <label className="text-white font-bold text-lg flex items-center gap-3 mb-2">
                    <span className="text-2xl">💪</span> Current Fitness Level
                  </label>
                  <div className="relative group">
                    <select
                      name="currentFitnessLevel"
                      value={formData.currentFitnessLevel}
                      onChange={handleInputChange}
                      className="w-full p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 hover:bg-white/15 focus:bg-white/15"
                      disabled={isLoading}
                    >
                      <option value="" className="text-gray-800 bg-gray-100">Select your level</option>
                      <option value="beginner" className="text-gray-800 bg-gray-100">Beginner</option>
                      <option value="intermediate" className="text-gray-800 bg-gray-100">Intermediate</option>
                      <option value="advanced" className="text-gray-800 bg-gray-100">Advanced</option>
                      <option value="athlete" className="text-gray-800 bg-gray-100">Athlete</option>
                    </select>
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-300 pointer-events-none"></div>
                  </div>
                  {errors.currentFitnessLevel && <p className="text-red-400 text-sm flex items-center gap-2"><span>⚠️</span>{errors.currentFitnessLevel}</p>}
                </div>
              </div>

              {/* Health Condition - Full Width */}
              <div className="mt-8 space-y-3">
                <label className="text-white font-bold text-lg flex items-center gap-3 mb-2">
                  <span className="text-2xl">🏥</span> Health Conditions (Optional)
                </label>
                <div className="relative group">
                  <textarea
                    name="healthCondition"
                    value={formData.healthCondition}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all duration-300 resize-none hover:bg-white/15 focus:bg-white/15"
                    placeholder="Any injuries, medical conditions, or physical limitations we should know about..."
                    disabled={isLoading}
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/0 to-orange-500/0 group-hover:from-red-500/10 group-hover:to-orange-500/10 transition-all duration-300 pointer-events-none"></div>
                </div>
              </div>

              {/* Dietary Restrictions - Full Width */}
              <div className="mt-8 space-y-3">
                <label className="text-white font-bold text-lg flex items-center gap-3 mb-2">
                  <span className="text-2xl">🥗</span> Dietary Restrictions (Optional)
                </label>
                <div className="relative group">
                  <textarea
                    name="dietaryRestrictions"
                    value={formData.dietaryRestrictions}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300 resize-none hover:bg-white/15 focus:bg-white/15"
                    placeholder="Vegetarian, vegan, allergies, food preferences..."
                    disabled={isLoading}
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/0 to-teal-500/0 group-hover:from-green-500/10 group-hover:to-teal-500/10 transition-all duration-300 pointer-events-none"></div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-12 text-center">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white px-16 py-5 rounded-full text-xl font-bold transition-all duration-300 hover:scale-105 shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                        Creating Your Plan...
                      </>
                    ) : (
                      <>
                        Create My Plan 🚀
                        <span className="group-hover:translate-x-1 transition-transform duration-300">✨</span>
                      </>
                    )}
                  </span>
                  
                  {/* Animated background effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300">
                    <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent animate-pulse"></div>
                  </div>
                </button>
              </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
