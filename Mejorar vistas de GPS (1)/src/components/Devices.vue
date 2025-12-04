<template>
  <div class="space-y-6">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h2 class="text-white mb-2">Dispositivos GPS</h2>
        <p class="text-neutral-400">{{ devices.length }} registrados</p>
      </div>
      
      <button
        @click="showDialog = true"
        class="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M5 12h14"/><path d="M12 5v14"/>
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
            <h3 class="text-white text-2xl">{{ activeDevices }}</h3>
          </div>
          <div class="h-12 w-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-orange-500">
              <rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/>
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-neutral-900 border border-neutral-800 hover:border-orange-500/50 transition-all rounded-lg p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-neutral-400 mb-1">Mantenimiento</p>
            <h3 class="text-white text-2xl">{{ inactiveDevices }}</h3>
          </div>
          <div class="h-12 w-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-orange-500">
              <rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/>
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
        <select v-model="filterStatus" class="w-full md:w-[150px] bg-black border border-neutral-800 text-white px-4 py-2 rounded-lg">
          <option>Todos</option>
          <option>Activo</option>
          <option>Inactivo</option>
        </select>
      </div>
    </div>

    <!-- Devices Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="device in devices"
        :key="device.id"
        :class="[
          'bg-neutral-900 border border-neutral-800 hover:border-orange-500 transition-all rounded-lg p-6',
          device.highlighted ? 'ring-2 ring-orange-500/50' : ''
        ]"
      >
        <div class="flex items-start justify-between mb-4">
          <div class="flex items-center gap-3">
            <div class="h-12 w-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-orange-500">
                <rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/>
              </svg>
            </div>
            <div>
              <h4 class="text-white mb-1">{{ device.name }}</h4>
              <span
                :class="[
                  'inline-flex px-2 py-1 rounded text-xs',
                  device.status === 'Activo' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                ]"
              >
                {{ device.status }}
              </span>
            </div>
          </div>
        </div>

        <div class="space-y-2 text-sm text-neutral-400 mb-4">
          <p>{{ device.imei }}</p>
          <p>{{ device.brand }}</p>
          <p>{{ device.owner }}</p>
          <p>{{ device.registrationDate }}</p>
        </div>

        <div class="flex gap-2 pt-4 border-t border-neutral-800">
          <button class="flex-1 bg-neutral-800 text-white hover:bg-orange-500 p-2 rounded-lg transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
            </svg>
          </button>
          <button class="flex-1 bg-neutral-800 text-white hover:bg-orange-500 p-2 rounded-lg transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/>
            </svg>
          </button>
          <button class="flex-1 bg-neutral-800 text-red-400 hover:bg-red-500/10 p-2 rounded-lg transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Dialog -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showDialog" class="fixed inset-0 z-50 flex items-center justify-center">
          <div class="absolute inset-0 bg-black/50" @click="showDialog = false" />
          <div class="relative bg-neutral-900 border border-neutral-800 rounded-lg p-6 w-full max-w-md mx-4">
            <h3 class="text-white mb-4">Registrar Nuevo Dispositivo</h3>
            <div class="space-y-4">
              <input type="text" placeholder="Nombre del dispositivo" class="w-full bg-black border border-neutral-800 text-white px-4 py-2 rounded-lg focus:border-orange-500 focus:outline-none" />
              <input type="text" placeholder="IMEI" class="w-full bg-black border border-neutral-800 text-white px-4 py-2 rounded-lg focus:border-orange-500 focus:outline-none" />
              <input type="text" placeholder="Marca" class="w-full bg-black border border-neutral-800 text-white px-4 py-2 rounded-lg focus:border-orange-500 focus:outline-none" />
              <select class="w-full bg-black border border-neutral-800 text-white px-4 py-2 rounded-lg focus:border-orange-500 focus:outline-none">
                <option>Seleccionar usuario</option>
                <option>Juan Pérez</option>
                <option>María García</option>
              </select>
            </div>
            <div class="flex gap-2 mt-6">
              <button @click="showDialog = false" class="flex-1 bg-neutral-800 text-white px-4 py-2 rounded-lg hover:bg-neutral-700 transition-colors">
                Cancelar
              </button>
              <button @click="showDialog = false" class="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors">
                Registrar
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

interface Device {
  id: string;
  name: string;
  imei: string;
  brand: string;
  owner: string;
  registrationDate: string;
  status: string;
  highlighted?: boolean;
}

const searchTerm = ref('');
const filterStatus = ref('Todos');
const showDialog = ref(false);

const devices = ref<Device[]>([
  {
    id: '1',
    name: 'GPS Tracker Proaztazd',
    imei: 'IMEI: 123456789012345',
    brand: 'Marca: TechGPS',
    owner: 'Juan Pérez',
    registrationDate: '17/11/2025',
    status: 'Activo',
    highlighted: true
  },
  {
    id: '2',
    name: 'GPS Tracker Lite',
    imei: 'IMEI: 987654321098765',
    brand: 'Marca: TechGPS',
    owner: 'Juan Pérez',
    registrationDate: '17/11/2025',
    status: 'Activo'
  },
  {
    id: '3',
    name: 'GPS Tracker Pro',
    imei: 'IMEI: 188380741960220',
    brand: 'Marca: TechGPS',
    owner: 'Juan Pérez',
    registrationDate: '12/11/2025',
    status: 'Inactivo'
  },
  {
    id: '4',
    name: 'zzzamsing',
    imei: 'IMEI: 123456789001',
    brand: 'Marca: samsung',
    owner: 'napdoll',
    registrationDate: '26/11/2025',
    status: 'Activo'
  }
]);

const activeDevices = computed(() => devices.value.filter(d => d.status === 'Activo').length);
const inactiveDevices = computed(() => devices.value.filter(d => d.status === 'Inactivo').length);
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
