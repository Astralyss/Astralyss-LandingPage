import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'tu-clave-secreta-super-segura-para-astralyss-2024');

// Credenciales del administrador (en producción deberían estar en la base de datos)
const ADMIN_CREDENTIALS = {
  username: process.env.ADMIN_USERNAME || 'JameX-Admin',
  password: process.env.ADMIN_PASSWORD || 'Startup-2025Admin', // Contraseña por defecto
};

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
