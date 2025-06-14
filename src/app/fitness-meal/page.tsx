'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// Cute Rat Character Component
const CuteRatIcon = ({ className = "w-16 h-16" }) => (
  <img src="/GymMyFoodieHub.png" width={200}
                    height={80} alt="Cute Robot" />
);

export default function FoodieMealPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentFoodieTip, setCurrentFoodieTip] = useState("Great food fuels great workouts! 🍳");
  const router = useRouter();

  const foodieTips = [
    "Great food fuels great workouts! 🍳",
    "Fresh ingredients make the best fitness fuel! 🥬",
    "Cooking is the ultimate form of self-care! 👨‍🍳",
    "Delicious meals = consistent nutrition! 😋",
    "Every meal is a chance to nourish your body! 🌱"
  ];

  const cuisineTypes = [
    {
      icon: "🍝",
      name: "Italian",
      description: "Pasta perfection with protein-packed sauces",
      color: "from-red-400 to-green-400"
    },
    {
      icon: "🍜",
      name: "Asian",
      description: "Fresh, balanced flavors for optimal nutrition",
      color: "from-yellow-400 to-red-400"
    },
    {
      icon: "🥗",
      name: "Mediterranean",
      description: "Heart-healthy ingredients, maximum taste",
      color: "from-blue-400 to-green-400"
    },
    {
      icon: "🌮",
      name: "Mexican",
      description: "Spicy, fresh, and packed with nutrients",
      color: "from-orange-400 to-pink-400"
    },
    {
      icon: "🍛",
      name: "Indian",
      description: "Aromatic spices with healing properties",
      color: "from-purple-400 to-yellow-400"
    },
    {
      icon: "🥘",
      name: "Middle Eastern",
      description: "Rich flavors with ancient nutrition wisdom",
      color: "from-amber-400 to-orange-400"
    }
  ];

  const featuredRecipes = [
    {
      name: "Power Protein Bowl",
      time: "15 mins",
      calories: "420 cal",
      difficulty: "Easy",
      ingredients: ["Quinoa", "Grilled Chicken", "Avocado", "Black Beans"]
    },
    {
      name: "Green Goddess Smoothie",
      time: "5 mins",
      calories: "280 cal",
      difficulty: "Easy",
      ingredients: ["Spinach", "Banana", "Protein Powder", "Almond Milk"]
    },
    {
      name: "Mediterranean Wrap",
      time: "12 mins",
      calories: "350 cal",
      difficulty: "Easy",
      ingredients: ["Hummus", "Grilled Veggies", "Feta", "Whole Wheat Wrap"]
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    
    // Rotate foodie tips every 5 seconds
    const interval = setInterval(() => {
      const randomTip = foodieTips[Math.floor(Math.random() * foodieTips.length)];
      setCurrentFoodieTip(randomTip);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleStartCooking = () => {
    router.push('/meal-planner');
  };

  const handleExploreFoodieHub = () => {
    // Open FoodieHub in new tab or navigate to partnership page
    window.open('https://foodie-hub-ten.vercel.app/', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative">
      {/* Animated Foodie Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.04]">
        <div className="absolute top-[8%] left-[3%] text-[130px] text-orange-500 animate-bounce" style={{ animationDelay: '0s', animationDuration: '7s' }}>🍕</div>
        <div className="absolute top-[55%] right-[5%] text-[130px] text-green-500 animate-pulse" style={{ animationDelay: '2s', animationDuration: '6s' }}>🥑</div>
        <div className="absolute bottom-[15%] left-[12%] text-[130px] text-red-500 animate-bounce" style={{ animationDelay: '4s', animationDuration: '8s' }}>🍅</div>
        <div className="absolute top-[25%] right-[22%] text-[130px] text-yellow-500 animate-pulse" style={{ animationDelay: '1s', animationDuration: '6s' }}>🌽</div>
        <div className="absolute bottom-[35%] right-[35%] text-[130px] text-purple-500 animate-bounce" style={{ animationDelay: '3s', animationDuration: '7s' }}>🍆</div>
        <div className="absolute top-[70%] left-[60%] text-[130px] text-pink-500 animate-pulse" style={{ animationDelay: '5s', animationDuration: '6s' }}>🍓</div>
      </div>

      {/* Floating Food Bubbles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-24 left-8 w-14 h-14 bg-orange-200 rounded-full opacity-25 animate-bounce" style={{ animationDelay: '0s', animationDuration: '5s' }}></div>
        <div className="absolute top-36 right-16 w-10 h-10 bg-green-200 rounded-full opacity-30 animate-pulse" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
        <div className="absolute bottom-32 left-16 w-18 h-18 bg-red-200 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '2s', animationDuration: '6s' }}></div>
        <div className="absolute bottom-16 right-8 w-12 h-12 bg-yellow-200 rounded-full opacity-25 animate-pulse" style={{ animationDelay: '3s', animationDuration: '5s' }}></div>
        <div className="absolute top-1/3 left-1/4 w-16 h-16 bg-purple-200 rounded-full opacity-15 animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '7s' }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            
            {/* Hero Section */}
            <div className="text-center mb-20">
              <div className="flex justify-center items-center mb-8">
                <CuteRatIcon className="w-28 h-28 mr-6" />
                
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-600 via-red-500 to-pink-500 bg-clip-text text-transparent mb-6" style={{ fontFamily: 'Comic Neue, cursive' }}>
                Delicious Meets
                <br />
                <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">Nutritious!</span>
              </h1>
              
              {/* Rotating Foodie Tip */}
              <div className="text-xl md:text-2xl text-gray-600 italic mb-8 p-6 bg-white/70 rounded-3xl backdrop-blur-lg mx-auto max-w-4xl leading-relaxed shadow-lg transition-all duration-500">
                {currentFoodieTip}
              </div>

              <p className="text-lg md:text-xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed">
                Discover a world of flavors with our FoodieHub partnership! From quick post-workout meals to 
                elaborate weekend feasts, we've got recipes that make healthy eating absolutely delicious! 🌟
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <button
                  onClick={handleStartCooking}
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-10 py-4 rounded-2xl text-xl font-bold hover:scale-105 hover:shadow-xl transition-all duration-300 shadow-lg shadow-orange-500/30"
                >
                  🍳 Start Cooking Now!
                </button>
                <button 
                  onClick={handleExploreFoodieHub}
                  className="bg-white/90 backdrop-blur-lg text-gray-800 border-2 border-white/50 px-10 py-4 rounded-2xl text-xl font-semibold hover:bg-white hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  🌐 Explore FoodieHub
                </button>
              </div>
            </div>

            {/* Cuisine Explorer Section */}
            <div className="mb-20">
              <h2 className="text-3xl md:text-5xl font-bold text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-12" style={{ fontFamily: 'Comic Neue, cursive' }}>
                Explore World Cuisines 🌍
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {cuisineTypes.map((cuisine, index) => (
                  <div key={index} className="group bg-white/80 backdrop-blur-lg rounded-3xl p-6 text-center hover:scale-105 hover:-translate-y-3 transition-all duration-300 shadow-xl border border-white/20 cursor-pointer">
                    <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {cuisine.icon}
                    </div>
                    <h3 className={`text-2xl font-bold bg-gradient-to-r ${cuisine.color} bg-clip-text text-transparent mb-3`}>
                      {cuisine.name}
                    </h3>
                    <p className="text-gray-600 text-sm">{cuisine.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Recipes Section */}
            <div className="mb-20">
              <h2 className="text-3xl md:text-5xl font-bold text-center bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-12" style={{ fontFamily: 'Comic Neue, cursive' }}>
                Today's Featured Recipes 🍽️
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                {featuredRecipes.map((recipe, index) => (
                  <div key={index} className="bg-white/90 backdrop-blur-lg rounded-3xl overflow-hidden shadow-xl border border-white/20 hover:scale-105 transition-all duration-300 group">
                    <div className={`h-32 bg-gradient-to-r ${index === 0 ? 'from-orange-400 to-red-400' : index === 1 ? 'from-green-400 to-blue-400' : 'from-purple-400 to-pink-400'} flex items-center justify-center`}>
                      <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                        {index === 0 ? '🥗' : index === 1 ? '🥤' : '🌯'}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-3">{recipe.name}</h3>
                      <div className="flex justify-between text-sm text-gray-600 mb-4">
                        <span>⏱️ {recipe.time}</span>
                        <span>🔥 {recipe.calories}</span>
                        <span>📊 {recipe.difficulty}</span>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-gray-700">Ingredients:</p>
                        <div className="flex flex-wrap gap-1">
                          {recipe.ingredients.map((ingredient, i) => (
                            <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                              {ingredient}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-xl font-semibold hover:scale-105 transition-all duration-300">
                        Cook This! 👨‍🍳
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Partnership Benefits Section */}
            <div className="mb-20">
              <div className="bg-gradient-to-br from-orange-50 to-red-100 rounded-3xl p-12 shadow-2xl border border-white/20">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-6" style={{ fontFamily: 'Comic Neue, cursive' }}>
                      Why FoodieHub + GymMy? 🤔
                    </h2>
                    <div className="space-y-6">
                      <div className="flex items-start">
                        <div className="text-3xl mr-4">🎯</div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-800 mb-2">Fitness-Focused Recipes</h3>
                          <p className="text-gray-600">Every recipe is crafted with your fitness goals in mind</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="text-3xl mr-4">⚡</div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-800 mb-2">Quick & Easy</h3>
                          <p className="text-gray-600">No more spending hours in the kitchen - get nutritious meals fast!</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="text-3xl mr-4">📱</div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-800 mb-2">Seamless Integration</h3>
                          <p className="text-gray-600">Recipes sync perfectly with your workout and nutrition plans</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="text-3xl mr-4">🏆</div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-800 mb-2">Proven Results</h3>
                          <p className="text-gray-600">Thousands of users have achieved their goals with our meal plans</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="relative">
                      <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-8 shadow-xl">
                        
                        <img src="/FoodieHubLogo.png" width={200}
                    height={80} alt="Cute Robot" className="object-contain mx-auto mb-6"/>

                        <div className="text-6xl mb-4">🤝</div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Perfect Partnership</h3>
                        <p className="text-gray-600">Where fitness meets flavor!</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Final CTA Section */}
            <div className="text-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-3xl p-12 text-white shadow-2xl">
              <div className="flex justify-center mb-6">
                <CuteRatIcon className="w-24 h-24" />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'Comic Neue, cursive' }}>
                Ready to Cook Your Way to Fitness? 🚀
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
                Join our foodie fitness community and discover how delicious healthy eating can be! 
                Your taste buds and your body will thank you! 
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={handleStartCooking}
                  className="bg-white text-purple-600 px-8 py-4 rounded-2xl text-lg font-bold hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  🍽️ Start My Meal Journey
                </button>
                <button 
                  onClick={handleExploreFoodieHub}
                  className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-2xl text-lg font-bold hover:bg-white hover:text-purple-600 transition-all duration-300"
                >
                  🌐 Visit FoodieHub
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}