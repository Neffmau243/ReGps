import { useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { User, Mail, Edit, Trash2, UserPlus, Search, ShieldCheck } from "lucide-react";

interface UserType {
  id: string;
  name: string;
  email: string;
  role: "Administrador" | "Empleado";
  status: "Activo" | "Inactivo";
  deviceId: string;
  lastActivity: string;
}

const mockUsers: UserType[] = [
  {
    id: "1",
    name: "Administrador",
    email: "admin@regps.com",
    role: "Administrador",
    status: "Activo",
    deviceId: "#ID: #1",
    lastActivity: "Sin actividad reciente"
  },
  {
    id: "2",
    name: "Juan",
    email: "juan@regps.com",
    role: "Empleado",
    status: "Activo",
    deviceId: "#ID: #2",
    lastActivity: "Sin actividad reciente"
  },
  {
    id: "3",
    name: "María",
    email: "maria@regps.com",
    role: "Empleado",
    status: "Activo",
    deviceId: "#ID: #3",
    lastActivity: "Sin actividad reciente"
  }
];

export function Users() {
  const [users] = useState<UserType[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("Todos");
  const [filterStatus, setFilterStatus] = useState("Estado");

  const activeUsers = users.filter(u => u.status === "Activo").length;
  const adminUsers = users.filter(u => u.role === "Administrador").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-white mb-2">Usuarios</h2>
          <p className="text-neutral-400">{users.length} registros</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              <UserPlus className="mr-2 h-4 w-4" />
              Nuevo
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-neutral-900 border-neutral-800 text-white">
            <DialogHeader>
              <DialogTitle>Crear Nuevo Usuario</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <label className="text-neutral-400 mb-2 block">Nombre</label>
                <Input 
                  placeholder="Nombre completo"
                  className="bg-black border-neutral-800 text-white"
                />
              </div>
              <div>
                <label className="text-neutral-400 mb-2 block">Email</label>
                <Input 
                  type="email"
                  placeholder="usuario@email.com"
                  className="bg-black border-neutral-800 text-white"
                />
              </div>
              <div>
                <label className="text-neutral-400 mb-2 block">Rol</label>
                <Select defaultValue="Empleado">
                  <SelectTrigger className="bg-black border-neutral-800 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-900 border-neutral-800">
                    <SelectItem value="Administrador">Administrador</SelectItem>
                    <SelectItem value="Empleado">Empleado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-neutral-400 mb-2 block">Contraseña</label>
                <Input 
                  type="password"
                  placeholder="••••••••"
                  className="bg-black border-neutral-800 text-white"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white">
                Crear Usuario
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="bg-neutral-900 border-neutral-800 hover:border-orange-500/50 transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-neutral-400 mb-1">Activos</p>
                  <h3 className="text-white">{activeUsers}</h3>
                </div>
                <div className="h-12 w-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
                  <User className="h-6 w-6 text-orange-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-neutral-900 border-neutral-800 hover:border-orange-500/50 transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-neutral-400 mb-1">Admins</p>
                  <h3 className="text-white">{adminUsers}</h3>
                </div>
                <div className="h-12 w-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
                  <ShieldCheck className="h-6 w-6 text-orange-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="bg-neutral-900 border-neutral-800">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <Input
                  placeholder="Buscar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-black border-neutral-800 text-white placeholder:text-neutral-400 pl-10"
                />
              </div>
              
              <Select value={filterRole} onValueChange={setFilterRole}>
                <SelectTrigger className="w-full md:w-[150px] bg-black border-neutral-800 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-neutral-900 border-neutral-800">
                  <SelectItem value="Todos">Todos</SelectItem>
                  <SelectItem value="Administrador">Administrador</SelectItem>
                  <SelectItem value="Empleado">Empleado</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full md:w-[150px] bg-black border-neutral-800 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-neutral-900 border-neutral-800">
                  <SelectItem value="Estado">Estado</SelectItem>
                  <SelectItem value="Activo">Activo</SelectItem>
                  <SelectItem value="Inactivo">Inactivo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Users List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-3"
      >
        {users.map((user, index) => (
          <Card 
            key={user.id} 
            className="bg-neutral-900 border-neutral-800 hover:border-orange-500 transition-all cursor-pointer"
          >
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4 flex-1">
                  <div className="h-12 w-12 rounded-full bg-orange-500/10 flex items-center justify-center">
                    <User className="h-6 w-6 text-orange-500" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="text-white">{user.name}</h4>
                      <Badge 
                        className={`${
                          user.role === "Administrador" 
                            ? "bg-orange-500/20 text-orange-400 border-orange-500/30" 
                            : "bg-green-500/20 text-green-400 border-green-500/30"
                        }`}
                      >
                        {user.role}
                      </Badge>
                      <Badge 
                        className={`${
                          user.status === "Activo" 
                            ? "bg-green-500/20 text-green-400 border-green-500/30" 
                            : "bg-neutral-600/20 text-neutral-400 border-neutral-600/30"
                        }`}
                      >
                        {user.status}
                      </Badge>
                    </div>
                    
                    <div className="flex flex-col gap-1 text-sm text-neutral-400">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <span>{user.email}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span>{user.deviceId}</span>
                        <span>•</span>
                        <span>{user.lastActivity}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="rounded-full bg-neutral-800 text-white hover:bg-orange-500"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="rounded-full bg-neutral-800 text-white hover:bg-orange-500"
                  >
                    <ShieldCheck className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="rounded-full bg-neutral-800 text-red-400 hover:bg-red-500/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>
    </div>
  );
}
