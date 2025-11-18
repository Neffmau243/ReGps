<template>
  <div class="dispositivos-view">
    <div class="container py-8">
      <!-- Header -->
      <div class="mb-8 flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-white mb-2">Gestión de Dispositivos</h1>
          <p class="text-gray-400">Administra los dispositivos GPS del sistema</p>
        </div>
        <button 
          @click="showCreateModal = true"
          class="btn-primary"
        >
          <i class="bi bi-plus-circle mr-2"></i>
          Nuevo Dispositivo
        </button>
      </div>
      
      <!-- Search -->
      <div class="bg-dark-100 rounded-xl border border-primary/20 p-4 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Buscar dispositivo..."
              class="input-field"
            />
          </div>
          <div>
            <select v-model="filterStatus" class="input-field">
              <option value="">Todos los estados</option>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
              <option value="Mantenimiento">Mantenimiento</option>
            </select>
          </div>
        </div>
      </div>
      
      <!-- Devices Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="dispositivo in filteredDispositivos" 
          :key="dispositivo.DispositivoID"
          class="device-card"
        >
          <div class="flex items-start justify-between mb-4">
            <div class="flex items-start space-x-3">
              <div :class="getDeviceIconClass(dispositivo.Estado)">
                <i class="bi bi-phone-fill"></i>
              </div>
              <div>
                <h3 class="text-lg font-bold text-white">{{ dispositivo.Modelo }}</h3>
                <p class="text-gray-400 text-sm">{{ dispositivo.Marca || 'Sin marca' }}</p>
              </div>
            </div>
            <span :class="getStatusBadge(dispositivo.Estado)">
              {{ dispositivo.Estado }}
            </span>
          </div>
          
          <div class="space-y-2 mb-4">
            <div class="flex items-center text-sm">
              <i class="bi bi-hash text-gray-400 mr-2"></i>
              <span class="text-gray-300">IMEI: {{ dispositivo.IMEI }}</span>
            </div>
            
            <div v-if="dispositivo.Marca" class="flex items-center text-sm">
              <i class="bi bi-tag text-gray-400 mr-2"></i>
              <span class="text-gray-300">Marca: {{ dispositivo.Marca }}</span>
            </div>
            
            <div v-if="dispositivo.EmpleadoID" class="flex items-center text-sm">
              <i class="bi bi-person text-gray-400 mr-2"></i>
              <span class="text-gray-300">{{ getEmpleadoNombre(dispositivo.EmpleadoID) }}</span>
            </div>
            
            <div class="flex items-center text-sm">
              <i class="bi bi-calendar text-gray-400 mr-2"></i>
              <span class="text-gray-300">{{ formatDate(dispositivo.created_at || dispositivo.FechaAsignacion) }}</span>
            </div>
          </div>
          
          <div class="flex items-center space-x-2 pt-4 border-t border-gray-700">
            <button 
              @click="editDevice(dispositivo)"
              class="btn-secondary flex-1"
            >
              <i class="bi bi-pencil mr-1"></i>
              Editar
            </button>
            <button 
              @click="viewLocation(dispositivo)"
              class="btn-secondary flex-1"
            >
              <i class="bi bi-geo-alt mr-1"></i>
              Ubicar
            </button>
            <button 
              @click="deleteDevice(dispositivo.DispositivoID)"
              class="btn-danger"
            >
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>
      </div>
      
      <!-- Empty State -->
      <div v-if="filteredDispositivos.length === 0" class="bg-dark-100 rounded-xl border border-primary/20 p-12 text-center">
        <i class="bi bi-phone text-gray-600 text-6xl mb-4"></i>
        <h3 class="text-xl font-bold text-white mb-2">No hay dispositivos</h3>
        <p class="text-gray-400 mb-6">Registra tu primer dispositivo GPS</p>
        <button 
          @click="showCreateModal = true"
          class="btn-primary inline-flex items-center"
        >
          <i class="bi bi-plus-circle mr-2"></i>
          Nuevo Dispositivo
        </button>
      </div>
    </div>
    
    <!-- Create/Edit Modal -->
    <div v-if="showCreateModal || editingDevice" class="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div class="bg-dark-100 rounded-xl border border-primary/20 w-full max-w-md">
        <div class="p-6 border-b border-primary/20 flex items-center justify-between">
          <h3 class="text-xl font-bold text-white">
            {{ editingDevice ? 'Editar Dispositivo' : 'Nuevo Dispositivo' }}
          </h3>
          <button @click="closeModal" class="text-gray-400 hover:text-white">
            <i class="bi bi-x-lg text-2xl"></i>
          </button>
        </div>
        
        <form @submit.prevent="handleSubmit" class="p-6 space-y-4">
          <div>
            <label class="label">Modelo *</label>
            <input 
              v-model="form.Modelo"
              type="text" 
              required
              class="input-field"
              placeholder="Samsung Galaxy S21"
            />
          </div>
          
          <div>
            <label class="label">IMEI *</label>
            <input 
              v-model="form.IMEI"
              type="text" 
              required
              minlength="10"
              maxlength="20"
              class="input-field"
              placeholder="123456789012345 (mínimo 10 caracteres)"
            />
            <p class="text-xs text-gray-400 mt-1">El IMEI debe tener entre 10 y 20 caracteres</p>
          </div>
          
          <div>
            <label class="label">Marca</label>
            <input 
              v-model="form.Marca"
              type="text" 
              class="input-field"
              placeholder="Samsung"
            />
          </div>
          
          <div>
            <label class="label">Empleado (Opcional)</label>
            <select v-model="form.EmpleadoID" class="input-field">
              <option value="">Sin asignar</option>
              <option v-for="empleado in empleados" :key="empleado.EmpleadoID" :value="empleado.EmpleadoID">
                {{ empleado.Nombre }} {{ empleado.Apellido }}
              </option>
            </select>
          </div>
          
          <div>
            <label class="label">Estado</label>
            <select v-model="form.Estado" class="input-field">
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
              <option value="Mantenimiento">Mantenimiento</option>
            </select>
          </div>
          
          <div class="flex space-x-3 pt-4">
            <button 
              type="submit"
              :disabled="loading"
              class="btn-primary flex-1"
            >
              <span v-if="!loading">
                {{ editingDevice ? 'Actualizar' : 'Crear' }}
              </span>
              <span v-else>
                <i class="bi bi-arrow-repeat animate-spin mr-2"></i>
                Guardando...
              </span>
            </button>
            <button 
              type="button"
              @click="closeModal"
              class="btn-secondary"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'

