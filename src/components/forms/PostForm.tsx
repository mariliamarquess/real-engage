import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { PenTool, Send, Clock } from "lucide-react";
import { useUser } from "@/contexts/UserContext";

interface PostFormProps {
  onSubmit?: (post: {
    content: string;
    community: string;
    readTime: number;
  }) => void;
}

export function PostForm({ onSubmit }: PostFormProps) {
  const [content, setContent] = useState("");
  const [selectedCommunity, setSelectedCommunity] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useUser();

  const calculateReadTime = (text: string) => {
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(words / wordsPerMinute));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !selectedCommunity) return;

    setIsSubmitting(true);
    
    const post = {
      content: content.trim(),
      community: selectedCommunity,
      readTime: calculateReadTime(content)
    };

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onSubmit?.(post);
    setContent("");
    setSelectedCommunity("");
    setIsSubmitting(false);
  };

  const readTime = calculateReadTime(content);
  const wordCount = content.trim().split(/\s+/).filter(word => word.length > 0).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <PenTool className="h-5 w-5" />
          <span>Compartilhar reflexão</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Comunidade
            </label>
            <Select value={selectedCommunity} onValueChange={setSelectedCommunity}>
              <SelectTrigger>
                <SelectValue placeholder="Escolha uma comunidade" />
              </SelectTrigger>
              <SelectContent>
                {user?.communities.map((community) => (
                  <SelectItem key={community} value={community}>
                    {community}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Sua reflexão
            </label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Compartilhe suas reflexões de forma consciente e respeitosa..."
              className="min-h-[120px] resize-none"
              maxLength={2000}
            />
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-4">
              <span>{wordCount} palavras</span>
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>{readTime}min de leitura</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline">
                {2000 - content.length} caracteres restantes
              </Badge>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setContent("");
                setSelectedCommunity("");
              }}
              disabled={isSubmitting}
            >
              Limpar
            </Button>
            <Button
              type="submit"
              disabled={!content.trim() || !selectedCommunity || isSubmitting}
              className="min-w-[100px]"
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  <span>Publicando...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Send className="h-4 w-4" />
                  <span>Publicar</span>
                </div>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}