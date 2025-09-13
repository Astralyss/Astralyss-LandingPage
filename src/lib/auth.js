import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';

// Verificar que JWT_SECRET esté configurado
if (!process.env.JWT_SECRET) {
  throw new Error('❌ ERROR DE SEGURIDAD: JWT_SECRET debe estar configurado en .env.local');
} 
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

// Credenciales del administrador - SOLO desde variables de entorno
const ADMIN_CREDENTIALS = {
  username: process.env.ADMIN_USERNAME,
  password: process.env.ADMIN_PASSWORD,
};

// Verificar que las variables de entorno estén configuradas
if (!ADMIN_CREDENTIALS.username || !ADMIN_CREDENTIALS.password) {
  throw new Error('❌ ERROR DE SEGURIDAD: Las variables ADMIN_USERNAME y ADMIN_PASSWORD deben estar configuradas en .env.local');
}

// Hash de la contraseña (se ejecuta una vez al iniciar)
const ADMIN_PASSWORD_HASH = bcrypt.hashSync(ADMIN_CREDENTIALS.password, 12);

export async function verifyCredentials(username, password) {
  // Verificar usuario
  if (username !== ADMIN_CREDENTIALS.username) {
    return { success: false, message: 'Credenciales inválidas' };
  }

  // Verificar contraseña
  const isValidPassword = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
  
  if (!isValidPassword) {
    return { success: false, message: 'Credenciales inválidas' };
  }

  return { success: true, message: 'Login exitoso' };
}

export async function generateToken(username) {
  const token = await new SignJWT({ 
    username, 
    role: 'admin',
    iat: Math.floor(Date.now() / 1000)
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('24h')
    .setIssuedAt()
    .sign(JWT_SECRET);

  return token;
}

export async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return { success: true, payload };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
