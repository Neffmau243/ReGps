# 📚 Documentación Completa del Proyecto ReGPS

## ⚡ Inicio Rápido

Para iniciar el servidor de desarrollo localmente:

```bash
# Navegar al directorio del proyecto
cd c:\Users\Neff_PM\Documents\ChambitasUwU\ReGps\ReGps

# Iniciar el servidor de desarrollo
php artisan serve

# Acceder en el navegador:
# http://127.0.0.1:8000
```

**Nota:** Asegúrate de tener todas las dependencias instaladas y el archivo `.env` configurado correctamente antes de iniciar el servidor.

---

## 📊 Estado del Proyecto

**Fecha de actualización:** 20 de Noviembre, 2025  
**Estado:** En Desarrollo Activo  
**Completitud Backend:** 100%  
**Completitud Frontend:** ~70%

### Stack Tecnológico

| Componente | Tecnología | Estado |
|:-----------|:-----------|:-------|
| **Backend** | Laravel Framework 12.x | ✅ Configurado |
| **Frontend** | Vue 3 + Vite + TypeScript | ✅ Configurado |
| **Estilos** | TailwindCSS v4 + CSS Variables | ✅ Configurado |
| **Base de Datos** | SQLite (configurable a MySQL/PostgreSQL) | ✅ Configurado |
| **Autenticación** | Laravel Sanctum | ✅ Implementado |
| **Mapas** | Leaflet.js | ✅ Instalado |

### Módulos Implementados

#### Backend ✅
- ✅ **Autenticación:** Login, Logout, Perfil
- ✅ **Usuarios:** Gestión completa de usuarios
- ✅ **Empleados:** Gestión de empleados
- ✅ **Dispositivos:** Gestión básica de dispositivos GPS
- ✅ **Ubicaciones:** Registro y consulta de ubicaciones
- ✅ **Zonas:** Gestión de geocercas/zonas
- ✅ **Alertas:** Sistema de alertas automáticas
- ✅ **Historial de Zonas:** Registro de entrada/salida

#### Frontend 🚧
- ✅ **Autenticación completar** con store Pinia
- ✅ **Navegación responsive** con menú hamburguesa móvil
- ✅ **Componentes UI profesionales** (Modal, Card, Button, Loading)
- ✅ **Footer** con enlaces y contacto
- ✅ **Vistas principales:** Dashboard, Usuarios, Dispositivos, Historial, Zonas, Alertas
- ✅ **Tema consistente:** Negro/Naranja con diseño moderno
- ⏳ **Integración completa de mapas**
- ⏳ **Rastreo GPS en tiempo real**

### Módulos Pendientes

**Backend:**
- ❌ **Vehículos:** Tabla `vehicles` (Falta Modelo y Controlador)
- ❌ **Viajes:** Tabla `trips` para gestión de rutas
- ❌ **Checkpoints:** Puntos de control en rutas
- ❌ **Empresas:** Tabla `companies` para multi-tenancy
- ❌ **Notificaciones:** Sistema de notificaciones push
- ❌ **Reportes:** Generación de reportes programados
- ❌ **Mantenimiento:** Tabla `device_maintenances`
- ❌ **Tipos de Dispositivo:** Tabla `device_types`

**Frontend:**
- ⏳ Exportación de reportes PDF/Excel
- ⏳ WebSockets para actualizaciones en tiempo real
- ⏳ Notificaciones push del navegador

---

# 📚 Documentación Completa del Proyecto ReGPS

> **Sistema de Rastreo GPS en Tiempo Real con Geofencing Inteligente**

## 🔍 Descripción General
ReGPS es una solución integral para el monitoreo y gestión de flotas vehiculares, ofreciendo seguimiento en tiempo real, geofencing inteligente y análisis avanzado de rutas. Diseñado para empresas que necesitan optimizar sus operaciones logísticas y garantizar la seguridad de sus activos móviles.

### Características Principales
- Monitoreo en tiempo real de múltiples vehículos
- Alertas automáticas por exceso de velocidad
- Geofencing con zonas personalizables
- Reportes detallados de rutas y tiempos
- Análisis de comportamiento del conductor
- Integración con servicios de mapas
- API RESTful para integraciones

### Casos de Uso
1. **Gestión de Flotas**
   - Monitoreo de vehículos en tiempo real
   - Optimización de rutas
   - Control de combustible

2. **Seguridad**
   - Alertas de geocercas
   - Detección de uso no autorizado
   - Historial de ubicaciones

3. **Mantenimiento**
   - Recordatorios de servicio
   - Monitoreo del estado del vehículo
   - Historial de mantenimiento

