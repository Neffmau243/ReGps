# 📊 Análisis Detallado de Estilos - Vista Usuarios

**Fecha:** 2025-11-20  
**Vista:** `/usuarios` ([Usuarios.vue](file:///c:/Users/Neff_PM/Documents/ChambitasUwU/ReGps/ReGps/resources/js/views/Usuarios.vue))  
**Tipo:** Grid-based Table with Cards

---

## 📐 Estructura General

### **Contenedor Principal**
```css
.usuarios-view {
  min-height: 100vh;
}
```

```css
.container {
  padding: 24px 0;
  padding-bottom: 160px; /* Space before footer */
  max-width: 1280px; /* 7xl */
  margin: 0 auto;
  padding-left: 16px;
  padding-right: 16px;
}
```

---

## 🎯 Header Section

### 1. **Header Principal**
```html
<div class="mb-6">
  <div class="flex items-center justify-between mb-4">
    <!-- Icon + Title -->
    <!-- New Button -->
  </div>
  <div class="flex items-center gap-8 flex-wrap">
    <!-- Mini Stats + Filters -->
  </div>
</div>
```

**Espaciado aplicado:**
- `mb-6` → `margin-bottom: 24px`
- `gap-8` → `gap: 32px`

### 2. **Icon Container**
```css
.w-10 h-10 bg-gradient-to-br from-primary to-primary/50 rounded-xl {
  width: 40px;
  height: 40px;
  background: linear-gradient(to bottom right, #FF6B35, rgba(255, 107, 53, 0.5));
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

### 3. **Title Styles**
```css
.text-2xl font-bold text-white {
  font-size: 24px;
  line-height: 32px;
  font-weight: 700;
  color: #ffffff;
}

.text-gray-500 text-xs {
  color: #6b7280;
  font-size: 12px;
  line-height: 16px;
}
```

---

## 📊 Mini Stats Section

### **Stat Mini Container**
```css
.stat-mini {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  transition: all 0.2s ease;
}

.stat-mini:hover {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 107, 53, 0.2);
}
```

**Elementos internos:**
- ✅ **Icon:** `text-green-500` / `text-primary`
- ✅ **Count:** `text-white font-semibold text-sm` (14px)
- ✅ **Label:** `text-gray-500 text-xs` (12px)

**Espaciado entre stats:**
```css
.flex items-center gap-6 {
  display: flex;
  align-items: center;
  gap: 24px; /* 6 * 4px = 24px */
}
```

---

## 🔍 Filters Section

### **Divider**
```css
.h-8 w-px bg-gray-700 {
  height: 32px;
  width: 1px;
  background-color: #374151;
}
```

### **Input Compact (Search + Selects)**
```css
.input-compact {
  padding: 10px 14px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 10px;
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  min-width: 140px;
}

.input-compact:focus {
  outline: none;
  border-color: #FF6B35;
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
}

.input-compact:hover {
  background: rgba(255, 255, 255, 0.07);
  border-color: rgba(255, 107, 53, 0.3);
}

.input-compact::placeholder {
  color: #9ca3af;
  font-size: 13px;
}
```

### **Select Options Styling**
```css
.input-compact option {
  background: #1f2937; /* Gray-800 */
  color: #ffffff;
  padding: 12px;
  font-size: 14px;
  font-weight: 500;
}

.input-compact option:hover {
  background: #374151; /* Gray-700 */
}

.input-compact option:checked {
  background: linear-gradient(135deg, #FF6B35 0%, #FF8C5E 100%);
  color: #ffffff;
  font-weight: 600;
}
```

**Search Input Icon:**
```css
.bi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #6b7280;
  font-size: 12px;
}
```

**Espaciado entre filtros:**
```css
.flex items-center gap-4 {
  display: flex;
  align-items: center;
  gap: 16px;
}
```

---

## 📋 Table Structure

### **Table Container**
```css
.usuarios-table-container {
  background: transparent;
  border-radius: 0;
  border: none;
  overflow: visible;
  box-shadow: none;
  margin-bottom: 200px; /* Space before footer */
}
```

### **Table Header**
```css
.usuarios-table-header {
  display: grid;
  grid-template-columns: 80px 2fr 2.5fr 150px 140px;
  gap: 16px;
  padding: 16px 0;
  padding-bottom: 12px;
  background: transparent;
  border-bottom: 1px solid rgba(255, 107, 53, 0.15);
  font-weight: 600;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #9ca3af;
  margin-bottom: 8px;
}
```

**Columnas:**
1. **Avatar** → `80px`
2. **Usuario** → `2fr` (flexible)
3. **Contacto** → `2.5fr` (más flexible)
4. **Estado** → `150px`
5. **Acciones** → `140px`

---

## 👤 User Row

### **Row Base**
```css
.usuario-row {
  display: grid;
  grid-template-columns: 80px 2fr 2.5fr 150px 140px;
  gap: 16px;
  padding: 16px 0;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
  transition: all 0.2s ease;
  background: transparent;
  position: relative;
  border-radius: 8px;
}
```

### **Row Hover Effects**
```css
.usuario-row::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(180deg, #FF6B35 0%, #FF8C5E 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.usuario-row:hover {
  background: rgba(255, 107, 53, 0.05);
  border-bottom-color: rgba(255, 107, 53, 0.15);
  padding-left: 8px;
  padding-right: 8px;
  transform: translateX(4px);
}

.usuario-row:hover::before {
  opacity: 1;
}
```

---

## 🎨 Avatar Section

### **Avatar Circle**
```css
.avatar-circle {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: linear-gradient(135deg, #FF6B35 0%, #FF8C5E 50%, #FFB088 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  color: white;
  box-shadow: 0 4px 12px rgba(255, 107, 53, 0.4);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.avatar-circle::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.2) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.usuario-row:hover .avatar-circle {
  transform: scale(1.1) rotate(5deg);
  box-shadow: 0 6px 20px rgba(255, 107, 53, 0.6);
}

.usuario-row:hover .avatar-circle::before {
  opacity: 1;
}
```

### **Status Indicator**
```css
.avatar-status {
  position: absolute;
  bottom: -2px;
  right: -2px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 3px solid #1a1a2e;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
}

.avatar-status.active {
  background: #10b981;
  box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.2), 0 2px 8px rgba(0, 0, 0, 0.4);
  animation: pulse-green 2s ease-in-out infinite;
}

.avatar-status.inactive {
  background: #ef4444;
  box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.2), 0 2px 8px rgba(0, 0, 0, 0.4);
}

