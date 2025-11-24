<template>
  <div class="usuarios-view min-h-screen">
    <div class="container py-6 pb-40 max-w-7xl mx-auto px-4">
      <!-- Compact Header -->
      <div class="mb-6">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-3">
            <div>
              <h1 class="text-2xl font-bold text-white">Usuarios</h1>
              <p class="text-gray-500 text-xs">{{ usuarios.length }} registros</p>
            </div>
          </div>
          <button 
            @click="showCreateModal = true"
            class="btn-primary-compact"
          >
            <i class="bi bi-person-plus-fill"></i> Nuevo
          </button>
        </div>

        <!-- Inline Stats + Filters -->
        <div class="flex items-center gap-8 flex-wrap">
          <!-- Mini Stats -->
          <div class="flex items-center gap-6">
            <div class="stat-mini">
              <span class="text-white font-semibold text-sm">{{ usuarios.filter(u => u.Estado === 'Activo').length }}</span>
              <span class="text-gray-500 text-xs">Activos</span>
            </div>
            <div class="stat-mini">
              <span class="text-white font-semibold text-sm">{{ usuarios.filter(u => u.Rol === 'Administrador').length }}</span>
              <span class="text-gray-500 text-xs">Admins</span>
            </div>
          </div>

          <!-- Divider -->
          <div class="h-8 w-px bg-primary/20"></div>

          <!-- Compact Filters -->
          <div class="flex items-center gap-4 flex-1">
            <div class="relative flex-1 max-w-xs">
              <i class="bi bi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
              <input 
                v-model="searchQuery"
                type="text" 
                placeholder="Buscar..."
                class="input-compact pl-10"
              />
            </div>
            <select v-model="filterRole" class="input-compact">
              <option value="">Todos</option>
              <option value="Administrador">Admin</option>
              <option value="Empleado">Empleado</option>
            </select>
            <select v-model="filterStatus" class="input-compact">
              <option value="">Estado</option>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </div>
        </div>
      </div>
      
      <!-- Users List -->
      <div class="space-y-4">
        <div 
          v-for="usuario in filteredUsuarios" 
          :key="usuario.UsuarioID"
          class="usuario-card"
        >
          <div class="flex items-start justify-between">
            <div class="flex items-start flex-1">
              <!-- Content -->
              <div class="flex-1">
                <div class="flex items-center space-x-3 mb-2">
                  <h3 class="text-lg font-bold text-white">{{ usuario.Nombre }}</h3>
                  <span :class="getRoleBadge(usuario.Rol)">
                    {{ usuario.Rol }}
                  </span>
                  <span :class="getStatusBadge(usuario.Estado)">
                    {{ usuario.Estado }}
                  </span>
                </div>
                
                <p class="text-gray-300 mb-3 flex items-center gap-2">
                  <i class="bi bi-envelope-fill text-gray-400"></i>
                  {{ usuario.Email }}
                </p>
                
                <div class="flex items-center space-x-6 text-sm text-gray-400">
                  <div class="flex items-center space-x-2">
                    <i class="bi bi-hash"></i>
                    <span>ID: #{{ usuario.UsuarioID }}</span>
                  </div>
                  <div class="flex items-center space-x-2">
                    <i class="bi bi-clock-fill"></i>
                    <span>{{ usuario.UltimoLogin ? formatDate(usuario.UltimoLogin) : 'Sin actividad reciente' }}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Actions -->
            <div class="flex items-center gap-2">
              <button 
                @click="editUser(usuario)"
                class="action-btn edit"
                title="Editar"
              >
                <i class="bi bi-pencil-fill"></i>
              </button>
              <button 
                @click="toggleStatus(usuario)"
                class="action-btn toggle"
                :title="usuario.Estado === 'Activo' ? 'Desactivar' : 'Activar'"
              >
                <i :class="usuario.Estado === 'Activo' ? 'bi bi-toggle-on' : 'bi bi-toggle-off'"></i>
              </button>
              <button 
                @click="deleteUser(usuario.UsuarioID)"
                class="action-btn delete"
                title="Eliminar"
              >
                <i class="bi bi-trash-fill"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Empty State -->
      <div v-if="filteredUsuarios.length === 0" class="bg-dark-100 rounded-xl border border-primary/20 p-12 text-center">
        <h3 class="text-xl font-bold text-white mb-2">No hay usuarios</h3>
        <p class="text-gray-400">No se encontraron usuarios con los filtros seleccionados</p>
      </div>
    </div>
    
    <!-- Create/Edit Modal -->
    <div v-if="showCreateModal || editingUser" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <div class="flex items-center gap-3">
            <h3 class="text-2xl font-bold text-white">
              {{ editingUser ? 'Editar Usuario' : 'Nuevo Usuario' }}
            </h3>
          </div>
          <button @click="closeModal" class="modal-close">
          </button>
        </div>
        
        <!-- Modal Body -->
        <form @submit.prevent="handleSubmit" class="modal-body">
          <div class="form-group">
            <label class="form-label">
              <i class="bi bi-person-fill"></i> Nombre Completo *
            </label>
            <input 
              v-model="form.Nombre"
              type="text" 
              required
              class="form-input"
              placeholder="Ej: Juan Pérez García"
            />
          </div>
          
          <div class="form-group">
            <label class="form-label">
              <i class="bi bi-envelope-fill"></i> Email *
            </label>
            <input 
              v-model="form.Email"
              type="email" 
              required
              class="form-input"
              placeholder="ejemplo@regps.com"
            />
          </div>
          
          <div v-if="!editingUser" class="form-group">
            <label class="form-label">
              <i class="bi bi-key-fill"></i> Contraseña *
            </label>
            <input 
              v-model="form.Contraseña"
              type="password" 
              required
              class="form-input"
              placeholder="Mínimo 8 caracteres"
            />
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div class="form-group">
              <label class="form-label">
                <i class="bi bi-shield-fill"></i> Rol *
              </label>
              <select v-model="form.Rol" required class="form-input">
                <option value="" disabled>Seleccionar rol</option>
                <option value="Administrador">👑 Administrador</option>
                <option value="Empleado">👤 Empleado</option>
              </select>
            </div>
            
            <div class="form-group">
              <label class="form-label">
                Estado
              </label>
              <select v-model="form.Estado" class="form-input">
                <option value="Activo">✅ Activo</option>
                <option value="Inactivo">⛔ Inactivo</option>
              </select>
            </div>
          </div>
          
          <!-- Modal Footer -->
          <div class="flex gap-3 pt-6 border-t border-gray-700/50">
            <button 
              type="submit"
              :disabled="loading"
              class="btn-primary flex-1"
            >
              <span v-if="!loading" class="flex items-center justify-center">
                <i class="bi bi-check-circle-fill"></i> {{ editingUser ? 'Actualizar Usuario' : 'Crear Usuario' }}
              </span>
              <span v-else class="flex items-center justify-center">
                Guardando...
              </span>
            </button>
            <button 
              type="button"
              @click="closeModal"
              class="btn-secondary px-8"
            >
              <i class="bi bi-x-circle-fill"></i> Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import api from '@/services/api'

