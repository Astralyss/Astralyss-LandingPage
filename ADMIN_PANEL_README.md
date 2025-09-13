# Panel Administrativo - Astralyss Landing

## 🎯 Descripción

Panel administrativo completo para gestionar todas las consultas recibidas a través del formulario de contacto del sitio web de Astralyss.

## 🚀 Características

### 📊 Dashboard Principal (`/admin`)
- **Estadísticas en tiempo real** de consultas
- **Métricas clave**: Total consultas, nuevas, contactadas, calificadas, cerradas exitosas
- **Pipeline de ventas** visual con barras de progreso
- **Actividad reciente** con resumen semanal y mensual
- **Tasa de conversión** calculada automáticamente

### 👥 Gestión de Consultas (`/admin/contactos`)
- **Lista completa** de todas las consultas recibidas
- **Filtros avanzados**:
  - Búsqueda por texto (nombre, email, empresa, mensaje)
  - Filtro por estado del lead
  - Filtro por tipo de proyecto
  - Filtro por tipo de negocio
  - Filtro por fecha (hoy, semana, mes)
- **Ordenamiento** por fecha, nombre, empresa
- **Vista detallada** de cada consulta con toda la información
- **Sistema de seguimiento** integrado
- **Actualización de estados** del pipeline

### 📈 Análisis y Reportes (`/admin/analytics`)
- **Métricas de rendimiento** por período (semana, mes, año)
- **Distribución por estados** con gráficos visuales
- **Proyectos más solicitados** con ranking
- **Tendencias mensuales** de los últimos 6 meses
- **Tipos de negocio más comunes**
- **Tasa de conversión** y tiempo promedio de respuesta

### ⚙️ Configuración (`/admin/settings`)
- **Configuración de visualización** (elementos por página, ordenamiento)
- **Gestión de notificaciones** (nuevas consultas, cambios de estado)
- **Exportación de datos** en formato JSON
- **Configuración de respaldos** automáticos
- **Recomendaciones de seguridad**

## 🛠️ Tecnologías Utilizadas

- **Next.js 14** - Framework de React
- **Prisma** - ORM para base de datos
- **Supabase** - Base de datos PostgreSQL
- **Tailwind CSS** - Estilos y diseño
- **Lucide React** - Iconos

## 📁 Estructura de Archivos

```
src/app/admin/
├── layout.js              # Layout principal con navegación
├── page.js                 # Dashboard principal
├── contactos/
│   └── page.js            # Gestión de consultas
├── analytics/
│   └── page.js            # Análisis y reportes
└── settings/
    └── page.js            # Configuración

src/lib/
├── contactUtils.js        # Utilidades para datos de contacto
├── prisma.js             # Cliente de Prisma
└── supabase.js           # Cliente de Supabase

src/app/api/contact/
├── route.js              # CRUD de consultas
├── [id]/
│   ├── route.js          # Consulta específica
│   └── follow-up/
│       └── route.js      # Seguimientos
```

## 🔧 Instalación y Configuración

### 1. Variables de Entorno
Asegúrate de tener configuradas las variables de entorno en `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima
SUPABASE_SERVICE_ROLE_KEY=tu_clave_service_role
DATABASE_URL=tu_url_de_base_de_datos
DIRECT_URL=tu_url_directa_de_base_de_datos
```

### 2. Base de Datos
Ejecuta las migraciones de Prisma:

```bash
npx prisma db push
npx prisma generate
```

### 3. Acceso al Panel
El panel está disponible en: `http://localhost:3000/admin`

## 📊 Estados del Pipeline

El sistema maneja los siguientes estados para cada consulta:

- **`new`** - Nueva consulta recibida
- **`contacted`** - Cliente contactado
- **`qualified`** - Lead calificado
- **`proposal_sent`** - Propuesta enviada
- **`closed_won`** - Proyecto cerrado exitosamente
- **`closed_lost`** - Oportunidad perdida

## 🔄 Flujo de Trabajo

1. **Nueva consulta** llega al formulario
2. **Sistema automático** crea el registro y primer seguimiento
3. **Equipo revisa** la consulta en el panel administrativo
4. **Seguimiento manual** con notas y próximas acciones
5. **Actualización de estado** según el progreso
6. **Análisis** de métricas y rendimiento

## 📱 Responsive Design

El panel está completamente optimizado para:
- **Desktop** - Vista completa con sidebar
- **Tablet** - Layout adaptativo
- **Mobile** - Sidebar colapsable y navegación táctil

## 🔒 Seguridad

### Consideraciones Actuales
- Panel accesible públicamente (sin autenticación)
- Datos protegidos por Supabase
- Validación de datos en API

### Recomendaciones de Seguridad
- Implementar autenticación de usuarios
- Configurar HTTPS en producción
- Limitar acceso por IP si es necesario
- Realizar respaldos regulares
- Monitorear accesos al panel

## 🚀 Próximas Mejoras

- [ ] Sistema de autenticación
- [ ] Notificaciones por email
- [ ] Dashboard personalizable
- [ ] Exportación a Excel/CSV
- [ ] Integración con CRM externo
- [ ] Chat en vivo integrado
- [ ] Reportes automáticos por email

## 📞 Soporte

Para soporte técnico o consultas sobre el panel administrativo, contacta al equipo de desarrollo de Astralyss.

---

**Desarrollado por Astralyss** - Soluciones web profesionales
