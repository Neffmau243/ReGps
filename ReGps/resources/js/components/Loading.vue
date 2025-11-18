<template>
  <div class="loading-overlay" :class="{ 'loading-fullscreen': fullscreen }">
    <div class="loading-container">
      <div class="loading-spinner"></div>
      <p v-if="message" class="loading-message">{{ message }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  message?: string
  fullscreen?: boolean
}

withDefaults(defineProps<Props>(), {
  fullscreen: false
})
</script>

<style scoped>
.loading-overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.loading-fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
  z-index: 9999;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.loading-spinner {
  width: 3rem;
  height: 3rem;
  border: 4px solid var(--color-dark-300);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-message {
  color: white;
  font-size: 0.875rem;
  font-weight: 500;
}
</style>