interface Usuario {
  UsuarioID: number
  Nombre: string
  Email: string
  Rol: string
  Estado: string
  UltimoLogin?: string
}

const usuarios = ref<Usuario[]>([])
const searchQuery = ref('')
const filterRole = ref('')
const filterStatus = ref('')
const showCreateModal = ref(false)
const editingUser = ref<Usuario | null>(null)
const loading = ref(false)

const form = ref({
  Nombre: '',
  Email: '',
  Contraseña: '',
  Rol: '',
  Estado: 'Activo'
})

const filteredUsuarios = computed(() => {
  return usuarios.value.filter(usuario => {
    const matchesSearch = usuario.Nombre.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         usuario.Email.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesRole = !filterRole.value || usuario.Rol === filterRole.value
    const matchesStatus = !filterStatus.value || usuario.Estado === filterStatus.value
    return matchesSearch && matchesRole && matchesStatus
  })
})

onMounted(async () => {
  await loadUsuarios()
})

const loadUsuarios = async () => {
  try {
    const response = await api.get('/usuarios')
    usuarios.value = response.data
  } catch (error) {
    console.error('Error loading users:', error)
  }
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

const editUser = (usuario: Usuario) => {
  editingUser.value = usuario
  form.value = {
    Nombre: usuario.Nombre,
    Email: usuario.Email,
    Contraseña: '',
    Rol: usuario.Rol,
    Estado: usuario.Estado
  }
}

const closeModal = () => {
  showCreateModal.value = false
  editingUser.value = null
  form.value = {
    Nombre: '',
    Email: '',
    Contraseña: '',
    Rol: '',
    Estado: 'Activo'
  }
}

const handleSubmit = async () => {
  loading.value = true
  
  try {
    if (editingUser.value) {
      await api.put(`/usuarios/${editingUser.value.UsuarioID}`, form.value)
    } else {
      await api.post('/usuarios', form.value)
    }
    
    await loadUsuarios()
    closeModal()
  } catch (error: any) {
    console.error('Error saving user:', error)
    alert(error.response?.data?.message || 'Error al guardar el usuario')
  } finally {
    loading.value = false
  }
}

const toggleStatus = async (usuario: Usuario) => {
  try {
    const newStatus = usuario.Estado === 'Activo' ? 'Inactivo' : 'Activo'
    await api.put(`/usuarios/${usuario.UsuarioID}`, { Estado: newStatus })
    await loadUsuarios()
  } catch (error) {
    console.error('Error toggling status:', error)
    alert('Error al cambiar el estado')
  }
}

const deleteUser = async (id: number) => {
  if (!confirm('¿Estás seguro de eliminar este usuario? Esta acción no se puede deshacer.')) return
  
  try {
    await api.delete(`/usuarios/${id}`)
    await loadUsuarios()
  } catch (error) {
    console.error('Error deleting user:', error)
    alert('Error al eliminar el usuario')
  }
}

const getRoleBadge = (rol: string) => {
  const base = 'px-2 py-1 text-xs rounded-full font-medium'
  return rol === 'Administrador'
    ? `${base} bg-primary/20 text-primary`
    : `${base} bg-green-500/20 text-green-500`
}

const getStatusBadge = (estado: string) => {
  return estado === 'Activo'
    ? 'px-2 py-1 bg-green-500/20 text-green-500 text-xs rounded-full'
    : 'px-2 py-1 bg-primary/10 text-gray-400 text-xs rounded-full'
}

</script>

<style scoped>
/* Usuario Card Specific Styles */
.usuario-card {
  background: transparent;
  border: 1px solid rgba(255, 107, 53, 0.2);
  border-radius: 12px;
  padding: 24px;
  transition: all 0.3s ease;
  position: relative;
}

.usuario-card::before {
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

.usuario-card:hover {
  background: rgba(255, 107, 53, 0.05);
  border-color: rgba(255, 107, 53, 0.4);
  transform: translateX(4px);
  box-shadow: 0 4px 12px rgba(255, 107, 53, 0.15);
}

.usuario-card:hover::before {
  opacity: 1;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .usuario-card {
    padding: 20px;
  }
}

@media (max-width: 992px) {
  .usuario-card {
    padding: 16px;
  }
  
  .usuario-card .flex {
    flex-direction: column;
    align-items: flex-start !important;
  }
  
  .usuario-card .action-btn {
    width: 36px;
    height: 36px;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
