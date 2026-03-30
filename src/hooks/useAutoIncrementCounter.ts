import { useState, useEffect } from "react";

interface UseAutoIncrementCounterOptions {
  initialCount: number;
  incrementAmount: number;
  intervalHours: number;
  startDate: string; // ISO date string when counting started
}

export const useAutoIncrementCounter = ({
  initialCount,
  incrementAmount,
  intervalHours,
  startDate,
}: UseAutoIncrementCounterOptions) => {
  const calculateCurrentCount = () => {
    const start = new Date(startDate).getTime();
    const now = Date.now();
    const hoursPassed = (now - start) / (1000 * 60 * 60);

    // Calculate how many increments should have happened since start date
    const incrementsToAdd = Math.floor(hoursPassed / intervalHours);
    const currentCount = initialCount + incrementsToAdd * incrementAmount;

    return currentCount;
  };

  const [count, setCount] = useState<number>(calculateCurrentCount);

  useEffect(() => {
    // Update count every second for real-time display
    const updateInterval = setInterval(() => {
      setCount(calculateCurrentCount());
    }, 1000); // Update every 1 second

    return () => clearInterval(updateInterval);
  }, [initialCount, incrementAmount, intervalHours, startDate]);

  return count;
};
