import { useState, useEffect } from "react";
import { Clock, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface TimeTrackerProps {
  dailyLimit: number; // in minutes
  onLimitReached?: () => void;
}

export function TimeTracker({ dailyLimit, onLimitReached }: TimeTrackerProps) {
  const [timeSpent, setTimeSpent] = useState(0);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive) {
      interval = setInterval(() => {
        setTimeSpent(prev => {
          const newTime = prev + 1;
          if (newTime >= dailyLimit * 60 && onLimitReached) {
            onLimitReached();
          }
          return newTime;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, dailyLimit, onLimitReached]);

  const minutes = Math.floor(timeSpent / 60);
  const seconds = timeSpent % 60;
  const progress = (minutes / dailyLimit) * 100;
  const isNearLimit = progress > 80;

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Clock className={`h-4 w-4 ${isNearLimit ? 'text-destructive' : 'text-muted-foreground'}`} />
          <span className="text-sm font-medium">Tempo de uso hoje</span>
        </div>
        {isNearLimit && (
          <AlertTriangle className="h-4 w-4 text-destructive animate-gentle-pulse" />
        )}
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>{minutes}min {seconds}s</span>
          <span className="text-muted-foreground">Limite: {dailyLimit}min</span>
        </div>
        
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${
              isNearLimit ? 'bg-destructive' : 'bg-primary'
            }`}
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        
        {progress >= 100 && (
          <div className="text-sm text-destructive font-medium">
            Limite diário atingido. Que tal uma pausa para reflexão?
          </div>
        )}
      </div>
    </Card>
  );
}