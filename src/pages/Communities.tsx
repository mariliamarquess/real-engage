import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { CommunityCard } from "@/components/community/CommunityCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Plus, TrendingUp, Users, MessageSquare } from "lucide-react";
import { useUser } from "@/contexts/UserContext";

const allCommunities = [
  {
    name: "Minimalismo Digital",
    description: "Reflexões sobre como simplificar nossa relação com a tecnologia e encontrar equilíbrio na era digital.",
    memberCount: 234,
    activeDiscussions: 12,
    topicsThisWeek: 8,
    tags: ["tecnologia", "minimalismo", "bem-estar", "produtividade"],
    featured: true
  },
  {
    name: "Saúde Mental e Redes",
    description: "Discussões sobre o impacto das redes sociais no bem-estar psicológico e estratégias para uso consciente.",
    memberCount: 189,
    activeDiscussions: 9,
    topicsThisWeek: 15,
    tags: ["psicologia", "saúde mental", "comportamento", "ansiedade"]
  },
  {
    name: "Relacionamentos Autênticos",
    description: "Como construir conexões verdadeiras em um mundo digital superficial e cultivar relacionamentos profundos.",
    memberCount: 156,
    activeDiscussions: 7,
    topicsThisWeek: 11,
    tags: ["relacionamentos", "autenticidade", "conexão", "empatia"]
  },
  {
    name: "Filosofia da Tecnologia",
    description: "Explorando as implicações éticas e filosóficas da tecnologia moderna em nossas vidas.",
    memberCount: 98,
    activeDiscussions: 5,
    topicsThisWeek: 6,
    tags: ["filosofia", "ética", "tecnologia", "sociedade"]
  },
  {
    name: "Mindfulness Digital",
    description: "Práticas de atenção plena aplicadas ao uso de dispositivos e plataformas digitais.",
    memberCount: 145,
    activeDiscussions: 8,
    topicsThisWeek: 9,
    tags: ["mindfulness", "meditação", "consciência", "presença"]
  },
  {
    name: "Arte e Criatividade Consciente",
    description: "Explorando a criatividade sem a pressão de métricas e algoritmos, focando no processo criativo.",
    memberCount: 112,
    activeDiscussions: 6,
    topicsThisWeek: 7,
    tags: ["arte", "criatividade", "expressão", "processo"]
  }
];

export default function Communities() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const { user } = useUser();

  const allTags = Array.from(
    new Set(allCommunities.flatMap(community => community.tags))
  ).sort();

  const filteredCommunities = allCommunities.filter(community => {
    const matchesSearch = community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         community.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = !selectedTag || community.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const joinedCommunities = allCommunities.filter(community => 
    user?.communities.includes(community.name)
  );

  const suggestedCommunities = allCommunities.filter(community => 
    !user?.communities.includes(community.name)
  );

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Comunidades</h1>
            <p className="text-muted-foreground">
              Encontre espaços para reflexão e discussão consciente
            </p>
          </div>
          <Button className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Criar comunidade</span>
          </Button>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Explorar comunidades</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar comunidades..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Filtrar por temas:</label>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={selectedTag === "" ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setSelectedTag("")}
                >
                  Todos
                </Badge>
                {allTags.map(tag => (
                  <Badge
                    key={tag}
                    variant={selectedTag === tag ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setSelectedTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">
                {allCommunities.reduce((sum, c) => sum + c.memberCount, 0)}
              </div>
              <div className="text-sm text-muted-foreground">membros ativos</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <MessageSquare className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">
                {allCommunities.reduce((sum, c) => sum + c.activeDiscussions, 0)}
              </div>
              <div className="text-sm text-muted-foreground">discussões ativas</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">
                {allCommunities.reduce((sum, c) => sum + c.topicsThisWeek, 0)}
              </div>
              <div className="text-sm text-muted-foreground">tópicos esta semana</div>
            </CardContent>
          </Card>
        </div>

        {/* Joined Communities */}
        {joinedCommunities.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Suas comunidades</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {joinedCommunities.map((community, index) => (
                <CommunityCard key={index} {...community} />
              ))}
            </div>
          </div>
        )}

        {/* All/Suggested Communities */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">
            {user ? "Descobrir novas comunidades" : "Todas as comunidades"}
          </h2>
          
          {filteredCommunities.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">
                  Nenhuma comunidade encontrada com os filtros aplicados.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCommunities.map((community, index) => (
                <CommunityCard key={index} {...community} />
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}