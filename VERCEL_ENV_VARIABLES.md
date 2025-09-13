# 🔧 Variables de Entorno para Vercel

## Variables Obligatorias para Producción

Configura estas variables en el dashboard de Vercel:

### 1. **Autenticación de Administrador**
```
ADMIN_USERNAME = JameX-Admin
ADMIN_PASSWORD = Startup-2025Admin
JWT_SECRET = [GENERA_UNA_CLAVE_DE_64_CARACTERES]
```

### 2. **Base de Datos**
```
DATABASE_URL = postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres
```

### 3. **Entorno**
```
NODE_ENV = production
```

### 4. **Supabase (Opcional)**
```
NEXT_PUBLIC_SUPABASE_URL = tu-url-de-supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY = tu-clave-anonima
```

## 🔑 Cómo Generar JWT_SECRET

### Opción 1: Terminal
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Opción 2: Online
https://generate-secret.vercel.app/64

## 📋 Pasos en Vercel

1. **Ve a tu proyecto** en vercel.com
2. **Settings** → **Environment Variables**
3. **Add New** para cada variable
4. **Name**: `ADMIN_USERNAME`
5. **Value**: `JameX-Admin`
6. **Environment**: `Production` (y Preview si quieres)
7. **Save**

Repite para todas las variables.

## ✅ Verificación

Después del despliegue, verifica que:
- ✅ Puedes acceder a `/admin`
- ✅ El login funciona con tus credenciales
- ✅ El panel admin carga correctamente
- ✅ No hay errores en los logs de Vercel

## 🚨 Importante

- **NUNCA** subas archivos `.env.local` a GitHub
- **SÍ** configura las variables en Vercel
- **SÍ** usa claves diferentes para desarrollo y producción
