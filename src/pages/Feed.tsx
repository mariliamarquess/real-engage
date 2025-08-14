import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { PostCard } from "@/components/post/PostCard";
import { PostForm } from "@/components/forms/PostForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RefreshCw, Filter, TrendingUp, Clock, Users } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { useToast } from "@/hooks/use-toast";

const samplePosts = [
  {
    id: "1",
    author: "Maria Silva",
    content: "Comecei a praticar o 'tempo de tela consciente' - definindo momentos específicos para checar mensagens ao invés de verificar constantemente. A diferença na minha ansiedade tem sido notável. Alguém mais experimenta com rotinas intencionais de tecnologia?",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    community: "Minimalismo Digital",
    readTime: 2,
    edited: false
  },
  {
    id: "2",
    author: "João Santos",
    content: "Reflexão do dia: percebi que quando estou entediado, meu primeiro impulso é pegar o celular. Mas e se usássemos esses momentos de tédio para apenas... estar presente? O tédio pode ser um portal para a criatividade e autoconhecimento.",
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
    community: "Mindfulness Digital",
    readTime: 1,
    edited: true,
    editHistory: 1
  },
  {
    id: "3",
    author: "Ana Costa",
    content: "Li um estudo interessante sobre como as notificações fragmentam nossa atenção. Decidi desativar todas as notificações não essenciais. O silêncio mental que isso criou é profundo. Recomendo experimentar por uma semana e observar as mudanças internas.",
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    community: "Saúde Mental e Redes",
    readTime: 3,
    edited: false
  },
  {
    id: "4",
    author: "Carlos Oliveira",
    content: "Conversei hoje com um amigo pessoalmente por 2 horas, sem celulares à vista. A qualidade da conexão foi incomparável. Quando foi a última vez que você teve uma conversa verdadeiramente presente com alguém?",
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
    community: "Relacionamentos Autênticos",
    readTime: 1,
    edited: false
  }
];

export default function Feed() {
  const [posts, setPosts] = useState(samplePosts);
  const [sortBy, setSortBy] = useState("recent");
  const [filterCommunity, setFilterCommunity] = useState("all");
  const [showPostForm, setShowPostForm] = useState(false);
  const { user } = useUser();
  const { toast } = useToast();

  const handleNewPost = (newPost: { content: string; community: string; readTime: number }) => {
    const post = {
      id: Date.now().toString(),
      author: user?.name || "Usuário",
      content: newPost.content,
      createdAt: new Date(),
      community: newPost.community,
      readTime: newPost.readTime,
      edited: false
    };

    setPosts([post, ...posts]);
    setShowPostForm(false);
    
    toast({
      title: "Reflexão publicada!",
      description: "Sua reflexão foi compartilhada com a comunidade.",
    });
  };

  const filteredPosts = posts.filter(post => {
    if (filterCommunity === "all") return true;
    if (filterCommunity === "joined") {
      return user?.communities.includes(post.community);
    }
    return post.community === filterCommunity;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case "recent":
        return b.createdAt.getTime() - a.createdAt.getTime();
      case "oldest":
        return a.createdAt.getTime() - b.createdAt.getTime();
      case "readTime":
        return a.readTime - b.readTime;
      default:
        return 0;
    }
  });

  const allCommunities = Array.from(new Set(posts.map(post => post.community)));

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Feed de Reflexões</h1>
            <p className="text-muted-foreground">
              Conteúdo consciente das suas comunidades
            </p>
          </div>
          
          {user && (
            <Button 
              onClick={() => setShowPostForm(!showPostForm)}
              className="flex items-center space-x-2"
            >
              <TrendingUp className="h-4 w-4" />
              <span>Nova reflexão</span>
            </Button>
          )}
        </div>

        {/* Post Form */}
        {showPostForm && user && (
          <PostForm onSubmit={handleNewPost} />
        )}

        {/* Filters and Sorting */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>Filtros e ordenação</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium mb-2 block">Comunidade</label>
                <Select value={filterCommunity} onValueChange={setFilterCommunity}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as comunidades</SelectItem>
                    {user && (
                      <SelectItem value="joined">Minhas comunidades</SelectItem>
                    )}
                    {allCommunities.map(community => (
                      <SelectItem key={community} value={community}>
                        {community}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex-1">
                <label className="text-sm font-medium mb-2 block">Ordenar por</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Mais recentes</SelectItem>
                    <SelectItem value="oldest">Mais antigas</SelectItem>
                    <SelectItem value="readTime">Tempo de leitura</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feed Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-6 w-6 text-primary mx-auto mb-2" />
              <div className="text-lg font-semibold">{sortedPosts.length}</div>
              <div className="text-sm text-muted-foreground">reflexões disponíveis</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="h-6 w-6 text-primary mx-auto mb-2" />
              <div className="text-lg font-semibold">
                {sortedPosts.reduce((sum, post) => sum + post.readTime, 0)}min
              </div>
              <div className="text-sm text-muted-foreground">tempo total de leitura</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="h-6 w-6 text-primary mx-auto mb-2" />
              <div className="text-lg font-semibold">
                {new Set(sortedPosts.map(post => post.author)).size}
              </div>
              <div className="text-sm text-muted-foreground">autores únicos</div>
            </CardContent>
          </Card>
        </div>

        {/* Posts Feed */}
        <div className="space-y-6">
          {sortedPosts.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">
                  Nenhuma reflexão encontrada com os filtros aplicados.
                </p>
                {!user && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Faça login para ver conteúdo personalizado das suas comunidades.
                  </p>
                )}
              </CardContent>
            </Card>
          ) : (
            sortedPosts.map(post => (
              <PostCard key={post.id} {...post} />
            ))
          )}
        </div>

        {/* Load More */}
        {sortedPosts.length > 0 && (
          <div className="text-center">
            <Button variant="outline" className="flex items-center space-x-2">
              <RefreshCw className="h-4 w-4" />
              <span>Carregar mais reflexões</span>
            </Button>
          </div>
        )}
      </div>
    </MainLayout>
  );
}