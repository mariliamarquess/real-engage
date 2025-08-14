import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FeedbackButtons } from "@/components/ui/feedback-buttons";
import { Clock, Edit, Eye } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

interface PostCardProps {
  id: string;
  author: string;
  content: string;
  createdAt: Date;
  community: string;
  readTime: number;
  edited?: boolean;
  editHistory?: number;
  className?: string;
}

export function PostCard({
  id,
  author,
  content,
  createdAt,
  community,
  readTime,
  edited = false,
  editHistory = 0,
  className
}: PostCardProps) {
  return (
    <Card className={`transition-all duration-300 hover:shadow-soft ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="font-medium text-sm">{author}</span>
              <Badge variant="outline" className="text-xs">
                {community}
              </Badge>
            </div>
            <div className="flex items-center space-x-3 text-xs text-muted-foreground">
              <span>
                {formatDistanceToNow(createdAt, { 
                  addSuffix: true, 
                  locale: ptBR 
                })}
              </span>
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>{readTime}min de leitura</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {edited && (
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <Edit className="h-3 w-3" />
                <span>{editHistory} edições</span>
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="prose prose-sm max-w-none">
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {content}
          </p>
        </div>

        <div className="flex items-center justify-between pt-3 border-t">
          <FeedbackButtons
            postId={id}
            onFeedback={(type, positive) => {
              console.log(`Feedback for ${id}: ${type} - ${positive ? 'positive' : 'negative'}`);
            }}
          />
          
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <Eye className="h-3 w-3" />
            <span>Visualização consciente</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}