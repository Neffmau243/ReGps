<template>
  <nav class="navbar">
    <div class="navbar-container">
      <!-- Logo -->
      <router-link to="/" class="navbar-logo">
        <div class="logo-icon">
          <i class="bi bi-broadcast"></i>
        </div>
        <span class="logo-text">Re<span class="text-primary">GPS</span></span>
      </router-link>
      
      <!-- Desktop Navigation -->
      <div class="desktop-menu">
        <template v-if="authStore.isAdmin">
          <router-link to="/" class="nav-link" :class="{ 'active': $route.path === '/' }">
            <i class="bi bi-speedometer2"></i>
            <span>Dashboard</span>
          </router-link>
          
          <router-link to="/historial" class="nav-link" :class="{ 'active': $route.path === '/historial' }">
            <i class="bi bi-clock-history"></i>
            <span>Historial</span>
          </router-link>
          
          <router-link to="/zonas" class="nav-link" :class="{ 'active': $route.path.startsWith('/zonas') }">
            <i class="bi bi-geo-alt-fill"></i>
            <span>Zonas</span>
          </router-link>
          
          <router-link to="/alertas" class="nav-link" :class="{ 'active': $route.path === '/alertas' }">
            <i class="bi bi-bell-fill"></i>
            <span>Alertas</span>
            <span v-if="alertCount > 0" class="badge-notification">{{ alertCount }}</span>
          </router-link>
          
          <router-link to="/usuarios" class="nav-link" :class="{ 'active': $route.path === '/usuarios' }">
            <i class="bi bi-person-fill"></i>
            <span>Usuarios</span>
          </router-link>
          
          <router-link to="/dispositivos" class="nav-link" :class="{ 'active': $route.path === '/dispositivos' }">
            <i class="bi bi-phone-fill"></i>
            <span>Dispositivos</span>
          </router-link>
        </template>
        
        <template v-else>
          <router-link to="/empleado" class="nav-link" :class="{ 'active': $route.path === '/empleado' }">
            <i class="bi bi-speedometer2"></i>
            <span>Mi Panel</span>
          </router-link>
        </template>
      </div>
      
      <!-- Desktop User & Logout -->
      <div class="desktop-actions">
        <div class="user-info">
          <p class="user-name">{{ authStore.user?.Nombre }}</p>
          <p class="user-role">{{ authStore.user?.Rol }}</p>
        </div>
        
        <button @click="handleLogout" class="btn-logout">
          <i class="bi bi-box-arrow-right"></i>
          <span>Salir</span>
        </button>
      </div>
        
      <!-- Hamburger Button (Mobile) -->
      <button @click="toggleMobileMenu" class="hamburger" :class="{ 'active': isMobileMenuOpen }">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
    
    <!-- Mobile Menu -->
    <div v-if="isMobileMenuOpen" class="mobile-menu">
      <div class="mobile-user">
        <p class="mobile-user-name">{{ authStore.user?.Nombre }}</p>
        <p class="mobile-user-role">{{ authStore.user?.Rol }}</p>
      </div>
      
      <div class="mobile-links">
        <template v-if="authStore.isAdmin">
          <router-link to="/" class="mobile-link" @click="closeMobileMenu">
            <i class="bi bi-speedometer2"></i>
            <span>Dashboard</span>
          </router-link>
          
          <router-link to="/historial" class="mobile-link" @click="closeMobileMenu">
            <i class="bi bi-clock-history"></i>
            <span>Historial</span>
          </router-link>
          
          <router-link to="/zonas" class="mobile-link" @click="closeMobileMenu">
            <i class="bi bi-geo-alt-fill"></i>
            <span>Zonas</span>
          </router-link>
          
          <router-link to="/alertas" class="mobile-link" @click="closeMobileMenu">
            <i class="bi bi-bell-fill"></i>
            <span>Alertas</span>
          </router-link>
          
          <router-link to="/usuarios" class="mobile-link" @click="closeMobileMenu">
            <i class="bi bi-person-fill"></i>
            <span>Usuarios</span>
          </router-link>
          
          <router-link to="/dispositivos" class="mobile-link" @click="closeMobileMenu">
            <i class="bi bi-phone-fill"></i>
            <span>Dispositivos</span>
          </router-link>
        </template>
        
        <template v-else>
          <router-link to="/empleado" class="mobile-link" @click="closeMobileMenu">
            <i class="bi bi-speedometer2"></i>
            <span>Mi Panel</span>
          </router-link>
        </template>
      </div>
      
      <button @click="handleLogout" class="mobile-logout">
        <i class="bi bi-box-arrow-right"></i>
        <span>Cerrar Sesión</span>
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const alertCount = ref(0)
const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  if (isMobileMenuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
  document.body.style.overflow = ''
}