@keyframes pulse-green {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7), 0 2px 8px rgba(0, 0, 0, 0.4);
  }
  50% {
    box-shadow: 0 0 0 8px rgba(16, 185, 129, 0), 0 2px 8px rgba(0, 0, 0, 0.4);
  }
}
```

---

## 📝 User Info Section

```css
.usuario-info {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}

.usuario-nombre {
  font-size: 16px;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.usuario-nombre:hover {
  color: #FF8C5E;
}

.usuario-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #9ca3af;
}

.usuario-id {
  font-family: 'Courier New', monospace;
  color: #6b7280;
  font-size: 12px;
}
```

### **Role Badge Inline**
```css
.role-badge-inline {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.role-badge-inline.admin {
  background: rgba(255, 107, 53, 0.15);
  color: #FF8C5E;
  border: 1px solid rgba(255, 107, 53, 0.3);
}

.role-badge-inline.employee {
  background: rgba(107, 114, 128, 0.15);
  color: #9ca3af;
  border: 1px solid rgba(107, 114, 128, 0.3);
}
```

---

## 📧 Contact Section

```css
.usuario-contact {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #d1d5db;
  transition: all 0.2s ease;
}

.contact-item i {
  width: 16px;
  text-align: center;
  font-size: 13px;
}

.contact-item:hover {
  color: #ffffff;
  transform: translateX(4px);
}

.contact-email {
  color: #60a5fa; /* Blue-400 */
}

.contact-time {
  color: #9ca3af;
  font-size: 13px;
}
```

---

## ✅ Status Badge

```css
.usuario-status {
  display: flex;
  justify-content: center;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  border: 1px solid;
  transition: all 0.3s ease;
}

.status-badge.active {
  background: rgba(16, 185, 129, 0.1);
  border-color: rgba(16, 185, 129, 0.3);
  color: #10b981;
}

.status-badge.inactive {
  background: rgba(239, 68, 68, 0.1);
  border-color: rgba(239, 68, 68, 0.3);
  color: #ef4444;
}

.status-badge:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  animation: pulse-dot 2s ease-in-out infinite;
}

.status-badge.active .status-dot {
  background: #10b981;
}

.status-badge.inactive .status-dot {
  background: #ef4444;
}

@keyframes pulse-dot {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.2);
  }
}
```

---

## 🎬 Action Buttons

```css
.usuario-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.action-btn {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  border: 1px solid;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 15px;
}

.action-btn:hover {
  transform: translateY(-3px) scale(1.1);
}

.action-btn:active {
  transform: translateY(-1px) scale(1.05);
}
```

### **Edit Button**
```css
.action-btn.edit {
  color: #60a5fa;
  border-color: rgba(96, 165, 250, 0.3);
}

.action-btn.edit:hover {
  background: rgba(96, 165, 250, 0.15);
  border-color: rgba(96, 165, 250, 0.5);
  box-shadow: 0 8px 16px rgba(96, 165, 250, 0.3);
}
```

### **Toggle Button**
```css
.action-btn.toggle {
  color: #fbbf24; /* Yellow-400 */
  border-color: rgba(251, 191, 36, 0.3);
}

.action-btn.toggle:hover {
  background: rgba(251, 191, 36, 0.15);
  border-color: rgba(251, 191, 36, 0.5);
  box-shadow: 0 8px 16px rgba(251, 191, 36, 0.3);
}

.action-btn.toggle.activate {
  color: #10b981;
  border-color: rgba(16, 185, 129, 0.3);
}

