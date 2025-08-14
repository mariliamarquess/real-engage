import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PostCard } from "@/components/post/PostCard";
import { User, Calendar, Clock, MessageSquare, TrendingUp, Edit } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

const userPosts = [
  {
    id: "1",
    author: "Ana Reflexiva",
    content: "Hoje refleti sobre como nossa relação com a tecnologia mudou drasticamente nos últimos anos. Lembro de quando verificar e-mail era algo que fazíamos 2-3 vezes por dia, não a cada 2 minutos.",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    community: "Minimalismo Digital",
    readTime: 2,
    edited: false
  },
  {
    id: "2",
    author: "Ana Reflexiva",
    content: "Participei de um workshop sobre dependência digital hoje. Uma estatística me impactou: checamos nossos phones em média 144 vezes por dia. Isso é uma verificação a cada 6-7 minutos acordados. Precisamos desta consciência para mudança.",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    community: "Saúde Mental e Redes",
    readTime: 3,
    edited: true,
    editHistory: 1
  }
];

const userStats = {
  totalPosts: 12,
  totalComments: 34,
  communitiesJoined: 2,
  averageReadTime: 2.5,
  weeklyActivity: [
    { day: "Segunda", posts: 1 },
    { day: "Terça", posts: 0 },
    { day: "Quarta", posts: 2 },
    { day: "Quinta", posts: 1 },
    { day: "Sexta", posts: 0 },
    { day: "Sábado", posts: 1 },
    { day: "Domingo", posts: 1 }
  ]
};

export default function Profile() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState("posts");

  if (!user) {
    return (
      <MainLayout>
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">
              Você precisa estar logado para ver seu perfil.
            </p>
          </CardContent>
        </Card>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Profile Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                <div className="h-24 w-24 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                  <User className="h-12 w-12 text-accent-foreground" />
                </div>
              </div>
              
              <div className="flex-1 space-y-4">
                <div>
                  <h1 className="text-2xl font-bold">{user.name}</h1>
                  <p className="text-muted-foreground">@{user.username}</p>
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground mt-2">
                    <Calendar className="h-4 w-4" />
                    <span>
                      Membro desde {formatDistanceToNow(user.joinedAt, { 
                        addSuffix: true, 
                        locale: ptBR 
                      })}
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {user.communities.map(community => (
                    <Badge key={community} variant="secondary">
                      {community}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex gap-4">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Editar perfil
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-6 w-6 text-primary mx-auto mb-2" />
              <div className="text-xl font-bold">{userStats.totalPosts}</div>
              <div className="text-sm text-muted-foreground">reflexões</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <MessageSquare className="h-6 w-6 text-primary mx-auto mb-2" />
              <div className="text-xl font-bold">{userStats.totalComments}</div>
              <div className="text-sm text-muted-foreground">discussões</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <User className="h-6 w-6 text-primary mx-auto mb-2" />
              <div className="text-xl font-bold">{userStats.communitiesJoined}</div>
              <div className="text-sm text-muted-foreground">comunidades</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="h-6 w-6 text-primary mx-auto mb-2" />
              <div className="text-xl font-bold">{userStats.averageReadTime}min</div>
              <div className="text-sm text-muted-foreground">leitura média</div>
            </CardContent>
          </Card>
        </div>

        {/* Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="posts">Minhas reflexões</TabsTrigger>
            <TabsTrigger value="activity">Atividade</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>
          
          <TabsContent value="posts" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Suas reflexões</h2>
              <Badge variant="outline">{userPosts.length} publicadas</Badge>
            </div>
            
            <div className="space-y-4">
              {userPosts.map(post => (
                <PostCard key={post.id} {...post} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="activity" className="space-y-4">
            <h2 className="text-xl font-semibold">Atividade semanal</h2>
            
            <Card>
              <CardHeader>
                <CardTitle>Reflexões por dia da semana</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {userStats.weeklyActivity.map(day => (
                    <div key={day.day} className="flex items-center space-x-3">
                      <div className="w-16 text-sm text-muted-foreground">
                        {day.day}
                      </div>
                      <div className="flex-1 bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(day.posts / 3) * 100}%` }}
                        />
                      </div>
                      <div className="text-sm font-medium w-8">
                        {day.posts}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="insights" className="space-y-4">
            <h2 className="text-xl font-semibold">Insights pessoais</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Tempo de uso consciente</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Limite diário</span>
                      <span className="text-sm font-medium">{user.dailyTimeLimit}min</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Média semanal</span>
                      <span className="text-sm font-medium">22min</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Dias dentro do limite</span>
                      <span className="text-sm font-medium">6/7</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Engajamento consciente</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Feedbacks dados</span>
                      <span className="text-sm font-medium">89</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Qualidade média</span>
                      <span className="text-sm font-medium">87%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Discussões iniciadas</span>
                      <span className="text-sm font-medium">12</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}