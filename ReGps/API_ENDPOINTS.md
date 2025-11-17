# 📡 API ENDPOINTS - Sistema GPS ReGps

## 🎯 Resumen
**Total de Endpoints:** 32  
**Base URL:** `http://localhost:8000/api`  
**Formato:** JSON  

---

## 📍 USUARIOS (5 endpoints)

### 1. Listar todos los usuarios
```http
GET /api/usuarios
```
**Response:** Array de usuarios con sus empleados relacionados

### 2. Crear usuario
```http
POST /api/usuarios
Content-Type: application/json

{
  "Nombre": "Admin Test",
  "Email": "admin@test.com",
  "Contraseña": "123456",
  "Rol": "Administrador|Empleado",
  "Estado": "Activo|Inactivo"
}
```

### 3. Ver usuario específico
```http
GET /api/usuarios/{id}
```

### 4. Actualizar usuario
```http
PUT /api/usuarios/{id}
Content-Type: application/json

{
  "Nombre": "Nuevo Nombre",
  "Estado": "Inactivo"
}
```

### 5. Eliminar usuario
```http
DELETE /api/usuarios/{id}
```

---

## 👤 EMPLEADOS (5 endpoints)

### 1. Listar todos los empleados
```http
GET /api/empleados
```

### 2. Crear empleado
```http
POST /api/empleados
Content-Type: application/json

{
  "UsuarioID": 1,
  "Nombre": "Juan",
  "Apellido": "Pérez",
  "Telefono": "123456789",
  "Direccion": "Calle Test 123",
  "Estado": "Activo|Inactivo"
}
```

### 3. Ver empleado específico
```http
GET /api/empleados/{id}
```

### 4. Actualizar empleado
```http
PUT /api/empleados/{id}
```

### 5. Eliminar empleado
```http
DELETE /api/empleados/{id}
```

---

## 📱 DISPOSITIVOS (5 endpoints)

### 1. Listar todos los dispositivos
```http
GET /api/dispositivos
```

### 2. Crear dispositivo
```http
POST /api/dispositivos
Content-Type: application/json

{
  "EmpleadoID": 1,
  "IMEI": "123456789012345",
  "Modelo": "GPS Tracker Pro",
  "Marca": "TechGPS",
  "Estado": "Activo|Inactivo|Mantenimiento",
  "FechaAsignacion": "2025-11-17"
}
```

### 3. Ver dispositivo específico
```http
GET /api/dispositivos/{id}
```

### 4. Actualizar dispositivo
```http
PUT /api/dispositivos/{id}
```

### 5. Eliminar dispositivo
```http
DELETE /api/dispositivos/{id}
```

---

## 🗺️ ZONAS - GEOFENCING ⭐ NUEVO (7 endpoints)

### 1. Listar todas las zonas
```http
GET /api/zonas
```

### 2. Crear zona circular
```http
POST /api/zonas
Content-Type: application/json

{
  "Nombre": "Oficina Central",
  "TipoZona": "Checkpoint|Zona Permitida|Zona Restringida",
  "TipoGeometria": "Circulo",
  "Latitud": -12.0464,
  "Longitud": -77.0428,
  "Radio": 100,
  "HorarioInicio": "08:00",
  "HorarioFin": "18:00",
  "Descripcion": "Zona de oficina principal",
  "Estado": "Activo|Inactivo"
}
```

### 3. Crear zona polígono
```http
POST /api/zonas
Content-Type: application/json

{
  "Nombre": "Ruta Norte",
  "TipoZona": "Zona Permitida",
  "TipoGeometria": "Poligono",
  "Latitud": -12.05,
  "Longitud": -77.05,
  "Coordenadas": [
    {"lat": -12.04, "lng": -77.04},
    {"lat": -12.04, "lng": -77.06},
    {"lat": -12.06, "lng": -77.06},
    {"lat": -12.06, "lng": -77.04}
  ],
  "Estado": "Activo"
}
```

### 4. Ver zona específica
```http
GET /api/zonas/{id}
```

### 5. Actualizar zona
```http
PUT /api/zonas/{id}
```

### 6. Eliminar zona
```http
DELETE /api/zonas/{id}
```

### 7. Verificar si dispositivo está en zona
```http
POST /api/zonas/verificar-ubicacion
Content-Type: application/json

{
  "DispositivoID": 1,
  "Latitud": -12.0464,
  "Longitud": -77.0428
}
```
**Response:**
```json
{
  "en_zona": true,
  "zonas": [...]
}
```

### 8. Ver historial de una zona
```http
GET /api/zonas/{id}/historial
```

---

## 📍 UBICACIONES (5 endpoints + geofencing automático)

### 1. Listar todas las ubicaciones
```http
GET /api/ubicaciones
```

