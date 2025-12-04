import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { MapContainer } from './MapContainer';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Navigation,
  TrendingUp,
  Gauge
} from 'lucide-react';
import { motion } from 'motion/react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface RouteData {
  date: string;
  startTime: string;
  endTime: string;
  distance: string;
  duration: string;
  avgSpeed: string;
}

const mockRoutes: RouteData[] = [
  {
    date: '23/11',
    startTime: '08:45',
    endTime: '17:30',
    distance: '245.8 km',
    duration: '8h 45m',
    avgSpeed: '65 km/h'
  },
  {
    date: '22/11',
    startTime: '09:15',
    endTime: '16:45',
    distance: '189.2 km',
    duration: '7h 30m',
    avgSpeed: '58 km/h'
  },
  {
    date: '21/11',
    startTime: '07:30',
    endTime: '18:00',
    distance: '312.5 km',
    duration: '10h 30m',
    avgSpeed: '72 km/h'
  },
  {
    date: '20/11',
    startTime: '10:00',
    endTime: '15:30',
    distance: '156.3 km',
    duration: '5h 30m',
    avgSpeed: '62 km/h'
  },
  {
    date: '19/11',
    startTime: '08:00',
    endTime: '17:15',
    distance: '278.9 km',
    duration: '9h 15m',
    avgSpeed: '68 km/h'
  }
];

export function RouteHistory() {
  const [selectedDevice, setSelectedDevice] = useState('GPS Tracker Proaztazd');
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [selectedRoute, setSelectedRoute] = useState<RouteData | null>(mockRoutes[0]);

  // Mock route points for visualization
  const routePoints = Array.from({ length: 20 }, (_, i) => ({
    lat: -12.0464 + Math.random() * 2,
    lng: -77.0428 + Math.random() * 2
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Filters */}
      <div className="lg:col-span-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="bg-neutral-900 border-neutral-800">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-neutral-400 mb-2 block">Dispositivo</label>
                  <Select value={selectedDevice} onValueChange={setSelectedDevice}>
                    <SelectTrigger className="bg-black border-neutral-800 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-neutral-900 border-neutral-800">
                      <SelectItem value="GPS Tracker Proaztazd">GPS Tracker Proaztazd</SelectItem>
                      <SelectItem value="zzzaming">zzzaming</SelectItem>
                      <SelectItem value="GPS Tracker Lite">GPS Tracker Lite</SelectItem>
                      <SelectItem value="GPS Tracker Pro">GPS Tracker Pro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-neutral-400 mb-2 block">Desde</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left bg-black border-neutral-800 text-white hover:bg-neutral-900 hover:text-white"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateFrom ? format(dateFrom, 'dd/MM/yyyy', { locale: es }) : '12/04/2021'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-neutral-900 border-neutral-800">
                      <Calendar
                        mode="single"
                        selected={dateFrom}
                        onSelect={setDateFrom}
                        initialFocus
                        className="bg-neutral-900 text-white"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <label className="text-neutral-400 mb-2 block">Hasta</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left bg-black border-neutral-800 text-white hover:bg-neutral-900 hover:text-white"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateTo ? format(dateTo, 'dd/MM/yyyy', { locale: es }) : '29/11/2025'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-neutral-900 border-neutral-800">
                      <Calendar
                        mode="single"
                        selected={dateTo}
                        onSelect={setDateTo}
                        initialFocus
                        className="bg-neutral-900 text-white"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="flex items-end">
                  <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                    Buscar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Map */}
      <div className="lg:col-span-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-neutral-900 border-neutral-800">
            <CardHeader className="border-b border-neutral-800">
              <CardTitle className="text-white">Ruta Recorrida</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <MapContainer
                devices={[
                  {
                    id: '1',
                    name: selectedDevice,
                    status: 'active',
                    location: { lat: -12.0464, lng: -77.0428 }
                  }
                ]}
                selectedDevice="1"
                onSelectDevice={() => {}}
                route={routePoints}
              />
            </CardContent>
          </Card>

          {/* Stats Cards */}
          {selectedRoute && (
            <div className="grid grid-cols-3 gap-4 mt-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="bg-neutral-900 border-neutral-800 hover:border-orange-500/50 transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                        <Navigation className="h-5 w-5 text-orange-500" />
                      </div>
                      <div>
                        <p className="text-neutral-400">Distancia</p>
                        <p className="text-white">{selectedRoute.distance}</p>
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
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                        <Clock className="h-5 w-5 text-orange-500" />
                      </div>
                      <div>
                        <p className="text-neutral-400">Duración</p>
                        <p className="text-white">{selectedRoute.duration}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card className="bg-neutral-900 border-neutral-800 hover:border-orange-500/50 transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                        <Gauge className="h-5 w-5 text-orange-500" />
                      </div>
                      <div>
                        <p className="text-neutral-400">Vel. Promedio</p>
                        <p className="text-white">{selectedRoute.avgSpeed}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Routes Timeline */}
      <div className="lg:col-span-4">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="bg-neutral-900 border-neutral-800">
            <CardHeader className="border-b border-neutral-800">
              <CardTitle className="text-white">Línea de Tiempo</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                {mockRoutes.map((route, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    onClick={() => setSelectedRoute(route)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      selectedRoute?.date === route.date
                        ? 'bg-neutral-800 border-orange-500'
                        : 'bg-black border-neutral-800 hover:bg-neutral-800/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
                          <CalendarIcon className="h-4 w-4 text-orange-500" />
                        </div>
                        <div>
                          <p className="text-white">{route.date}</p>
                          <p className="text-neutral-400">{route.startTime} - {route.endTime}</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-neutral-400">
                      <div className="flex items-center gap-2">
                        <Navigation className="h-4 w-4 text-orange-400" />
                        <span>{route.distance}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-orange-400" />
                        <span>{route.duration}</span>
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
