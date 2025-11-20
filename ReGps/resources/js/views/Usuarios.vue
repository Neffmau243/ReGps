<template>
  <div class="usuarios-view min-h-screen">
    <div class="container py-6 pb-40 max-w-7xl mx-auto px-4">
      <!-- Compact Header -->
      <div class="mb-6">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-gradient-to-br from-primary to-primary/50 rounded-xl flex items-center justify-center">
              <i class="bi bi-people-fill text-white text-lg"></i>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-white">Usuarios</h1>
              <p class="text-gray-500 text-xs">{{ usuarios.length }} registros</p>
            </div>
          </div>
          <button 
            @click="showCreateModal = true"
            class="btn-primary-compact"
          >
            <i class="bi bi-plus-circle mr-1.5"></i>
            Nuevo
          </button>
        </div>

        <!-- Inline Stats + Filters -->
        <div class="flex items-center gap-8 flex-wrap">
          <!-- Mini Stats -->
          <div class="flex items-center gap-6">
            <div class="stat-mini">
              <i class="bi bi-check-circle text-green-500 text-sm"></i>
              <span class="text-white font-semibold text-sm">{{ usuarios.filter(u => u.Estado === 'Activo').length }}</span>
              <span class="text-gray-500 text-xs">Activos</span>
            </div>
            <div class="stat-mini">
              <i class="bi bi-shield-fill-check text-primary text-sm"></i>
              <span class="text-white font-semibold text-sm">{{ usuarios.filter(u => u.Rol === 'Administrador').length }}</span>
              <span class="text-gray-500 text-xs">Admins</span>
            </div>
          </div>

          <!-- Divider -->
          <div class="h-8 w-px bg-gray-700"></div>

          <!-- Compact Filters -->
          <div class="flex items-center gap-4 flex-1">
            <div class="relative flex-1 max-w-xs">
              <i class="bi bi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs"></i>
              <input 
                v-model="searchQuery"
                type="text" 
                placeholder="Buscar..."
                class="input-compact pl-8"
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
      
      <!-- Users Table -->
      <div class="usuarios-table-container">
        <!-- Table Header -->
        <div class="usuarios-table-header">
          <div>Avatar</div>
          <div>Usuario</div>
          <div>Contacto</div>
          <div>Estado</div>
          <div>Acciones</div>
        </div>
        
        <!-- Table Body -->
        <div class="usuarios-table-body">
          <div
            v-for="usuario in filteredUsuarios"
            :key="usuario.UsuarioID"
            class="usuario-row"
          >
            <!-- Avatar -->
            <div class="usuario-avatar">
              <div class="avatar-circle">
                <i class="bi bi-person-fill"></i>
                <div 
                  class="avatar-status"
                  :class="usuario.Estado === 'Activo' ? 'active' : 'inactive'"
                ></div>
              </div>
            </div>

            <!-- User Info -->
            <div class="usuario-info">
              <h3 class="usuario-nombre">
                {{ usuario.Nombre }}
              </h3>
              <div class="usuario-meta">
                <span class="usuario-id">ID: #{{ usuario.UsuarioID }}</span>
                <span>•</span>
                <span 
                  class="role-badge-inline"
                  :class="usuario.Rol === 'Administrador' ? 'admin' : 'employee'"
                >
                  <i :class="usuario.Rol === 'Administrador' ? 'bi bi-shield-fill-check' : 'bi bi-person-badge'"></i>
                  {{ usuario.Rol }}
                </span>
              </div>
            </div>

            <!-- Contact Info -->
            <div class="usuario-contact">
              <div class="contact-item">
                <i class="bi bi-envelope-fill contact-email"></i>
                <span class="truncate">{{ usuario.Email }}</span>
              </div>
              <div class="contact-item">
                <i class="bi bi-clock-history contact-time"></i>
                <span class="truncate">{{ usuario.UltimoLogin ? formatDate(usuario.UltimoLogin) : 'Sin actividad' }}</span>
              </div>
            </div>

            <!-- Status -->
            <div class="usuario-status">
              <span 
                class="status-badge"
                :class="usuario.Estado === 'Activo' ? 'active' : 'inactive'"
              >
                <span class="status-dot"></span>
                {{ usuario.Estado }}
              </span>
            </div>

            <!-- Actions -->
            <div class="usuario-actions">
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
                :class="usuario.Estado === 'Activo' ? '' : 'activate'"
                :title="usuario.Estado === 'Activo' ? 'Pausar' : 'Activar'"
              >
                <i :class="usuario.Estado === 'Activo' ? 'bi bi-pause-circle-fill' : 'bi bi-play-circle-fill'"></i>
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

          <!-- Empty State -->
          <div v-if="filteredUsuarios.length === 0" class="empty-state">
            <i class="bi bi-inbox"></i>
            <h3>No hay usuarios</h3>
            <p>No se encontraron usuarios con los filtros seleccionados</p>
            <button @click="searchQuery = ''; filterRole = ''; filterStatus = ''" class="btn-secondary">
              <i class="bi bi-arrow-clockwise mr-2"></i>
              Limpiar filtros
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Create/Edit Modal -->
    <div v-if="showCreateModal || editingUser" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-gradient-to-br from-primary to-primary/50 rounded-lg flex items-center justify-center">
              <i class="bi bi-person-plus-fill text-white"></i>
            </div>
            <h3 class="text-2xl font-bold text-white">
              {{ editingUser ? 'Editar Usuario' : 'Nuevo Usuario' }}
            </h3>
          </div>
          <button @click="closeModal" class="modal-close">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>
        
        <!-- Modal Body -->
        <form @submit.prevent="handleSubmit" class="modal-body">
          <div class="form-group">
            <label class="form-label">
              <i class="bi bi-person mr-2"></i>
              Nombre Completo *
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
              <i class="bi bi-envelope mr-2"></i>
              Email *
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
              <i class="bi bi-lock mr-2"></i>
              Contraseña *
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
                <i class="bi bi-shield mr-2"></i>
                Rol *
              </label>
              <select v-model="form.Rol" required class="form-input">
                <option value="" disabled>Seleccionar rol</option>
                <option value="Administrador">👑 Administrador</option>
                <option value="Empleado">👤 Empleado</option>
              </select>
            </div>
            
            <div class="form-group">
              <label class="form-label">
                <i class="bi bi-toggle-on mr-2"></i>
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
                <i :class="editingUser ? 'bi bi-check-circle' : 'bi bi-plus-circle'" class="mr-2"></i>
                {{ editingUser ? 'Actualizar Usuario' : 'Crear Usuario' }}
              </span>
              <span v-else class="flex items-center justify-center">
                <i class="bi bi-arrow-repeat animate-spin mr-2"></i>
                Guardando...
              </span>
            </button>
            <button 
              type="button"
              @click="closeModal"
              class="btn-secondary px-8"
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
</script>

