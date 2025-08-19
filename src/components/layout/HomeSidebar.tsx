import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Brain, 
  Heart, 
  Users, 
  Leaf, 
  Book, 
  Coffee, 
  Gamepad2, 
  Music, 
  Palette,
  Lightbulb,
  Shield,
  Clock
} from "lucide-react";
import { TimeTracker } from "@/components/ui/time-tracker";
import { useUser } from "@/contexts/UserContext";
import { Link } from "react-router-dom";

const communityTopics = [
  { 
    name: "Minimalismo Digital", 
    icon: Brain, 
    count: 234, 
    color: "bg-primary/10 text-primary",
    description: "Tecnologia consciente"
  },
  { 
    name: "Saúde Mental", 
    icon: Heart, 
    count: 189, 
    color: "bg-destructive/10 text-destructive",
    description: "Bem-estar psicológico"
  },
  { 
    name: "Relacionamentos", 
    icon: Users, 
    count: 156, 
    color: "bg-accent/10 text-accent",
    description: "Conexões autênticas"
  },
  { 
    name: "Sustentabilidade", 
    icon: Leaf, 
    count: 142, 
    color: "bg-green-500/10 text-green-600",
    description: "Vida consciente"
  },
  { 
    name: "Leitura", 
    icon: Book, 
    count: 98, 
    color: "bg-blue-500/10 text-blue-600",
    description: "Conhecimento profundo"
  },
  { 
    name: "Mindfulness", 
    icon: Coffee, 
    count: 87, 
    color: "bg-orange-500/10 text-orange-600",
    description: "Presença plena"
  }
];

const quickActions = [
  { name: "Nova reflexão", icon: Lightbulb, action: "/feed" },
  { name: "Explorar comunidades", icon: Users, action: "/communities" },
  { name: "Configurar limites", icon: Shield, action: "/settings" },
  { name: "Histórico de tempo", icon: Clock, action: "/profile" }
];

export function HomeSidebar() {
  const { user } = useUser();

  return (
    <div className="w-80 space-y-6 sticky top-20 h-fit">
      {/* Time Tracker - Anti-addiction feature */}
      {user && (
        <Card className="border-primary/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center space-x-2">
              <Clock className="h-5 w-5 text-primary" />
              <span>Uso consciente</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TimeTracker 
              dailyLimit={user.dailyTimeLimit}
              onLimitReached={() => {
                console.log("Limite atingido - usuário será notificado");
              }}
            />
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Ações rápidas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {quickActions.map((action, index) => (
            <Link key={index} to={action.action}>
              <Button variant="ghost" className="w-full justify-start text-left p-3 h-auto">
                <action.icon className="h-4 w-4 mr-3 text-muted-foreground" />
                <span>{action.name}</span>
              </Button>
            </Link>
          ))}
        </CardContent>
      </Card>

      {/* Community Topics */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Tópicos em alta</CardTitle>
          <p className="text-sm text-muted-foreground">
            Comunidades ativas hoje
          </p>
        </CardHeader>
        <CardContent className="space-y-3">
          {communityTopics.map((topic, index) => (
            <div key={index} className="group cursor-pointer">
              <div 
                className={`flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors`}
              >
                <div className={`p-2 rounded-lg ${topic.color}`}>
                  <topic.icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm group-hover:text-primary transition-colors">
                      {topic.name}
                    </h4>
                    <Badge variant="secondary" className="text-xs">
                      {topic.count}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {topic.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          <Separator />
          
          <Link to="/communities">
            <Button variant="outline" className="w-full">
              Ver todas as comunidades
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* User Communities */}
      {user && user.communities.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Suas comunidades</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {user.communities.slice(0, 4).map((community, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-lg cursor-pointer transition-colors"
              >
                <span className="text-sm font-medium">{community}</span>
                <Badge variant="outline" className="text-xs">
                  Ativa
                </Badge>
              </div>
            ))}
            {user.communities.length > 4 && (
              <Button variant="ghost" size="sm" className="w-full text-xs">
                Ver mais {user.communities.length - 4}
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* Anti-addiction reminder */}
      <Card className="bg-muted/30 border-dashed">
        <CardContent className="p-4 text-center space-y-2">
          <Shield className="h-8 w-8 text-muted-foreground mx-auto" />
          <p className="text-sm text-muted-foreground">
            Lembre-se: qualidade sobre quantidade. 
          </p>
          <p className="text-xs text-muted-foreground">
            Prefira conversas profundas a scrolling infinito.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}