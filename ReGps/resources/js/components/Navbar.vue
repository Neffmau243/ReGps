<template>
  <nav class="navbar">
    <div class="navbar-container">
      <!-- Logo -->
      <router-link to="/" class="navbar-logo">
        <div class="logo-icon">
          <i class="bi bi-geo-alt-fill"></i>
        </div>
        <span class="logo-text">Re<span class="text-primary">GPS</span></span>
      </router-link>
      
      <!-- Desktop Navigation -->
      <div class="navbar-menu desktop-menu">
        <!-- Admin Navigation -->
        <template v-if="authStore.isAdmin">
          <router-link 
            to="/" 
            class="nav-link"
            :class="{ 'active': $route.path === '/' }"
          >
            <i class="bi bi-speedometer2"></i>
            <span>Dashboard</span>
          </router-link>
          
          <router-link 
            to="/historial" 
            class="nav-link"
            :class="{ 'active': $route.path === '/historial' }"
          >
            <i class="bi bi-clock-history"></i>
            <span>Historial</span>
          </router-link>
          
          <router-link 
            to="/zonas" 
            class="nav-link"
            :class="{ 'active': $route.path.startsWith('/zonas') }"
          >
            <i class="bi bi-geo-fill"></i>
            <span>Zonas</span>
          </router-link>
          
          <router-link 
            to="/alertas" 
            class="nav-link"
            :class="{ 'active': $route.path === '/alertas' }"
          >
            <i class="bi bi-bell-fill"></i>
            <span>Alertas</span>
            <span v-if="alertCount > 0" class="badge-notification">
              {{ alertCount }}
            </span>
          </router-link>
          
          <router-link 
            to="/usuarios" 
            class="nav-link"
            :class="{ 'active': $route.path === '/usuarios' }"
          >
            <i class="bi bi-people-fill"></i>
            <span>Usuarios</span>
          </router-link>
          
          <router-link 
            to="/dispositivos" 
            class="nav-link"
            :class="{ 'active': $route.path === '/dispositivos' }"
          >
            <i class="bi bi-phone-fill"></i>
            <span>Dispositivos</span>
          </router-link>
        </template>
        
        <!-- Employee Navigation -->
        <template v-else>
          <router-link 
            to="/empleado" 
            class="nav-link"
            :class="{ 'active': $route.path === '/empleado' }"
          >
            <i class="bi bi-house-fill"></i>
            <span>Mi Panel</span>
          </router-link>
        </template>
      </div>
      
      <!-- User Actions -->
      <div class="navbar-actions">
        <!-- User Info (Desktop) -->
        <div class="user-info">
          <p class="user-name">{{ authStore.user?.Nombre }}</p>
          <p class="user-role">{{ authStore.user?.Rol }}</p>
        </div>
        
        <!-- Logout Button (Desktop) -->
        <button 
          @click="handleLogout"
          class="btn-logout desktop-logout"
        >
          <i class="bi bi-box-arrow-right"></i>
          <span>Salir</span>
        </button>
        
        <!-- Mobile Menu Toggle -->
        <button 
          @click="toggleMobileMenu"
          class="mobile-menu-toggle"
          :class="{ 'active': isMobileMenuOpen }"
          aria-label="Toggle menu"
        >
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
        </button>
      </div>
    </div>
    
    <!-- Mobile Menu Overlay -->
    <Transition name="mobile-menu">
      <div v-if="isMobileMenuOpen" class="mobile-menu-overlay" @click="closeMobileMenu">
        <div class="mobile-menu" @click.stop>
          <!-- User Info Mobile -->
          <div class="mobile-user-info">
            <div class="mobile-user-avatar">
              <i class="bi bi-person-circle"></i>
            </div>
            <div>
              <p class="mobile-user-name">{{ authStore.user?.Nombre }}</p>
              <p class="mobile-user-role">{{ authStore.user?.Rol }}</p>
            </div>
          </div>
          
          <!-- Mobile Navigation -->
          <nav class="mobile-nav">
            <!-- Admin Navigation -->
            <template v-if="authStore.isAdmin">
              <router-link 
                to="/" 
                class="mobile-nav-link"
                :class="{ 'active': $route.path === '/' }"
                @click="closeMobileMenu"
              >
                <i class="bi bi-speedometer2"></i>
                <span>Dashboard</span>
              </router-link>
              
              <router-link 
                to="/historial" 
                class="mobile-nav-link"
                :class="{ 'active': $route.path === '/historial' }"
                @click="closeMobileMenu"
              >
                <i class="bi bi-clock-history"></i>
                <span>Historial</span>
              </router-link>
              
              <router-link 
                to="/zonas" 
                class="mobile-nav-link"
                :class="{ 'active': $route.path.startsWith('/zonas') }"
                @click="closeMobileMenu"
              >
                <i class="bi bi-geo-fill"></i>
                <span>Zonas</span>
              </router-link>
              
              <router-link 
                to="/alertas" 
                class="mobile-nav-link"
                :class="{ 'active': $route.path === '/alertas' }"
                @click="closeMobileMenu"
              >
                <i class="bi bi-bell-fill"></i>
                <span>Alertas</span>
                <span v-if="alertCount > 0" class="badge-notification">{{ alertCount }}</span>
              </router-link>
              
              <router-link 
                to="/usuarios" 
                class="mobile-nav-link"
                :class="{ 'active': $route.path === '/usuarios' }"
                @click="closeMobileMenu"
              >
                <i class="bi bi-people-fill"></i>
                <span>Usuarios</span>
              </router-link>
              
              <router-link 
                to="/dispositivos" 
                class="mobile-nav-link"
                :class="{ 'active': $route.path === '/dispositivos' }"
                @click="closeMobileMenu"
              >
                <i class="bi bi-phone-fill"></i>
                <span>Dispositivos</span>
              </router-link>
            </template>
            
            <!-- Employee Navigation -->
            <template v-else>
              <router-link 
                to="/empleado" 
                class="mobile-nav-link"
                :class="{ 'active': $route.path === '/empleado' }"
                @click="closeMobileMenu"
              >
                <i class="bi bi-house-fill"></i>
                <span>Mi Panel</span>
              </router-link>
            </template>
          </nav>
          
          <!-- Logout Mobile -->
          <button 
            @click="handleLogout"
            class="btn-logout mobile-logout"
          >
            <i class="bi bi-box-arrow-right"></i>
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </div>
    </Transition>
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
  // Prevenir scroll cuando el menú está abierto
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
/* ===============================================
   NAVBAR BASE
   =============================================== */

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
  transition: transform var(--transition-fast);
}

