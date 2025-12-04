<template>
  <div class="relative w-full h-[400px] lg:h-[500px] bg-neutral-800">
    <div
      ref="mapContainer"
      class="w-full h-full"
    />
    
    <!-- Map placeholder with markers -->
    <div class="absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center">
      <div class="text-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mx-auto mb-4 text-orange-500">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
        <p class="text-neutral-400">Mapa GPS - {{ devices.length }} dispositivos</p>
        <p class="text-neutral-500 text-sm mt-2">Vista de ubicaciones en tiempo real</p>
      </div>
    </div>
    
    <!-- Device markers simulation -->
    <div
      v-for="(device, index) in devices"
      :key="device.id"
      :style="{
        position: 'absolute',
        top: `${30 + index * 20}%`,
        left: `${25 + index * 15}%`,
        zIndex: 10
      }"
      class="animate-pulse"
    >
      <div class="relative">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-orange-500 drop-shadow-lg">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
        <div class="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-neutral-900 border border-orange-500 px-2 py-1 rounded whitespace-nowrap text-xs text-white">
          {{ device.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface Device {
  id: string;
  name: string;
  status: string;
  location: {
    lat: number;
    lng: number;
  };
}

interface Props {
  devices: Device[];
}

const props = defineProps<Props>();
const mapContainer = ref<HTMLDivElement | null>(null);

onMounted(() => {
  // Aquí se inicializaría un mapa real (Leaflet, Google Maps, etc.)
  console.log('Map initialized with devices:', props.devices);
});
</script>