### 2. Crear ubicación (detecta zonas automáticamente)
```http
POST /api/ubicaciones
Content-Type: application/json

{
  "DispositivoID": 1,
  "Latitud": -12.0464,
  "Longitud": -77.0428,
  "Velocidad": 45.5,
  "Direccion": "Lima, Perú",
  "FechaHora": "2025-11-17 10:30:00"
}
```
**Funcionalidades automáticas:**
- ✅ Detecta entrada/salida de zonas
- ✅ Registra en historial_zonas
- ✅ Genera alertas si entra a zona restringida
- ✅ Genera alertas si sale de zona permitida
- ✅ Genera alertas por exceso de velocidad (> 80 km/h)

### 3. Ver ubicación específica
```http
GET /api/ubicaciones/{id}
```

### 4. Actualizar ubicación
```http
PUT /api/ubicaciones/{id}
```

### 5. Eliminar ubicación
```http
DELETE /api/ubicaciones/{id}
```

---

## 🚨 ALERTAS ⭐ MEJORADO (5 endpoints + prioridades)

### 1. Listar todas las alertas (ordenadas por prioridad)
```http
GET /api/alertas
```

### 2. Crear alerta
```http
POST /api/alertas
Content-Type: application/json

{
  "DispositivoID": 1,
  "TipoAlerta": "Velocidad|Zona|Batería|Desconexión|Emergencia",
  "Prioridad": "Baja|Media|Alta|Crítica",
  "Descripcion": "Exceso de velocidad detectado",
  "FechaHora": "2025-11-17 10:30:00",
  "Estado": "Pendiente|Revisada|Resuelta",
  "AsignadoA": 1,
  "Notas": "Notas adicionales"
}
```

### 3. Ver alerta específica
```http
GET /api/alertas/{id}
```

### 4. Actualizar alerta
```http
PUT /api/alertas/{id}
Content-Type: application/json

{
  "Estado": "Revisada",
  "Notas": "Falsa alarma"
}
```

### 5. Eliminar alerta
```http
DELETE /api/alertas/{id}
```

---

## 🎯 FUNCIONALIDADES IMPLEMENTADAS

### ✅ 1. Geofencing Completo
- Zonas circulares (radio en metros)
- Zonas polígonos (múltiples coordenadas)
- Algoritmo Ray Casting para detección en polígonos
- Fórmula Haversine para distancia en círculos

### ✅ 2. Detección Automática
- Entrada/salida de zonas al guardar ubicación
- Cálculo automático de tiempo de permanencia
- Registro en historial_zonas

### ✅ 3. Alertas Inteligentes
- Alertas automáticas por geofencing
- Alertas por exceso de velocidad (> 80 km/h)
- Sistema de prioridades (Baja, Media, Alta, Crítica)
- Asignación de alertas a usuarios
- Notas y seguimiento

### ✅ 4. Tipos de Zonas
- **Checkpoint:** Puntos de control
- **Zona Permitida:** Genera alerta si sale
- **Zona Restringida:** Genera alerta si entra

### ✅ 5. Validaciones de Negocio
- Velocidad máxima: 200 km/h
- Coordenadas válidas (lat: -90 a 90, lng: -180 a 180)
- Timestamp no puede ser futuro
- IMEI único por dispositivo
- Email único por usuario

### ✅ 6. Horarios de Zonas
- HorarioInicio y HorarioFin opcionales
- Útil para checkpoints con horario laboral

### ✅ 7. Historial Completo
- Registro de cada entrada/salida
- Tiempo de permanencia calculado
- Coordenadas exactas del evento
- Relación con empleado y dispositivo

---

## 🚀 PRÓXIMAS MEJORAS SUGERIDAS

### Fase 2 - Seguridad
- [ ] Laravel Sanctum para autenticación
- [ ] Middleware de autenticación en rutas
- [ ] Roles y permisos (Admin vs Empleado)
- [ ] Rate limiting

### Fase 3 - Tiempo Real
- [ ] WebSockets (Laravel Reverb)
- [ ] Notificaciones push
- [ ] Dashboard en tiempo real
- [ ] Caché Redis para última ubicación

### Fase 4 - Analytics
- [ ] Reportes de rutas diarias
- [ ] Distancia recorrida
- [ ] Tiempo en zonas
- [ ] Exportar a PDF/Excel

### Fase 5 - Optimización
- [ ] Particionamiento de tabla ubicaciones
- [ ] Limpieza automática de datos antiguos
- [ ] Índices optimizados
- [ ] Logs y auditoría

---

## 📊 ESTADÍSTICAS

- **Controllers:** 6
- **Models:** 7
- **Migraciones:** 8
- **Endpoints:** 32
- **Líneas de código:** ~1500+
- **Funcionalidades:** 10 implementadas

---

## 🔧 TECNOLOGÍAS

- **Backend:** Laravel 11
- **Base de datos:** SQLite
- **Validaciones:** Laravel Request Validation
- **Relaciones:** Eloquent ORM
- **Geolocalización:** Algoritmos propios (Haversine, Ray Casting)

---

## 📝 NOTAS

1. Todos los endpoints retornan JSON
2. Códigos HTTP estándar (200, 201, 404, 422, etc.)
3. Validaciones automáticas en todos los endpoints
4. Relaciones eager loading para optimizar queries
5. Timestamps automáticos (created_at, updated_at)