<style scoped>
/* ============================================
   USUARIOS VIEW - DEDICATED STYLES
   ============================================ */

/* User Table Container */
.usuarios-table-container {
  background: transparent;
  border-radius: 0;
  border: none;
  overflow: visible;
  box-shadow: none;
  margin-bottom: 200px; /* Space before footer */
}

/* Table Header */
.usuarios-table-header {
  display: grid;
  grid-template-columns: 80px 2fr 2.5fr 150px 140px;
  gap: 16px;
  padding: 16px 0;
  padding-bottom: 12px;
  background: transparent;
  border-bottom: 1px solid rgba(255, 107, 53, 0.15);
  font-weight: 600;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #9ca3af;
  margin-bottom: 8px;
}

/* Table Body */
.usuarios-table-body {
  /* Natural scrolling - no restrictions */
}

/* User Row */
.usuario-row {
  display: grid;
  grid-template-columns: 80px 2fr 2.5fr 150px 140px;
  gap: 16px;
  padding: 16px 0;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
  transition: all 0.2s ease;
  background: transparent;
  position: relative;
  border-radius: 8px;
}

.usuario-row::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(180deg, #FF6B35 0%, #FF8C5E 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.usuario-row:hover {
  background: rgba(255, 107, 53, 0.05);
  border-bottom-color: rgba(255, 107, 53, 0.15);
  padding-left: 8px;
  padding-right: 8px;
  transform: translateX(4px);
}

