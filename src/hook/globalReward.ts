"use client"
import { useState } from "react";

export const useGlobalRewards = () => {
  const [globalRewards, setGlobalRewards] = useState({
    totalPoints: 0,
    totalCompletedDays: 0,
    totalActivePlans: 0
  });

  const calculateGlobalRewards = () => {
    try {
      const fitnessPlanList = JSON.parse(localStorage.getItem('fitnessPlanList') || '[]');
      let totalPoints = 0;
      let totalCompletedDays = 0;
      let totalActivePlans = 0;

      fitnessPlanList.forEach((plan: any) => {
        const planProgress = localStorage.getItem(`fitnessProgress_${plan.id}`);
        if (planProgress) {
          const progress = JSON.parse(planProgress);
          totalPoints += progress.totalPoints || 0;
          totalCompletedDays += progress.completedDays?.length || 0;
          if (progress.totalPoints > 0) totalActivePlans++;
        }
      });

      const globalRewards = {
        totalPoints,
        totalCompletedDays,
        totalActivePlans,
        lastUpdated: new Date().toISOString()
      };

      localStorage.setItem('globalRewards', JSON.stringify(globalRewards));
      setGlobalRewards({ totalPoints, totalCompletedDays, totalActivePlans });
    } catch (error) {
      console.error('Error calculating global rewards:', error);
    }
  };

  const loadGlobalRewards = () => {
    try {
      const storedRewards = localStorage.getItem('globalRewards');
      if (storedRewards) {
        const rewards = JSON.parse(storedRewards);
        setGlobalRewards({
          totalPoints: rewards.totalPoints || 0,
          totalCompletedDays: rewards.totalCompletedDays || 0,
          totalActivePlans: rewards.totalActivePlans || 0
        });
      } else {
        // Calculate from all plan progress if global rewards don't exist
        calculateGlobalRewards();
      }
    } catch (error) {
      console.error('Error loading global rewards:', error);
    }
  };

  return { globalRewards, loadGlobalRewards, calculateGlobalRewards };
};
