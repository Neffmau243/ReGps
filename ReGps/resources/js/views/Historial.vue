<template>
  <div class="historial-view">
    <div class="container py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-white mb-2">Historial de Rutas</h1>
        <p class="text-gray-400">Visualiza el recorrido histórico de los dispositivos</p>
      </div>
      
      <!-- Filters -->
      <div class="bg-dark-100 rounded-xl border border-primary/20 p-6 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Dispositivo</label>
            <select v-model="filters.deviceId" class="input-field">
              <option value="">Seleccionar dispositivo</option>
              <option v-for="device in dispositivos" :key="device.DispositivoID" :value="device.DispositivoID">
                {{ device.Nombre }}
              </option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Fecha Inicio</label>
            <input v-model="filters.startDate" type="date" class="input-field" />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Fecha Fin</label>
            <input v-model="filters.endDate" type="date" class="input-field" />
          </div>
          
          <div class="flex items-end">
            <button 
              @click="loadHistory"
              :disabled="!filters.deviceId || loading"
              class="btn-primary w-full"
            >
              <i class="bi bi-search mr-2"></i>
              Buscar
            </button>
          </div>
        </div>
      </div>
      
      <!-- Results -->
      <div v-if="historyData" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Map -->
        <div class="lg:col-span-2">
          <div class="bg-dark-100 rounded-xl border border-primary/20 overflow-hidden">
            <div class="p-4 border-b border-primary/20">
              <h2 class="text-xl font-bold text-white flex items-center">
                <i class="bi bi-map mr-2 text-primary"></i>
                Ruta Recorrida
              </h2>
            </div>
            <div id="historyMap" class="h-[600px] bg-dark"></div>
          </div>
        </div>
        
        <!-- Stats -->
        <div class="lg:col-span-1 space-y-6">
          <!-- Device Info -->
          <div class="bg-dark-100 rounded-xl border border-primary/20 p-6">
            <h3 class="text-lg font-bold text-white mb-4 flex items-center">
              <i class="bi bi-phone mr-2 text-primary"></i>
              Información del Dispositivo
            </h3>
            <div class="space-y-3">
              <div>
                <p class="text-gray-400 text-sm">Dispositivo</p>
                <p class="text-white font-medium">{{ historyData.device.name }}</p>
              </div>
              <div>
                <p class="text-gray-400 text-sm">Usuario</p>
                <p class="text-white font-medium">{{ historyData.device.user_name }}</p>
              </div>
            </div>
          </div>
          
          <!-- Statistics -->
          <div class="bg-dark-100 rounded-xl border border-primary/20 p-6">
            <h3 class="text-lg font-bold text-white mb-4 flex items-center">
              <i class="bi bi-graph-up mr-2 text-primary"></i>
              Estadísticas
            </h3>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2">
                  <i class="bi bi-geo-alt text-primary"></i>
                  <span class="text-gray-400">Puntos</span>
                </div>
                <span class="text-white font-bold">{{ historyData.statistics.total_points }}</span>
              </div>
              
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2">
                  <i class="bi bi-arrows-move text-primary"></i>
                  <span class="text-gray-400">Distancia</span>
                </div>
                <span class="text-white font-bold">{{ historyData.statistics.distance_km }} km</span>
              </div>
              
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2">
                  <i class="bi bi-clock text-primary"></i>
                  <span class="text-gray-400">Duración</span>
                </div>
                <span class="text-white font-bold">{{ historyData.statistics.duration_minutes }} min</span>
              </div>
            </div>
          </div>
          
          <!-- Timeline -->
          <div class="bg-dark-100 rounded-xl border border-primary/20 p-6">
            <h3 class="text-lg font-bold text-white mb-4 flex items-center">
              <i class="bi bi-clock-history mr-2 text-primary"></i>
              Línea de Tiempo
            </h3>
            <div class="space-y-3 max-h-[300px] overflow-y-auto scrollbar-thin">
              <div 
                v-for="(location, index) in historyData.locations.slice(0, 10)" 
                :key="index"
                class="flex items-start space-x-3"
              >
                <div class="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div>
                  <p class="text-white text-sm">{{ formatTime(location.timestamp) }}</p>
                  <p class="text-gray-400 text-xs">{{ location.latitude.toFixed(4) }}, {{ location.longitude.toFixed(4) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Empty State -->
      <div v-else class="bg-dark-100 rounded-xl border border-primary/20 p-12 text-center">
        <i class="bi bi-map text-gray-600 text-6xl mb-4"></i>
        <h3 class="text-xl font-bold text-white mb-2">Selecciona un dispositivo</h3>
        <p class="text-gray-400">Elige un dispositivo y rango de fechas para ver el historial</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '@/services/api'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface Dispositivo {
  DispositivoID: number
  Nombre: string
}

const dispositivos = ref<Dispositivo[]>([])
const filters = ref({
  deviceId: '',
  startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  endDate: new Date().toISOString().split('T')[0]
})
const historyData = ref<any>(null)
const loading = ref(false)
let map: L.Map | null = null

onMounted(async () => {
  await loadDevices()
})

const loadDevices = async () => {
  try {
    const response = await api.get('/dispositivos')
    dispositivos.value = response.data
  } catch (error) {
    console.error('Error loading devices:', error)
  }
}

const loadHistory = async () => {
  if (!filters.value.deviceId) return
  
  loading.value = true
  
  try {
    const response = await api.get('/locations/history', {
      params: {
        device_id: filters.value.deviceId,
        start_date: filters.value.startDate,
        end_date: filters.value.endDate
      }
    })
    
    historyData.value = response.data
    
    // Wait for DOM update
    setTimeout(() => {
      initMap()
      drawRoute()
    }, 100)
    
  } catch (error) {
    console.error('Error loading history:', error)
  } finally {
    loading.value = false
  }
}

const initMap = () => {
  if (map) {
    map.remove()
  }
  
  map = L.map('historyMap').setView([-12.0464, -77.0428], 13)
  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map)
}

const drawRoute = () => {
  if (!map || !historyData.value) return
  
  const locations = historyData.value.locations
  if (locations.length === 0) return
  
  // Draw route line
  const latlngs = locations.map((loc: any) => [loc.latitude, loc.longitude])
  L.polyline(latlngs, { color: '#0066FF', weight: 3 }).addTo(map!)
  
  // Add start marker
  const startIcon = L.divIcon({
    html: '<div class="custom-marker bg-green-500"><i class="bi bi-play-fill"></i></div>',
    className: '',
    iconSize: [30, 30]
  })
  L.marker([locations[0].latitude, locations[0].longitude], { icon: startIcon })
    .bindPopup('Inicio')
    .addTo(map!)
  
  // Add end marker
  const endIcon = L.divIcon({
    html: '<div class="custom-marker bg-red-500"><i class="bi bi-stop-fill"></i></div>',
    className: '',
    iconSize: [30, 30]
  })
  const lastLoc = locations[locations.length - 1]
  L.marker([lastLoc.latitude, lastLoc.longitude], { icon: endIcon })
    .bindPopup('Fin')
    .addTo(map!)
  
  // Fit bounds
  const bounds = L.latLngBounds(latlngs)
  map!.fitBounds(bounds, { padding: [50, 50] })
}

const formatTime = (timestamp: string) => {
  return new Date(timestamp).toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<style scoped>
.input-field {
  @apply w-full px-4 py-2 bg-dark border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors;
}

.btn-primary {
  @apply px-6 py-2 bg-primary hover:bg-primary-600 text-white font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed;
}

:deep(.custom-marker) {
  @apply w-8 h-8 rounded-full flex items-center justify-center text-white text-xl shadow-lg;
}
</style>
