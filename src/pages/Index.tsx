import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/layout/Header";
import { HomeSidebar } from "@/components/layout/HomeSidebar";
import { PostCard } from "@/components/post/PostCard";
import { PostForm } from "@/components/forms/PostForm";
import { useUser } from "@/contexts/UserContext";
import { useTimeTracking } from "@/contexts/TimeTrackingContext";
import { Brain, Users, TrendingUp, MessageCircle, AlertCircle, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const Index = () => {
  const { user } = useUser();
  const { isLimitReached } = useTimeTracking();

  // Sample posts data - limited to prevent infinite scroll addiction
  const feedPosts = [
    {
      id: "1",
      author: "Ana Silva",
      content: "Passei os últimos 30 dias limitando meu uso de redes sociais a 20 minutos por dia. O interessante é que, ao invés de me sentir desconectada, comecei a valorizar muito mais as conversas presenciais e os momentos de silêncio. Alguém mais teve experiências similares com limites de tempo?",
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      community: "Minimalismo Digital",
      readTime: 3,
      edited: true,
      editHistory: 1
    },
    {
      id: "2", 
      author: "Carlos Santos",
      content: "Refleti hoje sobre como o algoritmo das redes tradicionais nos mantém em bolhas. Aqui, sem algoritmo viciante, sinto que estou realmente escolhendo o que consumir. É uma sensação estranha no início, mas libertadora. Estamos realmente preparados para essa responsabilidade de curadoria consciente?",
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
      community: "Saúde Mental e Redes",
      readTime: 2
    },
    {
      id: "3",
      author: "Maria Consciência",
      content: "Hoje experimentei desligar as notificações por 4 horas e foi incrível como minha capacidade de concentração voltou gradualmente. Consegui ler 40 páginas de um livro sem interrupção. Pequenos passos, grandes mudanças.",
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
      community: "Mindfulness",
      readTime: 1
    },
    {
      id: "4",
      author: "João Reflexivo",
      content: "Pergunta para reflexão: vocês acham que nossa necessidade de validação instantânea nas redes está relacionada com nossa dificuldade de estar sozinhos em silêncio? Notei que quando não tenho acesso ao celular, inicialmente sinto ansiedade, mas depois vem uma paz que esqueci que existia.",
      createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
      community: "Saúde Mental e Redes",
      readTime: 2
    },
    {
      id: "5",
      author: "Laura Minimalista",
      content: "Fiz uma limpeza no meu feed e nas minhas redes. Deixei apenas conteúdos que realmente agregam valor à minha vida. O resultado? Menos ansiedade, mais foco, e principalmente: mais tempo para o que realmente importa. Recomendo o exercício!",
      createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
      community: "Minimalismo Digital",
      readTime: 2
    }
  ];

  // Show limited content to prevent infinite scrolling addiction
  const visiblePosts = feedPosts.slice(0, 5); // Maximum 5 posts to encourage conscious consumption

  if (!user) {
    // Landing page for non-authenticated users
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center space-y-8">
          <div className="max-w-2xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full text-sm mb-6">
              <Brain className="h-4 w-4 text-primary" />
              <span className="text-primary font-medium">Rede social anti-dependência</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Reflectis
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Uma plataforma que inverte a lógica das redes sociais tradicionais. 
              Sem curtidas públicas, sem feeds infinitos, sem algoritmos viciantes.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="px-8 bg-gradient-to-r from-primary to-accent">
                Começar reflexão
              </Button>
              <Button variant="outline" size="lg" className="px-8">
                Saber mais
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="flex gap-6">
          
          {/* Left Sidebar */}
          <HomeSidebar />
          
          {/* Main Feed */}
          <div className="flex-1 max-w-2xl space-y-6">
            
            {/* Welcome & Post Creation */}
            <Card className="bg-gradient-to-r from-primary/5 via-accent/5 to-secondary/5 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <span className="text-lg font-bold text-primary-foreground">
                      {user.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">Olá, {user.name}!</h2>
                    <p className="text-sm text-muted-foreground">
                      O que está refletindo hoje?
                    </p>
                  </div>
                </div>
                
                <PostForm onSubmit={(content) => {
                  console.log("Nova reflexão:", content);
                }} />
              </CardContent>
            </Card>

            {/* Anti-addiction reminder */}
            {isLimitReached && (
              <Card className="border-destructive/50 bg-destructive/5">
                <CardContent className="p-4 flex items-center space-x-3">
                  <AlertCircle className="h-5 w-5 text-destructive" />
                  <div>
                    <p className="font-medium text-destructive">Limite diário atingido</p>
                    <p className="text-sm text-muted-foreground">
                      Que tal uma pausa para reflexão offline?
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Feed Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <h2 className="text-xl font-semibold">Feed consciente</h2>
                <Badge variant="secondary" className="text-xs">
                  Limitado a 5 posts
                </Badge>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <TrendingUp className="h-4 w-4" />
                <span>Ordenado cronologicamente</span>
              </div>
            </div>

            {/* Feed Posts */}
            <div className="space-y-4">
              {visiblePosts.map((post) => (
                <PostCard key={post.id} {...post} />
              ))}
            </div>

            {/* Conscious Consumption Message - No "Load More" */}
            <Card className="border-dashed bg-muted/30">
              <CardContent className="p-6 text-center space-y-3">
                <Brain className="h-8 w-8 text-muted-foreground mx-auto" />
                <h3 className="font-medium">Fim do feed consciente</h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  Você viu todas as reflexões de hoje. Que tal processar o que leu, 
                  ou explorar uma comunidade específica?
                </p>
                <div className="flex flex-col sm:flex-row gap-2 justify-center pt-2">
                  <Button variant="outline" size="sm">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Explorar comunidades
                  </Button>
                  <Button variant="outline" size="sm">
                    <Users className="h-4 w-4 mr-2" />
                    Ver perfil
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar - Empty for now, can be used for additional features */}
          <div className="w-64 hidden xl:block">
            <div className="sticky top-20 space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Estatísticas pessoais</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Reflexões postadas</span>
                    <Badge variant="outline">12</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Comunidades</span>
                    <Badge variant="outline">{user.communities.length}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Dias consecutivos</span>
                    <Badge variant="outline">7</Badge>
                  </div>
                  <Separator />
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">
                      Uso consciente está ajudando sua saúde mental
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
