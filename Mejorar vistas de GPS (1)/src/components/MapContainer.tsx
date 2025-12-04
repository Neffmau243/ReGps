import { MapPin } from 'lucide-react';

interface Device {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'alert';
  location: {
    lat: number;
    lng: number;
  };
}

interface MapContainerProps {
  devices: Device[];
  selectedDevice: string | null;
  onSelectDevice: (id: string) => void;
  route?: Array<{ lat: number; lng: number }>;
}

export function MapContainer({ devices, selectedDevice, onSelectDevice, route }: MapContainerProps) {
  // Simulated map - in production, you would use Leaflet, Google Maps, or Mapbox
  return (
    <div className="relative w-full h-[500px] bg-black rounded-b-lg overflow-hidden">
      {/* Map Background Pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(249, 115, 22, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(249, 115, 22, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />
      
      {/* Simulated Map Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full">
          {/* Route Line */}
          {route && route.length > 1 && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <polyline
                points={route.map((point, idx) => {
                  const x = ((idx / (route.length - 1)) * 80 + 10);
                  const y = (Math.sin(idx * 0.5) * 20 + 50);
                  return `${x}%,${y}%`;
                }).join(' ')}
                fill="none"
                stroke="#f97316"
                strokeWidth="3"
                strokeDasharray="10,5"
                className="drop-shadow-lg"
              />
            </svg>
          )}

          {/* Device Markers */}
          {devices.map((device, index) => {
            const x = index === 0 ? 30 : index === 1 ? 70 : index === 2 ? 45 : 60;
            const y = index === 0 ? 40 : index === 1 ? 65 : index === 2 ? 50 : 70;
            
            return (
              <div
                key={device.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                style={{ left: `${x}%`, top: `${y}%` }}
                onClick={() => onSelectDevice(device.id)}
              >
                {/* Pulse Animation for Active Devices */}
                {device.status === 'active' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-12 w-12 rounded-full bg-orange-500/30 animate-ping" />
                  </div>
                )}
                
                {/* Marker */}
                <div
                  className={`relative z-10 h-10 w-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    selectedDevice === device.id
                      ? 'scale-125 ring-4 ring-orange-500 ring-offset-2 ring-offset-black'
                      : 'group-hover:scale-110'
                  } ${
                    device.status === 'active'
                      ? 'bg-orange-500 shadow-lg shadow-orange-500/50'
                      : device.status === 'alert'
                      ? 'bg-red-500 shadow-lg shadow-red-500/50'
                      : 'bg-neutral-600 shadow-lg shadow-neutral-600/50'
                  }`}
                >
                  <MapPin className="h-5 w-5 text-white" />
                </div>

                {/* Device Label */}
                <div
                  className={`absolute top-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap transition-all duration-300 ${
                    selectedDevice === device.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'
                  }`}
                >
                  <div className="bg-neutral-900/95 text-white px-3 py-1.5 rounded-lg shadow-xl border border-neutral-800">
                    <p className="text-xs">{device.name}</p>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Map Legend */}
          <div className="absolute bottom-4 left-4 bg-neutral-900/95 backdrop-blur-sm px-4 py-3 rounded-lg border border-neutral-800">
            <div className="flex gap-4 text-neutral-300">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-orange-500" />
                <span>Activo</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-neutral-600" />
                <span>Inactivo</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <span>Alerta</span>
              </div>
            </div>
          </div>

          {/* Map Controls */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <button className="h-10 w-10 bg-neutral-900/95 hover:bg-orange-500 text-white rounded-lg border border-neutral-800 hover:border-orange-500 flex items-center justify-center transition-colors">
              +
            </button>
            <button className="h-10 w-10 bg-neutral-900/95 hover:bg-orange-500 text-white rounded-lg border border-neutral-800 hover:border-orange-500 flex items-center justify-center transition-colors">
              −
            </button>
          </div>
        </div>
      </div>

      {/* Attribution */}
      <div className="absolute bottom-2 right-2 text-neutral-600 text-xs">
        © Leaflet | OpenStreetMap contributors
      </div>
    </div>
  );
}
