import { useState } from "react";
import { Bell, User, Menu, MapPin, Route, ShieldCheck, AlertTriangle, Users, Smartphone, X } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";

interface NavbarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export function Navbar({ activeView, onViewChange }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: MapPin },
    { id: 'routes', label: 'Rutas', icon: Route },
    { id: 'geofencing', label: 'Geofencing', icon: ShieldCheck },
    { id: 'alerts', label: 'Alertas', icon: AlertTriangle },
    { id: 'users', label: 'Usuarios', icon: Users },
    { id: 'devices', label: 'Dispositivos', icon: Smartphone },
  ];

  const handleMobileNavClick = (viewId: string) => {
    onViewChange(viewId);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-neutral-900 border-b border-neutral-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3">
            {/* Mobile Menu Button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden text-white hover:bg-neutral-800">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-neutral-900 border-neutral-800 text-white w-[280px]">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2 text-white">
                    <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">GPS</span>
                    </div>
                    <div>
                      <h2 className="text-white">TrackPro</h2>
                      <p className="text-neutral-400 text-xs">Sistema de Rastreo</p>
                    </div>
                  </SheetTitle>
                </SheetHeader>
                
                <div className="mt-8 space-y-2">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeView === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleMobileNavClick(item.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                          isActive
                            ? 'bg-orange-500 text-white'
                            : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="absolute bottom-8 left-4 right-4">
                  <div className="p-4 rounded-lg bg-neutral-800 border border-neutral-700">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-10 w-10 rounded-full bg-orange-500 flex items-center justify-center">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-white text-sm">Admin</p>
                        <p className="text-neutral-400 text-xs">Administrador</p>
                      </div>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">GPS</span>
              </div>
              <div className="hidden md:block">
                <h1 className="text-white">TrackPro</h1>
                <p className="text-neutral-400 text-xs">Sistema de Rastreo</p>
              </div>
            </div>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onViewChange(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    isActive
                      ? 'bg-orange-500 text-white'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative text-white hover:text-orange-500 hover:bg-neutral-800">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-orange-500 text-white border-0">
                2
              </Badge>
            </Button>

            {/* User Profile - Desktop only */}
            <div className="hidden lg:flex items-center gap-3 pl-3 border-l border-neutral-800">
              <div className="text-right">
                <p className="text-white text-sm">Admin</p>
                <p className="text-neutral-400 text-xs">Administrador</p>
              </div>
              <Button variant="ghost" size="icon" className="rounded-full bg-orange-500 hover:bg-orange-600 text-white">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}