# � INSTRUCCIONES DE INSTALACIÓN

## Requisitos previos
- PHP 8.2 o superior
- Composer
- Node.js 18+ y npm
- SQLite (o MySQL/PostgreSQL configurado en .env)

## Instalación

1. **Clonar el repositorio**
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd ReGps/ReGps
   ```

2. **Instalar dependencias de PHP**
   ```bash
   composer install
   ```

3. **Instalar dependencias de Node.js**
   ```bash
   npm install
   ```

4. **Configurar el entorno**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```
   
   Configurar las variables de base de datos en el archivo `.env`

5. **Configurar la base de datos**
   ```bash
   touch database/database.sqlite  # Solo si usas SQLite
   php artisan migrate --seed
   ```

## Iniciar el proyecto

1. **Iniciar el servidor de desarrollo de Vite** (en una terminal)
   ```bash
   npm run dev
   ```

2. **Iniciar el servidor de Laravel** (en otra terminal)
   ```bash
   php artisan serve
   ```

3. **Acceder a la aplicación**
   Abre tu navegador en: [http://localhost:8000](http://localhost:8000)

## Credenciales de prueba
- **Administrador:** admin@example.com / password
- **Empleado:** empleado@example.com / password

---

# �📊 ESTADO ACTUAL DEL PROYECTO - ReGPS

**Última actualización:** 2025-01-15  
**Versión:** 1.0.0  
**Estado:** Backend completo, Frontend en desarrollo

---

## 🎯 DESCRIPCIÓN

**ReGPS** es un sistema de rastreo GPS en tiempo real con geofencing, gestión de dispositivos, empleados y alertas automáticas.

**Stack:**
- Backend: Laravel 12.x (PHP 8.4+)
- Frontend: Vue 3 + TypeScript + Vite (En construcción)
- Base de Datos: SQLite/MySQL
- Autenticación: Laravel Sanctum

---

## ✅ ESTADO DEL BACKEND

### **Completado al 100%**

- ✅ Autenticación con Laravel Sanctum
- ✅ Sistema de roles (Administrador/Empleado)
- ✅ CRUD completo de Usuarios, Empleados, Dispositivos
- ✅ Sistema de ubicaciones GPS
- ✅ Geofencing (Círculos y Polígonos)
- ✅ Alertas automáticas
- ✅ Historial de zonas
- ✅ Optimizaciones de consultas

---

## 🔌 ENDPOINTS API

### **Autenticación** (5 endpoints)
```
POST   /api/auth/login                    # Login
POST   /api/auth/logout                   # Logout
GET    /api/auth/me                       # Usuario actual
POST   /api/auth/cambiar-contraseña       # Cambiar contraseña
POST   /api/auth/revocar-todos            # Revocar tokens
```

### **Usuarios** (5 endpoints) - Solo Admin
```
GET    /api/usuarios                      # Listar
POST   /api/usuarios                      # Crear
GET    /api/usuarios/{id}                 # Ver
PUT    /api/usuarios/{id}                 # Actualizar
DELETE /api/usuarios/{id}                 # Eliminar
```

### **Empleados** (5 endpoints) - Solo Admin
```
GET    /api/empleados                     # Listar
POST   /api/empleados                    # Crear
GET    /api/empleados/{id}                # Ver
PUT    /api/empleados/{id}                # Actualizar
DELETE /api/empleados/{id}                # Eliminar
```

### **Dispositivos** (5 endpoints) - Solo Admin
```
GET    /api/dispositivos                  # Listar
POST   /api/dispositivos                  # Crear
GET    /api/dispositivos/{id}             # Ver
PUT    /api/dispositivos/{id}             # Actualizar
DELETE /api/dispositivos/{id}             # Eliminar
```

### **Ubicaciones** (7 endpoints)
```
POST   /api/ubicaciones                   # Crear (Todos)
GET    /api/ubicaciones                   # Listar (Admin)
GET    /api/ubicaciones/{id}              # Ver (Admin)
PUT    /api/ubicaciones/{id}              # Actualizar (Admin)
DELETE /api/ubicaciones/{id}              # Eliminar (Admin)
GET    /api/locations/current             # Ubicaciones actuales (Admin)
GET    /api/locations/history             # Historial con filtros (Admin)
```

### **Zonas** (7 endpoints)
```
GET    /api/zonas                         # Listar (Todos)
GET    /api/zonas/{id}                    # Ver (Todos)
POST   /api/zonas                         # Crear (Admin)
PUT    /api/zonas/{id}                    # Actualizar (Admin)
DELETE /api/zonas/{id}                    # Eliminar (Admin)
POST   /api/zonas/verificar-ubicacion     # Verificar ubicación (Todos)
GET    /api/zonas/{id}/historial          # Historial de zona (Todos)
```

### **Alertas** (5 endpoints)
```
GET    /api/alertas                       # Listar (Todos)
GET    /api/alertas/{id}                  # Ver (Todos)
POST   /api/alertas                       # Crear (Admin)
PUT    /api/alertas/{id}                  # Actualizar (Admin)
DELETE /api/alertas/{id}                  # Eliminar (Admin)
```

**Total: 39 endpoints**

---

## 📋 ESTRUCTURA DE BASE DE DATOS

### **Tablas Principales:**

1. **usuarios** - Usuarios del sistema
   - UsuarioID, Nombre, Email, Contraseña, Rol, Estado

2. **empleados** - Información de empleados
   - EmpleadoID, UsuarioID, Nombre, Apellido, Telefono, Direccion

3. **dispositivos** - Dispositivos GPS
   - DispositivoID, EmpleadoID, IMEI, Modelo, Marca, Estado

4. **ubicaciones** - Registro de ubicaciones GPS
   - UbicacionID, DispositivoID, Latitud, Longitud, Velocidad, FechaHora

5. **zonas** - Zonas geográficas para geofencing
   - ZonaID, Nombre, TipoZona, TipoGeometria, Latitud, Longitud, Radio/Coordenadas

6. **historial_zonas** - Historial de entradas/salidas
   - HistorialZonaID, ZonaID, EmpleadoID, TipoEvento, TiempoPermanencia

7. **alertas** - Alertas del sistema
   - AlertaID, DispositivoID, TipoAlerta, Prioridad, Estado, AsignadoA

---

## 🖥️ VISTAS NECESARIAS (Frontend)

### **Autenticación**
- ✅ `Login.vue` - Login de usuarios

### **Administrador** (7 vistas)
- ✅ `Dashboard.vue` - Dashboard principal
- ✅ `Usuarios.vue` - Gestión de usuarios
- ✅ `Dispositivos.vue` - Gestión de dispositivos
- ✅ `Historial.vue` - Historial de rutas
- ✅ `Zonas.vue` - Lista de zonas
- ✅ `CrearZona.vue` - Crear/editar zona
- ✅ `Alertas.vue` - Gestión de alertas

### **Empleado** (2 vistas)
- ⏳ `DashboardEmpleado.vue` - Dashboard empleado
- ⏳ `MisDispositivos.vue` - Mis dispositivos y rastreo

### **Común**
- ⏳ `Perfil.vue` - Perfil de usuario

---

## 🔄 FLUJOS PRINCIPALES

### **1. Autenticación**
```
Usuario → POST /api/auth/login
  ↓
Backend valida → Genera token
  ↓
Frontend guarda token → Redirige según rol
```

### **2. Rastreo GPS (Empleado)**
```
Empleado inicia rastreo
  ↓
Frontend obtiene GPS cada 30s
  ↓
POST /api/ubicaciones
  ↓
Backend:
  - Guarda ubicación
  - Verifica geofencing automáticamente
  - Genera alertas si corresponde
```

### **3. Geofencing Automático**
```
Nueva ubicación recibida
  ↓
Verifica todas las zonas activas
  ↓
Si entra/sale de zona:
  - Registra en historial_zonas
  - Genera alerta según tipo de zona
```

### **4. Visualización Tiempo Real (Admin)**
```
GET /api/locations/current (cada 30s)
  ↓
Actualiza marcadores en mapa
  ↓
GET /api/zonas (una vez)
  ↓
Dibuja zonas en mapa
```

---

## 🧠 LÓGICA DE NEGOCIO

### **Sistema de Roles**
- **Administrador**: Acceso completo, puede gestionar todo
- **Empleado**: Solo ve sus dispositivos, puede rastrear GPS

### **Geofencing**
- **Tipos de Zona:**
  - `Checkpoint`: Solo registro
  - `Zona Permitida`: Alerta si sale
  - `Zona Restringida`: Alerta si entra

- **Geometrías:**
  - `Circulo`: Usa Latitud, Longitud (centro) + Radio
  - `Poligono`: Usa array de coordenadas [{lat, lng}, ...]

### **Alertas Automáticas**
- **Velocidad**: > 80 km/h
- **Zona Restringida**: Entrada detectada
- **Zona Permitida**: Salida detectada
- **Batería**: (Futuro) < 20%
- **Desconexión**: (Futuro) Sin ubicaciones en X minutos

---

## 📝 FORMATO DE DATOS

### **Backend → Frontend**
- Backend usa **PascalCase**: `Nombre`, `Email`, `Contraseña`
- Frontend debe transformar a **camelCase**: `name`, `email`, `password`

### **Ejemplo de Transformación:**
```typescript
// Backend response
{
  "UsuarioID": 1,
  "Nombre": "Juan",
  "Email": "juan@example.com",
  "Rol": "Administrador"
}

// Frontend format
{
  id: 1,
  name: "Juan",
  email: "juan@example.com",
  role: "admin"
}
```

### **Fechas**
- Formato: **ISO 8601** (`2025-01-15T10:30:00.000000Z`)

---

## 🔐 AUTENTICACIÓN

### **Laravel Sanctum**
- Tokens almacenados en `personal_access_tokens`
- Header requerido: `Authorization: Bearer {token}`
- Token se guarda en `localStorage` como `token`
- Usuario se guarda en `localStorage` como `user` (JSON)

### **Middleware**
- `auth:sanctum`: Verifica token válido
- `role:Administrador`: Verifica rol de administrador

---

## ⚠️ ERRORES CORREGIDOS

### **auth.ts (Store)**
- ✅ Inicializa usuario desde localStorage si existe token
- ✅ Guarda usuario en localStorage al hacer login
- ✅ Limpia usuario al hacer logout
- ✅ Función `initialize()` para cargar usuario si hay token

### **index.ts (Router)**
- ✅ Navigation guard ahora es async
- ✅ Inicializa usuario antes de verificar autenticación
- ✅ Verifica `isAdmin` correctamente

---

## 🚀 PRÓXIMOS PASOS

### **Frontend (Prioridad Alta)**
1. ✅ Estructura base creada
2. ✅ Router configurado
3. ✅ Store de autenticación corregido
4. ⏳ Crear servicios API (api.ts, authService.ts, etc.)
5. ⏳ Implementar todas las vistas
6. ⏳ Integrar mapa (Leaflet)
7. ⏳ Implementar rastreo GPS en tiempo real

### **Mejoras Futuras**
- WebSockets para actualizaciones en tiempo real
- Exportación de rutas (GPX, KML)
- Reportes PDF
- Dashboard con gráficos avanzados
- App móvil nativa

---

## 📊 ESTADÍSTICAS

- **Endpoints API**: 39
- **Tablas BD**: 7 principales
- **Vistas Frontend**: 10 (3 completadas, 7 pendientes)
- **Completitud Backend**: 100%
- **Completitud Frontend**: ~30%

---

## 🧪 USUARIO DE PRUEBA

```
Email: test@regps.com
Contraseña: 123456
Rol: Administrador
```

---

## 📞 NOTAS IMPORTANTES

1. **Geofencing**: Se ejecuta automáticamente al crear ubicación, no requiere llamada adicional
2. **Alertas**: Se generan automáticamente en el backend
3. **Rastreo GPS**: Frontend debe usar `navigator.geolocation` con intervalo de 30s
4. **Validaciones**: Todos los endpoints tienen validación estricta
5. **Errores**: Retornan código 422 con detalles en español

---

**Documento generado:** 2025-01-15  
**Mantenido por:** Equipo de Desarrollo ReGPS

