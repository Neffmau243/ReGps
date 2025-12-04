import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { MapContainer } from './MapContainer';
import { 
  Navigation, 
  Radio, 
  MapPin, 
  Activity, 
  Clock,
  Signal,
  Battery,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { motion } from 'motion/react';

interface Device {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'alert';
  lastUpdate: string;
  battery: number;
  signal: number;
  location: {
    lat: number;
    lng: number;
  };
}

const mockDevices: Device[] = [
  {
    id: '1',
    name: 'zzzaming',
    status: 'active',
    lastUpdate: 'Hace 3 min',
    battery: 85,
    signal: 95,
    location: { lat: -12.0464, lng: -77.0428 }
  },
  {
    id: '2',
    name: 'GPS Tracker Proaztazd',
    status: 'active',
    lastUpdate: 'Hace 5 min',
    battery: 72,
    signal: 88,
    location: { lat: -13.5319, lng: -71.9675 }
  },
  {
    id: '3',
    name: 'GPS Tracker Lite',
    status: 'active',
    lastUpdate: 'Hace 1 min',
    battery: 92,
    signal: 78,
    location: { lat: -12.0464, lng: -77.0428 }
  },
  {
    id: '4',
    name: 'GPS Tracker Pro',
    status: 'inactive',
    lastUpdate: 'Hace 2 hrs',
    battery: 15,
    signal: 45,
    location: { lat: -13.5319, lng: -71.9675 }
  }
];

export function Dashboard() {
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);

  const activeDevices = mockDevices.filter(d => d.status === 'active').length;
  const inactiveDevices = mockDevices.filter(d => d.status === 'inactive').length;
  const alertDevices = mockDevices.filter(d => d.status === 'alert').length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-orange-500';
      case 'inactive':
        return 'bg-neutral-600';
      case 'alert':
        return 'bg-red-500';
      default:
        return 'bg-neutral-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4" />;
      case 'inactive':
        return <Clock className="h-4 w-4" />;
      case 'alert':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Stats Cards */}
      <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-neutral-900 border-neutral-800 hover:border-orange-500/50 transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-neutral-400 mb-1">Dispositivos Activos</p>
                  <h3 className="text-white">{activeDevices}</h3>
                </div>
                <div className="h-12 w-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
                  <Navigation className="h-6 w-6 text-orange-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-neutral-900 border-neutral-800 hover:border-orange-500/50 transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-neutral-400 mb-1">Total Empleados</p>
                  <h3 className="text-white">0</h3>
                </div>
                <div className="h-12 w-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
                  <Radio className="h-6 w-6 text-orange-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-neutral-900 border-neutral-800 hover:border-orange-500/50 transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-neutral-400 mb-1">Alertas Hoy</p>
                  <h3 className="text-white">2</h3>
                </div>
                <div className="h-12 w-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
                  <Activity className="h-6 w-6 text-orange-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-neutral-900 border-neutral-800 hover:border-orange-500/50 transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-neutral-400 mb-1">Zonas Activas</p>
                  <h3 className="text-white">3</h3>
                </div>
                <div className="h-12 w-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-orange-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Map and Devices List */}
      <div className="lg:col-span-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-neutral-900 border-neutral-800">
            <CardHeader className="border-b border-neutral-800">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">Mapa en Tiempo Real</CardTitle>
                <Badge variant="outline" className="border-orange-500 text-orange-500">
                  <span className="flex h-2 w-2 mr-2">
                    <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-orange-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                  </span>
                  Conectado en vivo
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <MapContainer 
                devices={mockDevices} 
                selectedDevice={selectedDevice}
                onSelectDevice={setSelectedDevice}
              />
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="lg:col-span-4">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="bg-neutral-900 border-neutral-800">
            <CardHeader className="border-b border-neutral-800">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">Dispositivos</CardTitle>
                <Badge variant="secondary" className="bg-neutral-800 text-white">
                  {mockDevices.length} Total
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {mockDevices.map((device, index) => (
                  <motion.div
                    key={device.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    onClick={() => setSelectedDevice(device.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      selectedDevice === device.id
                        ? 'bg-neutral-800 border-orange-500'
                        : 'bg-black border-neutral-800 hover:bg-neutral-800/50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="text-white mb-1">{device.name}</h4>
                        <p className="text-neutral-400">{device.id}</p>
                      </div>
                      <Badge 
                        className={`${getStatusColor(device.status)} text-white border-0`}
                      >
                        <span className="flex items-center gap-1">
                          {getStatusIcon(device.status)}
                          {device.status === 'active' ? 'Activo' : device.status === 'inactive' ? 'Inactivo' : 'Alerta'}
                        </span>
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 text-neutral-400">
                      <div className="flex items-center gap-1">
                        <Battery className={`h-4 w-4 ${device.battery < 20 ? 'text-red-400' : 'text-orange-400'}`} />
                        <span>{device.battery}%</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Signal className="h-4 w-4 text-orange-400" />
                        <span>{device.signal}%</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{device.lastUpdate}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
