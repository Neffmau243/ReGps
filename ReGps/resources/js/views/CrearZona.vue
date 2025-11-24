<template>
  <div class="crear-zona-view">
    <div class="container py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-white mb-2">
          {{ isEditing ? 'Editar Zona' : 'Nueva Zona' }}
        </h1>
        <p class="text-gray-400">{{ isEditing ? 'Modifica' : 'Crea' }} una zona de geofencing</p>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Form -->
        <div class="lg:col-span-1">
          <form @submit.prevent="handleSubmit" class="bg-dark-100 rounded-xl border border-primary/20 p-6 space-y-6">
            <!-- Nombre -->
            <div>
              <label class="label">
                <i class="bi bi-geo-alt-fill"></i>
                Nombre de la Zona *
              </label>
              <input 
                v-model="form.Nombre"
                type="text" 
                required
                class="input-field"
                placeholder="Ej: Oficina Central"
              />
            </div>
            
            <!-- Tipo de Zona -->
            <div>
              <label class="label">
                <i class="bi bi-tag-fill"></i>
                Tipo de Zona *
              </label>
              <select v-model="form.TipoZona" required class="input-field">
                <option value="">Seleccionar</option>
                <option value="Checkpoint">Checkpoint</option>
                <option value="Zona Permitida">Zona Permitida</option>
                <option value="Zona Restringida">Zona Restringida</option>
              </select>
            </div>
            
            <!-- Tipo de Geometría -->
            <div>
              <label class="label">Tipo de Geometría *</label>
              <select v-model="form.TipoGeometria" required class="input-field">
                <option value="">Seleccionar</option>
                <option value="Circulo">Círculo</option>
                <option value="Poligono">Polígono</option>
              </select>
            </div>
            
            <!-- Radio (solo para círculo) -->
            <div v-if="form.TipoGeometria === 'Circulo'">
              <label class="label">Radio (metros) *</label>
              <input 
                v-model.number="form.Radio"
                type="number" 
                min="10"
                step="10"
                required
                class="input-field"
                placeholder="500"
              />
            </div>
            
            <!-- Horario -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="label">Hora Inicio</label>
                <input 
                  v-model="form.HorarioInicio"
                  type="time" 
                  class="input-field"
                />
              </div>
              <div>
                <label class="label">Hora Fin</label>
                <input 
                  v-model="form.HorarioFin"
                  type="time" 
                  class="input-field"
                />
              </div>
            </div>
            
            <!-- Descripción -->
            <div>
              <label class="label">Descripción</label>
              <textarea 
                v-model="form.Descripcion"
                rows="3"
                class="input-field"
                placeholder="Descripción opcional..."
              ></textarea>
            </div>
            
            <!-- Estado -->
            <div>
              <label class="label">Estado</label>
              <select v-model="form.Estado" class="input-field">
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </div>
            
            <!-- Instructions -->
            <div class="bg-primary/10 border border-primary/30 rounded-lg p-4">
              <p class="text-primary text-sm font-medium mb-2">
                Instrucciones
              </p>
              <ul class="text-gray-300 text-xs space-y-1">
                <li v-if="form.TipoGeometria === 'Circulo'">
                  • Haz clic en el mapa para colocar el centro
                </li>
                <li v-if="form.TipoGeometria === 'Poligono'">
                  • Haz clic en el mapa para agregar puntos
                </li>
                <li v-if="form.TipoGeometria === 'Poligono'">
                  • Doble clic para finalizar el polígono
                </li>
              </ul>
            </div>
            
            <!-- Buttons -->
            <div class="flex space-x-3">
              <button 
                type="submit"
                :disabled="!canSubmit || loading"
                class="btn-primary flex-1"
              >
                <span v-if="!loading">
                  {{ isEditing ? 'Actualizar' : 'Crear' }}
                </span>
                <span v-else>
                  Guardando...
                </span>
              </button>
              <router-link to="/zonas" class="btn-secondary">
                Cancelar
              </router-link>
            </div>
          </form>
        </div>
        
        <!-- Map -->
        <div class="lg:col-span-2">
          <div class="bg-dark-100 rounded-xl border border-primary/20 overflow-hidden sticky top-8">
            <div class="p-4 border-b border-primary/20">
              <h2 class="text-xl font-bold text-white flex items-center">
                Mapa Interactivo
              </h2>
            </div>
            <div id="createMap" class="h-[calc(100vh-200px)]"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/services/api'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const route = useRoute()
const router = useRouter()
const isEditing = computed(() => !!route.params.id)

const form = ref({
  Nombre: '',
  TipoZona: '',
  TipoGeometria: '',
  Latitud: -12.0464,
  Longitud: -77.0428,
  Radio: 500,
  Coordenadas: null as any,
  HorarioInicio: '',
  HorarioFin: '',
  Descripcion: '',
  Estado: 'Activo'
})

