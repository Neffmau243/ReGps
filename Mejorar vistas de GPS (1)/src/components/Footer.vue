<template>
  <footer class="bg-neutral-900 border-t border-neutral-800 mt-auto">
    <div class="container mx-auto px-4 md:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Brand Section -->
        <div>
          <div class="flex items-center gap-2 mb-4">
            <div class="h-10 w-10 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
              <span class="text-white font-bold text-lg">GPS</span>
            </div>
            <div>
              <h3 class="text-white">TrackPro</h3>
              <p class="text-neutral-400 text-xs">Sistema de Rastreo GPS</p>
            </div>
          </div>
          <p class="text-neutral-400 text-sm">
            Solución integral para el monitoreo y gestión de dispositivos GPS en tiempo real.
          </p>
        </div>

        <!-- Contact Info -->
        <div>
          <h4 class="text-white mb-4">Contacto</h4>
          <div class="space-y-3 text-sm">
            <div class="flex items-center gap-2 text-neutral-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-orange-500">
                <rect width="20" height="16" x="2" y="4" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
              <span>contacto@trackpro.com</span>
            </div>
            <div class="flex items-center gap-2 text-neutral-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-orange-500">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span>+1 (555) 123-4567</span>
            </div>
            <div class="flex items-center gap-2 text-neutral-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-orange-500">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <span>Ciudad de México, México</span>
            </div>
          </div>
        </div>

        <!-- Links -->
        <div>
          <h4 class="text-white mb-4">Enlaces Rápidos</h4>
          <div class="space-y-2 text-sm">
            <a href="#" class="block text-neutral-400 hover:text-orange-500 transition-colors">
              Documentación
            </a>
            <a href="#" class="block text-neutral-400 hover:text-orange-500 transition-colors">
              Soporte Técnico
            </a>
            <a href="#" class="block text-neutral-400 hover:text-orange-500 transition-colors">
              Términos y Condiciones
            </a>
            <a href="#" class="block text-neutral-400 hover:text-orange-500 transition-colors">
              Política de Privacidad
            </a>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="mt-8 pt-6 border-t border-neutral-800 text-center">
        <p class="text-neutral-400 text-sm">
          © 2025 TrackPro. Todos los derechos reservados.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
</script>
