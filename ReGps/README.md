# 📱 ReGps - Sistema GPS Tracking Backend

[![Laravel](https://img.shields.io/badge/Laravel-11-red.svg)](https://laravel.com)
[![PHP](https://img.shields.io/badge/PHP-8.2+-blue.svg)](https://php.net)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen.svg)]()

Sistema backend completo de rastreo GPS en tiempo real con geofencing, alertas inteligentes y analytics avanzado.

---

## 🚀 Inicio Rápido

### Instalación
```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/regps.git
cd regps

# Instalar dependencias
composer install

# Configurar entorno
cp .env.example .env
php artisan key:generate

# Migrar base de datos
php artisan migrate

# Seeders (opcional)
php artisan db:seed --class=PermisosSeeder

# Levantar servidor
php artisan serve
```

### Pruebas
```bash
# Pruebas completas de API
php test-completo.php

# Pruebas de Services
php test-services.php
```

---

## 📊 Características Principales

### ✅ Implementado (75.2%)

| Funcionalidad | Estado | Descripción |
|--------------|--------|-------------|
| 🔐 **Autenticación** | 100% | Laravel Sanctum, roles, permisos |
| 🗺️ **Geofencing** | 100% | Círculos, polígonos, Ray Casting |
| 📍 **Checkpoints** | 95% | Sistema completo con historial |
| 🚗 **Gestión Rutas** | 90% | Estadísticas, distancias, velocidades |
| 🧹 **Optimización GPS** | 90% | Validación, limpieza, filtrado |
| 🎯 **Detección Estados** | 85% | Movimiento, detenido, inactivo |
| 🚨 **Alertas** | 65% | Automáticas e inteligentes |
| 📊 **Analytics** | 50% | Reportes y estadísticas |

---

## 📡 API Endpoints

### Autenticación
```http
POST /api/auth/login              # Login
POST /api/auth/logout             # Logout
GET  /api/auth/me                 # Usuario actual
```

### Ubicaciones GPS ⭐
```http
POST /api/ubicaciones             # Enviar ubicación
GET  /api/ubicaciones             # Listar (Admin)
```

**Datos esperados:**
```json
{
  "DispositivoID": 1,
  "Latitud": -12.0464,
  "Longitud": -77.0428,
  "Velocidad": 45.5,
  "Direccion": "Lima, Perú",
  "FechaHora": "2025-11-17 15:30:00"
}
```

### Zonas (Geofencing) ⭐
```http
GET  /api/zonas                   # Listar zonas
POST /api/zonas                   # Crear zona (Admin)
POST /api/zonas/verificar-ubicacion  # Verificar si está en zona
```

### Alertas
```http
GET  /api/alertas                 # Listar alertas
GET  /api/alertas/{id}            # Ver alerta
```

**Total: 37 endpoints**

Ver documentación completa en [`FINAL.md`](FINAL.md)

---

## 🏗️ Arquitectura

```
Controllers → Services → Models → Database
```

### Services (Lógica de Negocio)
- **MovementDetectionService** - Estados del dispositivo
- **RouteService** - Gestión de rutas y estadísticas
- **GpsOptimizationService** - Validación y optimización

### Modelos
- Usuario, Empleado, Dispositivo
- Ubicacion, Zona, HistorialZona
- Alerta, Permiso, RolPermiso

---

## 🔐 Seguridad

- ✅ Laravel Sanctum (tokens API)
- ✅ Roles: Administrador / Empleado
- ✅ 24 permisos granulares
- ✅ Rate limiting (60 req/min)
- ✅ Contraseñas hasheadas
- ✅ Validaciones estrictas

---

## 🧮 Algoritmos

- **Haversine** - Distancia entre coordenadas GPS
- **Ray Casting** - Punto dentro de polígono
- **Douglas-Peucker** - Simplificación de rutas
- **Promedio Móvil** - Suavizado de datos

---

## 🚨 Alertas Automáticas

El sistema genera alertas automáticamente cuando:
- ⚡ Velocidad > 80 km/h
- 🚫 Entrada a zona restringida
- ⚠️ Salida de zona permitida
- 📡 Dispositivo inactivo > 15 min
- 🔴 Sin conexión > 30 min

---

## 📚 Documentación

| Archivo | Descripción |
|---------|-------------|
| [`FINAL.md`](FINAL.md) | **Documentación completa del backend** |
| [`API_ENDPOINTS.md`](API_ENDPOINTS.md) | Todos los endpoints con ejemplos |
| [`AUTENTICACION.md`](AUTENTICACION.md) | Guía de autenticación |
| [`SERVICES_IMPLEMENTADOS.md`](SERVICES_IMPLEMENTADOS.md) | Lógica de negocio |
| [`TABLA_PORCENTAJES.md`](TABLA_PORCENTAJES.md) | Métricas del proyecto |
| [`ANALISIS_FUNCIONALIDADES.md`](ANALISIS_FUNCIONALIDADES.md) | Análisis detallado |

---

## 🧪 Usuario de Prueba

```
Email: test@regps.com
Contraseña: 123456
Rol: Administrador
```

---

## 🛠️ Comandos Útiles

```bash
# Limpiar ubicaciones antiguas
php artisan ubicaciones:limpiar --dias=90

# Eliminar ubicaciones archivadas
php artisan ubicaciones:eliminar-archivadas

# Ver rutas API
php artisan route:list --path=api

# Ejecutar pruebas
php test-completo.php
php test-services.php
```

---

## 📊 Estadísticas

- **Completitud**: 75.2%
- **Endpoints**: 37
- **Tablas BD**: 11
- **Services**: 3
- **Permisos**: 24
- **Líneas de código**: ~3000+

---

## 🎯 Casos de Uso

- 🚚 Empresas de transporte y logística
- 📦 Servicios de delivery
- 👮 Seguridad y vigilancia
- 👷 Gestión de personal en campo
- 🚗 Flotas de vehículos

---

## 🚀 Próximas Mejoras

- [ ] WebSockets para tiempo real
- [ ] Dashboard con Vue.js
- [ ] Exportación PDF/Excel
- [ ] App móvil
- [ ] Machine Learning

---

## 📞 Soporte

Para documentación completa, ver [`FINAL.md`](FINAL.md)

---

## 📄 Licencia

MIT License

---

**Desarrollado con ❤️ usando Laravel 11**

**Estado**: ✅ Production Ready (75.2%)
