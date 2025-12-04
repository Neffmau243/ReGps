import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Plus, 
  MapPin, 
  Trash2, 
  Edit, 
  Circle,
  Square,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { motion } from 'motion/react';

interface GeofenceZone {
  id: string;
  name: string;
  type: 'checkpoint' | 'polygon' | 'circle';
  status: 'active' | 'inactive';
  shape: 'circle' | 'polygon';
  radius?: string;
  schedule?: string;
  description?: string;
}

const mockZones: GeofenceZone[] = [
  {
    id: '1',
    name: 'Oficina Central',
    type: 'checkpoint',
    status: 'active',
    shape: 'circle',
    radius: '150m',
    schedule: '08:00:00 - 18:00:00',
    description: 'Zona de oficina principal'
  },
  {
    id: '2',
    name: 'Ruta Norte',
    type: 'polygon',
    status: 'active',
    shape: 'polygon',
    description: 'Polígono'
  },
  {
    id: '3',
    name: 'zzzzz',
    type: 'checkpoint',
    status: 'active',
    shape: 'circle',
    radius: '100m',
    description: 'asd'
  }
];

export function Geofencing() {
  const [zones, setZones] = useState<GeofenceZone[]>(mockZones);
  const [selectedZone, setSelectedZone] = useState<GeofenceZone | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('Todas');
  const [filterStatus, setFilterStatus] = useState('Estado');

  const handleDeleteZone = (id: string) => {
    setZones(zones.filter(zone => zone.id !== id));
  };

  const filteredZones = zones.filter(zone => {
    const matchesSearch = zone.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'Todas' || 
      (filterType === 'checkpoint' && zone.type === 'checkpoint') ||
      (filterType === 'polygon' && zone.type === 'polygon');
    const matchesStatus = filterStatus === 'Estado' ||
      (filterStatus === 'active' && zone.status === 'active') ||
      (filterStatus === 'inactive' && zone.status === 'inactive');
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Header with Filters */}
      <div className="lg:col-span-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="bg-neutral-900 border-neutral-800">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Buscar zona..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-black border-neutral-800 text-white placeholder:text-neutral-400"
                  />
                </div>
                
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-full md:w-[180px] bg-black border-neutral-800 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-900 border-neutral-800">
                    <SelectItem value="Todas">Todas</SelectItem>
                    <SelectItem value="checkpoint">Checkpoint</SelectItem>
                    <SelectItem value="polygon">Polígono</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full md:w-[180px] bg-black border-neutral-800 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-900 border-neutral-800">
                    <SelectItem value="Estado">Estado</SelectItem>
                    <SelectItem value="active">Activo</SelectItem>
                    <SelectItem value="inactive">Inactivo</SelectItem>
                  </SelectContent>
                </Select>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white whitespace-nowrap">
                      <Plus className="mr-2 h-4 w-4" />
                      Nueva
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-neutral-900 border-neutral-800 text-white">
                    <DialogHeader>
                      <DialogTitle>Crear Nueva Zona</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div>
                        <label className="text-neutral-400 mb-2 block">Nombre de la zona</label>
                        <Input 
                          placeholder="Ej: Zona Industrial"
                          className="bg-black border-neutral-800 text-white"
                        />
                      </div>
                      <div>
                        <label className="text-neutral-400 mb-2 block">Tipo</label>
                        <Select defaultValue="checkpoint">
                          <SelectTrigger className="bg-black border-neutral-800 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-neutral-900 border-neutral-800">
                            <SelectItem value="checkpoint">Checkpoint</SelectItem>
                            <SelectItem value="polygon">Polígono</SelectItem>
                            <SelectItem value="circle">Círculo</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-neutral-400 mb-2 block">Radio (metros)</label>
                        <Input 
                          type="number"
                          placeholder="150"
                          className="bg-black border-neutral-800 text-white"
                        />
                      </div>
                      <div>
                        <label className="text-neutral-400 mb-2 block">Descripción</label>
                        <Input 
                          placeholder="Descripción de la zona"
                          className="bg-black border-neutral-800 text-white"
                        />
                      </div>
                      <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                        Crear Zona
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Zones Grid */}
      <div className="lg:col-span-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredZones.map((zone, index) => (
            <motion.div
              key={zone.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-neutral-900 border-neutral-800 hover:border-orange-500 transition-all cursor-pointer group">
                <CardHeader className="border-b border-neutral-800">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${
                        zone.type === 'checkpoint' 
                          ? 'bg-red-500/10' 
                          : zone.type === 'polygon'
                          ? 'bg-orange-500/10'
                          : 'bg-orange-500/10'
                      }`}>
                        {zone.type === 'checkpoint' ? (
                          <MapPin className={`h-6 w-6 ${
                            zone.type === 'checkpoint' ? 'text-red-500' : ''
                          }`} />
                        ) : zone.shape === 'circle' ? (
                          <Circle className="h-6 w-6 text-orange-500" />
                        ) : (
                          <Square className="h-6 w-6 text-orange-500" />
                        )}
                      </div>
                      <div>
                        <CardTitle className="text-white mb-1">{zone.name}</CardTitle>
                        <Badge 
                          variant="outline" 
                          className={`${
                            zone.status === 'active' 
                              ? 'border-orange-500 text-orange-500' 
                              : 'border-neutral-600 text-neutral-400'
                          }`}
                        >
                          {zone.status === 'active' ? (
                            <CheckCircle className="mr-1 h-3 w-3" />
                          ) : (
                            <XCircle className="mr-1 h-3 w-3" />
                          )}
                          {zone.status === 'active' ? 'Activa' : 'Inactiva'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-neutral-400">
                      <span>Tipo:</span>
                      <Badge className={`${
                        zone.type === 'checkpoint' 
                          ? 'bg-red-500/20 text-red-400 border-red-500/30' 
                          : 'bg-orange-500/20 text-orange-400 border-orange-500/30'
                      }`}>
                        {zone.type === 'checkpoint' ? 'Checkpoint' : 'Zona Permitida'}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between text-neutral-400">
                      <span>Forma:</span>
                      <span className="text-white">
                        {zone.shape === 'circle' ? (
                          <span className="flex items-center gap-1">
                            <Circle className="h-4 w-4" />
                            Círculo
                          </span>
                        ) : (
                          <span className="flex items-center gap-1">
                            <Square className="h-4 w-4" />
                            Polígono
                          </span>
                        )}
                      </span>
                    </div>

                    {zone.radius && (
                      <div className="flex items-center justify-between text-neutral-400">
                        <span>Radio:</span>
                        <span className="text-white">{zone.radius}</span>
                      </div>
                    )}

                    {zone.schedule && (
                      <div className="flex items-center gap-2 text-neutral-400">
                        <Clock className="h-4 w-4" />
                        <span>{zone.schedule}</span>
                      </div>
                    )}

                    {zone.description && (
                      <p className="text-neutral-400 pt-2 border-t border-neutral-800">
                        {zone.description}
                      </p>
                    )}

                    <div className="flex gap-2 pt-3 border-t border-neutral-800">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-neutral-800 text-neutral-300 hover:bg-orange-500 hover:text-white hover:border-orange-500"
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteZone(zone.id)}
                        className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredZones.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <MapPin className="h-16 w-16 mx-auto mb-4 text-neutral-700" />
            <p className="text-neutral-400">No se encontraron zonas</p>
            <p className="text-neutral-600 mt-2">Intenta ajustar los filtros o crea una nueva zona</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
