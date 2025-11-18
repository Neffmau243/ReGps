<template>
  <div class="usuarios-view">
    <div class="container py-8">
      <!-- Header -->
      <div class="mb-8 flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-white mb-2">Gestión de Usuarios</h1>
          <p class="text-gray-400">Administra los usuarios del sistema</p>
        </div>
        <button 
          @click="showCreateModal = true"
          class="btn-primary"
        >
          <i class="bi bi-plus-circle mr-2"></i>
          Nuevo Usuario
        </button>
      </div>
      
      <!-- Search -->
      <div class="bg-dark-100 rounded-xl border border-primary/20 p-4 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Buscar usuario..."
              class="input-field"
            />
          </div>
          <div>
            <select v-model="filterRole" class="input-field">
              <option value="">Todos los roles</option>
              <option value="Administrador">Administrador</option>
              <option value="Empleado">Empleado</option>
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
      
      <!-- Users Table -->
      <div class="bg-dark-100 rounded-xl border border-primary/20 overflow-hidden">
        <table class="w-full">
          <thead class="bg-dark border-b border-primary/20">
            <tr>
              <th class="px-6 py-4 text-left text-sm font-medium text-gray-300">Usuario</th>
              <th class="px-6 py-4 text-left text-sm font-medium text-gray-300">Email</th>
              <th class="px-6 py-4 text-left text-sm font-medium text-gray-300">Rol</th>
              <th class="px-6 py-4 text-left text-sm font-medium text-gray-300">Estado</th>
              <th class="px-6 py-4 text-left text-sm font-medium text-gray-300">Último Login</th>
              <th class="px-6 py-4 text-right text-sm font-medium text-gray-300">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-700">
            <tr 
              v-for="usuario in filteredUsuarios" 
              :key="usuario.UsuarioID"
              class="hover:bg-dark transition-colors"
            >
              <td class="px-6 py-4">
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                    <i class="bi bi-person text-primary"></i>
                  </div>
                  <span class="text-white font-medium">{{ usuario.Nombre }}</span>
                </div>
              </td>
              <td class="px-6 py-4 text-gray-300">{{ usuario.Email }}</td>
              <td class="px-6 py-4">
                <span :class="getRoleBadge(usuario.Rol)">
                  {{ usuario.Rol }}
                </span>
              </td>
              <td class="px-6 py-4">
                <span :class="getStatusBadge(usuario.Estado)">
                  {{ usuario.Estado }}
                </span>
              </td>
              <td class="px-6 py-4 text-gray-300 text-sm">
                {{ usuario.UltimoLogin ? formatDate(usuario.UltimoLogin) : 'Nunca' }}
              </td>
              <td class="px-6 py-4 text-right">
                <div class="flex items-center justify-end space-x-2">
                  <button 
                    @click="editUser(usuario)"
                    class="btn-icon"
                    title="Editar"
                  >
                    <i class="bi bi-pencil"></i>
                  </button>
                  <button 
                    @click="toggleStatus(usuario)"
                    class="btn-icon"
                    :title="usuario.Estado === 'Activo' ? 'Desactivar' : 'Activar'"
                  >
                    <i :class="usuario.Estado === 'Activo' ? 'bi bi-toggle-on' : 'bi bi-toggle-off'"></i>
                  </button>
                  <button 
                    @click="deleteUser(usuario.UsuarioID)"
                    class="btn-icon text-red-500 hover:bg-red-500/20"
                    title="Eliminar"
                  >
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        
        <!-- Empty State -->
        <div v-if="filteredUsuarios.length === 0" class="p-12 text-center">
          <i class="bi bi-people text-gray-600 text-6xl mb-4"></i>
          <h3 class="text-xl font-bold text-white mb-2">No hay usuarios</h3>
          <p class="text-gray-400">No se encontraron usuarios con los filtros seleccionados</p>
        </div>
      </div>
    </div>
    
    <!-- Create/Edit Modal -->
    <div v-if="showCreateModal || editingUser" class="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div class="bg-dark-100 rounded-xl border border-primary/20 w-full max-w-md">
        <div class="p-6 border-b border-primary/20 flex items-center justify-between">
          <h3 class="text-xl font-bold text-white">
            {{ editingUser ? 'Editar Usuario' : 'Nuevo Usuario' }}
          </h3>
          <button @click="closeModal" class="text-gray-400 hover:text-white">
            <i class="bi bi-x-lg text-2xl"></i>
          </button>
        </div>
        
        <form @submit.prevent="handleSubmit" class="p-6 space-y-4">
          <div>
            <label class="label">Nombre Completo *</label>
            <input 
              v-model="form.Nombre"
              type="text" 
              required
              class="input-field"
              placeholder="Juan Pérez"
            />
          </div>
          
          <div>
            <label class="label">Email *</label>
            <input 
              v-model="form.Email"
              type="email" 
              required
              class="input-field"
              placeholder="usuario@regps.com"
            />
          </div>
          
          <div v-if="!editingUser">
            <label class="label">Contraseña *</label>
            <input 
              v-model="form.Contraseña"
              type="password" 
              required
              class="input-field"
              placeholder="••••••••"
            />
          </div>
          
          <div>
            <label class="label">Rol *</label>
            <select v-model="form.Rol" required class="input-field">
              <option value="">Seleccionar</option>
              <option value="Administrador">Administrador</option>
              <option value="Empleado">Empleado</option>
            </select>
          </div>
          
          <div>
            <label class="label">Estado</label>
            <select v-model="form.Estado" class="input-field">
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </div>
          
          <div class="flex space-x-3 pt-4">
            <button 
              type="submit"
              :disabled="loading"
              class="btn-primary flex-1"
            >
              <span v-if="!loading">
                {{ editingUser ? 'Actualizar' : 'Crear' }}
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

const getRoleBadge = (rol: string) => {
  return rol === 'Administrador'
    ? 'px-2 py-1 bg-primary/20 text-primary text-xs rounded-full font-medium'
    : 'px-2 py-1 bg-gray-500/20 text-gray-400 text-xs rounded-full font-medium'
}

const getStatusBadge = (estado: string) => {
  return estado === 'Activo'
    ? 'px-2 py-1 bg-green-500/20 text-green-500 text-xs rounded-full'
    : 'px-2 py-1 bg-red-500/20 text-red-500 text-xs rounded-full'
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
  if (!confirm('¿Estás seguro de eliminar este usuario?')) return
  
  try {
    await api.delete(`/usuarios/${id}`)
    await loadUsuarios()
  } catch (error) {
    console.error('Error deleting user:', error)
    alert('Error al eliminar el usuario')
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
  @apply px-6 py-2 bg-dark border border-gray-700 hover:border-primary text-white rounded-lg transition-all;
}

.btn-icon {
  @apply p-2 hover:bg-primary/10 text-gray-400 hover:text-primary rounded-lg transition-colors;
}
</style>
