export interface Goal {
  id: string;
  title: string;
  type: 'weight-loss' | 'muscle-gain' | 'endurance' | 'flexibility' | 'general-fitness';
  targetValue: number;
  currentValue: number;
  unit: string;
  deadline: Date;
  createdAt: Date;
  isCompleted: boolean;
  points: number;
}

export interface WorkoutPlan {
  id: string;
  goalId: string;
  name: string;
  exercises: Exercise[];
  duration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  daysPerWeek: number;
}

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  duration?: number;
  restTime: number;
  instructions: string[];
}

export interface NutritionPlan {
  id: string;
  goalId: string;
  dailyCalories: number;
  macros: {
    protein: number;
    carbs: number;
    fat: number;
  };
  meals: Meal[];
}

export interface Meal {
  id: string;
  name: string;
  calories: number;
  time: string;
  foods: Food[];
}

export interface Food {
  id: string;
  name: string;
  calories: number;
  quantity: string;
}

export interface UserMetrics {
  weight: number;
  height: number;
  age: number;
  gender: 'male' | 'female' | 'other';
  activityLevel: 'sedentary' | 'lightly-active' | 'moderately-active' | 'very-active' | 'extremely-active';
  bodyFatPercentage?: number;
  muscleMass?: number;
}