<template>
  <div class="dashboard-view">
    <div class="container py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p class="text-gray-400">Monitoreo en tiempo real de dispositivos GPS</p>
      </div>
      
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="stat-card">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-400 text-sm mb-1 flex items-center gap-2">
                <i class="bi bi-phone-fill text-success"></i>
                Dispositivos Activos
              </p>
              <p class="text-3xl font-bold text-white">{{ stats.activeDevices }}</p>
            </div>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-400 text-sm mb-1 flex items-center gap-2">
                <i class="bi bi-people-fill text-primary"></i>
                Total Empleados
              </p>
              <p class="text-3xl font-bold text-white">{{ stats.moving }}</p>
            </div>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-400 text-sm mb-1 flex items-center gap-2">
                <i class="bi bi-bell-fill text-warning"></i>
                Alertas Hoy
              </p>
              <p class="text-3xl font-bold text-white">{{ stats.alerts }}</p>
            </div>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-400 text-sm mb-1 flex items-center gap-2">
                <i class="bi bi-geo-alt-fill text-info"></i>
                Zonas Activas
              </p>
              <p class="text-3xl font-bold text-white">{{ stats.zones }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Map and Device List -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Map -->
        <div class="lg:col-span-2">
          <div class="bg-dark-100 rounded-xl border border-primary/20 overflow-hidden">
            <div class="p-4 border-b border-primary/20 flex items-center justify-between">
              <h2 class="text-xl font-bold text-white flex items-center">
                Mapa en Tiempo Real
              </h2>
              <button 
                @click="refreshLocations"
                class="px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors text-sm"
              >
                Actualizar
              </button>
            </div>
            <div id="map" class="h-[500px] bg-dark"></div>
          </div>
        </div>
        
        <!-- Device List -->
        <div class="lg:col-span-1">
          <div class="bg-dark-100 rounded-xl border border-primary/20">
            <div class="p-4 border-b border-primary/20">
              <h2 class="text-xl font-bold text-white flex items-center gap-2">
                <i class="bi bi-phone-vibrate-fill text-primary"></i> Dispositivos
              </h2>
            </div>
            <div class="p-6 space-y-4 max-h-[500px] overflow-y-auto scrollbar-thin">
              <div 
                v-for="device in devices" 
                :key="device.device_id"
                class="device-card"
                @click="centerMap(device)"
              >
                <div class="flex items-center gap-4">
                  <!-- Info con mejor tipografía -->
                  <div class="flex-1 min-w-0">
                    <h4 class="text-white font-bold text-base mb-1 truncate">{{ device.device_name }}</h4>
                    <p class="text-gray-400 text-sm mb-1">
                      {{ device.user_name }}
                    </p>
                    <p class="text-gray-500 text-xs">
                      {{ formatTimeAgo(device.minutes_ago) }}
                    </p>
                  </div>
                  
                  <!-- Botón de acción mejorado -->
                  <button 
                    @click.stop="centerMap(device)"
                    class="w-10 h-10 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary flex items-center justify-center transition-all hover:scale-110 flex-shrink-0"
                    title="Ver en mapa"
                  >
                  </button>
                </div>
              </div>
              
              <div v-if="devices.length === 0" class="text-center py-8">
                <p class="text-gray-400">No hay dispositivos activos</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import api from '@/services/api'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface Device {
  device_id: number
  device_name: string
  user_name: string
  latitude: number
  longitude: number
  minutes_ago: number
}

const stats = ref({
  activeDevices: 0,
  moving: 0,
  alerts: 0,
  zones: 0
})

const devices = ref<Device[]>([])
let map: L.Map | null = null
let markers: L.Marker[] = []
let refreshInterval: number | null = null

onMounted(async () => {
  initMap()
  await loadData()
  
  // Auto-refresh every 30 seconds
  refreshInterval = window.setInterval(() => {
    refreshLocations()
  }, 30000)
})

onUnmounted(() => {
  if (refreshInterval) {
    clearInterval(refreshInterval)
  }
})

const initMap = () => {
  map = L.map('map').setView([-12.0464, -77.0428], 13)
  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map)
}

const loadData = async () => {
  try {
    // Load current locations
    const locationsRes = await api.get('/locations/current')
    devices.value = locationsRes.data
    
    // Update map markers
    updateMarkers()
    
    // Load stats
    stats.value.activeDevices = devices.value.length
    stats.value.moving = devices.value.filter(d => d.minutes_ago < 5).length
    
    // Load alerts count
    const alertsRes = await api.get('/alertas')
    stats.value.alerts = alertsRes.data.filter((a: any) => a.Estado === 'Pendiente').length
    
    // Load zones count
    const zonasRes = await api.get('/zonas')
    stats.value.zones = zonasRes.data.filter((z: any) => z.Estado === 'Activo').length
    
  } catch (error) {
    console.error('Error loading data:', error)
  }
}

const updateMarkers = () => {
  // Clear existing markers
  markers.forEach(marker => marker.remove())
  markers = []
  
  if (!map) return
  
  // Add new markers
  devices.value.forEach(device => {
    const icon = L.divIcon({
      html: `<div class="custom-marker ${getMarkerColor(device.minutes_ago)}">
      </div>`,
      className: '',
      iconSize: [30, 30]
    })
    
    const marker = L.marker([device.latitude, device.longitude], { icon })
      .bindPopup(`
        <div class="text-dark">
          <strong>${device.device_name}</strong><br>
          ${device.user_name}<br>
          <small>${formatTimeAgo(device.minutes_ago)}</small>
        </div>
      `)
      .addTo(map!)
    
    markers.push(marker)
  })
  
  // Fit bounds if there are devices
  if (devices.value.length > 0) {
    const bounds = L.latLngBounds(devices.value.map(d => [d.latitude, d.longitude]))
    map.fitBounds(bounds, { padding: [50, 50] })
  }
}

const refreshLocations = async () => {
  await loadData()
}

const centerMap = (device: Device) => {
  if (map) {
    map.setView([device.latitude, device.longitude], 16)
  }
}

const getMarkerColor = (minutesAgo: number) => {
  if (minutesAgo < 5) return 'marker-green'
  if (minutesAgo < 15) return 'marker-yellow'
  return 'marker-red'
}

const formatTimeAgo = (minutes: number): string => {
  if (minutes < 1) {
    const seconds = Math.round(minutes * 60)
    return seconds <= 1 ? 'Justo ahora' : `Hace ${seconds} seg`
  } else if (minutes < 60) {
    const mins = Math.round(minutes)
    return `Hace ${mins} min`
  } else if (minutes < 1440) { // menos de 24 horas
    const hours = Math.round(minutes / 60)
    return `Hace ${hours}h`
  } else {
    const days = Math.round(minutes / 1440)
    return `Hace ${days}d`
  }
}
</script>

<style scoped>
/* Custom Markers */
:deep(.custom-marker) {
  @apply w-8 h-8 rounded-full flex items-center justify-center text-white text-xl;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.4), 0 0 0 3px rgba(255, 255, 255, 0.3);
  transition: transform 0.2s ease;
}

:deep(.custom-marker:hover) {
  transform: scale(1.15);
}

:deep(.marker-green) {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}

:deep(.marker-yellow) {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
}

:deep(.marker-red) {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
}

/* Animación de entrada */
.stat-card {
  animation: fadeInUp 0.5s ease-out backwards;
}

.stat-card:nth-child(1) { animation-delay: 0.1s; }
.stat-card:nth-child(2) { animation-delay: 0.2s; }
.stat-card:nth-child(3) { animation-delay: 0.3s; }
.stat-card:nth-child(4) { animation-delay: 0.4s; }

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
