import { useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { AlertTriangle, Battery, MapPin, Gauge, Eye, CheckCircle, Search } from "lucide-react";

interface Alert {
  id: string;
  type: string;
  severity: "media" | "baja" | "alta";
  device: string;
  deviceId: string;
  date: string;
  time: string;
  resolved: boolean;
}

const mockAlerts: Alert[] = [
  {
    id: "1",
    type: "Zona",
    severity: "media",
    device: "Dispositivo #1",
    deviceId: "GPS-001",
    date: "18/11/2025",
    time: "16:29",
    resolved: false
  },
  {
    id: "2",
    type: "Velocidad",
    severity: "media",
    device: "Dispositivo #2",
    deviceId: "GPS-002",
    date: "17/11/2025",
    time: "10:12",
    resolved: true
  },
  {
    id: "3",
    type: "Velocidad",
    severity: "media",
    device: "Dispositivo #1",
    deviceId: "GPS-001",
    date: "17/11/2025",
    time: "09:24",
    resolved: true
  },
  {
    id: "4",
    type: "Batería",
    severity: "media",
    device: "Dispositivo #2",
    deviceId: "GPS-002",
    date: "17/11/2025",
    time: "09:24",
    resolved: false
  }
];

export function Alerts() {
  const [alerts] = useState<Alert[]>(mockAlerts);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("Todas");
  const [filterPriority, setFilterPriority] = useState("Prioridad");
  const [filterState, setFilterState] = useState("Estado");

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "alta":
        return "bg-red-500";
      case "media":
        return "bg-orange-500";
      case "baja":
        return "bg-green-500";
      default:
        return "bg-neutral-600";
    }
  };

  const getSeverityText = (severity: string) => {
    switch (severity) {
      case "alta":
        return "Alta";
      case "media":
        return "Media";
      case "baja":
        return "Baja";
      default:
        return "Media";
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "Zona":
        return <MapPin className="h-5 w-5" />;
      case "Velocidad":
        return <Gauge className="h-5 w-5" />;
      case "Batería":
        return <Battery className="h-5 w-5" />;
      default:
        return <AlertTriangle className="h-5 w-5" />;
    }
  };

  const pendingCount = alerts.filter(a => !a.resolved).length;
  const resolvedCount = alerts.filter(a => a.resolved).length;
  const criticalCount = alerts.filter(a => !a.resolved && a.severity === "alta").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-white mb-2">Alertas del Sistema</h2>
        <p className="text-neutral-400">{alerts.length} alertas registradas</p>
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
                  <p className="text-neutral-400 mb-1">Pendientes</p>
                  <h3 className="text-white">{pendingCount}</h3>
                </div>
                <div className="h-12 w-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-orange-500" />
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
                  <p className="text-neutral-400 mb-1">Resueltas</p>
                  <h3 className="text-white">{resolvedCount}</h3>
                </div>
                <div className="h-12 w-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-orange-500" />
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
                  <p className="text-neutral-400 mb-1">Críticas</p>
                  <h3 className="text-white">{criticalCount}</h3>
                </div>
                <div className="h-12 w-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-red-500" />
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
        transition={{ delay: 0.3 }}
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
              
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full md:w-[150px] bg-black border-neutral-800 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-neutral-900 border-neutral-800">
                  <SelectItem value="Todas">Todas</SelectItem>
                  <SelectItem value="Zona">Zona</SelectItem>
                  <SelectItem value="Velocidad">Velocidad</SelectItem>
                  <SelectItem value="Batería">Batería</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterPriority} onValueChange={setFilterPriority}>
                <SelectTrigger className="w-full md:w-[150px] bg-black border-neutral-800 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-neutral-900 border-neutral-800">
                  <SelectItem value="Prioridad">Prioridad</SelectItem>
                  <SelectItem value="alta">Alta</SelectItem>
                  <SelectItem value="media">Media</SelectItem>
                  <SelectItem value="baja">Baja</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterState} onValueChange={setFilterState}>
                <SelectTrigger className="w-full md:w-[150px] bg-black border-neutral-800 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-neutral-900 border-neutral-800">
                  <SelectItem value="Estado">Estado</SelectItem>
                  <SelectItem value="pending">Pendiente</SelectItem>
                  <SelectItem value="resolved">Resuelta</SelectItem>
                </SelectContent>
              </Select>

              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Alerts List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-3"
      >
        {alerts.map((alert, index) => (
          <Card 
            key={alert.id} 
            className={`bg-neutral-900 border-neutral-800 hover:border-orange-500 transition-all cursor-pointer ${
              alert.resolved ? 'opacity-60' : ''
            }`}
          >
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4 flex-1">
                  <div className={`h-12 w-12 rounded-xl ${getSeverityColor(alert.severity)}/10 flex items-center justify-center`}>
                    <div className={`${getSeverityColor(alert.severity).replace('bg-', 'text-')}`}>
                      {getAlertIcon(alert.type)}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="text-white">{alert.type}</h4>
                      <Badge className={`${getSeverityColor(alert.severity)} text-white border-0`}>
                        {getSeverityText(alert.severity)}
                      </Badge>
                      {alert.severity === "baja" && (
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                          Resuelta
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-neutral-400">
                      <span>{alert.device}</span>
                      <span>•</span>
                      <span>{alert.deviceId}</span>
                      <span>•</span>
                      <span>{alert.date}, {alert.time}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  {alert.resolved && (
                    <Button
                      size="icon"
                      variant="ghost"
                      className="rounded-full bg-green-500/10 text-green-400 hover:bg-green-500/20"
                    >
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    size="icon"
                    variant="ghost"
                    className="rounded-full bg-neutral-800 text-white hover:bg-orange-500"
                  >
                    <Eye className="h-4 w-4" />
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
