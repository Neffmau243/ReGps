<template>
  <nav class="bg-neutral-900 border-b border-neutral-800 sticky top-0 z-50">
    <div class="container mx-auto px-4 md:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo and Brand -->
        <div class="flex items-center gap-3">
          <!-- Mobile Menu Button -->
          <button
            @click="mobileMenuOpen = true"
            class="lg:hidden text-white hover:bg-neutral-800 p-2 rounded-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>
            </svg>
          </button>

          <div class="flex items-center gap-2">
            <div class="h-10 w-10 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
              <span class="text-white font-bold text-lg">GPS</span>
            </div>
            <div class="hidden md:block">
              <h1 class="text-white">TrackPro</h1>
              <p class="text-neutral-400 text-xs">Sistema de Rastreo</p>
            </div>
          </div>
        </div>

        <!-- Navigation Links - Desktop -->
        <div class="hidden lg:flex items-center gap-1">
          <button
            v-for="item in navItems"
            :key="item.id"
            @click="$emit('view-change', item.id)"
            :class="[
              'flex items-center gap-2 px-4 py-2 rounded-lg transition-all',
              activeView === item.id
                ? 'bg-orange-500 text-white'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
            ]"
          >
            <component :is="item.icon" class="h-4 w-4" />
            <span>{{ item.label }}</span>
          </button>
        </div>

        <!-- Right Section -->
        <div class="flex items-center gap-4">
          <!-- Notifications -->
          <button class="relative text-white hover:text-orange-500 hover:bg-neutral-800 p-2 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
            </svg>
            <span class="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs bg-orange-500 text-white border-0 rounded-full">
              2
            </span>
          </button>

          <!-- User Profile - Desktop only -->
          <div class="hidden lg:flex items-center gap-3 pl-3 border-l border-neutral-800">
            <div class="text-right">
              <p class="text-white text-sm">Admin</p>
              <p class="text-neutral-400 text-xs">Administrador</p>
            </div>
            <button class="rounded-full bg-orange-500 hover:bg-orange-600 text-white p-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Drawer -->
    <Teleport to="body">
      <Transition name="overlay">
        <div
          v-if="mobileMenuOpen"
          class="fixed inset-0 bg-black/50 z-50"
          @click="mobileMenuOpen = false"
        />
      </Transition>
      
      <Transition name="slide">
        <div
          v-if="mobileMenuOpen"
          class="fixed top-0 left-0 bottom-0 w-[280px] bg-neutral-900 border-r border-neutral-800 z-50 flex flex-col"
        >
          <!-- Header -->
          <div class="p-6 border-b border-neutral-800">
            <div class="flex items-center gap-2">
              <div class="h-10 w-10 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                <span class="text-white font-bold text-lg">GPS</span>
              </div>
              <div>
                <h2 class="text-white">TrackPro</h2>
                <p class="text-neutral-400 text-xs">Sistema de Rastreo</p>
              </div>
            </div>
          </div>
          
          <!-- Navigation -->
          <div class="flex-1 p-4 space-y-2 overflow-y-auto">
            <button
              v-for="item in navItems"
              :key="item.id"
              @click="handleMobileNavClick(item.id)"
              :class="[
                'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all',
                activeView === item.id
                  ? 'bg-orange-500 text-white'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              ]"
            >
              <component :is="item.icon" class="h-5 w-5" />
              <span>{{ item.label }}</span>
            </button>
          </div>

          <!-- User Info -->
          <div class="p-4">
            <div class="p-4 rounded-lg bg-neutral-800 border border-neutral-700">
              <div class="flex items-center gap-3">
                <div class="h-10 w-10 rounded-full bg-orange-500 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <div>
                  <p class="text-white text-sm">Admin</p>
                  <p class="text-neutral-400 text-xs">Administrador</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </nav>
</template>

<script setup lang="ts">
import { ref, h } from 'vue';

interface NavbarProps {
  activeView: string;
}

defineProps<NavbarProps>();
const emit = defineEmits<{
  'view-change': [view: string];
}>();

const mobileMenuOpen = ref(false);

// Icon components as functional components
const MapPin = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '20', height: '20', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
  h('path', { d: 'M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z' }),
  h('circle', { cx: '12', cy: '10', r: '3' })
]);

const Route = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '20', height: '20', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
  h('circle', { cx: '6', cy: '19', r: '3' }),
  h('path', { d: 'M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15' }),
  h('circle', { cx: '18', cy: '5', r: '3' })
]);

const ShieldCheck = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '20', height: '20', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
  h('path', { d: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10' }),
  h('path', { d: 'm9 12 2 2 4-4' })
]);

const AlertTriangle = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '20', height: '20', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
  h('path', { d: 'm21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z' }),
  h('path', { d: 'M12 9v4' }),
  h('path', { d: 'M12 17h.01' })
]);

const Users = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '20', height: '20', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
  h('path', { d: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' }),
  h('circle', { cx: '9', cy: '7', r: '4' }),
  h('path', { d: 'M22 21v-2a4 4 0 0 0-3-3.87' }),
  h('path', { d: 'M16 3.13a4 4 0 0 1 0 7.75' })
]);

const Smartphone = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '20', height: '20', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
  h('rect', { width: '14', height: '20', x: '5', y: '2', rx: '2', ry: '2' }),
  h('path', { d: 'M12 18h.01' })
]);

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: MapPin },
  { id: 'routes', label: 'Rutas', icon: Route },
  { id: 'geofencing', label: 'Geofencing', icon: ShieldCheck },
  { id: 'alerts', label: 'Alertas', icon: AlertTriangle },
  { id: 'users', label: 'Usuarios', icon: Users },
  { id: 'devices', label: 'Dispositivos', icon: Smartphone },
];

const handleMobileNavClick = (viewId: string) => {
  emit('view-change', viewId);
  mobileMenuOpen.value = false;
};
</script>

<style scoped>
.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.3s ease;
}

.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
