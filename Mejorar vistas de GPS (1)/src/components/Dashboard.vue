<template>
  <div class="space-y-6">
    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <transition-group name="fade">
        <div
          v-for="(stat, index) in stats"
          :key="stat.title"
          :style="{ transitionDelay: `${index * 100}ms` }"
          class="bg-neutral-900 border border-neutral-800 hover:border-orange-500/50 transition-all rounded-lg p-6"
        >
          <div class="flex items-center justify-between">
            <div>
              <p class="text-neutral-400 mb-1">{{ stat.title }}</p>
              <h3 class="text-white text-2xl">{{ stat.value }}</h3>
            </div>
            <div :class="['h-12 w-12 rounded-xl flex items-center justify-center', stat.bgColor]">
              <component :is="stat.icon" :class="['h-6 w-6', stat.iconColor]" />
            </div>
          </div>
        </div>
      </transition-group>
    </div>

    <!-- Map and Devices -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Map -->
      <div class="lg:col-span-2 bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden">
        <div class="p-4 border-b border-neutral-800">
          <h3 class="text-white">Mapa en Tiempo Real</h3>
          <p class="text-neutral-400 text-sm">Ubicación actual de dispositivos</p>
        </div>
        <MapContainer :devices="devices" />
      </div>

      <!-- Devices List -->
      <div class="bg-neutral-900 border border-neutral-800 rounded-lg">
        <div class="p-4 border-b border-neutral-800">
          <h3 class="text-white">Dispositivos Activos</h3>
          <p class="text-neutral-400 text-sm">{{ devices.length }} en línea</p>
        </div>
        <div class="p-4 space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar">
          <div
            v-for="device in devices"
            :key="device.id"
            class="p-4 bg-black border border-neutral-800 rounded-lg hover:border-orange-500 transition-all cursor-pointer"
          >
            <div class="flex items-center justify-between mb-3">
              <h4 class="text-white">{{ device.name }}</h4>
              <span
                :class="[
                  'inline-flex px-2 py-1 rounded text-xs',
                  device.status === 'active' ? 'bg-green-500/20 text-green-400' :
                  device.status === 'alert' ? 'bg-red-500/20 text-red-400' :
                  'bg-neutral-600/20 text-neutral-400'
                ]"
              >
                {{ device.status === 'active' ? 'Activo' : device.status === 'alert' ? 'Alerta' : 'Inactivo' }}
              </span>
            </div>
            
            <div class="space-y-2 text-sm text-neutral-400">
              <div class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
                <span>{{ device.lastUpdate }}</span>
              </div>
              
              <div class="flex items-center gap-4">
                <div class="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect width="16" height="10" x="2" y="7" rx="2" ry="2"/><line x1="13" x2="13" y1="17" y2="20"/><line x1="7" x2="17" y1="20" y2="20"/>
                  </svg>
                  <span>{{ device.battery }}%</span>
                </div>
                
                <div class="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M2 13a10 10 0 0 0 10 10 10 10 0 0 0 10-10"/><path d="m2 13 10-10 10 10"/>
                  </svg>
                  <span>{{ device.signal }}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, h } from 'vue';
import MapContainer from './MapContainer.vue';

interface Device {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'alert';
  lastUpdate: string;
  battery: number;
  signal: number;
  location: {
    lat: number;
    lng: number;
  };
}

const NavigationIcon = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '24', height: '24', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
  h('polygon', { points: '3 11 22 2 13 21 11 13 3 11' })
]);

const RadioIcon = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '24', height: '24', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
  h('circle', { cx: '12', cy: '12', r: '2' }),
  h('path', { d: 'M4.93 4.93a10 10 0 0 1 14.14 0' }),
  h('path', { d: 'M8.76 8.76a5 5 0 0 1 7.07 0' })
]);

const AlertIcon = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '24', height: '24', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
  h('circle', { cx: '12', cy: '12', r: '10' }),
  h('line', { x1: '12', x2: '12', y1: '8', y2: '12' }),
  h('line', { x1: '12', x2: '12.01', y1: '16', y2: '16' })
]);

const CheckIcon = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '24', height: '24', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
  h('path', { d: 'M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z' }),
  h('path', { d: 'm9 12 2 2 4-4' })
]);

const devices = ref<Device[]>([
  {
    id: '1',
    name: 'zzzaming',
    status: 'active',
    lastUpdate: 'Hace 3 min',
    battery: 85,
    signal: 95,
    location: { lat: -12.0464, lng: -77.0428 }
  },
  {
    id: '2',
    name: 'GPS Tracker Proaztazd',
    status: 'active',
    lastUpdate: 'Hace 5 min',
    battery: 72,
    signal: 88,
    location: { lat: -13.5319, lng: -71.9675 }
  },
  {
    id: '3',
    name: 'GPS Tracker Lite',
    status: 'alert',
    lastUpdate: 'Hace 15 min',
    battery: 45,
    signal: 75,
    location: { lat: -11.8765, lng: -76.9875 }
  }
]);

const stats = ref([
  {
    title: 'Dispositivos Activos',
    value: '3',
    icon: NavigationIcon,
    bgColor: 'bg-orange-500/10',
    iconColor: 'text-orange-500'
  },
  {
    title: 'En Movimiento',
    value: '2',
    icon: RadioIcon,
    bgColor: 'bg-orange-500/10',
    iconColor: 'text-orange-500'
  },
  {
    title: 'Alertas',
    value: '1',
    icon: AlertIcon,
    bgColor: 'bg-red-500/10',
    iconColor: 'text-red-500'
  },
  {
    title: 'Estado OK',
    value: '2',
    icon: CheckIcon,
    bgColor: 'bg-green-500/10',
    iconColor: 'text-green-500'
  }
]);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #171717;
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #f97316;
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #ea580c;
}
</style>
