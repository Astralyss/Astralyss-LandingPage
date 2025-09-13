# Configuración de Supabase y Prisma

## Pasos para configurar la base de datos

### 1. Crear proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com) y crea una cuenta
2. Crea un nuevo proyecto
3. Anota la URL del proyecto y las claves API

### 2. Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto con el siguiente contenido:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima_aqui
SUPABASE_SERVICE_ROLE_KEY=tu_clave_service_role_aqui

# Database URL for Prisma (Supabase PostgreSQL)
DATABASE_URL="postgresql://postgres:[TU_PASSWORD]@db.[TU_PROJECT_REF].supabase.co:5432/postgres"

# Optional: Supabase JWT Secret (for server-side operations)
SUPABASE_JWT_SECRET=tu_jwt_secret_aqui
```

### 3. Ejecutar migraciones de Prisma

```bash
# Generar el cliente de Prisma
npx prisma generate

# Ejecutar las migraciones para crear las tablas
npx prisma db push
```

### 4. Verificar la conexión

```bash
# Abrir Prisma Studio para ver los datos
npx prisma studio
```

## Estructura de la base de datos

### Tabla: contact_submissions
Almacena todas las consultas del formulario de contacto con los siguientes campos:

- **Información básica**: name, email, phone, company
- **Información del proyecto**: projectType, businessType, otherBusinessType, budget, timeline, currentWebsite
- **Objetivos**: mainGoal, targetAudience, competitors, specialRequirements, message
- **Información adicional**: howDidYouHear, preferredContact
- **Estado del lead**: status, notes
- **Timestamps**: createdAt, updatedAt

### Tabla: contact_follow_ups
Almacena el historial de seguimiento de cada consulta:

- **Relación**: contactSubmissionId (FK)
- **Seguimiento**: type, description, nextAction, nextActionDate
- **Timestamp**: createdAt

## API Endpoints

### POST /api/contact
Crea una nueva consulta de contacto

### GET /api/contact
Obtiene todas las consultas con paginación
- Query params: page, limit, status

### GET /api/contact/[id]
Obtiene una consulta específica

### PATCH /api/contact/[id]
Actualiza el estado y notas de una consulta

### POST /api/contact/[id]/follow-up
Agrega un nuevo seguimiento a una consulta

### GET /api/contact/[id]/follow-up
Obtiene todos los seguimientos de una consulta

## Estados de las consultas

- `new`: Nueva consulta recibida
- `contacted`: Cliente contactado
- `qualified`: Lead calificado
- `proposal_sent`: Propuesta enviada
- `closed_won`: Proyecto cerrado exitosamente
- `closed_lost`: Proyecto perdido

## Tipos de seguimiento

- `system`: Seguimiento automático del sistema
- `email`: Seguimiento por email
- `call`: Llamada telefónica
- `whatsapp`: Mensaje de WhatsApp
- `meeting`: Reunión presencial/virtual
