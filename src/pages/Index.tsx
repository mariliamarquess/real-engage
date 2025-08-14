import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/layout/Header";
import { TimeTracker } from "@/components/ui/time-tracker";
import { CommunityCard } from "@/components/community/CommunityCard";
import { PostCard } from "@/components/post/PostCard";
import { Brain, Heart, Users, Clock, Shield, Zap } from "lucide-react";

const Index = () => {
  const featuredCommunities = [
    {
      name: "Minimalismo Digital",
      description: "Reflexões sobre como simplificar nossa relação com a tecnologia e encontrar equilíbrio.",
      memberCount: 234,
      activeDiscussions: 12,
      topicsThisWeek: 8,
      tags: ["tecnologia", "minimalismo", "bem-estar"],
      featured: true
    },
    {
      name: "Saúde Mental e Redes",
      description: "Discussões sobre o impacto das redes sociais no bem-estar psicológico.",
      memberCount: 189,
      activeDiscussions: 9,
      topicsThisWeek: 15,
      tags: ["psicologia", "saúde mental", "comportamento"]
    },
    {
      name: "Relacionamentos Autênticos",
      description: "Como construir conexões verdadeiras em um mundo digital superficial.",
      memberCount: 156,
      activeDiscussions: 7,
      topicsThisWeek: 11,
      tags: ["relacionamentos", "autenticidade", "conexão"]
    }
  ];

  const recentPosts = [
    {
      id: "1",
      author: "Ana Silva",
      content: "Passei os últimos 30 dias limitando meu uso de redes sociais a 20 minutos por dia. O interessante é que, ao invés de me sentir desconectada, comecei a valorizar muito mais as conversas presenciais e os momentos de silêncio. Alguém mais teve experiências similares com limites de tempo?",
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      community: "Minimalismo Digital",
      readTime: 3,
      edited: true,
      editHistory: 1
    },
    {
      id: "2", 
      author: "Carlos Santos",
      content: "Refleti hoje sobre como o algoritmo das redes tradicionais nos mantém em bolhas. Aqui, sem algoritmo viciante, sinto que estou realmente escolhendo o que consumir. É uma sensação estranha no início, mas libertadora. Estamos realmente preparados para essa responsabilidade de curadoria consciente?",
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      community: "Saúde Mental e Redes",
      readTime: 2
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center space-x-2 bg-accent/20 px-4 py-2 rounded-full text-sm">
            <Brain className="h-4 w-4 text-accent-foreground" />
            <span className="text-accent-foreground">Rede social antidependência</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Reflectis
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Uma plataforma que inverte a lógica das redes sociais tradicionais. 
            Sem curtidas públicas, sem feeds infinitos, sem algoritmos viciantes. 
            Apenas reflexão consciente e conexões autênticas.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="lg" className="px-8">
              Começar reflexão
            </Button>
            <Button variant="outline" size="lg" className="px-8">
              Saber mais
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Como funciona diferente
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Heart className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">Sem curtidas públicas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  O engajamento é invisível ao público. O foco está no conteúdo, 
                  não na popularidade ou validação externa.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Clock className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">Limites conscientes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Você define seus próprios limites de tempo. A plataforma te ajuda 
                  a manter uma relação saudável com a tecnologia.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">Comunidades específicas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Foco em nichos e interesses genuínos, não em alcance massivo. 
                  Qualidade sobre quantidade sempre.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">Imutabilidade reflexiva</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Comentários podem ser editados (com histórico visível), mas não 
                  deletados. Responsabilidade pelas próprias palavras.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Zap className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">Feedback dual</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Avalie qualidade e relevância do conteúdo de forma construtiva, 
                  promovendo discussões mais profundas.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Brain className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">Sem algoritmo viciante</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Você escolhe o que vê. Sem feeds infinitos, sem notificações 
                  constantes. Apenas conteúdo com propósito.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Time Tracker Demo */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <h3 className="text-xl font-semibold text-center mb-6">
            Monitore seu tempo conscientemente
          </h3>
          <TimeTracker 
            dailyLimit={30} 
            onLimitReached={() => console.log("Limite atingido!")}
          />
        </div>
      </section>

      {/* Communities Preview */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Comunidades em destaque
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {featuredCommunities.map((community, index) => (
              <CommunityCard key={index} {...community} />
            ))}
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Reflexões recentes
          </h2>
          
          <div className="space-y-6">
            {recentPosts.map((post) => (
              <PostCard key={post.id} {...post} />
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button variant="outline">
              Ver todas as reflexões
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 bg-primary/5">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold">
            Pronto para uma experiência consciente?
          </h2>
          <p className="text-muted-foreground">
            Junte-se a uma comunidade que valoriza reflexão, autenticidade e 
            relacionamentos genuínos em vez de métricas vazias.
          </p>
          <Button size="lg" className="px-12">
            Começar agora
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