interface Dispositivo {
  DispositivoID: number
  IMEI: string
  Modelo: string
  Marca?: string
  EmpleadoID?: number
  Estado: string
  FechaAsignacion?: string
  created_at?: string
  updated_at?: string
  empleado?: {
    EmpleadoID: number
    Nombre: string
    Apellido: string
  }
}

interface Empleado {
  EmpleadoID: number
  Nombre: string
  Apellido: string
}

const router = useRouter()
const dispositivos = ref<Dispositivo[]>([])
const empleados = ref<Empleado[]>([])
const searchQuery = ref('')
const filterStatus = ref('')
const showCreateModal = ref(false)
const editingDevice = ref<Dispositivo | null>(null)
const loading = ref(false)

const form = ref({
  IMEI: '',
  Modelo: '',
  Marca: '',
  EmpleadoID: '',
  Estado: 'Activo'
})

const filteredDispositivos = computed(() => {
  return dispositivos.value.filter(dispositivo => {
    const query = searchQuery.value.toLowerCase()
    const matchesSearch = (dispositivo.Modelo?.toLowerCase() || '').includes(query) ||
                         (dispositivo.IMEI || '').includes(searchQuery.value) ||
                         (dispositivo.Marca?.toLowerCase() || '').includes(query)
    const matchesStatus = !filterStatus.value || dispositivo.Estado === filterStatus.value
    return matchesSearch && matchesStatus
  })
})

onMounted(async () => {
  await loadDispositivos()
  await loadEmpleados()
})

const loadDispositivos = async () => {
  try {
    const response = await api.get('/dispositivos')
    dispositivos.value = response.data
  } catch (error) {
    console.error('Error loading devices:', error)
  }
}

