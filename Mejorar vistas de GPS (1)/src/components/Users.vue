<template>
  <div class="space-y-6">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h2 class="text-white mb-2">Usuarios</h2>
        <p class="text-neutral-400">{{ users.length }} registros</p>
      </div>
      
      <button
        @click="showDialog = true"
        class="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/>
        </svg>
        Nuevo
      </button>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="bg-neutral-900 border border-neutral-800 hover:border-orange-500/50 transition-all rounded-lg p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-neutral-400 mb-1">Activos</p>
            <h3 class="text-white text-2xl">{{ activeUsers }}</h3>
          </div>
          <div class="h-12 w-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-orange-500">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-neutral-900 border border-neutral-800 hover:border-orange-500/50 transition-all rounded-lg p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-neutral-400 mb-1">Admins</p>
            <h3 class="text-white text-2xl">{{ adminUsers }}</h3>
          </div>
          <div class="h-12 w-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-orange-500">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
      <div class="flex flex-col md:flex-row gap-4">
        <input
          v-model="searchTerm"
          type="text"
          placeholder="Buscar..."
          class="flex-1 bg-black border border-neutral-800 text-white placeholder:text-neutral-400 px-4 py-2 rounded-lg focus:border-orange-500 focus:outline-none"
        />
        <select v-model="filterRole" class="w-full md:w-[150px] bg-black border border-neutral-800 text-white px-4 py-2 rounded-lg">
          <option>Todos</option>
          <option>Administrador</option>
          <option>Empleado</option>
        </select>
      </div>
    </div>

    <!-- Users List -->
    <div class="space-y-3">
      <div
        v-for="user in users"
        :key="user.id"
        class="bg-neutral-900 border border-neutral-800 hover:border-orange-500 transition-all cursor-pointer rounded-lg p-6"
      >
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div class="flex items-center gap-4 flex-1">
            <div class="h-12 w-12 rounded-full bg-orange-500/10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-orange-500">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-2">
                <h4 class="text-white">{{ user.name }}</h4>
                <span :class="['inline-flex px-2 py-1 rounded text-xs', user.role === 'Administrador' ? 'bg-orange-500/20 text-orange-400' : 'bg-green-500/20 text-green-400']">
                  {{ user.role }}
                </span>
                <span :class="['inline-flex px-2 py-1 rounded text-xs', user.status === 'Activo' ? 'bg-green-500/20 text-green-400' : 'bg-neutral-600/20 text-neutral-400']">
                  {{ user.status }}
                </span>
              </div>
              
              <div class="flex flex-col gap-1 text-sm text-neutral-400">
                <span>{{ user.email }}</span>
                <span>{{ user.deviceId }}</span>
              </div>
            </div>
          </div>

          <div class="flex gap-2">
            <button class="bg-neutral-800 text-white hover:bg-orange-500 p-2 rounded-lg transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/>
              </svg>
            </button>
            <button class="bg-neutral-800 text-red-400 hover:bg-red-500/10 p-2 rounded-lg transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Dialog -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showDialog" class="fixed inset-0 z-50 flex items-center justify-center">
          <div class="absolute inset-0 bg-black/50" @click="showDialog = false" />
          <div class="relative bg-neutral-900 border border-neutral-800 rounded-lg p-6 w-full max-w-md mx-4">
            <h3 class="text-white mb-4">Crear Nuevo Usuario</h3>
            <div class="space-y-4">
              <input type="text" placeholder="Nombre completo" class="w-full bg-black border border-neutral-800 text-white px-4 py-2 rounded-lg focus:border-orange-500 focus:outline-none" />
              <input type="email" placeholder="usuario@email.com" class="w-full bg-black border border-neutral-800 text-white px-4 py-2 rounded-lg focus:border-orange-500 focus:outline-none" />
              <select class="w-full bg-black border border-neutral-800 text-white px-4 py-2 rounded-lg focus:border-orange-500 focus:outline-none">
                <option>Administrador</option>
                <option>Empleado</option>
              </select>
              <input type="password" placeholder="••••••••" class="w-full bg-black border border-neutral-800 text-white px-4 py-2 rounded-lg focus:border-orange-500 focus:outline-none" />
            </div>
            <div class="flex gap-2 mt-6">
              <button @click="showDialog = false" class="flex-1 bg-neutral-800 text-white px-4 py-2 rounded-lg hover:bg-neutral-700 transition-colors">
                Cancelar
              </button>
              <button @click="showDialog = false" class="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors">
                Crear Usuario
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  deviceId: string;
}

const searchTerm = ref('');
const filterRole = ref('Todos');
const showDialog = ref(false);

const users = ref<User[]>([
  {
    id: '1',
    name: 'Administrador',
    email: 'admin@regps.com',
    role: 'Administrador',
    status: 'Activo',
    deviceId: '#ID: #1'
  },
  {
    id: '2',
    name: 'Juan',
    email: 'juan@regps.com',
    role: 'Empleado',
    status: 'Activo',
    deviceId: '#ID: #2'
  },
  {
    id: '3',
    name: 'María',
    email: 'maria@regps.com',
    role: 'Empleado',
    status: 'Activo',
    deviceId: '#ID: #3'
  }
]);

const activeUsers = computed(() => users.value.filter(u => u.status === 'Activo').length);
const adminUsers = computed(() => users.value.filter(u => u.role === 'Administrador').length);
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
