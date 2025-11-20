<template>
  <div class="alertas-view">
    <div class="container py-8">
      <!-- Header -->
      <div class="mb-6">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-gradient-to-br from-primary to-primary/50 rounded-xl flex items-center justify-center">
              <i class="bi bi-bell-fill text-white text-lg"></i>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-white">Alertas del Sistema</h1>
              <p class="text-gray-500 text-xs">{{ alertas.length }} alertas registradas</p>
            </div>
          </div>
        </div>

        <!-- Inline Stats + Filters -->
        <div class="flex items-center gap-8 flex-wrap">
          <!-- Mini Stats -->
          <div class="flex items-center gap-6">
            <div class="stat-mini">
              <i class="bi bi-exclamation-circle text-red-500 text-sm"></i>
              <span class="text-white font-semibold text-sm">{{ pendingCount }}</span>
              <span class="text-gray-500 text-xs">Pendientes</span>
            </div>
            <div class="stat-mini">
              <i class="bi bi-check-circle text-green-500 text-sm"></i>
              <span class="text-white font-semibold text-sm">{{ resolvedCount }}</span>
              <span class="text-gray-500 text-xs">Resueltas</span>
            </div>
            <div class="stat-mini">
              <i class="bi bi-lightning text-yellow-500 text-sm"></i>
              <span class="text-white font-semibold text-sm">{{ criticalCount }}</span>
              <span class="text-gray-500 text-xs">Críticas</span>
            </div>
          </div>

          <!-- Divider -->
          <div class="h-8 w-px bg-gray-700"></div>

          <!-- Compact Filters -->
          <div class="flex items-center gap-4 flex-1">
            <select v-model="filterType" class="input-compact">
              <option value="">Todas</option>
              <option value="Velocidad">Velocidad</option>
              <option value="Zona">Zona</option>
              <option value="Dispositivo">Dispositivo</option>
            </select>
            <select v-model="filterPriority" class="input-compact">
              <option value="">Prioridad</option>
              <option value="Baja">Baja</option>
              <option value="Media">Media</option>
              <option value="Alta">Alta</option>
              <option value="Crítica">Crítica</option>
            </select>
            <select v-model="filterStatus" class="input-compact">
              <option value="">Estado</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Resuelta">Resuelta</option>
            </select>
            <button
              @click="loadAlertas"
              class="btn-primary-compact"
              title="Actualizar"
            >
              <i class="bi bi-arrow-clockwise"></i>
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
            <div class="flex items-center gap-2">
              <button 
                v-if="alerta.Estado === 'Pendiente'"
                @click="resolveAlert(alerta.AlertaID)"
                class="action-btn toggle"
                title="Resolver"
              >
                <i class="bi bi-check-circle-fill"></i>
              </button>
              <button 
                @click="viewDetails(alerta)"
                class="action-btn edit"
                title="Ver detalles"
              >
                <i class="bi bi-eye-fill"></i>
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
import { ref, computed, onMounted } from 'vue'
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
/* Compact Elements */
.stat-mini {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  transition: all 0.2s ease;
}

.stat-mini:hover {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 107, 53, 0.2);
}

.input-compact {
  padding: 10px 14px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 10px;
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  min-width: 140px;
}

.input-compact:focus {
  outline: none;
  border-color: #FF6B35;
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
}

.input-compact option {
  background: #1f2937;
  color: #ffffff;
  padding: 12px;
}

.btn-primary-compact {
  display: inline-flex;
  align-items: center;
  padding: 8px 16px;
  background: linear-gradient(135deg, #FF6B35 0%, #FF8C5E 100%);
  color: white;
  font-weight: 600;
  font-size: 13px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(255, 107, 53, 0.25);
}

.btn-primary-compact:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(255, 107, 53, 0.35);
}

.action-btn {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  border: 1px solid;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 15px;
}

.action-btn:hover {
  transform: translateY(-3px) scale(1.1);
}

.action-btn.edit {
  color: #60a5fa;
  border-color: rgba(96, 165, 250, 0.3);
}

.action-btn.edit:hover {
  background: rgba(96, 165, 250, 0.15);
  border-color: rgba(96, 165, 250, 0.5);
  box-shadow: 0 8px 16px rgba(96, 165, 250, 0.3);
}

.action-btn.toggle {
  color: #fbbf24;
  border-color: rgba(251, 191, 36, 0.3);
}

.action-btn.toggle:hover {
  background: rgba(251, 191, 36, 0.15);
  border-color: rgba(251, 191, 36, 0.5);
  box-shadow: 0 8px 16px rgba(251, 191, 36, 0.3);
}

.alert-card {
  background: rgba(15, 20, 25, 0.7);
  border-radius: 12px;
  padding: 24px;
  border: 1px solid;
  transition: all 0.3s ease;
  position: relative;
}

.alert-card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(180deg, #FF6B35 0%, #FF8C5E 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 12px 0 0 12px;
}

.alert-card:hover {
  background: rgba(255, 107, 53, 0.05);
  border-color: rgba(255, 107, 53, 0.4);
  transform: translateX(4px);
  box-shadow: 0 4px 12px rgba(255, 107, 53, 0.15);
}

.alert-card:hover::before {
  opacity: 1;
}
</style>
