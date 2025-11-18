import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/',
      name: 'Dashboard',
      component: () => import('@/views/Dashboard.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/historial',
      name: 'Historial',
      component: () => import('@/views/Historial.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/zonas',
      name: 'Zonas',
      component: () => import('@/views/Zonas.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/zonas/crear',
      name: 'CrearZona',
      component: () => import('@/views/CrearZona.vue'),
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/zonas/editar/:id',
      name: 'EditarZona',
      component: () => import('@/views/CrearZona.vue'),
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/alertas',
      name: 'Alertas',
      component: () => import('@/views/Alertas.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/usuarios',
      name: 'Usuarios',
      component: () => import('@/views/Usuarios.vue'),
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/dispositivos',
      name: 'Dispositivos',
      component: () => import('@/views/Dispositivos.vue'),
      meta: { requiresAuth: true, requiresAdmin: true }
    },
  ]
})

// Navigation guard
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  
  // Inicializar usuario si hay token
  await authStore.initialize()
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else if (to.path === '/login' && authStore.isAuthenticated) {
    next('/')
  } else if (to.meta.requiresAdmin && !authStore.isAdmin) {
    next('/')
  } else {
    next()
  }
})

export default router
