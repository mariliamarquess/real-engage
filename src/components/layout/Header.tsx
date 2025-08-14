import { Button } from "@/components/ui/button";
import { Clock, Settings, User, Menu, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import { useTimeTracking } from "@/contexts/TimeTrackingContext";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

export function Header() {
  const location = useLocation();
  const { user, logout } = useUser();
  const { timeSpent } = useTimeTracking();
  const minutes = Math.floor(timeSpent / 60);
  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-3">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-accent to-primary flex items-center justify-center">
            <span className="text-sm font-bold text-accent-foreground">R</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold">Reflectis</h1>
            <p className="text-xs text-muted-foreground">Rede consciente</p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/feed">
            <Button 
              variant={isActive('/feed') ? 'default' : 'ghost'} 
              size="sm"
            >
              Feed
            </Button>
          </Link>
          <Link to="/communities">
            <Button 
              variant={isActive('/communities') ? 'default' : 'ghost'} 
              size="sm"
            >
              Comunidades
            </Button>
          </Link>
          <Link to="/about">
            <Button 
              variant={isActive('/about') ? 'default' : 'ghost'} 
              size="sm"
            >
              Sobre
            </Button>
          </Link>
        </nav>

        <div className="flex items-center space-x-3">
          {user && (
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{minutes}min hoje</span>
            </div>
          )}
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span className="hidden md:inline">{user.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>Meu perfil</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="flex items-center space-x-2">
                    <Settings className="h-4 w-4" />
                    <span>Configurações</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button size="sm">Entrar</Button>
          )}
        </div>
      </div>
    </header>
  );
}