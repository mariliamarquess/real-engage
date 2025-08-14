import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Settings as SettingsIcon, 
  Clock, 
  Bell, 
  Shield, 
  User, 
  Moon, 
  Sun,
  AlertTriangle,
  Save,
  RefreshCw 
} from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { useTimeTracking } from "@/contexts/TimeTrackingContext";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const { user, updateUser } = useUser();
  const { dailyLimit, updateDailyLimit, resetDaily } = useTimeTracking();
  const { toast } = useToast();
  
  const [settings, setSettings] = useState({
    dailyTimeLimit: dailyLimit,
    enableTimeWarnings: true,
    enableReflectionPrompts: true,
    showFeedbackStats: false,
    enableDarkMode: false,
    enableNotifications: true,
    enableWeeklyDigest: true,
    autoLogout: false,
    hideProfilePictures: true,
    limitScrolling: true,
    mindfulPauses: true
  });

  const [profile, setProfile] = useState({
    name: user?.name || "",
    username: user?.username || "",
    email: user?.email || ""
  });

  const handleSaveSettings = () => {
    updateDailyLimit(settings.dailyTimeLimit);
    updateUser({ dailyTimeLimit: settings.dailyTimeLimit });
    
    toast({
      title: "Configurações salvas!",
      description: "Suas preferências foram atualizadas com sucesso.",
    });
  };

  const handleSaveProfile = () => {
    updateUser({
      name: profile.name,
      username: profile.username,
      email: profile.email
    });
    
    toast({
      title: "Perfil atualizado!",
      description: "Suas informações pessoais foram salvas.",
    });
  };

  const handleResetDailyTime = () => {
    resetDaily();
    toast({
      title: "Contador resetado!",
      description: "O tempo de uso diário foi reiniciado.",
    });
  };

  if (!user) {
    return (
      <MainLayout>
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">
              Você precisa estar logado para acessar as configurações.
            </p>
          </CardContent>
        </Card>
      </MainLayout>
    );
  }

  return (
    <MainLayout showTimeTracker={false}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-3">
          <SettingsIcon className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Configurações</h1>
            <p className="text-muted-foreground">
              Personalize sua experiência consciente
            </p>
          </div>
        </div>

        <Tabs defaultValue="time" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="time">Tempo</TabsTrigger>
            <TabsTrigger value="profile">Perfil</TabsTrigger>
            <TabsTrigger value="experience">Experiência</TabsTrigger>
            <TabsTrigger value="privacy">Privacidade</TabsTrigger>
          </TabsList>

          {/* Time Management */}
          <TabsContent value="time" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Gestão de tempo consciente</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label>Limite diário de uso (minutos)</Label>
                  <div className="space-y-3">
                    <Slider
                      value={[settings.dailyTimeLimit]}
                      onValueChange={([value]) => 
                        setSettings(prev => ({ ...prev, dailyTimeLimit: value }))
                      }
                      min={5}
                      max={120}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>5min</span>
                      <Badge variant="outline">
                        {settings.dailyTimeLimit} minutos
                      </Badge>
                      <span>120min</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Avisos de tempo</Label>
                    <p className="text-sm text-muted-foreground">
                      Receba notificações quando estiver próximo do limite
                    </p>
                  </div>
                  <Switch
                    checked={settings.enableTimeWarnings}
                    onCheckedChange={(checked) =>
                      setSettings(prev => ({ ...prev, enableTimeWarnings: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Pausas conscientes</Label>
                    <p className="text-sm text-muted-foreground">
                      Prompts periódicos para reflexão e presença
                    </p>
                  </div>
                  <Switch
                    checked={settings.mindfulPauses}
                    onCheckedChange={(checked) =>
                      setSettings(prev => ({ ...prev, mindfulPauses: checked }))
                    }
                  />
                </div>

                <div className="flex space-x-2">
                  <Button onClick={handleResetDailyTime} variant="outline" size="sm">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Resetar contador diário
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Settings */}
          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Informações pessoais</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome completo</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="username">Nome de usuário</Label>
                    <Input
                      id="username"
                      value={profile.username}
                      onChange={(e) => setProfile(prev => ({ ...prev, username: e.target.value }))}
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Label>Comunidades participantes</Label>
                  <div className="flex flex-wrap gap-2">
                    {user.communities.map(community => (
                      <Badge key={community} variant="secondary">
                        {community}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button onClick={handleSaveProfile}>
                  <Save className="h-4 w-4 mr-2" />
                  Salvar perfil
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Experience Settings */}
          <TabsContent value="experience" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Moon className="h-5 w-5" />
                  <span>Experiência de uso</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Modo escuro</Label>
                    <p className="text-sm text-muted-foreground">
                      Tema mais suave para os olhos
                    </p>
                  </div>
                  <Switch
                    checked={settings.enableDarkMode}
                    onCheckedChange={(checked) =>
                      setSettings(prev => ({ ...prev, enableDarkMode: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Prompts de reflexão</Label>
                    <p className="text-sm text-muted-foreground">
                      Receba perguntas para autoconhecimento
                    </p>
                  </div>
                  <Switch
                    checked={settings.enableReflectionPrompts}
                    onCheckedChange={(checked) =>
                      setSettings(prev => ({ ...prev, enableReflectionPrompts: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Limitar rolagem</Label>
                    <p className="text-sm text-muted-foreground">
                      Evita feeds infinitos e navegação compulsiva
                    </p>
                  </div>
                  <Switch
                    checked={settings.limitScrolling}
                    onCheckedChange={(checked) =>
                      setSettings(prev => ({ ...prev, limitScrolling: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Ocultar fotos de perfil</Label>
                    <p className="text-sm text-muted-foreground">
                      Foca no conteúdo, não na aparência
                    </p>
                  </div>
                  <Switch
                    checked={settings.hideProfilePictures}
                    onCheckedChange={(checked) =>
                      setSettings(prev => ({ ...prev, hideProfilePictures: checked }))
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Settings */}
          <TabsContent value="privacy" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Privacidade e notificações</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Mostrar estatísticas de feedback</Label>
                    <p className="text-sm text-muted-foreground">
                      Exibe suas métricas de qualidade e relevância
                    </p>
                  </div>
                  <Switch
                    checked={settings.showFeedbackStats}
                    onCheckedChange={(checked) =>
                      setSettings(prev => ({ ...prev, showFeedbackStats: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Notificações</Label>
                    <p className="text-sm text-muted-foreground">
                      Receba atualizações importantes
                    </p>
                  </div>
                  <Switch
                    checked={settings.enableNotifications}
                    onCheckedChange={(checked) =>
                      setSettings(prev => ({ ...prev, enableNotifications: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Resumo semanal</Label>
                    <p className="text-sm text-muted-foreground">
                      Insights sobre seus hábitos digitais
                    </p>
                  </div>
                  <Switch
                    checked={settings.enableWeeklyDigest}
                    onCheckedChange={(checked) =>
                      setSettings(prev => ({ ...prev, enableWeeklyDigest: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Logout automático</Label>
                    <p className="text-sm text-muted-foreground">
                      Sair automaticamente após o limite diário
                    </p>
                  </div>
                  <Switch
                    checked={settings.autoLogout}
                    onCheckedChange={(checked) =>
                      setSettings(prev => ({ ...prev, autoLogout: checked }))
                    }
                  />
                </div>

                <Separator />

                <Card className="border-destructive/20 bg-destructive/5">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Zona de perigo</p>
                        <p className="text-sm text-muted-foreground">
                          Ações irreversíveis que afetam permanentemente sua conta.
                        </p>
                        <Button variant="destructive" size="sm">
                          Desativar conta
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSaveSettings} size="lg">
            <Save className="h-4 w-4 mr-2" />
            Salvar configurações
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}