<template>
  <div class="space-y-6">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h2 class="text-white mb-2">Zonas de Geofencing</h2>
        <p class="text-neutral-400">{{ zones.length }} zonas configuradas</p>
      </div>
      
      <button
        @click="showDialog = true"
        class="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M5 12h14"/><path d="M12 5v14"/>
        </svg>
        Nueva Zona
      </button>
    </div>

    <!-- Map -->
    <div class="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden">
      <div class="p-4 border-b border-neutral-800">
        <h3 class="text-white">Mapa de Zonas</h3>
        <p class="text-neutral-400 text-sm">Áreas geográficas monitoreadas</p>
      </div>
      <div class="relative w-full h-[400px] bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center">
        <div class="text-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mx-auto mb-4 text-orange-500">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
            <path d="m9 12 2 2 4-4"/>
          </svg>
          <p class="text-neutral-400">Vista de Zonas de Geofencing</p>
        </div>
      </div>
    </div>

    <!-- Zones List -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="zone in zones"
        :key="zone.id"
        class="bg-neutral-900 border border-neutral-800 hover:border-orange-500 transition-all rounded-lg p-6"
      >
        <div class="flex items-start justify-between mb-4">
          <div class="flex items-center gap-3">
            <div class="h-12 w-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-orange-500">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
              </svg>
            </div>
            <div>
              <h4 class="text-white mb-1">{{ zone.name }}</h4>
              <span
                :class="[
                  'inline-flex px-2 py-1 rounded text-xs',
                  zone.type === 'Entrada' ? 'bg-green-500/20 text-green-400' :
                  zone.type === 'Salida' ? 'bg-red-500/20 text-red-400' :
                  'bg-orange-500/20 text-orange-400'
                ]"
              >
                {{ zone.type }}
              </span>
            </div>
          </div>
        </div>

        <div class="space-y-2 text-sm text-neutral-400 mb-4">
          <p>Radio: {{ zone.radius }}</p>
          <p>{{ zone.devices }}</p>
          <p>{{ zone.created }}</p>
        </div>

        <div class="flex gap-2 pt-4 border-t border-neutral-800">
          <button class="flex-1 bg-neutral-800 text-white hover:bg-orange-500 px-3 py-2 rounded-lg transition-colors">
            Editar
          </button>
          <button class="flex-1 bg-neutral-800 text-red-400 hover:bg-red-500/10 px-3 py-2 rounded-lg transition-colors">
            Eliminar
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
            <h3 class="text-white mb-4">Crear Nueva Zona</h3>
            <div class="space-y-4">
              <input type="text" placeholder="Nombre de la zona" class="w-full bg-black border border-neutral-800 text-white px-4 py-2 rounded-lg focus:border-orange-500 focus:outline-none" />
              <select class="w-full bg-black border border-neutral-800 text-white px-4 py-2 rounded-lg focus:border-orange-500 focus:outline-none">
                <option>Entrada</option>
                <option>Salida</option>
                <option>Ambas</option>
              </select>
              <input type="number" placeholder="Radio (metros)" class="w-full bg-black border border-neutral-800 text-white px-4 py-2 rounded-lg focus:border-orange-500 focus:outline-none" />
            </div>
            <div class="flex gap-2 mt-6">
              <button @click="showDialog = false" class="flex-1 bg-neutral-800 text-white px-4 py-2 rounded-lg hover:bg-neutral-700 transition-colors">
                Cancelar
              </button>
              <button @click="showDialog = false" class="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors">
                Crear Zona
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Zone {
  id: string;
  name: string;
  type: string;
  radius: string;
  devices: string;
  created: string;
}

const showDialog = ref(false);

const zones = ref<Zone[]>([
  {
    id: '1',
    name: 'Zona Centro',
    type: 'Entrada',
    radius: '500m',
    devices: '3 dispositivos',
    created: 'Creada: 15/11/2025'
  },
  {
    id: '2',
    name: 'Zona Industrial',
    type: 'Salida',
    radius: '750m',
    devices: '2 dispositivos',
    created: 'Creada: 12/11/2025'
  },
  {
    id: '3',
    name: 'Zona Residencial',
    type: 'Ambas',
    radius: '300m',
    devices: '1 dispositivo',
    created: 'Creada: 10/11/2025'
  }
]);
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
