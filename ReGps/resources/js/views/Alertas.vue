<template>
  <div class="alertas-view">
    <div class="container py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-white mb-2">Panel de Alertas</h1>
        <p class="text-gray-400">Monitorea las alertas del sistema en tiempo real</p>
      </div>
      
      <!-- Stats -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="stat-card">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-400 text-sm mb-1">Total</p>
              <p class="text-3xl font-bold text-white">{{ alertas.length }}</p>
            </div>
            <i class="bi bi-bell text-gray-500 text-3xl"></i>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-400 text-sm mb-1">Pendientes</p>
              <p class="text-3xl font-bold text-red-500">{{ pendingCount }}</p>
            </div>
            <i class="bi bi-exclamation-circle text-red-500 text-3xl"></i>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-400 text-sm mb-1">Resueltas</p>
              <p class="text-3xl font-bold text-green-500">{{ resolvedCount }}</p>
            </div>
            <i class="bi bi-check-circle text-green-500 text-3xl"></i>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-400 text-sm mb-1">Críticas</p>
              <p class="text-3xl font-bold text-yellow-500">{{ criticalCount }}</p>
            </div>
            <i class="bi bi-lightning text-yellow-500 text-3xl"></i>
          </div>
        </div>
      </div>
      
      <!-- Filters -->
      <div class="bg-dark-100 rounded-xl border border-primary/20 p-4 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <select v-model="filterType" class="input-field">
              <option value="">Todos los tipos</option>
              <option value="Velocidad">Velocidad</option>
              <option value="Zona">Zona</option>
              <option value="Dispositivo">Dispositivo</option>
            </select>
          </div>
          
          <div>
            <select v-model="filterPriority" class="input-field">
              <option value="">Todas las prioridades</option>
              <option value="Baja">Baja</option>
              <option value="Media">Media</option>
              <option value="Alta">Alta</option>
              <option value="Crítica">Crítica</option>
            </select>
          </div>
          
          <div>
            <select v-model="filterStatus" class="input-field">
              <option value="">Todos los estados</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Resuelta">Resuelta</option>
            </select>
          </div>
          
          <div>
            <button 
              @click="loadAlertas"
              class="btn-primary w-full"
            >
              <i class="bi bi-arrow-clockwise mr-2"></i>
              Actualizar
            </button>
          </div>
        </div>
      </div>
      
      <!-- Alerts List -->
      <div class="space-y-4">
        <div 
          v-for="alerta in filteredAlertas" 
          :key="alerta.AlertaID"
          class="alert-card"
          :class="getAlertCardClass(alerta.Prioridad)"
        >
          <div class="flex items-start justify-between">
            <div class="flex items-start space-x-4 flex-1">
              <!-- Icon -->
              <div :class="getAlertIconClass(alerta.TipoAlerta)">
                <i :class="getAlertIcon(alerta.TipoAlerta)"></i>
              </div>
              
              <!-- Content -->
              <div class="flex-1">
                <div class="flex items-center space-x-3 mb-2">
                  <h3 class="text-lg font-bold text-white">{{ alerta.TipoAlerta }}</h3>
                  <span :class="getPriorityBadge(alerta.Prioridad)">
                    {{ alerta.Prioridad }}
                  </span>
                  <span :class="getStatusBadge(alerta.Estado)">
                    {{ alerta.Estado }}
                  </span>
                </div>
                
                <p class="text-gray-300 mb-3">{{ alerta.Mensaje }}</p>
                
                <div class="flex items-center space-x-6 text-sm text-gray-400">
                  <div class="flex items-center space-x-2">
                    <i class="bi bi-phone"></i>
                    <span>Dispositivo #{{ alerta.DispositivoID }}</span>
                  </div>
                  <div class="flex items-center space-x-2">
                    <i class="bi bi-clock"></i>
                    <span>{{ formatDate(alerta.FechaHora) }}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Actions -->
            <div class="flex items-center space-x-2">
              <button 
                v-if="alerta.Estado === 'Pendiente'"
                @click="resolveAlert(alerta.AlertaID)"
                class="btn-success"
              >
                <i class="bi bi-check-lg mr-1"></i>
                Resolver
              </button>
              <button 
                @click="viewDetails(alerta)"
                class="btn-secondary"
              >
                <i class="bi bi-eye"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Empty State -->
      <div v-if="filteredAlertas.length === 0" class="bg-dark-100 rounded-xl border border-primary/20 p-12 text-center">
        <i class="bi bi-bell-slash text-gray-600 text-6xl mb-4"></i>
        <h3 class="text-xl font-bold text-white mb-2">No hay alertas</h3>
        <p class="text-gray-400">No se encontraron alertas con los filtros seleccionados</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '@/services/api'