.navbar-logo:hover {
  transform: scale(1.05);
}

.logo-icon {
  width: 2.5rem;
  height: 2.5rem;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
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

/* Desktop Navigation */
.navbar-menu {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  border-radius: var(--radius-md);
  color: var(--color-gray-400);
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all var(--transition-fast);
  position: relative;
}

.nav-link:hover {
  color: white;
  background-color: rgba(255, 107, 53, 0.1);
}

.nav-link.active {
  color: var(--color-primary);
  background-color: rgba(255, 107, 53, 0.1);
}

.nav-link i {
  font-size: 1rem;
}

.badge-notification {
  padding: 0.125rem 0.5rem;
  background-color: var(--color-danger);
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  border-radius: 9999px;
  min-width: 1.25rem;
  text-align: center;
}

/* User Actions */
.navbar-actions {
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
}

.user-role {
  font-size: 0.75rem;
  color: var(--color-gray-400);
}

.btn-logout {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  background-color: rgba(239, 68, 68, 0.1);
  color: var(--color-danger);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.btn-logout:hover {
  background-color: rgba(239, 68, 68, 0.2);
  transform: translateY(-2px);
}

/* Mobile Menu Toggle */
.mobile-menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 2rem;
  height: 1.5rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
}

.hamburger-line {
  width: 100%;
  height: 3px;
  background-color: white;
  border-radius: 2px;
  transition: all var(--transition-fast);
}

.mobile-menu-toggle.active .hamburger-line:nth-child(1) {
  transform: translateY(9px) rotate(45deg);
}

.mobile-menu-toggle.active .hamburger-line:nth-child(2) {
  opacity: 0;
}

.mobile-menu-toggle.active .hamburger-line:nth-child(3) {
  transform: translateY(-9px) rotate(-45deg);
}

/* Mobile Menu */
.mobile-menu-overlay {
  position: fixed;
  top: 4rem;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
  z-index: 999;
}

.mobile-menu {
  background: linear-gradient(180deg, var(--color-dark-100) 0%, var(--color-dark) 100%);
  width: 85%;
  max-width: 20rem;
  height: 100%;
  margin-left: auto;
  padding: 1.5rem;
  overflow-y: auto;
  box-shadow: -5px 0 20px rgba(0, 0, 0, 0.5);
}

.mobile-user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background-color: var(--color-dark-200);
  border-radius: var(--radius-lg);
  margin-bottom: 1.5rem;
}

.mobile-user-avatar {
  font-size: 2.5rem;
  color: var(--color-primary);
}

.mobile-user-name {
  font-size: 1rem;
  font-weight: 700;
  color: white;
}

.mobile-user-role {
  font-size: 0.875rem;
  color: var(--color-gray-400);
}

.mobile-nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  border-radius: var(--radius-md);
  color: var(--color-gray-400);
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  transition: all var(--transition-fast);
  position: relative;
}

.mobile-nav-link:hover {
  color: white;
  background-color: rgba(255, 107, 53, 0.1);
}

.mobile-nav-link.active {
  color: var(--color-primary);
  background-color: rgba(255, 107, 53, 0.1);
}

.mobile-nav-link i {
  font-size: 1.25rem;
  width: 1.5rem;
}

.mobile-logout {
  width: 100%;
  justify-content: center;
  padding: 1rem;
}

/* Transiciones del menú móvil */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity var(--transition-normal);
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
}

.mobile-menu-enter-active .mobile-menu,
.mobile-menu-leave-active .mobile-menu {
  transition: transform var(--transition-normal);
}

.mobile-menu-enter-from .mobile-menu,
.mobile-menu-leave-to .mobile-menu {
  transform: translateX(100%);
}

/* ===============================================
   RESPONSIVE DESIGN
   =============================================== */

/* Mobile (< 768px) */
@media (max-width: 768px) {
  .desktop-menu,
  .user-info,
  .desktop-logout {
    display: none;
  }

  .mobile-menu-toggle {
    display: flex;
  }
}

/* Tablet (769px - 1024px) */
@media (min-width: 769px) and (max-width: 1024px) {
  .nav-link span {
    display: none;
  }

  .navbar-menu {
    gap: 0.25rem;
  }

  .nav-link {
    padding: 0.625rem;
  }
}

/* Desktop (> 1024px) */
@media (min-width: 1025px) {
  .mobile-menu-toggle,
  .mobile-menu-overlay {
    display: none;
  }
}
</style>