const loading = ref(false)
let map: L.Map | null = null
let currentShape: L.Circle | L.Polygon | null = null
let polygonPoints: L.LatLng[] = []

const canSubmit = computed(() => {
  if (!form.value.Nombre || !form.value.TipoZona || !form.value.TipoGeometria) {
    return false
  }
  
  if (form.value.TipoGeometria === 'Circulo') {
    return !!form.value.Radio && form.value.Latitud && form.value.Longitud
  }
  
  if (form.value.TipoGeometria === 'Poligono') {
    return !!form.value.Coordenadas
  }
  
  return false
})

onMounted(async () => {
  initMap()
  
  if (isEditing.value) {
    await loadZone()
  }
})

const initMap = () => {
  map = L.map('createMap').setView([form.value.Latitud, form.value.Longitud], 13)
  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map)
  
  // Map click handler
  map.on('click', handleMapClick)
}

const handleMapClick = (e: L.LeafletMouseEvent) => {
  if (form.value.TipoGeometria === 'Circulo') {
    form.value.Latitud = e.latlng.lat
    form.value.Longitud = e.latlng.lng
    drawCircle()
  } else if (form.value.TipoGeometria === 'Poligono') {
    polygonPoints.push(e.latlng)
    drawPolygon()
  }
}

const drawCircle = () => {
  if (currentShape) {
    currentShape.remove()
  }
  
  currentShape = L.circle([form.value.Latitud, form.value.Longitud], {
    radius: form.value.Radio,
    color: '#FF6B35',
    fillColor: '#FF6B35',
    fillOpacity: 0.2
  }).addTo(map!)
  
  L.marker([form.value.Latitud, form.value.Longitud]).addTo(map!)
}

const drawPolygon = () => {
  if (currentShape) {
    currentShape.remove()
  }
  
  if (polygonPoints.length > 0) {
    currentShape = L.polygon(polygonPoints, {
      color: '#FF6B35',
      fillColor: '#FF6B35',
      fillOpacity: 0.2
    }).addTo(map!)
    
    // Calculate center
    const bounds = currentShape.getBounds()
    const center = bounds.getCenter()
    form.value.Latitud = center.lat
    form.value.Longitud = center.lng
    
    // Save coordinates
    form.value.Coordenadas = polygonPoints.map(p => ({
      lat: p.lat,
      lng: p.lng
    }))
  }
}

const loadZone = async () => {
  try {
    const response = await api.get(`/zonas/${route.params.id}`)
    const zona = response.data
    
    // Helper function to safely parse JSON
    const parseIfString = (value: any) => {
      if (!value) return null
      if (typeof value === 'string') {
        try {
          return JSON.parse(value)
        } catch (e) {
          return null
        }
      }
      return value // Already an object
    }
    
    form.value = {
      Nombre: zona.Nombre,
      TipoZona: zona.TipoZona,
      TipoGeometria: zona.TipoGeometria,
      Latitud: zona.Latitud,
      Longitud: zona.Longitud,
      Radio: zona.Radio || 500,
      Coordenadas: parseIfString(zona.Coordenadas),
      HorarioInicio: zona.HorarioInicio || '',
      HorarioFin: zona.HorarioFin || '',
      Descripcion: zona.Descripcion || '',
      Estado: zona.Estado
    }
    
    // Draw existing zone
    if (zona.TipoGeometria === 'Circulo') {
      drawCircle()
    } else if (zona.TipoGeometria === 'Poligono' && zona.Coordenadas) {
      const coords = parseIfString(zona.Coordenadas)
      if (coords && Array.isArray(coords)) {
        polygonPoints = coords.map((c: any) => L.latLng(c.lat, c.lng))
        drawPolygon()
      }
    }
    
    map?.setView([zona.Latitud, zona.Longitud], 15)
    
  } catch (error) {
    console.error('Error loading zone:', error)
    alert('Error al cargar la zona')
  }
}

const handleSubmit = async () => {
  loading.value = true
  
  try {
    const data = {
      ...form.value,
      Coordenadas: form.value.Coordenadas ? JSON.stringify(form.value.Coordenadas) : null
    }
    
    if (isEditing.value) {
      await api.put(`/zonas/${route.params.id}`, data)
    } else {
      await api.post('/zonas', data)
    }
    
    router.push('/zonas')
  } catch (error: any) {
    console.error('Error saving zone:', error)
    alert(error.response?.data?.message || 'Error al guardar la zona')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.label {
  @apply block text-sm font-medium text-gray-300 mb-2;
}

.input-field {
  @apply w-full px-4 py-2 bg-dark border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors;
}

.btn-primary {
  @apply px-6 py-2 bg-primary hover:bg-primary-600 text-white font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed;
}

.btn-secondary {
  @apply px-6 py-2 bg-dark border border-primary/20 hover:border-primary text-white rounded-lg transition-all text-center;
}
</style>
