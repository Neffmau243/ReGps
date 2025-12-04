import { useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Smartphone, MapPin, Edit, Trash2, Plus, Search } from "lucide-react";

interface DeviceType {
  id: string;
  name: string;
  imei: string;
  brand: string;
  owner: string;
  registrationDate: string;
  status: "Activo" | "Inactivo";
  highlighted?: boolean;
}

const mockDevices: DeviceType[] = [
  {
    id: "1",
    name: "GPS Tracker Proaztazd",
    imei: "IMEI: 123456789012345",
    brand: "Marca: TechGPS",
    owner: "Juan Pérez",
    registrationDate: "17/11/2025",
    status: "Activo",
    highlighted: true
  },
  {
    id: "2",
    name: "GPS Tracker Lite",
    imei: "IMEI: 987654321098765",
    brand: "Marca: TechGPS",
    owner: "Juan Pérez",
    registrationDate: "17/11/2025",
    status: "Activo"
  },
  {
    id: "3",
    name: "GPS Tracker Pro",
    imei: "IMEI: 188380741960220",
    brand: "Marca: TechGPS",
    owner: "Juan Pérez",
    registrationDate: "12/11/2025",
    status: "Inactivo"
  },
  {
    id: "4",
    name: "zzzamsing",
    imei: "IMEI: 123456789001",
    brand: "Marca: samsung",
    owner: "napdoll",
    registrationDate: "26/11/2025",
    status: "Activo"
  }
];

export function Devices() {
  const [devices] = useState<DeviceType[]>(mockDevices);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("Todos");

  const activeDevices = devices.filter(d => d.status === "Activo").length;
  const inactiveDevices = devices.filter(d => d.status === "Inactivo").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-white mb-2">Dispositivos GPS</h2>
          <p className="text-neutral-400">{devices.length} registrados</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              <Plus className="mr-2 h-4 w-4" />
              Nuevo
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-neutral-900 border-neutral-800 text-white">
            <DialogHeader>
              <DialogTitle>Registrar Nuevo Dispositivo</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <label className="text-neutral-400 mb-2 block">Nombre del dispositivo</label>
                <Input 
                  placeholder="Ej: GPS Tracker 01"
                  className="bg-black border-neutral-800 text-white"
                />
              </div>
              <div>
                <label className="text-neutral-400 mb-2 block">IMEI</label>
                <Input 
                  placeholder="123456789012345"
                  className="bg-black border-neutral-800 text-white"
                />
              </div>
              <div>
                <label className="text-neutral-400 mb-2 block">Marca</label>
                <Input 
                  placeholder="Ej: TechGPS"
                  className="bg-black border-neutral-800 text-white"
                />
              </div>
              <div>
                <label className="text-neutral-400 mb-2 block">Propietario</label>
                <Select>
                  <SelectTrigger className="bg-black border-neutral-800 text-white">
                    <SelectValue placeholder="Seleccionar usuario" />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-900 border-neutral-800">
                    <SelectItem value="1">Juan Pérez</SelectItem>
                    <SelectItem value="2">María García</SelectItem>
                    <SelectItem value="3">Carlos López</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-2">
              <Button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white">
                Registrar Dispositivo
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
                  <h3 className="text-white">{activeDevices}</h3>
                </div>
                <div className="h-12 w-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
                  <Smartphone className="h-6 w-6 text-orange-500" />
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
                  <p className="text-neutral-400 mb-1">Mantenimiento</p>
                  <h3 className="text-white">{inactiveDevices}</h3>
                </div>
                <div className="h-12 w-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
                  <Smartphone className="h-6 w-6 text-orange-500" />
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
              
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full md:w-[150px] bg-black border-neutral-800 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-neutral-900 border-neutral-800">
                  <SelectItem value="Todos">Todos</SelectItem>
                  <SelectItem value="Activo">Activo</SelectItem>
                  <SelectItem value="Inactivo">Inactivo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Devices Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {devices.map((device, index) => (
          <Card 
            key={device.id} 
            className={`bg-neutral-900 border-neutral-800 hover:border-orange-500 transition-all ${
              device.highlighted ? 'ring-2 ring-orange-500/50' : ''
            }`}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
                    <Smartphone className="h-6 w-6 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="text-white mb-1">{device.name}</h4>
                    <Badge 
                      className={`${
                        device.status === "Activo" 
                          ? "bg-green-500/20 text-green-400 border-green-500/30" 
                          : "bg-red-500/20 text-red-400 border-red-500/30"
                      }`}
                    >
                      {device.status}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm text-neutral-400 mb-4">
                <p>{device.imei}</p>
                <p>{device.brand}</p>
                <p>{device.owner}</p>
                <p>{device.registrationDate}</p>
              </div>

              <div className="flex gap-2 pt-4 border-t border-neutral-800">
                <Button
                  size="icon"
                  variant="ghost"
                  className="flex-1 bg-neutral-800 text-white hover:bg-orange-500"
                >
                  <MapPin className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="flex-1 bg-neutral-800 text-white hover:bg-orange-500"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="flex-1 bg-neutral-800 text-red-400 hover:bg-red-500/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>
    </div>
  );
}
