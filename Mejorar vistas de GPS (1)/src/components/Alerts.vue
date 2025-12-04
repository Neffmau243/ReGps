<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-white mb-2">Alertas del Sistema</h2>
      <p class="text-neutral-400">{{ alerts.length }} alertas registradas</p>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="bg-neutral-900 border border-neutral-800 hover:border-orange-500/50 transition-all rounded-lg p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-neutral-400 mb-1">Pendientes</p>
            <h3 class="text-white text-2xl">{{ pendingCount }}</h3>
          </div>
          <div class="h-12 w-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-orange-500">
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-neutral-900 border border-neutral-800 hover:border-orange-500/50 transition-all rounded-lg p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-neutral-400 mb-1">Resueltas</p>
            <h3 class="text-white text-2xl">{{ resolvedCount }}</h3>
          </div>
          <div class="h-12 w-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-orange-500">
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/>
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-neutral-900 border border-neutral-800 hover:border-orange-500/50 transition-all rounded-lg p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-neutral-400 mb-1">Críticas</p>
            <h3 class="text-white text-2xl">{{ criticalCount }}</h3>
          </div>
          <div class="h-12 w-12 rounded-xl bg-red-500/10 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-red-500">
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>
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
        <select v-model="filterType" class="w-full md:w-[150px] bg-black border border-neutral-800 text-white px-4 py-2 rounded-lg">
          <option>Todas</option>
          <option>Zona</option>
          <option>Velocidad</option>
          <option>Batería</option>
        </select>
      </div>
    </div>

    <!-- Alerts List -->
    <div class="space-y-3">
      <div
        v-for="alert in alerts"
        :key="alert.id"
        :class="[
          'bg-neutral-900 border border-neutral-800 hover:border-orange-500 transition-all cursor-pointer rounded-lg p-6',
          alert.resolved ? 'opacity-60' : ''
        ]"
      >
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div class="flex items-center gap-4 flex-1">
            <div :class="['h-12 w-12 rounded-xl flex items-center justify-center', getSeverityBg(alert.severity)]">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" :class="getSeverityColor(alert.severity)">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-2">
                <h4 class="text-white">{{ alert.type }}</h4>
                <span :class="['inline-flex px-2 py-1 rounded text-xs', getSeverityBadge(alert.severity)]">
                  {{ alert.severity }}
                </span>
              </div>
              
              <div class="flex items-center gap-4 text-sm text-neutral-400">
                <span>{{ alert.device }}</span>
                <span>•</span>
                <span>{{ alert.date }}, {{ alert.time }}</span>
              </div>
            </div>
          </div>

          <button class="bg-neutral-800 text-white hover:bg-orange-500 px-4 py-2 rounded-lg transition-colors">
            Ver
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface Alert {
  id: string;
  type: string;
  severity: string;
  device: string;
  date: string;
  time: string;
  resolved: boolean;
}

const searchTerm = ref('');
const filterType = ref('Todas');

const alerts = ref<Alert[]>([
  {
    id: '1',
    type: 'Zona',
    severity: 'Media',
    device: 'Dispositivo #1',
    date: '18/11/2025',
    time: '16:29',
    resolved: false
  },
  {
    id: '2',
    type: 'Velocidad',
    severity: 'Alta',
    device: 'Dispositivo #2',
    date: '17/11/2025',
    time: '10:12',
    resolved: true
  },
  {
    id: '3',
    type: 'Batería',
    severity: 'Baja',
    device: 'Dispositivo #2',
    date: '17/11/2025',
    time: '09:24',
    resolved: false
  }
]);

const pendingCount = computed(() => alerts.value.filter(a => !a.resolved).length);
const resolvedCount = computed(() => alerts.value.filter(a => a.resolved).length);
const criticalCount = computed(() => alerts.value.filter(a => !a.resolved && a.severity === 'Alta').length);

const getSeverityColor = (severity: string) => {
  if (severity === 'Alta') return 'text-red-500';
  if (severity === 'Media') return 'text-orange-500';
  return 'text-green-500';
};

const getSeverityBg = (severity: string) => {
  if (severity === 'Alta') return 'bg-red-500/10';
  if (severity === 'Media') return 'bg-orange-500/10';
  return 'bg-green-500/10';
};

const getSeverityBadge = (severity: string) => {
  if (severity === 'Alta') return 'bg-red-500/20 text-red-400';
  if (severity === 'Media') return 'bg-orange-500/20 text-orange-400';
  return 'bg-green-500/20 text-green-400';
};
</script>
