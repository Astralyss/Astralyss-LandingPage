# 🔐 Sistema de Seguridad - Panel de Administración

## Descripción
Se ha implementado un sistema completo de autenticación y autorización para proteger el panel de administración de Astralyss.

## 🚀 Características Implementadas

### 1. **Middleware de Protección**
- Archivo: `src/middleware.js`
- Protege automáticamente todas las rutas `/admin/*`
- Verifica tokens JWT en cada solicitud
- Redirige al login si no hay autenticación válida

### 2. **Sistema de Autenticación**
- **Login seguro** con hash de contraseñas usando bcrypt
- **Tokens JWT** con expiración de 24 horas
- **Cookies seguras** con configuración httpOnly y sameSite
- **Verificación de tokens** en tiempo real

### 3. **Página de Login**
- Interfaz moderna y responsive
- Validación en tiempo real
- Manejo de errores
- Indicadores de carga
- Redirección automática después del login

### 4. **APIs de Autenticación**
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/logout` - Cerrar sesión
- `GET /api/auth/verify` - Verificar token

## 🔧 Configuración

### Variables de Entorno Requeridas
```env
# Clave secreta para JWT (¡CAMBIA ESTA EN PRODUCCIÓN!)
JWT_SECRET="tu-clave-secreta-super-segura-para-astralyss-2024"

# Credenciales del administrador
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="Astralyss2024!"

# Entorno
NODE_ENV="production"  # Para cookies seguras
```

### 🔐 **CREDENCIALES OBLIGATORIAS**
**NO HAY CREDENCIALES POR DEFECTO** - Debes configurar las variables de entorno:

```env
ADMIN_USERNAME="JameX-Admin"
ADMIN_PASSWORD="Startup-2025Admin"
JWT_SECRET="GENERA_UNA_CLAVE_SECRETA_MUY_LARGA_Y_SEGURA_AQUI"
```

⚠️ **CRÍTICO**: Sin estas variables, la aplicación NO funcionará.

### 🔑 **Cómo Generar JWT_SECRET Seguro**
```bash
# Opción 1: Usando Node.js
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Opción 2: Usando OpenSSL
openssl rand -hex 64

# Opción 3: Generador online seguro
# https://generate-secret.vercel.app/64
```

**Ejemplo de JWT_SECRET seguro:**
```
a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
```

## 📁 Archivos Creados/Modificados

### Nuevos Archivos
- `src/middleware.js` - Middleware de protección
- `src/lib/auth.js` - Utilidades de autenticación
- `src/app/api/auth/login/route.js` - API de login
- `src/app/api/auth/logout/route.js` - API de logout
- `src/app/api/auth/verify/route.js` - API de verificación
- `src/app/admin/login/page.js` - Página de login
- `env.example` - Ejemplo de variables de entorno

### Archivos Modificados
- `src/app/admin/layout.js` - Agregado botón de logout
- `package.json` - Nuevas dependencias instaladas

## 🛡️ Medidas de Seguridad

### 1. **🔐 Credenciales Seguras**
- **NO hay credenciales hardcodeadas** en el código
- **Solo variables de entorno** - si no están configuradas, la app falla
- **Archivo .env.local** está en .gitignore - nunca se sube a GitHub
- **Hash de contraseñas** con bcrypt (salt rounds de 12)

### 2. **Tokens JWT Seguros**
- Firmados con clave secreta
- Expiración de 24 horas
- Verificación en cada solicitud

### 3. **Cookies Seguras**
- `httpOnly`: No accesibles desde JavaScript
- `secure`: Solo HTTPS en producción
- `sameSite`: Protección CSRF
- Expiración automática

### 4. **Middleware de Protección**
- Verificación automática en todas las rutas admin
- Redirección segura al login
- Limpieza de cookies inválidas

### 5. **🚨 Protección de Código**
- **Código limpio**: Sin credenciales expuestas
- **Git seguro**: Solo se suben archivos de ejemplo
- **Falla segura**: Si no hay variables de entorno, la app no inicia

## 🚦 Flujo de Autenticación

1. **Acceso a `/admin`** → Redirige a `/admin/login`
2. **Login exitoso** → Genera token JWT → Cookie segura
3. **Acceso a rutas admin** → Middleware verifica token
4. **Token válido** → Permite acceso
5. **Token inválido/expirado** → Redirige a login

## 🔄 Funcionalidades del Panel

### Botón de Logout
- Disponible en sidebar móvil y desktop
- Limpia cookies y redirige al login
- Indicador de carga durante el proceso

### Verificación Automática
- El middleware verifica automáticamente la autenticación
- No es necesario verificar manualmente en cada página

## 🚀 Despliegue

### 1. **Configurar Variables de Entorno**
```bash
# Copia el archivo de ejemplo
cp env.local.example .env.local

# Edita .env.local con tus valores reales
# NUNCA subas .env.local a GitHub
```

### 2. **Cambiar Credenciales por Defecto**
```env
ADMIN_USERNAME="JameX-Admin"
ADMIN_PASSWORD="Startup-2025Admin"
JWT_SECRET="clave-secreta-unica-y-larga"
```

### 3. **Verificar Configuración**
- Las cookies serán seguras en producción (`NODE_ENV=production`)
- El middleware protegerá automáticamente todas las rutas admin

## 🔍 Testing

### Probar el Sistema
1. Accede a `/admin` → Debería redirigir a `/admin/login`
2. Usa las credenciales por defecto
3. Verifica que puedes acceder al panel
4. Prueba el botón de logout
5. Verifica que no puedes acceder sin autenticación

## 📝 Notas Importantes

- **Solo un administrador**: El sistema está diseñado para un solo administrador
- **Credenciales por defecto**: Cambiar antes del despliegue
- **Clave JWT**: Usar una clave única y segura en producción
- **HTTPS**: Requerido en producción para cookies seguras

## 🆘 Soporte

Si tienes problemas con la autenticación:
1. Verifica las variables de entorno
2. Revisa la consola del navegador
3. Verifica los logs del servidor
4. Asegúrate de que las cookies no estén bloqueadas