.usuario-row:hover::before {
  opacity: 1;
}

/* Avatar Section */
.usuario-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.avatar-circle {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: linear-gradient(135deg, #FF6B35 0%, #FF8C5E 50%, #FFB088 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  color: white;
  box-shadow: 0 4px 12px rgba(255, 107, 53, 0.4);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.avatar-circle::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.2) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.usuario-row:hover .avatar-circle {
  transform: scale(1.1) rotate(5deg);
  box-shadow: 0 6px 20px rgba(255, 107, 53, 0.6);
}

.usuario-row:hover .avatar-circle::before {
  opacity: 1;
}

/* Status Indicator on Avatar */
.avatar-status {
  position: absolute;
  bottom: -2px;
  right: -2px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 3px solid #1a1a2e;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
}

.avatar-status.active {
  background: #10b981;
  box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.2), 0 2px 8px rgba(0, 0, 0, 0.4);
  animation: pulse-green 2s ease-in-out infinite;
}

.avatar-status.inactive {
  background: #ef4444;
  box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.2), 0 2px 8px rgba(0, 0, 0, 0.4);
}

@keyframes pulse-green {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7), 0 2px 8px rgba(0, 0, 0, 0.4);
  }
  50% {
    box-shadow: 0 0 0 8px rgba(16, 185, 129, 0), 0 2px 8px rgba(0, 0, 0, 0.4);
  }
}

/* User Info Section */
.usuario-info {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}

.usuario-nombre {
  font-size: 16px;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.usuario-nombre:hover {
  color: #FF8C5E;
}

.usuario-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #9ca3af;
}

.usuario-id {
  font-family: 'Courier New', monospace;
  color: #6b7280;
  font-size: 12px;
}

.role-badge-inline {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.role-badge-inline.admin {
  background: rgba(255, 107, 53, 0.15);
  color: #FF8C5E;
  border: 1px solid rgba(255, 107, 53, 0.3);
}

.role-badge-inline.employee {
  background: rgba(107, 114, 128, 0.15);
  color: #9ca3af;
  border: 1px solid rgba(107, 114, 128, 0.3);
}

/* Contact Section */
.usuario-contact {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #d1d5db;
  transition: all 0.2s ease;
}

.contact-item i {
  width: 16px;
  text-align: center;
  font-size: 13px;
}

.contact-item:hover {
  color: #ffffff;
  transform: translateX(4px);
}

.contact-email {
  color: #60a5fa;
}

.contact-time {
  color: #9ca3af;
  font-size: 13px;
}

/* Status Badge */
.usuario-status {
  display: flex;
  justify-content: center;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  border: 1px solid;
  transition: all 0.3s ease;
}

.status-badge.active {
  background: rgba(16, 185, 129, 0.1);
  border-color: rgba(16, 185, 129, 0.3);
  color: #10b981;
}

.status-badge.inactive {
  background: rgba(239, 68, 68, 0.1);
  border-color: rgba(239, 68, 68, 0.3);
  color: #ef4444;
}

.status-badge:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  animation: pulse-dot 2s ease-in-out infinite;
}

.status-badge.active .status-dot {
  background: #10b981;
}

.status-badge.inactive .status-dot {
  background: #ef4444;
}

@keyframes pulse-dot {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.2);
  }
}

/* Actions Section */
.usuario-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
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

