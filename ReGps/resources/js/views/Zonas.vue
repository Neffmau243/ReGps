<template>
  <div class="zonas-view">
    <div class="container py-8">
      <!-- Header -->
      <div class="mb-8 flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-white mb-2">Gestión de Zonas</h1>
          <p class="text-gray-400">Administra las zonas de geofencing</p>
        </div>
        <router-link 
          v-if="authStore.isAdmin"
          to="/zonas/crear" 
          class="btn-primary"
        >
          <i class="bi bi-plus-circle mr-2"></i>
          Nueva Zona
        </router-link>
      </div>
      
      <!-- Filters -->
      <div class="bg-dark-100 rounded-xl border border-primary/20 p-4 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Buscar zona..."
              class="input-field"
            />
          </div>
          <div>
            <select v-model="filterType" class="input-field">
              <option value="">Todos los tipos</option>
              <option value="Checkpoint">Checkpoint</option>
              <option value="Zona Permitida">Zona Permitida</option>
              <option value="Zona Restringida">Zona Restringida</option>
            </select>
          </div>
          <div>
            <select v-model="filterStatus" class="input-field">
              <option value="">Todos los estados</option>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </div>
        </div>
      </div>
      
      <!-- Zones Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="zona in filteredZonas" 
          :key="zona.ZonaID"
          class="zone-card"
        >
          <div class="flex items-start justify-between mb-4">
            <div class="flex items-start space-x-3">
              <div :class="getZoneIconClass(zona.TipoZona)">
                <i :class="getZoneIcon(zona.TipoZona)"></i>
              </div>
              <div>
                <h3 class="text-lg font-bold text-white">{{ zona.Nombre }}</h3>
                <p class="text-gray-400 text-sm">{{ zona.TipoZona }}</p>
              </div>
            </div>
            <span :class="getStatusBadge(zona.Estado)">
              {{ zona.Estado }}
            </span>
          </div>
          
          <div class="space-y-2 mb-4">
            <div class="flex items-center text-sm">
              <i class="bi bi-geo-alt text-gray-400 mr-2"></i>
              <span class="text-gray-300">{{ zona.TipoGeometria }}</span>
            </div>
            
            <div v-if="zona.Radio" class="flex items-center text-sm">
              <i class="bi bi-circle text-gray-400 mr-2"></i>
              <span class="text-gray-300">Radio: {{ zona.Radio }}m</span>
            </div>
            
            <div v-if="zona.HorarioInicio && zona.HorarioFin" class="flex items-center text-sm">
              <i class="bi bi-clock text-gray-400 mr-2"></i>
              <span class="text-gray-300">{{ zona.HorarioInicio }} - {{ zona.HorarioFin }}</span>
            </div>
          </div>
          
          <p v-if="zona.Descripcion" class="text-gray-400 text-sm mb-4">
            {{ zona.Descripcion }}
          </p>
          
          <div class="flex items-center space-x-2 pt-4 border-t border-gray-700">
            <router-link 
              v-if="authStore.isAdmin"
              :to="`/zonas/editar/${zona.ZonaID}`"
              class="btn-secondary flex-1"
            >
              <i class="bi bi-pencil mr-1"></i>
              Editar
            </router-link>
            <button 
              @click="viewOnMap(zona)"
              class="btn-secondary flex-1"
            >
              <i class="bi bi-map mr-1"></i>
              Ver
            </button>
            <button 
              v-if="authStore.isAdmin"
              @click="deleteZone(zona.ZonaID)"
              class="btn-danger"
            >
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>
      </div>
      
      <!-- Empty State -->
      <div v-if="filteredZonas.length === 0" class="bg-dark-100 rounded-xl border border-primary/20 p-12 text-center">
        <i class="bi bi-geo text-gray-600 text-6xl mb-4"></i>
        <h3 class="text-xl font-bold text-white mb-2">No hay zonas</h3>
        <p class="text-gray-400 mb-6">Crea tu primera zona de geofencing</p>
        <router-link 
          v-if="authStore.isAdmin"
          to="/zonas/crear" 
          class="btn-primary inline-flex items-center"
        >
          <i class="bi bi-plus-circle mr-2"></i>
          Nueva Zona
        </router-link>
      </div>
    </div>
    
    <!-- Map Modal -->
    <div v-if="showMapModal" class="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div class="bg-dark-100 rounded-xl border border-primary/20 w-full max-w-4xl">
        <div class="p-4 border-b border-primary/20 flex items-center justify-between">
          <h3 class="text-xl font-bold text-white">{{ selectedZone?.Nombre }}</h3>
          <button @click="showMapModal = false" class="text-gray-400 hover:text-white">
            <i class="bi bi-x-lg text-2xl"></i>
          </button>
        </div>
        <div id="zoneMap" class="h-[500px]"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