const handleLogout = async () => {
  closeMobileMenu()
  await authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.navbar {
  background: linear-gradient(135deg, var(--color-dark-100) 0%, var(--color-dark) 100%);
  border-bottom: 1px solid rgba(255, 107, 53, 0.2);
  position: sticky;
  top: 0;
  z-index: 1000;
  backdrop-filter: blur(10px);
}

.navbar-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
}

/* Logo */
.navbar-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  transition: transform 0.2s ease;
}

.navbar-logo:hover {
  transform: scale(1.05);
}

.logo-icon {
  width: 2.5rem;
  height: 2.5rem;
  background: linear-gradient(135deg, #FF6B35 0%, #e85a2a 100%);
  border-radius: 0.625rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  color: white;
  box-shadow: 0 4px 12px rgba(255, 107, 53, 0.3);
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
}

.text-primary {
  color: #FF6B35;
}

/* Desktop Menu */
.desktop-menu {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  border-radius: 0.5rem;
  color: #9ca3af;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
  position: relative;
}

.nav-link:hover {
  color: white;
  background-color: rgba(255, 107, 53, 0.1);
}

.nav-link.active {
  color: #FF6B35;
  background-color: rgba(255, 107, 53, 0.1);
}

.nav-link i {
  font-size: 1rem;
}

.badge-notification {
  padding: 0.125rem 0.5rem;
  background-color: #ef4444;
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  border-radius: 9999px;
  min-width: 1.25rem;
  text-align: center;
}

/* Desktop Actions */
.desktop-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-info {
  text-align: right;
}

.user-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: white;
  margin: 0;
}

.user-role {
  font-size: 0.75rem;
  color: #9ca3af;
  margin: 0;
}

.btn-logout {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  background-color: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-logout:hover {
  background-color: rgba(239, 68, 68, 0.2);
  transform: translateY(-2px);
}

/* Hamburger */
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 1.75rem;
  height: 1.25rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
}

.hamburger span {
  width: 100%;
  height: 2px;
  background-color: white;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.hamburger.active span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.hamburger.active span:nth-child(2) {
  opacity: 0;
}

.hamburger.active span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* Mobile Menu */
.mobile-menu {
  position: fixed;
  top: 4rem;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(180deg, #1a1d23 0%, #0f1115 100%);
  overflow-y: auto;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  z-index: 999;
}

.mobile-user {
  padding: 1rem;
  background: rgba(255, 107, 53, 0.1);
  border: 1px solid rgba(255, 107, 53, 0.3);
  border-radius: 12px;
}

.mobile-user-name {
  font-size: 1rem;
  font-weight: 700;
  color: white;
  margin: 0 0 0.25rem 0;
}

.mobile-user-role {
  font-size: 0.875rem;
  color: #FF6B35;
  font-weight: 500;
  margin: 0;
}

.mobile-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
}

.mobile-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  border-radius: 10px;
  color: #d1d5db;
  text-decoration: none;
  font-size: 0.9375rem;
  font-weight: 600;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.mobile-link:hover,
.mobile-link.router-link-active {
  color: white;
  background-color: rgba(255, 107, 53, 0.1);
  border-color: rgba(255, 107, 53, 0.2);
}

.mobile-link i {
  font-size: 1.25rem;
  width: 1.5rem;
}

.mobile-logout {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem;
  font-size: 0.9375rem;
  font-weight: 600;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 10px;
  color: #ef4444;
  cursor: pointer;
  transition: all 0.2s ease;
}

.mobile-logout:hover {
  background: rgba(239, 68, 68, 0.2);
  border-color: rgba(239, 68, 68, 0.5);
}

/* Responsive */
@media (max-width: 768px) {
  .desktop-menu,
  .desktop-actions {
    display: none;
  }

  .hamburger {
    display: flex;
  }
}

@media (min-width: 769px) {
  .hamburger,
  .mobile-menu {
    display: none !important;
  }
}
</style>
