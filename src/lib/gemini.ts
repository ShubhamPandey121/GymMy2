// lib/gemini.ts
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

export interface UserData {
  age: string;
  height: string;
  weight: string;
  fitnessGoal: string;
  healthCondition: string;
  targetDays: string;
  currentFitnessLevel: string;
  dietaryRestrictions: string;
}

export interface DayPlan {
  day: number;
  workouts: {
    name: string;
    duration: string;
    sets?: string;
    reps?: string;
    description: string;
  }[];
  meals: {
    breakfast: {
      name: string;
      calories: string;
      ingredients: string[];
      instructions: string;
    };
    lunch: {
      name: string;
      calories: string;
      ingredients: string[];
      instructions: string;
    };
    dinner: {
      name: string;
      calories: string;
      ingredients: string[];
      instructions: string;
    };
    snacks: {
      name: string;
      calories: string;
      ingredients: string[];
    }[];
  };
  tips: string[];
}

export interface FitnessPlan {
  overview: {
    goal: string;
    duration: string;
    fitnessLevel: string;
    estimatedCaloriesPerDay: string;
    expectedResults: string;
  };
  dailyPlans: DayPlan[];
  generalTips: {
    workout: string[];
    diet: string[];
    lifestyle: string[];
  };
}

export async function generateFitnessPlans(userData: UserData): Promise<FitnessPlan> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `
    Create a comprehensive ${userData.targetDays}-day fitness and diet plan for:
    
    User Profile:
    - Age: ${userData.age} years
    - Height: ${userData.height} cm
    - Weight: ${userData.weight} kg
    - Fitness Goal: ${userData.fitnessGoal}
    - Current Fitness Level: ${userData.currentFitnessLevel}
    - Health Conditions: ${userData.healthCondition || 'None mentioned'}
    - Dietary Restrictions: ${userData.dietaryRestrictions || 'None mentioned'}
    - Target Duration: ${userData.targetDays} days

    Please provide a response in the following JSON format:
    {
      "overview": {
        "goal": "Primary fitness goal",
        "duration": "${userData.targetDays} days",
        "fitnessLevel": "${userData.currentFitnessLevel}",
        "estimatedCaloriesPerDay": "XXXX calories",
        "expectedResults": "What they can expect to achieve"
      },
      "dailyPlans": [
        {
          "day": 1,
          "workouts": [
            {
              "name": "Exercise name",
              "duration": "XX minutes",
              "sets": "X sets (if applicable)",
              "reps": "X reps (if applicable)",
              "description": "How to perform the exercise"
            }
          ],
          "meals": {
            "breakfast": {
              "name": "Meal name",
              "calories": "XXX calories",
              "ingredients": ["ingredient1", "ingredient2"],
              "instructions": "Preparation instructions"
            },
            "lunch": {
              "name": "Meal name",
              "calories": "XXX calories",
              "ingredients": ["ingredient1", "ingredient2"],
              "instructions": "Preparation instructions"
            },
            "dinner": {
              "name": "Meal name", 
              "calories": "XXX calories",
              "ingredients": ["ingredient1", "ingredient2"],
              "instructions": "Preparation instructions"
            },
            "snacks": [
              {
                "name": "Snack name",
                "calories": "XXX calories",
                "ingredients": ["ingredient1", "ingredient2"]
              }
            ]
          },
          "tips": ["Daily tip 1", "Daily tip 2"]
        }
      ],
      "generalTips": {
        "workout": ["Workout tip 1", "Workout tip 2"],
        "diet": ["Diet tip 1", "Diet tip 2"],
        "lifestyle": ["Lifestyle tip 1", "Lifestyle tip 2"]
      }
    }

    Important guidelines:
    1. Consider the user's fitness level when designing workouts
    2. Account for any health conditions mentioned
    3. Respect dietary restrictions
    4. Make the plan progressive over the ${userData.targetDays} days
    5. Include rest days if appropriate
    6. Provide realistic calorie targets
    7. Include variety in both workouts and meals
    8. Give practical, actionable advice
    
    Respond with ONLY the JSON object, no additional text.
  `;

  try {
    // Log the prompt being sent
    console.log('Sending prompt to Gemini:', prompt);
    
    const result = await model.generateContent(prompt);
    console.log('Raw Gemini response:', result);
    
    const response = await result.response;
    const text = await response.text();
    // Remove Markdown code block if present
    const cleanedText = text.replace(/^```[a-zA-Z]*\s*/, '').replace(/```\s*$/, '');
    console.log('Response text:', cleanedText);
    try {
      const jsonResponse = JSON.parse(cleanedText);
      return jsonResponse as FitnessPlan;
    } catch (parseError) {
      console.error('JSON parsing error:', parseError);
      throw new Error('Failed to parse Gemini response as JSON');
    }
  } catch (error) {
    console.error('Gemini API error:', error);
    throw error;
  }
}