## 📌 Tabla de Contenidos
1. [Visión General](#-visión-general)
2. [Estructura del Proyecto](#-estructura-del-proyecto)
3. [Flujo de Datos](#-flujo-de-datos)
4. [Funcionalidades Clave](#-funcionalidades-clave)
5. [Guía de Implementación de ML](#-guía-de-implementación-de-machine-learning)
6. [Configuración del Entorno](#-configuración-del-entorno)
7. [API y Endpoints](#-api-y-endpoints)
8. [Soporte y Mantenimiento](#-soporte-y-mantenimiento)

## 🌟 Visión General
ReGPS es un sistema profesional de rastreo GPS en tiempo real desarrollado con:
- **Backend**: Laravel 12 (PHP 8.4+)
- **Frontend**: Vue.js 3 con TypeScript
- **Base de Datos**: MySQL/PostgreSQL/SQLite
- **Machine Learning**: Python 3.9+

## 🚀 Instalación y Configuración

### Requisitos del Sistema
- **Servidor Web**: Apache/Nginx
- **PHP**: 8.2 o superior
- **Base de Datos**: MySQL 5.7+/PostgreSQL/SQLite
- **Node.js**: 18.x LTS o superior
- **Composer**: Última versión estable

### Instalación Paso a Paso

1. **Clonar el Repositorio**
   ```bash
   git clone https://github.com/tu-usuario/ReGps.git
   cd ReGps/ReGps
   ```

2. **Instalar Dependencias PHP**
   ```bash
   composer install --no-dev --optimize-autoloader
   ```

3. **Instalar Dependencias de Frontend**
   ```bash
   npm install
   npm run build
   ```

4. **Configurar Variables de Entorno**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```
   
   Editar el archivo `.env` con la configuración de la base de datos y servicios externos.

5. **Configurar Base de Datos**
   ```bash
   # Para SQLite
   touch database/database.sqlite
   
   # Para MySQL/PostgreSQL
   # Crear la base de datos manualmente
   
   # Ejecutar migraciones y seeders
   php artisan migrate --seed
   ```

6. **Configurar Storage**
   ```bash
   php artisan storage:link
   ```

7. **Configurar Tareas Programadas**
   ```bash
   # En producción, agregar al cron:
   * * * * * cd /ruta/al/proyecto && php artisan schedule:run >> /dev/null 2>&1
   ```

### Comandos Útiles

| Comando | Descripción |
|---------|-------------|
| `php artisan serve` | Iniciar servidor de desarrollo |
| `npm run dev` | Compilar assets en desarrollo |
| `npm run build` | Compilar assets para producción |
| `php artisan queue:work` | Procesar colas |
| `php artisan schedule:run` | Ejecutar tareas programadas |
| `php artisan optimize` | Optimizar la aplicación |
| `php artisan migrate:fresh --seed` | Recrear base de datos con datos de prueba |

## 🏗️ Estructura del Proyecto

### Directorios Principales
```
ReGps/
├── app/                 # Lógica principal de Laravel
├── config/             # Archivos de configuración
├── database/           # Migraciones y seeders
├── public/             # Archivos públicos
├── resources/          # Vistas y assets
├── routes/             # Rutas de la API y web
├── tests/              # Pruebas automatizadas
├── ml/                 # Módulo de Machine Learning
│   ├── data/           # Datos crudos y procesados
│   ├── models/         # Modelos entrenados
│   ├── notebooks/      # Análisis exploratorio
│   └── scripts/        # Scripts de procesamiento
└── storage/            # Archivos subidos y caché
```

## 🔄 Flujo de Datos

### 1. Recepción de Ubicaciones
- **Endpoint**: `POST /api/ubicaciones`
- **Frecuencia**: 5-30 segundos por dispositivo
- **Validaciones**:
  - Coordenadas válidas
  - Velocidad realista
  - Timestamp preciso

### 2. Procesamiento en Tiempo Real
- Optimización de señales GPS
- Detección de movimiento
- Cálculo de métricas

### 3. Almacenamiento
- Base de datos relacional para datos estructurados
- Almacenamiento en caché para datos en tiempo real
- Archivos planos para respaldos

## 🎯 Funcionalidades Clave

### 1. Monitoreo en Tiempo Real
- Seguimiento de múltiples dispositivos
- Actualizaciones cada 5-30 segundos
- Visualización en mapa interactivo

### 2. Geofencing
- Creación de zonas geográficas
- Alertas de entrada/salida
- Tiempos de permanencia

### 3. Reportes
- Historial de rutas
- Tiempos de conducción
- Comportamiento del conductor
- Eficiencia de rutas

## 🤖 Guía de Implementación de Machine Learning

### 1. Requisitos Previos
- Python 3.9+
- Gestor de paquetes (pip/conda)
- Acceso a la base de datos

### 2. Instalación
```bash
# Clonar repositorio
git clone [url-del-repositorio]
cd ReGps/ReGps

# Crear entorno virtual (Windows)
python -m venv venv
.\venv\Scripts\activate

# Instalar dependencias
pip install -r ml/requirements.txt
```

### 3. Modelos Implementados

#### Clasificación de Comportamiento
- **Objetivo**: Identificar patrones de conducción
- **Características**:
  - Aceleración/desaceleración
  - Velocidades máximas
  - Horarios de conducción

#### Predicción de Mantenimiento
- **Objetivo**: Predecir fallos en dispositivos
- **Señales**:
  - Inconsistencias en GPS
  - Patrones de vibración
  - Historial de mantenimiento

### 4. API de Predicciones
```python
# Ejemplo de solicitud
POST /ml-api/predict
{
    "device_id": "DEV123",
    "locations": [
        {"lat": 19.4326, "lng": -99.1332, "speed": 45, "timestamp": "..."},
        ...
    ]
}
```

## ⚙️ Configuración del Entorno

### Variables de Entorno (.env)
```ini
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=ReGps
DB_USERNAME=usuario
DB_PASSWORD=1234

ML_MODEL_PATH=ml/models/behavior_classifier.joblib
```

### Configuración del Servidor
```

### 1. Autenticación

#### Iniciar Sesión
```http
POST /api/login
Content-Type: application/json

{
    "email": "usuario@ejemplo.com",
    "password": "contraseña"
}
```

Respuesta exitosa:
```json
{
    "token": "1|abcdef123456...",
    "user": {
        "id": 1,
        "name": "Nombre Usuario",
        "email": "usuario@ejemplo.com"
    }
}
```

### 2. Dispositivos

#### Listar Dispositivos
```http
GET /api/dispositivos
```

#### Registrar Nuevo Dispositivo
```http
POST /api/dispositivos
Content-Type: application/json

{
    "imei": "123456789012345",
    "modelo": "GPS-2023",
    "marca": "TrackTech",
    "empleado_id": 1
}
```

### 3. Ubicaciones

#### Enviar Ubicación
```http
POST /api/ubicaciones
Content-Type: application/json

{
    "dispositivo_id": 1,
    "latitud": 19.4326,
    "longitud": -99.1332,
    "velocidad": 45.5,
    "direccion": "Norte",
    "precision": 5.2,
    "timestamp": "2025-11-20 12:00:00"
}
```

#### Obtener Historial de Ubicaciones
```http
GET /api/ubicaciones?dispositivo_id=1&fecha_inicio=2025-11-20&fecha_fin=2025-11-21
```

### 4. Geocercas

#### Listar Geocercas
```http
GET /api/geocercas
```

#### Crear Geocerca
```http
POST /api/geocercas
Content-Type: application/json

{
    "nombre": "Oficina Principal",
    "tipo": "poligono",
    "coordenadas": [
        [19.4326, -99.1332],
        [19.4330, -99.1340],
        [19.4315, -99.1345]
    ],
    "radio": null,
    "color": "#FF0000"
}
```

### 5. Reportes

#### Generar Reporte de Ruta
```http
POST /api/reportes/ruta
Content-Type: application/json

{
    "dispositivo_id": 1,
    "fecha_inicio": "2025-11-20 00:00:00",
    "fecha_fin": "2025-11-20 23:59:59",
    "tipo": "pdf"
}
```

### Códigos de Estado HTTP
- `200 OK` - Petición exitosa
- `201 Created` - Recurso creado
- `400 Bad Request` - Error en la petición
- `401 Unauthorized` - No autenticado
- `403 Forbidden` - No autorizado
- `404 Not Found` - Recurso no encontrado
- `422 Unprocessable Entity` - Error de validación
- `500 Internal Server Error` - Error del servidor

### Dispositivos
- `GET /api/dispositivos` - Listar dispositivos
- `POST /api/dispositivos` - Crear dispositivo
- `GET /api/dispositivos/{id}` - Ver detalles

### Ubicaciones
- `POST /api/ubicaciones` - Registrar ubicación
- `GET /api/ubicaciones?device_id=X` - Historial
### Mantenimiento Programado
- Respaldo diario de base de datos
- Actualización de modelos ML
- Limpieza de datos antiguos

### Soporte Técnico
- Documentación actualizada
- Foro de la comunidad
- Soporte por correo electrónico

---
*Última actualización: 20 de Noviembre de 2025*
