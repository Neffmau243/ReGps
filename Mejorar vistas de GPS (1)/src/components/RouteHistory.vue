<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-white mb-2">Historial de Rutas</h2>
      <p class="text-neutral-400">Registro completo de trayectorias</p>
    </div>

    <!-- Filters -->
    <div class="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          v-model="searchTerm"
          type="text"
          placeholder="Buscar dispositivo..."
          class="bg-black border border-neutral-800 text-white placeholder:text-neutral-400 px-4 py-2 rounded-lg focus:border-orange-500 focus:outline-none"
        />
        <select v-model="selectedDevice" class="bg-black border border-neutral-800 text-white px-4 py-2 rounded-lg focus:border-orange-500 focus:outline-none">
          <option value="">Todos los dispositivos</option>
          <option value="1">zzzaming</option>
          <option value="2">GPS Tracker Proaztazd</option>
        </select>
        <input
          v-model="dateFrom"
          type="date"
          class="bg-black border border-neutral-800 text-white px-4 py-2 rounded-lg focus:border-orange-500 focus:outline-none"
        />
        <input
          v-model="dateTo"
          type="date"
          class="bg-black border border-neutral-800 text-white px-4 py-2 rounded-lg focus:border-orange-500 focus:outline-none"
        />
      </div>
    </div>

    <!-- Routes List -->
    <div class="space-y-4">
      <div
        v-for="route in routes"
        :key="route.id"
        class="bg-neutral-900 border border-neutral-800 hover:border-orange-500 transition-all rounded-lg p-6 cursor-pointer"
      >
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div class="flex items-center gap-4 flex-1">
            <div class="h-12 w-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-orange-500">
                <circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/>
              </svg>
            </div>
            
            <div class="flex-1">
              <h4 class="text-white mb-2">{{ route.device }}</h4>
              <div class="flex flex-wrap items-center gap-4 text-sm text-neutral-400">
                <span>{{ route.date }}</span>
                <span>•</span>
                <span>{{ route.distance }}</span>
                <span>•</span>
                <span>{{ route.duration }}</span>
              </div>
            </div>
          </div>

          <button class="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors">
            Ver Ruta
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Route {
  id: string;
  device: string;
  date: string;
  distance: string;
  duration: string;
}

const searchTerm = ref('');
const selectedDevice = ref('');
const dateFrom = ref('');
const dateTo = ref('');

const routes = ref<Route[]>([
  {
    id: '1',
    device: 'zzzaming',
    date: '18/11/2025',
    distance: '45.2 km',
    duration: '2h 15min'
  },
  {
    id: '2',
    device: 'GPS Tracker Proaztazd',
    date: '17/11/2025',
    distance: '32.8 km',
    duration: '1h 45min'
  },
  {
    id: '3',
    device: 'GPS Tracker Lite',
    date: '17/11/2025',
    distance: '28.5 km',
    duration: '1h 30min'
  }
]);
</script>
