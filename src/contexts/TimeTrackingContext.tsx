import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface TimeTrackingContextType {
  timeSpent: number; // in seconds
  dailyLimit: number; // in minutes
  isLimitReached: boolean;
  startSession: () => void;
  pauseSession: () => void;
  resetDaily: () => void;
  updateDailyLimit: (limit: number) => void;
}

const TimeTrackingContext = createContext<TimeTrackingContextType | undefined>(undefined);

export function TimeTrackingProvider({ children }: { children: ReactNode }) {
  const [timeSpent, setTimeSpent] = useState(0);
  const [dailyLimit, setDailyLimit] = useState(30); // 30 minutes default
  const [isActive, setIsActive] = useState(true);
  const [lastActiveDate, setLastActiveDate] = useState(new Date().toDateString());

  // Reset daily counter if it's a new day
  useEffect(() => {
    const today = new Date().toDateString();
    if (today !== lastActiveDate) {
      setTimeSpent(0);
      setLastActiveDate(today);
    }
  }, [lastActiveDate]);

  // Track time when active
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive) {
      interval = setInterval(() => {
        setTimeSpent(prev => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive]);

  const startSession = () => setIsActive(true);
  const pauseSession = () => setIsActive(false);
  const resetDaily = () => setTimeSpent(0);
  const updateDailyLimit = (limit: number) => setDailyLimit(limit);

  const isLimitReached = Math.floor(timeSpent / 60) >= dailyLimit;

  return (
    <TimeTrackingContext.Provider value={{
      timeSpent,
      dailyLimit,
      isLimitReached,
      startSession,
      pauseSession,
      resetDaily,
      updateDailyLimit
    }}>
      {children}
    </TimeTrackingContext.Provider>
  );
}

export function useTimeTracking() {
  const context = useContext(TimeTrackingContext);
  if (context === undefined) {
    throw new Error('useTimeTracking must be used within a TimeTrackingProvider');
  }
  return context;
}