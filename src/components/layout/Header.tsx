import { Button } from "@/components/ui/button";
import { Clock, Settings, User } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-accent to-primary flex items-center justify-center">
              <span className="text-sm font-bold text-accent-foreground">R</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold">Reflectis</h1>
              <p className="text-xs text-muted-foreground">Rede consciente</p>
            </div>
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <Button variant="ghost" size="sm">Comunidades</Button>
          <Button variant="ghost" size="sm">Reflexões</Button>
          <Button variant="ghost" size="sm">Sobre</Button>
        </nav>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>12min hoje</span>
          </div>
          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <User className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}