import api from '@/services/api'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface Zona {
  ZonaID: number
  Nombre: string
  TipoZona: string
  TipoGeometria: string
  Latitud: number
  Longitud: number
  Radio?: number
  Coordenadas?: any
  HorarioInicio?: string
  HorarioFin?: string
  Descripcion?: string
  Estado: string
}

const authStore = useAuthStore()
const zonas = ref<Zona[]>([])
const searchQuery = ref('')
const filterType = ref('')
const filterStatus = ref('')
const showMapModal = ref(false)
const selectedZone = ref<Zona | null>(null)
let zoneMap: L.Map | null = null

const filteredZonas = computed(() => {
  return zonas.value.filter(zona => {
    const matchesSearch = zona.Nombre.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesType = !filterType.value || zona.TipoZona === filterType.value
    const matchesStatus = !filterStatus.value || zona.Estado === filterStatus.value
    return matchesSearch && matchesType && matchesStatus
  })
})

onMounted(async () => {
  await loadZonas()
})

const loadZonas = async () => {
  try {
    const response = await api.get('/zonas')
    zonas.value = response.data
  } catch (error) {
    console.error('Error loading zones:', error)
  }
}

const getZoneIcon = (tipo: string) => {
  switch (tipo) {
    case 'Checkpoint': return 'bi bi-flag-fill'
    case 'Zona Permitida': return 'bi bi-check-circle-fill'
    case 'Zona Restringida': return 'bi bi-x-circle-fill'
    default: return 'bi bi-geo-fill'
  }
}

const getZoneIconClass = (tipo: string) => {
  const base = 'w-10 h-10 rounded-lg flex items-center justify-center text-xl'
  switch (tipo) {
    case 'Checkpoint': return `${base} bg-blue-500/20 text-blue-500`
    case 'Zona Permitida': return `${base} bg-green-500/20 text-green-500`
    case 'Zona Restringida': return `${base} bg-red-500/20 text-red-500`
    default: return `${base} bg-primary/20 text-primary`
  }
}

const getStatusBadge = (estado: string) => {
  return estado === 'Activo' 
    ? 'px-2 py-1 bg-green-500/20 text-green-500 text-xs rounded-full'
    : 'px-2 py-1 bg-gray-500/20 text-gray-500 text-xs rounded-full'
}

const viewOnMap = (zona: Zona) => {
  selectedZone.value = zona
  showMapModal.value = true
  
  setTimeout(() => {
    initZoneMap(zona)
  }, 100)
}

const initZoneMap = (zona: Zona) => {
  if (zoneMap) {
    zoneMap.remove()
  }
  
  zoneMap = L.map('zoneMap').setView([zona.Latitud, zona.Longitud], 15)
  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(zoneMap)
  
  // Draw zone
  if (zona.TipoGeometria === 'Circulo' && zona.Radio) {
    L.circle([zona.Latitud, zona.Longitud], {
      radius: zona.Radio,
      color: '#0066FF',
      fillColor: '#0066FF',
      fillOpacity: 0.2
    }).addTo(zoneMap)
  } else if (zona.TipoGeometria === 'Poligono' && zona.Coordenadas) {
    const coords = JSON.parse(zona.Coordenadas)
    const latlngs = coords.map((c: any) => [c.lat, c.lng])
    L.polygon(latlngs, {
      color: '#0066FF',
      fillColor: '#0066FF',
      fillOpacity: 0.2
    }).addTo(zoneMap)
  }
  
  // Add marker
  L.marker([zona.Latitud, zona.Longitud])
    .bindPopup(zona.Nombre)
    .addTo(zoneMap)
}

const deleteZone = async (id: number) => {
  if (!confirm('¿Estás seguro de eliminar esta zona?')) return
  
  try {
    await api.delete(`/zonas/${id}`)
    await loadZonas()
  } catch (error) {
    console.error('Error deleting zone:', error)
    alert('Error al eliminar la zona')
  }
}
</script>

<style scoped>
.input-field {
  @apply w-full px-4 py-2 bg-dark border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors;
}

.btn-primary {
  @apply px-6 py-2 bg-primary hover:bg-primary-600 text-white font-medium rounded-lg transition-all;
}

.btn-secondary {
  @apply px-4 py-2 bg-dark border border-gray-700 hover:border-primary text-white rounded-lg transition-all text-sm;
}

.btn-danger {
  @apply px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-all;
}

.zone-card {
  @apply bg-dark-100 rounded-xl p-6 border border-primary/20 hover:border-primary/40 transition-colors;
}
</style>