.action-btn.toggle.activate:hover {
  background: rgba(16, 185, 129, 0.15);
  border-color: rgba(16, 185, 129, 0.5);
  box-shadow: 0 8px 16px rgba(16, 185, 129, 0.3);
}
```

### **Delete Button**
```css
.action-btn.delete {
  color: #ef4444;
  border-color: rgba(239, 68, 68, 0.3);
}

.action-btn.delete:hover {
  background: rgba(239, 68, 68, 0.15);
  border-color: rgba(239, 68, 68, 0.5);
  box-shadow: 0 8px 16px rgba(239, 68, 68, 0.3);
}
```

---

## 📦 Modal Styles

### **Modal Overlay**
```css
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  padding: 16px;
  animation: fadeIn 0.2s ease-out;
}
```

### **Modal Content**
```css
.modal-content {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border-radius: 20px;
  border: 1px solid rgba(124, 58, 237, 0.3);
  width: 100%;
  max-width: 600px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  animation: slideUp 0.3s ease-out;
}
```

### **Modal Header**
```css
.modal-header {
  padding: 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
```

### **Modal Close Button**
```css
.modal-close {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  color: #9ca3af;
  background: transparent;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.3s ease;
}

.modal-close:hover {
  color: white;
  background: rgba(239, 68, 68, 0.2);
  border-color: rgba(239, 68, 68, 0.3);
}
```

---

## 📱 Responsive Design

### **Tablet (max-width: 1200px)**
```css
@media (max-width: 1200px) {
  .usuarios-table-header,
  .usuario-row {
    grid-template-columns: 70px 1.5fr 2fr 130px 120px;
    gap: 12px;
    padding: 16px 20px;
  }
  
  .avatar-circle {
    width: 48px;
    height: 48px;
  }
}
```

### **Mobile (max-width: 992px)**
```css
@media (max-width: 992px) {
  .usuarios-table-header {
    display: none;
  }
  
  .usuario-row {
    grid-template-columns: 1fr;
    gap: 16px;
    padding: 20px;
  }
  
  .usuario-avatar,
  .usuario-info,
  .usuario-contact,
  .usuario-status,
  .usuario-actions {
    justify-content: flex-start;
  }
  
  .usuario-actions {
    gap: 12px;
  }
}
```

---

## 🎨 Color Palette Used

### **Primary Colors**
- `#FF6B35` - Primary (Orange)
- `#FF8C5E` - Primary Light
- `#FFB088` - Primary Lighter

### **Status Colors**
- `#10b981` - Success/Active (Green)
- `#ef4444` - Error/Inactive (Red)
- `#fbbf24` - Warning (Yellow)
- `#60a5fa` - Info (Blue)

### **Neutral Colors**
- `#ffffff` - White
- `#d1d5db` - Gray-300
- `#9ca3af` - Gray-400
- `#6b7280` - Gray-500
- `#4b5563` - Gray-600
- `#374151` - Gray-700
- `#1f2937` - Gray-800
- `#1a1a2e` - Dark Background
- `#16213e` - Dark Background Variant

---

## ⚡ Animations

### **Fade In**
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

### **Slide Up**
```css
@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
```

### **Pulse Green**
```css
@keyframes pulse-green {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7), 0 2px 8px rgba(0, 0, 0, 0.4);
  }
  50% {
    box-shadow: 0 0 0 8px rgba(16, 185, 129, 0), 0 2px 8px rgba(0, 0, 0, 0.4);
  }
}
```

### **Pulse Dot**
```css
@keyframes pulse-dot {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.2);
  }
}
```

### **Spin**
```css
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

---

## 📋 Summary

### **Key Design Patterns:**
1. ✅ **Grid-based layout** con columnas responsivas
2. ✅ **Glassmorphism** con backgrounds semi-transparentes
3. ✅ **Hover effects** en todos los elementos interactivos
4. ✅ **Color-coded badges** para roles y estados
5. ✅ **Smooth transitions** (0.2s - 0.3s ease)
6. ✅ **Pulse animations** para status indicators
7. ✅ **Gradient backgrounds** para avatars y botones
8. ✅ **Box shadows** con color matching (naranja, azul, rojo, etc.)

### **Spacing System:**
- **Mini:** `gap-3` (12px), `gap-4` (16px)
- **Normal:** `gap-6` (24px), `gap-8` (32px)
- **Padding:** `p-4` (16px), `p-6` (24px)
- **Margin:** `mb-4` (16px), `mb-6` (24px), `mb-8` (32px)

### **Border Radius:**
- **Small:** `8px` - `10px` (inputs, badges)
- **Medium:** `12px` - `14px` (buttons, avatars)
- **Large:** `20px` (modals)

---

**Generado:** 2025-11-20 10:17  
**Archivo fuente:** [Usuarios.vue](file:///c:/Users/Neff_PM/Documents/ChambitasUwU/ReGps/ReGps/resources/js/views/Usuarios.vue)