const loadEmpleados = async () => {
  try {
    const response = await api.get('/empleados')
    empleados.value = response.data
  } catch (error) {
    console.error('Error loading employees:', error)
  }
}

const getDeviceIconClass = (estado: string) => {
  const base = 'w-10 h-10 rounded-lg flex items-center justify-center'
  switch (estado) {
    case 'Activo': return `${base} bg-green-500/20 text-green-500`
    case 'Inactivo': return `${base} bg-red-500/20 text-red-500`
    case 'Mantenimiento': return `${base} bg-yellow-500/20 text-yellow-500`
    default: return `${base} bg-gray-500/20 text-gray-500`
  }
}

const getStatusBadge = (estado: string) => {
  switch (estado) {
    case 'Activo': return 'px-2 py-1 bg-green-500/20 text-green-500 text-xs rounded-full'
    case 'Inactivo': return 'px-2 py-1 bg-red-500/20 text-red-500 text-xs rounded-full'
    case 'Mantenimiento': return 'px-2 py-1 bg-yellow-500/20 text-yellow-500 text-xs rounded-full'
    default: return 'px-2 py-1 bg-gray-500/20 text-gray-500 text-xs rounded-full'
  }
}

const formatDate = (date: string | undefined) => {
  if (!date) return 'Sin fecha'
  try {
    const parsedDate = new Date(date)
    if (isNaN(parsedDate.getTime())) return 'Fecha inválida'
    return parsedDate.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  } catch {
    return 'Fecha inválida'
  }
}

const getEmpleadoNombre = (empleadoId: number | undefined) => {
  if (!empleadoId) return 'Sin asignar'
  const empleado = empleados.value.find(e => e.EmpleadoID === empleadoId)
  return empleado ? `${empleado.Nombre} ${empleado.Apellido}` : `Empleado #${empleadoId}`
}

const editDevice = (dispositivo: Dispositivo) => {
  editingDevice.value = dispositivo
  form.value = {
    IMEI: dispositivo.IMEI,
    Modelo: dispositivo.Modelo,
    Marca: dispositivo.Marca || '',
    EmpleadoID: dispositivo.EmpleadoID?.toString() || '',
    Estado: dispositivo.Estado
  }
}

const closeModal = () => {
  showCreateModal.value = false
  editingDevice.value = null
  form.value = {
    IMEI: '',
    Modelo: '',
    Marca: '',
    EmpleadoID: '',
    Estado: 'Activo'
  }
}

const handleSubmit = async () => {
  loading.value = true
  
  try {
    const data = {
      ...form.value,
      EmpleadoID: form.value.EmpleadoID || null
    }
    
    if (editingDevice.value) {
      await api.put(`/dispositivos/${editingDevice.value.DispositivoID}`, data)
    } else {
      await api.post('/dispositivos', data)
    }
    
    await loadDispositivos()
    closeModal()
  } catch (error: any) {
    console.error('Error saving device:', error)
    alert(error.response?.data?.message || 'Error al guardar el dispositivo')
  } finally {
    loading.value = false
  }
}

const viewLocation = (dispositivo: Dispositivo) => {
  router.push('/')
}

const deleteDevice = async (id: number) => {
  if (!confirm('¿Estás seguro de eliminar este dispositivo?')) return
  
  try {
    await api.delete(`/dispositivos/${id}`)
    await loadDispositivos()
  } catch (error) {
    console.error('Error deleting device:', error)
    alert('Error al eliminar el dispositivo')
  }
}
</script>

<style scoped>
.label {
  @apply block text-sm font-medium text-gray-300 mb-2;
}

.input-field {
  @apply w-full px-4 py-2 bg-dark border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors;
}

.btn-primary {
  @apply px-6 py-2 bg-primary hover:bg-primary-600 text-white font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed;
}

.btn-secondary {
  @apply px-4 py-2 bg-dark border border-gray-700 hover:border-primary text-white rounded-lg transition-all text-sm;
}

.btn-danger {
  @apply px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-all;
}

.device-card {
  @apply bg-dark-100 rounded-xl p-6 border border-primary/20 hover:border-primary/40 transition-colors;
}
</style>
