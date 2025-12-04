<template>
  <div class="min-h-screen bg-black flex flex-col">
    <Navbar :activeView="activeView" @view-change="setActiveView" />
    
    <div class="container mx-auto p-4 md:p-6 lg:p-8 flex-1">
      <component :is="currentViewComponent" />
    </div>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import Dashboard from './components/Dashboard.vue';
import RouteHistory from './components/RouteHistory.vue';
import Geofencing from './components/Geofencing.vue';
import Alerts from './components/Alerts.vue';
import Users from './components/Users.vue';
import Devices from './components/Devices.vue';

const activeView = ref('dashboard');

const viewComponents = {
  dashboard: Dashboard,
  routes: RouteHistory,
  geofencing: Geofencing,
  alerts: Alerts,
  users: Users,
  devices: Devices,
};

const currentViewComponent = computed(() => {
  return viewComponents[activeView.value as keyof typeof viewComponents] || Dashboard;
});

const setActiveView = (view: string) => {
  activeView.value = view;
};
</script>