.action-btn:active {
  transform: translateY(-1px) scale(1.05);
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

.action-btn.toggle.activate {
  color: #10b981;
  border-color: rgba(16, 185, 129, 0.3);
}

.action-btn.toggle.activate:hover {
  background: rgba(16, 185, 129, 0.15);
  border-color: rgba(16, 185, 129, 0.5);
  box-shadow: 0 8px 16px rgba(16, 185, 129, 0.3);
}

.action-btn.delete {
  color: #ef4444;
  border-color: rgba(239, 68, 68, 0.3);
}

.action-btn.delete:hover {
  background: rgba(239, 68, 68, 0.15);
  border-color: rgba(239, 68, 68, 0.5);
  box-shadow: 0 8px 16px rgba(239, 68, 68, 0.3);
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 80px 40px;
  color: #9ca3af;
}

.empty-state i {
  font-size: 64px;
  color: #4b5563;
  margin-bottom: 20px;
  opacity: 0.5;
}

.empty-state h3 {
  font-size: 24px;
  font-weight: 700;
  color: #d1d5db;
  margin-bottom: 12px;
}

.empty-state p {
  font-size: 16px;
  color: #6b7280;
  margin-bottom: 24px;
}


/* Responsive Design */
@media (max-width: 1200px) {
  .usuarios-table-header,
  .usuario-row {
    grid-template-columns: 70px 1.5fr 2fr 130px 120px;
    gap: 12px;
    padding: 16px 20px;
  }
  
  .avatar-circle {
    width: 48px;
    height: 48px;
  }
}

@media (max-width: 992px) {
  .usuarios-table-header {
    display: none;
  }
  
  .usuario-row {
    grid-template-columns: 1fr;
    gap: 16px;
    padding: 20px;
  }
  
  .usuario-avatar,
  .usuario-info,
  .usuario-contact,
  .usuario-status,
  .usuario-actions {
    justify-content: flex-start;
  }
  
  .usuario-actions {
    gap: 12px;
  }
}

/* Additional Global Styles */

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

.input-compact:hover {
  background: rgba(255, 255, 255, 0.07);
  border-color: rgba(255, 107, 53, 0.3);
}

.input-compact::placeholder {
  color: #9ca3af;
  font-size: 13px;
}

/* Select dropdown options styling */
.input-compact option {
  background: #1f2937;
  color: #ffffff;
  padding: 12px;
  font-size: 14px;
  font-weight: 500;
}

.input-compact option:hover {
  background: #374151;
}

.input-compact option:checked {
  background: linear-gradient(135deg, #FF6B35 0%, #FF8C5E 100%);
  color: #ffffff;
  font-weight: 600;
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

.btn-primary-compact:active {
  transform: translateY(0);
}

/* Existing Styles */
.stat-card {
  background: #1a1a2e;
  border-radius: 16px;
  border: 1px solid;
  padding: 24px;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

.input-field {
  width: 100%;
  padding: 12px 16px;
  background: #0f1419;
  border: 1px solid #374151;
  border-radius: 12px;
  color: white;
  transition: all 0.3s ease;
}

.input-field:focus {
  outline: none;
  border-color: #7c3aed;
  box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1);
}

.input-field::placeholder {
  color: #6b7280;
}

.btn-primary {
  padding: 12px 24px;
  background: linear-gradient(135deg, #FF6B35 0%, #FF8C5E 100%);
  color: white;
  font-weight: 700;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(255, 107, 53, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(255, 107, 53, 0.4);
}

.btn-primary:active {
  transform: translateY(0);
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-secondary {
  padding: 12px 24px;
  background: #0f1419;
  border: 2px solid #374151;
  color: white;
  font-weight: 600;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  border-color: #FF6B35;
  background: #1a1a2e;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  padding: 16px;
  animation: fadeIn 0.2s ease-out;
}

.modal-content {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border-radius: 20px;
  border: 1px solid rgba(124, 58, 237, 0.3);
  width: 100%;
  max-width: 600px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  animation: slideUp 0.3s ease-out;
}

.modal-header {
  padding: 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal-body {
  padding: 24px;
}

.modal-close {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  color: #9ca3af;
  background: transparent;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.3s ease;
}

.modal-close:hover {
  color: white;
  background: rgba(239, 68, 68, 0.2);
  border-color: rgba(239, 68, 68, 0.3);
}

.form-label {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  color: #d1d5db;
  margin-bottom: 8px;
}

.form-input {
  width: 100%;
  padding: 12px 16px;
  background: #0f1419;
  border: 1px solid #374151;
  border-radius: 12px;
  color: white;
  transition: all 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: #7c3aed;
  box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1);
}

.form-input:hover {
  border-color: #4b5563;
}

.form-group {
  margin-bottom: 16px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
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
