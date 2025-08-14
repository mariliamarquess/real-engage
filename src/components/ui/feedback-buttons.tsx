import { useState } from "react";
import { ThumbsUp, ThumbsDown, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FeedbackButtonsProps {
  postId: string;
  onFeedback?: (type: 'quality' | 'relevance', positive: boolean) => void;
  className?: string;
}

export function FeedbackButtons({ postId, onFeedback, className }: FeedbackButtonsProps) {
  const [qualityFeedback, setQualityFeedback] = useState<boolean | null>(null);
  const [relevanceFeedback, setRelevanceFeedback] = useState<boolean | null>(null);

  const handleQualityFeedback = (positive: boolean) => {
    setQualityFeedback(positive);
    onFeedback?.('quality', positive);
  };

  const handleRelevanceFeedback = (positive: boolean) => {
    setRelevanceFeedback(positive);
    onFeedback?.('relevance', positive);
  };

  return (
    <div className={cn("flex items-center space-x-6", className)}>
      {/* Quality Feedback */}
      <div className="flex items-center space-x-1">
        <span className="text-xs text-muted-foreground mr-2">Qualidade:</span>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "h-8 w-8 p-0",
            qualityFeedback === true && "text-primary bg-primary/10"
          )}
          onClick={() => handleQualityFeedback(true)}
        >
          <ThumbsUp className="h-3 w-3" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "h-8 w-8 p-0",
            qualityFeedback === false && "text-destructive bg-destructive/10"
          )}
          onClick={() => handleQualityFeedback(false)}
        >
          <ThumbsDown className="h-3 w-3" />
        </Button>
      </div>

      {/* Relevance Feedback */}
      <div className="flex items-center space-x-1">
        <span className="text-xs text-muted-foreground mr-2">Relevância:</span>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "h-8 w-8 p-0",
            relevanceFeedback === true && "text-primary bg-primary/10"
          )}
          onClick={() => handleRelevanceFeedback(true)}
        >
          <ThumbsUp className="h-3 w-3" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "h-8 w-8 p-0",
            relevanceFeedback === false && "text-destructive bg-destructive/10"
          )}
          onClick={() => handleRelevanceFeedback(false)}
        >
          <ThumbsDown className="h-3 w-3" />
        </Button>
      </div>

      {/* Comments */}
      <Button variant="ghost" size="sm" className="text-muted-foreground">
        <MessageCircle className="h-3 w-3 mr-1" />
        <span className="text-xs">Discutir</span>
      </Button>
    </div>
  );
}