interface Alerta {
  AlertaID: number
  DispositivoID: number
  TipoAlerta: string
  Mensaje: string
  Prioridad: string
  Estado: string
  FechaHora: string
}

const alertas = ref<Alerta[]>([])
const filterType = ref('')
const filterPriority = ref('')
const filterStatus = ref('')

const filteredAlertas = computed(() => {
  return alertas.value.filter(alerta => {
    const matchesType = !filterType.value || alerta.TipoAlerta === filterType.value
    const matchesPriority = !filterPriority.value || alerta.Prioridad === filterPriority.value
    const matchesStatus = !filterStatus.value || alerta.Estado === filterStatus.value
    return matchesType && matchesPriority && matchesStatus
  })
})

const pendingCount = computed(() => 
  alertas.value.filter(a => a.Estado === 'Pendiente').length
)

const resolvedCount = computed(() => 
  alertas.value.filter(a => a.Estado === 'Resuelta').length
)

const criticalCount = computed(() => 
  alertas.value.filter(a => a.Prioridad === 'Crítica' && a.Estado === 'Pendiente').length
)

onMounted(async () => {
  await loadAlertas()
})

const loadAlertas = async () => {
  try {
    const response = await api.get('/alertas')
    alertas.value = response.data
  } catch (error) {
    console.error('Error loading alerts:', error)
  }
}

const getAlertIcon = (tipo: string) => {
  switch (tipo) {
    case 'Velocidad': return 'bi bi-speedometer2'
    case 'Zona': return 'bi bi-geo-alt-fill'
    case 'Dispositivo': return 'bi bi-phone'
    default: return 'bi bi-exclamation-triangle'
  }
}

const getAlertIconClass = (tipo: string) => {
  const base = 'w-12 h-12 rounded-lg flex items-center justify-center text-2xl'
  switch (tipo) {
    case 'Velocidad': return `${base} bg-red-500/20 text-red-500`
    case 'Zona': return `${base} bg-yellow-500/20 text-yellow-500`
    case 'Dispositivo': return `${base} bg-blue-500/20 text-blue-500`
    default: return `${base} bg-gray-500/20 text-gray-500`
  }
}

const getAlertCardClass = (prioridad: string) => {
  switch (prioridad) {
    case 'Crítica': return 'border-red-500/50'
    case 'Alta': return 'border-orange-500/50'
    case 'Media': return 'border-yellow-500/50'
    default: return 'border-primary/20'
  }
}

const getPriorityBadge = (prioridad: string) => {
  const base = 'px-2 py-1 text-xs rounded-full font-medium'
  switch (prioridad) {
    case 'Crítica': return `${base} bg-red-500/20 text-red-500`
    case 'Alta': return `${base} bg-orange-500/20 text-orange-500`
    case 'Media': return `${base} bg-yellow-500/20 text-yellow-500`
    default: return `${base} bg-gray-500/20 text-gray-500`
  }
}

const getStatusBadge = (estado: string) => {
  return estado === 'Pendiente'
    ? 'px-2 py-1 bg-red-500/20 text-red-500 text-xs rounded-full'
    : 'px-2 py-1 bg-green-500/20 text-green-500 text-xs rounded-full'
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const resolveAlert = async (id: number) => {
  try {
    await api.put(`/alertas/${id}`, { Estado: 'Resuelta' })
    await loadAlertas()
  } catch (error) {
    console.error('Error resolving alert:', error)
    alert('Error al resolver la alerta')
  }
}

const viewDetails = (alerta: Alerta) => {
  alert(`Detalles de la alerta:\n\n${JSON.stringify(alerta, null, 2)}`)
}
</script>

<style scoped>
.stat-card {
  @apply bg-dark-100 rounded-xl p-6 border border-primary/20;
}

.alert-card {
  @apply bg-dark-100 rounded-xl p-6 border transition-colors hover:border-primary/40;
}

.input-field {
  @apply w-full px-4 py-2 bg-dark border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors;
}

.btn-primary {
  @apply px-6 py-2 bg-primary hover:bg-primary-600 text-white font-medium rounded-lg transition-all;
}

.btn-secondary {
  @apply px-4 py-2 bg-dark border border-gray-700 hover:border-primary text-white rounded-lg transition-all;
}

.btn-success {
  @apply px-4 py-2 bg-green-500/10 hover:bg-green-500/20 text-green-500 rounded-lg transition-all;
}
</style>
